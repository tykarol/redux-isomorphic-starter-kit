import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { DevTools } from 'containers';

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div>
                    <ReduxRouter />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
