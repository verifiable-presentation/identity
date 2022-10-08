// tests/suites/smoker.ts
// The file contains the smoke test suite.

import type { FastifyInstance } from 'fastify'
import type { TestFn } from 'ava'

// eslint-disable-next-line ava/use-test
import ava from 'ava'

import { fixture } from '../helpers/fixtures.js'

import { build } from '../../source/loaders/index.js'
import { ServerError } from '../../source/utilities/errors.js'

type ServerContext = {
	server: FastifyInstance
}

const test = ava as TestFn<ServerContext>
const json = JSON

// Create the server before running the tests.
test.before(async (t) => {
	t.context.server = build({ disableRequestLogging: true })
})

test('smoke | get /blah | 404 route-not-found', async (t) => {
	const response = await t.context.server.inject({
		method: 'get',
		url: '/blah',
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('route-not-found')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the route not existing.
	t.regex(error?.message, /route was not found/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [invalid identifier type]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('invalid-identifier-type'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the invalid type.
	t.regex(error?.message, /identifier\/type/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 201 created', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('valid-identifier'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)

	// Check that the operation was completed successfully.
	t.is(meta?.status, 201)
	t.is(error, undefined)

	// Check the structure of the returned DID document.
	t.true(Array.isArray(data['@context']))
	t.true(typeof data.id === 'string')
	t.true(Array.isArray(data.verificationMethod))
	t.true(Array.isArray(data.assertionMethod))
})
