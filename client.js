const axios = require("axios");

const API = "http://localhost:3000/tasks";

async function run() {
  try {
    // GET all tasks
    let res = await axios.get(API);
    console.log("All Tasks:", res.data);

    // CREATE task
    res = await axios.post(API, {
      title: "Learn Axios Installed Version"
    });
    console.log("Created:", res.data);

    // UPDATE task
    const id = res.data.id;
    await axios.put(`${API}/${id}`, {
      completed: true
    });
    console.log("Updated Task ID:", id);

    // DELETE task
    await axios.delete(`${API}/${id}`);
    console.log("Deleted Task ID:", id);

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

run();
