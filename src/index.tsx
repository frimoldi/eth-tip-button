import React, { useState } from 'react'
import { ethers } from 'ethers'

import styles from './styles.module.scss'

type ButtonProps = {
  recipientAddress: string
  label: string
  loadingLabel?: string
}

export const Button = ({
  recipientAddress,
  label,
  loadingLabel = 'Loading ...'
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [ethValue, setEthValue] = useState<number>(0.001)

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
        value: ethers.utils.parseEther(`${ethValue}`)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEthValue(e.target.valueAsNumber)
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type='number'
        step={0.001}
        value={ethValue}
        onChange={handleChange}
        disabled={isLoading}
      />
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? loadingLabel : label}
      </button>
    </div>
  )
}
