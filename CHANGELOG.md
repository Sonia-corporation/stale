# Semantic Versioning Changelog

# [1.18.0](https://github.com/Sonia-corporation/stale/compare/1.17.0...1.18.0) (2021-11-22)


### :rocket: Features

* **issue:** add new input to ignore the process base on the creation date ([10b4b64](https://github.com/Sonia-corporation/stale/commit/10b4b6449cb728352b3b1430ac37ece82fa3e986))

# [1.17.0](https://github.com/Sonia-corporation/stale/compare/1.16.0...1.17.0) (2021-11-21)


### :rocket: Features

* **issue:** add new input to ignore issues with assignees ([a1c168b](https://github.com/Sonia-corporation/stale/commit/a1c168b46bb3fe871f91d77a725363857315cf7e))

# [1.16.0](https://github.com/Sonia-corporation/stale/compare/1.15.0...1.16.0) (2021-11-20)


### :rocket: Features

* **issue:** avoid closing issues on dry-run mode ([b93d952](https://github.com/Sonia-corporation/stale/commit/b93d952686506ad23a3c0daac1cbeae364eda69a))

# [1.15.0](https://github.com/Sonia-corporation/stale/compare/1.14.0...1.15.0) (2021-11-20)


### :rocket: Features

* **outputs:** add closed issues count output ([aeeb72e](https://github.com/Sonia-corporation/stale/commit/aeeb72eec75a67bb0ee1dfec36c63174d1983bb2))
* **stats:** add stats about the number of closed issues ([de3d98c](https://github.com/Sonia-corporation/stale/commit/de3d98c7d8fea7b4ded4a2b8c12437a3b36518bd))
* **issue:** close stale issues ([e7f9a54](https://github.com/Sonia-corporation/stale/commit/e7f9a545161b02a61fc957ea6f5c7a917b464f06))

# [1.14.0](https://github.com/Sonia-corporation/stale/compare/1.13.0...1.14.0) (2021-11-20)


### :rocket: Features

* **issue:** add new input to ignore the process when a label is on an issue ([9c118dc](https://github.com/Sonia-corporation/stale/commit/9c118dc14cc113d2d044285d09517e22d051d9bb))

# [1.13.0](https://github.com/Sonia-corporation/stale/compare/1.12.0...1.13.0) (2021-11-18)


### :rocket: Features

* **label:** use a better search to find the stale label to avoid mismatch ([73148bd](https://github.com/Sonia-corporation/stale/commit/73148bdee19a2faa69e555e7d6071ccdb98530e8))

# [1.12.0](https://github.com/Sonia-corporation/stale/compare/1.11.0...1.12.0) (2021-11-15)


### :rocket: Features

* **outputs:** add some outputs to this action ([6c8390f](https://github.com/Sonia-corporation/stale/commit/6c8390fe3b5fceb9e4094d10a87b3c7b2bcdfaec))

# [1.11.0](https://github.com/Sonia-corporation/stale/compare/1.10.0...1.11.0) (2021-11-15)


### :rocket: Features

* **stats:** add a statistics regarding the unaltered issues ([acca942](https://github.com/Sonia-corporation/stale/commit/acca9429dc3538d9daca48481a2458a678ae2cd6))
* **issue:** use the most recent added stale label event for the check ([36e21fd](https://github.com/Sonia-corporation/stale/commit/36e21fd718938168fbfbef1023eb7972760af0da))

# [1.10.0](https://github.com/Sonia-corporation/stale/compare/1.9.0...1.10.0) (2021-11-14)


### :rocket: Features

* **logs:** add statistics in the logs ([90fbb7a](https://github.com/Sonia-corporation/stale/commit/90fbb7aa86f381d6152f264e0796cd1cbb453671))

# [1.9.0](https://github.com/Sonia-corporation/stale/compare/1.8.0...1.9.0) (2021-11-14)


### :rocket: Features

* **logs:** display the api services logs with the issue prefix ([6b35fe8](https://github.com/Sonia-corporation/stale/commit/6b35fe8e7a84ed9a64745b7b4657cf843ce0efd0))
* **logs:** improve the issue logger to always add the issue id as a prefix ([b6390da](https://github.com/Sonia-corporation/stale/commit/b6390da9d3dcd924ee92d3df780f595312234c72))
* **issue:** remove the stale label from the issue when no longer stale ([c128375](https://github.com/Sonia-corporation/stale/commit/c128375998ec04299f21a0e4957a5461af83f564))
* **issue:** remove the stale label when the creation date of the label is sooner than the update date ([b66d9b3](https://github.com/Sonia-corporation/stale/commit/b66d9b3e8b3c2fcfbeaaeb4c40379b16ec0fe464))
* **logs:** round the difference of days in the logs ([6801ee5](https://github.com/Sonia-corporation/stale/commit/6801ee5f3f5b94035d6b0ae702bcdc882bd767c7))
* **issue:** stop processing an issue already stale ([3dbd799](https://github.com/Sonia-corporation/stale/commit/3dbd79911c31f414ae0a955f753a9a4705b43905))

# [1.8.0](https://github.com/Sonia-corporation/stale/compare/1.7.0...1.8.0) (2021-11-13)


### :rocket: Features

* **issue:** add new input issue-days-before-close to customize the number of days before closing a stale issue ([ed43be6](https://github.com/Sonia-corporation/stale/commit/ed43be60c281f1e23081f4d46633b4375144a02d))

# [1.7.0](https://github.com/Sonia-corporation/stale/compare/1.6.1...1.7.0) (2021-11-13)


### :rocket: Features

* **issue:** add a new input "issue-days-before-stale" to choose when to stale ([2e92099](https://github.com/Sonia-corporation/stale/commit/2e92099f52fa4e0c90772913b43adca9ed24fcf5))

## [1.6.1](https://github.com/Sonia-corporation/stale/compare/1.6.0...1.6.1) (2021-11-13)


### :bug: Bug Fixes

* **dry-run:** ignore the stale label addition in dry-run mode ([8fe45d2](https://github.com/Sonia-corporation/stale/commit/8fe45d291f6b2eb9ad9d5a295df2000f64b6d682))

# [1.6.0](https://github.com/Sonia-corporation/stale/compare/1.5.0...1.6.0) (2021-11-12)


### :rocket: Features

* **issue:** add new input issue-ignore-any-labels to ignore the processing of issues with specific labels ([1c4307d](https://github.com/Sonia-corporation/stale/commit/1c4307d433ce98cd978693821b96d0bd421f78a0))

# [1.5.0](https://github.com/Sonia-corporation/stale/compare/1.4.0...1.5.0) (2021-11-12)


### :rocket: Features

* **labels:** add a new feature to add a label to an issue ([f93639d](https://github.com/Sonia-corporation/stale/commit/f93639d81d4c7d5b8b54d4be9e62f5fd69c33196))
* **labels:** add a new feature to get a label from the repository ([06eb94e](https://github.com/Sonia-corporation/stale/commit/06eb94ef48adabea10aca1849e4d4cb7a587d012))
* **issue:** add a new option "issue-stale-label" to define the label to use when an issue is stale ([b8a54a8](https://github.com/Sonia-corporation/stale/commit/b8a54a8bc1340438275651dadd56cc38cb4da46d))
* **stale:** add a stale label on issue not updated since 30 days ([ffd6c76](https://github.com/Sonia-corporation/stale/commit/ffd6c768c1f1c93cb2ecbf7e119f34e1412bb7a9))
* **logs:** add logs for the stale label ([b57de32](https://github.com/Sonia-corporation/stale/commit/b57de328a7473354bf69a983c26cbbc28e5a7c88))
* **stale:** stale locally the issues older than 30 days ([c5af87c](https://github.com/Sonia-corporation/stale/commit/c5af87c0207c10f3c13160bcc6978e0ebde7da12))

# [1.4.0](https://github.com/Sonia-corporation/stale/compare/1.3.0...1.4.0) (2021-11-09)


### :rocket: Features

* **logs:** add a log when the process start ([ec78887](https://github.com/Sonia-corporation/stale/commit/ec78887de476e7fb93a59a7accd5d52f5b9904fb))
* **issues:** add pagination ([4c1395b](https://github.com/Sonia-corporation/stale/commit/4c1395b1bb469740047d3fada26643359d5a43b8))
* **logs:** highlight the number of fetched issues ([df09f18](https://github.com/Sonia-corporation/stale/commit/df09f18ef920c88c7e6131e5825eaa790e6d36a0))

# [1.3.0](https://github.com/Sonia-corporation/stale/compare/1.2.0...1.3.0) (2021-11-07)


### :bug: Bug Fixes

* **issue:** display the issue link in purple ([a8f4687](https://github.com/Sonia-corporation/stale/commit/a8f4687ed016117b8a8c2902e6f2d2584d1aad06))
* **log:** display the proper end of tree symbol when logging the inputs ([0b53d66](https://github.com/Sonia-corporation/stale/commit/0b53d66576d032bf8ea9dd0ce99e5a3cc1b2c768))


### :rocket: Features

* **issue:** skip if locked ([05325a1](https://github.com/Sonia-corporation/stale/commit/05325a196632580f8b8adcae1bf455478a7e1103))

# [1.2.0](https://github.com/Sonia-corporation/stale/compare/1.1.0...1.2.0) (2021-11-07)


### :rocket: Features

* **logs:** add more logs to track the processing ([80afa14](https://github.com/Sonia-corporation/stale/commit/80afa14a5168b099e4e0db78284938f0d5ca08cb))
* **dry-run:** add new input dry-run and remove the required github-token ([71ad840](https://github.com/Sonia-corporation/stale/commit/71ad84010b317981c0deb3d7953be4b93060a0b6))

# [1.1.0](https://github.com/Sonia-corporation/stale/compare/1.0.0...1.1.0) (2021-11-06)


### :rocket: Features

* **issues:** fetch the issues to process and log the id ([9c79555](https://github.com/Sonia-corporation/stale/commit/9c79555879f840bbd080315a75d8914acf15ee8b))
* **issues:** log on error while fetching the issues ([495425f](https://github.com/Sonia-corporation/stale/commit/495425f94128b2c4445ae3533a688c2f919bfe9d))

# [1.0.0](https://github.com/Sonia-corporation/stale/compare/...1.0.0) (2021-11-06)


### :rocket: Features

* **error:** catch and stop the action in case of errors ([b1a8b23](https://github.com/Sonia-corporation/stale/commit/b1a8b23ba908ed77a013ea0eef6d43df5280d500))
* **error:** catch and stop the action in case of errors ([96d5b41](https://github.com/Sonia-corporation/stale/commit/96d5b4182c99296e1c133fe4966576f2de1fe134))
