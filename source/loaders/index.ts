// source/loaders/index.ts
// This file creates the server and registers schemas, plugins and routes.

import type { FastifyServerOptions, FastifyInstance } from 'fastify'

import { fastify as createServer } from 'fastify'

import { plugins } from './plugins.js'
import { schemas } from './schemas.js'
import { routes } from './routes.js'

/**
 * Creates an instance of a server, and registers schemas, plugins and routes.
 *
 * @param options The options to pass to the server instance.
 * @returns The created server instance.
 */
export const build = (options: FastifyServerOptions): FastifyInstance => {
	// Create the server.
	const server = createServer(options)

	// Load the schemas, middleware, and the routes.
	server.register(schemas)
	server.register(plugins)
	server.register(routes)

	return server
}
