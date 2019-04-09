// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import style from './Toolbar.scss';

export default class Toolbar extends Component{
	static propTypes = {
		className: PropTypes.string,
		leftBreadcrumbs: PropTypes.shape({}),
		leftSectionComponents: PropTypes.arrayOf(PropTypes.node),
		rightSectionButtons: PropTypes.arrayOf(PropTypes.node),
	};

	render(){
		const { className, leftBreadcrumbs, leftSectionComponents, rightSectionButtons } = this.props;

		let leftSection;
		if (leftBreadcrumbs || leftSectionComponents){
			const leftbreadcrumbs = !leftBreadcrumbs ? null : (
				<div className='toolbar-breadcrumbs'>
					{ leftBreadcrumbs }
				</div>
			),
				leftSectionComponentsToRender = !leftSectionComponents ? null : (
					leftSectionComponents.filter(component => !!component).map((component, index) =>
						<div key={index} className={classnames('prism-toolbar__cell', {[style.firstCellLeftSection]: index === 0})}>
							{ component }
						</div>
					)
				);

			leftSection = (
				<div className='prism-toolbar__section prism-toolbar__section--left'>
					{ leftbreadcrumbs }
					{ leftSectionComponentsToRender }
				</div>
			);
		}

		const rightSection = !rightSectionButtons ? null : (
			<div className='prism-toolbar__section prism-toolbar__section--right'>
				{ rightSectionButtons.filter(btn => !!btn).map((button, index) =>
					<div key={index} className='prism-toolbar__cell btns-holder'>
						{ button }
					</div>
				) }
			</div>
		);

		const onlyRightSection = rightSection && !leftSection,
			toolbar = classnames('prism-toolbar', style.toolbar, {[style.onlyRightSection]: onlyRightSection }, className);

		return (
			<div className={toolbar}>
				{ leftSection }
				{ rightSection }
			</div>
		);
	}
}
