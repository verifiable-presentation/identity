`A student creating a DID using their school-issued email address could make the following request:

POST /identity HTTP/1.1`

Host: identity-api.io

Content-Type: application/json




{


	"identifier": {
 
		"type": "email",
    
		"properties": {
    
			"email": "ramesh@institute.edu",
      
		}
	}
}

//Post  request body with curl

curl -X POST  
   -H "Content-Type: application/json"
   -d '{
	"identifier": {
 
		"type": "email",
    
		"properties": {
    
			"email": "ramesh@institute.edu",
      
		}}'
		
//Post request body with HTTPie

POST /post HTTP/1.1
Content-Type: application/json
Host: identity-api.io;

{"identifier": {
 
		"type": "email",
    
		"properties": {
    
			"email": "ramesh@institute.edu",
      
		}
    
}





POST   :  The HTTP POST request method sends data to the server. For CRUD operations, the HTTP POST method is used to create or update a resource on the server

1) To make a POST request to an API endpoint, you need to send an HTTP POST request to the server and specify a Content-Type request header that specifies the data media type in the body of the POST request.

2)To send JSON data to a JSON API endpoint, you must include the JSON data in the body of the POST request message and specify the JSON media type with the Content-Type:application/json
  The Accept: application/json header tells the server that the client is expecting JSON.

3)JSON API clients and servers should send requests and responses with the following HTTP header:  
  Content-Type: application/json
  
4)The overhead/ header data is used as an identifier, and its sole purpose is to indicate the source and destination of the information being transmitted.


//Response
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
X-Request-Time: 457 ms

{
	"meta": {
		"status": 201,
	},
	"data": {
	  "@context": [
	    "https://www.w3.org/ns/did/v1",
	    "https://w3id.org/security/suites/ed25519-2020/v1"
	  ]
	  "id": "did:registry.io:entity:0adcea7457d79d3e",
	  "verificationMethod": [{
	    "id": "did:registry.io:entity:0adcea7457d79d3e#signing-key",
	    "type": "Ed25519VerificationKey2020",
	    "publicKeyMultibase": "zEYJrMxWigf9boyeJMTRN4Ern8DJMoCXaLK77pzQmxVjf",
			"privateKeyMultibase": "z4E7Q4neNHwv3pXUNzUjzc6TTYspqn9Aw6vakpRKpbVrCzwKWD4hQDHnxuhfrTaMjnR8BTp9NeUvJiwJoSUM6xHAZ"
	  }]
	}
}


//Error

1) Invalid Identitifier Type

HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
X-Request-Time: 234 ms

{
	"meta": {
		"status": 400,
	},
	"error": {
	  "code": "improper-payload",
	  "message": "An unsupported external identifier type was specified. Please refer to the documentation and specify a valid external identifier type in the request body."
	}
}

2) Missing or Invalid Identitifier Properties

HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
X-Request-Time: 234 ms

{
	"meta": {
		"status": 400,
	},
	"error": {
	  "code": "improper-payload",
	  "message": "The properties for the external identifier were missing or incomplete. Please view the documentation and pass all properties correctly and try again."
	}
}



