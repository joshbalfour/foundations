import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
// import ClientWelcomeMessageModal from '@/components/ui/client-welcome-message'
import Menu from '@/components/ui/menu'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import { Redirect, useLocation } from 'react-router'
import Routes from '@/constants/routes'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path?: string
  showMenu?: boolean
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`
  const isRoot = connectInternalRedirect === '/'

  if (!connectSession) {
    return null
  }

  if (
    (connectInternalRedirect && currentUri !== connectInternalRedirect) ||
    (currentUri === connectInternalRedirect && isRoot)
  ) {
    const redirectUri = connectInternalRedirect === '/' ? Routes.INSTALLED_APPS : connectInternalRedirect
    return <Redirect to={redirectUri} />
  }

  return (
    <AppNavContainer>
      {showMenu && <Menu />}
      {/* Temporary comment due to https://github.com/reapit/foundations/issues/1055 */}
      {/*
        {loginType === 'CLIENT' && (
          <ClientWelcomeMessageModal
            visible={!isTermAccepted}
            onAccept={handleOnAcceptClientWelcome({ dispatch, setClientTermAcceptedCookieAndState })}
            />
      )}
        */}
      <FlexContainerBasic id="app-root-container" flexColumn isScrollable>
        <FlexContainerResponsive hasPadding flexColumn>
          <Suspense
            fallback={
              <Section>
                <Loader />
              </Section>
            }
          >
            {children}
          </Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
