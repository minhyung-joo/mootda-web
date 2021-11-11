import { makeStyles } from '@material-ui/core';
import React from 'react';
import defaultAvatar from '../../../../assets/images/default_avatar.png';
import { Comment } from '@material-ui/icons'

const useStyles = makeStyles(theme => {
    return {
        root: {
            padding: 16,
            borderRadius: 8,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 16,
            border: '1px solid rgba(0, 0, 0, 0.12)',
        },
        topRow: {
            display: 'flex',
            alignItems: 'center',
            '& .profile-pic': {
                height: 24,
                width: 24,
                marginRight: 8,
                objectFit: 'cover',
                borderRadius: '50%',
            },
            '& .time-str': {
                marginLeft: 'auto',
                fontSize: 10,
                color: 'rgba(0, 0, 0, 0.5)'
            },
            marginBottom: 8,
        },
        questionRow: {
            overflow: 'hidden',
            wordBreak: 'break-all',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 3,
            '-webkit-box-orient': 'vertical',
        },
        moreRow: {
            marginTop: 4,
            textAlign: 'center',
            fontSize: 12,
        },
        keywordRow: {
            display: 'flex',
            marginTop: 8,
            '& .keyword-box': {
                fontSize: 10,
                marginRight: 8,
                padding: 4,
                backgroundColor: 'rgba(240, 240, 240, 1)',
            }
        },
        bottomRow: {
            display: 'flex',
            marginTop: 8,
            alignItems: 'center',
        },
        reactionDiv: {
            width: 100,
            fontSize: 12,
            '& span': {
                fontWeight: 'bold',
                color: '#884DFF',
            }
        },
        commentDiv: {
            marginLeft: 'auto',
            '& .comment-icon': {
                width: 12,
                height: 12,
            }
        }
    }
})

const PostBox = ({ post, onClick }) => {
    const classes = useStyles()
    const createdAt = Date.parse(post.created_at)
    let timeStr = ''
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

    return <div className={classes.root} onClick={onClick}>
        <div className={classes.topRow}>
            <img 
                className="profile-pic" 
                src={post.profile.profile_pic || defaultAvatar} 
                alt="profile picture" 
            />
            <div className="nickname">
                {post.profile.nickname || "익명"}
            </div>
            <div className="time-str">
                {timeStr}
            </div>
        </div>
        <div className={classes.questionRow}>
            Q. {post.question[0].question}
        </div>
        {post.question.length > 1 && <div className={classes.moreRow}>
            + {post.question.length - 1}개 질문
        </div>}
        {post.keywords && <div className={classes.keywordRow}>
            {post.keywords.map((entry) => {
                return <div className="keyword-box">
                    {entry.keyword}
                </div>
            })}
        </div>}
        {(post.curious || post.answerer || post.comment) && <div className={classes.bottomRow}>
            {post.curious_total > 0 && <div className={classes.reactionDiv}>
                궁금해요 <span>{post.curious_total}</span>
            </div>}
            {post.answerer_total > 0 && <div className={classes.reactionDiv}>
                대답해줄래요 <span>{post.answerer_total}</span>
            </div>}
            {post.comment_total > 0 && <div className={classes.commentDiv}>
                <Comment className="comment-icon" /> {post.comment_total}
            </div>}
        </div>}
    </div>
}

export default PostBox
