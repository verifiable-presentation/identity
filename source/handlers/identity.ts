// source/handlers/identity.ts
// This file defines and exports controllers for the `/identity` routes.

import type { FastifyRequest, FastifyReply } from 'fastify'
import type { DidDocumentDto } from '../types/api.js'

import { logger } from '../utilities/logger.js'
import { createDidDocument } from '../services/identity.js'

/**
 * Store a template in the database.
 */
export const create = async (request: FastifyRequest, reply: FastifyReply) => {
	const payload = request.body as DidDocumentDto
	const externalIdentifier = payload.identifier

	const didDocument = await createDidDocument(externalIdentifier)

	logger.silly('succesfully created did document with id %s', didDocument.id)

	reply.code(201)
	return {
		meta: { status: 201 },
		data: didDocument,
	}
}
