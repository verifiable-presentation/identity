A student creating a DID using their school-issued email address could make the following request:

POST /identity HTTP/1.1

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




POST   :  The HTTP POST request method sends data to the server. For CRUD operations, the HTTP POST method is used to create or update a resource on the server

1) To make a POST request to an API endpoint, you need to send an HTTP POST request to the server and specify a Content-Type request header that specifies the data media type in the body of the POST request.

2)To send JSON data to a JSON API endpoint, you must include the JSON data in the body of the POST request message and specify the JSON media type with the Content-Type:application/json
  The Accept: application/json header tells the server that the client is expecting JSON.

3)JSON API clients and servers should send requests and responses with the following HTTP header:  
  Content-Type: application/json
  
4)The overhead/ header data is used as an identifier, and its sole purpose is to indicate the source and destination of the information being transmitted.
