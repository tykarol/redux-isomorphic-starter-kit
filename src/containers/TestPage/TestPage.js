import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import { loadTest } from 'actions';

export class TestPage extends Component {
    static propTypes = {
        testId: PropTypes.string.isRequired,
        test: PropTypes.object,
        loadTest: PropTypes.func.isRequired
    };

    static fetchData({store}) {
        let props = mapStateToProps(store.getState())
        const { testId } = props;

        return bindActionCreators(loadTest, store.dispatch)(testId, ['title', 'questionsCount']);
    };

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        const { testId } = this.props;
        this.props.loadTest(testId, ['title', 'questionsCount']);
    }

    render() {
        const { testId, test } = this.props;

        if (!test) {
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
};

export default connect(
    mapStateToProps,
    { loadTest }
)(TestPage);
