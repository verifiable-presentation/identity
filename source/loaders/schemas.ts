// source/loaders/schemas.ts
// This file defines and registers JSON schemas for each API endpoint.

import type { FastifyInstance } from 'fastify'

import pluginify from 'fastify-plugin'

import { logger } from '../utilities/logger.js'

/**
 * Registers the schemas with the passed server instance.
 *
 * @param server The server instance to register the schemas with.
 */
// @ts-expect-error It's just typescript weirdness.
export const schemas = pluginify(async (server: FastifyInstance) => {
	logger.silly('registering schemas')

	server.addSchema({
		$id: 'dtos',
		type: 'object',
		definitions: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			DidDocumentDto: {
				type: 'object',
				properties: {
					identifier: {
						type: 'object',
						properties: {
							type: { enum: ['email'] },
							properties: { type: 'object' },
						},
						required: ['type', 'properties'],
					},
				},
				required: ['identifier'],
			},
		},
	})

	logger.silly('successfully registered schemas')
})
