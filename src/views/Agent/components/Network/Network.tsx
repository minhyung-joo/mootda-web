import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from 'components/atoms';
import { Grid } from '@material-ui/core';
import agricoleLogo from '../../../../assets/images/agricole_logo.png';
import boaLogo from '../../../../assets/images/boa_logo.png';
import bloombergLogo from '../../../../assets/images/bloomberg_logo.png';
import celltrionLogo from '../../../../assets/images/celltrion_logo.png';
import hantuLogo from '../../../../assets/images/hantu_logo.png';
import kearneyLogo from '../../../../assets/images/kearney_logo.png';
import macquerieLogo from '../../../../assets/images/macquerie_logo.png';
import naverLogo from '../../../../assets/images/naver_logo.png';
import pngLogo from '../../../../assets/images/p&g_logo.png';
import samsungBioLogo from '../../../../assets/images/samsung_bio_logo.png';
import samsungLogo from '../../../../assets/images/samsung_logo.png';
import skEnergyLogo from '../../../../assets/images/sk_energy_logo.png';
import clsx from 'clsx';

const logos = [
    {
      src: agricoleLogo,
      width: 426,
      height: 88,
    },
    {
        src: boaLogo,
        width: 508,
        height: 61,
    },
    {
        src: celltrionLogo,
        width: 452,
        height: 160,
    },
    {
        src: hantuLogo,
        width: 452,
        height: 64,
    },
    {
        src: kearneyLogo,
        width: 425,
        height: 53,
    },
    {
        src: macquerieLogo,
        width: 476,
        height: 95,
    },
    {
        src: samsungLogo,
        width: 316,
        height: 106,
    },
    {
        src: skEnergyLogo,
        width: 291,
        height: 137,
    },
    {
        src: bloombergLogo,
        width: 505,
        height: 95,
    },
    {
        src: naverLogo,
        width: 341,
        height: 66,
    },
    {
        src: pngLogo,
        width: 201,
        height: 88,
    },
    {
        src: samsungBioLogo,
        width: 362,
        height: 145,
    },
]

const useStyles = makeStyles(theme => {
    return {
        network: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 24px',
        },
        reviewGrid: {
            maxWidth: 1024,
        },
        logoImg: {
            margin: 'auto',
        },
        gridCell: {
            display: 'flex',
            minHeight: 90,
        },
        finalAction: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 64,
            paddingBottom: 64,
            backgroundColor: '#F8F9FA'
        },
        finalActionDiv: {
            maxWidth: 1024,
            margin: 'auto',
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
        buttonDiv: {
            display: 'flex',
            marginTop: 24,
            '& .left-margin': {
                marginLeft: 24,
            }
        }
    }
});

const Network = ({ onDownloadClick }) => {
    const classes = useStyles();

    return (
        <section className={classes.network}>
            <h3>
                묻다 네트워크의 혜택을 누리세요!
            </h3>
            <div className={classes.reviewGrid}>
                <Grid container spacing={2}>
                    {logos.map((logo) => {
                        const factor = 150 / logo.width;
                        return <Grid item xs={6} md={3} className={classes.gridCell}>
                                <Image
                                    style={{
                                        width: logo.width * factor,
                                        height: logo.height * factor,
                                    }}
                                    className={classes.logoImg}
                                    src={logo.src}
                                    alt={'...'}
                                    lazy={false}
                                />
                            </Grid>
                    })}
                </Grid>
            </div>
            <div style={{marginTop: 32, fontSize: 16, marginBottom: 12, textAlign: 'center'}}>
                정보원님의 성장은 곧 묻다의 성장입니다.<br />
                활동량에 따른 수익 혜택 및 네트워킹 이벤트를 제공합니다.<br />
                지금 바로 앱에서 가입해보세요!
            </div>
            <div className={classes.buttonDiv}>
                <a target="_blank" href="/profile/list" className={classes.betaButton}>
                    정보원 리스트
                </a>
                <div onClick={onDownloadClick} className={clsx(classes.betaButton, "left-margin")}>
                    묻다 다운로드
                </div>
            </div>
        </section>
    )
}

export default Network;
