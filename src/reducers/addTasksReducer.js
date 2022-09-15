export const ADD_TASK_INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  response: {},
}

export function addTasksReducer(state, action) {
  switch (action.type) {
    case 'ADD_START':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'ADD_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }
    case 'ADD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        response: action.payload,
      }
  }
}
