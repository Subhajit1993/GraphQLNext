import Router from 'next/router'



export  function redirectTo(destination, { res, status } = {}) {
    if (res) {
        res.writeHead(status || 302, { Location: destination })
        res.end()
    } else {
        if (destination[0] === '/' && destination[1] !== '/' && process.server) {
            Router.push(destination)
        } else {
            window.location = destination
        }
    }
}