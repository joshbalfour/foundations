import * as React from 'react'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { IFRAME_URLS } from '@/constants/iframe-urls'
import {
  SmallText,
  Button,
  elHFull,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
} from '@reapit/elements'
import { iframeWrapper } from './__styles__/index'
import { openNewPage, ExternalPages, navigate } from '../../../utils/navigation'

export const parseIframeUrl = (pathname: string, hash: string): string => {
  const documentPagePath = pathname.split(Routes.API_DOCS)[1]
  return `${documentPagePath}${hash}`
}

const ApiDocsPage: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const isDevEnv = window.reapit.config.appEnv !== 'production' // Feature flagging until prod is ready
  const isDocsPage = pathname.includes(Routes.API_DOCS)
  const isSchemaPage = pathname.includes(Routes.ANALYTICS_SCHEMA_DOCS)
  const iframeUri = isDocsPage
    ? `${IFRAME_URLS.documentation}${parseIframeUrl(location.pathname, location.hash)}`
    : window.reapit.config.analyticsSchemaDocsUrl

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>Docs</Title>
          <SecondaryNav className={elMb9}>
            <SecondaryNavItem onClick={navigate(history, Routes.API_DOCS)} active={isDocsPage}>
              APIs
            </SecondaryNavItem>
            <SecondaryNavItem onClick={navigate(history, Routes.ANALYTICS_SCHEMA_DOCS)} active={isSchemaPage}>
              Warehouse
            </SecondaryNavItem>
          </SecondaryNav>
          <Icon className={elMb5} icon="apiDocsInfographic" iconSize="large" />
          <Subtitle>Welcome</Subtitle>
          <SmallText hasGreyText>
            We have provided comprehensive documentation for all of our APIs, services, tooling and open source packages
            accross these pages.
          </SmallText>
          <SmallText hasGreyText>
            You can also visit us on Github where you can raise and track issues, look at code examples and view our
            milestones.
          </SmallText>
          <Button className={elMb5} intent="neutral" onClick={openNewPage(ExternalPages.github)}>
            Go to Github
          </Button>
          {isDocsPage && (
            <Button className={elMb5} intent="critical" onClick={openNewPage(ExternalPages.baseDocs)}>
              Open New
            </Button>
          )}
          {isSchemaPage && isDevEnv && (
            <Button
              className={elMb5}
              intent="critical"
              onClick={openNewPage(window.reapit.config.analyticsSchemaDocsUrl)}
            >
              Open New
            </Button>
          )}
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Title>{isDocsPage ? 'API Docs' : 'Analytics Schema Docs'}</Title>
          <iframe className={iframeWrapper} frameBorder="0" src={iframeUri} />
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default ApiDocsPage
