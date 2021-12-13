import React from 'react';
import Main from '../../src/views/Main';
import ProfileDetailView from '../../src/views/ProfileDetail';

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

export async function getServerSideProps(context) {
    const id = context.params.id
    let response = await fetch(`${HOST}/v1/user/profile/?id=${id}`)
    const profileData = await response.json()
  
    if (!profileData) {
      return {
        notFound: true,
      }
    }

    response = await fetch(`${HOST}/v1/meeting/review/list/?profile_id=${id}`)
    const reviewData = await response.json()
    const reviews = reviewData["reviews"]
  
    return {
      props: {
        reviews,
        profile: profileData
      }, // will be passed to the page component as props
    }
}

const ProfileDetail = ({ profile, reviews }) => {
    return <Main
        childProps={{
            profile,
            reviews,
        }}
        component={ProfileDetailView}
    />
};

export default ProfileDetail;
