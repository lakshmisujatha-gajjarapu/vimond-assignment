const fetch = require('node-fetch');
const getPhotos = async(url) => {
    const response = await fetch(url);  
    const data = await response.json();
    
    return data;
}

module.exports = {
    getPhotos
};