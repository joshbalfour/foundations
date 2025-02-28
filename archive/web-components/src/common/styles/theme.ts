/* istanbul ignore file */
import { css } from 'emotion'
import { ThemeBaseInitializer, ThemeBaseClasses, ThemeBookingInitializer, ThemeBookingClasses } from './types'

export const generateBaseThemeClasses = (
  {
    baseBackgroundColor,
    basefontSize,
    basefontColor,
    inverseFontColor,
    baseFontFamily,
    primaryHeadingFontSize,
    secondaryHeadingFontSize,
    headingFontFamily,
    primaryAccentColor,
    secondaryfontColor,
    secondaryAccentColor,
    breakPoints,
  }: Partial<ThemeBaseInitializer>,
  parentSelector: string,
): ThemeBaseClasses => {
  return {
    globalStyles: css`
      font-size: ${basefontSize || '16px'};
      font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
      background: ${baseBackgroundColor || '#fff'};
      color: ${basefontColor || '#000'};
    `,
    primaryHeading: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${primaryHeadingFontSize || '22px'};
        font-weight: bold;
        color: ${primaryAccentColor || basefontColor || '#000'};
        margin-bottom: 0.2em;
      }
    `,
    secondaryHeading: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        font-weight: bold;
        color: ${secondaryAccentColor || basefontColor || '#000'};
        margin-bottom: 0.2em;
      }
    `,
    primaryStrapline: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        font-weight: bold;
        color: ${secondaryfontColor || basefontColor || 'grey'};
        margin-bottom: 0.5em;
      }
    `,
    secondaryStrapline: css`
      ${parentSelector || 'body'} & {
        font-family: ${headingFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${basefontSize || '16px'};
        font-weight: bold;
        color: ${secondaryfontColor || basefontColor || 'grey'};
        margin-bottom: 0.5em;
      }
    `,
    selectedItem: css`
      ${parentSelector || 'body'} & {
        border-color: ${primaryAccentColor || 'grey'};
      }
    `,
    bodyText: css`
      ${parentSelector || 'body'} & {
        font-size: ${basefontSize || '16px'};
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        margin-bottom: 1em;
      }
    `,
    button: css`
      ${parentSelector || 'body'} & {
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        color: ${primaryAccentColor || '#000'};
        border: 1px solid ${primaryAccentColor || 'grey'};
        background: ${baseBackgroundColor || '#fff'};
        transition: all 0.2s ease-in-out;

        &:hover {
          background: ${primaryAccentColor || 'grey'};
          color: ${baseBackgroundColor || '#fff'};
        }
      }
    `,
    input: css`
      ${parentSelector || 'body'} & {
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
        border: 1px solid ${primaryAccentColor || 'grey'};
      }
    `,
    featureLabel: css`
      ${parentSelector || 'body'} & {
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        font-size: ${secondaryHeadingFontSize || '18px'};
      }
    `,
    resultItem: css`
      ${parentSelector || 'body'} & {
        width: 100%;

        @media screen and (min-width: ${breakPoints?.desktop || '1200px'}) {
          & {
            width: 25%;
          }
        }

        @media screen and (min-width: ${breakPoints?.laptop || '960px'}) and (max-width: ${breakPoints?.desktop ||
            '1200px'}) {
          & {
            width: 33.333333%;
          }
        }

        @media screen and (min-width: ${breakPoints?.tablet || '768px'}) and (max-width: ${breakPoints?.laptop ||
            '960px'}) {
          & {
            width: 50%;
          }
        }
      }
    `,
    featureButton: css`
      &,
      svg {
        color: ${basefontColor || '#000'};
      }
    `,
    searchBox: css`
      ${parentSelector || 'body'} & {
        width: 100%;

        @media screen and (min-width: ${breakPoints?.laptop || '960px'}) {
          & {
            width: 33.333333%;
          }
        }

        @media screen and (min-width: ${breakPoints?.mobile || '560px'}) and (max-width: ${breakPoints?.laptop ||
            '960px'}) {
          & {
            width: 50%;
          }
        }
      }
    `,
    offerBanner: css`
      ${parentSelector || 'body'} & {
        background: ${primaryAccentColor || 'grey'};
        font-size: ${basefontSize || '16px'};
        font-family: ${baseFontFamily || 'Helvetica, Arial, sans-serif'};
        color: ${inverseFontColor || '#fff'};
      }
    `,
    pagination: css`
      ${parentSelector || 'body'} & {
        color: ${primaryAccentColor || '#000'};
        background-color: ${baseBackgroundColor || '#fff'};
      }
    `,
    paginationActive: css`
      ${parentSelector || 'body'} & {
        color: ${primaryAccentColor || basefontColor || '#fff'};
        background-color: ${baseBackgroundColor || 'grey'};
      }
    `,
    formError: css`
      ${parentSelector || 'body'} & {
        font-size: calc(${basefontSize || '16px'} * 80 / 100);
        color: #dd0000;
      }
    `,
  }
}

export const generateBookingThemeClasses = (
  initializers: ThemeBookingInitializer,
  parentSelector: string,
): ThemeBookingClasses => {
  const {
    basefontSize,
    primaryHeadingFontSize,
    headingFontFamily,
    primaryAccentColor,
    secondaryAccentColor,
    timeCellBackgroundColorHover,
    timeCellBackgroundColor,
    navigateButtonColor,
    dateCellHeaderBackgroundColor,
    timeCellsContainerBackgroundColor,
    formLabelColor,
    formHrSeparatorFontColor,
    formButtonFontSize,
  } = initializers
  const baseTheme = generateBaseThemeClasses(initializers, parentSelector)
  return {
    ...baseTheme,
    timeCellsContainer: css`
      ${parentSelector || 'body'} & {
        background: ${timeCellsContainerBackgroundColor};
      }
    `,
    dateCellHeader: css`
      ${parentSelector || 'body'} & {
        padding: 1em;
        font-weight: bold;
        background: ${dateCellHeaderBackgroundColor};
        display: flex;
        justify-content: center;
        margin-bottom: 2px;
        min-height: 2.5em;
      }
    `,
    timeCell: css`
      ${parentSelector || 'body'} & {
        background: ${timeCellBackgroundColor};
        &:hover {
          background: ${timeCellBackgroundColorHover};
        }
      }
    `,
    svgNavigation: css`
      ${parentSelector || 'body'} & {
        path {
          fill: ${navigateButtonColor};
        }
        width: 1em;
        height: 1em;
      }
    `,
    formBlock: css`
      ${parentSelector || 'body'} & {
        padding: 0.5rem 0;
        & * {
          box-sizing: border-box;
        }
      }
    `,
    formInput: css`
      ${parentSelector || 'body'} & {
        padding-left: 5px;
        height: 27px;
        font-size: ${basefontSize};
        &:disabled {
          cursor: not-allowed;
        }
      }
    `,
    formHeader: css`
      ${parentSelector || 'body'} & {
        font-size: ${primaryHeadingFontSize};
        font-weight: bold;
        font-family: ${headingFontFamily};
      }
    `,

    formLabel: css`
      ${parentSelector || 'body'} & {
        color: ${formLabelColor};
      }
    `,
    formSeparator: css`
      ${parentSelector || 'body'} & {
        border: 1px solid ${formHrSeparatorFontColor};
      }
    `,
    formButtonPrimary: css`
      ${parentSelector || 'body'} & {
        font-size: ${formButtonFontSize};
        padding: 0.5rem;
        background-color: ${primaryAccentColor};
        color: white;
        border-radius: 3px;
        cursor: pointer;
      }
    `,
    formButtonSecondary: css`
      ${parentSelector || 'body'} & {
        font-size: ${formButtonFontSize};
        padding: 0.5rem;
        background-color: ${secondaryAccentColor};
        color: white;
        border-radius: 3px;
        cursor: pointer;
      }
    `,
    formError: css`
      ${parentSelector || 'body'} & {
        font-size: calc(${basefontSize} * 80 / 100);
        color: #dd0000;
      }
    `,
  }
}

export const generateMapStyles = ({ mapAccentColor }: Partial<ThemeBaseInitializer>) => {
  return [
    {
      featureType: 'all',
      elementType: 'geometry.fill',
      stylers: [
        {
          weight: '2.00',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#9c9c9c',
        },
      ],
    },
    {
      featureType: 'all',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          color: '#f2f2f2',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#7b7b7b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: mapAccentColor || '#c8d7d4',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: mapAccentColor || '#c8d7d4',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#070707',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
  ]
}
