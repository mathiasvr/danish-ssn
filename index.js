var pad = require('pad-left')
var moment = require('moment')

// parse two-digit year in 1900
moment.parseTwoDigitYear = function (input) {
  return parseInt(input, 10) + 1900
}

var multipliers = [4, 3, 2, 7, 6, 5, 4, 3, 2, 1]

function sumProduct (a, b) {
  return a.reduce(function (sum, digit, i) { return sum + digit * b[i] }, 0)
}

function modulo11 (cpr) {
  return sumProduct(cpr.split(''), multipliers) % 11
}

function sanitize (cpr) {
  if (typeof cpr !== 'string') {
    throw TypeError('Invalid CPR: must be of type string')
  }

  // extract digits
  cpr = cpr.replace(/[^\d]/g, '')

  if (cpr.length !== 10) {
    throw TypeError('Invalid CPR: must consist of 10 digits')
  }

  return cpr
}

function isValid (cpr) {
  return modulo11(cpr) === 0
}

// validate cpr by correcting/adding the check digit
function validate (cpr) {
  cpr = cpr.substring(0, 9)

  var checkDigit = (11 - modulo11(cpr)) % 11

  return checkDigit === 10 ? null : cpr + checkDigit
}

function getDate (cpr) {
  var digit7 = parseInt(cpr[6], 10)

  var date = moment.utc(cpr.substring(0, 6), 'DDMMYY')

  // century correction
  if (digit7 === 4 || digit7 === 9) {
    // 1900 or 2000
    if (date.year() <= 1936) date.add(100, 'years')
  } else if (digit7 > 4) {
    // 1800 or 2000
    date.add(date.year() > 1957 ? -100 : 100, 'years')
  }

  return date.toDate()
}

function getSex (cpr) {
  return cpr % 2 ? 'Male' : 'Female'
}

function getInfo (cpr) {
  return {
    cpr: cpr,
    valid: isValid(cpr),
    date: getDate(cpr),
    sex: getSex(cpr)
  }
}

// list all valid cpr numbers for a date, using modulo-11 and century check
function validForDate (date) {
  var year = date.getFullYear()
  var dateString = moment(date).format('DDMMYY')

  var validNumbers = []

  for (var i = 0; i < 1000; i++) {
    // generate cpr and validate it by adding the check digit
    var cpr = validate(dateString + pad(i, 3, '0'))

    if (cpr && getDate(cpr).getFullYear() === year) {
      validNumbers.push(cpr)
    }
  }

  return validNumbers
}

var cpr = function (cpr) { return getInfo(sanitize(cpr)) }
cpr.isValid = function (cpr) { return isValid(sanitize(cpr)) }
cpr.validate = function (cpr) { return validate(sanitize(cpr)) }
cpr.validForDate = validForDate

module.exports = cpr
