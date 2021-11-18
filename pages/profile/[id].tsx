import React from 'react';
import Main from '../../src/views/Main';
import ProfileDetailView from '../../src/views/ProfileDetail';

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

export async function getServerSideProps(context) {
    const id = context.params.id
    const response = await fetch(`${HOST}/v1/user/profile/?id=${id}`)
    const data = await response.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        profile: data
      }, // will be passed to the page component as props
    }
}

const ProfileDetail = ({ profile }) => {
    return <Main
        childProps={{
            profile
        }}
        component={ProfileDetailView}
    />
};

export default ProfileDetail;
