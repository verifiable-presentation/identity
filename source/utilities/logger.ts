// source/utilities/logger.ts
// The code in this file defines and exports a custom `pino` logger.

import type { LoggerOptions } from 'pino'
import createLogger from 'pino'

import { config } from './config.js'

// The configuration for the logger.
const options: LoggerOptions = {
	// Each level is assigned a number, which is included in the JSON log output
	// but not in the prettified log output. A lower level equals lower
	// importance.
	customLevels: {
		silly: 40,
		info: 50,
		http: 60,
		warn: 70,
		error: 80,
		fatal: 90,
	},
	// Since we want to log the prettified output to the console only, we add a
	// transport to do that for us.
	transport: {
		target: 'pino-pretty',
		options: {
			translateTime: 'SYS:yy-mm-dd HH:MM:ss.l',
			ignore: 'pid,hostname', // Do not include the PID and hostname while logging.
			customLevels: 'silly:40,info:50,http:60,warn:70,error:80,fatal:90',
			customColors:
				'silly:magenta,info:green,http:blue,warn:yellow,error:red,fatal:red',
		},
	},
	level: 'info', // By default, do not hide silly logs
	useOnlyCustomLevels: true,
}

if (config.environment === 'testing') options.level = 'error' // Log only errors in a test environment.
if (config.environment === 'development') options.level = 'silly' // Log everything in a dev environment.

// Export the logger.
export const logger = createLogger(options)
