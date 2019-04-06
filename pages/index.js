import React from 'react'

import Header from '../components/Header'
import Page from '../components/Page'
import withApollo from '../lib/withApollo'
import Layout from '../Layouts/LayoutDefault'

class Index extends React.Component {
    static async getInitialProps({req,apolloClient }) {
        return {data: "Some Data"};
    }
    componentWillMount(){

    }
    componentDidMount() {
        loadScript('https://smartlock.google.com/client', ()=>{
            const hintPromise = window.googleyolo.hint({
                supportedAuthMethods: [
                    "https://accounts.google.com"
                ],
                supportedIdTokenProviders: [
                    {
                        uri: "https://accounts.google.com",
                        clientId: "127606988004-03e54kde6vfmj9sn9o3no85f55qmfsnd.apps.googleusercontent.com"
                    }
                ]
            });
            hintPromise.then((credential) => {
                if (credential.idToken) {
                    console.log(credential)
                    //Send the token to your auth backend.
                    //useGoogleIdTokenForAuth(credential.idToken);
                }
            }, (error) => {

            })
        })
    }


    render() {
        return (
            <Layout title='Your Resume'>
                <Header auth={this.props.auth}/>
                <Page title='Index'/>
            </Layout>
        )
    }
}

export function loadScript(url, callback) {

    var script = document.createElement('script');
    script.type = 'text/javascript'

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' ||
                script.readyState === 'complete') {
                script.onreadystatechange = null
                callback()
            }
        }
    }
    else {  //Others
        script.onload = function () {
            callback()
        }
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script)
}




export default withApollo((Index))
