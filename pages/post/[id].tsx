import React from 'react';
import Main from '../../src/views/Main';
import PostView from '../../src/views/Post';

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

export async function getServerSideProps(context) {
    const id = context.params.id
    const response = await fetch(`${HOST}/v1/board/post/?id=${id}`)
    const data = await response.json()
    const post = data.post
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        post
      }, // will be passed to the page component as props
    }
}

const Post = ({ post }) => {    
    return <Main
        childProps={{
            post
        }}
        component={PostView}
    />
};

export default Post;
