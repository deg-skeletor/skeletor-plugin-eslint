'use strict';

const path = jest.genMockFromModule('path');

const resolve = (dir, filepath) => filepath;

const dirname = () => 'dest';

path.resolve = resolve;
path.dirname = dirname;

module.exports = path;