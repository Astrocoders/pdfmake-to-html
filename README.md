pdfmakeToHTML
==========
[![travis](https://travis-ci.org/Astrocoders/pdfmake-to-html.svg?branch=develop)](https://travis-ci.org/Astrocoders/pdfmake-to-html)

Convert pdfmake's JSON tree into a DOM tree

## Install
```
yarn add pdfmake-to-html
```

# Usage
```js
import pdfmakeToHTML from 'pdfmake-to-html'

const documentDefinition = {
  table: {
    body: [
      [ `I'm a column`, `I'm a column` ],
    ]
  },
}

const dom = pdfmakeToHTML(documentDefinition) // that's it!
```

Not all structures are supported until this very moment and there are a lot of specifics for my usage now (semantic UI, table renders actually to a grid).
But I intend to make it more general purpose in the near future.
