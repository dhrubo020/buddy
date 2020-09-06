import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton, Container, Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Comments from '../Comments/Comments';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 20,
        boxShadow: '5px 5px 10px gray',
    },
});

const PostDetails = () => {
    let { id } = useParams() //from App.js router

    //
    let user = parseInt(id);
    if (user < 1 || user > 100) {
        document.location.href = "/NotFound";
    }
    //console.log("details of ", id,user)

    const [nextId, setNextId] = useState(parseInt(id))
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        const comment_url = `https://jsonplaceholder.typicode.com/comments/?postId=${id}`
        fetch(comment_url)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        const post_url = `https://jsonplaceholder.typicode.com/posts/${id}`
        fetch(post_url)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        const commentsLength = 5;
        const image_url = `https://randomuser.me/api/?results=${commentsLength}&inc=picture`;
        fetch(image_url)
            .then(res => res.json())
            .then(data => setImages(data.results))
            .catch(err => console.log(err))
    }, [id])

    const classes = useStyles();
    const { title, body } = post;

    const nextClick = (clickedId) => {
        if (clickedId < 100) {
            setNextId(clickedId + 1);
            id = clickedId + 1;
        } else {
            setNextId(1)
        }
    }
    const previousClick = (clickedId) => {
        if (clickedId > 1) {
            setNextId(clickedId - 1);
            id = clickedId - 1;
        } else {
            setNextId(100)
        }
    }

    //console.log("nextid ", nextId, comments.length, images.length);

    return (
        <div>

            <Link to={`/post/${nextId}`}>
                <div style={{ display: 'inline', float: 'left' }}>
                    <Button onClick={() => previousClick(nextId)}><ArrowBackRoundedIcon /></Button>
                </div>
            </Link>
            <Link to={`/post/${nextId}`}>
                <div style={{ float: 'right' }}>
                    <Button onClick={() => nextClick(nextId)}><ArrowForwardRoundedIcon /></Button>
                </div>
            </Link>

            <Container>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {/* showing details and comments */}
                        <Grid item xs={12}>
                            {/* this card for showing details only */}
                            <Card className={classes.root, classes.pos}>
                                <CardContent>
                                    <img src="" alt="" />
                                    <small>@user{id}</small>
                                    <Typography variant="h5" component="h2">
                                        {title}
                                    </Typography>
                                    <br></br>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        {body}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="like">
                                        <ThumbUpAltIcon />
                                    </IconButton>
                                    <IconButton aria-label="comment">
                                        <ChatBubbleIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>

                                </CardActions>
                            </Card>
                            {/* showing comments */}
                            {
                                comments.length > 0 ? <Comments comments={comments} images={images}></Comments> : <h1>Loading....</h1>
                            }
                        </Grid>
                    </Grid>
                </div>
            </Container>

        </div>
    );
};

export default PostDetails;