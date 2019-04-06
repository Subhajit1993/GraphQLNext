import React, {Component} from 'react'
import Layout from '../Layouts/LayoutDashboard'
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepOneContent from '../components/AddStore/PrimaryDetails'
import Location from '../components/AddStore/Location'
import StorePhotos from '../components/AddStore/StorePhotos'
import StoreContactInfo from '../components/AddStore/StoreContactInfo'
import {redirectTo} from '../lib/helpers'


const styles = theme => ({
    root_paper: {
        flex: '0 0 100%;',
        backgroundColor: 'inherit',
        [theme.breakpoints.up('md')]: {
            padding: '10px 200px',
        },
    },
    root_paper_content: {
        display: 'flex',
        width: '100%',
        padding: '10px 20px',
        [theme.breakpoints.up('md')]: {
            margin: '10px 50px',
        },
    },
    root_stepper: {
        backgroundColor: 'inherit',
    },
    root_paper_elevation0: {
        backgroundColor: 'inherit',
    },
    labelContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }
});

function getSteps() {
    return ['Primary Details', 'Location', 'Photos', 'Contact Info'];
}


class AddStore extends Component {
    static async getInitialProps({store, req, res}) {
        var user_details = store.getState().Auth.user_details;
        if (!user_details) {
            redirectTo('/');
        }
    }

    state = {
        activeStep: 1,
        skipped: new Set(),
    };
    handleSteps = (step) => {
        this.setState({
            activeStep: step
        })
    };

    getStepContent = (step) => {
        switch (step) {
            case 1:
                return <StepOneContent handleSteps={this.handleSteps} user_details={this.props.user_details}/>;
            case 2:
                return <Location handleSteps={this.handleSteps} user_details={this.props.user_details}/>;
            case 3:
                return <StorePhotos handleSteps={this.handleSteps} user_details={this.props.user_details}/>;
            case 4:
                return <StoreContactInfo handleSteps={this.handleSteps} user_details={this.props.user_details}/>;
            default:
                return 'Unknown step';
        }
    };

    render() {
        const {classes, theme} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        return (
            <Layout title={"Add New Store"}>
                <Paper elevation={0} classes={{
                    root: classes.root_paper,
                }}>
                    <Stepper activeStep={activeStep} classes={{
                        root: classes.root_stepper,
                    }}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps} classes={{
                                        labelContainer: classes.labelContainer
                                    }}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Paper>
                <Paper elevation={1} classes={{
                    root: classes.root_paper_content
                }}>
                    {this.getStepContent(activeStep)}
                </Paper>
            </Layout>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddStore)