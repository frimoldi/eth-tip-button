import React from 'react'

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
      <Button recipientAddress='0x9b43748a60954F36A6547C5d653951532Af242e6'>
        Tip me some ETH!
      </Button>
    </div>
  )
}

export default App
