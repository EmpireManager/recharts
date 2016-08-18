/**
 * @fileOverview Wrapper component to make charts adapt to the size of parent * DOM
 */
import React, { Component, PropTypes } from 'react';
import ContainerDimensions from 'react-container-dimensions';
import pureRender from '../util/PureRender';
import { getPercentValue, isPercent } from '../util/DataUtils';
import { warn } from '../util/LogUtils';

const render = ({ aspect, minWidth, minHeight, container, children }) => {
  let width = container.width;
  let height = container.height;

  // At least the minimum
  if (width < minWidth) {
    width = minWidth;
  }
  if (height < minHeight) {
    height = minHeight;
  }

  // Preserve the desired aspect ratio
  if (width / height !== aspect) {
    height = width / aspect;
  }

  return React.cloneElement(children, { width, height });
};

const ResponsiveContainer = props => (
  <div className="recharts-responsive-container">
    <ContainerDimensions>
      {
        container =>
          render({
            container,
            ...props,
          })
      }
    </ContainerDimensions>
  </div>
);

ResponsiveContainer.displayName = 'ResponsiveContainer';
ResponsiveContainer.propTypes = {
  aspect: PropTypes.number.isRequired,
  minHeight: PropTypes.number.isRequired,
  minWidth: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

ResponsiveContainer.defaultProps = {
  aspect: 1,
  minHeight: 100,
  minWidth: 100,
};

export default ResponsiveContainer;
