let imgUrl = '/static/images/sidebar.jpg';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    icon: {
        fontSize: 28,
        color:'white'
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
    },
    primary:{
        color:'white'
    },
    list_padding:{
        paddingLeft: 12,
        paddingRight: 0,
    },
    list_focus:{
        background:'white',
        color:'white'
    },
    green: {
        borderRadius:10,
        "&:hover": {
            backgroundColor: '#4caf50',
        }
    },

});
export default styles