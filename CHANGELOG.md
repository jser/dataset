# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="1.1.0"></a>
# [1.1.0](https://github.com/jser/dataset/compare/v1.0.3...v1.1.0) (2018-05-03)


### Bug Fixes

* **algo:** beginIndex === endIndex then return item[index] ([8c08407](https://github.com/jser/dataset/commit/8c08407))
* **algo:** beginIndex === endIndex then return item[index] ([42cd5ba](https://github.com/jser/dataset/commit/42cd5ba))
* **algo:** rename method ([dd36891](https://github.com/jser/dataset/commit/dd36891))
* **AlgoItem:** fix `findItemsBetween` algorithm ([789abc9](https://github.com/jser/dataset/commit/789abc9))
* **classifier-item-category:** remove unused data ([cb97d33](https://github.com/jser/dataset/commit/cb97d33))
* **data:** correct order when save ([8849a36](https://github.com/jser/dataset/commit/8849a36))
* **data:** enhance fetch data ([966c3c2](https://github.com/jser/dataset/commit/966c3c2))
* **data:** use request instead of http ([d66a12d](https://github.com/jser/dataset/commit/d66a12d))
* **data-fetcher:** fix postDetails url ([83b1402](https://github.com/jser/dataset/commit/83b1402))
* **example:** add item and posts ([82992dc](https://github.com/jser/dataset/commit/82992dc))
* **index:** export as class ([1590510](https://github.com/jser/dataset/commit/1590510))
* **JSerStat:** `posts` data are sorted by date ([95ba80e](https://github.com/jser/dataset/commit/95ba80e))
* **JSerStat:** fix JSer#findJSerWeeksBetween ([dc08360](https://github.com/jser/dataset/commit/dc08360))
* **JSerState:** fix #getJSerWeeks when posts equal to 1 ([05502b4](https://github.com/jser/dataset/commit/05502b4))
* **JSerWeek:** fix to correct begin is prev post ([eefc2ae](https://github.com/jser/dataset/commit/eefc2ae))
* **model:** add content to JSerItem ([84bb058](https://github.com/jser/dataset/commit/84bb058))
* **model:** post -> item ([661a3d2](https://github.com/jser/dataset/commit/661a3d2))
* **npm:** add bin to files ([23a62e3](https://github.com/jser/dataset/commit/23a62e3))
* **npm:** add test script ([891ff08](https://github.com/jser/dataset/commit/891ff08))
* **npm:** use console.log ([693dbd6](https://github.com/jser/dataset/commit/693dbd6))
* **stat:** fix stat test ([e65ae01](https://github.com/jser/dataset/commit/e65ae01))
* **stat:** fix transpile bug? ([0b9d985](https://github.com/jser/dataset/commit/0b9d985))
* **stat:** remove bin ([60fc48b](https://github.com/jser/dataset/commit/60fc48b))
* **test:** fix method name ([0202b3a](https://github.com/jser/dataset/commit/0202b3a))
* change deps to "[@jser](https://github.com/jser)/stat" ([43393dc](https://github.com/jser/dataset/commit/43393dc))
* remove cli ([2c76613](https://github.com/jser/dataset/commit/2c76613))
* **test:** TODO: why class JSerItem fail... ([a251844](https://github.com/jser/dataset/commit/a251844))


### Features

* **algo:** could get JSerItem between dates ([5c16cf0](https://github.com/jser/dataset/commit/5c16cf0))
* **cli:** add update-jser-stat command ([42b0824](https://github.com/jser/dataset/commit/42b0824))
* **compute:** add countByGroup function ([a900f50](https://github.com/jser/dataset/commit/a900f50))
* **example:** add bench time to example.js ([ed78de8](https://github.com/jser/dataset/commit/ed78de8))
* **example:** add browser example ([ebb61d9](https://github.com/jser/dataset/commit/ebb61d9))
* **example:** add example ([eaa4ef2](https://github.com/jser/dataset/commit/eaa4ef2))
* **example:** add example.js ([017f17a](https://github.com/jser/dataset/commit/017f17a))
* **JSerStat:** add JSer#findJSerWeekWithURL ([a92137d](https://github.com/jser/dataset/commit/a92137d))
* **JSerStat:** implement #findItemWithURL ([b3c9993](https://github.com/jser/dataset/commit/b3c9993))
* **JSerStat:** implement #findWeekWithItem ([3952d70](https://github.com/jser/dataset/commit/3952d70))
* **model:** add post/weekNumber ([0033440](https://github.com/jser/dataset/commit/0033440))
* **natural:** add NaturalSearcher ([537c26a](https://github.com/jser/dataset/commit/537c26a))
* **natural:** add tags to search index ([ee0c3bf](https://github.com/jser/dataset/commit/ee0c3bf))
* **posts:** add categoriy filter ([a5c8852](https://github.com/jser/dataset/commit/a5c8852))
* **stat:** add [@jser](https://github.com/jser)/stat ([c6e1c42](https://github.com/jser/dataset/commit/c6e1c42))
* **Stat:** add getItemsBetWeen ([79116d4](https://github.com/jser/dataset/commit/79116d4)), closes [#1](https://github.com/jser/dataset/issues/1)
* add DefaultData ([5a85489](https://github.com/jser/dataset/commit/5a85489))
* **week:** add #getJSerWeeksBetWeen ([ecbbf31](https://github.com/jser/dataset/commit/ecbbf31))


### Performance Improvements

* **algo:** use binary search ([23d3e76](https://github.com/jser/dataset/commit/23d3e76))
* **JSerStat:** improve #findWeekWithItem ([71cbbf2](https://github.com/jser/dataset/commit/71cbbf2))
* **JSerStat:** introduce lazy prop for JSerWeek ([adab544](https://github.com/jser/dataset/commit/adab544))
* **JSerStat:** make NaturalSearch lazy prop ([1cebfae](https://github.com/jser/dataset/commit/1cebfae))




<a name="1.0.3"></a>
## [1.0.3](https://github.com/jser/dataset/compare/v1.0.2...v1.0.3) (2018-05-03)


### Bug Fixes

* tz ([7d98d68](https://github.com/jser/dataset/commit/7d98d68))
* url ([b6e2e2f](https://github.com/jser/dataset/commit/b6e2e2f))
* utc ([1cf143f](https://github.com/jser/dataset/commit/1cf143f))




<a name="1.0.2"></a>
## [1.0.2](https://github.com/jser/dataset/compare/v1.0.1...v1.0.2) (2018-05-03)


### Bug Fixes

* **post-parser:** fix date and add url ([07c1f9a](https://github.com/jser/dataset/commit/07c1f9a))




<a name="1.0.1"></a>
## [1.0.1](https://github.com/jser/dataset/compare/v1.0.0...v1.0.1) (2018-05-03)




**Note:** Version bump only for package dataset

<a name="1.0.0"></a>
# 1.0.0 (2018-05-03)


### Bug Fixes

* **category:** rename to CategoryKey ([799467f](https://github.com/jser/dataset/commit/799467f))
* export ParseResult ([2f82dca](https://github.com/jser/dataset/commit/2f82dca))
* more strict support ([b6f4bda](https://github.com/jser/dataset/commit/b6f4bda))
* rename constructor ([e4336cc](https://github.com/jser/dataset/commit/e4336cc))
* return ParseResult[] ([bc6d8f3](https://github.com/jser/dataset/commit/bc6d8f3))
* **lerna:** fix test ([ab27552](https://github.com/jser/dataset/commit/ab27552))
* **parser:** add line break after tag html ([3beafdc](https://github.com/jser/dataset/commit/3beafdc))


### Features

* **category:** add CategoryKeys ([ba403e2](https://github.com/jser/dataset/commit/ba403e2))
* support content parser ([d228e0c](https://github.com/jser/dataset/commit/d228e0c))
* **category:** add JSer.info specific terminology ([062640d](https://github.com/jser/dataset/commit/062640d))
* **data-fetcher:** add data-fetcher ([b3f1142](https://github.com/jser/dataset/commit/b3f1142))
* **jser:** add absolute classify ([6a3b54d](https://github.com/jser/dataset/commit/6a3b54d))
* **parse:** add meta data ([376f12d](https://github.com/jser/dataset/commit/376f12d))
* **tag:** add "news" as Headline ([086f4ae](https://github.com/jser/dataset/commit/086f4ae))
