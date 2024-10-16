export const fetcher = (url: string, method: string = 'GET', body?: object) => {
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  }).then(async res => {
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || 'An error occurred while fetching data')
    }
    return res.json()
  })
}
