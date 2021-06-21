import { css } from 'linaria'
import { styled } from 'linaria/react'

const navControlsHeightMobile = '15rem'
const navHeightMobile = '3.5rem'
const navAppointmentListWidthDesktop = '28rem'
const controlsHeightDesktop = '8.2rem'
const navWidthDesktop = '5rem'
const appointmentListWidthDesktop = '23rem'

export const MapContainer = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: calc(100% - ${navControlsHeightMobile});
  top: ${navControlsHeightMobile};

  @media (min-width: 769px) {
    top: 0;
    height: 100%;
    left: ${navAppointmentListWidthDesktop};
    width: calc(100vw - ${navAppointmentListWidthDesktop});
  }
`
export const ControlsContainer = styled.div`
  position: absolute;
  top: ${navHeightMobile};
  background: #fff;
  width: 100%;
  z-index: 2;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 1.5rem 0.875rem 1.5rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    width: ${appointmentListWidthDesktop};
    left: 5rem;
    top: 0;
  }
`

export const ControlsTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AppoinmentContainer = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  position: absolute;
  background: #f5f7f9;
  height: calc(100% - ${navControlsHeightMobile});
  left: 0;
  top: ${navControlsHeightMobile};
  width: 100%;
  overflow: scroll;
  z-index: 1;

  @media (min-width: 769px) {
    width: ${appointmentListWidthDesktop};
    left: ${navWidthDesktop};
    top: ${controlsHeightDesktop};
    height: calc(100% - ${controlsHeightDesktop});
  }
`

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  vertical-align: middle;
  justify-content: center;
`

export const mobileAppointmentsHidden = css`
  transform: translate3d(0%, 0, 0);
  animation: slide-out 0.35s forwards;

  @keyframes slide-out {
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
`

export const mobileAppointmentsShow = css`
  transform: translate3d(-100%, 0, 0);
  animation: slide-in 0.35s forwards;

  @keyframes slide-in {
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`
