import Task from '../../../models/Task'
import dbConnect from '../../../utils/dbConnect'

export default async (req, res) => {
  const { method } = req

  // Connect to the database
  await dbConnect()

  // Create a new task
  if (method === 'POST') {
    try {
      const newTask = await new Task(req.body).save()
      res
        .status(201)
        .json({ data: newTask, message: 'Task created successfully' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error while creating new task' })
      console.log(error)
    }
  }

  // Get all tasks
  if (method === 'GET') {
    try {
      const tasks = await Task.find()
      res
        .status(200)
        .json({ data: tasks, message: 'Task fetched successfully' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error while getting all tasks' })
      console.log(error)
    }
  }
}
