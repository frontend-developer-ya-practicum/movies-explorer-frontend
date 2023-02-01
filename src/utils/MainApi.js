class MainApi {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  async _make_request({ resource, options, errorMessage }) {
    try {
      const resp = await fetch(resource, options);
      if (resp.status === 204) {
        return [];
      }
      const data = await resp.json();
      if (resp.ok || resp.status === 201) {
        return data;
      }
      return Promise.reject(data.message);
    } catch {
      return Promise.reject(errorMessage);
    }
  }

  async register({ name, email, password }) {
    const request = {
      resource: this._url + "/signup",
      options: {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      },
      errorMessage: "При регистрации пользователя произошла ошибка.",
    };
    return this._make_request(request);
  }

  async login({ email, password }) {
    const request = {
      resource: this._url + "/signin",
      options: {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      errorMessage: "При авторизации произошла ошибка.",
    };
    return this._make_request(request);
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");

    const request = {
      resource: this._url + "/users/me",
      options: {
        headers: { ...this._headers, authorization: `Bearer ${token}` },
        method: "GET",
      },
      errorMessage: "При получении данных пользователя произошла ошибка.",
    };
    return this._make_request(request);
  }

  async updateCurrentUser({ name, email }) {
    const token = localStorage.getItem("token");

    const request = {
      resource: this._url + "/users/me",
      options: {
        headers: { ...this._headers, authorization: `Bearer ${token}` },
        method: "PATCH",
        body: JSON.stringify({ name, email }),
      },
      errorMessage: "При обновлении данных пользователя произошла ошибка.",
    };
    return this._make_request(request);
  }

  async getMovies() {
    const token = localStorage.getItem("token");

    const request = {
      resource: this._url + "/movies",
      options: {
        headers: { ...this._headers, authorization: `Bearer ${token}` },
        method: "GET",
      },
      errorMessage:
        "При получении сохраненных фильмов пользователя произошла ошибка.",
    };
    return this._make_request(request);
  }

  async postMovie(movie) {
    const token = localStorage.getItem("token");

    const request = {
      resource: this._url + "/movies",
      options: {
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
      },
      errorMessage: "При сохранении фильма произошла ошибка.",
    };
    return this._make_request(request);
  }

  async deleteMovie(movie) {
    const token = localStorage.getItem("token");

    const request = {
      resource: `${this._url}/movies/${movie._id}`,
      options: {
        headers: { ...this._headers, authorization: `Bearer ${token}` },
        method: "DELETE",
      },
      errorMessage: "При удалении фильма произошла ошибка.",
    };
    return this._make_request(request);
  }
}

const mainApi = new MainApi(
  process.env.REACT_APP_MAIN_API_URL || "http://localhost:3000",
  {
    "content-type": "application/json",
  }
);

export default mainApi;
