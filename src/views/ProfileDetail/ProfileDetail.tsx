import { CircularProgress, CssBaseline, makeStyles, Modal, Paper, ThemeProvider } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Helmet } from "react-helmet";
import { ReviewBox } from './components';

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            padding: 12,
            paddingTop: 80,
            paddingBottom: 40,
            '& .MuiToolbar-root': {
                boxShadow: '0 2px 6px 0 rgb(0 0 0 / 12%), inset 0 -1px 0 0 #dadce0',
            },
            backgroundColor: 'rgba(102, 26, 255, 0.08)',
            minHeight: '100vh',
            margin: 'auto',
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(102, 26, 255, 0.08)',
            width: '100vw',
            height: '100vh',
        },
        profileDetail: {
            backgroundColor: 'white',
            margin: 'auto',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 8,
            padding: 12,
        },
        profileInfoBox: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 24px',
            '& .profile-image': {
                objectFit: 'cover',
                borderRadius: '50%',
                width: 48,
                height: 48,
            },
            '& .profile-replacement': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: 'rgba(102, 26, 255, 0.5)',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
            },
            '& .nickname-box': {
                marginLeft: 24,
                marginRight: 'auto',
            },
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            marginBottom: 12,
        },
        scheduleBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            padding: 12,
            marginBottom: 12,
            '& .schedule-title': {
                color: 'rgb(136, 77, 255)',
                fontSize: 16,
                fontWeight: 'bold',
            }
        },
        scheduleRow: {
            display: 'flex',
            marginTop: 8,
            '& .day-text': {
                width: 50,
                fontWeight: 'bold',
                textAlign: 'center',
            },
            '& .start-time-text': {
                width: 50,
                textAlign: 'center',
            },
            '& .end-time-text': {
                width: 50,
                textAlign: 'center',
            }
        },
        companyBox: {
            display: 'flex',
            '& .org-replace-logo': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 64,
                minHeight: 64,
                backgroundColor: 'rgba(102, 26, 255, 0.5)',
                color: 'white',
                borderRadius: 32,
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 0.5,
            },
            '& .org-logo-box': {
                width: 64,
                height: 64,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            '& .org-logo': {
                maxWidth: 64,
                maxHeight: 64,
            },
            borderRadius: 4,
            padding: '12px 24px',
            alignItems: 'center',
            marginBottom: 12,
        },
        borderHighlight: {
            border: '1px solid rgb(136, 77, 255)',
        },
        borderNormal: {
            border: '1px solid rgba(0, 0, 0, 0.12)',
        },
        companyInfoBox: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 12,
            lineHeight: 1.2,
            '& .company-name': {
                fontWeight: 'bold',
                fontSize: 14,
            },
            marginRight: 'auto',
        },
        careerLength: {
            color: 'rgba(0, 0, 0, 0.5)',
            minWidth: 40,
        },
        keywordRow: {
            display: 'flex',
            marginBottom: 12,
        },
        keywordBox: {
            border: '0.5px solid rgba(0, 0, 0, 0.12)',
            padding: '2px 4px',
            borderRadius: '4px',
            marginRight: '4px',
            fontSize: 12,
        },
        introBox: {
            backgroundColor: 'rgb(248, 248, 248)',
            padding: 24,
            marginBottom: 12,
        },
        betaButton: {
            padding: '12px 16px',
            borderRadius: 4,
            backgroundColor: "#884DFF",
            color: "white",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
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
        headerDivider: {
            paddingBottom: 4,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            marginTop: 8,
            marginBottom: 8,
            color: 'rgb(136, 77, 255)',
            fontSize: 16,
            fontWeight: 'bold',
        },
        profileImgBox: {
            overflow: 'hidden',
            borderRadius: '50%',
            position: 'relative',
            width: 48,
            height: 48,

            '& img': {
                width: 'auto',
                height: '100%',
            }
        },
        reviewSection: {
            overflow: 'auto',
            marginBottom: 12,
            whiteSpace: 'nowrap',
            zIndex: 1,
        }
    }
});

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

