import React, {Component} from 'react'
import Layout from '../Layouts/LayoutDashboard'
import {redirectTo} from "../lib/helpers";
class Dashboard extends Component{
    static async getInitialProps({store, req}) {
        var user_details = store.getState().Auth.user_details;
        if(!user_details){
            redirectTo('/');
        }
    }
    render(){
        return(
            <Layout>

            </Layout>
        )
    }
}

export default Dashboard