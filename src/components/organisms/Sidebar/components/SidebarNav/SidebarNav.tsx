/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, ListItemIcon, Divider, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    marginRight: theme.spacing(8),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
  divider: {
    width: '100%',
  },
}));

interface Props {
  className?: string;
  onClose: Function;
};

const SidebarNav = ({ onClose, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={() => onClose()}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography 
          variant="h6" color="textPrimary" gutterBottom
          component={'a'}
          href='https://www.notion.so/e4e394eb41e2463e80127fb36814c0d1'
          target='_blank'
        >
          팀 소개
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" gutterBottom
          component={'a'}
          href='/profile/list'
          target='_blank'
        >
          정보원 리스트
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" gutterBottom
          component={'a'}
          href='/agent'
        >
          묻다 정보원
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" gutterBottom
          component={'a'}
          href='https://www.notion.so/f2cf140b04ce42bf9022415fb392a703'
          target='_blank'
        >
          앱 사용 가이드
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" gutterBottom
          component={'a'}
          href='https://www.notion.so/36ecae745b814ed0bec4bea180e0e60e'
          target='_blank'
        >
          질문 작성 가이드
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" gutterBottom
          component={'a'}
          href='https://www.notion.so/e55b07de52a8418aa840b8e2dcf0946d'
          target='_blank'
        >
          자주 묻는 질문
        </Typography>
      </ListItem>
    </List>
  );
};

export default SidebarNav;
