import React from 'react'
import ReactDOM from 'react-dom'
import Task from '../components/Task.jsx'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Task
      task={{
        _id: 1234,
        task: 'hello',
        completed: false,
        createdAt: new Date(),
      }}
    />,
    div
  )
})

it('should render the checkbox, todo text, edit and delete button', () => {
  const { getByTestId } = render(
    <Task
      task={{
        _id: 1234,
        task: 'hello',
        completed: false,
        createdAt: new Date(),
      }}
    />
  )
  expect(getByTestId('checkbox')).toBeInTheDocument()
  expect(getByTestId('task_text1234')).toBeInTheDocument()
  expect(getByTestId('edit-btn')).toBeInTheDocument()
  expect(getByTestId('delete-btn')).toBeInTheDocument()
})

it('matches snapshot 1 - completed false', () => {
  const tree = renderer
    .create(
      <Task
        task={{
          _id: 1234,
          task: 'hello',
          completed: false,
          createdAt: new Date(),
        }}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('matches snapshot 2 - completed true', () => {
  const tree = renderer
    .create(
      <Task
        task={{
          _id: 1234,
          task: 'hello',
          completed: true,
          createdAt: new Date(),
        }}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
