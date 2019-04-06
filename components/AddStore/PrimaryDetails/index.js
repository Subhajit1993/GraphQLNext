import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {connect} from "react-redux";

import {setStoreRegFields} from "../../../store/actions/StoreRegAction";
import {bindActionCreators} from "redux";
import {toogleDrawerMobile} from "../../../store/actions/Common";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: '16px 8px',
        minWidth: '100%',
        maxWidth: '100%',
    },
    formControlRadio: {
        margin: '26px 8px',
        minWidth: '100%',
        maxWidth: '100%',
    },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 50,
        },
    },
};

const names = [
    'Grocery Store',
    'General Store',
    'Book Store',
    'Stationary Store',
];

class StepperContent extends Component {
    state = {
        error_states: new Set(),
        allow_proceed: false,
    };

    handleChange = name => event => {
        this.props.setBookRegFields(name, event.target.value)
    };

    handleValidation = (type) => {
        var error_states = this.state.error_states;
        switch (type) {
            case 'store_name':
                if (!this.props.store_name || this.props.store_name.length < 2) {
                    this.props.fireSnackBar('Please enter a valid name', 'error');
                    error_states.add('store_name');
                }
                else {
                    error_states.delete('store_name');
                }
                break;
            case 'store_type':
                if (!this.props.store_type || !this.props.store_type.length) {
                    this.props.fireSnackBar('Please select store/shop/business type', 'error');
                    error_states.add('store_type');
                }
                else {
                    error_states.delete('store_type');
                }
                break;
            case 'owner_name':
                if (!this.props.owner_name || !this.props.owner_name.length) {
                    this.props.fireSnackBar('Please provide us the owner name', 'error');
                    error_states.add('owner_name');
                }
                else {
                    error_states.delete('owner_name');
                }
                break;
            case 'owner_phone':
                break;
        }
        this.setState(prevState => ({
            error_states
        }));
    };

    handleSubmit() {
        let all_state_data = this.state;
        let {
            error_states,
        } = all_state_data;

        let {
            store_name,
            reg_no,
            reg_year,
            owner_name,
            owner_phone,
            owner_email,
            store_type,
            ownership
        } = this.props;

        if ((!store_name || !store_name.length) || (!owner_email || !owner_email.length) || (!store_type || !store_type.length)) {
            this.setState({
                allow_proceed: false
            });
            this.props.fireSnackBar('Please verify all the inputs', 'error');
        }
        else if (error_states.size > 0) {
            this.setState({
                allow_proceed: false
            });
            this.props.fireSnackBar('Please verify all the inputs', 'error');
        }
        else {
            this.props.handleSteps(2)
        }
        //
    }

    render() {
        const {classes, theme} = this.props;
        return (
            <Grid container spacing={24} className={classes.container}>
                <Grid item xs={12} md={12}>
                    <FormControl className={classes.formControlRadio}>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.props.ownership}
                            onChange={this.handleChange('ownership')}
                            row
                        >
                            <FormControlLabel
                                value="owner"
                                control={<Radio color="primary"/>}
                                label="This is my own store"
                            />
                            <FormControlLabel
                                value="visitor"
                                control={<Radio color="primary"/>}
                                label="This is some else's store"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    {this.props.ownership ?
                        <Grid container spacing={24} className={classes.container}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="store-name"
                                    error={this.state.error_states.has('store_name')}
                                    label="Store/Shop Name"
                                    className={classes.textField}
                                    value={this.props.store_name}
                                    onChange={this.handleChange('store_name')}
                                    onBlur={() => this.handleValidation('store_name')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}/>
                            <Grid item xs={12} md={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-chip">Store Type</InputLabel>
                                    <Select
                                        multiple
                                        value={this.props.store_type}
                                        onChange={this.handleChange('store_type')}
                                        onBlur={() => this.handleValidation('store_type')}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {names.map(name => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={this.props.store_type.indexOf(name) > -1}/>
                                                <ListItemText primary={name}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="reg-no"
                                    label="Registration Number"
                                    className={classes.textField}
                                    value={this.props.reg_no}
                                    onChange={this.handleChange('reg_no')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="reg-year"
                                    label="Registration Year"
                                    className={classes.textField}
                                    value={this.props.reg_year}
                                    onChange={this.handleChange('reg_year')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="owner-name"
                                    error={this.state.error_states.has('owner_name')}
                                    label="Owner Name"
                                    className={classes.textField}
                                    value={this.props.owner_name}
                                    onChange={this.handleChange('owner_name')}
                                    onBlur={() => this.handleValidation('owner_name')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="owner-phone-number"
                                    error={this.state.error_states.has('owner_phone')}
                                    label="Owner's Phone Number"
                                    className={classes.textField}
                                    value={this.props.owner_phone}
                                    onChange={this.handleChange('owner_phone')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    id="owner-email"
                                    label="Owner's Email ID"
                                    className={classes.textField}
                                    value={this.props.owner_email}
                                    onChange={this.handleChange('owner_email', this.state.owner_email)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid> : null
                    }
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="contained" size='large' color="primary" className={classes.button}
                            onClick={() => this.handleSubmit()}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fireSnackBar: (text, color) => dispatch({
        type: 'SNACKBAR',
        payload: {snackBarOpen: true, snackBarText: text, snackBarColor: color}
    }),
    closeSnackBar: () => dispatch({type: 'SNACKBAR', payload: {snackBarOpen: false}}),
    setBookRegFields: bindActionCreators(setStoreRegFields, dispatch),
});

const mapStateToProps = state => {
    return {
        snackBarOpen: state.Common.snackBarOpen,
        snackBarText: state.Common.snackBarText,
        snackBarColor: state.Common.snackBarColor,
        store_name: state.StoreReg.store_name,
        reg_no: state.StoreReg.reg_no,
        reg_year: state.StoreReg.reg_year,
        owner_name: state.StoreReg.owner_name,
        owner_phone: state.StoreReg.owner_phone,
        owner_email: state.StoreReg.owner_email,
        store_type: state.StoreReg.store_type,
        ownership: state.StoreReg.ownership,
    }
};

const StepperContentStyled = withStyles(styles, {withTheme: true})(StepperContent);

export default connect(mapStateToProps, mapDispatchToProps)(StepperContentStyled);