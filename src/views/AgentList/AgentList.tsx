import { CircularProgress, CssBaseline, makeStyles, Paper, TextField, ThemeProvider } from '@material-ui/core';
import React, { useDebugValue, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import getTheme from 'theme';
import { Topbar } from 'views/Mutda/components';
import { Helmet } from "react-helmet";
import clsx from 'clsx';
import CategoryOverlay from './components/CategoryOverlay';

const useStyles = makeStyles(theme => {
    return {
        root: {
            width: '100%',
            '& .MuiToolbar-root': {
                boxShadow: '0 2px 6px 0 rgb(0 0 0 / 12%), inset 0 -1px 0 0 #dadce0',
            },
            backgroundColor: 'rgba(102, 26, 255, 0.08)',
            minHeight: '100vh',
        },
        profileList: {
            margin: 'auto',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            padding: 12,
        },
        searchBox: {
            marginTop: 64,
            marginBottom: 12,
            backgroundColor: 'white',
            borderRadius: 4,
            zIndex: 101
        },
        profileItem: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            top: 0,
            left: 0,
            border: '1px solid rgba(0, 0, 0, 0.12)',
            '& img': {
                maxWidth: 64,
                maxHeight: 64,
            },
            minHeight: 120,
            padding: 24,
            backgroundColor: 'white',
            marginBottom: 12,
            borderRadius: 8,
        },
        imgBox: {
            position: 'relative',
            top: 0,
            left: 0,
            width: 64,
            height: 64,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 24,
            '& .org-replacement-logo': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: 'rgba(102, 26, 255, 0.5)',
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
            },
            '& .org-logo': {
                width: 64,
                height: 64,
                objectFit: 'contain',
            },
            '& .profile-pic': {
                width: 24,
                height: 24,
                objectFit: 'cover',
                borderRadius: '50%',
                position: 'absolute',
                top: 0,
                left: 40,
            },
        },
        detailBox: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: 'auto',
        },
        keywordRow: {
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            marginBottom: '-4px',
        },
        keywordBox: {
            fontSize: 12,
            border: '0.5px solid rgba(0, 0, 0, 0.12)',
            padding: '2px 4px',
            borderRadius: '4px',
            marginRight: '4px',
            marginBottom: '4px',
        },
        companyName: {
            fontWeight: 'bold',
            fontSize: 16,
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
        requestBox: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 24,
            marginBottom: 12,
            borderRadius: 8,
            '& .agent-request-label': {
                marginBottom: 12,
            }
        },
        loadingOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: '100vw',
            height: '100vh',
            zIndex: 99,
            '& .progress-div': {
                margin: 'auto',
            },
            display: 'flex',
            alignItems: 'center',
        }
    }
});

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

