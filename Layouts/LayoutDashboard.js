import Link from 'next/link'
import React from 'react';
import Head from 'next/head'
import AppBar from '../components/Common/AppBar/DefaultAppBar'
import AppDrawer from '../components/Common/Drawers/DefaultDrawer'
import '../assets/css/main.css'
import CustomSnackBar from '../components/Common/CustomSnackBar'


export default class LayoutDashboard extends React.Component{
    render() {
        var {children, title = 'Techintoo Store'} = this.props;
        return(
            <div className="main-wrapper">
                <Head>
                    <title>{title}</title>
                    <script src="https://maps.googleapis.com/maps/api/js?key=####################&libraries=places"/>
                </Head>
                <AppDrawer/>
                <div style={{display:'flex', flexWrap:'wrap', flex:'100%'}}>
                    <AppBar/>
                    {children}
                </div>
                <CustomSnackBar/>
            </div>
        )
    }
}

