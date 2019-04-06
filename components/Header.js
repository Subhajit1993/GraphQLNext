import Link from 'next/link'
import { withRouter } from 'next/router'
import React from "react";

class Header extends React.Component {
    componentDidMount(){
        console.log()
    }

    login(){
        this.props.auth.login()
    }

    render () {
        return (
            <header>
                <div className="top-bar">
                    <div className="logo-text">
                        My Store
                    </div>
                    <div className="mdl-cell mdl-cell--2-col mdl-cell--middle" style={{marginLeft:'auto'}}>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={()=>this.login()}>
                            Login/Register
                        </button>
                    </div>
                </div>
            </header>
        )
    }
}


export default withRouter(Header)
