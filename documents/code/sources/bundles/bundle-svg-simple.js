/**
 * This is a simple example for creating icon bundles for Iconify SVG Framework.
 *
 * It bundles only icons from Iconify icon sets.
 * For bundling custom icons see other code examples in documentation.
 *
 * This example loads data using Iconify.addCollection function, so bundle must be included after Iconify SVG framework.
 */
const fs = require('fs');

// Installation: npm install --save-dev @iconify/json-tools @iconify/json
const { Collection } = require('@iconify/json-tools');

// File to save bundle to
const target = __dirname + '/assets/icons-bundle.js';

// Icons to bundle, array
let icons = [
	'mdi:home',
	'mdi:account',
	'mdi:login',
	'mdi:logout',
	'openmoji:birthday-cake',
	'openmoji:clinking-glasses',
];

// Organize icons by prefix
icons = organizeIconsList(icons);

// Load icons data
let output = '';
Object.keys(icons).forEach((prefix) => {
	const iconsList = icons[prefix];

	// Load icon set
	const collection = new Collection(prefix);
	if (!collection.loadIconifyCollection(prefix)) {
		throw new Error(
			`Icons with prefix "${prefix}" do not exist in Iconify. Update @iconify/json?`
		);
	}

	// Make sure all icons exist
	iconsList.forEach((name) => {
		if (!collection.iconExists(name)) {
			// Uncomment next line to throw error if an icon does not exist
			// throw new Error(`Could not find icon: "${prefix}:${name}"`);
			console.error(`Could not find icon: "${prefix}:${name}"`);
		}
	});

	// Get data for all icons as string
	output += collection.scriptify({
		icons: iconsList,
		callback: 'Iconify.addCollection',
		optimize: true,
	});
});

// Save to file
fs.writeFileSync(target, output, 'utf8');

console.log(`Saved ${target} (${output.length} bytes)`);

/**
 * Organize icons list by prefix
 *
 * Result is an object, where key is prefix, value is array of icon names
 */
function organizeIconsList(icons) {
	const results = Object.create(null);

	icons.forEach((str) => {
		// Split icon to prefix and name
		const icon = stringToIcon(str);
		if (icon === null || icon.provider !== '') {
			// Invalid name or icon name has provider.
			// All icons in this example are from Iconify, so providers are not supported.
			throw new Error(`Invalid icon name: ${str}`);
		}

		const prefix = icon.prefix;
		const name = icon.name;

		// Add icon to results
		if (results[prefix] === void 0) {
			results[prefix] = [name];
			return;
		}
		if (results[prefix].indexOf(name) === -1) {
			results[prefix].push(name);
		}
	});

	return results;
}

/**
 * Convert icon name from string to object.
 *
 * Object properties:
 * - provider (ignored in this example)
 * - prefix
 * - name
 *
 * This function was copied from @iconify/core/src/icon/name.ts
 * See https://github.com/iconify/iconify/blob/master/packages/core/src/icon/name.ts
 */
function stringToIcon(value) {
	let provider = '';
	const colonSeparated = value.split(':');

	// Check for provider with correct '@' at start
	if (value.slice(0, 1) === '@') {
		// First part is provider
		if (colonSeparated.length < 2 || colonSeparated.length > 3) {
			// "@provider:prefix:name" or "@provider:prefix-name"
			return null;
		}
		provider = colonSeparated.shift().slice(1);
	}

	// Check split by colon: "prefix:name", "provider:prefix:name"
	if (colonSeparated.length > 3 || !colonSeparated.length) {
		return null;
	}
	if (colonSeparated.length > 1) {
		// "prefix:name"
		const name = colonSeparated.pop();
		const prefix = colonSeparated.pop();
		return {
			// Allow provider without '@': "provider:prefix:name"
			provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
			prefix,
			name,
		};
	}

	// Attempt to split by dash: "prefix-name"
	const dashSeparated = colonSeparated[0].split('-');
	if (dashSeparated.length > 1) {
		return {
			provider: provider,
			prefix: dashSeparated.shift(),
			name: dashSeparated.join('-'),
		};
	}

	return null;
}
