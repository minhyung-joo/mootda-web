import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import featureScreen from '../../../../assets/images/feature_screen.png';
import { Grid } from '@material-ui/core';
import { PostBox } from 'views/Board/components';
import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => {
    return {
        root: {
            padding: '64px 24px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(102, 26, 255, 0.08)',
            '& .loading-div': {
                height: 244,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        },
        header: {
            width: '100%',
            maxWidth: 1024,
            margin: 'auto',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 12
        },
        postGrid: {
            maxWidth: 1024,
            margin: 'auto',
        },
        buttonDiv: {
            margin: 'auto',
            marginTop: 24,
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
    }
})

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

const BoardSection = () => {
    const classes = useStyles();
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const handleListClick = () => {
        router.push('/board')
    }

    useEffect(() => { 
        fetch(`${HOST}/v1/board/post/search/`).then((response) => {
            response.json().then((resJson) => {
                setPosts(resJson.posts.slice(0, 6));
                setLoading(false);
            })
        }).catch((e) => {
            setLoading(false);
        });
    }, []);

    return <div className={classes.root}>
        <div className={classes.header}>
            지금 올라오는 질문들
        </div>
        <div className={classes.postGrid}>
            <Grid container spacing={2}>
                {posts.map((post) => {
                    return <Grid style={{padding: 8, marginBottom: -16}} xs={12} sm={6} md={4}>
                        <PostBox 
                            post={post}
                            onClick={() => {
                                window.open('/post/' + post.id)
                            }}
                        />
                    </Grid>
                })}
            </Grid>
        </div>
        <div className={classes.buttonDiv}>
            <div className={classes.betaButton} onClick={handleListClick}>
                질문 리스트 보기
            </div>
        </div>
    </div>
}

export default BoardSection
