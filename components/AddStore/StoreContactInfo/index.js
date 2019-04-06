import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
import {bindActionCreators} from "redux";
import {setStoreRegFields} from "../../../store/actions/StoreRegAction";
import {connect} from "react-redux";



const styles = theme => ({
    root: {
        flex: '0 0 100%;',
        flexGrow: 1,
    },
    button:{
        marginTop:20
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom:10
    },
    map_container:{
        minHeight:300,
        minWidth:300
    }
});
class ContactInfo extends Component{

    state = {

    };

    handleChange = name => event => {
        this.props.setBookRegFields(name, event.target.value)
    };
    componentDidMount(){
    }
    handleSubmit() {

    }

    render(){
        const {classes, theme} = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <h2>Please enter your store/business contact info</h2>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="store-land-line-number"
                            label="Store/Shop Land Line Number"
                            className={classes.textField}
                            value={this.props.store_land_line_number}
                            onChange={this.handleChange('store_land_line_number')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="store-phone-number"
                            label="Business's Phone Number"
                            className={classes.textField}
                            value={this.props.store_phone_number}
                            onChange={this.handleChange('store_phone_number')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}/>
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="store-website"
                            label="Business Website"
                            className={classes.textField}
                            value={this.props.store_website}
                            onChange={this.handleChange('store_website')}
                            margin="normal"
                        />
                    </Grid><Grid item xs={12} md={4}>
                    <TextField
                        id="store-email-id"
                        label="Business Email Id"
                        className={classes.textField}
                        value={this.props.store_email_id}
                        onChange={this.handleChange('store_email_id')}
                        margin="normal"
                    />
                </Grid>

                </Grid>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <Button variant="contained" size='large' color="primary" className={classes.button}
                                onClick={() => this.handleSubmit()}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setBookRegFields: bindActionCreators(setStoreRegFields, dispatch),
});

const mapStateToProps = state => {
    return {
        store_land_line_number:state.StoreReg.store_land_line_number,
        store_phone_number:state.StoreReg.store_phone_number,
        store_website:state.StoreReg.store_website,
        store_email_id:state.StoreReg.store_email_id,
    }
}

const StepperContentStyled = withStyles(styles, {withTheme: true})(ContactInfo);

export default connect(mapStateToProps, mapDispatchToProps)(StepperContentStyled);
