import React from './react.js';
import ReactDOM from './react-dom.js';

import { Provider } from './react-redux.js';
import store from './store.js'

const e = React.createElement;

class LikeButton extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { likes: 0 };
    }

    render() {
        return e(Provider, { store }, e(
            'button',
            { onClick: () => this.setState({ likes: this.state.likes + 1 }) },
            `Like ${this.state.likes}`
        ));
    }
}

ReactDOM.render(e(LikeButton), document.body);
