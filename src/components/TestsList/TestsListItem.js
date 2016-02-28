import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';

export default class TestsListItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            score: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        }).isRequired
    };

    render() {
        const { item } = this.props;
        const label = item.title + (item.score ? ` - ${item.score}` : '');

        const buttonProps = {
            label,
            primary: true,
            linkButton: true,
            containerElement: <Link to={item.url} />
        };

        return (
            <li>
                <RaisedButton {...buttonProps} />
            </li>
        );
    }
}
