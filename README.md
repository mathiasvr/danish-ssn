# Danish SSN (CPR)

Validate and generate danish social security numbers (cpr-nummer)

## usage

Validation is based on modulo-11 and century spans decribed in this [document](https://cpr.dk/media/167692/personnummeret%20i%20cpr.pdf) (in danish).

### .info(cpr)
- Get information contained by the cpr number.

```js
{ cpr: '0610937438',
  valid: true,
  date: Fri Oct 06 1893 00:00:00 GMT+0200 (CEST),
  sex: 'Female' }
```

### .isValid(cpr)
- Returns whether or not the cpr number is valid*.

### .validate(cpr)
- Validates a cpr number by correcting the check digit or returning `null` if the cpr is invalid.

### .validForDate(date)
- Generates a list of all valid* cpr numbers for a given date.

## *note
CPR Numbers with invalid check digits has been issued since 2007!

## license

MIT
