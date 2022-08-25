class ServiceQuestion {
  get() {
    return fetch("http://localhost:3030/Question")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:3030/Question/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(gallery) {
    return fetch("http://localhost:3030/Question/", {
      method: "POST",
      body: JSON.stringify(gallery),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(id, movie) {
    return fetch("http://localhost:3030/Question/" + id, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:3030/" + id, {
      method: "DELETE",
    })
      .then(this.success)
      .catch(this.failure);
  }

  success(response) {
    if (response.status < 350) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }

  failure(error) {
    console.log(error);
  }
}
export default ServiceQuestion;