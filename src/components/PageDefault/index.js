import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Footer from '../Footer';
import Menu from '../Menu';

const Main = styled.main`
    background-color: var(--black);
    color: var(--white);
    flex: 1;
    padding-top: 50px;
    padding-left: 5%;
    padding-right: 5%;
    ${({ paddingAll }) => css`
        padding: ${paddingAll};
    `}
`;

const PageDefault = ({ children, paddingAll }) => (
  <>
    <Menu />
    <Main paddingAll={paddingAll}>
      {children}
    </Main>
    <Footer />
  </>
);

PageDefault.defaultProps = {
  paddingAll: 0,
};

PageDefault.propTypes = {
  children: PropTypes.node.isRequired,
  paddingAll: PropTypes.number,
};

export default PageDefault;
