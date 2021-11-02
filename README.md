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
import React from 'react'

import { Button } from 'eth-tip-button'

const Example = () => {
    return (
      <Button
        recipientAddress='<YOUR_ETH_ADDRESS>'
        label='Send me ETH!'
        collapsedLabel='Send'
        onTransactionSent={(tx) => {
          console.log('Transaction sent: ', tx)
        }}
        onTransactionFinished={(tx) => {
          console.log('Transaction finished: ', tx)
        }}
        onError={(error) => {
          console.log('Something went wrong: ', error)
        }}
      />
    )
}
```

## Demo
![Demo](http://g.recordit.co/Mcc2iQ9fOF.gif)

## License

MIT © [frimoldi.eth](https://github.com/frimoldi)
