import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My app works', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaFrom = app.getByPlaceholderText('Type something...')

  await user.type(textareaFrom, 'Hola mundo')
  const result = app.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy()
})
