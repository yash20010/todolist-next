import styles from '../styles/Home.module.css'
import axios from 'axios'

const url = 'http://localhost:3000/api/task'

const Form = ({ tasks, setTasks, task, setTask }) => {
  const handleChange = ({ currentTarget: input }) => {
    input.value === ''
      ? setTask({ task: '' })
      : setTask((prev) => ({ ...prev, task: input.value }))
  }

  const addTask = async (e) => {
    e.preventDefault()
    try {
      if (task._id) {
        const { data } = await axios.put(url + '/' + task._id, {
          task: task.task,
        })
        const originalTasks = [...tasks]
        const index = originalTasks.findIndex((t) => t._id === task._id)
        originalTasks[index] = data.data
        setTasks(originalTasks)
        setTask({ task: '' })
        console.log(data.message)
      } else {
        const { data } = await axios.post(url, task)
        setTasks((prev) => [...prev, data.data])
        setTask({ task: '' })
        console.log(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={addTask} className={styles.form_container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Task to be done..."
        onChange={handleChange}
        value={task.task}
        data-testid="input"
      />
      <button
        type="submit"
        className={styles.submit_btn}
        disabled={!task.task}
        data-testid="button"
      >
        {task._id ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export default Form
