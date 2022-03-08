import styles from '../styles/Home.module.css'
import axios from 'axios'

const url = 'https://todolist-next-eta.vercel.app/api/task'

const Task = ({ task, setTask, tasks, setTasks }) => {
  const updateTask = async (id) => {
    try {
      const originalTasks = [...tasks]
      const index = originalTasks.findIndex((t) => t._id === id)
      const { data } = await axios.put(url + '/' + id, {
        completed: !originalTasks[index].completed,
      })
      originalTasks[index] = data.data
      setTasks(originalTasks)
      console.log(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const editTask = (id) => {
    const currentTask = tasks.filter((task) => task._id === id)
    setTask(currentTask[0])
  }

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(url + '/' + id)
      setTasks((prev) => prev.filter((task) => task._id !== id))
      console.log(data.message)
      setTask({ task: '' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.task_container} data-testid="task-container">
      <input
        type="checkbox"
        className={styles.check_box}
        checked={task.completed}
        onChange={() => updateTask(task._id)}
        data-testid="checkbox"
      />
      <p
        className={
          task.completed
            ? styles.task_text + ' ' + styles.line_through
            : styles.task_text
        }
        data-testid={'task_text' + task._id}
      >
        {task.task}
      </p>
      <button
        onClick={() => editTask(task._id)}
        className={styles.edit_task}
        data-testid="edit-btn"
      >
        &#9998;
      </button>
      <button
        onClick={() => deleteTask(task._id)}
        className={styles.remove_task}
        data-testid="delete-btn"
      >
        &#10006;
      </button>
    </div>
  )
}

export default Task
