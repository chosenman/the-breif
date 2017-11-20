var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var session = require('express-session');
var port = 8020;

// Google auth
  var CLIENT_ID = "273487283165-bqorn91iag31tck4dejddojqhskllsvs.apps.googleusercontent.com"
  var GoogleAuth = require('google-auth-library');
  var auth = new GoogleAuth;
  var client = new auth.OAuth2(CLIENT_ID, '', '');




var app = express();

app.use(express.static(path.join(__dirname + "/static")));
app.set('views', path.join(__dirname, './views'));
app.use(session({secret: 'S5oD42iH_ng-d3j!or2JO9cK8s'}));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get('/',function(req, res){

  // if(!req.session.userId) {
  //   var needUser = true;
  // }

  res.render('index',{})
})

app.post('/tokensignin',function(req, res){
  var token = req.body.idtoken;
  console.log(token);
  client.verifyIdToken(
      token,
      CLIENT_ID,
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
      function(e, login) {
        var payload = login.getPayload();
        var userid = payload['sub'];
        console.log("user Id: " + userid);
        // If request specified a G Suite domain:
        //var domain = payload['hd'];
        res.status(200).send('Logged in successfully');
      });



})

var server = app.listen(port, function(){
  console.log("listening on port " + port);
})
