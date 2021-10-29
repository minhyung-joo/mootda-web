import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SwiperImage } from 'components/molecules';
import pitch1 from '../../../../assets/images/pitch_1.png';
import pitch2 from '../../../../assets/images/pitch_2.png';
import pitch3 from '../../../../assets/images/pitch_3.png';

const ratio1 = Math.min(300 / 578, 585 / 1136);
const ratio2 = Math.min(300 / 580, 585 / 1142);
const ratio3 = Math.min(300 / 588, 585 / 1128);

const useStyles = makeStyles(theme => {
    return {
        pitch: {
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 60,
        },
        img1: {
            width: 578 * ratio1,
            height: 1136 * ratio1,
            margin: 'auto',
        },
        img2: {
            width: 580 * ratio2,
            height: 1142 * ratio2,
            margin: 'auto',
        },
        img3: {
            width: 588 * ratio3,
            height: 1128 * ratio3,
            margin: 'auto',
        },
    }
});

const Pitch = () => {
    const classes = useStyles();

    return (
        <section className={classes.pitch}>
            <h3>
                묻다 네트워크와<br />함께 하실 정보원을 찾습니다!
            </h3>
            <SwiperImage
                style={{
                    maxWidth: 300,
                    maxHeight: 585
                }}
                items={[{
                    src: pitch1,
                    alt: '...',
                    className: classes.img1
                }, {
                    src: pitch2,
                    alt: '...',
                    className: classes.img2
                }, {
                    src: pitch3,
                    alt: '...',
                    className: classes.img3
                }]}
            />
        </section>
    )
}

export default Pitch;
