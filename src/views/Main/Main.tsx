import React, { useEffect, useState } from 'react';
import getTheme from 'theme';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { 
    Paper, 
    CssBaseline,
    Modal,
} from '@material-ui/core';
import Sidebar from 'components/organisms/Sidebar';
import { Topbar } from 'views/Mutda/components';
import { Route, Switch } from 'react-router-dom';
import {
    Mutda as MutdaView,
    Agent as AgentView,
    AgentList as AgentListView,
    ProfileDetail as ProfileDetailView,
} from '../../views';
import ReactGa from 'react-ga';
import appStoreButton from '../../assets/images/app_store_button.svg';
import playStoreButton from '../../assets/images/play_store_button.png';

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            '& .MuiToolbar-root': {
                boxShadow: '0 2px 6px 0 rgb(0 0 0 / 12%), inset 0 -1px 0 0 #dadce0',
            },
        },
        modalBody: {
            position: 'absolute',
            top: 'calc(50% - 75px)',
            left: 'calc(50% - 100px)',
            display: 'flex',
            width: 200,
            height: 155,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            flexDirection: 'column',
            '& .apple-button': {
                cursor: 'pointer',
                width: 156,
                height: 60,
            },
            '& .play-button': {
                cursor: 'pointer',
                width: 156,
                height: 46.5,
                marginTop: 6.75,
                marginBottom: 6.75,
            },
        },
    }
})

const Main = ({ component: Component, childProps = {} }): JSX.Element => {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [downloadModalOpen, setDownloadModalOpen] = useState(false);

    useEffect(() => {
        ReactGa.initialize('UA-191887139-1');

        ReactGa.pageview('/');
    }, [])

    const openDownloadModal = () => {
        // setOpen(true);
        setDownloadModalOpen(true);
    }

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    }

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    }

    return (
        <ThemeProvider theme={getTheme('light')}>
            <CssBaseline />
            <Paper elevation={0}>
                <div className={classes.root}>
                    <Topbar onSidebarOpen={handleSidebarOpen} onClickButton={openDownloadModal} className={{}} />
                    <Sidebar
                        onClose={handleSidebarClose}
                        open={sidebarOpen}
                        variant="temporary"
                    />
                </div>
                <Modal
                    open={downloadModalOpen}
                    onClose={() => setDownloadModalOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className={classes.modalBody}>
                        <ReactGa.OutboundLink
                            eventLabel="apple_app_store"
                            to="https://apps.apple.com/kr/app/%EB%AC%BB%EB%8B%A4-%EA%B2%80%EC%A6%9D%EB%90%9C-%EC%A0%95%EB%B3%B4%EC%9B%90%EB%93%A4%EA%B3%BC-1-1-%ED%86%B5%ED%99%94/id1563947568"
                            target="_blank"
                        >
                            <img className="apple-button" src={appStoreButton} alt="앱스토어 다운로드" />
                        </ReactGa.OutboundLink>
                        <ReactGa.OutboundLink
                            eventLabel="google_play_store"
                            to="https://play.google.com/store/apps/details?id=com.mootda.mootda_app"
                            target="_blank"
                        >
                            <img className="play-button" src={playStoreButton} alt="플레이 스토어 다운로드" />
                        </ReactGa.OutboundLink>
                    </div>
                </Modal>
                <Component onDownloadClick={openDownloadModal} {...childProps} />
            </Paper>
        </ThemeProvider>
    )
}

export default Main;
