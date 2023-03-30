const qs = require("qs");
const axios = require('axios');
const privateConfig = require('../config/private-config.json');
const CLIENT_ID = privateConfig.nprsConfig.client_id;
const APP_SECRET = privateConfig.nprsConfig.client_secret;
const { NprsAPI } = require("./nprs-api");
const nprsAPI = new NprsAPI();

const getAccessTokenPasswordGrant = async (username, password, client_id, client_secret, grant_type) => {
    return new Promise(async (resolve, reject) => {
        if (username, password, client_id, client_secret, grant_type) {
            const data = {
                grant_type: grant_type,
                client_id: client_id,
                client_secret: client_secret,
                username: username,
                password: password
            };
            //call get token api
            await nprsAPI.getTokenPassword(data).then((res) => {
                return resolve(res);
            }).catch(error => {
                return resolve(error);
            })
        } else {
            return resolve(error);
        }
    })
};
module.exports = {
    getAccessTokenPasswordGrant};