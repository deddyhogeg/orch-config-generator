// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './Checkbox.scss';

export default class Checkbox extends Component {
	static propTypes = {
		checked: PropTypes.bool,
		disabled: PropTypes.bool,
		onClick: PropTypes.func,
		text: PropTypes.string,
		title: PropTypes.string,
		transparent: PropTypes.bool
	};

	render(){
		const { disabled, checked, text, title, className, transparent, ...props } = this.props;

		let extraProps = { checked, disabled, ...props };
		if (title && !disabled){
			extraProps.title = title;
		}

		const classNames = classnames('custom-checkbox', className);
		const checkboxClasses = classnames('custom-checkbox__icon app-icon app-icon--form-checkbox-mark', {
			[style.transparent]: transparent
		});

		return (
			<div className={classNames}>
				<label className="custom-checkbox__label">
					<input className="custom-checkbox__input" {...extraProps} type="checkbox"/>
					<span className={checkboxClasses}>
						<svg className="app-icon__svg">
							<use href="#form-checkbox-mark"/>
						</svg>
					</span>
					<span className="custom-checkbox__text">{text}</span>
				</label>
			</div>
		);
	}
}
