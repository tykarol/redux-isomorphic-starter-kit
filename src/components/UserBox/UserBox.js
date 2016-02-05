import React, { PropTypes, Component } from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';

export default class UserBox extends Component {
    static propTypes = {
        user: PropTypes.shape({
            isFetching: PropTypes.bool,
            auth: PropTypes.bool,
            profile: PropTypes.shape({
                name: PropTypes.string,
                surname: PropTypes.string,
                image: PropTypes.string
            })
        }),
        onLogin: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
        onLoad: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleFormSubmit    = this.handleFormSubmit.bind(this);
        this.handleEnterKeyInput = this.handleEnterKeyInput.bind(this);
        this.handleLoginClick    = this.handleLoginClick.bind(this);
        this.handleLogoutClick   = this.handleLogoutClick.bind(this);
    }

    componentWillMount() {
        const { user: { auth } } = this.props;

        if(auth) {
            this.props.onLoad(['name', 'surname', 'image']);
        }
    }

    getInputValues() {
        return {
            username: this.refs.username.getValue(),
            password: this.refs.password.getValue()
        };
    }

    submitForm() {
        this.props.onLogin(this.getInputValues());
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.submitForm();
    }

    handleEnterKeyInput() {
        this.submitForm();
    }

    handleLoginClick() {
        this.submitForm();
    }

    handleLogoutClick() {
        this.props.onLogout();
    }

    render() {
        const { user: { auth, profile, isFetching } } = this.props;

        if(auth && isFetching === true) {
            return (
                <div>Loading...</div>
                );
        }

        if (!auth || !profile) {
            return (
                <form onSubmit={this.handleFormSubmit}>
                    <TextField floatingLabelText="Username" type="text" ref="username" onEnterKeyDown={this.handleEnterKeyInput} />
                    <TextField floatingLabelText="Password" type="password" ref="password" onEnterKeyDown={this.handleEnterKeyInput} />
                    <FlatButton label="Login" onClick={this.handleLoginClick} />
                </form>
            );
        }

        return (
            <div>
                <Avatar src={profile.image} style={{verticalAlign:'middle'}} /> {profile.name} {profile.surname} <FlatButton label="Logout" onClick={this.handleLogoutClick} />
            </div>
        );
    }
}