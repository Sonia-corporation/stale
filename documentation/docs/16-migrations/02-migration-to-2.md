---
id: migration-v1-to-v2
title: v1 to v2
description: |
  All the things you need to know to migrate from v1 to v2.
tags:
  - Migrations
  - V2
---

# Migration from v1 to v2

## Migration {#migration}

From [v1](https://github.com/Sonia-corporation/stale/releases/tag/1.61.0) to [v2](https://github.com/Sonia-corporation/stale/releases/tag/2.0.0).

### Close reason 🍬 {#close-reason}

One new input was introduced:

- [issue-close-reason](../issues/inputs/issue-close-reason-input)

It will allow you to define what is the reason when an issue is closed.  
This new feature is possible following the [May 19, 2022, update](https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/#%F0%9F%95%B5%F0%9F%8F%BD%E2%99%80%EF%B8%8F-issue-closed-reasons) for the GitHub issues.

**Before:**

Every issue were closed with the default value in GitHub, which is `COMPLETED`.

**After:**

Every issue will now be closed with `NOT_PLANNED` as the default value.  
To change the behavior back to the previous one, you can configure your action as follows:

```yml {6-7}
# ...
name: Stale
id: stale
uses: sonia-corporation/stale@latest
with:
  issue-close-reason: 'not planned'
```

:::info

We decided to actually change the default value, because it makes more sense for most users to consider a closed issue as not planned.  
Like suggested by GitHub, they consider this value as a stale reason, which is actually why you are here. 😉

:::
