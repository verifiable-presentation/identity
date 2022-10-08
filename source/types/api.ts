// source/types/api.d.ts
// The type definitions for the project.

/**
 * The types of external identifiers that can be used to create a DID document.
 */
export enum ExternalIdentifierType {
	email = 'email',
}

/**
 * An external identifer that could be used to create a DID document.
 */
export type ExternalIdentifier = {
	type: ExternalIdentifierType
	properties: {
		email: string
	}
}

/**
 * The types of keys that can be used as a verification method.
 */
export enum KeyType {
	Ed25519VerificationKey2020 = 'Ed25519VerificationKey2020',
}

/**
 * A verification/assertion method used by an entity to sign a credential/presentation.
 */
export type AssertionOrVerificationMethod = {
	id: string
	type: KeyType
	publicKeyMultibase: string
	privateKeyMultibase: string
}

/**
 * A DID document.
 */
export type DidDocument = {
	'@context': string[] // The schema the JSON-LD document follows.
	id: string // The DID for the subject.

	// The keys used by the entity to sign a credential/presentation.
	verificationMethod?: AssertionOrVerificationMethod[]
	assertionMethod?: AssertionOrVerificationMethod[]
}

/**
 * The request payload needed to create a DID document.
 */
export type DidDocumentDto = {
	// The external identifier, based on which to create a DID document.
	identifier: ExternalIdentifier
}
