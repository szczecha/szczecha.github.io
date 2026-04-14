---
title: 'First Steps with Claude Code Skills'
description: "I kept hearing about skills everywhere but didn't understand what they were. Do I need them? Can I build my own? FOMO from too many tools, too much information — and how I finally tackled the skills topic."
pubDate: '2026-04-14'
featured: true
---

<div style="display:flex;gap:3rem;margin-bottom:1.5rem;flex-wrap:wrap;">
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Role</div><strong>Learner</strong></div>
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Context</div><strong>Claude Code</strong></div>
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Timeline</div><strong>April 2026</strong></div>
  <div><div style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--meta-label-color);margin-bottom:0.25rem;">Type</div><strong>Learning / Developer Tooling</strong></div>
</div>

<div class="not-prose flex flex-wrap gap-1.5 mb-6">
  <span class="font-mono text-xs px-3 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Claude Code</span>
  <span class="font-mono text-xs px-3 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Skills</span>
  <span class="font-mono text-xs px-3 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Extensibility</span>
  <span class="font-mono text-xs px-3 py-1 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">AI Tools</span>
</div>

---

## The FOMO of Too Many Tools

It's getting harder to keep up. Every week there's a new AI tool, a new feature, a new thing you're "supposed" to know about. I kept hearing about skills — at work, on Discord, YouTube titles all over the place — but I had no idea what it actually was. How to use it. If I even needed it.


## How I Actually Tackled It

Here's what I know about myself: I don't like pretending I understand things, and I learn better through practice than through reading. So instead of scrolling docs or watching a tutorial, I did the simplest thing possible.

**I asked Claude directly: "What are skills and how can I use them in my daily work?"**

That's it. No overthinking, no FOMO-driven research spiral. Just straight-up question.

I asked in chat and got info about built-in skills for creating documents, working on PDFs, and building UIs.

![Claude's response listing built-in skills for document creation, PDF handling, and UI building](./ChatSkills.png)

That was helpful, but one thing caught my attention: `/skill-creator` at the end. So I asked for more details:

![Claude confirming that custom skills can be built and shared with the /skill-creator command](./CanIBuildMyOwn.png)

## Building My First Skill

I stopped for a moment to think about the most repetitive tasks I ask Claude to help with:
- "Explain this code fragment to me."
- "Create a feature request based on customer message and our Linear template"

I continued in chat:

![Using the /skill-creator command to start building a custom skill](./CommandCreateSkill.png)

Claude asked me some clarifying questions.

![Claude asking clarifying questions about the skill's purpose and use cases](./ClaudeQuestionWidget.png)

Then asked me to share the template. Claude even tested the skill with a sample question from memory.

![Claude testing the newly created skill with a sample question before saving](./ClaudeTestSkill.png)

The skill was saved automatically.

![Confirmation that the skill has been successfully created and saved](./FrsSkill.png)

But that wasn't the end. At this point, the skill only worked in that session. To make it available across all chats, I needed to add it in the customize section. This way you can add skills created by someone else.

![Customize section showing how to import and enable shared skills from team members](./ImportSkillFromYourTeam.png)

If you want the skill available in Claude Code itself, you need to add a folder and move the skill.md file there.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">

![Creating a skills folder in the Claude Code project directory](./SkillsFolder.png)

![Moving the skill.md file into the skills folder to register it in Claude Code](./MoveSkillToFolder.png)

</div>


## I Built More

I created additional skills for:
- Analyzing Saleor core functionality and identifying test areas
- Documenting feature requests and bugs in standardized format
- Generating test scenarios and UI test templates in Playwright

These skills accelerated my daily workflow significantly.

Example for explain code skill:
![A skill definition showing the core components](./SkillDefinition.png)
![The skill in action — answering specific questions about code](./SkillInAction.png)
![Examples of skills in action — testing tips, code explanations, more](./TestingTips.png)

Once I had that first skills working, something became obvious. **Skills are just prompts you don't want to rewrite.**

If you find yourself:
- Asking Claude the same question over and over (with different inputs)
- Having a standard way you want Claude to approach a problem
- Wanting to encode domain knowledge or a specific workflow
- Wishing a tool felt native to Claude Code (not something you have to remember)

…then a skill makes sense.


## The Impact

- I understand what a skill is — just a prompt template living in your config
- I've built four custom skills that standardize my QA workflow: feature request reporting, bug documentation, and test reporting follow the same format every time
- I can now effectively generate well-structured feature requests and bug reports that match our team's standards — no more manual formatting or missing details
- My FOMO about new tools has decreased significantly

