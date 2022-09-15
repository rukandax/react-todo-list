import React from 'react'
import useTaskManager from 'hooks/useTaskManager'

import Button from '../Button'
import InputField from '../InputField'

import './index.scss'

/**
 * TODO List
 */
export default function TodoList() {
  const [taskInputValue, setTaskInputValue] = React.useState('')
  const [{ getTaskState, addTaskState }, { addTask, deleteTask }] =
    useTaskManager({ doGetImmediately: true })

  function handleAddTask() {
    addTask(taskInputValue)
    setTaskInputValue('')
  }

  return (
    <div className="todolist">
      <h1>TODO LIST</h1>

      <div className="todolist__form">
        <InputField
          className="todolist__input"
          placeholder="Task Name"
          value={taskInputValue}
          onChange={(event) => {
            setTaskInputValue(event.target.value)
          }}
          onSubmit={handleAddTask}
          data-testid="todolist-form-input"
        />
        <Button
          disabled={addTaskState.isLoading}
          onClick={handleAddTask}
          data-testid="todolist-form-button"
        >
          Add
        </Button>
      </div>

      <hr />

      <div className="todolist__items">
        {getTaskState.isLoading ? (
          <div className="todolist__loading" data-testid="todolist-loading">
            Loading Data...
          </div>
        ) : getTaskState.isError ? (
          <div className="todolist__error">
            <strong>There is an error:</strong>{' '}
            <i>{getTaskState.errorMessage}</i>
          </div>
        ) : (
          getTaskState.tasks.map((task, taskIdx) => (
            <div
              className="todolist__item"
              key={`task-${task.id}`}
              data-testid="todolist-items"
            >
              <div className="todolist__item__data">
                <div className="todolist__item__data__number">
                  {taskIdx + 1}
                </div>
                <div className="todolist__item__data__content">
                  {task.title}
                </div>
              </div>
              <div className="todolist__item__action">
                <img
                  src="/icons/trash.png"
                  alt="Delete Task"
                  title="Delete Task"
                  onClick={() => {
                    if (
                      window.confirm('Are you sure want to remove this item?')
                    ) {
                      deleteTask(task.id)
                    }
                  }}
                  data-testid="todolist-form-delete"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
