import { IntegrationBase } from "@budibase/types"
import fetch from "node-fetch"

interface Query {
  method: string
  body?: string
  headers?: { [key: string]: string }
}

class HTTPIntegration implements IntegrationBase {
  private readonly url: string
  private readonly cookie: string

  constructor(config: { url: string; cookie: string }) {
    this.url = config.url
    this.cookie = config.cookie
  }

  async query(url: string, opts: Query) {
    if (this.cookie) {
      const cookie = { Cookie: this.cookie }
      opts.headers = opts.headers ? { ...opts.headers, ...cookie } : cookie
    }
    const response = await fetch(url, opts)
    if (response.status <= 300) {
      return response.json()
    } else {
      const err = await response.text()
      throw new Error(err)
    }
  }

  async create(query: { json: object }) {
    const opts = {
      method: "POST",
      body: JSON.stringify(query.json),
      headers: {
        "Content-Type": "application/json",
      },
    }
    return this.query(this.url, opts)
  }

  async read(query: { queryString: string }) {
    const opts = {
      method: "GET",
    }
    return this.query(`${this.url}?${query.queryString}`, opts)
  }

  async update(query: { json: object }) {
    const opts = {
      method: "PUT",
      body: JSON.stringify(query.json),
      headers: {
        "Content-Type": "application/json",
      },
    }
    return this.query(this.url, opts)
  }

  async delete(query: { id: string }) {
    const opts = {
      method: "DELETE",
    }
    return this.query(`${this.url}/${query.id}`, opts)
  }
}

export default HTTPIntegration
