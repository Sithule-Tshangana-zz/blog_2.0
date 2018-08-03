var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");


// can import code directly from file
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'News Trendz' , posts:posts.posts, logged_in: false});
});

/* GET New sign up page page. */
router.get('/sign_up', function (req, res, next) {
  res.render('sign_up', { title: 'Sign up', posts: posts.posts});
});
/* GET login page page. */
router.get('/log_in', function (req, res, next) {
  res.render('log_in', { title: 'Sign up', posts: posts.posts, message: false});
});
/* GET subscribe page page. */
router.get('/subscribe', function (req, res, next) {
  res.render('subscribe', { title: 'Sign up', posts: posts.posts, message: false});
});

/* GET New blog page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'New Article', posts: posts.posts});
});
// Get contact page
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'New Article', posts: posts.posts});
});
/* GET archive page. */
router.get('/archive', function (req, res, next) {
  res.render('archive', { title: 'New Article', posts: posts.posts});
});
module.exports = router;

// get single page to view whole post
router.get('/view/:id', function (req, res, next) {
  var id = req.params.id;
  var data = posts.posts[id-1];
  res.render('view', { title: 'View', posts: data});
});

/* GET New blog page. */
router.post('/new', function (req, res, next) {

// create variable to post
  var obj = {
    "title": req.body.title,
    "author": req.body.author,
    "image": req.body.image,
    "date": req.body.date,
    "content": req.body.content,
    "summary": req.body.summary,
  }
  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/posts',
    body:obj,
    json:true
  },function(error,responsive,body){
    res.redirect('/');
  });

});

/* ContactUs page. */
router.get('/contactUs', function (req, res, next) {
  res.render('contactUs', { title});
});

// UPDATE ROUTES
router.get('/update/:id', function(req, res, next) {

 //make a post request to our database
 request({
 uri: "http://localhost:8000/posts/" + req.params.id,
 method: "GET",
 }, function(error, response, body) {
     console.log(JSON.parse(body));
     //send a response message
     res.render('update', {message: false, posts: JSON.parse(body)});
 });

});

router.post('/update/:id', function(req, res, next) {
 request({
   uri: "http://localhost:8000/posts/" + req.params.id,
 method: "PATCH",
 form: {
     title: req.body.title,
     content: req.body.content,
     author: req.body.author
 }
 }, function(error, response, body) {
     // console.log(body);
     //send a response message
     res.render('update', {message: 'Successfully Changed.', posts: JSON.parse(body)});
 });
});
//DELETE BUTTON
router.get('/delete/:id', function(req, res, next) {
 console.log(req.params.id)

request({
 uri: "http://localhost:8000/posts/"  + req.params.id,
 method: "DELETE",
 }, function(error, response, body) {

     let data = {
         message: 'Successfully Removed.',
     }

     res.redirect('/');
 });
});
/* GET subscribe page. */
router.post('/sign_up', function (req, res, next) {

// gets the last user id and adds 1 to giev a hiugher id
  var id = posts.users[posts.users.length-1].id + 1;

// create variable to post
  var obj = {
    "id": req.body.id,
    "user": req.body.user,
    "email": req.body.email,
    "password": req.body.password,
  }
  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/users',
    body:obj,
    json:true
  },
  function(error,responsive,body){
    res.redirect('/');
  });

});

// logging in page
router.post('/sign_in',function(req,res,next){
  var users = posts.users;
  console.log(users);

  var username = req.body.username;
  var password = req.body.password;

  for (let i in users) {
    console.log(username);
    if (username == users[i].user && password == users[i].password) {
        res.render('index', { title: 'Sign up', posts: posts.posts, message: false, logged_in: true});
    }else{
        res.render('log_in', { title: 'Sign up', posts: posts.posts, message: "Login unsuccessful, username or password incorrect!"});
    }
  }
});
/* GET subscribe page. */
router.post('/subscribe', function (req, res, next) {

// create variable to post
  var obj = {
    "name":req.body.name,
    "email": req.body.email
  }
  //write logic that saves this data
  request.post({
    url:'http://localhost:8000/subscribe',
    body:obj,
    json:true
  },
  function(error,responsive,body){
    res.redirect('/');
  });

});

module.exports = router;
