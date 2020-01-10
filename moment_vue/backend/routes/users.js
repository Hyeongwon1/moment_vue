var express = require("express");
var router = express.Router();
var pool = require("./mysqlConn");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("./config");
const secret = config.secret; //비빌번호 해쉬키



router.post('/auth/google/callback',function(req, res) {
  console.log("ffff")
  console.log(req.query);
  // res.redirect('/');
});



//로그인 부분
router.post("/mem_logindb", function (req, res, next) {
  var mail = req.body.email;
  var pw = req.body.password;

  let jwt_secret = "moment";
  if (mail) {
    pool.getConnection(function (err, connection) {
      var sql = `SELECT m_no,m_pw,m_nick FROM TCM_MEMBER_MST WHERE m_email="${mail}"`;
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
                id_mail: mail   //유저정보
              },
              jwt_secret,
              {
                expiresIn: 60*60*24 , // expires in 24 hours 유효기간
                issuer: "seo",     //발급자
                subject: "userInfo"//토큰명
              },
              (err, token) => {
                if (err) reject(err);
                resolve(token);
              }
            );
          });
          getToken.then(token => {
            res.status(200).json({
              status: 200,
              msg: "login success",
              token
            });
          });
        } else {
          res.status(400).json({
            status: 400,
            msg: "password 가 틀림"
          });
        }
        connection.release();
      });
    });
  } else {
    res.status(400).json({
      status: 400,
      msg: "id값이 없음"
    });
  }
});

// 인증 확인
router.get("/logincheck", (req, res) => {
  console.log(req.headers["x-access-token"])
  const token = req.headers["x-access-token"] || req.query.token;
  let jwt_secret = "moment";

  if (!token) {
    res.status(400).json({
      status: 400,
      msg: "Token 없음"
    });
  }
  const checkToken = new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, function (err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  checkToken.then(token => {
    console.log(token);
    res.status(200).json({
      status: 200,
      msg: "success",
      token
    });
  });
});

router.post("/mem_updatedb", function (req, res, next) {
  var m_no = req.param("m_no");
  var m_email = req.param("m_email");
  var m_pw = req.param("m_pw");
  var m_nick = req.param("m_nick");
  var m_birth = req.param("m_birth");
  var m_phone = req.param("m_phone");
  var count = "";
  pool.getConnection(function (err, connection) {
    var sql = `update TCM_MEMBER_MST 
															set 
															m_nick=?,
															m_pw=?,
															m_phone=? 
															where m_no=?`;
    connection.query(sql, [m_nick, m_pw, m_phone, m_no], function (err, rows) {
      if (err) {
        console.error("err : " + err);
        res.send({ data: err });
      } else {
        res.send({ data: "success" });
      }
      connection.release();
    });
  });
});

router.get("/mem_idcheckdb", function (req, res, next) {
  var m_email = req.param("m_email");
  console.log("m_email");
  console.log(m_email);
  pool.getConnection(function (err, connection) {
    var sql = `SELECT * 
										FROM 
										TCM_MEMBER_MST 
										WHERE 
										m_email=?`;
    connection.query(sql, [m_email], function (err, rows) {
      //	    	  console.log(rows)
      if (err) console.error("err : " + err);

      res.send(rows);
      connection.release();
    });
  });
});

router.post("/mem_insertdb", function (req, res, next) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(req.body.i_pw)
    .digest("base64");
  var m_email = req.body.i_email;
  var m_pw = hash;
  var m_nick = req.body.i_nick;
  var m_birth = req.body.i_date;
  var m_phone = req.body.i_phone;
  pool.getConnection(function (err, connection) {
    var sql = `insert into TCM_MEMBER_MST(m_email,m_pw,m_nick,m_birth,m_phone)values(?,?,?,?,?)`;
    connection.query(sql, [m_email, m_pw, m_nick, m_birth, m_phone], function (
      err,
      rows
    ) {
      if (err) {
        console.error("err : " + err);
        res.send(err);
      } else {
        res.send({ data: "success" });
      }
    });
  });
});

router.post("/mem_searchdb", function (req, res, next) {
  var m_no = req.param("num");
  pool.getConnection(function (err, connection) {
    var sql = "SELECT * FROM TCM_MEMBER_MST WHERE m_no=?";

    connection.query(sql, [m_no], function (err, rows) {
      //	    	  console.log(rows)
      if (err) console.error("err : " + err);

      res.send(rows);
      connection.release();
    });
  });
});
router.get("/mem_selectdb", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var sql = "SELECT * FROM TCM_MEMBER_MST ";

    connection.query(sql, function (err, rows) {
      //	    	  console.log(rows)
      if (err) console.error("err : " + err);

      res.send(rows);
      connection.release();
    });
  });
});

module.exports = router;
