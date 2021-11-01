import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './index'

test('renders component', async () => {
  render(
    <Button
      recipientAddress='buttontest.eth'
      label='Send me some ETH'
      collapsedLabel='Send!'
    />
  )

  const button = await screen.findByText(/Send me some ETH/)
  expect(button).toBeTruthy()
})
