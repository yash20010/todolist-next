import React from 'react'
import ReactDOM from 'react-dom'
import Form from '../components/Form.jsx'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Form task={{ task: '' }} />, div)
})

it('renders the placeholder text of the input field correctly', () => {
  const { getByTestId } = render(<Form task={{ task: '' }} />)
  expect(getByTestId('input').placeholder).toBe('Task to be done...')
})

it('renders the button text correctly while adding a todo', () => {
  const { getByTestId } = render(<Form task={{ task: '' }} />)
  expect(getByTestId('button')).toHaveTextContent('Add')
})

it('button is disabled on render, before user starts typing', () => {
  const { getByTestId } = render(<Form task={{ task: '' }} />)
  expect(getByTestId('button')).toBeDisabled()
})

it('button is enabled when user starts typing', () => {
  const { getByTestId } = render(<Form task={{ task: 'hello' }} />)
  expect(getByTestId('button')).not.toBeDisabled()
})

it('renders the button correctly during updating a todo', () => {
  const { getByTestId } = render(
    <Form
      task={{
        _id: 1234,
        task: 'hello',
        completed: false,
        createdAt: new Date(),
      }}
    />
  )
  expect(getByTestId('button')).toHaveTextContent('Update')
})

it('matches snapshot', () => {
  const tree = renderer.create(<Form task={{ task: '' }} />).toJSON()
  expect(tree).toMatchSnapshot()
})
