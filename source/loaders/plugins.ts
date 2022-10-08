// source/loaders/plugins.ts
// This file defines and registers all the plugins for the server.

import type {
	FastifyRequest,
	FastifyReply,
	FastifyInstance,
	HookHandlerDoneFunction,
	FastifyError,
} from 'fastify'

import pluginify from 'fastify-plugin'
import { parse } from 'stacktrace-parser'

import { logger } from '../utilities/logger.js'
import { ServerError } from '../utilities/errors.js'

/**
 * Registers plugins with the passed server instance.
 *
 * @param server The server instance to register the plugins with.
 */
// @ts-expect-error It's just typescript weirdness.
export const plugins = pluginify(async (server: FastifyInstance) => {
	// Log the request as it comes.
	server.addHook(
		'onRequest',
		(request: FastifyRequest, _reply, done: HookHandlerDoneFunction) => {
			logger.http(
				'received request from %s - %s %s',
				request.ip,
				request.method.toLowerCase(),
				request.url,
			)
			done()
		},
	)
	// Log the response's status code and response time.
	server.addHook(
		'onResponse',
		(_request, reply: FastifyReply, done: HookHandlerDoneFunction) => {
			logger.http(
				'sent response %s in %s ms',
				reply.statusCode,
				reply.getResponseTime().toFixed(3),
			)

			reply.header('X-Response-Time', reply.getResponseTime().toFixed(3))

			done()
		},
	)

	// Handle not found errors.
	server.setNotFoundHandler((_request, _reply) => {
		throw new ServerError('route-not-found')
	})
	// Handle server errors.
	server.setErrorHandler(
		(
			caughtError: Error | ServerError | FastifyError,
			_request,
			reply: FastifyReply,
		) => {
			if (caughtError instanceof ServerError) {
				// If it is a server error, just forward it onward to the user.
				logger.http('sending error %s %s', caughtError.status, caughtError.code)
				reply.code(caughtError.status).send(caughtError.send())
			} else if ((caughtError as FastifyError).validation) {
				const validationError = (caughtError as FastifyError).validation?.at(0)
				// If it is a validation error, parse the error and send it as a
				// 400 improper-payload error.
				logger.http(validationError, 'validation error occurred')

				// Get a comprehensible message.
				const message = `An error occurred while validating your request: ${caughtError.message}`
				const values = validationError?.params?.allowedValues as
					| string[]
					| undefined
				/* c8 ignore start */
				const addendum =
					typeof values === 'undefined' ? '' : ` (${values?.join(', ')})`
				/* c8 ignore end */
				const error = new ServerError('improper-payload', message + addendum)

				// Then send the error.
				reply.code(error.status).send(error.send())
			} else {
				// Otherwise, return a 500 to the user and print out neat diagnostic
				// information as to what the error was and where it occurred.
				const stack = parse(caughtError.stack!)[0]
				// Make the filename relative.
				if (stack?.file)
					stack.file = stack.file.replace(/^.*\/source/g, './source')

				// Then print the error and send back a 500 server-crash error.
				logger.error(
					caughtError,
					`caught server error: '${caughtError.message}'`,
					stack?.file
						? `in ${stack.file}:${stack.lineNumber}:${stack.column}`
						: '',
				)

				const error = new ServerError('server-crash')
				reply.code(error.status).send(error.send())
			}
		},
	)
})
