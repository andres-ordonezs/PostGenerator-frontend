
const BASE_URL = "http://localhost:3001";

class postsApi {
  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      'Content-type': 'application/json'
    };

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET") ? JSON.stringify(data) : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.log("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  /* Get post in response to a new prompt */
  static async getPost(prompt) {
    let res = await this.request('api/generate', { 'prompt': prompt }, "POST");
    return await res;
  }

  /* Create a Post */
  static async addPost(data) {
    let res = await this.request('api/posts', data, "POST");
    return res;

  }

  /* Get list of Posts */
  static async getPosts() {
    const res = await this.request("api/posts");
    return res;
  }


  /* Edit a Post */
  static async updatePost(id, text) {
    const res = await this.request(`api/posts/${id}`, { text: text }, "PATCH");
    return res;
  }


  /* Delete a Post */
  static async deletePost(id) {
    const res = await this.request(`api/posts/${id}`, {}, "DELETE");
    return res;

  }

}

export default postsApi;