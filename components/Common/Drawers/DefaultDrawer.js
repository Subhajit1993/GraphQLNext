import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewList from '@material-ui/icons/ViewList';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import Link from 'next/link'
import { withRouter } from 'next/router'
import Styles from './DefaultDrawerStyle'

import {toogleDrawerMobile} from "../../../store/actions/Common";
import {bindActionCreators} from "redux";
import './drawer.css'



class ResponsiveDrawer extends React.Component {


    handleDrawerToggle = () => {
        this.props.toogleDrawerMobile()
    };

    render() {
        const { classes, theme } = this.props;
        const { pathname } = this.props.router;
        const drawer = (
            <div className="drawer-main">
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <Link prefetch href={"/dashboard"} >
                        <ListItem className={classes.green} button selected={pathname==='/dashboard'} classes={{
                            root:classes.list_padding,
                        }}>
                            <ListItemIcon><DashboardIcon className={classes.icon}/></ListItemIcon>
                            <ListItemText primary={'Dashboard'} classes={{
                                primary:classes.primary
                            }} />
                        </ListItem>
                    </Link>
                </List>
                <List>
                    <Link prefetch href={"/addStore"}>
                        <ListItem className={classes.green} button selected={pathname==='/addStore'} classes={{
                            root:classes.list_padding,
                        }}>
                            <ListItemIcon><AddShoppingCart className={classes.icon}/></ListItemIcon>
                            <ListItemText primary={'Add New Store'} classes={{
                                primary:classes.primary,
                            }} />
                        </ListItem>
                    </Link>
                </List>
                <List>
                    <ListItem
                        className={classes.green}
                        selected={pathname==='/viewStore'}
                        button classes={{
                        root:classes.list_padding,
                    }}>
                        <ListItemIcon><ViewList className={classes.icon}/></ListItemIcon>
                        <ListItemText primary={'View Store'} classes={{
                            primary:classes.primary
                        }}/>
                    </ListItem>
                </List>
                <Divider />
                <List>

                </List>
            </div>
        );

        return (
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileDrawerIsOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,

                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};


const mapDispatchToProps = dispatch => {
    return {
        toogleDrawerMobile: bindActionCreators(toogleDrawerMobile, dispatch),
    }
};

const mapStateToProps = state =>{
    return {
        mobileDrawerIsOpen:state.Common.DrawerState.mobileDrawerIsOpen
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles, { withTheme: true })(withRouter(ResponsiveDrawer)))
