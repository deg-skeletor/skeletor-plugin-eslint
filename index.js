const CLIEngine = require('eslint').CLIEngine;
const path = require('path');

const cli = new CLIEngine({
    configPath: path.resolve(process.cwd(), '.eslintrc.json'),
    fix: false
});

const run = (config, {logger}) => {
	const formatter = cli.getFormatter('codeframe');
	const report = cli.executeOnFiles([path.resolve(process.cwd(), 'source/js/main.js')]);
	console.log(formatter(report.results));
	return Promise.resolve({
		status: 'complete',
		message: 'Eslint task complete'
	});
};

module.exports = skeletorEslint = () => ({
    run
});