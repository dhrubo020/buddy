import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header'
import { makeStyles, Container, Grid, CircularProgress } from '@material-ui/core';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import NavList from './components/NavList/NavList';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  paper: {
    padding: '5px 10px',
    textAlign: 'left',
    marginBottom: 7,
    maxHeight: 520,
    overflow: 'auto',
    overflowStyle: 'none',
    scrollbar: 'none'
  },
  img:{
    borderRadius:'50%',
    margin:'8px 8px',
    '&:hover': {
      height: '80',
      transitionDuration: '1s'
    },
  },
}));


function App() {

  const [allPost, setAllPost] = useState([])
  const [images, setImages] = useState([]) // setting random image

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts/`;
    fetch(url)
      .then(res => res.json())
      .then(data => setAllPost(data))
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    const commentsLength = 100;
    const image_url = `https://randomuser.me/api/?results=${commentsLength}&inc=picture`;
    fetch(image_url)
      .then(res => res.json())
      .then(data => setImages(data.results))
      .catch(err => console.log("image ", err))
  }, [])

  images.map((each, index) => allPost[index].image = each.picture.medium)
  const moreFriends = images.slice(50,80);
  
  const classes = useStyles();
  return (
    <div className="">
      {
        allPost.length>0 ?
        <BrowserRouter>
          <Header></Header>
            <Container>
              <div className={classes.root} >
                <Grid container spacing={3}>

                  {/* left grid that shows post title like navigation */}
                  <Grid item xs={3}>
                    <div className={classes.paper}>
                      <NavList data={allPost} />
                    </div>
                  </Grid>

                    {/* middle grid that shows all post / details */}
                    <Grid item xs={6}>
                    <Switch>
                      {/* showing all post */}
                      <Route path="/" exact> <div className={classes.paper}> <Home  data={allPost}></Home> </div></Route>
                      {/* showing a post details and comments */}
                      <Route path="/post/:id" exact><div className={classes.paper}> <PostDetails/> </div></Route>
                      {/* showing not found page */}
                      <Route path="*"><div className={classes.paper}> <h1>404</h1> <p>Items Not Found</p> </div></Route>
                    </Switch>
                    </Grid>

                  {/* Right side grid that shows friends images */}
                  <Grid item xs={3}>
                    <h4>See More Friends</h4>
                    {
                      moreFriends.map((each,idx) => <img src={each.picture.medium} key={idx} className={classes.img} height="40" alt=""/>)
                    }
                  </Grid>
                </Grid>
              </div>
            </Container>
          </BrowserRouter>
          : <div style={{textAlign:'center'}}><CircularProgress/></div>
      }
          
    </div>
  );
}

export default App;
