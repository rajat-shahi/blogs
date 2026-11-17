# Rajat's Engineering Blog

A personal engineering blog built with [Mintlify](https://mintlify.com). It
contains practical notes, long-form articles, projects, and learning goals
across software engineering, infrastructure, distributed systems, and AI.

The source repository is private and hosted at
[`rajat-shahi/blogs`](https://github.com/rajat-shahi/blogs).

## Content areas

- System design
- Competitive programming and data structures
- Frontend, backend, and full-stack engineering
- Site reliability and DevOps engineering
- AI engineering and MLOps/AIOps
- Projects and experiments
- Roadmap and learning goals
- Other technical learnings

## Project structure

```text
.
|-- docs.json                         # Site configuration and navigation
|-- style.css                         # Mintlify layout and typography overrides
|-- index.mdx                         # Home page
|-- logo/                             # Logo and favicon assets
|-- system-design/                    # System design articles
|-- dsa/                              # DSA and competitive programming articles
|-- frontend-engineering/             # Frontend articles
|-- backend-engineering/              # Backend articles
|-- fullstack-engineering/            # Full-stack articles
|-- sre/                              # Reliability engineering articles
|-- devops-engineering/               # DevOps and Linux articles
|-- ai-engineering/                   # AI engineering articles
|-- mlops-aiops/                      # MLOps and AIOps articles
|-- other-learnings/                  # Articles outside the main categories
|-- projects/                         # Project and tinkering write-ups
`-- roadmap/                          # Learning plans and progress
```

## Run locally

The project requires Node.js. From the repository root, run:

```bash
npx mint@4.2.680 dev
```

Open [http://localhost:3000](http://localhost:3000). The preview reloads when
you edit an MDX file, `docs.json`, or `style.css`.

Validate the complete documentation site before publishing:

```bash
npx mint@4.2.680 validate
```

## Add a blog article

Create an `.mdx` file inside the appropriate topic directory. For example:

```text
other-learnings/debugging-redis-latency.mdx
```

Every article begins with YAML frontmatter:

```mdx
---
title: "Debugging Redis latency"
description: "A first-principles guide to tracing Redis latency"
icon: "gauge"
---

Introduce the problem and explain why it matters.

## Start with the request path

Build the idea from its smallest components.
```

Add the page path to the appropriate `pages` array in `docs.json`. Do not
include the `.mdx` extension:

```json
{
  "group": "Other Learnings",
  "pages": [
    "other-learnings/overview",
    "other-learnings/redis-memory-analyzer-clusters",
    "other-learnings/debugging-redis-latency"
  ]
}
```

Add a card to the section's `overview.mdx` when the article should also appear
on that section landing page.

## Publish through GitHub and Mintlify

Mintlify watches the `main` branch of `rajat-shahi/blogs` and reads
`docs.json` from the repository root. Commit article and navigation changes,
then push them to `main` or merge a pull request into `main`.

Mintlify automatically builds and deploys the update to
[blogs.rajatshahi.xyz](https://blogs.rajatshahi.xyz/).

## Writing conventions

- Use active voice and address the reader as "you."
- Keep each sentence focused on one idea.
- Use sentence case for headings.
- Wrap commands, paths, and filenames in backticks.
- Start technical articles from first principles before introducing tools.
- Validate commands and call out production risks explicitly.
