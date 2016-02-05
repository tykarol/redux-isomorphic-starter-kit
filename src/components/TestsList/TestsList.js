import React, { PropTypes, Component } from 'react';
import TestsListItem from './TestsListItem';

export default class TestsList extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]).isRequired
            }).isRequired
        ).isRequired
    };

    static defaultProps = {
        isFetching: true
    };

    render() {
        const { isFetching, items } = this.props;
        const isEmpty = items.length === 0;

        if (isEmpty && isFetching) {
            return <div><i>Loading...</i></div>
        }

        if (isEmpty && !isFetching) {
            return (
                <div><i>Nothing here!</i></div>
            );
        }

        return (
            <ul>
                {this.props.items.map(function(item) {
                    return <TestsListItem key={item.id} item={item} />;
                })}
            </ul>
        );
    }
}