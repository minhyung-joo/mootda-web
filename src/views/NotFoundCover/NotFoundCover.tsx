import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  const toolbar = theme.mixins.toolbar as any;
  return ({
    root: {
      paddingTop: 80,
      textAlign: 'center',
      '& .hero-shaped': {
        borderBottom: 0,
      },
      '& .hero-shaped__wrapper': {
        [theme.breakpoints.up('md')]: {
          minHeight: `calc(100vh - ${toolbar['@media (min-width:600px)'].minHeight}px)`,
        },
      },
    },
    formContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 500,
        margin: `0 auto`,
      },
    },
    image: {
      objectFit: 'cover',
    },
    label: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  });
});

const NotFoundCover = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      여긴 아직 아무것도 없어요 D:
    </div>
  );
};

export default NotFoundCover;
