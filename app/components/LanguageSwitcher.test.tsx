import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';

// Mock the useTranslation hook
const mockChangeLanguage = vi.fn();
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('LanguageSwitcher Component', () => {
  it('renders language buttons correctly', () => {
    render(<LanguageSwitcher />);

    // Check if both language buttons are rendered
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('highlights the active language button', () => {
    render(<LanguageSwitcher />);

    // Since we mocked the language to be 'en', the EN button should have the active class
    const enButton = screen.getByText('EN');
    const jpButton = screen.getByText('JP');

    expect(enButton.className).toContain('bg-green-600');
    expect(jpButton.className).toContain('bg-gray-800');
  });

  it('calls changeLanguage when a language button is clicked', () => {
    render(<LanguageSwitcher />);

    // Click the JP button
    fireEvent.click(screen.getByText('JP'));

    // Check if changeLanguage was called with 'ja'
    expect(mockChangeLanguage).toHaveBeenCalledWith('ja');

    // Click the EN button
    fireEvent.click(screen.getByText('EN'));

    // Check if changeLanguage was called with 'en'
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
