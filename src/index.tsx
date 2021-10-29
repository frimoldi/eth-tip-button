import React, { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()

      if (accounts.length === 0) {
        await provider.send('eth_requestAccounts', [])
      }

      const signer = provider.getSigner()
      const address = await signer.getAddress()

      console.log(`Connected to ${address}`)

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther('0.001')
      })

      console.log(tx)

      const receipt = await tx.wait()

      console.log(receipt)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading ...' : children}
    </button>
  )
}
