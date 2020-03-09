import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section, FlexContainerBasic } from '@reapit/elements'
import { redirectToOAuth } from '@reapit/cognito-auth'
import useAuth from '@/hooks/use-auth'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { loginSession, getLoginSession, refreshParams } = useAuth()
  if (!loginSession && !refreshParams) {
    redirectToOAuth(process.env.COGNITO_CLIENT_ID_SMB as string)
    return null
  }
  if (!loginSession && refreshParams) {
    getLoginSession(refreshParams)
  }
  if (!loginSession) {
    return null
  }
  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic isScrollable flexColumn>
        <Suspense
          fallback={
            <Section>
              <Loader />
            </Section>
          }
        >
          {children}
        </Suspense>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default withRouter(PrivateRouteWrapper)
