var multer      = require('multer');
var path        = require('path');
var express     = require('express');
var router      = express.Router();
var pool 		= require('./mysqlConn');
var fs          = require('fs');
//var upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });


var upload      = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
    });



router.post('/imgup', upload.single('file'), function(req, res){
	  res.send(req.file.path); // object를 리턴함
	  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
	});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
	});

router.get('/header', function(req,res,next){
	res.render('./moment/header');
	});
router.get('/view_detail', function(req, res, next) {
	var dnum =req.param('dnum');
	console.log("dnuddddm")
	console.log(dnum)
	res.render('./moment/view_detail',{data:dnum} );
//	res.send('aaaaa');
});
router.get('/header', function(req,res,next){
	res.render('./moment/header');
	});
router.get('/footer', function(req,res,next){
	res.render('./moment/footer');
	});

router.get('/mem_login', function(req,res,next){
	res.render('./moment/mem_login');
	});

router.get('/mem_insert', function(req,res,next){
	res.render('./moment/mem_insert');
	});

router.get('/mem_select', function(req,res,next){
	res.render('./moment/mem_select');
	});

router.get('/mem_search', function(req,res,next){
	res.render('./moment/mem_search');
	});

router.get('/list', function(req,res,next){
  pool.getConnection(function (err, connection) {
      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_regdate desc;";

      connection.query(sql, function (err, rows) {
				if (err) console.error("err : " + err);
    	  
					// console.log(rows)
          res.render('./moment/home', {data: rows});
          connection.release();
      });
  }); 
});

