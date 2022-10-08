// source/utilities/errors.ts
// We (kind of) <3 errors (/^▿^)/

/**
 * A list of errors we can return.
 */
export const errors = {
	// Error to return when the request body contained invalid data.
	'improper-payload': {
		message: `The request body did not contain valid data needed to perform the operation.`,
		status: 400,
	},

	// Error to return when the requested entity was not found.
	'entity-not-found': {
		message: `The requested entity was not found.`,
		status: 404,
	},

	// Error to return when the route requested by the user doesn't exist.
	'route-not-found': {
		message: `The requested route was not found. Take a look at the documentation for a list of valid endpoints.`,
		status: 404,
	},

	// Error to return when an entity with the same value in a unique field exists.
	'entity-already-exists': {
		message: `An entity with the same ID already exists.`,
		status: 409,
	},

	// Error to return when the user tries to do something that requires certain
	// conditions to be met, and those conditions have not been met.
	'precondition-failed': {
		message: `To perform this action, certain preconditions need to be met. Unfortunately, one or more of these conditions have not been met. Please try again after these preconditions have been met.`,
		status: 412,
	},

	// Error to return when an error occurs while talking to the database/auth service.
	'backend-error': {
		message: `An unexpected error occurred while processing your request. Please try again in a few seconds or report this issue.`,
		status: 500,
	},

	// Error to return when the server crashes.
	'server-crash': {
		message: `An unexpected error occurred. Please try again in a few seconds or report this issue.`,
		status: 500,
	},
}

/**
 * A custom error class with additional information to return to the client.
 */
export class ServerError extends Error {
	// The error code and HTTP status code to return.
	code: string
	status: number

	/**
	 * Creates a new server error.
	 *
	 * @param {string} code - The error 'code'.
	 * @param {string?} message - A detailed error message, explaining why the error occurred and a possible fix.
	 * @param {number?} status - The corresponding HTTP status code to return.
	 */
	constructor(code: keyof typeof errors, message?: string, status?: number) {
		super(message ?? errors[code].message)

		this.code = code
		this.status = status ?? errors[code].status
		this.message = message ?? errors[code].message
	}

	/**
	 * Convert the error to a JSON object so it can be sent as a HTTP response.
	 */
	send() {
		return {
			meta: {
				status: this.status,
			},
			error: {
				code: this.code,
				message: this.message,
			},
		}
	}
}
