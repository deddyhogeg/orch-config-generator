// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '../..'

export default class Search extends Component{

	render(){
		return (
			<div className="search-form">
				<form className="search-form__form">
					<div className="search-form__field">
						<input className="search-form__field-input" type="text" placeholder="Search" />
					</div>
					<div className="search-form__controls">
						<button className="search-form__btn search-form__btn--submit btn btn--icon btn--transp">
							<Icon name="general-search-small"/>
						</button>
						<button className="search-form__btn search-form__btn--clear btn btn--icon btn--transp">
							<Icon name="general-x"/>
						</button>
					</div>
				</form>
			</div>
		);
	}
}
