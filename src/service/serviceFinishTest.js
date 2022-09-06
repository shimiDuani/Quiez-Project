class ServiceFinishTest {
  get() {
    return fetch("http://localhost:4000/api/FinishTest/getFinishTests")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/FinishTest/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(test) {
    return fetch("http://localhost:4000/api/FinishTest/addFinishTest", {
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
    return fetch("http://localhost:4000/api/FinishTest/updateFinishTest", {
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
    return fetch(
      "http://localhost:4000/api/FinishTest/deleteFinishTest/" + id,
      {
        method: "DELETE",
      }
    )
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
export default ServiceFinishTest;
