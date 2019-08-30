## 2.0.2

- Remove Flow Declarations, Babel, Flow and ESLint config files from npm package

## 2.0.1

- Remove `spec` dir from `npm` package to fix flow errors in dependent modules

## 2.0.0

- Alter `promisifyAll` behavior to add `${methodName}Async` to given objects instead of replacing them
- Return `true` if `throwError` is `false` and `undefined` is returned
- Return `false` if `throwError` is `false` and Error is thrown
- Export functions in the babel style

## 1.3.0

- Add `promisifyAll` method

## 1.2.0

- Add `throwError` parameter

## 1.1.1

- Support older runtimes by using only Array.from when available and falling back to Array.prototype.slice

## 1.1.0

- Use commonjs exports intead of ES exports

## 1.0.0

- Initial implementation
