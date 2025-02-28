<script lang="ts">
  import { onDestroy } from 'svelte'
  import Fa from 'svelte-fa'
  import { faBed, faToilet } from '@fortawesome/free-solid-svg-icons'
  import searchWidgetStore from '../core/store'
  import { combineAddress, getPrice, combineNumberBedTypeStyle } from '../utils/results-helpers'
  import { handleImageError } from '../utils/image-helpers'
  import { INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'
  import * as PropertyTypes from '../../types'
  import * as Theme from '../../../common/styles/types'

  export let property: PropertyTypes.PickedPropertyModel

  let selectedProperty: PropertyTypes.PickedPropertyModel
  let searchType: 'Sale' | 'Rent'
  let themeClasses: Theme.ThemeBaseClasses
  let detailPageUrl: string = ''
  let propertyImagesByPropertyId: Record<string, PropertyTypes.PickedPropertyImageModel[]>
  let isSelectedProperty: boolean

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    selectedProperty = store.selectedProperty
    searchType = store.searchType
    propertyImagesByPropertyId = store.propertyImagesByPropertyId
    themeClasses = store.themeClasses
    detailPageUrl = store.initializers.detailPageUrl
    propertyImagesByPropertyId = store.propertyImagesByPropertyId
  })

  const {
    primaryHeading,
    secondaryHeading,
    secondaryStrapline,
    bodyText,
    selectedItem,
    resultItem,
    offerBanner,
  } = themeClasses

  const id = (property && property.id) || ''
  const propertyImages = propertyImagesByPropertyId && propertyImagesByPropertyId[id]
  const imageUrl = (propertyImages && propertyImages[0].url) || INVALID_BACKGROUND_AS_BASE64
  const sellingStatus = (property.selling && property.selling.status) || ''
  const lettingStatus = (property.letting && property.letting.status) || ''

  $: isSelectedProperty = property.id === (selectedProperty && selectedProperty.id)

  const selectProperty = () => {
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: property,
    }))
  }

  const handleViewDetail = (propertyId: string) => {
    const propertyImages = (propertyImagesByPropertyId && propertyImagesByPropertyId[propertyId]) || []
    const propertyImageUrls = propertyImages.map(propertyImage => propertyImage.url).join(',')
    location.href = `${detailPageUrl}?id=${propertyId}&searchType=${searchType}&propertyImageUrls=${propertyImageUrls}`
  }

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>
  .search-result-item {
    box-sizing: border-box;
    cursor: pointer;
    padding: 0.5em;
    border: 1px solid transparent;
    border-radius: 0.3em;
  }

  .search-result-item img {
    width: 100%;
    height: 12em;
  }

  .search-result-image-container {
    width: 100%;
    border-radius: 0.3em;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.5em;
  }

  .search-result-offer-banner {
    text-align: center;
    position: absolute;
    width: 12.5em;
    padding: 1.2em;
    top: 2em;
    right: -3.75em;
    transform: rotate(45deg);
    font-weight: 600;
  }

  .search-result-item-address-secondary {
    hyphens: auto;
    display: contents;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 3.6em;
    line-height: 1.2em;
  }

  .search-result-item-pricing-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .search-result-item-beds-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .search-result-item-description-text {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    max-width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 7em;
    line-height: 1.2em;
  }

  .search-result-item-icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .search-result-item-icon {
    margin-right: 0.33em;
  }

  .search-result-item-icon:last-child {
    margin-left: 1em;
  }
</style>

<div
  class="search-result-item {resultItem}
  {isSelectedProperty ? selectedItem : ''}"
  data-testid="select-property"
  on:click|preventDefault={selectProperty}>
  <div class="search-result-image-container">
    {#if sellingStatus === 'underOffer'}
      <div class="search-result-offer-banner {offerBanner}">Under Offer</div>
    {/if}
    {#if lettingStatus === 'underOffer'}
      <div class="search-result-offer-banner {offerBanner}">Let Agreed</div>
    {/if}
    <img alt="property" src={imageUrl} on:error={handleImageError} />
  </div>
  <div>
    <div class="{secondaryStrapline} search-result-item-address-secondary">
      <div class="{secondaryHeading} search-result-item-address-primary">
        {(property.address && property.address.line1) || ''}
      </div>
      {combineAddress(property.address)}
    </div>
  </div>
  <div class="{primaryHeading} search-result-item-pricing-text">{getPrice(property, searchType)}</div>
  <div class="{secondaryStrapline} search-result-item-beds-text">{combineNumberBedTypeStyle(property)}</div>
  <div class="{bodyText} search-result-item-description-text">{property.description}</div>
  <div class="{secondaryHeading} search-result-item-icon-container">
    <div>
      <span class="search-result-item-icon">
        <Fa icon={faBed} />
      </span>
      {property.bedrooms || 0}
      <span class="search-result-item-icon">
        <Fa icon={faToilet} />
      </span>
      {property.bathrooms || 0}
    </div>
    <a
      on:click|preventDefault={() => handleViewDetail(property.id)}
      class="{secondaryHeading} search-result-item-address-primary"
      href="/">
      View Detail
    </a>
  </div>
</div>
