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
        endModalBody: {
            position: 'absolute',
            top: 'calc(50% - 150px)',
            left: 'calc(50% - 175px)',
            display: 'flex',
            width: 350,
            height: 300,
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            flexDirection: 'column',
        },
        endHeader: {
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 24,
        },
        endText: {
            fontSize: 16,
        },
        alertBody: {
            position: 'absolute',
            top: 'calc(50% - 215px)',
            left: 'calc(50% - 200px)',
            display: 'flex',
            width: 400,
            height: 430,
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 8,
            flexDirection: 'column',
            whiteSpace: "pre-wrap",
        },
        betaButton: {
            marginTop: '24px',
            padding: '8px 24px',
            borderRadius: 4,
            backgroundColor: "#884DFF",
            color: "white",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
        }
    }
})

const Main = ({ component: Component, childProps = {} }): JSX.Element => {
    const classes = useStyles();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [downloadModalOpen, setDownloadModalOpen] = useState(false);
    const [endModalOpen, setEndModalOpen] = useState(true);
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        if (Date.now() <= Date.UTC(2022, 5, 14, 0, 0, 0)) {
            setAlertOpen(true);
        }

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
                    open={endModalOpen}
                    onClose={() => setEndModalOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className={classes.endModalBody}>
                        <div className={classes.endHeader}>서비스 종료 안내</div>
                        <div className={classes.endText}>안녕하세요, 묻다입니다.<br /><br />
무거운 마음으로 서비스 종료 소식을 전합니다.<br />
묻다는 <b><u>2022년 9월 1일</u></b>부로 서비스를 종료하게 되었습니다.<br />
그 동안 묻다에 관심가져주신 모든분들께 진심으로 감사드립니다.<br />
문의는 hq@mootda.com 으로 연락주시기 바랍니다.
                        </div>
                    </div>
                </Modal>
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
                <Modal
                    open={alertOpen}
                    onClose={() => setAlertOpen(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className={classes.alertBody}>
묻다 이용약관 및 개인정보처리방침은 2022년 6월 14일부로 아래와 같이 변경될 예정입니다. 주요 사항은 다음과 같습니다<br />
<br />
이용약관 변경 전 : <br />
상호명 : (주) 큐리어스원스 (Curious One Corp.)<br />
<br />
이용약관 변경 후 : <br />
상호명 : (주) 아페로 (Apeiro Corp.)<br />
<br />
개인정보처리방침 변경 전 : <br />
상호명 : (주) 큐리어스원스 (Curious One Corp.)<br />
개인정보보호 책임자 : 이재형 <br />
<br />
개인정보처리방침 변경 후 : <br />
상호명 : (주) 아페로 (Apeiro Corp.)<br />
개인정보보호 책임자 : 주민형
                        <div
                            className={classes.betaButton}
                            onClick={() => setAlertOpen(false)}
                        >
                            확인
                        </div>
                    </div>
                </Modal>
                <Component onDownloadClick={openDownloadModal} {...childProps} />
            </Paper>
        </ThemeProvider>
    )
}

export default Main;
