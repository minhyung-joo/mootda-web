import React, { useState } from 'react';
import logoImage from '../../../../assets/images/logo.png'
import { Toolbar, makeStyles, Hidden, List, ListItem, Typography, Popover, ListItemIcon, IconButton } from '@material-ui/core';
import { Image } from 'components/atoms';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    toolbar: {
        zIndex: 999,
        width: '100vw',
        padding: theme.spacing(1.5, 2),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0, 8),
        },
        position: 'fixed',
        backgroundColor: 'white',
    },
    topbarContainer: {
        margin: 'auto',
        width: 1024,
        display: 'flex',
    },
    logoContainer: {
        width: 118,
        height: 38.5,
        marginRight: 'auto',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    betaButton: {
        padding: '6px 16px',
        borderRadius: 4,
        backgroundColor: "#884DFF",
        color: "white",
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    navigationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItem: {
        cursor: 'pointer',
        '&:hover > .menu-item, &:hover svg': {
          color: theme.palette.primary.dark,
        },
        '&.menu-item--no-dropdown': {
          paddingRight: 0,
        },
    },
    listItemText: {
        flex: '0 0 auto',
        marginRight: theme.spacing(2),
        whiteSpace: 'nowrap',
    },
    listItemActive: {
        '&> .menu-item': {
          color: theme.palette.primary.dark,
        },
    },
    listItemIcon: {
        minWidth: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
        color: theme.palette.primary.dark,
    },
    popover: {
        padding: 16,
        paddingBottom: 4,
        border: theme.spacing(2),
        boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
        marginTop: theme.spacing(2),
    },
    menuGroupItem: {
        paddingTop: 0,
        paddingBottom: 12,
    },
    navLink: {
        '&:hover': {
          color: theme.palette.primary.dark,
        },
    },
    iconButton: {
        marginLeft: theme.spacing(2),
        padding: 0,
        '&:hover': {
          background: 'transparent',
        },
    },
}));

const Topbar = ({ onSidebarOpen, onClickButton, className, ...rest }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [popover, setPopover] = useState(false);

    const handleClose = (): void => {
        setAnchorEl(null);
        setPopover(false);
    };

    return (
        <Toolbar disableGutters className={classes.toolbar} {...rest}>
            <div className={classes.topbarContainer}>
                <div className={classes.logoContainer}>
                    <a href="/" title="mootda">
                        <Image
                            className={classes.logoImage}
                            src={logoImage}
                            alt="mootda logo"
                            lazy={false}
                        />
                    </a>
                </div>
                <Hidden smDown>
                    <List disablePadding className={classes.navigationContainer}>
                        <ListItem
                            className={classes.listItem}
                        >
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                className={clsx(classes.listItemText, 'menu-item')}
                                component={'a'}
                                href='/profile/list'
                                target='_blank'
                            >
                                정보원 리스트
                            </Typography>
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                        >
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                className={clsx(classes.listItemText, 'menu-item')}
                                component={'a'}
                                href='https://www.notion.so/e4e394eb41e2463e80127fb36814c0d1'
                                target='_blank'
                            >
                                팀 소개
                            </Typography>
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                        >
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                className={clsx(classes.listItemText, 'menu-item')}
                                component={'a'}
                                href='/agent'
                            >
                                묻다 정보원
                            </Typography>
                        </ListItem>
                        <ListItem
                            onClick={e => {
                                setPopover(!popover)
                                setAnchorEl(e.target)
                            }}
                            className={clsx(
                                classes.listItem,
                                popover ? classes.listItemActive : '',
                            )}
                        >
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                className={clsx(classes.listItemText, 'menu-item')}
                            >
                                묻다 사용법
                            </Typography>
                            <ListItemIcon className={classes.listItemIcon}>
                                <ExpandMoreIcon
                                    className={popover ? classes.expandOpen : ''}
                                    fontSize="small"
                                />
                            </ListItemIcon>
                        </ListItem>
                        <Popover
                            elevation={1}
                            open={popover}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            classes={{ paper: classes.popover }}
                        >
                            <List disablePadding>
                                <ListItem disableGutters className={classes.menuGroupItem}>
                                    <Typography
                                        variant="body1"
                                        component={'a'}
                                        href="https://www.notion.so/f2cf140b04ce42bf9022415fb392a703"
                                        target='_blank'
                                        className={clsx(classes.navLink, 'submenu-item')}
                                        color="textSecondary"
                                    >
                                        앱 사용 가이드
                                    </Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.menuGroupItem}>
                                    <Typography
                                        variant="body1"
                                        component={'a'}
                                        href="https://www.notion.so/36ecae745b814ed0bec4bea180e0e60e"
                                        target='_blank'
                                        className={clsx(classes.navLink, 'submenu-item')}
                                        color="textSecondary"
                                    >
                                        질문 작성 가이드
                                    </Typography>
                                </ListItem>
                                <ListItem disableGutters className={classes.menuGroupItem}>
                                    <Typography
                                        variant="body1"
                                        component={'a'}
                                        href="https://www.notion.so/e55b07de52a8418aa840b8e2dcf0946d"
                                        target='_blank'
                                        className={clsx(classes.navLink, 'submenu-item')}
                                        color="textSecondary"
                                        onClick={handleClose}
                                    >
                                        자주 묻는 질문
                                    </Typography>
                                </ListItem>
                            </List>
                        </Popover>
                    </List>
                </Hidden>
                <div
                    className={classes.betaButton}
                    onClick={onClickButton}
                >
                    다운로드
                </div>
                <Hidden mdUp>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => onSidebarOpen()}
                        aria-label="Menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </div>
        </Toolbar>
    );
}

export default Topbar;