import Task from '../../../models/Task'
import dbConnect from '../../../utils/dbConnect'

export default async (req, res) => {
  const { method } = req
  const { id } = req.query

  // Connect to the database
  await dbConnect()

  // Update task by id
  if (method === 'PUT') {
    try {
      const result = await Task.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      )
      res
        .status(200)
        .json({ data: result, message: 'Task updated successfully' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error while updating task' })
      console.log(error)
    }
  }

  // Delete task by id
  if (method === 'DELETE') {
    try {
      await Task.findByIdAndDelete(id)
      res.status(200).json({ message: 'Task deleted successfully' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error while deleting a task' })
      console.log(error)
    }
  }
}
