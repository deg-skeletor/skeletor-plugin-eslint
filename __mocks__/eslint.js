'use strict';

const mockGetFormatter = jest.fn();
const mockExecuteOnFiles = jest.fn();

module.exports = {
	CLIEngine: jest.fn().mockImplementation(() => ({
		getFormatter: mockGetFormatter,
		executeOnFiles: mockExecuteOnFiles
	}))
};