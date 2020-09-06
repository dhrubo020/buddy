import React from 'react';

import { Link } from 'react-router-dom';

const NavList = (props) => {
    const allPost = props.data  // from App.js
    return (
        <div>
            <ol>
                {
                    allPost.map(each =>
                        <Link key={each.id} style={{textDecoration:'none'}} to={`/post/${each.id}`}>
                            <li key={each.id} style={{margin:'5px 0px', fontSize:'14px'}}>{each.title}</li>
                        </Link>
                    )
                }
            </ol>
        </div>
    );
};

export default NavList;