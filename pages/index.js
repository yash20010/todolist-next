import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Form from '../components/Form.jsx'
import TodoList from '../components/TodoList.jsx'

const url = 'https://todolist-next-eta.vercel.app/api/task'

export default function Home(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [task, setTask] = useState({ task: '' })

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>TO-DO</h1>
      <div className={styles.container}>
        <Form tasks={tasks} setTasks={setTasks} task={task} setTask={setTask} />
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          task={task}
          setTask={setTask}
        />
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(url)
  return {
    props: {
      tasks: data.data,
    },
  }
}
