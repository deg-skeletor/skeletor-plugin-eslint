const path = require('path');
const {CLIEngine} = require('eslint');

const cliDefaults = {
	fix: true,
	cache: true
};
const pluginDefaults = {
	formatter: 'codeframe',
	source: []
};
const statuses = {
	error: 'error',
	complete: 'complete'
};
const messages = {
	noSourceFiles: 'No source files found.'
};

const run = (config, {logger, source}) => {
	const settings = getSettings(config);
	const sourceFiles = getSourceFiles(source, settings.source);
	if (sourceFiles.length === 0) {
		logger.error(messages.noSourceFiles);
		return Promise.resolve({
			status: statuses.error,
			message: messages.noSourceFiles
		});
	}
	const cli = initCli(settings);
	const formatter = initFormatter(cli, settings.formatter);
	const report = getLintingReport(cli, sourceFiles);

	return Promise.resolve(reportHasErrors(report) ?
		handleReportErrors(formatter, logger, report) :
		handleReportNoErrors());
};

const getSettings = (config = {}) => ({
	...cliDefaults,
	...pluginDefaults,
	...config
});

const initCli = settings => new CLIEngine(filterObjectProps(settings, Object.keys(pluginDefaults)));

const initFormatter = (cli, formatter) => cli.getFormatter(formatter);

const getLintingReport = (cli, sourceFiles) => cli.executeOnFiles(sourceFiles);

const reportHasErrors = (report = null) => report && report.errorCount && report.errorCount > 0;

const handleReportErrors = (formatter, logger, report) => {
	logger.log(formatter(report.results));
	return {
		status: statuses.error
	};
};

const handleReportNoErrors = () => ({
	status: statuses.complete
});

const getSourceFiles = (source = null, sourceFiles = []) => {
	const sourcePathToUse = source && source.filepath ? source.filepath : sourceFiles;
	return ensureArray(sourcePathToUse).map(singlePath => path.resolve(process.cwd(), singlePath));
};

const ensureArray = obj => Array.isArray(obj) === false ? [obj] : obj;

const filterObjectProps = (obj, propsToRemove = [], returnKept = true) => {
	propsToRemove = ensureArray(propsToRemove);
	return propsToRemove.reduce((reducedObj, propToRemove) => {
		const {
			[propToRemove]: removedProps,
			...keptProps
		} = reducedObj;
		return returnKept === true ? keptProps : removedProps;
	}, obj);
};

module.exports = skeletorEslint = () => ({
    run
});