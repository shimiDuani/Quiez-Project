class ServiceAdmin {
  get() {
    return fetch("http://localhost:4000/api/Admins/getAdmins")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/Admins/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(admin) {
    return fetch("http://localhost:4000/api/Admins/addAdmin", {
      method: "POST",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(admin) {
    return fetch("http://localhost:4000/api/Admins/updateAdmin", {
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
    return fetch("http://localhost:4000/api/Admins/deleteAdmin" + id, {
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
