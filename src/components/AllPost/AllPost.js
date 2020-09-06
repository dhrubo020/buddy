import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';


const useStyles = makeStyles({

  root: {
    minWidth: 275,
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
  img: {
    padding: '2px 5px',
    borderRadius: '50%',
    float: 'left',
    marginRight: 10
  }
});

const AllPost = (props) => {
  const postDetails = props.data; // from Home.js
  const { id, title, body, image } = postDetails;
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root, classes.pos}>

        <CardContent>
          <img src={image} className={classes.img} height="40" alt="" />
          <small>@user{id}</small>

          <Typography variant="h5" component="h2">
            {title}
          </Typography>

          <br></br>
          <Typography variant="body2" color="textPrimary" component="p">
            {body}
          </Typography>
          <br />
          <Link to={`/post/${id}`}>
            <Button size="small" style={{ textDecoration: 'none', float: 'right' }}>Details</Button>
          </Link>
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

    </div>
  );
};

export default AllPost;