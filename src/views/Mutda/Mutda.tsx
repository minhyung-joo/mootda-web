import React, { useEffect, useRef, useState } from 'react';
import mainScreens from '../../assets/images/main_screens.png';
import appStoreButton from '../../assets/images/app_store_button.svg';
import playStoreButton from '../../assets/images/play_store_button.png';
import textLogo from '../../assets/images/text_logo.png';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { 
    Button, 
    Paper, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions,
    Snackbar,
    CssBaseline,
    CircularProgress,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { PeopleSection, FeatureSection, SolutionSection, Topbar, Footer, BoardSection } from './components';
import getTheme from 'theme';
import Sidebar from 'components/organisms/Sidebar';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import ReactGa from 'react-ga';
import { useRouter } from 'next/router';

declare let gtag: Function;

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            '& .MuiToolbar-root': {
                boxShadow: '0 2px 6px 0 rgb(0 0 0 / 12%), inset 0 -1px 0 0 #dadce0',
            },
        },
        hero: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                paddingTop: 65,
                flexDirection: 'column',
            },
            [theme.breakpoints.up('sm')]: {
                paddingTop: 120,
                paddingBottom: 80,
            },
            background: 'rgba(102, 26, 255, 0.08)'
        },
        sloganWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            [theme.breakpoints.down('sm')]: {
                '& h3': {
                    fontSize: 32,
                    textAlign: 'center',
                },
                marginBottom: 12,
            },
            [theme.breakpoints.up('sm')]: {
                '& h3': {
                    fontSize: 48,
                    textAlign: 'center',
                },
                marginRight: 64,
            },
            fontSize: 16,
        },
        screenWrapper: {
            display: 'flex',
            position: 'relative',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                height: 350,
                '& .list-screen': {
                    position: 'relative',
                    left: '0',
                    top: '0',
                    width: 330,
                    height: 426,
                },
            },
            [theme.breakpoints.up('sm')]: {
                height: 592,
                '& .list-screen': {
                    position: 'relative',
                    left: '0',
                    top: '0',
                    width: 440,
                    height: 568,
                },
            },
            justifyContent: 'center',
            top: '0',
            left: '0',
            zIndex: 1,
            overflow: 'hidden',
        },
        callToAction: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                padding: '64px 16px',
            },
            [theme.breakpoints.up('sm')]: {
                padding: '80px 16px',
            },
            background: 'rgba(102, 26, 255, 0.08)'
        },
        callToActionHeader: {
            textAlign: 'center',
            fontSize: 32,
            marginBottom: 24,
            overflow: "word-wrap",
            [theme.breakpoints.up('sm')]: {
                '& br': {
                    display: "none",
                }
            }
        },
        callToActionText: {
            textAlign: 'center',
            fontSize: 16,
            marginBottom: 48,
        },
        betaButton: {
            padding: '8px 24px',
            borderRadius: 4,
            backgroundColor: "#884DFF",
            color: "white",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
        },
        downloadButtons: {
            marginTop: 24,
            display: 'flex',
            '& .play-button': {
                cursor: 'pointer',
                width: 140,
                height: 41.7,
                marginTop: 6,
                marginLeft: 12,
            },
            '& .apple-button': {
                cursor: 'pointer',
                width: 140,
                height: 54,
            },
        },
        sloganTopRow: {
            display: 'flex',
            alignItems: 'flex-end',
        },
        dottedText: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.up('sm')]: {
                marginLeft: 12,
            },
            [theme.breakpoints.down('sm')]: {
                marginLeft: 8,
            },
        },
        dot: {
            [theme.breakpoints.up('sm')]: {
                width: 8,
                height: 8,
                borderRadius: 4,
            },
            [theme.breakpoints.down('sm')]: {
                width: 6,
                height: 6,
                borderRadius: 3,
            },
            backgroundColor: 'rgb(136, 77, 255)',
            marginBottom: 4,
        },
        lowerSlogan: {
            [theme.breakpoints.up('sm')]: {
                marginTop: 24,
                fontSize: 20,
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: 16,
                fontSize: 18,
            },
        },
        textLogo: {
            marginTop: 4,
            [theme.breakpoints.up('sm')]: {
                width: 101,
                height: 48,
            },
            [theme.breakpoints.down('sm')]: {
                width: 67,
                height: 32,
            },
        },
        highlighted: {
            color: 'rgb(136, 77, 255)'
        },
        profilePreviewBox: {
            padding: '64px 24px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            margin: 'auto',
            '& .loading-div': {
                height: 244,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        },
        profileBox: {
            display: 'flex',
            flexDirection: 'column',
            '& .top-row': {
                display: 'flex',
                alignItems: 'center',
                height: 120,
            },
            '& .intro-box': {
                backgroundColor: 'rgb(248, 248, 248)',
                padding: 12,
                marginTop: 12,
                height: 116,
                maxHeight: 116,
                overflow: 'hidden',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                textOverflow: 'ellipsis',
                fontSize: '9pt',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': 6,
                whiteSpace: 'pre-wrap',
            },
            minWidth: 360,
            maxWidth: 360,
            margin: '12px 0',
            padding: '0 36px',
        },
        logoBox: {
            position: 'relative',
            top: 0,
            left: 0,
            height: 100,
            margin: '0 24px',
            '& .org-logo-box': {
                width: 100,
                height: 100,
                padding: 8,
                borderRadius: '50%',
                border: '1px solid black'
            },
            '& .org-logo': {
                width: 84,
                height: 84,
                borderRadius: '50%',
                objectFit: 'contain',
            },
            '& .org-replacement-logo': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'rgba(102, 26, 255, 0.5)',
                color: 'white',
                fontSize: 32,
                fontWeight: 'bold',
                border: '1px solid black'
            },
            '& .profile-pic': {
                width: 40,
                height: 40,
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'absolute',
                top: 0,
                left: 60,
                border: '1px solid black'
            }
        },
        infoColumn: {
            display: 'flex',
            flexDirection: 'column',
        },
        companyName: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        previewRow: {
            display: 'flex',
            overflow: 'scroll',
            '& > :not(:last-child)': {
                borderRight: '0.5px solid rgba(0, 0, 0, 0.2)',
            },
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        },
        buttonDiv: {
            margin: 'auto',
            marginTop: 12,
        },
        timeRow: {
            margin: 'auto',
            marginTop: 12,
        },
        profilePreviewHeader: {
            width: '100%',
            maxWidth: 1024,
            margin: 'auto',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 12
        }
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"
const APPLE_LINK = "https://apps.apple.com/kr/app/%EB%AC%BB%EB%8B%A4-%EA%B2%80%EC%A6%9D%EB%90%9C-%EC%A0%95%EB%B3%B4%EC%9B%90%EB%93%A4%EA%B3%BC-1-1-%ED%86%B5%ED%99%94/id1563947568"
const PLAY_LINK = "https://play.google.com/store/apps/details?id=com.mootda.mootda_app"

