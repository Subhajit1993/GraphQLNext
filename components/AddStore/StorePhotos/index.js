import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import dynamic from 'next/dynamic';
import axios from 'axios';
import apis from '../../../config/apis'
import {bindActionCreators} from "redux";

const Dropzone = dynamic(() => import('react-dropzone'), {
    ssr: false
});


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        margin: 0
    },
    root: {
        flex: '0 0 100%;',
        flexGrow: 1,
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
    input_div: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drop_section: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


class StorePhotos extends Component {

    state = {
    }

    handleFiles = (file) => {
        var formData = new FormData();
        for(let i=0; i<file.length; i++){
            formData.append("images", file[i]);
        }
        axios.post(apis().UPLOAD_PICS_GET_URL.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
           if(res.data.success){
               let files = [...this.props.uploaded_files];
               res.data.data.forEach((item)=>{
                   files.push({
                       url:item.url
                   });
               });
               this.props.setUploadedFiles(files)
           }
        })
    };

    handleLogoFile = (evt)=>{
        var formData = new FormData();
        var file = evt.target.files[0]
        formData.append("image", file);
        axios.post(apis().UPLOAD_STORE_LOGO_GET_URL.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            this.props.setUploadedLogoUrl(res.data.data.url)
        })
    }

    handleSubmit = () => {
        this.props.handleSteps(4)
    };
    deleteImage = (img) => {
        var filtered = this.props.uploaded_files.filter(function(value, index, arr){
            return value.url !== img.url;
        });
        this.props.setUploadedFiles(filtered)
    };

    render() {
        const {classes, theme, uploaded_logo_url} = this.props;
        const listItems = this.props.uploaded_files.map((file) =>
            <Grid item xs={6} md={3} key={file.url} className="img-container">
                <img src={file.url} style={{width: '100%'}}/>
                <div className="img-hover-container">
                    <button onClick={()=>this.deleteImage(file)}>Delete</button>
                </div>
            </Grid>
        );
        return (
            <div className={classes.root}>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <h2>Please drop your store/business pics below</h2>
                    </Grid>
                    <Grid item xs={12} md={12} style={{backgroundColor: '#f5f5f5', marginBottom: 10, height: 120}}>
                        <Dropzone onDrop={acceptedFiles => this.handleFiles(acceptedFiles)}>
                            {({getRootProps, getInputProps}) => (
                                <section className={classes.drop_section}>
                                    <div {...getRootProps()} className={classes.input_div}>
                                        <input {...getInputProps()} />
                                        <div>Drag 'n' drop some files here, or click to select files</div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container}>
                    {listItems}
                </Grid>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <h2>Upload your store logo</h2>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={3}>
                        <div>
                            <img src={uploaded_logo_url} width="100%"/>
                        </div>
                        <div>
                            <input accept="image/*" type="file" onChange={(evt) => this.handleLogoFile(evt)}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <Button variant="contained" size='large' color="primary" className={classes.button}
                                onClick={() => this.handleSubmit()}>
                            Submit and Continue
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const StorePhotosContentStyled = withStyles(styles, {withTheme: true})(StorePhotos);

const mapDispatchToProps = dispatch => ({
    setUploadedFiles: (files) => dispatch({type: 'SET_UPLOADED_IMAGE_FILES', payload: {files}}),
    setUploadedLogoUrl: (url) => dispatch({type: 'SET_UPLOADED_LOGO_URL', payload: {url}}),
});

const mapStateToProps = state => {
    return {
        uploaded_files: state.StoreReg.uploaded_files,
        uploaded_logo_url: state.StoreReg.uploaded_logo_url,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    StorePhotosContentStyled
)
;