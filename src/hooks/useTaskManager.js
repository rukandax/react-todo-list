import React from 'react'
import { getFetch, postFetch, deleteFetch } from 'libraries/apiAdapter'

import {
  getTasksReducer,
  GET_TASK_INITIAL_STATE,
} from 'reducers/getTasksReducer'

import {
  addTasksReducer,
  ADD_TASK_INITIAL_STATE,
} from 'reducers/addTasksReducer'

import {
  deleteTasksReducer,
  DELETE_TASK_INITIAL_STATE,
} from 'reducers/deleteTasksReducer'

const API_HOST = process.env.REACT_APP_API_HOST

function initFetch(baseUrl) {
  return {
    getFetch: () => {
      return getFetch(baseUrl)
    },
    postFetch: (data) => {
      return postFetch(baseUrl, data)
    },
    deleteFetch: (id) => {
      return deleteFetch(`${baseUrl}/${id}`)
    },
  }
}

const {
  getFetch: getTasks,
  postFetch: addTask,
  deleteFetch: deleteTask,
} = initFetch(`${API_HOST}/tasks`)

export default function useTaskManager({ doGetImmediately = false } = {}) {
  const [getTaskState, getTaskDispatch] = React.useReducer(
    getTasksReducer,
    GET_TASK_INITIAL_STATE,
  )

  const [addTaskState, addTaskDispatch] = React.useReducer(
    addTasksReducer,
    ADD_TASK_INITIAL_STATE,
  )

  const [deleteTaskState, deleteTaskDispatch] = React.useReducer(
    deleteTasksReducer,
    DELETE_TASK_INITIAL_STATE,
  )

  async function handleGetTasks() {
    try {
      getTaskDispatch({ type: 'GET_START' })
      const tasks = await getTasks()
      getTaskDispatch({ type: 'GET_SUCCESS', payload: tasks })
    } catch (error) {
      getTaskDispatch({ type: 'GET_ERROR', payload: error.message })
    }
  }

  async function handleAddTask(payload) {
    try {
      addTaskDispatch({ type: 'ADD_START' })
      const addResponse = await addTask({ title: payload })
      addTaskDispatch({ type: 'ADD_SUCCESS', payload: addResponse })
      handleGetTasks()
      window.alert('TODO Added Successfully')
    } catch {
      addTaskDispatch({ type: 'ADD_ERROR' })
    }
  }

  async function handleDeleteTask(id) {
    try {
      deleteTaskDispatch({ type: 'DELETE_START' })
      const deleteReponse = await deleteTask(id)
      deleteTaskDispatch({
        type: 'DELETE_SUCCESS',
        payload: deleteReponse || {},
      })
      handleGetTasks()
      window.alert('TODO Deleted Successfully')
    } catch {
      deleteTaskDispatch({ type: 'DELETE_ERROR' })
    }
  }

  React.useEffect(() => {
    if (doGetImmediately) {
      handleGetTasks()
    }
  }, []) // eslint-disable-line

  return [
    {
      getTaskState,
      addTaskState,
      deleteTaskState,
    },
    {
      getTasks: handleGetTasks,
      addTask: handleAddTask,
      deleteTask: handleDeleteTask,
    },
  ]
}
