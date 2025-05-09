import '@testing-library/jest-dom'
import { vi } from 'vitest'

// This file is used to set up the testing environment
// You can add global mocks or other setup code here

// For example, if you need to mock the i18n functionality:
vi.mock('~/i18n', () => ({
  default: {},
  // Add any specific functions that need to be mocked
}))

// Mock the react-i18next hooks
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}))
