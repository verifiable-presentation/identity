## Identity API

This API is used to generate and
[decentralized identity documents](https://www.w3.org/TR/did-core/#dfn-did-documents)
for all entities that are stored in a
[`registry`](https://github.com/verifiable-presentation/registry).

These documents contain the ID of the entity they describe, as well as the
[assertion or verification methods](https://www.w3.org/TR/did-core/#dfn-verification-method)
used by the entity to sign and verify
[credentials](https://www.w3.org/TR/vc-data-model/#dfn-credential) or
[presentations](https://www.w3.org/TR/vc-data-model/#dfn-verifiable-presentations)
(respectively) generated or issued by them.

An example document is given below:

```json
{
	// The schema this JSON-LD document follows.
	"@context": [
		"https://www.w3.org/ns/did/v1",
		"https://w3id.org/security/suites/ed25519-2020/v1"
	],

	// The DID for the subject. Here, the subject of the document is an entity
	// with the ID 0adcea7457d79d3e.
	"id": "did:web:registry.io:entity:0adcea7457d79d3e",

	// The keys used by the entity to sign a credential/presentation.
	"verificationMethod": [
		{
			"id": "did:web:registry.io:entity:0adcea7457d79d3e#signing-key",
			"type": "Ed25519VerificationKey2020",
			"publicKeyMultibase": "zEYJrMxWigf9boyeJMTRN4Ern8DJMoCXaLK77pzQmxVjf",
			"privateKeyMultibase": "z4E7Q4neNHwv3pXUNzUjzc6TTYspqn9Aw6vakpRKpbVrCzwKWD4hQDHnxuhfrTaMjnR8BTp9NeUvJiwJoSUM6xHAZ"
		}
	]
}
```

To create such a document, an entity must provide an external identifier (such
as their email address or phone number) to the [Identity API](docs/api.md),
which will then return a DID document similar to the one above.

Once you receive the document, you must store it securely - you will need it to
issue/sign [credentials](https://www.w3.org/TR/vc-data-model/#dfn-credential) or
[presentations](https://www.w3.org/TR/vc-data-model/#dfn-verifiable-presentations) -
and also store it (**without the private key fields**) in a
[`registry`](https://github.com/verifiable-presentation/registry), so that
others can verify
[credentials](https://www.w3.org/TR/vc-data-model/#dfn-credential) or
[presentations](https://www.w3.org/TR/vc-data-model/#dfn-verifiable-presentations)
signed with your public key.
