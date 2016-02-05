import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { loadTest } from 'actions';

export class TestPage extends Component {
    static propTypes = {
        testId: PropTypes.string.isRequired,
        test: PropTypes.object,
        loadTest: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        const { testId } = this.props;
        this.props.loadTest(testId, ['title', 'questionsCount']);
    }

    render () {
        const { testId, test } = this.props;

        if(!test) {
            return (
                <div>Loading</div>
                );
        }

        return (
            <div>
                <Helmet title={`${test.title} - Test`} />
                <div>Test #{testId} - {test.title}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { testId } = state.router.params;
    const { entities: { tests } } = state;

    return {
        testId,
        test: tests[String(testId)]
    };
}

export default connect(
    mapStateToProps, 
    { loadTest }
)(TestPage)