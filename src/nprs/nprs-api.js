const privateConfig = require('../config/private-config.json');
const qs = require("qs");
const axios = require('axios');
const instance = axios.create({ baseURL: privateConfig.nprsConfig.apiURL });
const openHimInstance = axios.create({ baseURL: privateConfig.nprsConfig.santApiURL });

class NprsAPI {
  constructor() { }

  async getTokenPassword(data) {
    const response = await axios.request({
      url: `${privateConfig.santeMpiConfig.apiURL}auth/oauth2_token`,
      method: 'post',
      data: qs.stringify(data),
      auth: {
        username: data.username,
        password: data.password,
      },
    });
  //  openHimInstance.get(privateConfig.nprsConfig.nprsApiURL, {});
    return response.data;
  }


  async GET(query, accessToken) {
  if (query == null || accessToken == null) {
    return new Error("Missing query or accessToken parameter");
  }
  
  const response = await instance.get(`validate${query}`, {
    headers: {
      // Authorization: `${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
   // openHimInstance.get(privateConfig.nprsConfig.nprsApiURL, {});
  return response.data;
}
}

module.exports = {
  NprsAPI
};