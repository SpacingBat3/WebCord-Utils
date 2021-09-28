# JSONC Parser

A simple module to parse *JSON with comments* files to JavaScript object.

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

## Advanced usage

### 

### Custom comments formats

By the default, `jsonc-parser` only accepts the comments that are valid for the
regular JavaScript files, but if you want to parse the other comments formats,
you may specify them as shown below:

``` ts
import JSONC from '@spacingbat3/jsonc-parser'

const myCustomRules = [
    { rule: /#.*/ },                     // e.g. `# My comment`
    { rule: />>.*/, multiline: 'start' } // e.g. `>> First line of a comment`
    { rule: /.*<</, multiline: 'end' }   // e.g. `Last line of a comment <<`
]

const parsedObject = JSONC.parse('file.jsonc', myCustomRules)

console.log(parsedObject) // e.g. { "foo": "bar" }
```