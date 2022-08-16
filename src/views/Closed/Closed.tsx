import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(102, 26, 255, 0.08)',
            padding: 24,
        },
        endMessageBox: {
            width: 400,
            height: 300,
            margin: 'auto',
            backgroundColor: 'white',
            border: '1px solid blue',
            padding: 12,
        },
        endHeader: {
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 24,
        },
        endText: {
            fontSize: 16,
        },
        logo: {
            width: 118,
            height: 38.5,
            marginBottom: 24,
        }
    }
})

const Closed = ({}): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.endMessageBox}>
                <img className={classes.logo} src="https://www.mootda.com/_next/static/images/logo-5e5e75f3b8c413f76587405e4adcf255.png" alt="logo" />
                <div className={classes.endHeader}>
                    서비스 종료 안내
                </div>
                <div className={classes.endText}>안녕하세요, 묻다입니다.<br /><br />
무거운 마음으로 서비스 종료 소식을 전합니다.<br />
묻다는 <b><u>2022년 9월 1일</u></b>부로 서비스를 종료하게 되었습니다.<br />
그 동안 묻다에 관심가져주신 모든분들께 진심으로 감사드립니다.<br />
문의는 hq@mootda.com 으로 연락주시기 바랍니다.
                </div>
            </div>
        </div>
    )
}

export default Closed;
