## Identity API

This document contains the API specification for the Identity API.

#### POST `/identity`

> Creates a DID document based on an external identifier provided by the entity.
> The following external identifiers are currently supported:
>
> - Email address

##### Request

| Field                   | Type     | Required | Description                                                                            |
| ----------------------- | -------- | -------- | -------------------------------------------------------------------------------------- |
| `identifier.type`       | `enum`   | `true`   | The type of external identifier being used to create a DID document. Could be `email`. |
| `identifier.properties` | `object` | `true`   | The external identifier itself. Could be `{ "email": "..." }`.                         |

For example, a student creating a DID using their school-issued email address
could make the following request:

```http
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
```

##### Response

```http
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
```

##### Errors

**Invalid Identitifier Type**

```http
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
```

**Missing or Invalid Identitifier Properties**

```http
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
```
