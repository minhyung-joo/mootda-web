import React from 'react';
import Main from '../src/views/Main';
import BoardView from '../src/views/Board';

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

export async function getServerSideProps(context) {
    const response = await fetch(`${HOST}/v1/board/post/search/`)
    const data = await response.json()
    const initialPosts = data.posts
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        initialPosts
      }, // will be passed to the page component as props
    }
}

const Board = ({ initialPosts }) => {
    return <Main
        childProps={{
            initialPosts
        }}
        component={BoardView}
    />
};

export default Board;
