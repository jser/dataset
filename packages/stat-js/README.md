# jser-stat

JSer.info stat library

## Installation

    npm install jser-stat

## Usage

### Models

jser-stat has these model.

- [src/models/JSerItem.js](src/models/JSerItem.js) from [jser/source-data](https://github.com/jser/source-data "jser/source-data")
- [src/models/JSerItemRelatedLink.js](src/models/JSerItemRelatedLink.js) is sub model of JSerItem.
- [src/models/JSerPost.js](src/models/JSerPost.js) from [jser/jser.github.io](https://github.com/jser/jser.github.io "jser/jser.github.io")
- [src/models/JSerWeek.js](src/models/JSerWeek.js) is JSerItem + JSerPost

### getItemsBetWeen(beginDate, endDate): JSerItem[]

return JSerItems between two dates

### getJSerWeeks(): JSerWeek[]

return all JSerWeeks

### getJSerWeeksBetWeen(beginDate, endDate):  JSerWeek[]

return JSerWeeks between two dates

### getJSerWeek(number): JSerWeek

number start with 1.

return JSerWeek at the number.

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
