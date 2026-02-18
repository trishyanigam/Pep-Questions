import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
  };

  // Toggle completed
  const toggleTask = async (task) => {
    await axios.put(`${API}/${task.id}`, {
      completed: !task.completed
    });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager (React + Axios)</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.completed ? "✔ Done" : "❌ Pending"}

            <button onClick={() => toggleTask(task)}>
              Toggle
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
