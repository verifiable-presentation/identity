// source/utilities/config.ts
// This file contains code that reads environment variables, defines a
// configuration object with those values, and then exports it.

import { env } from 'node:process'

const serverEnvironment = env.NODE_ENV?.toLowerCase() ?? 'dev'
const localPort = env.PORT ?? '56482'
const serverDomain = env.DOMAIN ?? `localhost:${localPort}`

export const config = {
	// The current environment in which the server is running.
	environment: serverEnvironment.startsWith('prod')
		? 'production'
		: serverEnvironment.startsWith('test')
		? 'testing'
		: 'development',
	// The port to bind the server to.
	port: parseInt(localPort, 10),
	// The domain issuing the DID documents.
	domain: encodeURIComponent(serverDomain),
}
