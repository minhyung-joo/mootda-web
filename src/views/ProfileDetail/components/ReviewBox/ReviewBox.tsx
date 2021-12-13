import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => {
    return {
        root: {
            padding: 12,
            borderRadius: 8,
            boxShadow: '-3px 0px 6px 0 rgb(0 0 0 / 12%), inset -1px -2px 0 0 #dadce0',
            width: 360,
            display: 'inline-flex',
            flexDirection: 'column',
            marginRight: 12,
        },
        reviewStrDiv: {
            display: 'inline-block',
            width: '100%',
            minHeight: 60,
            maxHeight: 60,
            whiteSpace: 'break-spaces',
            overflow: 'auto',
            marginBottom: 8,
        },
        reviewerRow: {
            display: 'flex',
        },
        nicknameDiv: {
            marginRight: 'auto',
            color: 'rgba(0, 0, 0, 0.6)'
        },
        reviewDateDiv: {
            color: 'rgba(0, 0, 0, 0.6)'
        }
    }
})

const ReviewBox = ({ reviewStr, nickname, reviewDate }) => {
    const classes = useStyles()

    return <div className={classes.root}>
        <div className={classes.reviewStrDiv}>
            {reviewStr}
        </div>
        <div className={classes.reviewerRow}>
            <div className={classes.nicknameDiv}>
                {nickname}
            </div>
            <div className={classes.reviewDateDiv}>
                {`${reviewDate.getFullYear()}.${reviewDate.getMonth()}.${reviewDate.getDay()}`}
            </div>
        </div>
    </div>
}

export default ReviewBox
