// @flow
import React from 'react';
import classnames from 'classnames';

type Props = {
	checked: boolean,
	className: string,
	disabled: boolean,
	inline: boolean,
	onChange: (...any) => any,
	text: string,
	title: string,
};

export default function ToggleButton(props: Props) {
	const { className,
			disabled,
			inline,
			text,
			title,
			...otherProps
		} = props;

	const extraProps = { disabled, ...otherProps };
	if (title && !disabled){
		extraProps.title = title;
	}
	
	const cssPrefix = 'custom-togglebtn';

	const containerClass = classnames(cssPrefix, {
			[`${cssPrefix}--inline`]: inline
		}, className),
		checkboxClass = `${cssPrefix}__icon`;

	return (
		<div className={containerClass}>
			<label className={`${cssPrefix}__label`}>
				<input type={'checkbox'} className={`${cssPrefix}__input`} {...extraProps}/>
				<span className={checkboxClass}/>
				<span className={`${cssPrefix}__text`}>
					{ text }
				</span>
			</label>
		</div>
	);
}
