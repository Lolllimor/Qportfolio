There’s this quiet thrill that comes with creating and building; you’re not just solving a problem, you’re bringing your handiwork to life. That rush is what pulled me into **building a plugin after successfully vibe coding a web platform where designers can sharpen their skills.**

This is the story of how I tried to build a Figma plugin that would take dummy and duplicated data within UI elements; cards, table rows, onboarding screens, and more; then automatically swap in realistic, specialized content while testing edge cases within the layout, mostly through text length variations. And how, in chasing something powerful enough to handle almost any use case, I **ended up creating a tool that became unreliable.**

## The Problem That Inspired Me

As a product designer, rectangles and text are our daily bread **(yes, that’s me oversimplifying what we actually do).** We draw shapes and add text; then we copy-paste cards, rows, and flows. But the moment you duplicate multiple cards to create an ecommerce product listing page, everything looks phony: the same fake name (John Doe), the same email (john.doe@example.com), the same $99 price tag, the same avatar. It breaks the illusion of realism instantly.

**You don’t realize how distracting that repetition is until stakeholders start fixating on it;** until a stakeholder asks why the same customer purchased the same product ten times as separate line items, instead of one item with a higher quantity.

The Microsoft Content Reel plugin could do something close; but it felt oversimplified to me, and the results were generic. Similarly, Figma’s AI replace-content feature produced similar generic outputs from simple prompts. I wanted a plugin that delivered more specialized results **in one or two clicks; without excessive prompting.**

> Flow: Select your duplicated layers (or a whole frame); check or uncheck a setting; run the plugin; and watch believable variations appear. Different native names; plausible emails; randomized prices; swapped component states; varied images. No more tedious manual edits just to make a prototype feel real.

## It Actually Started Well

Version 1 was dead simple. It scanned selected text layers for duplicates; then replaced them with lightweight variations pulled from small lists; common first and last names, email patterns, number ranges. Basic string matching plus contextual clues; for example, if a field resembled an email format, it generated one accordingly.

It ran fast. It respected selections exactly. It delivered instant delight. I used it in my own workflow and it worked well. **But I convinced myself it should do more.**

## The Leap to Version 2

These questions pushed me into Version 2:

- What if it could auto-detect entire tables and fill them coherently?
- What if it understood card layouts and kept user identities consistent across name, email, photo, and transaction history?
- What if it recognized structural roles; labels, headers, metrics, status badges; and varied them appropriately?
- What if it enforced container-level consistency so nothing looked out of place?

I believed I could code each of these solutions into the plugin. I focused on one structural problem at a time. But the more I added, the more brittle it became.

A loosely grouped set of text layers would get misread as a table. The plugin would enforce persona consistency on placeholder text that was never meant to be linked. Simple selections that once worked flawlessly now triggered cascading “smart” changes I didn’t ask for. Edge cases piled up; nested auto-layout, variant hierarchies, variables already in use.

Eventually, I stepped away. I thought the issue was structure; so I broke the system down into smaller milestones and reprioritized the rules. But I kept arriving at the same place. Version 1 worked beautifully because it was simple. Version 2 kept collapsing under its own ambition.

![Populator plugin interface with Auto and Custom options](/articles/building-a-mind-reading-plugin-and-where-i-went-wrong/image-2.png)
*Populator plugin interface with Auto and Custom options*

## The Core Mistake Wasn’t the Code; It Was My Mindset

I assumed I could engineer a plugin that reliably guessed designer intent from structure alone. But Figma files are chaotic masterpieces. One designer uses strict naming conventions and auto-layout everywhere; another free-forms everything with manual positioning; a third leans heavily on components and variables. Layer depth, naming conventions, grouping habits; none of it is standardized.

No traversal algorithm can perfectly decode intent across that diversity.

## What I Learned

This initiative taught me several things; but most importantly, it reminded me to build for user control. And that starts by making it easy for your product to solve simple problems well.

So I reverted the plugin to Version 1 and pushed it to Figma for approval. A couple of hours later, it was approved.

The Figma plugin, **Populator, is now live.** The best part is that you can feed it the exact content you want to replace your dummy data with; **alongside a few simple but powerful controls.**

You can check it out and add it to your workflow here; [https://www.figma.com/community/plugin/1606716214570339694](https://www.figma.com/community/plugin/1606716214570339694)
