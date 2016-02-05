import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

export default class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <Helmet title="Error 404" />
                <div>Page not found!</div>
            </div>
        );
    }
};