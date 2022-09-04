class ServiceAccount {
  get() {
    return fetch("http://localhost:4000/api/Accounts/getAccounts")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/Accounts/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(account) {
    return fetch("http://localhost:4000/api/Accounts/addAccount", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(account) {
    return fetch("http://localhost:4000/api/Accounts/", {
      method: "PUT",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:4000/api/Accounts/deleteAccount" + id, {
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
export default ServiceAccount;
//http://localhost:4000/api/Questions/getQuestions
