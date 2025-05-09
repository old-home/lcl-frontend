import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { links, Layout, default as App, ErrorBoundary } from './root'

// Mock the react-router components
vi.mock('react-router', () => ({
  isRouteErrorResponse: vi.fn(error => error && error.status !== undefined),
  Links: () => <div data-testid="links">Links</div>,
  Meta: () => <div data-testid="meta">Meta</div>,
  Outlet: () => <div data-testid="outlet">Outlet</div>,
  Scripts: () => <div data-testid="scripts">Scripts</div>,
  ScrollRestoration: () => <div data-testid="scroll-restoration">ScrollRestoration</div>,
}))

// Mock i18n
vi.mock('./i18n', () => ({
  default: {},
}))

describe('Root components', () => {
  describe('links function', () => {
    it('should return the correct link objects', () => {
      const result = links()

      expect(result).toHaveLength(3)
      expect(result[0].rel).toBe('preconnect')
      expect(result[0].href).toBe('https://fonts.googleapis.com')

      expect(result[1].rel).toBe('preconnect')
      expect(result[1].href).toBe('https://fonts.gstatic.com')
      expect(result[1].crossOrigin).toBe('anonymous')

      expect(result[2].rel).toBe('stylesheet')
      expect(result[2].href).toContain('fonts.googleapis.com')
    })
  })

  describe('Layout component', () => {
    it('should render children', () => {
      render(
        <Layout>
          <div data-testid="test-child">Test Child</div>
        </Layout>
      )

      // Check if the children are rendered
      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByText('Test Child')).toBeInTheDocument()
    })
  })

  describe('App component', () => {
    it('should render without crashing', () => {
      expect(() => render(<App />)).not.toThrow()
    })
  })

  describe('ErrorBoundary component', () => {
    it('should render without crashing', () => {
      const error = new Error('Test error')
      expect(() => render(<ErrorBoundary error={error} />)).not.toThrow()
    })
  })
})
