// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './Icon.scss';

export default class Icon extends Component {
	static propTypes = {
		className: PropTypes.string,
		disabled: PropTypes.bool,
		hoverSuffix: PropTypes.string,
		name: PropTypes.string.isRequired,
		onClick: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		spin: PropTypes.bool,
		title: PropTypes.string
	};

	state: { hovered: boolean }
	state = { hovered: false };

	handleMouseEnter = () => {
		if (!this.state.hovered){
			this.setState({ hovered: true });
		}

		if (this.props.onMouseEnter) {
			this.props.onMouseEnter();
		}
	}

	handleMouseLeave = () => {
		if (this.state.hovered){
			this.setState({ hovered: false });
		}

		if (this.props.onMouseLeave) {
			this.props.onMouseLeave();
		}
	}

	render() {
		const iconStyle = {
			top: 'auto'
		};
		const { className, disabled, name, hoverSuffix, onClick, onMouseEnter, onMouseLeave, spin, title, ...props } = this.props,
			iconName = (!disabled && this.state.hovered && hoverSuffix) ? `${name}${hoverSuffix}` : name,
			iconClassName = classnames('app-icon', `app-icon--${iconName}`),
			svgClassName = classnames('app-icon__svg');
		// classnames
		const iconClass = classnames(iconClassName, className, {
			[style.spin]: spin, [style.noSpin]: !spin
		});

		let extraProps = { disabled, onClick, ...props };
		if (title && !disabled){
			extraProps.title = title;
		}

		return (
			<span {...extraProps} className={iconClass} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
				<svg className={svgClassName} style={iconStyle}>
					<use xlinkHref={`#${iconName}`} />
				</svg>
			</span>
		);
	}
}