const AgentList = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allLoaded, setAllLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [lastQuery, setLastQuery] = useState('');
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(null);
    const [categoryOpen, setCategoryOpen] = useState(false);

    useEffect(() => {
        fetch(`${HOST}/v1/user/profile/search/`,).then((response) => {
            response.json().then((resJson) => {
                setProfiles(resJson.profiles);
                setLoading(false);
            })
        }).catch((e) => {
            setLoading(false);
        });
    }, []);

    const onProfileClick = (id) => {
        window.open('/profile/' + id)
        //history.push('/profile/' + id);
    }

    const onLoadMoreClick = () => {
        setLoading(true);
        if (query === '' && category === null) {
            fetch(`${HOST}/v1/user/profile/search/?page=${page + 1}`).then((response) => {
                response.json().then((resJson) => {
                    if (resJson.profiles.length === 0) {
                        setAllLoaded(true);
                    } else {
                        setProfiles(profiles.concat(resJson.profiles));
                        setPage(page + 1);
                    }

                    setLoading(false);
                })
            }).catch((e) => {
                setLoading(false);
            });
        } else if (query === lastQuery) {
            fetch(`${HOST}/v1/user/profile/search/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },        
                body: JSON.stringify({
                    page: page + 1,
                    search_word: query,
                    category: category,
                }),
            }).then((response) => {
                response.json().then((resJson) => {
                    if (resJson.profiles.length === 0) {
                        setAllLoaded(true)
                    } else {
                        setProfiles(profiles.concat(resJson.profiles));
                        setPage(page + 1);
                    }
                    
                    setLoading(false);
                })
            }).catch((e) => {
                setLoading(false);
            });
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            setLoading(true);
            setCategoryOpen(false);
            setAllLoaded(false);
            if (query === '' && category === null) {
                fetch(`${HOST}/v1/user/profile/search/`,).then((response) => {
                    response.json().then((resJson) => {
                        setProfiles(resJson.profiles);
                        setLoading(false);
                    })
                }).catch((e) => {
                    setLoading(false);
                });
            } else {
                fetch(`${HOST}/v1/user/profile/search/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },        
                    body: JSON.stringify({
                        page: 1,
                        search_word: query,
                        category: category
                    }),
                }).then((response) => {
                    response.json().then((resJson) => {
                        setProfiles(resJson.profiles);

                        if (resJson.profiles.length < 10) {
                            setAllLoaded(true);
                        }
                        
                        setPage(1);
                        setLoading(false);
                        setLastQuery(query);
                    })
                }).catch((e) => {
                    setLoading(false);
                })
            }
        }
    }

    const handleRequestButton = () => {
        window.open('https://docs.google.com/forms/d/1rTmwJo1Zby0yGq-fINQiKI5SOh9enEltlGcem6VNua4', '_blank');
    }

    const handleCategoryClick = (category) => {
        if (category === '전체') {
            setCategory(null);
        } else {
            setCategory(category);
        }

        setCategoryOpen(false);
        // Send API

        setLoading(true);
        setAllLoaded(false);
        setQuery('');

        const body: any = {
            page: 1,
            search_word: query,
        }

        if (category !== "전체") {
            body.category = category
        }

        fetch(`${HOST}/v1/user/profile/search/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },        
            body: JSON.stringify(body),
        }).then((response) => {
            response.json().then((resJson) => {
                setProfiles(resJson.profiles);

                if (resJson.profiles.length < 10) {
                    setAllLoaded(true);
                }
                
                setPage(1);
                setLoading(false);
                setLastQuery(query);
            })
        }).catch((e) => {
            setLoading(false);
        })
    }

    const filteredProfiles = profiles ? profiles.filter((p) => p.careers.length) : [];

    return (
        <div>
            <Helmet>
                <title>묻다 - 정보원 리스트</title>
                <link rel="canonical" href="https://www.mootda.com/profile/list" />
                <meta
                    property="og:title"
                    content="묻다 - 정보원 리스트"
                />
                <meta
                    property="og:description"
                    content="다양한 회사와 직무의 현직자를 지금 바로 통화로 만나보세요!"
                />
                <meta
                    name="description"
                    content="다양한 회사와 직무의 현직자를 지금 바로 통화로 만나보세요!"
                />
            </Helmet>
            {categoryOpen ? <CategoryOverlay 
                currentCategory={category === null ? '전체' : category}
                onOutsideClick={() => setCategoryOpen(false)}
                onCategoryClick={handleCategoryClick}
            /> : null}
            <div className={clsx(classes.root, 'image-crisp')}>
                {loading ? (
                    <div className={classes.loadingOverlay}>
                        <div className="progress-div">
                            <CircularProgress />
                        </div>
                    </div>
                ) : null}
                <main className={classes.profileList}>
                    <div className={classes.searchBox}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="프로필 검색"
                            variant="outlined"
                            placeholder="회사 이름, 산업, 직무를 검색해보세요!"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            onClick={() => setCategoryOpen(true)}
                            autoComplete="off"
                        />
                    </div>
                    {filteredProfiles.map((profile) => (
                        <div className={classes.profileItem} onClick={() => onProfileClick(profile.id)}>
                            <div className={classes.imgBox}>
                                {profile.careers[0].org.logo ? (
                                    <img
                                        className="org-logo"
                                        src={profile.careers[0].org.logo}
                                    />
                                ) : (
                                    <div className="org-replacement-logo">
                                        {profile.careers[0].org.name[0]}
                                    </div>
                                )}
                                {profile.profile_pic ? (
                                    <img
                                        className="profile-pic"
                                        src={profile.profile_pic}
                                    />
                                ) : null}
                            </div>
                            <div className={classes.detailBox}>
                                <div>
                                    {profile.nickname}
                                </div>
                                <div className={classes.companyName}>
                                    {profile.careers[0].org.name}
                                </div>
                                <div>
                                    {[profile.careers[0].dept, profile.careers[0].title].join(' ')}
                                </div>
                                {profile.keywords ? (
                                    <div className={classes.keywordRow}>
                                        {profile.keywords.map((keyword) => (
                                            <div className={classes.keywordBox}>
                                                {keyword.keyword}
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                    {!allLoaded ? (
                        <div className={classes.betaButton} onClick={onLoadMoreClick}>
                            더 보기
                        </div>
                    ) : (
                        <div className={classes.requestBox}>
                            <div className="agent-request-label">
                                찾고 계신 정보원이 없으신가요?
                            </div>
                            <div className={classes.betaButton} onClick={handleRequestButton}>
                                정보원 섭외 요청
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default AgentList;