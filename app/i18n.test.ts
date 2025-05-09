import { describe, it, expect, vi } from 'vitest'
import i18n from './i18n'

// Mock the dependencies
vi.mock('i18next-browser-languagedetector', () => ({}))
vi.mock('i18next-http-backend', () => ({}))
vi.mock('react-i18next', () => ({
  initReactI18next: {},
}))

describe('i18n configuration', () => {
  it('should export an i18n instance', () => {
    expect(i18n).toBeDefined()
  })
})
