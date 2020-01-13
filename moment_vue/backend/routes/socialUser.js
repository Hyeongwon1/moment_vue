var express = require("express");
var router = express.Router();
var Request = require('request-promise-native')
var pool = require("./mysqlConn");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("./config");
const secret = config.secret; //비빌번호 해쉬키


router.post('/auth/:provider', function(req, res){
  console.log(req.params.provider)
  switch(req.params.provider) {
    // case 'github':
    //   githubAuth(req, res)
    //   break
    // case 'facebook':
    //   facebookAuth(req, res)
    //   break
    case 'google':
      googleAuth(req, res)
      break
    // case 'twitter':
    //   twitterAuth(req, res)
    //   break
    // case 'instagram':
    //   instagramAuth(req, res)
    //   break
    // case 'bitbucket':
    //   bitbucketAuth(req, res)
    //   break
    // case 'linkedin':
    //   linkedinAuth(req, res)
    //   break
    // case 'live':
    //   liveAuth(req, res)
    //   break
    // case 'login':
    //   loginAuth(req, res)
    //   break
    // case 'register':
    //   registerAuth(req, res)
    //   break
    // case 'logout':
    //   logoutAuth(req, res)
    //   break
  }
});

function googleAuth(req, res) {
  Request({
    method: 'post',
    url: 'https://accounts.google.com/o/oauth2/token',
    form: {
      code: req.body.code,
      client_id: config.auth.google.clientId,
      client_secret: config.auth.google.clientSecret,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }, function (err, response, body) {
    try {
      if (!err && response.statusCode === 200) {
        var responseJson = JSON.parse(body)
        res.json(responseJson)
      } else {
        res.status(response.statusCode).json(err)
      }
    } catch (e) {
      res.status(500).json(err || e)
    }
  })
}



module.exports = router;
