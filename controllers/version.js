const constants = require('../constants/apiconstants');
/**
 * This endpoint return the nodeversion used by the api
 * @route GET /version
 * @returns {string} 200 - Node verison
 */
const getNodeVersion = async(req, res) => {
        res.status(200).send(constants.CURRENT_NODE_VERSION + process.version);
}

module.exports = {
    getNodeVersion
};