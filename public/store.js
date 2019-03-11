import { createStore } from './redux.js';

const initialState = {
    likes: 0,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'upvote':
            return {...state, likes: state.likes + 1}

        default:
            return state;
    }
};

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
