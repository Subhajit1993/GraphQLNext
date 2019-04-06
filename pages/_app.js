// pages/_app.js
import React from "react";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import initStore from "../store";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/muiPageContext';
import {setUserDetails} from '../store/actions/auth'
import Auth from '../lib/Auth';
const auth = new Auth();
import initApollo from "../lib/initApollo";
import {parse} from "cookie";
import {user_from_session} from '../graphql/auth'

function parseCookies (req, options = {}) {
    return parse(req ? req.headers.cookie || '' : process.browser?document.cookie:'', options)
}

class MyApp extends App {
    constructor() {
        super();
        this.pageContext = getPageContext();
    }

    static async getInitialProps({Component, ctx}) {
        const apollo = initApollo(
            {},
            {
                getToken: () => parseCookies(ctx.req).accessToken
            }
        );

        try {
            var {data:{GetUserFromSession}} = await apollo.query({ query:user_from_session});
        }catch (e) {

        }
        await ctx.store.dispatch(setUserDetails(GetUserFromSession));
        let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        if(!pageProps)
            pageProps = {};
        pageProps.user_details = GetUserFromSession;
        return {pageProps};
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <JssProvider
                        registry={this.pageContext.sheetsRegistry}
                        generateClassName={this.pageContext.generateClassName}
                    >

                        <MuiThemeProvider
                            theme={this.pageContext.theme}
                            sheetsManager={this.pageContext.sheetsManager}
                        >
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
                            <Component {...pageProps} pageContext={this.pageContext}  auth={auth}/>
                        </MuiThemeProvider>
                    </JssProvider>
                </Provider>
            </Container>
        );
    }
}

export default (withRedux(initStore)(MyApp))
