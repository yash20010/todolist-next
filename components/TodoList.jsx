import Task from '../components/Task.jsx'
import styles from '../styles/Home.module.css'

const TodoList = ({ setTask, tasks, setTasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          setTask={setTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
      {tasks.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
    </>
  )
}

export default TodoList
