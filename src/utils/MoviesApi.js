class MoviesApi {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
    this._image_url = this._url.substring(0, this._url.lastIndexOf("/"));
  }

  async getMovies() {
    const resp = await fetch(this._url, {
      headers: this._headers,
      method: "GET",
    });

    const data = await resp.json();
    if (resp.ok) {
      data.forEach((movie) => {
        movie.image.url = this._image_url + movie.image.url;
        movie.image.formats.thumbnail.url =
          this._image_url + movie.image.formats.thumbnail.url;
      });
      return data;
    }
    return Promise.reject(data.message);
  }
}

const moviesApi = new MoviesApi(process.env.REACT_APP_MOVIES_API_URL, {
  "content-type": "application/json",
});

export default moviesApi;
