const access_token = require('../nprs/acces-token');
const { NprsAPI } = require("../nprs/nprs-api");
const nprsAPI = new NprsAPI();
const privateConfig = require('../config/private-config.json');
const querystring= require('querystring');

// function jsonToQueryString(json) {
//   const query = querystring.stringify(json);
//   return `?${query}`;
// }

function jsonToQueryString(json) {
  const { identifier, gender, name, meta } = json;

  const idNo = identifier.find(
    (id) => id.system === "http://example.com/idNo"
  )?.value;
  const sex = gender === "male" ? "m" : "f"; // convert FHIR gender to "m" or "f"
  const surname = name[0]?.family;
  const auth = meta?.tag?.find(
    (tag) => tag.system === "http://example.com/auth"
  )?.code;

  const queryObj = {
    idNo,
    sex,
    surname,
    auth,
  };

  const query = querystring.stringify(queryObj);
  console.log(`?${query}`);
  return `?${query}`;
}

function generateValidFHIRResource(body, type) {
  var obj = {};
  if (type == 'valid')
  {
    obj = {
      "resourceType": "Patient",
      "identifier": [
        {
          "system": "http://ohie.org/National_ID",
          "value": body.idNoActive
        }
      ],
      "extension": [ 
        {
          "url": "urn:validationproject:nprsStatus",
          "valueString": "valid"
        } 
      ],
      "name": [
        {
          "family": body.surnameActive,
          "given": body.firstNameActive,
          "use": "official"
        }
      ],
      "birthDate": body.birthDateActive.replace(/\//g, '-')
    };

  }
  else
  {
    var gender = "";
    if (body.data.sex == 'm') {
      gender = "male";
    }
    else if (body.sex == 'f') {
      gender = "female";
    }

    obj = {
      "resourceType": "Patient",
      "identifier": [
        {
          "system": "http://ohie.org/National_ID",
          "value": body.data.idNo
        }
      ],
      "extension": [ 
        {
          "url": "urn:validationproject:nprsStatus",
          "valueString": "invalid"
        } 
      ],
      "name": [
        {
          "family": body.data.surname
        }
      ],
      "gender": gender
    };

  }
  return obj;
}


//User auth
const userAuthentication = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Extracting user auth headers
      const username = req.body.headers.username;
      const password = req.body.headers.password;
      const client_id = req.body.headers.client_id;
      const client_secret = req.body.headers.client_secret;
      const grant_type = req.body.headers.grant_type;

      //check the grant type
      if (grant_type == privateConfig.santeMpiConfig.grant_type_p) {
        await access_token.getAccessTokenPasswordGrant(username, password, client_id, client_secret, grant_type).then((response) => {
          // console.log(response)
          res.status(200).send(response)
          return resolve(response);
        }).catch(error => {
          res.status(400).send(error)
        })
      }
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  })
}
//POST API
const POST = async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    // const query = jsonToQueryString(req.body);
    const query = jsonToQueryString(req.body);
    try {
      //set content type to fhir
      res.setHeader('Content-Type', 'application/fhir+json');
      //Acces token
      // const accessToken = req.body.auth;
      const accessToken = req.body.meta.tag[0].code;
      await nprsAPI.GET(query, accessToken).then(async (response) => {
        if(response.faultCode == 201){
          res.status(200).send(generateValidFHIRResource(response,"valid"));
        }
        else{
          res.status(200).send(generateValidFHIRResource(response,"invalid"));
        }
      }).catch(error => { res.status(400).send(error) })
    } catch (error) {
      res.status(400).send(error)
      throw error;
    }
  } else { res.status(500).send("No FHIR body specified") }
}

module.exports = {
  userAuthentication,
  POST
}