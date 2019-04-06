const compose = require('next-compose')


const withCSS = require('@zeit/next-css')


const withImages = require('next-images')

module.exports = compose([
    [withCSS],
    [withImages],
    {
        webpack: (config) => {
            /**some special code */
            return config
        }
    }
])