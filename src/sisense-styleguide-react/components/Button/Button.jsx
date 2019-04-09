// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon';

// Used since in sisense-styleguide repo, there is a new line between the icon span and the text span
// The browser shows this new line as a space between the button spans and the text, so we are doing it as well until the styleguide will be changed
const SPACE = ' ';

export default class Button extends Component {
	static propTypes = {
		allowDisabledTitle: PropTypes.bool,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		hoverSuffix: PropTypes.string,
		iconClassName: PropTypes.string,
		iconName: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		text: PropTypes.string,
		title: PropTypes.string,
		transparent: PropTypes.bool,
	};

	static defaultProps = {
		allowDisabledTitle: false
	};

	render(){
		const { allowDisabledTitle, className, disabled, hoverSuffix,
			iconClassName, iconName, transparent, text, title, ...props } = this.props,
			buttonClass = classNames('btn', { 'btn--disabled': disabled, 'btn--transp': transparent }, className),
			iconClass = classNames('btn__icon', iconClassName);

		const iconComponent = iconName && (
			<Icon className={iconClass} name={iconName} disabled={disabled} hoverSuffix={hoverSuffix} />
		),
			textComponent = text && (
				<span className={'btn__text'}>
					{ text }
				</span>
			),
			spaceComponent = iconComponent && textComponent && (
				SPACE
			);

		const extraProps = { disabled, ...props };
		if (title && (!disabled || allowDisabledTitle)){
			extraProps.title = title;
		}

		return (
			<button {...extraProps} className={buttonClass}>
				{ iconComponent }{ spaceComponent }{ textComponent }
			</button>
		);
	}
}
