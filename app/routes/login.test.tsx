import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Login, { meta } from './login'

// Mock React hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    useState: vi.fn().mockImplementation(initialValue => [initialValue, vi.fn()]),
  }
})

// Mock the LanguageSwitcher component
vi.mock('~/components/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>,
}))

// Mock the Link component from react-router
vi.mock('react-router', () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}))

describe('Login Component', () => {
  it('renders the login form with email mode by default', () => {
    render(<Login />)

    // Check if the title is rendered
    expect(screen.getByText('login.title')).toBeInTheDocument()

    // Check if the email input is rendered
    expect(screen.getByLabelText('login.email')).toBeInTheDocument()

    // Check if the password input is rendered
    expect(screen.getByLabelText('login.password')).toBeInTheDocument()

    // Check if the submit button is rendered
    expect(screen.getByText('login.submit')).toBeInTheDocument()

    // Check if the register link is rendered
    expect(screen.getByText('login.registerLink')).toBeInTheDocument()

    // Check if the mode toggle button is rendered
    expect(screen.getByText('login.switchToRootMode')).toBeInTheDocument()
  })

  it('provides correct meta information', () => {
    const metaData = meta()

    // Check if the title is correct
    expect(metaData).toContainEqual({ title: 'Login - LCL' })

    // Check if the description is correct
    expect(metaData).toContainEqual({
      name: 'description',
      content: 'Login to your LCL account',
    })
  })
})
