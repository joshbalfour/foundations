import { FormFieldInfo } from '@reapit/utils-common'

export type Field =
  | 'name'
  | 'categoryId'
  | 'telephone'
  | 'supportEmail'
  | 'launchUri'
  | 'iconImageUrl'
  | 'homePage'
  | 'description'
  | 'termsAndConditionsUrl'
  | 'privacyPolicyUrl'
  | 'pricingUrl'
  | 'isFree'
  | 'summary'
  | 'screen1ImageUrl'
  | 'screen2ImageUrl'
  | 'screen3ImageUrl'
  | 'screen4ImageUrl'
  | 'screen5ImageUrl'
  | 'authFlow'
  | 'redirectUris'
  | 'signoutUris'
  | 'scopes'
  | 'limitToClientIds'
  | 'desktopIntegrationTypeIds'
  | 'isDirectApi'
  | 'isListed'
  | 'isPrivateApp'
  | 'developerId'
  | 'products'

export const formFields: Record<Field, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
    errorMessage: 'Should only contain letters and number',
    placeHolder: 'The name of your app as it will appear to users',
  },
  categoryId: {
    name: 'categoryId',
    label: 'Category',
  },
  supportEmail: {
    name: 'supportEmail',
    label: 'Support email',
    placeHolder: 'The contact to your support team if your users have a problem',
  },
  telephone: {
    name: 'telephone',
    label: 'Telephone',
    placeHolder: 'Should one of our developers need to contact you about your app',
    errorMessage: 'Invalid Telephone number',
  },
  homePage: {
    name: 'homePage',
    label: 'Home page',
    placeHolder: 'Your company homepage. HTTP:// or HTTPS://',
    errorMessage: 'Invalid Home Page URL',
  },
  launchUri: {
    name: 'launchUri',
    label: 'Launch URI',
    placeHolder: 'The launch page for your app. HTTPS only other than for http://localhost',
    errorMessage: 'Invalid Launch URI',
  },
  summary: {
    name: 'summary',
    label: 'Summary',
    placeHolder: 'A short strapline summary for your app listing. Must be between 50 and 150 characters',
  },
  description: {
    name: 'description',
    label: 'Description',
    placeHolder:
      'A detailed description for your app listing. Must be between 150 and 1500 characters. Please note: As this field supports HTML, special characters will be included in the character count',
  },
  termsAndConditionsUrl: {
    name: 'termsAndConditionsUrl',
    label: 'Terms and Conditions',
    placeHolder: 'URL to link to your Terms and Conditions',
    errorMessage: 'Invalid URL - has to be https://',
  },
  privacyPolicyUrl: {
    name: 'privacyPolicyUrl',
    label: 'Privacy Policy',
    placeHolder: 'URL to link to your Privacy Policy',
    errorMessage: 'Invalid URL - has to be https://',
  },
  pricingUrl: {
    name: 'pricingUrl',
    label: 'Pricing Info',
    placeHolder: 'URL to link to your Pricing Info',
    errorMessage: 'Invalid URL - has to be https://',
  },
  isFree: {
    name: 'isFree',
    label: 'This application is free',
  },
  authFlow: {
    name: 'authFlow',
    label: 'AUTHENTICATION FLOW',
  },
  redirectUris: {
    name: 'redirectUris',
    label: 'Redirect URI(s)',
    placeHolder: 'Enter your Redirect URI(s)',
    errorMessage: 'Invalid redirect uri(s)',
  },
  signoutUris: {
    name: 'signoutUris',
    label: 'Sign Out URI(s)',
    placeHolder: 'Enter your Sign Out URI(s)',
    errorMessage: 'Invalid sign out uri(s)',
  },
  iconImageUrl: {
    name: 'iconImageUrl',
    label: 'Upload Image',
  },
  screen1ImageUrl: {
    name: 'screen1ImageUrl',
    label: 'Upload Image',
  },
  screen2ImageUrl: {
    name: 'screen2ImageUrl',
    label: 'Upload Image',
  },
  screen3ImageUrl: {
    name: 'screen3ImageUrl',
    label: 'Upload Image',
  },
  screen4ImageUrl: {
    name: 'screen4ImageUrl',
    label: 'Upload Image',
  },
  screen5ImageUrl: {
    name: 'screen5ImageUrl',
    label: 'Upload Image',
  },
  scopes: {
    name: 'scopes',
    errorMessage: 'At least one Permission is required',
  },
  limitToClientIds: {
    name: 'limitToClientIds',
    placeHolder: 'Please enter the Customer ID. For multiple Customer ID’s, please separate using a comma',
    errorMessage: 'Invalid Customer ID(s). Each Customer ID should be between 3 and 15 characters.',
  },
  desktopIntegrationTypeIds: {
    name: 'desktopIntegrationTypeIds',
    label: 'Integration Type',
    placeHolder: 'Please select',
  },
  isListed: {
    name: 'isListed',
    label: 'Status: Listed',
  },
  isDirectApi: {
    name: 'isDirectApi',
    label: 'Integration',
  },
  isPrivateApp: {
    name: 'isPrivateApp',
    label: 'Private Apps',
  },
  developerId: {
    name: 'developerId',
    label: 'Developer ID',
  },
  products: {
    name: 'products',
    label: 'Reapit Products',
  },
}

export default formFields