let rightScroll = true;

const Mutda = (): JSX.Element => {
    const ref = useRef<HTMLInputElement>();
    const classes = useStyles();
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${HOST}/v1/user/web/profilelist/`,).then((response) => {
            response.json().then((resJson) => {
                setProfiles(resJson.profiles);
                setLoading(false);
            }).catch((e) => {
                setLoading(false);
            })
        }).catch((e) => {
            setLoading(false);
        });
        let intervalId = setInterval(() => {
            const preview = ref.current;
            if (preview) {
                if (rightScroll && preview.scrollLeft + preview.clientWidth === preview.scrollWidth) {
                    rightScroll = false;
                }
                else if (!rightScroll && preview.scrollLeft === 0) {
                    rightScroll = true;
                }
    
                if (rightScroll) {
                    preview.scrollBy(1, 0);
                } else {
                    preview.scrollBy(-1, 0);
                }
            }
        }, 25)
        return(() => {
            clearInterval(intervalId)
        })
    }, [])

    const openEmailModal = () => {
        // setOpen(true);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    }

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    }

    const handleListClick = () => {
        router.push('/profile/list')
    }

    const appClickConversion = (url) => {
        ReactGa.event({
            category: 'User',
            action: 'Clicked app store link',
            label: 'app_download'
        });
        var callback = function () {
            if (typeof(url) != 'undefined') {
              return;
            }
          };
          gtag('event', 'conversion', {
              'send_to': 'AW-334838074/IhkMCM_wrO4CELry1J8B',
              'event_callback': callback
          });
          return false;
    }

    const filteredProfiles = profiles.filter((p) => p.careers.length && p.schedules.length);
    console.log (filteredProfiles)

    return (
        <main>
            <div className={classes.root}>
                <div className={classes.hero}>
                    <div className={classes.sloganWrapper}>
                        <div className={classes.sloganTopRow}>
                            <h3>통화 </h3>
                            <div className={classes.dottedText}>
                                <div className={classes.dot}></div>
                                <h3>한</h3>
                            </div>
                            <div className={classes.dottedText}>
                                <div className={classes.dot}></div>
                                <h3> 번</h3>
                            </div>
                            <h3>으로</h3>
                        </div>
                        <h3>경험과 노하우를</h3>
                        <h3 className={classes.highlighted}>묻다</h3>
                        {/* <img
                            className={classes.textLogo}
                            src={textLogo}
                            alt="text logo"
                        /> */}
                        <div className={classes.lowerSlogan}>검증된 정보원들과 통화로 만나보세요!</div>
                        <div className={classes.downloadButtons}>
                            <a onClick={() => appClickConversion(APPLE_LINK)} target='_blank' href={APPLE_LINK}>
                                <img className="apple-button" src={appStoreButton} alt="앱스토어 다운로드" />
                            </a>
                            <a onClick={() => appClickConversion(PLAY_LINK)} target='_blank' href={PLAY_LINK}>
                                <img className="play-button" src={playStoreButton} alt="플레이 스토어 다운로드" />
                            </a>
                        </div>
                    </div>
                    <div className={classes.screenWrapper}>
                        <img className="list-screen" src={mainScreens} alt="프로필 리스트" />
                    </div>
                </div>
                <div className={classes.profilePreviewBox}>
                    <div className={classes.profilePreviewHeader}>
                        오늘의 추천 정보원
                    </div>
                    {loading ? (
                        <div className="loading-div">
                            <CircularProgress />
                        </div>
                    ) : null}
                    <div className={classes.previewRow} ref={ref}>
                        {filteredProfiles.map((profile) => {
                            let today = new Date().getDay()

                            const schedule = profile.schedules.filter((schedule) => {
                                const startTime = new Date(Date.parse(schedule.time_start))
                                return startTime.getDay() === today
                            })[0];
                            if (!schedule) {
                                return null;
                            }

                            const startTime = new Date(Date.parse(schedule.time_start))
                            const endTime = new Date(Date.parse(schedule.time_end))
                            let startTimeStr = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`;
                            let endTimeStr = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
                            if (startTime.getDay() !== endTime.getDay()) {
                                endTimeStr = '24:00'
                            }

                            return (
                                <div className={classes.profileBox}>
                                    <div className="top-row">
                                        <div className={classes.logoBox}>
                                            {profile.careers[0].org.logo ? (
                                                <div className="org-logo-box">
                                                    <img
                                                        className="org-logo"
                                                        src={profile.careers[0].org.logo}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="org-replacement-logo">
                                                    {profile.careers[0].org.name[0]}
                                                </div>
                                            )}
                                            {profile.profile_pic ? (
                                                <img
                                                    className="profile-pic"
                                                    src={profile.profile_pic}
                                                />
                                            ) : null}
                                        </div>
                                        <div className={classes.infoColumn}>
                                            <div>
                                                {profile.nickname}
                                            </div>
                                            <div className={classes.companyName}>
                                                {profile.careers[0].org.name}
                                            </div>
                                            <div>
                                                {profile.careers[0].dept}
                                            </div>
                                            <div>
                                                {profile.careers[0].title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.timeRow}>
                                        <b>오늘 통화 가능 시간</b>: {startTimeStr} ~ {endTimeStr}
                                    </div>
                                    <div className="intro-box">
                                        {profile.intro}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.buttonDiv}>
                        <div className={classes.betaButton} onClick={handleListClick}>
                            정보원 리스트 보기
                        </div>
                    </div>
                </div>
                {/* <BoardSection /> */}
                <PeopleSection />
                <FeatureSection />
                <SolutionSection />
                {/* <div className={classes.callToAction}>
                    <h3 className={classes.callToActionHeader}>
                        ‘묻다’와 함께 성장할<br /> 베타테스터를 찾습니다
                    </h3>
                    <div className={classes.callToActionText}>
                        초기 사용자가 되어 다양한 혜택을 받으세요!
                    </div>
                    <div 
                        className={classes.betaButton}
                        onClick={openEmailModal}
                    >
                        신청하기
                    </div>
                </div> */}
                <Footer />
            </div>
        </main>
    );

    return (
        <ThemeProvider theme={getTheme('light')}>
            <CssBaseline />
            <Paper elevation={0}>
                <div className={classes.root}>
                    <Topbar onSidebarOpen={handleSidebarOpen} onClickButton={openEmailModal} className={{}} />
                    <Sidebar
                        onClose={handleSidebarClose}
                        open={sidebarOpen}
                        variant="temporary"
                    />
                    {/* <Dialog
                        open={false}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">베타 테스터 신청</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                베타 서비스 시작 시 이메일로 참여 방법을 보내드립니다!
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="이메일"
                                type="email"
                                value={email}
                                fullWidth
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEmailSubscribe} color="primary">
                                신청하기
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                    {/* <Snackbar
                        style={{ height: "100%" }}
                        open={snackOpen} 
                        autoHideDuration={3000} 
                        onClose={handleSnackClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Alert onClose={handleSnackClose} severity="success">
                            신청해주셔서 감사합니다!
                        </Alert>
                    </Snackbar> */}
                    <main>
                        <div className={classes.root}>
                            <div className={classes.hero}>
                                <div className={classes.sloganWrapper}>
                                    <h3>경험과 노하우는 <br /> ‘묻다’에서</h3>
                                    <div>검증된 정보원들과 통화로 만나보세요!</div>
                                    <div className={classes.downloadButtons}>
                                        <a target='_blank' href="https://apps.apple.com/kr/app/%EB%AC%BB%EB%8B%A4-%EA%B2%80%EC%A6%9D%EB%90%9C-%EC%A0%95%EB%B3%B4%EC%9B%90%EB%93%A4%EA%B3%BC-1-1-%ED%86%B5%ED%99%94/id1563947568">
                                            <img className="apple-button" src={appStoreButton} alt="앱스토어 다운로드" />
                                        </a>
                                        <a target='_blank' href="https://play.google.com/store/apps/details?id=com.mootda.mootda_app">
                                            <img className="play-button" src={playStoreButton} alt="플레이 스토어 다운로드" />
                                        </a>
                                    </div>
                                </div>
                                <div className={classes.screenWrapper}>
                                    <img className="list-screen" src={mainScreens} alt="프로필 리스트" />
                                </div>
                            </div>
                            <PeopleSection />
                            <FeatureSection />
                            <SolutionSection />
                            {/* <div className={classes.callToAction}>
                                <h3 className={classes.callToActionHeader}>
                                    ‘묻다’와 함께 성장할<br /> 베타테스터를 찾습니다
                                </h3>
                                <div className={classes.callToActionText}>
                                    초기 사용자가 되어 다양한 혜택을 받으세요!
                                </div>
                                <div 
                                    className={classes.betaButton}
                                    onClick={openEmailModal}
                                >
                                    신청하기
                                </div>
                            </div> */}
                            <Footer />
                        </div>
                    </main>
                </div>
            </Paper>
        </ThemeProvider>
    );
};

export default Mutda;