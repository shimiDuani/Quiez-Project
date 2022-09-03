class ServiceAdmin {
  get() {
    return fetch("http://localhost:3030/admin")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:3030/admin/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(admin) {
    return fetch("http://localhost:3030/admin/", {
      method: "POST",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(id, admin) {
    return fetch("http://localhost:3030/admin/" + id, {
      method: "PUT",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:3030/admin/" + id, {
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
export default ServiceAdmin;
