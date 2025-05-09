import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Register, { meta } from './register'

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

describe('Register Component', () => {
  it('renders the registration form correctly', () => {
    render(<Register />)

    // Check if the title is rendered
    expect(screen.getByText('register.title')).toBeInTheDocument()

    // Check if the labels are rendered
    expect(screen.getByText('register.email')).toBeInTheDocument()
    expect(screen.getByText('register.password')).toBeInTheDocument()
    expect(screen.getByText('register.confirmPassword')).toBeInTheDocument()

    // Check if the submit button is rendered
    expect(screen.getByText('register.submit')).toBeInTheDocument()

    // Check if the login link is rendered
    expect(screen.getByText('register.loginLink')).toBeInTheDocument()

    // Check if the language switcher is rendered
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('provides correct meta information', () => {
    const metaData = meta()

    // Check if the title is correct
    expect(metaData).toContainEqual({ title: 'Register - LCL' })

    // Check if the description is correct
    expect(metaData).toContainEqual({
      name: 'description',
      content: 'Create a new LCL account',
    })
  })
})
