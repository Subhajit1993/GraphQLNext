import React, {Component} from 'react';
import loading from './loading.svg';
import {withApollo, compose} from 'react-apollo'
import {connect} from "react-redux";
import withApolloComp from "../../lib/withApollo";
import {user_auth} from '../../graphql/auth'
import Layout from '../../Layouts/LayoutDefault'
import { bindActionCreators } from 'redux'
import {setToken} from "../../lib/Auth";

class Callback extends Component {
    componentDidMount() {
        if (/access_token|id_token|error/.test(location.hash)) {
            this.props.auth.handleAuthentication().then((res) => {
                if (res) {
                    var {idToken, idTokenPayload, expiresIn, tokenType} = res;
                    if (idToken && idTokenPayload) {
                        var {given_name, family_name, email} = idTokenPayload;
                        this.props.client.mutate({
                            mutation: user_auth,
                            variables: {
                                Name:given_name+' '+family_name,
                                Email:email,
                                AuthProvider:'Auth0',
                                UserType:'Owner'
                            },
                        }).then((result)=>{
                            var token = result.data.UserAuth.jwt_token;
                            setToken(token);
                            window.location.replace('/dashboard');
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }
            }).catch(err => {
                console.log(err)
            });
        }
    }


    render() {
        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
        };

        return (
            <Layout>
                <div style={style}>
                    <img src={loading} alt="loading"/>
                </div>
            </Layout>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {

    }
}

export default compose(
    withApolloComp,
    withApollo,
    connect(null, mapDispatchToProps)
)(Callback);