// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Input } from '../../';


export default class RadioButton extends Component {
	static propTypes = {
		checked: PropTypes.bool,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		isInline: PropTypes.bool,
		name: PropTypes.string.isRequired,
		onClick: PropTypes.func,
		preventClick: PropTypes.bool,
		text: PropTypes.string,
		title: PropTypes.string,
		value: PropTypes.string
	};

	handleClick(event) {
		const { preventClick, onClick } = this.props;
		if (preventClick) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		if (onClick) {
			onClick();
		}
	}

	render(){
		const { disabled, checked, className, isInline, text, title, name, value, ...props } = this.props;

		let extraProps = { checked, disabled, ...props };
		if (title && !disabled) {
			extraProps.title = title;
		}

		const radioButtonClasses = classNames('custom-radiobtn', {
			'custom-radiobtn--inline': isInline
		}, className);

		return (
			<div className={radioButtonClasses}>
				<label className="custom-radiobtn__label">
					<Input className="custom-radiobtn__input" {...extraProps} type="radio" name={name} value={value} onClick={(event) => this.handleClick(event)}/>
					<span className="custom-radiobtn__icon"/>
					<span className="custom-radiobtn__text">{text}</span>
				</label>
			</div>
		);
	}
}
