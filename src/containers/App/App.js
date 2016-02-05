import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import 'normalize.css/normalize.css';
import grid from 'flexboxgrid/dist/flexboxgrid.css';

import {
    resetFlashMessage,
    loginUser,
    logoutUser,
    loadLoggedUser
} from 'actions';

import { UserBox } from 'components';

export class App extends Component {
    static propTypes = {
        // Injected by React Redux
        flashMessage: PropTypes.object,
        resetFlashMessage: PropTypes.func.isRequired,
        user: PropTypes.object,
        loginUser: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
        loadLoggedUser: PropTypes.func.isRequired,
        // Injected by React Router
        children: PropTypes.node
    };

    constructor(props) {
        super(props);
        this.handleDismissClick = this.handleDismissClick.bind(this);
    }

    handleDismissClick(e) {
        this.props.resetFlashMessage();
        e.preventDefault();
    }

    renderFlashMessage() {
        const { flashMessage: { status, message } } = this.props;

        if (!status || !message) {
            return null;
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{message}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                    Dismiss
                </a>)
            </p>
        );
    }

    render () {
        const {
            user,
            loginUser,
            logoutUser,
            loadLoggedUser,
            // React Router
            children
        } = this.props;
        const logoImage = require('./logo.png');

        return (
            <div>
                <Helmet 
                    title="App"
                    titleTemplate="%s - Demo"
                    />
                <div className={classNames(grid['row'])}>
                    <div className={classNames(grid['col-xs-12'], grid['col-md-2'])}>
                        <img src={logoImage} style={{maxWidth: '100%'}} />
                    </div>
                    <div className={classNames(grid['col-xs-12'], grid['col-md-10'])}>
                        <UserBox user={user} onLogin={loginUser} onLogout={logoutUser} onLoad={loadLoggedUser} />
                    </div>
                </div>
                <div>
                    <p>Menu: <Link to="/">Index</Link> | <Link to="/tests">Tests</Link></p>
                </div>
                {this.renderFlashMessage()}
                {children}
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        flashMessage: state.flashMessage,
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    {
        resetFlashMessage,
        loginUser,
        logoutUser,
        loadLoggedUser
    }
)(App)