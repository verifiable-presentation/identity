// source/services/identity.ts
// This file contains functions related to identity creation.

import { createHash } from 'node:crypto'

// @ts-expect-error No type definitions
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020'

import { config } from '../utilities/config.js'
import { ServerError } from '../utilities/errors.js'
import {
	type ExternalIdentifier,
	type AssertionOrVerificationMethod,
	type DidDocument,
	ExternalIdentifierType,
	KeyType,
} from '../types/api.js'

/**
 * A function that generates the verification and assertion methods for the
 * given external identifier.
 *
 * @param identifier The external identifier passed by the entity.
 * @returns The assertion or verification methods.
 */
export const generateKeys = async (
	identifier: ExternalIdentifier,
): Promise<Omit<AssertionOrVerificationMethod, 'id'>> => {
	// If the external identifier used is an email ID, generate an ED25519
	// verification key pair and return it as the verification and assertion
	// method for the entity.
	if (identifier.type === ExternalIdentifierType.email) {
		const keyData = await Ed25519VerificationKey2020.generate()
		const keyPair = keyData.export({ publicKey: true, privateKey: true })

		return {
			type: KeyType.Ed25519VerificationKey2020,
			publicKeyMultibase: keyPair.publicKeyMultibase,
			privateKeyMultibase: keyPair.privateKeyMultibase,
		}
	}

	// If the type of identifier is not yet supported, throw an error.
	throw new ServerError(
		'improper-payload',
		'An unsupported external identifier type was specified. Please refer to the documentation and specify a valid external identifier type in the request body.',
	)
}

/**
 * A function that creates a DID document, given an external identifier.
 *
 * @param identifier The external identifier passed to the API.
 * @returns A DID document for the entity.
 */
export const createDidDocument = async (
	identifier: ExternalIdentifier,
): Promise<DidDocument> => {
	// Handle each type of identifier separately.
	if (identifier.type === ExternalIdentifierType.email) {
		// Check that the entity passed their email address in the request.
		if (typeof identifier.properties.email !== 'string') {
			throw new ServerError(
				'improper-payload',
				'The properties for the external identifier were missing or incomplete. Please view the documentation and pass all properties correctly and try again.',
			)
		}

		// Give the entity a unique ID, based on the their email address.
		const did = createHash('sha256')
			.update(identifier.properties.email)
			.digest('hex')
			.slice(0, 16)

		// Generate a verification and assertion method for the entity.
		const keyPair = await generateKeys(identifier)
		const method = {
			id: `did:web:${config.domain}:entity:${did}#signing-key`,
			...keyPair,
		}

		return {
			// The schema this JSON-LD document follows.
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'@context': [
				'https://www.w3.org/ns/did/v1',
				'https://w3id.org/security/suites/ed25519-2020/v1',
			],

			// The DID for the subject.
			id: `did:web:${config.domain}:entity:${did}`,

			// The keys used by the entity to sign a credential/presentation.
			verificationMethod: [method],
			assertionMethod: [method],
		}
	}

	// If the type of identifier is not yet supported, throw an error.
	throw new ServerError(
		'improper-payload',
		'An unsupported external identifier type was specified. Please refer to the documentation and specify a valid external identifier type in the request body.',
	)
}
