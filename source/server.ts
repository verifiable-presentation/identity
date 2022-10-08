// source/server.ts
// This file is the entrypoint of the program. It contains code that reads
// configuration, builds the server and subsequently binds it to the given
// port.

import { build } from './loaders/index.js'
import { config } from './utilities/config.js'
import { logger } from './utilities/logger.js'

// Create the server, and pass to it the custom pino logger used throughout
// the code.
const server = build({
	logger,
	disableRequestLogging: true,
})
// Bind the server to the port specified in the configuration.
await server.listen({ port: config.port, host: '::' })

// To infinity and beyond!
logger.info('server ready to receive requests on port %s', config.port)
