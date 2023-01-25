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

  async _checkResponse(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
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
