import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import featureScreen from '../../../../assets/images/feature_screen.png';

const useStyles = makeStyles(theme => {
    return {
        feature: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                '& .feature-screen': {
                    width: 264,
                    height: 527.5,
                },
                paddingTop: 64,
                paddingBottom: 64,
            },
            [theme.breakpoints.up('sm')]: {
                '& .feature-screen': {
                    width: 302,
                    height: 603,
                },
                paddingTop: 80,
                paddingBottom: 80,
            },
            width: '100%',
            padding: '16px',
            zIndex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(102, 26, 255, 0.08)',
        },
        featureText: {
            marginTop: 8,
            textAlign: 'center',
            fontSize: 16,
        },
        featureTextWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                '& h3': {
                    fontSize: 28,
                    marginBottom: 16,
                    textAlign: 'center',
                },
                marginBottom: 40,
            },
            [theme.breakpoints.up('sm')]: {
                '& h3': {
                    fontSize: 40,
                    marginBottom: 32,
                    textAlign: 'center',
                },
                marginRight: 64,
            },
        },
        featureButton: {
            padding: '10px 20px',
            fontSize: 16,
            borderRadius: 4,
            backgroundColor: "#884DFF",
            color: "white",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            marginTop: 16
        }
    }
});

const FeatureSection = () => {
    const classes = useStyles();

    return (
        <section className={classes.feature}>
            <div className={classes.featureTextWrapper}>
                <h3>
                    통화는 밀도 있게 <br /> 효율적으로
                </h3>
                <div className={classes.featureText}>
                    궁금한 질문을 사전에 작성하여 답을 얻어가세요.
                </div>
                <a
                    target="_blank"
                    href="https://www.notion.so/f2cf140b04ce42bf9022415fb392a703"
                    className={classes.featureButton}
                >
                    앱 사용법 보기
                </a>
            </div>
            <img className="feature-screen" src={featureScreen} alt="미팅 요청 스크린" />
        </section>
    )
}

export default FeatureSection;