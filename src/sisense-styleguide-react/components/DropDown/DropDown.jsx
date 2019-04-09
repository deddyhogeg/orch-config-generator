// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class DropDown extends Component{
	static propTypes = {
		className: PropTypes.string,
        items: PropTypes.array
	};

	renderOptions = () => {
		let { items } = this.props;
		return (
			<React.Fragment>
                {items.map(item => {
                    return <option key={item} value={item}>{item}</option>
                })}
			</React.Fragment>
		)
	}

	handleRef = (input) => { this.nameInput = input; };

	render(){
		const { className, ...props } = this.props;
		const selectClass = {
			height: '27px',
			textTransform: 'capitalize'
		};
		const classNames = classnames('custom-input', className);
		return (
			<select style={selectClass} className={classNames} ref={this.handleRef} {...props} >
				{this.renderOptions()}
			</select>
		);
	}
}
