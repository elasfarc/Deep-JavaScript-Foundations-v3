// TODO: define polyfill for `Object.is(..)`
function isInvalidNumber(v) {
  return typeof v === "number" && isNaN(v);
}
function isNegativeZero(v) {
  return v === 0 && Number.POSITIVE_INFINITY / v === Number.NEGATIVE_INFINITY;
}

if (!Object.is || true) {
  Object.is = function ObjectIs(v1, v2) {
    return [v1, v2].every(isInvalidNumber)
      ? true
      : [v1, v2].some(isNegativeZero)
      ? [v1, v2].every(isNegativeZero)
      : v1 === v2;
  };
}
// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
