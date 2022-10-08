// tests/helpers/fixtures.ts
// This file exports a helper function to load fixtures.

import { readFileSync } from 'node:fs'

/**
 * Loads a fixture with the given name from the `tests/fixtures/` folder.
 *
 * @param {string} name - The name of the fixture.
 *
 * @returns {string} The fixture stored in the file.
 */
export const fixture = (name: string): string =>
	readFileSync(`test/fixtures/${name}.json`, 'utf8')
