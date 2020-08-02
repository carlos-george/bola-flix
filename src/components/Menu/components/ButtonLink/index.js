import React from 'react';
import PropTypes from 'prop-types';

const ButTonLink = ({ className, href, children }) => (
  <a className={className} href={href}>
    {children}
  </a>
);

ButTonLink.propTypes = {
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButTonLink;
