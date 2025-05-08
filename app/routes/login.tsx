import React, { useState } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '~/components/LanguageSwitcher'
import '~/i18n'

export default function Login() {
  const { t } = useTranslation('Auth')
  const [loginMode, setLoginMode] = useState<'email' | 'root'>('email')

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rootAccountId, setRootAccountId] = useState('')
  const [iamAccount, setIamAccount] = useState('')
  const [formError, setFormError] = useState('')

  const validateForm = () => {
    setFormError('')

    if (loginMode === 'email') {
      if (!email) {
        setFormError(t('form.required'))
        return false
      }
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setFormError(t('form.emailInvalid'))
        return false
      }
    } else {
      if (!rootAccountId) {
        setFormError(t('form.required'))
        return false
      }
      if (!iamAccount) {
        setFormError(t('form.required'))
        return false
      }
    }

    if (!password) {
      setFormError(t('form.required'))
      return false
    }

    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Handle login logic here
      console.log('Login mode:', loginMode)
      if (loginMode === 'email') {
        console.log('Email login:', { email, password })
      } else {
        console.log('Root account login:', { rootAccountId, iamAccount, password })
      }
    }
  }

  const toggleLoginMode = () => {
    setLoginMode(loginMode === 'email' ? 'root' : 'email')
    setFormError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      <LanguageSwitcher />

      <div className="form-container">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-500">
          {t('login.title')}
        </h1>

        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={toggleLoginMode}
            className="text-green-500 underline"
          >
            {loginMode === 'email'
              ? t('login.switchToRootMode')
              : t('login.switchToEmailMode')}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {formError && (
            <div className="mb-4 text-red-500 text-sm">
              {formError}
            </div>
          )}

          {loginMode === 'email' ? (
            <>
              <div className="mb-4">
                <label className="block mb-2">{t('login.email')}</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2">{t('login.password')}</label>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block mb-2">{t('login.rootAccountId')}</label>
                <input
                  type="text"
                  className="input-field"
                  value={rootAccountId}
                  onChange={(e) => setRootAccountId(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">{t('login.iamAccount')}</label>
                <input
                  type="text"
                  className="input-field"
                  value={iamAccount}
                  onChange={(e) => setIamAccount(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2">{t('login.password')}</label>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn-primary w-full">
            {t('login.submit')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/users/register" className="link">
            {t('login.registerLink')}
          </Link>
        </div>
      </div>
    </div>
  )
}
