class ServiceTopic {
  get() {
    return fetch("http://localhost:4000/api/Topics/getTopics")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/Topics/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(topic) {
    return fetch("http://localhost:4000/api/Topics/addTopic", {
      method: "POST",
      body: JSON.stringify(topic),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(id, topic) {
    return fetch("http://localhost:4000/api/Topics/updateTopic" + id, {
      method: "PUT",
      body: JSON.stringify(topic),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:4000/api/Topics/deleteTopic" + id, {
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
export default ServiceTopic;
