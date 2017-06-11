import { combineReducers } from 'redux';

const appStore = combineReducers({
  global: (state = {}, action) => {
    switch (action.type) {
      case 'error':
        return {
          message: action.payload,
        };
      default:
        return state;
    }
  },
});

export default appStore;
