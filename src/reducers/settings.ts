import DeviceInfo from 'react-native-device-info'
import {lookup} from 'country-data'
import * as settingsActions from '../actions'
import CURRENCIES from '../config/currencies'

const DEFAULT_CURRENCY = 'USD'
const DEFAULT_SORT = 'INDEX_ASC'

const countryInfo = lookup.countries({alpha2: DeviceInfo.getDeviceCountry()})[0]

export default function settingsState(state = getInitialState(), action) {
  switch (action.type) {
    case settingsActions.SETTINGS_SET_CURRENCY:
      return {
        ...state,
        currency: action.currency
      }
    case settingsActions.SETTINGS_SET_DEFAULT_ORDER:
      return {
        ...state,
        defaultOrder: action.order
      }
    case settingsActions.SETTINGS_TOGGLE_SITE_HIDDEN: {
      return {
        ...state,
        hiddenSites: toggleArray(state.hiddenSites, action.siteID)
      }
    }
    case settingsActions.SETTINGS_TOGGLE_FAVORITE: {
      return {
        ...state,
        favoriteDesignIds: toggleArray(state.favoriteDesignIds, action.designID)
      }
    }
    default:
      return state
  }
}

function toggleArray(arr, item) {
  let items = !arr.includes(item)
    ? [...arr, item]
    : arr.filter(element => element !== item)

  // Ensure the array is unique
  return Array.from(new Set(items))
}

function getInitialState() {
  const validCurrencies = Object.keys(CURRENCIES)
  const deviceCurrency = countryInfo.currencies[0] || 'USD'

  return {
    hiddenSites: [],
    favoriteDesignIds: [],
    defaultOrder: DEFAULT_SORT,
    currency: validCurrencies.includes(deviceCurrency) ? deviceCurrency : DEFAULT_CURRENCY
  }
}
