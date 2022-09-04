class ServiceQuestion {
  get() {
    return fetch("http://localhost:4000/api/Questions/getQuestions")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/Questions/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(question) {
    return fetch("http://localhost:4000/api/Questions/addQuestion", {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(question) {
    return fetch("http://localhost:4000/api/Questions/updateQuestion", {
      method: "PUT",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:4000/api/Questions/deleteQuestion/" + id, {
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
