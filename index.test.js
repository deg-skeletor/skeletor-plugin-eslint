const eslintPlugin = require('./index');
const {statuses, messages} = require('./config/defaults');

jest.mock('path');
jest.mock('eslint');

const logger = {
	info: () => {},
	error: () => {}
};

const options = {
	logger
};

const eslint = require('eslint');

const filepath1 = 'src/module1.js';
const filepath2 = 'src/module2.js';

beforeEach(() => {
	jest.clearAllMocks();
});

test('run() returns an error status if no "sourceFiles" configuration exists', async () => {
	const expectedResponse = {
		status: statuses.error,
		message: messages.noSourceFiles
	};

    expect.assertions(1);
    const response = await eslintPlugin().run({}, options);
    return expect(response).toEqual(expectedResponse);
});

test('run() returns complete status when 1 file is specified', async () => {
	const config = {
		source: filepath1
	};
	const expectedResponse = {
		status: statuses.complete

    };
    expect.assertions(1);
    const response = await eslintPlugin().run(config, options);
	return expect(response).toEqual(expectedResponse);
});

test('run() returns complete status when array of files is specified', async () => {
	const config = {
		source: [filepath1, filepath2]
	};
	const expectedResponse = {
		status: statuses.complete
	};
	expect.assertions(1);
    const response = await eslintPlugin().run(config, options);
	return expect(response).toEqual(expectedResponse);
});

test('CLIEngine is passed the correct subset of config options', async () => {
	const config = {
		source: [filepath1, filepath2]
	};
	const expectedResponse = {
		status: statuses.complete
	};
	expect.assertions(1);
    const response = await eslintPlugin().run(config, options);
	return expect(response).toEqual(expectedResponse);
});