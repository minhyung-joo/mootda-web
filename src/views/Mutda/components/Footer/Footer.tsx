import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logoImage from '../../../../assets/images/logo_white.png';
import fbIconSrc from '../../../../assets/images/fb_logo.png';
import linkedinIconSrc from '../../../../assets/images/linkedin_logo.png';
import blogIconSrc from '../../../../assets/images/blog_logo.png';
import { Image } from 'components/atoms';

const useStyles = makeStyles(theme => {
    return {
        footer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            backgroundColor: "#495057",
            [theme.breakpoints.down('sm')]: {
                padding: '64px 16px',
                paddingBottom: 48,
            },
            [theme.breakpoints.up('sm')]: {
                padding: 64,
            },
        },
        inquiryEmail: {
            fontSize: 16,
            '& span': {
                color: '#ADB5BD',
                marginRight: 16,
            },
            [theme.breakpoints.up('sm')]: {
            },
            color: '#868e96',
        },
        footerContainer: {
            display: 'flex',
            width: '100%',
            maxWidth: 1024,
            justifyContent: 'space-between',
            margin: 'auto',
            [theme.breakpoints.up('sm')]: {
                paddingBottom: 64,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            },
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        logoImage: {
            width: 118,
            height: 38.5,
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        snsContainer: {
            display: 'flex',
            width: '100%',
            maxWidth: 1024,
            margin: 'auto',
            alignItems: 'center',
            marginTop: 24,
        },
        fbIcon: {
            width: 30,
            height: 30,
            marginRight: 24,
            cursor: 'pointer',
        },
        linkedinIcon: {
            width: 36,
            height: 30,
            marginRight: 24,
            cursor: 'pointer',
        },
        blogIcon: {
            width: 30,
            height: 30,
            cursor: 'pointer',
        },
        infoContainer: {
            display: 'flex',
            width: '100%',
            maxWidth: 1024,
            margin: 'auto',
            marginTop: 24,
            color: '#868e96',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            }
        },
        infoString: {
            marginRight: 12,
            marginBottom: 12,
        },
        linkContainer: {
            display: 'flex',
            [theme.breakpoints.up('sm')]: {
                flexDirection: 'column',
            },
        },
        linkText: {
            color: '#ADB5BD',
            fontSize: 16,
            textDecoration: 'none',
            marginBottom: 12,
        },
        divider: {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                margin: '0 8px',
                color: 'rgba(255,255,255,0.15)',
            },
        },
        companyName: {
            width: '100%',
            maxWidth: 1024,
            margin: 'auto',
            marginTop: 24,
            color: '#868e96',
        },
        linkBold: {
            color: "#fff",
            fontWeight: 'bold',
        }
    };
});

const Footer = () => {
    const classes = useStyles();

    return (
        <section className={classes.footer}>
            <div className={classes.footerContainer}>
                <Image
                    className={classes.logoImage}
                    src={logoImage}
                    alt="mootda logo"
                    lazy={false}
                />
                <div className={classes.linkContainer}>
                    <a target="_blank" href="https://www.notion.so/e4e394eb41e2463e80127fb36814c0d1" className={classes.linkText}>
                        팀 소개
                    </a>
                    <div className={classes.divider}>
                        |
                    </div>
                    <a href="/profile/list" className={classes.linkText}>
                        <span className={classes.linkBold}>정보원 리스트</span>
                    </a>
                    <div className={classes.divider}>
                        |
                    </div>
                    <a href="/agent" className={classes.linkText}>
                        묻다 정보원
                    </a>
                </div>
                <div className={classes.linkContainer}>
                    <a target="_blank" href="https://www.notion.so/f2cf140b04ce42bf9022415fb392a703" className={classes.linkText}>
                        앱 사용 가이드
                    </a>
                    <div className={classes.divider}>
                        |
                    </div>
                    <a target="_blank" href="https://www.notion.so/36ecae745b814ed0bec4bea180e0e60e" className={classes.linkText}>
                        질문 작성 가이드
                    </a>
                    <div className={classes.divider}>
                        |
                    </div>
                    <a target="_blank" href="https://www.notion.so/e55b07de52a8418aa840b8e2dcf0946d" className={classes.linkText}>
                        <span className={classes.linkBold}>자주 묻는 질문</span>
                    </a>
                </div>
                <div className={classes.linkContainer}>
                    <a target="_blank" href="https://www.mootda.com/terms.html" className={classes.linkText}>
                        이용약관
                    </a>
                    <div className={classes.divider}>
                        |
                    </div>
                    <a target="_blank" href="https://www.notion.so/e4e394eb41e2463e80127fb36814c0d1" className={classes.linkText}>
                        팀 소개
                    </a>
                    <div className={classes.divider}>
                        |
                    </div>
                    <a target="_blank" href="https://www.mootda.com/privacy_policy.html" className={classes.linkText}>
                        개인정보처리방침
                    </a>
                    
                </div>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.inquiryEmail}>
                    <span>문의</span>hq@mootda.com
                </div>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.infoString}>
                    경기도 용인시 처인구 명지로 15-5 104-1604
                </div>
                <div className={classes.infoString}>
                    사업자 등록번호 : 384-88-02243
                </div>
                <div className={classes.infoString}>
                    대표 : 주민형
                </div>
                <div className={classes.infoString}>
                    대표전화 : 070-8624-7816
                </div>
            </div>
            <div className={classes.snsContainer}>
                <a href="https://www.facebook.com/mootdaKorea" target="_blank">
                    <Image
                        className={classes.fbIcon}
                        src={fbIconSrc}
                        alt="facebook icon"
                        lazy={false}
                    />
                </a>
                <a href="https://www.linkedin.com/company/72338251" target="_blank">
                    <Image
                        className={classes.linkedinIcon}
                        src={linkedinIconSrc}
                        alt="linkedin icon"
                        lazy={false}
                    />
                </a>
                <a href="https://blog.naver.com/cs_mootda" target="_blank">
                    <Image
                        className={classes.blogIcon}
                        src={blogIconSrc}
                        alt="naver blog icon"
                        lazy={false}
                    />
                </a>
            </div>
            <div className={classes.companyName}>
                주식회사 큐리어스원스
            </div>
        </section>
    );
};

export default Footer;
