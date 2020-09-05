import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton, Container, Grid, Paper } from '@material-ui/core';
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

const PostDetails = (props) => {
    const { id } = useParams()
    console.log("details of ", id)
    const [nextId, setNextId] = useState(parseInt(id))
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        const comment_url = `https://jsonplaceholder.typicode.com/comments/?postId=${id}`
        fetch(comment_url)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.log("comment ", err))
    }, [id])

    useEffect(() => {
        const post_url = `https://jsonplaceholder.typicode.com/posts/${id}`
        fetch(post_url)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.log("post details ", err))
    }, [id])

    useEffect(() => {
        const commentsLength = 5;
        const image_url = `https://randomuser.me/api/?results=${commentsLength}&inc=picture`;
        fetch(image_url)
            .then(res => res.json())
            .then(data => setImages(data.results))
            .catch(err => console.log("image ", err))
    }, [nextId])

    const classes = useStyles();
    const { userId, title, body } = post;

    return (
        <div>
            <Link to={`/post/${nextId}`}>
                <div style={{ display: 'inline', float: 'left' }}>
                    <button onClick={() => setNextId(nextId + 1)}><ArrowBackRoundedIcon /></button>
                </div>
            </Link>
            <Link to={`/post/${nextId}`}>
                <div style={{ float: 'right' }}>
                    <button onClick={() => setNextId(nextId + 1)}><ArrowForwardRoundedIcon /></button>
                </div>
            </Link>

            <Container>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card className={classes.root, classes.pos}>
                                <CardContent>
                                    <img src="" alt="" />
                                    <small>@user{userId}</small>
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
                            <Comments comments={comments} images={images}></Comments>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default PostDetails;