// tests/suites/unit.ts
// The file contains the unit test suite.

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

test('smoke | post /identity | 400 improper-payload [no body]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		// Json.stringify() is used over here to ensure that the empty file is considered as a valid JSON
		payload: JSON.stringify(fixture('no-body')),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the body must be object type.
	t.regex(error?.message, /body must be object/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [no identifier]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('no-identifier'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the no identifier type.
	t.regex(error?.message, /identifier/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [invalid identifier]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('invalid-identifier'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the invalid identifier type.
	t.regex(error?.message, /identifier/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [no type]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('no-type'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the no type type.
	t.regex(error?.message, /type/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [no properties]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('no-properties'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the no properties type.
	t.regex(error?.message, /properties/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [invalid identifier properties]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('invalid-identifier-properties'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the invalid identifier properties type.
	t.regex(error?.message, /identifier\/properties must be object/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [no external identifier]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('no-external-identifier'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the no external identifier type.
	t.regex(
		error?.message,
		/The properties for the external identifier were missing or incomplete/,
	)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 400 improper-payload [invalid identifier properties email]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('invalid-identifier-properties-email'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('improper-payload')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the invalid identifier properties email type.
	t.regex(
		error?.message,
		/The properties for the external identifier were missing or incomplete/,
	)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})

test('smoke | post /identity | 500 server-crash [invalid json]', async (t) => {
	const response = await t.context.server.inject({
		method: 'post',
		url: '/identity',
		payload: fixture('invalid-json'),
		headers: { 'content-type': 'application/json' },
	})

	const { meta, error, data } = json.parse(response.payload)
	const expectedError = new ServerError('server-crash')

	// Check that the request failed with the expected HTTP status code and
	// error code.
	t.is(meta?.status, expectedError.status)
	t.is(error?.code, expectedError.code)
	// Check that the message is related to the invalid identifier properties email type.
	t.regex(error?.message, /An unexpected error occurred/)
	// Check that only the `error` and `meta` fields were returned.
	t.is(data, undefined)
})
