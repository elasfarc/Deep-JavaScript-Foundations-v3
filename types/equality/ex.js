/*
	- exact matches (`Object.is(..)`)
	- `null` can match `undefined`, and vice versa
	- booleans can only match booleans
	- objects only match the exact same object

	- strings (except "" or whitespace-only) can match numbers
	- numbers (except `NaN` and `+/- Infinity`) can match strings (hint: watch out for `-0`!)
*/

// TODO: write `findAll(..)`
function findAll(value, array) {
  return array.reduce((memo, element) => {
    const pair = [element, value];
    if (
      Object.is(element, value) ||
      pair.every((v) => v == null) ||
      (pair.every((v) => typeof v == "boolean") && element == value) ||
      (isStringNumberPair(pair) && negativeZeroCheck(pair) && element == value)
    ) {
      memo.push(element);
    }

    return memo;
  }, []);

  //*************** */
  function isStringNumberPair(pair) {
    const [v1, v2] = pair;
    return (
      (isValidNumber(v1) && isValidString(v2)) ||
      (isValidNumber(v2) && isValidString(v1))
    );
  }
  function isValidString(v) {
    return typeof v == "string" && v.trim() != "";
  }
  function isValidNumber(v) {
    return (
      typeof v == "number" &&
      [NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY].every(
        (specialNumber) => v != specialNumber
      )
    );
  }
  function negativeZeroCheck(pair) {
    return pair.some(isNegativeZero) ? pair.every(isNegativeZero) : true;
  }

  function isNegativeZero(v) {
    return v == 0 && 1 / v == Number.POSITIVE_INFINITY;
  }
}

// tests:
var myObj = { a: 2 };

var values = [
  null,
  undefined,
  -0,
  0,
  13,
  42,
  NaN,
  -Infinity,
  Infinity,
  "",
  "0",
  "42",
  "42hello",
  "true",
  "NaN",
  true,
  false,
  myObj,
];

console.log(setsMatch(findAll(null, values), [null, undefined]) === true);
console.log(setsMatch(findAll(undefined, values), [null, undefined]) === true);
console.log(setsMatch(findAll(0, values), [0, "0"]) === true);
console.log(setsMatch(findAll(-0, values), [-0]) === true);
console.log(setsMatch(findAll(13, values), [13]) === true);
console.log(setsMatch(findAll(42, values), [42, "42"]) === true);
console.log(setsMatch(findAll(NaN, values), [NaN]) === true);
console.log(setsMatch(findAll(-Infinity, values), [-Infinity]) === true);
console.log(setsMatch(findAll(Infinity, values), [Infinity]) === true);
console.log(setsMatch(findAll("", values), [""]) === true);
console.log(setsMatch(findAll("0", values), [0, "0"]) === true);
console.log(setsMatch(findAll("42", values), [42, "42"]) === true);
console.log(setsMatch(findAll("42hello", values), ["42hello"]) === true);
console.log(setsMatch(findAll("true", values), ["true"]) === true);
console.log(setsMatch(findAll(true, values), [true]) === true);
console.log(setsMatch(findAll(false, values), [false]) === true);
console.log(setsMatch(findAll(myObj, values), [myObj]) === true);

console.log(setsMatch(findAll(null, values), [null, 0]) === false);
console.log(setsMatch(findAll(undefined, values), [NaN, 0]) === false);
console.log(setsMatch(findAll(0, values), [0, -0]) === false);
console.log(setsMatch(findAll(42, values), [42, "42hello"]) === false);
console.log(setsMatch(findAll(25, values), [25]) === false);
console.log(
  setsMatch(findAll(Infinity, values), [Infinity, -Infinity]) === false
);
console.log(setsMatch(findAll("", values), ["", 0]) === false);
console.log(setsMatch(findAll("false", values), [false]) === false);
console.log(setsMatch(findAll(true, values), [true, "true"]) === false);
console.log(setsMatch(findAll(true, values), [true, 1]) === false);
console.log(setsMatch(findAll(false, values), [false, 0]) === false);

// ***************************

function setsMatch(arr1, arr2) {
  if (
    Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length == arr2.length
  ) {
    for (let v of arr1) {
      if (!arr2.includes(v)) return false;
    }
    return true;
  }
  return false;
}
