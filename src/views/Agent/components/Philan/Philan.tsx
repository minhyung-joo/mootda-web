import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, colors, Grid, List, ListItem, ListItemText, useMediaQuery } from '@material-ui/core';
import { CardReview } from 'components/organisms';
import { IconAlternate } from 'components/molecules';

const reviews = [{
    feedback: '막연한 정보밖에 없었는데, 주어진 시간동안 정말 유용한 정보들을 친절하게 안내해주셔서 감사드립니다.',
  }, {
    feedback: '현직자의 입장에서 진솔한 정보 알수 있어 너무 좋았어요 :) 정보원님의 하루에 행운이 가득 깃들길 바랍니다!',
  }, {
    feedback: '인터넷에서 쉽게 찾을 수 있는 정보가 아닌, 현직자의 이야기를 직접 들을 수 있어 정말 좋았습니다. 면접에 정말 큰 도움이 되었습니다.',
  }
];

const useStyles = makeStyles(theme => {
    return {
        philan: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 24px',
            background: 'rgba(102, 26, 255, 0.08)'
        },
        card: {
            marginBottom: theme.spacing(2),
        },
        disablePadding: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        reviewGrid: {
            maxWidth: 1024,
        },
    }
});

const Philan = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <section className={classes.philan}>
            <h3>
                나의 경험이 누군가에겐<br />귀중한 정보가 될 수 있습니다
            </h3>
            <div className={classes.reviewGrid}>
                <Grid container spacing={isMd ? 4 : 2}>
                    {reviews.map((review: any, index: number) => (
                        <Grid
                            key={index}
                            item
                            container
                            alignItems="center"
                            direction="column"
                            xs={12}
                            md={4}
                        >
                            <CardReview
                                variant="outlined"
                                text={review.feedback}
                                icon={
                                    <IconAlternate
                                        color={colors.indigo}
                                        fontIconClass="fas fa-quote-right"
                                    />
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
                {/* <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                    {reviews.slice(0, 2).map((review, index) => (
                        <Card key={index} className={classes.card}>
                        <CardContent>
                            <List disablePadding>
                                <ListItem disableGutters className={classes.disablePadding}>
                                    <ListItemText primary={review.feedback} />
                                </ListItem>
                            </List>
                        </CardContent>
                        </Card>
                    ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                    {reviews.slice(2).map((review, index) => (
                        <Card key={index} className={classes.card}>
                        <CardContent>
                            <List disablePadding>
                                <ListItem disableGutters className={classes.disablePadding}>
                                    <ListItemText primary={review.feedback} />
                                </ListItem>
                            </List>
                        </CardContent>
                        </Card>
                    ))}
                    </Grid>
                </Grid> */}
            </div>
            <div style={{marginTop: 32, fontSize: 16, marginBottom: 12, textAlign: 'center'}}>
                <i>
                    베타테스터 분들의 후기에서 발췌하였습니다.
                </i>
            </div>
        </section>
    )
}

export default Philan;
