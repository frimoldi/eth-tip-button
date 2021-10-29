import * as React from 'react'
import { ethers } from 'ethers'
import styles from './styles.module.css'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

type ButtonProps = {
  recipientAddress: string
  children: React.ReactChild
}

export const Button = ({ recipientAddress, children }: ButtonProps) => {
  // const [account, setAccount] = useState('')

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts()

    if (accounts.length === 0) {
      await provider.send('eth_requestAccounts', [])
    }

    const signer = await provider.getSigner()
    const address = await signer.getAddress()

    console.log(`Connected to ${address}`)

    const tx = await signer.sendTransaction({
      to: '0x9b43748a60954F36A6547C5d653951532Af242e6',
      value: ethers.utils.parseEther('0.001')
    })

    console.log(tx)

    const receipt = await tx.wait()

    console.log(receipt)
  }

  console.log(recipientAddress)
  return <button onClick={handleClick}>{children}</button>
}
