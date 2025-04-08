---
id: migration-to-projects-v2
title: Project cards to projects v2
description: |
  All the things you need to know to migrate from using project cards to projects v2.
tags:
  - Migrations
  - Project cards
  - Projects v2
---

# Migration from project cards to projects v2

## Migration {#migration}

From [project cards](https://github.com/Sonia-corporation/stale/releases/tag/2.5.0) to [projects v2](https://github.com/Sonia-corporation/stale/releases/tag/3.0.0).

### Breaking change reason 🍬 {#breaking-change-reason}

GitHub roll-out the [new project](https://github.blog/changelog/2024-05-23-sunset-notice-projects-classic/) in July 2022.  
The 1st April 2025, the legacy project was sunset, no choice but to migrate.  
The way to fetch the projects with GraphQL has to change from this point forward.

**Before:**

```yml {6}
# ...
name: Stale
id: stale
uses: sonia-corporation/stale@latest
with:
  issue-ignore-all-project-cards: true
```

**After:**

All inputs including the word "-card(s)" were renamed without it as follows:

```yml {6}
# ...
name: Stale
id: stale
uses: sonia-corporation/stale@latest
with:
  issue-ignore-all-projects: true
```
