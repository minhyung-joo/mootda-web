import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    Paper,
    CssBaseline,
} from '@material-ui/core';
import getTheme from 'theme';
import { Footer, Topbar } from 'views/Mutda/components';
import { Network, Philan, Pitch } from './components';
import { Helmet } from "react-helmet";
import clsx from 'clsx';

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            '& .MuiToolbar-root': {
                boxShadow: '0 2px 6px 0 rgb(0 0 0 / 12%), inset 0 -1px 0 0 #dadce0',
            },
        },
        main: {
            width: '100%',
            paddingTop: '80px',
            [theme.breakpoints.down('sm')]: {
                '& h3': {
                    fontSize: 24,
                    marginBottom: 16,
                    textAlign: 'center',
                },
            },
            [theme.breakpoints.up('sm')]: {
                '& h3': {
                    fontSize: 32,
                    marginBottom: 32,
                    textAlign: 'center',
                },
            },
        },
    }
});

const Agent = ({ onDownloadClick }): JSX.Element => {
    const classes = useStyles();

    return (
        <main>
            <Helmet>
                <title>묻다 - 묻다 네트워크와 함께하실 정보원을 찾습니다!</title>
                <meta
                    property="og:title"
                    content="묻다"
                />
                <meta
                    property="og:description"
                    content="묻다 네트워크와 함께하실 정보원을 찾습니다! 여러분의 경험이 누군가에겐 귀중한 정보가 될 수 있습니다."
                />
                <meta
                    name="description"
                    content="묻다 네트워크와 함께하실 정보원을 찾습니다! 여러분의 경험이 누군가에겐 귀중한 정보가 될 수 있습니다."
                />
                <link rel="canonical" href="https://www.mootda.com/agent" />
            </Helmet>
            <div className={classes.main}>
                <Pitch />
                <Philan />
                <Network onDownloadClick={onDownloadClick} />
                <Footer />
            </div>
        </main>
    );

    // return (
    //     <ThemeProvider theme={getTheme('light')}>
    //         <CssBaseline />
    //         <Paper elevation={0}>
    //             <div className={classes.root}>
    //                 <Topbar onSidebarOpen={handleSidebarOpen} onClickButton={() => {}} className={{}} />
    //                 <main>
    //                     <div className={classes.main}>
    //                         <Pitch />
    //                         <Philan />
    //                         <Network />
    //                         <Footer />
    //                     </div>
    //                 </main>
    //             </div>
    //         </Paper>
    //     </ThemeProvider>
    // );
};

export default Agent;
    