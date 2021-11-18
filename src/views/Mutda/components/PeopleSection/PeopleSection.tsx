import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import peopleScreen from '../../../../assets/images/people_screen.png';
import { Router } from '@material-ui/icons';
import { useHistory } from 'react-router';
import Link from 'next/link'

const useStyles = makeStyles(theme => {
    return {
        people: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
                '& .people-screen': {
                    width: 320,
                    height: 375.5,
                },
                paddingTop: 64,
                paddingBottom: 64,
            },
            [theme.breakpoints.up('sm')]: {
                '& .people-screen': {
                    width: 420,
                    height: 493,
                },
                paddingTop: 80,
                paddingBottom: 80,
            },
            width: '100%',
            padding: '16px',
            zIndex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F8F9FA',
        },
        peopleText: {
            textAlign: 'center',
            fontSize: 16,
        },
        peopleTextWrapper: {
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
                marginLeft: 64,
            },
        },
        agentButton: {
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

const PeopleSection = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <section className={classes.people}>
            <img className="people-screen" src={peopleScreen} alt="정보원 검증 스크린" />
            <div className={classes.peopleTextWrapper}>
                <h3>
                    ‘묻다’의 정보원이란
                </h3>
                <div className={classes.peopleText}>
                    취업 준비, 대학원 입시, 커리어 개발 관련<br />
                    노하우와 팁을 전수해줄 수 있는 경력자입니다
                </div>
                <Link href='/agent'>
                    <div
                        className={classes.agentButton}
                    >
                        더 알아보기
                    </div>
                </Link>
            </div>
        </section>
    );
}

export default PeopleSection;