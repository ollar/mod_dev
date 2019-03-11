import React from './react.js';
import ReactDOM from './react-dom.js';

import { Provider, connect } from './react-redux.js';
import store from './store.js';

const e = React.createElement;

const upvoteAction = () => ({
    type: 'upvote',
});

class LikeButton extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { likes: 0 };
    }

    render() {
        return e(
            'button',
            { onClick: () => this.props.dispatch(upvoteAction()) },
            `Like ${this.props.likes}`
        );
    }
}

const connectedLikeButton = connect(({likes}) => ({likes}))(LikeButton);

class App extends React.Component {
    render() {
        return (
            e(Provider, { store }, e(connectedLikeButton))
        );
    }
}

ReactDOM.render(e(App), document.body);
