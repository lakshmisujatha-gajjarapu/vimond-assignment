const constants = require('../constants/apiconstants');
/**
 * Ping endpoint for health check purposes
 * @route GET /ping
 * @returns {string} 200 - pong
 */
const getHealth = async(req, res) => {
        res.status(200).send(constants.PONG);
};

module.exports = {
    getHealth
};