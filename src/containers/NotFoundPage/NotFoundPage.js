import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

export class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <Helmet title="Error 404" />
                <div>Page not found!</div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    { }
)(NotFoundPage);
