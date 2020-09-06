import React from 'react';
import AllPost from '../AllPost/AllPost';


const Home = (props) => {
    const allPost = props.data; // from App.js
    return (
        <div>
            {
                allPost.map(each=> <AllPost data={each} key={each.id}/>)
            }
        </div>
    );
};

export default Home;