// const { withSentryConfig } = require('@sentry/nextjs')
const i18n = {
  locales: [
    'en',
    'ja',
    'zh-Hans',
    'zh-Hant',
    'ko',
    'es',
    'fr',
    'de',
    'ru',
    'pt',
    'pt-br',
  ],
  defaultLocale: 'en',
  localeDetection: false,
}
const moduleExports = {
  reactStrictMode: true,
  i18n,
}
module.exports = moduleExports
/** @type {import('next').NextConfig} */
