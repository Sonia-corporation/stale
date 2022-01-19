# Semantic Versioning Changelog

# [1.29.0](https://github.com/Sonia-corporation/stale/compare/1.28.0...1.29.0) (2022-01-19)


### :rocket: Features

* **outputs:** add draft pull requests count output ([675faea](https://github.com/Sonia-corporation/stale/commit/675faeab130b299d095ba2690e3519cd8da37b40))
  Add the `draft-pull-requests-count` output.
Add a new statistic to count the number of pull requests converted to draft.
* **draft:** add new input to convert a pull request to draft instead of stale ([1efadfb](https://github.com/Sonia-corporation/stale/commit/1efadfba8034cbf041ba830277791fe9c37c67fd)), closes [#275](https://github.com/Sonia-corporation/stale/issues/275)
  The input `pull-request-to-draft-instead-of-stale` was added.
When enabled, the processing will no longer stale.
It will instead convert the pull request to a draft.
No stale label added, no stale comment added nor extra labels added.

# [1.28.0](https://github.com/Sonia-corporation/stale/compare/1.27.1...1.28.0) (2022-01-18)


### :rocket: Features

* **processing:** add new input to enable or disable the processing ([b57eac0](https://github.com/Sonia-corporation/stale/commit/b57eac07802080d49ce925ffdec34fc1fb23049c)), closes [#277](https://github.com/Sonia-corporation/stale/issues/277)
  Add the `issue-processing` and `pull-request-processing` inputs.
When enabled, the processing occurs as expected.
When disabled, the processing will be skipped.

## [1.27.1](https://github.com/Sonia-corporation/stale/compare/1.27.0...1.27.1) (2022-01-12)


### :bug: Bug Fixes

* **stale:** add in last the stale label to avoid removing the stale the next run ([cb7257d](https://github.com/Sonia-corporation/stale/commit/cb7257daf0d10d778ed05f36f31c2c62fa6fc2a8))
  add the stale comment and the extra labels before adding the stale label
this will avoid an issue with the update date being more recent than the stale label addition date
* **deps:** update dependency luxon to v2.3.0 ([b3f91a7](https://github.com/Sonia-corporation/stale/commit/b3f91a744136951fe74f6900bc25d987727d6fc2))

# [1.27.0](https://github.com/Sonia-corporation/stale/compare/1.26.0...1.27.0) (2022-01-10)


### :rocket: Features

* **logs:** add a log when a statistic is increased ([3885885](https://github.com/Sonia-corporation/stale/commit/388588543dd76c0dfc273ba4bd8cfb8c6cd232c7))
  Showing by how many the count was increased and also showing the new total count
* **stats:** add a new statistic for the number of issue added labels ([4805b65](https://github.com/Sonia-corporation/stale/commit/4805b659b2af24fa60055b5842a87219ad688e74))
* **stats:** add a new statistic for the number of PR added labels ([ef5edab](https://github.com/Sonia-corporation/stale/commit/ef5edab8762acd5a9143da35d6240e60324d46ac))
* **label:** add new inputs to add extra labels after marking as stale ([39433b0](https://github.com/Sonia-corporation/stale/commit/39433b0f83ca4e4debd9797a048801a77868199f))
  Added the `issue-add-labels-after-stale` input
Added the `pull-request-add-labels-after-stale` input
* **outputs:** add new outputs for the count of added labels ([397a712](https://github.com/Sonia-corporation/stale/commit/397a712bde7fc45494b01b4afdeb2292f19862af))

# [1.26.0](https://github.com/Sonia-corporation/stale/compare/1.25.1...1.26.0) (2022-01-02)


### :rocket: Features

* **logs:** add counts in the batches and processed items logs ([2022cf0](https://github.com/Sonia-corporation/stale/commit/2022cf0e93c88f0105b8ac2f91cb17e1b9172320))
* **pull-request:** add new input `pull-request-delete-branch-after-close` ([cc53931](https://github.com/Sonia-corporation/stale/commit/cc53931ad5625307f86e8a048c12b483d7f2af99))
  When a pull request is closed by the processing, if the option is enabled and the dry-run is disabled, the related branch will be removed
A new output was also added to track the number of deleted pull request branches

## [1.25.1](https://github.com/Sonia-corporation/stale/compare/1.25.0...1.25.1) (2022-01-01)


### :bug: Bug Fixes

* **processing:** fix an issue with infinite batches processing ([218f164](https://github.com/Sonia-corporation/stale/commit/218f1641633388297bc4302bec4ad71048e89848))
  if the number of issues or pull requests to process was higher than 20, the processing was ending up in a infinity loop
this was due to a missing parameter from the endpoint request "endCursor" which was not requested and so, leading to undefined value
when the cursor is undefined, the first batch is processed hence the infinity loop

# [1.25.0](https://github.com/Sonia-corporation/stale/compare/1.24.0...1.25.0) (2022-01-01)


### :rocket: Features

* **pull-request:** add new input `pull-request-ignore-draft` ([639e9ba](https://github.com/Sonia-corporation/stale/commit/639e9ba357d41de615e0423f31ac3ecf72e98dcf))
  a pull request in draft can now be ignored from the processing


### :zap: Performance Improvements

* fix jest performances issues when running locally ([cb4a833](https://github.com/Sonia-corporation/stale/commit/cb4a833196ff07022e3f0f34d840a0e8039f85c0))

# [1.24.0](https://github.com/Sonia-corporation/stale/compare/1.23.0...1.24.0) (2021-12-16)


### :rocket: Features

* **pr:** add new inputs to support pull requests processing ([ab8f8a0](https://github.com/Sonia-corporation/stale/commit/ab8f8a090db6210c18314c4707bdbb294ce46042))
  this is the same implementation than the issues inputs
from this point, issues and pull requests have the exact same options and features and this is closing the alpha state off this action

# [1.23.0](https://github.com/Sonia-corporation/stale/compare/1.22.0...1.23.0) (2021-12-11)


### :bug: Bug Fixes

* **deps:** update dependency luxon to v2.2.0 ([03b420a](https://github.com/Sonia-corporation/stale/commit/03b420a8d0f4a9a8f5f8843a9ca744208f71ae46))


### :rocket: Features

* **issue:** add new input "issue-ignore-all-project-cards" ([91193f2](https://github.com/Sonia-corporation/stale/commit/91193f25428423e92ce6b87c231d8d99c9512597))

# [1.22.0](https://github.com/Sonia-corporation/stale/compare/1.21.0...1.22.0) (2021-12-07)


### :rocket: Features

* **debug:** add more logs to debug in case a label does not exist in your repo ([0c00efb](https://github.com/Sonia-corporation/stale/commit/0c00efbe379f6f50124bc7e91efc726c4e73abf1))

# [1.21.0](https://github.com/Sonia-corporation/stale/compare/1.20.0...1.21.0) (2021-12-06)


### :rocket: Features

* **issue:** add new input issue-close-comment to comment on close ([a026020](https://github.com/Sonia-corporation/stale/commit/a0260200e2149a1be591f2ee7b1e97a6e6089115))

# [1.20.0](https://github.com/Sonia-corporation/stale/compare/1.19.0...1.20.0) (2021-12-05)


### :rocket: Features

* **issue:** add new input issue-stale-comment to comment on stale ([1a4abcd](https://github.com/Sonia-corporation/stale/commit/1a4abcde462e3b35254b18dedf20a820ab584783))

# [1.19.0](https://github.com/Sonia-corporation/stale/compare/1.18.0...1.19.0) (2021-12-05)


### :rocket: Features

* **issue:** add new option to ignore some assignees ([6876cfd](https://github.com/Sonia-corporation/stale/commit/6876cfd121e9a8eb7d1972977b43f969c097362c))

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
