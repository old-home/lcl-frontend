import React, { useState } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '~/components/LanguageSwitcher'
import '~/i18n'

export const meta = () => {
  return [
    { title: "Register - LCL" },
    { name: "description", content: "Create a new LCL account" }
  ]
}

export default function Register() {
  const { t } = useTranslation('Auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (email) {
      setEmailError(t('form.email'))
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError(t('form.passwordMismatch'))
    } else {
      setPasswordError('')
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
    if (password && e.target.value !== password) {
      setPasswordError(t('form.passwordMismatch'))
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError(t('form.passwordMismatch'))
      return
    }
    // Handle registration logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      <LanguageSwitcher />

      <div className="form-container">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-500">
          {t('register.title')}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">{t('register.email')}</label>
            <input
              type="email"
              className="input-field"
              required
              value={email}
              onChange={handleEmail}
            />
            {emailError && (
              <p className="text-red-500 mt-1 text-sm">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">{t('register.password')}</label>
            <input
              type="password"
              className="input-field"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">{t('register.confirmPassword')}</label>
            <input
              type="password"
              className="input-field"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 mt-1 text-sm">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={!!passwordError}
          >
            {t('register.submit')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="link">
            {t('register.loginLink')}
          </Link>
        </div>
      </div>
    </div>
  )
}
