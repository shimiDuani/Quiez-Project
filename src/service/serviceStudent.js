class ServiceStudent {
  get() {
    return fetch("http://localhost:4000/api/Students/getStudents")
      .then(this.success)
      .catch(this.failure);
  }
  getById(id) {
    return fetch("http://localhost:4000/api/Students/" + id)
      .then(this.success)
      .catch(this.failure);
  }
  post(student) {
    return fetch("http://localhost:4000/api/Students/addStudent", {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  put(student) {
    return fetch("http://localhost:4000/api/Students/updateStudent", {
      method: "PUT",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }
  delete(id) {
    return fetch("http://localhost:4000/api/Students/deleteStudent/" + id, {
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
export default ServiceStudent;
