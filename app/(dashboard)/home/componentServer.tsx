import {getCountries} from '@/lib/client'
import {CountryItem} from '@/components/country-combobox'
import CountrySearchCombobox from '@/components/country-combobox'
import {delay} from '@/lib/async'

export default async function ComponentTEst() {
  //await delay(4000)
  const items = await getCountries()

  return (
    <CountrySearchCombobox
      placeholder="Search for a country"
      itemsInitial={items}
    />
  )
}
