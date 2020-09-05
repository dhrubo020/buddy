import React from 'react';

import { Link } from 'react-router-dom';

const NavList = (props) => {
    const allPost = props.data
    return (
        <div>
            <ol>
                {
                    allPost.map(each =>
                        <Link style={{textDecoration:'none'}} to={`/post/${each.id}`}>
                            <li style={{margin:'5px 0px', fontSize:'14px'}}>{each.title}</li>
                        </Link>
                    )
                }
            </ol>
        </div>
    );
};

export default NavList;