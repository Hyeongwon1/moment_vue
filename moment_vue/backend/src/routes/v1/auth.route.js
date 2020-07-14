const  express = require("express");
import {
  login,tokenTest,signUp
} from '../../controllers/v1/auth.controller'
const  router = express.Router();

router.route('/login')
  .post(
    login
  )
router.route('/signUp')
  .post(
    signUp
  )  
router.route('/tokenTest')
  .get(
    tokenTest
  )


router.post("/:provider", function (req, res) {
  console.log(req.params.provider);
  switch (req.params.provider) {
    // case 'github':
    //   githubAuth(req, res)
    //   break
    // case 'facebook':
    //   facebookAuth(req, res)
    //   break
    case "google":
      googleAuth(req, res);
      break;
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
    case "login":
      loginAuth(req, res);
      break;
    case "register":
      registerAuth(req, res);
      break;
    case "logout":
      logoutAuth(req, res);
      break;
  }
});

function googleAuth(req, res) {
  Request(
    {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      form: {
        code: req.body.code,
        client_id: config.auth.google.clientId,
        client_secret: config.auth.google.clientSecret,
        redirect_uri: req.body.redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    },
    function (err, response, body) {
      try {
        if (!err && response.statusCode === 200) {
          var responseJson = JSON.parse(body);
          res.json(responseJson);
        } else {
          res.status(response.statusCode).json(err);
        }
      } catch (e) {
        res.status(500).json(err || e);
      }
    }
  );
}

function loginAuth(req, res) {
  // console.log(req)
  var mail = req.body.email;
  var pw = req.body.password;
  console.log(mail);
  console.log(pw);
  let jwt_secret = "moment";
  if (mail) {
    pool(function (err, connection) {
      var sql = `SELECT * FROM TCM_MEMBER_MST WHERE m_email="${mail}"`;
      connection.query(sql, function (err, results, fields) {
        if (err) console.error("err : " + err);
        const hash = crypto
          .createHmac("sha256", secret)
          .update(pw)
          .digest("base64");
        if (hash == results[0].m_pw) {
          const getToken = new Promise((resolve, reject) => {
            //jwt 토큰생성
            jwt.sign(
              {
                id_no: results[0].m_no,
                id_mail: mail, //유저정보
              },
              jwt_secret,
              {
                expiresIn: 60 * 60 * 24, // expires in 24 hours 유효기간
                issuer: "seo", //발급자
                subject: "userInfo", //토큰명
              },
              (err, token) => {
                if (err) reject(err);
                resolve(token);
              }
            );
          });
          getToken.then((token) => {
            console.log(res);
            res.status(200).json({
              status: 200,
              msg: "login success",
              id: results[0].m_no,
              name: results[0].m_nick,
              email: results[0].m_email,
              created_at: new Date(),
              access_token: token,
            });
          });
        } else {
          res.status(400).json({
            status: 400,
            msg: "password 가 틀림",
          });
        }
        connection.release();
      });
    });
  } else {
    res.status(400).json({
      status: 400,
      msg: "id값이 없음",
    });
  }
}

module.exports = router;
