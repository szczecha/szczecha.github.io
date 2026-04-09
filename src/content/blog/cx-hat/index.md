---
title: 'A Year in the CX Hat: What I Learned'
description: "A year ago I was offered a move to CX. Despite doubts, I rose to the challenge — and I'm a better QA because of it."
pubDate: '2026-04-09'

featured: true
---

<div style="display:flex;gap:3rem;margin-bottom:1.5rem;flex-wrap:wrap;">
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Role</div><strong>Customer Enablement Engineer</strong></div>
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Company</div><strong>Saleor Commerce</strong></div>
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Timeline</div><strong>April 2025 – April 2026</strong></div>
</div>

---

When I was offered a move to CX, my first thought was: *I'm not a developer.*

For three years at Saleor, I had tested APIs, dashboards, and apps, written automation, fixed CI, worked on requirements, debugged incidents, and improved processes. I knew the product inside out — what breaks, when it breaks, why. But was that enough to advise clients how to build a shop and integrate with external systems?

I had doubts.

A year has passed. Here's what I actually found on the other side.

---

## Every day is a question no test suite could predict

As a QA, you test what's planned. New features, bug fixes, releases.

In CX, you get questions no test case could ever predict.

How do I configure a bundle product?
How do I override price if goods are damaged?
How do I set up payment on delivery?
How do I import orders from a legacy system?
How do I build an integration between our ERP system and Saleor?

These aren't documentation questions. They're real-world questions. And that's exactly why it's never boring.
I didn’t just learn how to answer complex questions — I learned how to understand what problem is actually being asked.

---

## Documentation is a product too

For a long time I thought documentation was someone else's job. The technical writer’s. The developer who built the feature. Not mine.

In CX I started with an audit: I went through support patterns and mapped where customers got stuck. I didn't write what seemed "useful." I wrote answers to questions that came up regularly — questions with nowhere to look.

Result: 15+ new or expanded guides. Orders lifecycle, warehouse & shipping, bulk API operations, webhook debugging, cloud environment management. Each guide is an hour invested once that saves hours later.

And here's the shift that changed how I write: **the simpler the language, the better.** I stopped wondering if it sounded "professional enough." Simple language is respect for the reader's time. Nobody has time to read a spacecraft manual just to update a product price.

---

## Pre-sales presentations

Shortly after joining CX, I started creating pre-sales presentations — materials to help clients decide whether to launch on the platform.

And something unexpected happened: To explain the architecture clearly to a client, I had to understand it better than I thought I did. Not just "how it works" — I already knew that. But "how it works in the context of a specific business goal, for a new project." How to connect apps, webhooks, and external integrations so they directly answer what the client actually needs.

Testing teaches you how a system behaves under pressure. Pre-sales taught me why those behaviors matter to someone just starting out.

---

## First onboarding

My first solo onboarding came around the 10-month mark. End-to-end: from the initial walkthrough, through designing the integration architecture (storefront ↔ Saleor ↔ third-party), and eventually going live.

I sat in a call with client explaining things that seemed obvious to me — how to navigate the dashboard, how to create products, how to authenticate to the API.
We met weekly for check-in sessions, making sure there were no major blockers.

The client didn't eat me alive — quite the opposite, they appreciated the technical details.

---

## What I miss

Predictability.
Even though onboarding usually involves the same configuration elements, every use case is different.
Customer questions circle similar themes but are never quite 1-to-1.
Some weeks there's a flood of questions; other weeks, nothing.

Measurability.
In QA you know if a test passed or failed. You have coverage. You have CI. You have numbers that tell you how things are.
Is onboarding moving faster than it was a month ago? Does the new guide actually reduce support volume? — these are things that still need clearer metrics.

Testing.
In CX I often reproduce problems customers report or explore how to achieve a use case with our API, but sometimes I miss the pure exploration of breaking things and the satisfaction of knowing what we shipped is solid.

---

## What stays with me

A year in CX left concrete things that will change how I approach QA.

- Deeper understanding of e-commerce domain

- Thinking about solving use cases with limited tools — finding workarounds

- Better prioritization — as a QA I wasn't always good at deciding what needs fixing yesterday versus what can wait. Working with clients taught me what actually matters. It shifts depending on what you sell and how. Some bugs will live in the backlog forever because they're in areas we rarely touch.

- Caring about documentation



*A year in CX didn’t pull me away from QA — it expanded it.*