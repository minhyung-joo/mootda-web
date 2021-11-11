import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, TextField } from '@material-ui/core';
import { PostBox } from './components';

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
        postList: {
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
            padding: 12,
            marginBottom: 12,
            borderRadius: 8,
            '& .download-label': {
                marginBottom: 12,
            }
        },
    }
})

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

const Board = ({ initialPosts, onDownloadClick }) => {
    const classes = useStyles()

    const [lastQuery, setLastQuery] = useState('');
    const [category, setCategory] = useState(null);
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [allLoaded, setAllLoaded] = useState(false)
    const [posts, setPosts] = useState(initialPosts)
    const [page, setPage] = useState(1);

    const onLoadMoreClick = () => {
        setLoading(true);
        fetch(`${HOST}/v1/board/post/search/?page=${page + 1}`).then((response) => {
            response.json().then((resJson) => {
                if (resJson.posts.length === 0) {
                    setAllLoaded(true);
                } else {
                    setPosts(posts.concat(resJson.posts));
                    setPage(page + 1);
                }

                setLoading(false);
            })
        }).catch((e) => {
            setLoading(false);
        });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            setLoading(true);
            setAllLoaded(false);
            if (query === '' && category === null) {
                fetch(`${HOST}/v1/user/profile/search/`,).then((response) => {
                    response.json().then((resJson) => {
                        setPosts(resJson.posts);
                        setLoading(false);
                    })
                }).catch((e) => {
                    setLoading(false);
                });
            } else {
                fetch(`${HOST}/v1/user/profile/search/?search_word=${query}`).then((response) => {
                    response.json().then((resJson) => {
                        setPosts(resJson.posts);

                        if (resJson.posts.length < 10) {
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

    console.log(allLoaded);

    return <div className={clsx(classes.root, 'image-crisp')}>
        <main className={classes.postList}>
            <div className={classes.searchBox}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="질문 검색"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    autoComplete="off"
                />
            </div>
            {posts.map((post) => {
                return <PostBox 
                    post={post}
                    onClick={() => {
                        window.open('/post/' + post.id)
                    }}
                />
            })}
            {!allLoaded ? <div className={classes.betaButton} onClick={onLoadMoreClick}>
                더 보기
            </div> : <div className={classes.requestBox}>
                <div className="download-label">
                    찾는 내용이 없으신가요?
                </div>
                <div className={classes.betaButton} onClick={onDownloadClick}>
                    앱에서 질문 올리기
                </div>
            </div>}
        </main>
    </div>
}

export default Board;
