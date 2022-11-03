export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = 'api_key=c0356ffb30035f76e507f25c0073780e'

  async getResource(url, query) {
    const res = await fetch(`${this._apiBase}${url}?${this._apiKey}&${query}`)

    if (!res.ok) {
      throw new Error(`Could not fetch , received ${res.status}`)
    }

    return await res.json()
  }

  getMovies(query, page) {
    console.log(`query=${query}&page=${page}`)
    return this.getResource('/search/movie', `query=${query}&page=${page}`)
  }
}
