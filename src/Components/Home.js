import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to manage the input for adding a new task
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  // State to manage the task being edited
  const [editingTaskId, setEditingTaskId] = useState(null);
  // State to manage the text of the task being edited
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskText, setEditTaskText] = useState("");

  // Function to handle adding a new task
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

  // Function to get the current date and time in a formatted string
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

  // Function to handle marking a task as completed
  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle removing completed tasks
  const handleRemoveCompletedTasks = () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    setTasks(filteredTasks);
  };

  // Function to handle initiating the edit of a task
  const handleEditTask = (taskId, taskTitle, taskText) => {
    setEditingTaskId(taskId);
    setEditTaskTitle(taskTitle);
    setEditTaskText(taskText);
  };

  // Function to handle saving the edited task
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
                  <p >
                    {task.text.split(" ").length > 5
                      ? task.text.split(" ").slice(0, 5).join(" ") + "..."
                      : task.text}
                  </p>
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
