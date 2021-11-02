import React, { useState } from 'react'
import { ethers } from 'ethers'
import { CSSTransition } from 'react-transition-group'

import styles from './styles.module.scss'

type ButtonProps = {
  recipientAddress: string
  label: string
  collapsedLabel: string
  onTransactionSent?: (tx: ethers.providers.TransactionResponse) => void
  onTransactionFinished?: (tx: ethers.providers.TransactionReceipt) => void
  onError?: (error: Error) => void
}

export const Button = ({
  recipientAddress,
  label,
  collapsedLabel,
  onTransactionSent,
  onTransactionFinished,
  onError
}: ButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [ethValue, setEthValue] = useState<number>(0.001)

  const handleClick = async () => {
    if (isExpanded) {
      setIsExpanded(false)
      return
    }

    try {
      setIsExpanded(true)

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()

      if (accounts.length === 0) {
        await provider.send('eth_requestAccounts', [])
      }

      const signer = provider.getSigner()

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(`${ethValue}`)
      })
      onTransactionSent && onTransactionSent(tx)

      const receipt = await tx.wait()
      onTransactionFinished && onTransactionFinished(receipt)
    } catch (error) {
      onError && onError(error)
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
      />
      <CSSTransition
        in={!isExpanded}
        timeout={200}
        classNames={{
          enterActive: styles.buttonEnterActive,
          enterDone: styles.buttonEnterDone,
          exitActive: styles.buttonExitActive,
          exitDone: styles.buttonExitDone,
          exit: styles.buttonExit
        }}
      >
        <button className={styles.button} onClick={handleClick}>
          {isExpanded ? label : collapsedLabel}
        </button>
      </CSSTransition>
    </div>
  )
}
