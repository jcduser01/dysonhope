---
title: "To Producers Afraid of Printing Their MIDI"
date: 2026-06-26
slug: printing-your-midi
tags: [studio notes, production]
excerpt: "Why committing your sound — printing MIDI to audio — is what lets it finally become something, and where the real work starts."
draft: false
---

<figure style="margin:0 0 1.8rem;"><img src="/assets/images/blog/printing-your-midi/hero.png" alt="A DAW arrangement view with a rendered audio clip sliced into out-of-order fragments, lit only by the screen"><figcaption style="font-family:var(--mono);font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);margin-top:8px;">Image: Dyson Hope</figcaption></figure>

Many producers, myself included, have struggled with the fear of committing. You keep everything as MIDI, every synth still a live instrument, every effect still a plugin you can reach back into, because as long as nothing is rendered to audio, nothing is final. You can always change your mind. That flexibility feels like safety. For a long time, I believed the main benefit of working in software was the freedom to undo anything, forever.

I don’t work like that anymore. Not because the flexibility stopped being useful, but because I figured out what it was costing me.

What changed my mind wasn’t a tutorial or a piece of advice. It was a problem I couldn’t solve any other way. I don’t like static synths — sounds that just sit there, the same on every note. So I put motion into everything: filters sweeping, oscillators drifting, envelopes shaping the sound across a phrase. That’s a big reason I resisted printing anything. If I wanted to change how a filter moved, I needed the synth still live to do it.

But that same motion was eating up all my production time. For example, let’s say I have a lead line with notes on the first three beats, then nothing on the fourth, and the last note lands an eighth-note later. I want that last note to have the same timbre as the others. With an LFO synced to a quarter note, I’d have to reset the oscillator on that note so its cycle lands in the same place it does everywhere else. Get a few of those going at once, and you’re not making music anymore, you’re programming a machine to fake the thing you could’ve just played and recorded.

So one day, out of pure frustration, I rendered the part to audio and sliced it up by hand. Moved the notes around. Got the phrasing I wanted in about a minute. And then something I didn’t expect happened: I started finding sounds in that audio I never would have built on purpose. Single-cycle loops pulled out of one note. Grainy pitch artifacts from playing a single hit at strange transpositions. A clean, consistent transient on a synth that was otherwise all movement. The limitation wasn’t a cage. It was a door.

People usually tell you to print your tracks to save on CPU or for tidiness. That isn’t even my main reason anymore — it’s that I realized creativity comes from limiting choices, from working against something. When everything stays editable forever, you never have to make the sound be anything, and so it never becomes anything. The moment you flatten it to audio, you’ve stopped asking “what could this be?” and started asking “what is this, and what can I do with what it actually is?” Those are completely different questions, and the second one is where the interesting work lives.

## What audio lets you do that MIDI can't

Once I stopped being precious about it, a whole set of techniques opened up that simply don’t exist while a part is still a soft instrument.

The most dramatic one came from a CPU wall. I was running the kind of effect chain I tend to use — signal split mid/side and processed independently, bussed out to returns and folded back in, phase-cancellation crossovers for clean dual-band work, all of it modulating at once. And I was doing it on an aging, underpowered laptop. It was too heavy to keep live, so I froze a track to squeeze out some working space. On a lark, I duplicated the frozen track, flattened it, took a chunk, reversed it, and ran time-based effects backward across an already-processed signal. Froze that, flattened it, reversed it again. I went in fully intending to rebuild it “properly” in MIDI if the idea worked. It worked, and I never rebuilt it. There was nothing to rebuild — the audio was the idea. You cannot get there from a synth patch. The sound is a record of things happening to other sounds, and you can only stack those generations in audio.

Layering gets more precise, too. When I’m building a snare out of several hits, I like to line up the phase of the different layers — zoom into the waveforms close enough to see the oscillation and nudge them until the peaks and troughs agree instead of fighting. In MIDI, that’s basically impossible (I mean, some samplers can pull it off, but it’s a pain). In audio, it’s nothing. The payoff is a hit that stays solid and powerful even when you’ve stacked two near-identical sounds like two mic recordings of the same drum, because nothing is invisibly canceling against itself.

And there’s a kind of construction you can only do on a timeline: building a sound *longitudinally* instead of stacking it. Instead of three sounds playing at once, I’ll take the transient of one, the body of another, and the tail of a third and stitch them together in time. Make four layered drum hits that way, and then start swapping transients, bodies, and tails between them, and four sounds become sixteen. That’s a library, and it’s all original — by the time I shelve a project, I scoop up everything I rendered and file it, and at this point, my sample collection is filled with my own sound design.

## Reconciling the two without losing your mind

None of this kills the “but what if I want to change it later” voice. Mine never went away either. So I built a way to have both — the freedom of live MIDI and the speed and surprise of audio — instead of choosing.

The first move is to separate sound design from composition. I keep them in different projects and even avoid switching gears between the two on the same day because they pull on different parts of my brain. When I’m designing a sound, I keep one project per sound or family of sounds. The original instrument and effect chain stays untouched; whenever I want to make a big, hard-to-undo change or render something out, I duplicate it first. I work top to bottom — or left to right in Ableton’s Session View — so the oldest version of a sound sits at one end and its descendants trail off behind it. The whole project becomes a living library of every incarnation of that sound, patches and racks saved, audio filed where I can find it.

Then, when I’m composing, I pull from those projects. Sometimes I drop in the rendered audio; sometimes I bring in a whole generation of source channels, instruments, and effects intact, if I think I’ll want to keep tweaking. The workflow loop that makes it work is that if I end up changing the instrument or resampling the audio in some interesting way mid-composition, I carry that change back into the sound’s home project as a new generation. The library keeps growing on its own, fed by the music I actually make with it.

The gear and the software aren’t the point at all. This technique works with any DAW. It’s a way of thinking, not a button to press. What it really comes down to is a willingness to decide. Printing a track is just the smallest version of the thing every finished piece of music requires of you eventually, which is to let it be one thing instead of every possible thing. Hold the door open forever, and nothing ever walks through it.
