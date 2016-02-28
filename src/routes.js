import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import {
    App,
    HomePage,
    TestsPage,
    TestPage,
    NotFoundPage
} from 'containers';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />

        <Route path="/index" component={HomePage} />
        <Redirect from="/test" to="/tests" />
        <Route path="/tests" component={TestsPage} />
        <Route path="/test/:testId" component={TestPage} />

        <Route path="*" component={NotFoundPage} status={404} />
    </Route>
);
