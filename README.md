# eth-tip-button

> A simple React button to accept tips in ETH

[![NPM](https://img.shields.io/npm/v/eth-tip-button.svg)](https://www.npmjs.com/package/eth-tip-button) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save eth-tip-button
```
```bash
yarn add eth-tip-button
```

## Usage

```tsx
import React, { Component } from 'react'

import { Button } from 'eth-tip-button'

const Example = () => {
    return (
      <Button
        recipientAddress="<YOUR_ETH_ADDRESS>"
        label="Tip me some ETH"
        onTransactionFinished={(tx) => console.log("Done! Transaction finished: ", tx)}
        onError={(error) => console.log("Something went wrong: ", error)}
      />
    )
}
```
## License

MIT © [frimoldi.eth](https://github.com/frimoldi)
