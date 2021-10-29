import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { makeStyles, Paper, TextField } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            backgroundColor: 'rgba(102, 26, 255, 0.08)',
            minHeight: '100vh',
            paddingTop: 12,
        },
        passwordForm: {
            borderRadius: 4,
            backgroundColor: 'white',
            maxWidth: 400,
            padding: 12,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiFormControl-root': {
                marginBottom: 12,
            }
        },
        betaButton: {
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
        resetLabel: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 18,
            textAlign: 'center',
        },
        successMessage: {
            margin: 40,
            fontSize: 16,
        }
    }
})

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

const ResetPassword = (): JSX.Element => {
    const classes = useStyles()
    let { id } = useRouter().query;
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [passError, setPassError] = useState(null)
    const [repeatError, setRepeatError] = useState(null)
    const [success, setSuccess] = useState(false)

    const onSubmit = () => {
        if (password.length < 6) {
            setPassError("비밀번호를 6자리 이상 입력해주세요")
            return
        }

        if (password !== passwordRepeat) {
            setRepeatError("비밀번호가 일치하지 않습니다")
            return
        }

        fetch(`${HOST}/v1/user/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },        
            body: JSON.stringify({
                id: id,
                new_password: password,
            }),
        }).then((response) => {
            if (response.status === 200) {
                setSuccess(true)
            }
        })
    }

    return (
        <div>
            <Helmet>
                <title>비밀번호 재설정</title>
            </Helmet>
            <Paper elevation={0}>
                <div className={classes.root}>
                    <div className={classes.passwordForm}>
                        <div className={classes.resetLabel}>
                            비밀번호 재설정
                        </div>
                        {success ? (
                            <div className={classes.successMessage}>
                                비밀번호 재설정에 성공하였습니다. 새로운 비밀번호로 로그인 해주세요.
                            </div>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    label="새로운 비밀번호"
                                    variant="outlined"
                                    placeholder="새로운 비밀번호를 입력해주세요"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setPassError(null)
                                    }}
                                    autoComplete="off"
                                    error={passError !== null}
                                    helperText={passError}
                                    type="password"
                                />
                                <TextField
                                    fullWidth
                                    label="비밀번호 확인"
                                    variant="outlined"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    value={passwordRepeat}
                                    onChange={(e) => {
                                        setPasswordRepeat(e.target.value)
                                        setRepeatError(null)
                                    }}
                                    autoComplete="off"
                                    error={repeatError !== null}
                                    helperText={repeatError}
                                    type="password"
                                />
                                <div onClick={onSubmit} className={classes.betaButton}>
                                    비밀번호 설정
                                </div>
                            </>
                        )}
                        
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default ResetPassword;
