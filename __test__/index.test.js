import React from 'react'
import ReactDOM from 'react-dom'
import App from '../pages/index.js'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App tasks={[]} />, div)
})

it('renders the input form, add button, checkbox, todo text, edit button and delete button correctly', () => {
  const { getByTestId } = render(
    <App
      tasks={[
        {
          _id: 1,
          task: 'hello',
          completed: false,
          createdAt: new Date(),
        },
      ]}
    />
  )
  expect(getByTestId('input')).toBeInTheDocument()
  expect(getByTestId('button')).toBeInTheDocument()
  expect(getByTestId('checkbox')).toBeInTheDocument()
  expect(getByTestId('task_text1')).toBeInTheDocument()
  expect(getByTestId('edit-btn')).toBeInTheDocument()
  expect(getByTestId('delete-btn')).toBeInTheDocument()
})

it('matches snapshot', () => {
  const tree = renderer.create(<App tasks={[]} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('matches snapshot with todos', () => {
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
  const tree = renderer.create(<App tasks={tasks} />).toJSON()
  expect(tree).toMatchSnapshot()
})
