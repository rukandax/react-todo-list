import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../index'

import * as ApiAdapter from 'libraries/apiAdapter'

const BASIC_TODOLIST_RESPONSE = [
  {
    id: 1,
    title: 'Finish an interview',
  },
  {
    id: 2,
    title: 'Study React',
  },
  {
    id: 3,
    title: 'Submit a test result',
  },
]

jest.mock('libraries/apiAdapter')

let mockGetFetch
let mockPostFetch
let mockDeleteFetch

describe('TodoList Component Test', () => {
  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true)
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    mockGetFetch = jest.spyOn(ApiAdapter, 'getFetch')
    mockGetFetch.mockResolvedValue(BASIC_TODOLIST_RESPONSE)

    mockPostFetch = jest.spyOn(ApiAdapter, 'postFetch')
    mockDeleteFetch = jest.spyOn(ApiAdapter, 'deleteFetch')

    render(<TodoList />)
  })

  test('Basic Render', async () => {
    const pageTitle = screen.getByText(/todo list/i)
    expect(pageTitle).toBeInTheDocument()

    const todolistItem = await screen.findAllByTestId('todolist-items')
    expect(todolistItem.length).toEqual(3)

    expect(mockGetFetch).toHaveBeenCalled()
  })

  test('Add New TODO', async () => {
    const todolistItem = await screen.findAllByTestId('todolist-items')
    expect(todolistItem.length).toEqual(3)

    const todolistInputField = screen.getByTestId('todolist-form-input')

    // Type TODO
    await userEvent.type(todolistInputField, 'This TODO is from unit test #1', {
      delay: 1,
    })

    // Submit TODO by clicking `Add` button
    const todolistSubmitButton = screen.getByTestId('todolist-form-button')
    await fireEvent.click(todolistSubmitButton)

    // Assertion
    expect(mockPostFetch).toHaveBeenCalledWith('http://localhost:3001/tasks', {
      title: 'This TODO is from unit test #1',
    })

    // Type TODO
    await userEvent.type(todolistInputField, 'This TODO is from unit test #2', {
      delay: 1,
    })

    // Submit TODO by press keyboard `enter`
    await userEvent.type(todolistInputField, '{enter}')

    // Assertion
    expect(mockPostFetch).toHaveBeenCalledWith('http://localhost:3001/tasks', {
      title: 'This TODO is from unit test #2',
    })
  })

  test('Remove TODO', async () => {
    const todolistItem = await screen.findAllByTestId('todolist-items')
    expect(todolistItem.length).toEqual(3)

    const todolistSubmitButton = await screen.findAllByTestId(
      'todolist-form-delete',
    )
    await fireEvent.click(todolistSubmitButton[0])

    expect(mockDeleteFetch).toHaveBeenCalledWith(
      'http://localhost:3001/tasks/1',
    )
  })
})
