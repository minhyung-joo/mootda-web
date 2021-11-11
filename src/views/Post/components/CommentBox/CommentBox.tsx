import { makeStyles } from '@material-ui/core'
import React from 'react'
import defaultAvatar from '../../../../assets/images/default_avatar.png'
import { SubdirectoryArrowRight } from '@material-ui/icons'
import clsx from 'clsx'

const useStyles = makeStyles(theme => {
    return {
        replyPadding: {
            paddingLeft: 24,
        },
        root: {
            borderTop: '1px solid rgba(240, 240, 240, 1)',
            paddingTop: 8,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'column',
        },
        topRow: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 4,
            '& .profile-pic': {
                height: 24,
                width: 24,
                marginRight: 8,
                objectFit: 'cover',
                borderRadius: '50%',
            },
            '& .reply-arrow': {
                height: 16,
                width: 16,
                color: 'rgba(150, 150, 150, 1)'
            },
            '& .time-str': {
                marginLeft: 'auto',
                fontSize: 10,
                color: 'rgba(0, 0, 0, 0.5)'
            }
        },
        commentDiv: {

        }
    }
})

const CommentBox = ({comment, isReply = false}) => {
    const classes = useStyles()

    let timeStr = ''
    if (comment) {
        const createdAt = Date.parse(comment.created_at)
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

    return <div className={isReply ? clsx(classes.root, classes.replyPadding) : classes.root}>
        <div className={classes.topRow}>
            {isReply && <SubdirectoryArrowRight className="reply-arrow" />}
            <img 
                className="profile-pic" 
                src={comment.account.profile[0].profile_pic || defaultAvatar} 
                alt="profile picture" 
            />
            <div className="nickname">
                {comment.account.profile[0].nickname}
            </div>
            <div className="time-str">
                {timeStr}
            </div>
        </div>
        <div className={classes.commentDiv}>
            {comment.comment}
        </div>
    </div>
}

export default CommentBox
