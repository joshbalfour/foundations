import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import { H3, H5 } from '@reapit/elements'

import placeHolderImage from '@/assets/images/default-feature-image.jpg'
import comingSoonImageZoopla from '@/assets/images/coming-soon/Zoopla.jpg'
import comingSoonImageYourkeys from '@/assets/images/coming-soon/1Yourkeys.jpg'
import comingSoonImageSpectre from '@/assets/images/coming-soon/6Spectre.jpg'
import comingSoonImageTwentyCiVMC from '@/assets/images/coming-soon/TwentyCiVMC.jpg'
import comingSoonImageTwentyci from '@/assets/images/coming-soon/TwentyCiProspect.jpg'
import comingSoonImageZero from '@/assets/images/coming-soon/8Zero.jpg'
import comingSoonImageIntegrated from '@/assets/images/coming-soon/12Integrated.jpg'
import comingSoonSmsSpeedway from '@/assets/images/coming-soon/SMS2.jpg'
import comingSoonSmsSpeedWayIdVerification from '@/assets/images/coming-soon/SMSMobile.jpg'
import comingSoonIAMProperty from '@/assets/images/coming-soon/3IAMProperty.jpg'
import comingSoonImageMAB from '@/assets/images/coming-soon/MAB.jpg'
import comingSoonOnTheMarket from '@/assets/images/coming-soon/OnTheMarket.jpg'
import comingSoonPerfectPortal from '@/assets/images/coming-soon/PerfectPortal.jpg'
import comingSoonRightMove from '@/assets/images/coming-soon/RightMove.jpg'
import comingSoonDataWarehouse from '@/assets/images/coming-soon/DataWarehouse.jpg'
import comingSoonNotify from '@/assets/images/coming-soon/Notify.jpg'
import comingSoonSignatureSense from '@/assets/images/coming-soon/Signature.jpg'
import comingSoonFCCParagon from '@/assets/images/coming-soon/FCCParagon.jpg'
import comingSoonPropoly from '@/assets/images/coming-soon/Propoly.jpg'
import comingSoonHomeHero from '@/assets/images/coming-soon/Homehero.jpg'
import comingSoonBarbuck from '@/assets/images/coming-soon/Barbuck.jpg'
import comingSoonCoadjute from '@/assets/images/coming-soon/Coadjute.jpg'
import comingSoonSMSWorks from '@/assets/images/coming-soon/SMSWorks.jpg'
import comingSoonLeadPro from '@/assets/images/coming-soon/Leadpro.jpg'
import comingSoonCanopy from '@/assets/images/coming-soon/Canopy.jpg'
import comingSoonData8 from '@/assets/images/coming-soon/Data8.jpg'
import comingSoonFacebook from '@/assets/images/coming-soon/Facebook.jpg'
import comingSoonOffr from '@/assets/images/coming-soon/Offr.jpg'
import comingSoonAddland from '@/assets/images/coming-soon/Addland.jpg'
import comingSoonBYM from '@/assets/images/coming-soon/BYM.jpg'
import comingSoonGotoView from '@/assets/images/coming-soon/GotoView.jpg'

import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ComingSoonApp } from '@/types/global'
import FadeIn from '../../../core/__styles__/fade-in'
import { ComingSoonContainer, ComingSoonImage, ComingSoonItem } from './__styles__'

export type ComingSoonAppsProps = {
  setComingSoonAppSectionHeight?: React.Dispatch<React.SetStateAction<number>>
}

export type ComingSoonAppProps = { app: ComingSoonApp; isDesktop: boolean }

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = placeHolderImage)

const comingSoonImagesMap = {
  comingSoonImageZoopla,
  comingSoonImageYourkeys,
  comingSoonImageIntegrated,
  comingSoonImageTwentyci,
  comingSoonImageZero,
  comingSoonImageSpectre,
  comingSoonSmsSpeedway,
  comingSoonImageTwentyCiVMC,
  comingSoonSmsSpeedWayIdVerification,
  comingSoonIAMProperty,
  comingSoonImageMAB,
  comingSoonOnTheMarket,
  comingSoonPerfectPortal,
  comingSoonRightMove,
  comingSoonDataWarehouse,
  comingSoonNotify,
  comingSoonSignatureSense,
  comingSoonFCCParagon,
  comingSoonPropoly,
  comingSoonHomeHero,
  comingSoonBarbuck,
  comingSoonCoadjute,
  comingSoonSMSWorks,
  comingSoonLeadPro,
  comingSoonCanopy,
  comingSoonData8,
  comingSoonFacebook,
  comingSoonOffr,
  comingSoonAddland,
  comingSoonBYM,
  comingSoonGotoView,
}

export const getComingAppLinkHref = (isDesktop: boolean, email?: string) => {
  if (email) {
    const prefix = isDesktop ? 'agencycloud://process/email?address=' : 'mailto:'
    return `${prefix}${email}?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards`
  }

  return null
}

export const handleComingSoonSectionResizeObserver = (
  setComingSoonAppSectionHeight: React.Dispatch<React.SetStateAction<number>> | undefined,
) => {
  return (entry: ResizeObserverEntry) => {
    if (!setComingSoonAppSectionHeight) {
      return
    }
    const elementHeight = entry.contentRect.height
    setComingSoonAppSectionHeight(elementHeight)
  }
}

export const ComingSoonAppComponent: React.FC<ComingSoonAppProps> = ({ app: { email, image }, isDesktop }) => {
  const emailLink = getComingAppLinkHref(isDesktop, email)
  const ImageComponent = () => <img className="image" src={comingSoonImagesMap[image]} onError={onImageError} />
  return (
    <ComingSoonItem key={email}>
      <FadeIn>
        <ComingSoonImage>
          {isDesktop && emailLink ? (
            <a href={emailLink}>
              <ImageComponent />
            </a>
          ) : emailLink ? (
            <a href={emailLink} target="_blank" rel="noopener noreferrer">
              <ImageComponent />
            </a>
          ) : (
            <ImageComponent />
          )}
        </ComingSoonImage>
      </FadeIn>
    </ComingSoonItem>
  )
}

const ComingSoonApps: React.FC<ComingSoonAppsProps> = ({ setComingSoonAppSectionHeight }) => {
  const comingSoonAppSectionRef = React.useRef<HTMLDivElement>(null)
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  useResizeObserver(comingSoonAppSectionRef, handleComingSoonSectionResizeObserver(setComingSoonAppSectionHeight))

  return (
    <>
      <H3>Coming Soon</H3>
      <div id="coming-soon-section" ref={comingSoonAppSectionRef}>
        <H5>Agency Cloud Apps</H5>
        <ComingSoonContainer>
          {(window.reapit.config.comingSoonApps.agencyCloud || []).map((app) => (
            <ComingSoonAppComponent key={app.image} app={app} isDesktop={connectIsDesktop} />
          ))}
        </ComingSoonContainer>
        <div className="mb-4" />
        <H5>Third Party Integrations</H5>
        <ComingSoonContainer>
          {(window.reapit.config.comingSoonApps.thirdParty || []).map((app) => (
            <ComingSoonAppComponent key={app.image} app={app} isDesktop={connectIsDesktop} />
          ))}
        </ComingSoonContainer>
        <div className="mb-4" />
        <H5>Portal Integrations</H5>
        <ComingSoonContainer>
          {(window.reapit.config.comingSoonApps.portals || []).map((app) => (
            <ComingSoonAppComponent key={app.image} app={app} isDesktop={connectIsDesktop} />
          ))}
        </ComingSoonContainer>
      </div>
    </>
  )
}

export default React.memo(ComingSoonApps)
