// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Input extends Component{
	static propTypes = {
		autoFocus: PropTypes.bool,
		className: PropTypes.string,
		spellCheck: PropTypes.bool
	};

	static defaultProps = {
		spellCheck: false
	};

	componentDidMount(){
		if (this.props.autoFocus){
			this.focus(true);
		}
	}

	focus = (selectText: boolean = false) => {
		this.nameInput.focus();
		if (selectText){
			this.nameInput.select();
		}
	}

	handleRef = (input) => { this.nameInput = input; };

	render(){
		const { className, spellCheck, ...props } = this.props;
		const classNames = classnames('custom-input', className);
		return (
			<input className={classNames} ref={this.handleRef} spellCheck={spellCheck} {...props} />
		);
	}
}
