
# Endpoints

  

## POST Request

  

  

URL: `localhost:6000/validate`

Method: `POST`

Authentication: `Required`

Parameter: | _**localhost:6000**_ | Specifies the link to where the NPRS is hosted |

Parameter: | _**/postResource**_ | Specifies NPRS validate endpoint|

  

**Request Body:**

  

  

```json

{
    "idNo": "0987654321",
    "sex": "m",
    "surname": "Nehemia", 
    "auth": "/Y63UYsirfLkT"
}

  

```

  

  

**Response:**

  

  

```json
{
    "birthDateActive": "1987/12/01",
    "faultCode": 503,
    "faultString": "SERVICE_UNAVAILABLE",
    "firstNameActive": "MARY JANE",
    "idNoActive": "0987654321",
    "idNoQuery": "0987654321",
    "nationalityCountryCode": 303,
    "nationalityCountryISOA3": "CAN",
    "nationalityCountryName": "CANADA",
    "nprsReferenceNo": 24681012,
    "requestID": "b1c2d3e4-f5g6-h7i8-j9k0-lmno12345678",
    "status": 2,
    "surnameActive": "DOE"
}
```

## Authentication

  

## User authentication

  

  

URL: `localhost:8080/userAuth`

Method: `POST`

Authentication: `Required`

Parameter: | _**localhost:8080**_ | Specifies the link to where the santeMPI is hosted |

Parameter: | _**/userAuth**_ | Specifies Sante MPI userAuth endpoint|
  

**Request Body:**

  

  

```json
{
    "grant_type":"password"
    "client_id":"wick"
    "client_secret":"wick"
    "username":"john"
    "password":"john"
}
```

  

  

**Response:**

  

  

```json
{
"access_token": "8C108588B30DED119ED50242AC160004E7F7FB80F5FCBE7A7D6A7FBFB53BC60B9E2DB0C7B063FBFA63DA17BFAB7526BF",

"id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsIm5hbWUiOiI4MmY0MGE4OC05MDlmLTExZWMtYTNmNy0wMjQyYWMxNjAwMDIifQ."
"eyJ1bmlxdWVfbmFtZSI6ImpvaG4iLCJyb2xlIjoiUEVSU09OIiwiYXV0aG1ldGhvZCI6IlBhc3N3b3JkIiwibmFtZWlkIjoiNjQ2YTI5MDYtYmExZ"

"token_type": "bearer",
"expires_in": 3599937,

"refresh_token": "CC4854779AD0764C8802003DB15CE8E27418039113F83087924C1DF66E71AB271D704ACE68674240881ADA8D11B02BF8"

}

```