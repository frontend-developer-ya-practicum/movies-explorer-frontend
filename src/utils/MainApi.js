class MainApi {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  async register({ name, email, password }) {
    const resp = await fetch(this._url + "/signup", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    return this._checkResponse(resp);
  }

  async login({ email, password }) {
    const resp = await fetch(this._url + "/signin", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return this._checkResponse(resp);
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");

    const resp = await fetch(this._url + "/users/me", {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      method: "GET",
    });
    return this._checkResponse(resp);
  }

  async updateCurrentUser({ name, email }) {
    const token = localStorage.getItem("token");

    const resp = await fetch(this._url + "/users/me", {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      method: "PATCH",
      body: JSON.stringify({ name, email }),
    });
    return this._checkResponse(resp);
  }

  async getMovies() {
    const token = localStorage.getItem("token");

    const resp = await fetch(this._url + "/movies", {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      method: "GET",
    });
    return this._checkResponse(resp);
  }

  async postMovie(movie) {
    const token = localStorage.getItem("token");

    const resp = await fetch(this._url + "/movies", {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      method: "POST",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
    return this._checkResponse(resp);
  }

  async deleteMovie(movie) {
    const token = localStorage.getItem("token");

    const resp = await fetch(`${this._url}/movies/${movie._id}`, {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      method: "DELETE",
    });
    return this._checkResponse(resp);
  }

  async _checkResponse(resp) {
    const data = await resp.json();
    if (resp.ok) {
      return data;
    }
    if (resp.status === 204) {
      return [];
    }
    return Promise.reject(data.message);
  }
}

const mainApi = new MainApi(
  process.env.REACT_APP_MAIN_API_URL || "http://localhost:3000",
  {
    "content-type": "application/json",
  }
);

export default mainApi;
