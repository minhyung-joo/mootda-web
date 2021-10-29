import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { CardBase } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

/**
 * Component to display the review card
 *
 * @param {Object} props
 */
const CardReview = ({
  icon,
  text,
  align = 'center',
  textVariant = 'h6',
  className,
  textProps = {},
  listItemPrimaryTypographyProps = {},
  listItemSecondaryTypographyProps = {},
  ...rest
}: CardReviewProps): JSX.Element => {
  const classes = useStyles();

  let justifyGrid: ('center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined) = 'center';
  if (align === 'left') {
    justifyGrid = 'flex-start';
  } else if (align === 'right') {
    justifyGrid = 'flex-end';
  }

  return (
    <CardBase
      className={clsx('card-review', classes.root, className)}
      {...rest}
    >
      <Grid container spacing={2} className="card-review__wrapper">
        <Grid
          item
          container
          justify={justifyGrid}
          xs={12}
          className="card-review__icon-wrapper"
        >
          {icon}
        </Grid>
        <Grid item xs={12} className="card-review__text-wrapper">
          <Typography
            variant={textVariant}
            align={align}
            component="p"
            {...textProps}
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
    </CardBase>
  );
};

export default CardReview;
