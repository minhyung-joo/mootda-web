import { CircularProgress, makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import defaultAvatar from '../../assets/images/default_avatar.png';
import curiousIcon from '../../assets/images/curious.png';
import canAnswerIcon from '../../assets/images/can_answer.png';
import { CommentBox } from './components';

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
        postDetail: {
            backgroundColor: 'white',
            margin: 'auto',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 8,
            padding: 12,
        },
        topRow: {
            display: 'flex',
            alignItems: 'center',
            '& .profile-pic': {
                marginRight: 8,
                height: 24,
                width: 24,
                objectFit: 'cover',
                borderRadius: '50%',
            },
            marginBottom: 8,
        },
        subRow: {
            display: 'flex',
            marginBottom: 8,
            '& .time-str': {
                marginLeft: 'auto',
                fontSize: 10,
                color: 'rgba(0, 0, 0, 0.5)'
            }
        },
        heading: {
            fontWeight: 'bold',
            color: '#884DFF',
            marginBottom: 4,
        },
        mainQuestion: {
            paddingLeft: 16,
            overflow: 'hidden',
            wordBreak: 'break-all',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 3,
            '-webkit-box-orient': 'vertical',
        },
        reactionRow: {
            display: 'flex',
            marginTop: 8,
            borderTop: '1px solid rgba(200, 200, 200, 1)',
            paddingTop: 8,
            paddingBottom: 8,
        },
        keywordBox: {
            fontSize: 10,
            marginRight: 8,
            padding: 4,
            backgroundColor: 'rgba(240, 240, 240, 1)',
        },
        subQuestion: {
            display: 'flex',
            marginTop: 8,
            '& .label': {
                minWidth: 16,
                fontWeight: 'bold',
                color: '#884DFF',
            },
            '& .text': {
                overflow: 'hidden',
                wordBreak: 'break-all',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                '-webkit-line-clamp': 3,
                '-webkit-box-orient': 'vertical',
            },
        },
        reactionDiv: {
            width: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            '& img': {
                width: 40,
                height: 40,
                marginBottom: 4,
            },
            '& span': {
                fontWeight: 'bold',
                color: '#884DFF',
            }
        },
        betaButton: {
            marginTop: 8,
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
    }
})

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

const Post = ({ post, onDownloadClick }) => {
    const classes = useStyles()

    if (post == null) {
        return (
            <div className={classes.loading}>
                <div>
                    <CircularProgress />
                </div>
            </div>
        )
    }

    let timeStr = ''
    if (post) {
        const createdAt = Date.parse(post.created_at)
        const now = Date.now()
        const diff = now - createdAt
        if (diff < (1000 * 60 * 3)) {
            timeStr = '방금전'
        } else if (diff < (1000 * 60 * 60)) {
            timeStr = `${Math.ceil(diff / (1000 * 60))}분 전`
        } else if (diff < (1000 * 60 * 60 * 24)) {
            timeStr = `${Math.ceil(diff / (1000 * 60 * 60))}시간 전`
        } else {
            timeStr = `${Math.ceil(diff / (1000 * 60 * 60 * 24))}일 전`
        }
    }

    return <div className={classes.root}>
        <div className={classes.postDetail}>
            <div className={classes.topRow}>
                <img 
                    className="profile-pic" 
                    src={post.profile.profile_pic || defaultAvatar} 
                    alt="profile picture" 
                />
                <div className="nickname">
                    {post.profile.nickname || "익명 질문"}
                </div>
            </div>
            <div className={classes.subRow}>
                {post.keywords.map((entry) => {
                    return <div className={classes.keywordBox}>
                        {entry.keyword}
                    </div>
                })}
                <div className="time-str">
                    {timeStr}
                </div>
            </div>
            <div className={classes.heading}>
                대표 질문
            </div>
            <div className={classes.mainQuestion}>
                {post.question[0].question}
            </div>
            {post.question.length > 1 && post.question.slice(1).map((entry) => {
                return <div className={classes.subQuestion}>
                    <div className="label">
                        Q.
                    </div>
                    <div className="text">
                        {entry.question}
                    </div>
                </div>
            })}
            <div className={classes.reactionRow}>
                <div className={classes.reactionDiv}>
                    <img
                        src={curiousIcon}
                    />
                    <div className="stat">
                        저도 궁금해요 {post.curious_total > 0 && <span>+{post.curious_total}</span>}
                    </div>
                </div>
                <div className={classes.reactionDiv}>
                    <img
                        src={canAnswerIcon}
                    />
                    <div className="stat">
                        답변해줄래요 {post.answerer_total > 0 && <span>+{post.answerer_total}</span>}
                    </div>
                </div>
            </div>
            {post.comment.map((comment) => {
                return <>
                    <CommentBox
                        comment={comment}
                    />
                    {comment.child_comment.map((cc) => {
                        return <CommentBox
                            comment={comment}
                            isReply={true}
                        />
                    })}
                </>
            })}
            <div
                className={classes.betaButton}
                onClick={onDownloadClick}
            >
                앱 다운 후 댓글 달기
            </div>
        </div>
    </div>
}

export default Post
