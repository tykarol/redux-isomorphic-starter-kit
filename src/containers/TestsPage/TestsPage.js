import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { loadTests } from 'actions';
import { TestsList } from 'components';

import styles from './TestsPage.scss';

export class TestsPage extends Component {
    static propTypes = {
        tag: PropTypes.string.isRequired,
        testsPagination: PropTypes.object,
        tests: PropTypes.array.isRequired,
        loadTests: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        const { tag } = this.props;
        this.props.loadTests(tag);
    }

    render() {
        const { tests } = this.props;

        if (!tests) {
            return (
                <div>
                    Loading
                </div>
                );
        }

        const testsItems = tests.map((item) => ({
            ...item,
            url: `test/${item.id}`
        }));

        return (
            <div>
                <Helmet title="Tests" />
                <div className={styles.wrapper}>
                    <div className={styles.title}>Tests page</div>
                    <TestsList items={testsItems} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const tag = 'all';
    const {
        pagination: { testsByTag },
        entities: { tests }
    } = state;

    const tagPagination = testsByTag[tag] || { ids: [] };
    const tagTests = tagPagination.ids.map(id => tests[id]);

    return {
        tag,
        testsPagination: tagPagination,
        tests: tagTests
    };
};

export default connect(
    mapStateToProps,
    { loadTests }
)(TestsPage);
