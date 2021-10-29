import React from 'react'

import { Button } from 'eth-tip-button'
import 'eth-tip-button/dist/index.css'

const App = () => {
  return (
    <Button recipientAddress='0x9b43748a60954F36A6547C5d653951532Af242e6'>
      Tip me some ETH!
    </Button>
  )
}

export default App
