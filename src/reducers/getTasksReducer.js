export const GET_TASK_INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  tasks: [],
}

export function getTasksReducer(state, action) {
  switch (action.type) {
    case 'GET_START':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'GET_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }
    case 'GET_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasks: action.payload,
      }
  }
}
