const env = process.env.NODE_ENV || 'development';
var constants;
if (env === "development") {
    constants = {
        'project_name':"My Store",
        'backend_host': 'http://0.0.0.0:5000/',
    }
}
else {
    constants = {
        'project_name':"",
        'backend_host': 'http://0.0.0.0:5000/',
    }
}

export default constants