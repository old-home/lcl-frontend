import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '~/components/LanguageSwitcher'
import '~/i18n'

export default function Login() {
  const { t } = useTranslation('Auth')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      <LanguageSwitcher />

      <div className="form-container">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-500">
          {t('login.title')}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">{t('login.email')}</label>
            <input
              type="email"
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">{t('login.password')}</label>
            <input
              type="password"
              className="input-field"
              required
            />
          </div>

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
