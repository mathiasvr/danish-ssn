# Danish SSN (CPR) [![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/danish-ssn.svg
[npm-url]: https://www.npmjs.com/package/danish-ssn

Validate and generate danish social security numbers (cpr-nummer)

## install
```shell
$ npm install danish-ssn
```

## usage

Validation is based on modulo-11 and century spans described in this [document](https://www.cpr.dk/media/17534/personnummeret-i-cpr.pdf) (in danish).

```js
var cpr = require('danish-ssn')

console.log(cpr('061093-7438'))
```

### cpr(cpr)
Retrieve information contained by the cpr number,
in the following format:

```javascript
{ cpr: '0610937438',
  valid: true,
  date: new Date('1893-10-06T00:00:00.000Z'),
  sex: 'Female' }
```

#### .isValid(cpr)
Returns whether or not the cpr number is valid*.

#### .validate(cpr)
Makes a cpr number valid by correcting the check digit.
Returns `null` if the cpr has no valid check digit.

#### .validForDate(date)
Generates a list of all valid* cpr numbers for a given date.

> *Note that since 2007, CPR numbers with invalid check digits has been issued for birthdays on January 1.

## license

MIT
