import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class HomePage extends Component {
    render() {
        return (
            <div>
                <Helmet title="Home page" />
                <div>Home page</div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    { }
)(HomePage);
