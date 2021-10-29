/**
 * Caution: Consider this file when using NextJS or GatsbyJS
 * 
 * You may delete this file and its occurrences from the project filesystem if you are using react-scripts
 */
import React from 'react';
import NotFoundCover from '../src/views/NotFoundCover';
import Main from '../src/views/Main';
import WithLayout from 'WithLayout';

const FourOFourPage = (): JSX.Element => {
  return (
    <Main
      component={NotFoundCover}
    />
  )
};

export default FourOFourPage;