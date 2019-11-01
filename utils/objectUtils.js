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

const ensureArray = obj => Array.isArray(obj) === false ? [obj] : obj;

module.exports = {
    filterObjectProps,
    ensureArray
};