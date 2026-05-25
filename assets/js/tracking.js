(function (window) {
	"use strict";

	var EVENT_NAME = "dysonhope_event";
	var ALLOWED_KEYS = [
		"entity",
		"action",
		"target",
		"platform",
		"page_type",
		"link_url",
		"link_text",
		"release_title",
		"mix_title",
		"cta_type"
	];

	function isDebugMode() {
		try {
			var params = new URLSearchParams(window.location.search || "");
			return params.get("debug_tracking") === "true";
		} catch (error) {
			return false;
		}
	}

	var DEBUG_MODE = isDebugMode();
	var TRACK_SELECTOR = '[data-track="true"]';
	var EMBED_TRACK_SELECTOR = '[data-embed-track="true"]';
	var HOME_VIEW_TRACKED = false;
	var LINKS_VIEW_TRACKED = false;
	var TIMELINE_VIEW_TRACKED = false;
	var trackedEmbedElements = [];

	function isLikelyEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	function isLikelyPhone(value) {
		var digitsOnly = value.replace(/\D/g, "");
		return digitsOnly.length >= 7;
	}

	function sanitizeTextValue(value) {
		if (typeof value !== "string") {
			return undefined;
		}

		var trimmed = value.trim();
		if (!trimmed) {
			return undefined;
		}

		if (isLikelyEmail(trimmed) || isLikelyPhone(trimmed)) {
			return undefined;
		}

		return trimmed;
	}

	function sanitizeUrlValue(value) {
		if (typeof value !== "string") {
			return undefined;
		}

		var trimmed = value.trim();
		if (!trimmed) {
			return undefined;
		}

		if (/^(mailto|tel|sms|javascript):/i.test(trimmed)) {
			return undefined;
		}

		try {
			var parsed = new URL(trimmed, window.location.origin);
			if (!/^https?:$/i.test(parsed.protocol)) {
				return undefined;
			}

			parsed.search = "";
			parsed.hash = "";
			return parsed.toString();
		} catch (error) {
			return undefined;
		}
	}

	function normalizePayload(payload) {
		if (!payload || typeof payload !== "object") {
			return null;
		}

		var normalized = {
			event: EVENT_NAME
		};

		ALLOWED_KEYS.forEach(function (key) {
			var value = payload[key];
			if (value === undefined || value === null) {
				return;
			}

			if (key === "link_url") {
				value = sanitizeUrlValue(String(value));
			} else {
				value = sanitizeTextValue(String(value));
			}

			if (value === undefined || value === null || value === "") {
				return;
			}

			normalized[key] = value;
		});

		if (Object.keys(normalized).length === 1) {
			return null;
		}

		return normalized;
	}

	function ensureDataLayer() {
		try {
			if (!Array.isArray(window.dataLayer)) {
				window.dataLayer = [];
			}
			return window.dataLayer;
		} catch (error) {
			return null;
		}
	}

	function normalizeLinkText(value) {
		if (typeof value !== "string") {
			return undefined;
		}

		var normalized = value.replace(/\s+/g, " ").trim();
		return normalized || undefined;
	}

	function getLinkTextFallback(element) {
		if (!element || typeof element.getAttribute !== "function") {
			return undefined;
		}

		var ariaLabel = normalizeLinkText(element.getAttribute("aria-label") || "");
		if (ariaLabel) {
			return ariaLabel;
		}

		var title = normalizeLinkText(element.getAttribute("title") || "");
		if (title) {
			return title;
		}

		if (typeof element.querySelector === "function") {
			var image = element.querySelector("img[alt]");
			if (image) {
				var alt = normalizeLinkText(image.getAttribute("alt") || "");
				if (alt) {
					return alt;
				}
			}
		}

		return undefined;
	}

	function buildClickPayloadFromElement(element) {
		if (!element || !element.dataset) {
			return null;
		}

		var payload = {
			entity: element.dataset.entity,
			action: element.dataset.action,
			target: element.dataset.target,
			platform: element.dataset.platform,
			page_type: element.dataset.pageType,
			release_title: element.dataset.releaseTitle,
			mix_title: element.dataset.mixTitle,
			cta_type: element.dataset.ctaType,
			link_text: normalizeLinkText(element.textContent || "") || getLinkTextFallback(element)
		};

		if (element.tagName && element.tagName.toLowerCase() === "a") {
			payload.link_url = element.getAttribute("href") || undefined;
		}

		return payload;
	}

	function setupClickTracking() {
		if (!window.document || typeof window.document.addEventListener !== "function") {
			return;
		}

		window.document.addEventListener("click", function (event) {
			var origin = event && event.target;
			if (!origin || typeof origin.closest !== "function") {
				return;
			}

			var trackElement = origin.closest(TRACK_SELECTOR);
			if (!trackElement) {
				return;
			}

			var payload = buildClickPayloadFromElement(trackElement);
			if (!payload) {
				return;
			}

			trackDysonHopeEvent(payload);
		});
	}

	function getPageType() {
		var path = "";

		try {
			path = (window.location.pathname || "").toLowerCase();
		} catch (error) {
			path = "";
		}

		if (/\/links(\/index\.html|\/)?$/.test(path)) {
			return "links";
		}

		return "home";
	}

	function setupTimelineViewTracking() {
		if (TIMELINE_VIEW_TRACKED || getPageType() !== "home") {
			return;
		}

		if (typeof window.IntersectionObserver !== "function") {
			return;
		}

		var timelineElement = window.document.getElementById("timeline");
		if (!timelineElement) {
			return;
		}

		var observer = new window.IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (TIMELINE_VIEW_TRACKED || !entry.isIntersecting || entry.intersectionRatio < 0.1) {
					return;
				}

				TIMELINE_VIEW_TRACKED = true;
				trackDysonHopeEvent({
					entity: "site",
					action: "view",
					target: "timeline",
					page_type: "home"
				});
				observer.unobserve(timelineElement);
				observer.disconnect();
			});
		}, {
			threshold: [0.1],
			rootMargin: "0px 0px -10% 0px"
		});

		observer.observe(timelineElement);
	}

	function setupPageViewTracking() {
		var pageType = getPageType();

		if (pageType === "home" && !HOME_VIEW_TRACKED) {
			HOME_VIEW_TRACKED = true;
			trackDysonHopeEvent({
				entity: "site",
				action: "view",
				target: "home",
				page_type: "home"
			});
			setupTimelineViewTracking();
			return;
		}

		if (pageType === "links" && !LINKS_VIEW_TRACKED) {
			LINKS_VIEW_TRACKED = true;
			trackDysonHopeEvent({
				entity: "site",
				action: "view",
				target: "links",
				page_type: "links"
			});
		}
	}

	function hasTrackedEmbed(element) {
		return trackedEmbedElements.indexOf(element) !== -1;
	}

	function markTrackedEmbed(element) {
		trackedEmbedElements.push(element);
	}

	function buildEmbedPayloadFromElement(element) {
		if (!element || !element.dataset) {
			return null;
		}

		return {
			entity: element.dataset.entity,
			action: element.dataset.action,
			target: element.dataset.target,
			platform: element.dataset.platform,
			page_type: element.dataset.pageType,
			release_title: element.dataset.releaseTitle,
			mix_title: element.dataset.mixTitle
		};
	}

	function setupEmbedInteractionTracking() {
		if (!window.document || typeof window.document.querySelectorAll !== "function") {
			return;
		}

		var embedElements = window.document.querySelectorAll(EMBED_TRACK_SELECTOR);
		if (!embedElements || !embedElements.length) {
			return;
		}

		// These embed interaction events indicate engagement intent, not guaranteed playback.
		Array.prototype.forEach.call(embedElements, function (embedElement) {
			if (!embedElement || hasTrackedEmbed(embedElement)) {
				return;
			}

			var handleInteraction = function () {
				if (hasTrackedEmbed(embedElement)) {
					return;
				}

				markTrackedEmbed(embedElement);
				trackDysonHopeEvent(buildEmbedPayloadFromElement(embedElement));
			};

			embedElement.addEventListener("pointerdown", handleInteraction, { passive: true });
			embedElement.addEventListener("click", handleInteraction, { passive: true });
		});
	}

	function trackDysonHopeEvent(payload) {
		var eventPayload = normalizePayload(payload);

		if (!eventPayload) {
			if (DEBUG_MODE) {
				console.info("[dysonhope:tracking] Ignored empty or invalid payload", payload);
			}
			return false;
		}

		try {
			var dataLayer = ensureDataLayer();
			if (!dataLayer || typeof dataLayer.push !== "function") {
				if (DEBUG_MODE) {
					console.warn("[dysonhope:tracking] dataLayer unavailable; event not pushed", eventPayload);
				}
				return false;
			}

			dataLayer.push(eventPayload);

			if (DEBUG_MODE) {
				console.groupCollapsed("[dysonhope:tracking] Event pushed");
				console.table(eventPayload);
				console.groupEnd();
			}

			return true;
		} catch (error) {
			if (DEBUG_MODE) {
				console.warn("[dysonhope:tracking] Push failed", error);
			}
			return false;
		}
	}

	window.trackDysonHopeEvent = trackDysonHopeEvent;
	ensureDataLayer();
	setupClickTracking();
	setupPageViewTracking();
	setupEmbedInteractionTracking();

	if (DEBUG_MODE) {
		console.info("[dysonhope:tracking] Debug mode active");
	}
})(window);
