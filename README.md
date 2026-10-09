# Here is the complete slide-by-slide copy ready to paste directly into your slide editor (Canva,...

Here is the complete slide-by-slide copy ready to paste directly into your slide editor (Canva, Figma, or Keynote).

---

Slide 1: Cover / The Hook

* Tag / Eyebrow: B.Tech Capstone Project

* Main Headline: How I Built a Sub-400ms Real-Time Voice AI Agent

* Bullets:

  * Replaced missed clinic voicemails with an autonomous receptionist

  * Full duplex streaming audio over WebSockets

  * Handles live interruptions, FAQs, and Google Calendar bookings

* Bottom Prompt: Swipe for architecture, latency benchmarks, and lessons ➔

---

Slide 2: The Problem

* Tag / Eyebrow: Market Pain Point

* Main Headline: Why Voicemails Cost Local Clinics Thousands

* Bullets:

  * 30% of patient phone inquiries occur after 6:00 PM or during lunch hours

  * 85% of callers hang up immediately without leaving a voicemail

  * Patients in pain simply call the next clinic on Google Maps

  * Average clinic loses 15+ potential appointments every month

* Diagram Caption: Missed After-Hours Call ➔ Unheard Voicemail ➔ Lost Patient Lifetime Value ($1,200+)

---

Slide 3: Architecture

* Tag / Eyebrow: System Design

* Main Headline: The Ultra-Low-Latency Audio Pipeline

* Bullets:

  * Inbound phone calls routed via Twilio to bidirectional WebSockets

  * Deepgram Nova-2 handles speech-to-text with ~140ms stream turnaround

  * Groq-hosted Llama-3 70B evaluates intent and executes tool calls in ~90ms

  * Cartesia Sonic converts text to conversational audio in ~100ms

* Diagram Caption: Twilio Audio Stream ➔ Deepgram (STT) ➔ Groq / Llama-3 (Brain) ➔ Cartesia (TTS) ➔ Real-Time Audio Return (~390ms total loop)

---

Slide 4: Results & Benchmarks

* Tag / Eyebrow: Performance Data

* Main Headline: Tested Across 50 Simulated Inbound Calls

* Bullets:

  * 390ms median round-trip response time (feels natural and conversational)

  * 94% task completion rate across bookings, hours checks, and insurance questions

  * Zero dropped WebSocket connections across concurrent test sessions

  * Direct calendar slot reservation confirmed via instant SMS notification

* Diagram Caption: Benchmark comparison: Standard Human Pause (300-500ms) vs. Agent Response Time (390ms)

---

Slide 5: The Tech Stack

* Tag / Eyebrow: Engineering Toolkit

* Main Headline: Built with Modern Real-Time Infrastructure

* Bullets:

  * Languages: TypeScript, Node.js, and Python

  * Real-Time Protocols: WebSockets, WebRTC, and Twilio Media Streams

  * AI & Speech: Deepgram, Groq, Cartesia, and ElevenLabs

  * Backend & Storage: Supabase (PostgreSQL, Edge Functions) and Google Calendar API

* Diagram Caption: Decoupled event-driven backend built on lightweight serverless functions and persistent WebSockets

---

Slide 6: Engineering Lessons & CTA

* Tag / Eyebrow: Key Takeaways

* Main Headline: 3 Hard Lessons From Building With Real-Time Voice

* Bullets:

  * Barge-in is non-negotiable: You must flush the outbound audio buffer the millisecond the user interrupts

  * Latency is cumulative: Shaving 30ms off transcription gives your LLM model crucial breathing room

  * Utility over complexity: Reliable slot booking beats fancy multi-turn conversational tricks

* Author Card & Call To Action:

  * Kasabu Nikhil Goud — Final Year B.Tech CSE (Class of 2026)

  * Actively open for SDE and AI Engineering roles

* Diagram Caption: Live demo link and open-source GitHub repository in the first comment below    Create a bpt slide like not a ppt but the website with the slides That Font of Gist and guest mono And also the Inter font Like Apple leg style font lay And make it simple and attractive When the everyone sees the first slide that I want to keep this as a converting the PPT So in the linkedin like a kerosene like ppt I want to keep it so when they first see the 1st slide they will scroll the completely like that make it Attractive and the good design And make it the better PPD the website PBT

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1ddb11f4-79ad-4c06-9ad4-6794f3315fec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
