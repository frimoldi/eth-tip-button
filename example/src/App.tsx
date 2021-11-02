import React, { useState } from 'react'

import { Button } from 'eth-tip-button'
import 'eth-tip-button/dist/index.css'

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button
        recipientAddress='0x9b43748a60954F36A6547C5d653951532Af242e6'
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
    </div>
  )
}

export default App
