import React from 'react';
import shareIcon from '../../../../assets/images/share_icon.png'
import calendarIcon from '../../../../assets/images/calendar_icon.png'
import paperIcon from '../../../../assets/images/paper_icon.png'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => {
    return {
        solutions: {
            width: '100%',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                paddingTop: 64,
                paddingBottom: 64,
            },
            [theme.breakpoints.up('sm')]: {
                paddingTop: 80,
                paddingBottom: 80,
            },
        },
        solutionHeader: {
            fontWeight: 'bold',
            [theme.breakpoints.down('sm')]: {
                fontSize: 24,
                marginBottom: 48,
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: 34,
                '& .mobile-break': {
                    display: 'none',
                },
                marginBottom: 64,
            },
            textAlign: 'center',
        },
        solutionDetailWrapper: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        solutionDetail: {
            [theme.breakpoints.up('sm')]: {
                width: 240,
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: 16,
            },
            [theme.breakpoints.down('sm')]: {
                width: 320,
                marginTop: 32,
            },
            display: 'flex',
        },
        shareIcon: {
            width: 36,
            height: 43,
        },
        calendarIcon: {
            width: 36,
            height: 36,
        },
        paperIcon: {
            position: 'relative',
            [theme.breakpoints.up('sm')]: {
                top: -4,
            },
            [theme.breakpoints.down('sm')]: {
                left: -4,
            },
            width: 50,
            height: 50,
        },
        solutionText: {
            width: 240,
            fontSize: 16,
            '& h2': {
                fontSize: 22,
            }
        },
        solutionQuote: {
            fontSize: 12,
            marginTop: 4,
            marginBottom: 4,
        },
        iconBox: {
            [theme.breakpoints.up('sm')]: {
                marginBottom: 16,
            },
            [theme.breakpoints.down('sm')]: {
                marginRight: 16,
            },
            width: 48,
            height: 48,
            overflow: 'hidden',
        },
        shareIconBox: {
            [theme.breakpoints.down('sm')]: {
                position: 'relative',
                left: 5,
            },
        },
        calendarIconBox: {
            [theme.breakpoints.down('sm')]: {
                position: 'relative',
                left: 5,
            },
        },
    }
});

const SolutionSection = () => {
    const classes = useStyles();
    
    return (
        <section className={classes.solutions}>
            <div className={classes.solutionHeader}>
                '묻다'는 사용자 중심의 빠르고 <br /> 효과적인 정보 공유 생태계를 <br className="mobile-break" /> 제공합니다
            </div>
            <div className={classes.solutionDetailWrapper}>
                <div className={classes.solutionDetail}>
                    <div className={clsx(classes.iconBox, classes.shareIconBox)}>
                        <img className={classes.shareIcon} src={shareIcon} alt="share icon" />
                    </div>
                    <div className={classes.solutionText}>
                        <h2>경험과 노하우를 공유하다</h2>
                        <div className={classes.solutionQuote}>"대화를 통해서만 얻을 수 있는 정보가 있습니다"</div>
                    </div>
                </div>
                <div className={classes.solutionDetail}>
                    <div className={clsx(classes.iconBox, classes.calendarIconBox)}>
                        <img className={classes.calendarIcon} src={calendarIcon} alt="calendar icon" />
                    </div>
                    <div className={classes.solutionText}>
                        <h2>즉각적으로 스케줄링하다</h2>
                        <div className={classes.solutionQuote}>"미팅을 오늘 당장 진행해 보세요"</div>
                    </div>
                </div>
                <div className={classes.solutionDetail}>
                    <div className={classes.iconBox}>
                        <img className={classes.paperIcon} src={paperIcon} alt="paper icon" />
                    </div>
                    <div className={classes.solutionText}>
                        <h2>검증된 정보만을 취급하다</h2>
                        <div className={classes.solutionQuote}>"정보원은 ‘묻다’가 검증한 현직자입니다"</div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SolutionSection;