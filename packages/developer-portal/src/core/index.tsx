import * as Sentry from '@sentry/browser'
import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Config } from '@/types/global'
import { getMarketplaceGlobalsByKey } from '@reapit/elements-legacy'
import { logger } from '@reapit/utils-react'

// Init global config
window.reapit = {
  config: {
    appEnv: 'production',
    sentryDns: '',
    googleAnalyticsKey: '',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    chatbotAppId: '',
    marketplaceUrl: '',
    platformApiUrl: '',
    developerEditionDownloadUrl: '',
    adobeSignApiKey: '',
    liveChatWhitelist: [],
    elementsUri: '',
    graphQLUri: '',
    analyticsSchemaDocsUrl: '',
    swaggerUri: '',
    PUSHER_KEY: '',
    DEPLOYMENT_SERVICE_HOST: '',
  },
}

export const renderApp = (Component: React.ComponentType) => {
  const rootElement = document.querySelector('#root') as Element
  const isDesktop = getMarketplaceGlobalsByKey()
  const html = document.querySelector('html')
  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }
  if (window.location.href.includes('developer')) {
    document.title = 'Developers'
  }
  if (rootElement) {
    render(<Component />, rootElement)
  }
}

const run = async () => {
  try {
    const configRes = await fetch('config.json')
    const config = (await configRes.json()) as Config

    const isLocal = config.appEnv !== 'production'
    if (!isLocal && config.sentryDns && !window.location.hostname.includes('prod.paas')) {
      Sentry.init({
        release: process.env.APP_VERSION,
        dsn: config.sentryDns,
        environment: config.appEnv,
      })
    }

    if (!isLocal && config.googleAnalyticsKey) {
      ReactGA.initialize(config.googleAnalyticsKey)
      ReactGA.pageview(window.location.pathname + window.location.search)
    }

    window.reapit.config = config

    const { default: App } = await import('./app')
    renderApp(App)
  } catch (error) {
    logger(error)
  }
}

if (module['hot']) {
  module['hot'].accept('./app', () => {
    const NextApp = require('./app').default
    renderApp(NextApp)
  })
}

run()
