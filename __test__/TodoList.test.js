import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from '../components/TodoList.jsx'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TodoList tasks={[]} />, div)
})

it('renders the todos correctly', () => {
  const tasks = [
    {
      _id: 1,
      task: 'hello',
      completed: false,
      createdAt: new Date(),
    },
    {
      _id: 2,
      task: 'world',
      completed: false,
      createdAt: new Date(),
    },
  ]
  const { getByTestId } = render(<TodoList tasks={tasks} />)
  expect(getByTestId('task_text1')).toHaveTextContent('hello')
  expect(getByTestId('task_text2')).toHaveTextContent('world')
})

it('matches snapshot', () => {
  const tree = renderer.create(<TodoList tasks={[]} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('matches snapshot with two todos', () => {
  const tasks = [
    {
      _id: 1,
      task: 'hello',
      completed: false,
      createdAt: new Date(),
    },
    {
      _id: 2,
      task: 'world',
      completed: false,
      createdAt: new Date(),
    },
  ]
  const tree = renderer.create(<TodoList tasks={tasks} />).toJSON()
  expect(tree).toMatchSnapshot()
})