const ProfileDetail = ({ profile, reviews, onDownloadClick }): JSX.Element => {
    const classes = useStyles();

    if (profile == null) {
        return (
            <div className={classes.loading}>
                <div>
                    <CircularProgress />
                </div>
            </div>
        )
    }

    const schedules: Array<{ startTime: Date, endTime: Date }> = profile.schedules.map((s) => {
        return {
            startTime: new Date(Date.parse(s.time_start)),
            endTime: new Date(Date.parse(s.time_end)),
        }
    })

    const expandedSchedules = []

    schedules.forEach((s) => {
        if (s.startTime.getDay() < s.endTime.getDay() && !(s.endTime.getHours() === 0 && s.endTime.getMinutes() === 0)) {
            expandedSchedules.push({
                dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][s.startTime.getDay()] + "요일",
                startTime: `${String(s.startTime.getHours()).padStart(2, '0')}:${String(s.startTime.getMinutes()).padStart(2, '0')}`,
                endTime: '24:00',
            })
            expandedSchedules.push({
                dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][s.startTime.getDay() + 1 % 7] + "요일",
                startTime: '00:00',
                endTime: `${String(s.endTime.getHours()).padStart(2, '0')}:${String(s.endTime.getMinutes()).padStart(2, '0')}`,
            })
        } else {
            expandedSchedules.push({
                dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][s.startTime.getDay()] + "요일",
                startTime: `${String(s.startTime.getHours()).padStart(2, '0')}:${String(s.startTime.getMinutes()).padStart(2, '0')}`,
                endTime: `${String(s.endTime.getHours()).padStart(2, '0')}:${String(s.endTime.getMinutes()).padStart(2, '0')}`,
            })
        }
    })

    return (
        <div>
            <Helmet>
                <title>묻다 - {profile.nickname}님의 프로필</title>
                <meta
                    property="og:title"
                    content={`묻다 - ${profile.nickname}님의 프로필`}
                />
                <meta
                    property="og:description"
                    content={[profile.careers[0].org.name, profile.careers[0].dept, profile.careers[0].title, profile.nickname, profile.intro].filter((s) => s).join(' ')}
                />
                <meta
                    name="description"
                    content={[profile.careers[0].org.name, profile.careers[0].dept, profile.careers[0].title, profile.nickname, profile.intro].filter((s) => s).join(' ')}
                />
            </Helmet>
            <Paper elevation={0}>
                <div className={clsx(classes.root, 'image-crisp')}>
                    <main className={classes.profileDetail}>
                        <div className={classes.profileInfoBox}>
                            {profile.profile_pic ? (
                                <img
                                    className="profile-image"
                                    src={profile.profile_pic}
                                />
                            ) : (
                                <div className="profile-replacement">
                                    {profile.nickname.substr(0, 2)}
                                </div>
                            )}
                            <div className="nickname-box">
                                {profile.nickname}
                            </div>
                        </div>
                        <div className={classes.scheduleBox}>
                            <div className="schedule-title">
                                통화 가능 시간
                            </div>
                            {expandedSchedules.map((s) => (
                                <div className={classes.scheduleRow}>
                                    <div className="day-text">{s.dayOfWeek}</div>
                                    <div className="start-time-text">{s.startTime}</div>
                                    <div>~</div>
                                    <div className="end-time-text">{s.endTime}</div>
                                </div>
                            ))}
                        </div>
                        <div className={classes.headerDivider}>
                            이력
                        </div>
                        {profile.careers.map((career, index) => (
                            <div className={clsx(classes.companyBox, index === 0 ? classes.borderHighlight : classes.borderNormal)}>
                                {career.org.logo ? (
                                    <div className="org-logo-box">
                                        <img
                                            className="org-logo"
                                            src={career.org.logo}
                                        />
                                    </div>
                                ) : (
                                    <div className="org-replace-logo">
                                        {career.org.name[0]}
                                    </div>
                                )}
                                <div className={classes.companyInfoBox}>
                                    <div className="company-name">
                                        {career.org.name}
                                    </div>
                                    <div>
                                        {[career.dept, career.title].join(' ')}
                                    </div>
                                </div>
                                {career.length_month ? (
                                    <div className={classes.careerLength}>
                                        {Math.ceil(career.length_month / 12)}년차
                                    </div>
                                ) : null}
                            </div>
                        ))}
                        <div className={classes.headerDivider}>
                            키워드
                        </div>
                        {profile.keywords ? (
                            <div className={classes.keywordRow}>
                                {profile.keywords.map((keyword) => (
                                    <div className={classes.keywordBox}>
                                        {keyword.keyword}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div className={classes.headerDivider}>
                            소개글
                        </div>
                        <div className={classes.introBox}>
                            {profile.intro}
                        </div>
                        <div className={classes.headerDivider}>
                            감사의 말
                        </div>
                        <div className={classes.reviewSection}>
                            {reviews.map((review) => (
                                <ReviewBox
                                    reviewStr={review.publicComment}
                                    nickname={review.nickname}
                                    reviewDate={new Date(Date.parse(review.requestDate))}
                                />
                            ))}
                        </div>
                        <div
                            className={classes.betaButton}
                            onClick={onDownloadClick}
                        >
                            앱 다운 후 통화요청
                        </div>
                    </main>
                </div>
            </Paper>
        </div>
    );
};

export default ProfileDetail;
