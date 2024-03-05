import _ from 'lodash';

const Input = ({
	label,
	required = false,
	errorMsg = {},
	type = 'input',
	name = '',
	...inputProps
}) => {
	const error = _.get(errorMsg, name, '');
	let inputClass =
		'focus:outline-none w-full rounded-md text-gray placeholder-G1-60::placeholder text-base p-3 border border-solid ';
	inputClass += error ? 'border-red-500' : 'border-G1-60';

	return (
		<div className="mb-6">
			{label && (
				<div className="pb-2 font-medium">
					{label} {required && <span className="text-red-500">*</span>}
				</div>
			)}
			<div>
				<input className={inputClass} type={type} name={name} {...inputProps} />
			</div>
			{error && <div className="px-2 pt-1 text-red-500 text-sm">{error}</div>}
		</div>
	);
};

export default Input;
