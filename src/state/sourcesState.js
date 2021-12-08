const { getVariableName } = require('./utils')

const stateDefinition = {
	longname: {
		label: 'Long Name',
		defaultValue: '',
		feedback: 'sourceLongName',
		getVariableName: getVariableName.bind(null, 'input'),
	},
}

const getVariables = ({ sources = [] }) => {
	let variables = []

	variables = sources.flatMap((source, index) =>
		Object.keys(stateDefinition)
			.map((name) => ({ name, ...stateDefinition[name] }))
			.filter((key) => typeof key.getVariableName === 'function')
			.map(({ name, getVariableName, label, defaultValue }) => ({
				name: getVariableName(index + 1, name,),
				label: `Input ${index + 1} ${label}`,
				defaultValue,
			}))
	)

	return variables
}

const getVariableUpdates = () => []
const getFeedbackUpdates = () => []

module.exports = {
	getVariables,
	getVariableUpdates,
	getFeedbackUpdates,
}
