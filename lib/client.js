const API_URL = 'https://oec.world/olap-proxy/'

const fetcher = async ({url, method, body, json = true}) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('API Error')
  }

  if (json) {
    const data = await res.json()
    return data
  }
}

//List of countries: https://oec.world/olap-proxy/members?cube=trade_i_baci_a_92&level=Country&locale=en
async function getCountries() {
  return fetcher({
    url: `${API_URL}members?cube=trade_i_baci_a_92&level=Country&locale=en`,
    method: 'GET',
  })
}

// https://oec.world/olap-proxy/data.jsonrecords?Importer+Country=sachl&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e
//type OperationType = 'Import' | 'Export'

async function getTradeData({type = 'Importer', id, year = '2018'}) {
  return fetcher({
    url: `${API_URL}data.jsonrecords?${type}+Country=${id}&Year=${year}&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    method: 'GET',
  }).then(
    res => res.data,
    err => Promise.reject(new Error(err)),
  )
}

export {fetcher, getCountries, getTradeData}
