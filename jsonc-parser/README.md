# JSONC Parser

A simple module to parse *JSON with comments* files with the magic of `RegExp`.

It allows for the specifying your own comments `RegExp`'s as I couldn't found
any information about JSONC being standarized (so for instance, if your JSONC
file has single-line comments starting with hashtag, you can include that as an
additional rule as well).

## Usage

### CommonJS

```js
const JSONC = require('@spacingbat3/jsonc-parser')

const parsedObject = JSONC.parse('file.jsonc')

console.log(parsedObject) // e.g. { "foo": "bar" }
```

### ES6 / TypeScript

```ts
import JSONC from '@spacingbat3/jsonc-parser'

/* NOTE: `pasedObject` is of the unknown type! */
const parsedObject = JSONC.parse('file.jsonc')

console.log(parsedObject) // e.g. { "foo": "bar" }
```

### Custom comments formats

By the default, `jsonc-parser` only accepts the comments that are valid for the
regular JavaScript files, but if you want to parse the other comments formats,
you may specify them as shown below:

``` ts
import JSONC from '@spacingbat3/jsonc-parser'

/* 
 * Removes the JavaScript-like comments and `sh`-like comments
 * (e.g. `{ "foo": "bar" # comment }`).
 */
const parsedObject = JSONC.parse('file.jsonc', /#.*/g)

console.log(parsedObject) // e.g. { "foo": "bar" }
```