router.get('/listinit', function(req,res,next){
	var d_kind =req.param('kind');
	var ord =req.param('ord');
	  pool.getConnection(function (err, connection) {
			var orderby
			if (ord == "nw") {
				orderby = " order by d_regdate desc";
			}else if(ord == "lk"){
				orderby = " order by d_like desc";
			}else{
				orderby = " order by d_regdate desc";
			}
		console.log(d_kind)
	  if (d_kind == 0 || d_kind== "") {
	    	 var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no "+" "+orderby;
	    	 connection.query(sql, function (err, rows) {
					var date = new Date()
					var ttoday = date.getFullYear()
					var m_age ;
					rows.forEach(rdata => {
						console.log(rdata.m_birth)
						var rbirth = rdata.m_birth.toString()
						var mybirth =	rbirth.slice(11, 15)
								m_age = eval(ttoday - mybirth + 1 + "");
								m_age = m_age.toString().slice(0,1)
							  rdata.m_age = m_age
						});
						
	          if (err) console.error("err : " + err);
	    	  
	          res.send({data: rows});
	          connection.release();
	      });
		}else{
		  var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no where data.d_kind = ? "+" "+orderby;
		  connection.query(sql,[d_kind], function (err, rows) {
			  console.log(sql)
	    		 	// console.log(rows)
					var date = new Date()
					var ttoday = date.getFullYear()
					var m_age ;
					rows.forEach(rdata => {
						console.log(rdata.m_birth)
						var rbirth = rdata.m_birth.toString()
												console.log(rbirth)
						var mybirth =	rbirth.slice(11, 15)
												console.log(mybirth)
								m_age = eval(ttoday - mybirth + 1 + "");
								m_age = m_age.toString().slice(0,1)
							  rdata.m_age = m_age
						console.log(rows)
						});
						
						// console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	          res.send({data: rows});
	          connection.release();
			  
		  });
		}
	  });
	});
	router.get('/home', function(req,res,next){
		var ord =req.param('ord');
	  pool.getConnection(function (err, connection) {
			var orderby
			if (ord == "nw") {
				orderby = " order by d_regdate desc";
			}else if(ord == "lk"){
				orderby = " order by d_like desc";
			}else{
				orderby = " order by d_regdate desc";
			}
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no "+" "+orderby;
	      connection.query(sql, function (err, rows) {
					console.log(sql)
					var date = new Date()
					var ttoday = date.getFullYear()
					var m_age ;
					rows.forEach(rdata => {
						var rbirth = rdata.m_birth.toString()
						var mybirth =	rbirth.slice(11, 15)
						m_age = eval(ttoday - mybirth + 1 + "");
						m_age = m_age.toString().slice(0,1)
						rdata.m_age = m_age
					});
					
					if (err) console.error("err : " + err);
	    	  
					res.send({data: rows});
					connection.release();
	      });
			}); 
		});
		
	router.get('/home_address_selectdb', function(req,res,next){
	
		var d_location =req.param('loc');
		var d_kind =req.param('kind');
		var ord =req.param('ord');

		var orderby
			if (ord == "nw") {
				orderby = " order by d_regdate desc";
			}else if(ord == "lk"){
				orderby = " order by d_like desc";
			}else{
				orderby = " order by d_regdate desc";
			}
			pool.getConnection(function (err, connection) {
					if (d_kind == 0 && d_kind== "") {
						var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no where data.d_location like ?"+" "+orderby;
						connection.query(sql,["%"+d_location+"%"],function (err, rows) {
						var date = new Date()
						var ttoday = date.getFullYear()
						var m_age ;

							rows.forEach(rdata => {
								console.log(rdata.m_birth)
								var rbirth = rdata.m_birth.toString()
								var mybirth =	rbirth.slice(11, 15)
										m_age = eval(ttoday - mybirth + 1 + "");
										m_age = m_age.toString().slice(0,1)
										rdata.m_age = m_age
								});
							if (err) console.error("err : " + err);
						
							res.send({data: rows});
							connection.release();
					});
				}else{
					var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no where data.d_kind = ? and data.d_location like ? "+""+orderby;
					connection.query(sql,[d_kind,"%"+d_location+"%"], function (err, rows) {
						var date = new Date()
						var ttoday = date.getFullYear()
						var m_age ;
						rows.forEach(rdata => {
							console.log(rdata.m_birth)
							var rbirth = rdata.m_birth.toString()
													console.log(rbirth)
							var mybirth =	rbirth.slice(11, 15)
													console.log(mybirth)
									m_age = eval(ttoday - mybirth + 1 + "");
									m_age = m_age.toString().slice(0,1)
									rdata.m_age = m_age
							console.log(rows)
							});
							if (err) console.error("err : " + err);
							res.send({data: rows});
							connection.release();
					});
				}
			}); 
		});


	router.get('/data_view', function(req,res,next){
			var dnum =req.param('dnum');
			console.log("dvvvvnum")
			console.log(dnum)
				pool.getConnection(function (err, connection) {
						var sql ="SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no where data.d_no = ? ";
		
						connection.query(sql,[dnum], function (err, rows) {
						var date = new Date()
						var ttoday = date.getFullYear()
						var m_age ;
						rows.forEach(rdata => {
							console.log(rdata.m_birth)
							var rbirth = rdata.m_birth.toString()
													console.log(rbirth)
							var mybirth =	rbirth.slice(11, 15)
													console.log(mybirth)
									m_age = eval(ttoday - mybirth + 1 + "");
									m_age = m_age.toString().slice(0,1)
									rdata.m_age = m_age
							console.log(rows)
							});
		//	    	  console.log(rows)
								if (err) console.error("err : " + err);
							
							res.send(rows);
								connection.release();
						});
				}); 
	});		
/* router.get('/home', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_regdate desc;";

	      connection.query(sql, function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	          res.render('./moment/home', {data: rows});
	          connection.release();
	      });
	  }); 
	}); */


router.get('/home_mypage', function(req,res,next){
	var dnum =req.param('num');
	console.log("dnuddddm")
	console.log(dnum)
	res.render('./moment/home_mypage',{data:dnum} );
});

