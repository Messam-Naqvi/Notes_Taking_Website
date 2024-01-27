import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskText, setEditTaskText] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "" && newTaskText.trim() !== "") {
      const timestamp = getCurrentDateTime();
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTaskTitle,
          text: newTaskText,
          completed: false,
          timestamp,
        },
      ]);
      setNewTaskTitle("");
      setNewTaskText("");
    }
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveCompletedTasks = () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    setTasks(filteredTasks);
  };

  const handleEditTask = (taskId, taskTitle, taskText) => {
    setEditingTaskId(taskId);
    setEditTaskTitle(taskTitle);
    setEditTaskText(taskText);
  };

  const handleSaveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? {
            ...task,
            title: editTaskTitle,
            text: editTaskText,
            timestamp: getCurrentDateTime(),
          }
        : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditTaskTitle("");
    setEditTaskText("");
  };

  const handleCopyToClipboard = (title, text) => {
    const contentToCopy = `${title}\n${text}`;
    navigator.clipboard.writeText(contentToCopy);
    alert("Copied to clipboard!");
  };

  return (
    <>
      <div className="todo-container">
        <center><h1>Quick Notes</h1></center>
        <div className="todo-form">
          <input
            type="text"
            placeholder="Add a title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Add a new task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed" : ""}
              onClick={() => handleEditTask(task.id, task.title, task.text)}
            >
              <div className="task-header">
                <span onClick={() => handleCompleteTask(task.id)}>
                  {task.completed ? "✔" : "◻"}
                </span>
                <p className="timestamp">{task.timestamp}</p>
              </div>
              {editingTaskId === task.id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                  <textarea
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                  />
                  {task.completed && (
                    <button
                      className="save-button"
                      onClick={handleSaveEditedTask}
                    >
                      <FontAwesomeIcon icon={faSave} /> Save
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <p>
                    <strong>{task.title}</strong>
                  </p>
                  <p>
                    {task.text.split(" ").length > 5
                      ? task.text.split(" ").slice(0, 5).join(" ") + "..."
                      : task.text}
                  </p>
                  <span
                    className="copy-icon"
                    onClick={() => handleCopyToClipboard(task.title, task.text)}
                  >
                    📋
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
        <button className="remove-task" onClick={handleRemoveCompletedTasks}>
          Remove
        </button>
      </div>
    </>
  );
};

export default Home;
