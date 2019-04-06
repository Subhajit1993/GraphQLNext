import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
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
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
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
class Location extends Component{

    state = {
        mapLat:-33.8617374,
        mapLng:151.2021291,
        addressQuery:'New Delhi',
        selectedLng:null,
        selectedLat:null,
        marker:null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    componentDidMount(){
        this.initMap();
    }
    initMap = () =>{
        var map;
        var service;
        var marker;
        var mapCenter = new google.maps.LatLng(this.state.mapLat,this.state.mapLng);
        map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 15
        });
        this.map = map;
        marker = new google.maps.Marker({
            map,
            draggable:true,
            anchorPoint: new google.maps.Point(0, -29)
        });
        this.marker = marker

        var request = {
            query: this.state.addressQuery,
            fields: ['formatted_address', 'name', 'geometry'],
        };
        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status)=> {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    this.createMarkerAndMap(place, map, marker)
                }
            }
        });
        marker.addListener('dragend', this.handleDragEvent);
    };
    handleDragEvent = (event)=>{
        this.setState({
            selectedLng:event.latLng.lng(),
            selectedLat:event.latLng.lat()
        })
    }
    createMarkerAndMap = (place, map, marker)=>{
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    }

    handleGetLocation = ()=>{
        this.initMap();
    };
    handleSubmit() {
        this.props.setLatLng(this.marker.getPosition().lat(), this.marker.getPosition().lng())
        this.props.handleSteps(3)
    }

    render(){
        const {classes, theme, mapLat} = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <div>Please select your location, or type in the input box</div>
                    </Grid>
                    <Grid item xs={8} md={3}>
                        <TextField
                            id="location"
                            label="Type your location"
                            className={classes.textField}
                            value={this.state.addressQuery}
                            onChange={this.handleChange('addressQuery')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Button variant="contained" size='large' color="primary" className={classes.button}
                                onClick={() => this.handleGetLocation()}>
                            Get Location
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} md={12}>
                        <div className={classes.map_container} id="map"></div>
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

const mapDispatchToProps = dispatch => ({
    setLatLng: (lat, lng) => dispatch({type: 'SET_LAT_LNG', payload: {lat, lng}}),
});

const mapStateToProps = state => {
    return {
        mapLat: state.StoreReg.Location.lat,
        mapLng:state.StoreReg.Location.lng
    }
};

const StoreLocationStyled = withStyles(styles, {withTheme: true})(Location);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    StoreLocationStyled
)
;
