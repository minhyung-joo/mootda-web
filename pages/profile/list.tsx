import React from 'react';
import Main from '../../src/views/Main';
import AgentListView from '../../src/views/AgentList';

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

export async function getServerSideProps(context) {
    const response = await fetch(`${HOST}/v1/user/profile/search/`)
    const data = await response.json()
    const initialProfiles = data.profiles
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
        initialProfiles
      }, // will be passed to the page component as props
    }
}

const AgentList = ({ initialProfiles }) => {    
    return <Main
        childProps={{
            initialProfiles
        }}
        component={AgentListView}
    />
};

export default AgentList;