router.get('/box_select', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no;";

	      connection.query(sql, function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/mylike_selectdb', function(req,res,next){
	var m_email =req.param('m_email');
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM (member_tbl as mem LEFT OUTER JOIN like_tbl as mylike ON mem.m_no = mylike.m_no) LEFT OUTER JOIN data_tbl as mydata ON mylike.d_no = mydata.d_no LEFT OUTER JOIN member_tbl as mymem ON mydata.m_no = mymem.m_no where mymem.m_email = ?";
	      connection.query(sql,[m_email], function (err, rows) {
	    	  console.log(sql)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/myrecord_selectdb', function(req,res,next){
	var m_email =req.param('m_email');
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM member_tbl as mem LEFT OUTER JOIN data_tbl as mydata ON mem.m_no = mydata.m_no where mem.m_email=? ";
	      connection.query(sql,[m_email], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/mem_searchdb', function(req,res,next){
	var m_no =req.param('num');
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM member_tbl WHERE m_no=?";

	      connection.query(sql,[m_no], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});
router.get('/mem_selectdb', function(req,res,next){
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM member_tbl ";

	      connection.query(sql , function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/uploaddb', function(req,res,next){
	var m_no 		= req.param("m_no");
	var d_kind     	= parseInt(req.param("d_kind"));
	var d_location   = req.param("d_location");
	//	   var d_regdate    = new Date();
	var d_title   	= req.param("d_title");
	var d_content   	= req.param("d_content");
	var d_star 		= parseInt(req.param("d_star"));
	var d_path 		= req.param("d_path");
	var d_like   = "";
	console.log(d_kind)
	console.log(d_location)
	console.log(d_title)
	   
	  pool.getConnection(function (err, connection) {
	      var sql = "insert into data_tbl(m_no,d_regdate,d_kind,d_location,d_title,d_content,d_path,d_star,d_like)values(?,sysDate(),?,?,?,?,?,?,0)";
	      
	      connection.query(sql,[m_no,d_kind,d_location,d_title,d_content,d_path,d_star], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/mem_updatedb', function(req,res,next){
	var m_no		= req.param('m_no');
	var m_email    	= req.param("m_email");
	var m_pw		= req.param("m_pw");
	var m_nick    	= req.param("m_nick");
	var m_birth   	= req.param("m_birth");
	var m_phone   	= req.param("m_phone");
	var count   = "";
	  pool.getConnection(function (err, connection) {
	      var sql = "update member_tbl set m_nick=?,m_pw=?,m_phone=? where m_no=?";
	  	
	      connection.query(sql,[m_nick,m_pw,m_phone,m_no], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/home_selectdblike', function(req,res,next){
	
	var k_num =req.param('kind');
	console.log(k_num)
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM data_tbl as data LEFT OUTER JOIN member_tbl as mem ON data.m_no = mem.m_no order by d_like desc;";

	      connection.query(sql,[k_num], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/mem_logindb', function(req,res,next){
	var mail =req.param('m_email');
	var pw =req.param('m_pw');
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM member_tbl WHERE m_email=? and m_pw=?";
	      connection.query(sql,[mail,pw], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});


router.get('/mem_idcheckdb', function(req,res,next){
	var m_email =req.param('m_email');
	console.log("m_email")
	console.log(m_email)
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM member_tbl WHERE m_email=?";
	      connection.query(sql,[m_email], function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/likecnt', function(req,res,next){
	var d_no = req.param("d_no");
	var d_like = req.param("d_cnt");
	console.log("라이크씨앤티")
	  pool.getConnection(function (err, connection) {
	      var sql = "UPDATE data_tbl SET d_like=?  WHERE d_no=?";
	      connection.query(sql,[d_like,d_no], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	    	  console.log("라이크씨앤티")
	    	  console.log("라이크씨앤티"+rows)
	          connection.release();
	      });
	  }); 
	});

router.get('/likecheck', function(req,res,next){
	var mnum = req.param("mnum");
	console.log("라이크체크")
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT  likee.d_no, likee.m_no, data.d_like FROM data_tbl as data  LEFT OUTER JOIN like_tbl as likee ON data.d_no = likee.d_no where likee.m_no = ?";
	  	
	      connection.query(sql,[mnum], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});
router.get('/likeup', function(req,res,next){
	var d_no = req.param("dnum");
	var m_no = req.param("mnum");
	console.log("라이크업")
	  pool.getConnection(function (err, connection) {
	      var sql = "insert into like_tbl (d_no,m_no) values(?,?)";
	      connection.query(sql,[d_no,m_no], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.get('/likedown', function(req,res,next){
	var d_no = req.param("dnum");
	var m_no = req.param("mnum");
	console.log("라이크다운")
	  pool.getConnection(function (err, connection) {
	      var sql = "delete from like_tbl where d_no=? and m_no=?";
	      connection.query(sql,[d_no,m_no], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});
module.exports = router;
