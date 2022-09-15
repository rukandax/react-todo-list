export const DELETE_TASK_INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  response: {},
}

export function deleteTasksReducer(state, action) {
  switch (action.type) {
    case 'DELETE_START':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'DELETE_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }
    case 'DELETE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload,
      }
  }
}
