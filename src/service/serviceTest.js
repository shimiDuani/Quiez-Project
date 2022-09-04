class ServiceTest {
  get() {
    return fetch("http://localhost:4000/api/Tests/getTests")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/Tests/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(test) {
    return fetch("http://localhost:4000/api/Tests/addTest", {
      method: "POST",
      body: JSON.stringify(test),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(test) {
    return fetch("http://localhost:3030/Tests/updateTest", {
      method: "PUT",
      body: JSON.stringify(test),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:3030/Tests/deleteTest/" + id, {
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
export default ServiceTest;
