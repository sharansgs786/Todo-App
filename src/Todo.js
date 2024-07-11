import { useState } from "react";
import "./Todo.css";

function Todo() {
    const [task, setTask] = useState("");
    const [tasksList, setTasksList] = useState([]);

    function handleChange(event) {
        setTask(event.target.value);
    }

    function handleBlur() {
        const trimmedTask = task.trim();
        if (trimmedTask !== "") {
            const newTask = { id: Date.now(), text: trimmedTask };
            setTasksList([...tasksList, newTask]);
            setTask("");
        }
    }

    function removeTask(taskId) {
        setTasksList(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, removed: true } : task
            )
        );
        setTimeout(() => {
            setTasksList(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }, 3000);
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            handleBlur();
        }
    }

    return (
        <div className="todo-container">
                <h2>All Tasks</h2>
                <ul>
                    {tasksList.map((task) => (
                        <li key={task.id} className={task.removed ? "fade-out" : ""}>
                            <input type="checkbox" onChange={() => removeTask(task.id)} />
                            <span className={task.removed ? "task-text removed" : "task-text"}>{task.text}</span>
                        </li>
                    ))}
                </ul>
                <input 
                    type="text" 
                    value={task} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    onKeyDown={handleEnter} 
                    placeholder="Add a new task"
                />
        </div>
    );
}

export default Todo;
