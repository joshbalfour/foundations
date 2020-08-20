import * as React from 'react'
import { GridThreeColItem, Grid } from '@reapit/elements'
import placeHolderImage from '@/assets/images/default-feature-image.jpg'
import comingSoonImage1 from '@/assets/images/coming-soon/1Area.jpg'
import comingSoonImage2 from '@/assets/images/coming-soon/2Starberry.jpg'
import comingSoonImage3 from '@/assets/images/coming-soon/3IAMProperty.jpg'
import comingSoonImage4 from '@/assets/images/coming-soon/4SMS.jpg'
import comingSoonImage5 from '@/assets/images/coming-soon/5Vyomm.jpg'
import comingSoonImage6 from '@/assets/images/coming-soon/6Spectre.jpg'
import comingSoonImage7 from '@/assets/images/coming-soon/7Twentyci.jpg'
import comingSoonImage8 from '@/assets/images/coming-soon/8Zero.jpg'
import comingSoonImage9 from '@/assets/images/coming-soon/9Yomdel.jpg'

export type ComingSoonAppsProps = {
  setComingSoonAppSectionHeight?: React.Dispatch<React.SetStateAction<number>>
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = placeHolderImage)

const comingSoonImagesList = [
  comingSoonImage1,
  comingSoonImage2,
  comingSoonImage3,
  comingSoonImage4,
  comingSoonImage5,
  comingSoonImage6,
  comingSoonImage7,
  comingSoonImage8,
  comingSoonImage9,
]

export const handleSetComingSoonAppSectionHeight = (
  containerHeight: number,
  setComingSoonAppSectionHeight: React.Dispatch<React.SetStateAction<number>> | undefined,
) => {
  return () => {
    if (setComingSoonAppSectionHeight) {
      setComingSoonAppSectionHeight(containerHeight)
    }
  }
}

const ComingSoonApps: React.FC<ComingSoonAppsProps> = ({ setComingSoonAppSectionHeight }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const containerHeight = containerRef.current?.clientHeight || 0

  React.useEffect(handleSetComingSoonAppSectionHeight(containerHeight, setComingSoonAppSectionHeight), [
    containerHeight,
  ])

  return (
    <div ref={containerRef}>
      <Grid isMultiLine>
        {comingSoonImagesList.map(imgSrc => (
          <GridThreeColItem key={imgSrc}>
            <div className="card">
              <div className="card-image">
                <img className="image" src={imgSrc} onError={onImageError} />
              </div>
            </div>
          </GridThreeColItem>
        ))}
      </Grid>
    </div>
  )
}

export default ComingSoonApps
