import { createStore } from './redux';

const initialState = {
    likes: 0,
}

const rootReducer = (state = initialState, action) {
    switch (action.type) {
        case 'upvote':
            return {...state, likes: state.likes + 1}

        default:
            return state;
    }
};

const store = createStore(rootReducer)

export default store;
