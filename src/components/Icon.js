import iconCollection from 'resources/icons';

/**
 * change style:
 *  - color: color
 *  - font size: fontSize
 *  - font weight: strokeWidth (path in svg has to stroke property)
 *
 * <Icon type="" style={{ }} />
 */

const Icon = ({ type, ...props }) => {
	const SvgIcon = iconCollection[type];
	const { className, style, ...rest } = props;

	return (
		<span className={className} style={{ display: 'inline-block', ...style }} {...rest}>
			{SvgIcon ? <SvgIcon /> : <span />}
		</span>
	);
};

export default Icon;
