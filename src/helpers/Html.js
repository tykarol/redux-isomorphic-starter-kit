import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    }

    render() {
        const { assets, component, store } = this.props;
        const initialState = store ? store.getState() : {};
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();

        // Remove token from store
        if(initialState.user && initialState.user.token) {
            initialState.user.token = null;
        }
        
        return (
            <html lang="pl">
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}

                    {/*<link rel="shortcut icon" href="/favicon.ico" />*/}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {/* styles (will be present only in production with webpack extract text plugin) */}
                    {Object.keys(assets.styles).map((style, key) =>
                        <link href={assets.styles[style]} key={key} rel="stylesheet" />
                    )}
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
                    <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};`}} />
                    {Object.keys(assets.javascript).map((script, key) =>
                        <script src={assets.javascript[script]} key={key} />
                    )}
                </body>
            </html>
        );
    }
}