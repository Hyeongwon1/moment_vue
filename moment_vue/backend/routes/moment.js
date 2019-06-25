var multer      = require('multer');
var path        = require('path');
const puppeteer = require('puppeteer');
var moment 		= require('moment');
var commons 	= require('./common');
var express     = require('express');
var router      = express.Router();
var pool 		= require('./mysqlConn');
var fs          = require('fs');
//var upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });


var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});	

router.post('/pupp', function(req,res,next){
	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
	puppeteer.launch()
    .then((browser) => {
		return browser.newPage()
        .then((page) => {
			return page.goto('https://www.naver.com/', { waitUnitl: 'networkidle' })
            .then(() => page.evaluate(() => {
				let elements = Array.from(document.querySelectorAll('.ah_roll_area li'));
				let res = [];
				let rea = [];
					// elements.map((li) => {
					// 	let split =	li.textContent.trim().split('\n')
					// 	res[split[0]] = split[1]
					// });
					elements.map((li) => {
						let split =	li.textContent.trim().split('\n')
						res.push({num:split[0],value:split[1]});		
						rea.push([Number(split[0]),split[1]]);		
					});
               return {res,rea};
            }))
        })
        .then((title) => {
					browser.close();
					title.rea.forEach(element => {
						element.push(moment().format('YYYY/MM/DD HH:mm:ss'))
					});
					title.res.push({time:moment().format('YYYY/MM/DD HH:mm:ss')})
					console.log(title.rea)
					pool.getConnection(function (err, connection) {
						var sql = `insert into 
													TCM_RANK_MST 
													(RANK_NUM,
														RANK_VALUE,
														INSERT_DATETIME) 
														values ?`;
						connection.query(sql,[title.rea], function (err, rows) {
							console.log(rows)
							if (err) console.error("err : " + err);
							connection.release();
						});
					}); 
					res.send(title.res);
					// res.send(title);
          return title;
        });
    });
// puppeteer.launch({
// 		headless : false	// 헤드리스모드의 사용여부를 묻는다
// , devtools : false	// 브라우저의 개발자 모드의 오픈 여부를 묻는다
// , executablePath : puppeteer.executablePath()	// 실행할 chromium 기반의 브라우저의 실행 경로를 지정한다.
// , ignoreDefaultArgs : false	// 배열이 주어진 경우 지정된 기본 인수를 필터링한다.(중요 : true사용금지)
// , timeout : 30000	// 브라우저 인스턴스가 시작될 때까지 대기하는 시간(밀리 초)
// , defaultViewport : { width : 800, height : 600 }	// 실행될 브라우저의 화면 크기를 지정한다.
// , args : [ "about:blank" ]
// }).then(async browser => {
// const page = await browser.newPage();
// // 새탭을 열고 작업을 수행할 페이지를 지정한다.
// await page.goto( "https://www.naver.com", { waitUntil : "networkidle2" } );
// // 5초간딜레이를 준다.
// // await delay(5000);
// // 스크린샷을 찍는다.
// 				// const element1 = await page.$('input[name="hakbun"]');
//         // student_id = await page.evaluate(element1 => element1.value, element1);
//         // //이름을 가져와라
//         // const element2 = await page.$('td[width="240"]');
//         // name = await page.evaluate(element2 => element2.textContent, element2);


// await page.screenshot( { path : "wickedBlog.png" } );
// // 모든 작업을 수행하면 브라우저를 닫고 퍼펫티어를 종료한다.
// await browser.close();

// });
});

router.get('/list', function(req,res,next){
  pool.getConnection(function (err, connection) {
			var sql = `SELECT * FROM 
										TCM_DATA_MST as data 
										LEFT OUTER JOIN 
										TCM_MEMBER_MST as mem 
										ON data.m_no = mem.m_no 
										order by d_regdate desc`;
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
			// param = {
			// 	column : 'd_regdate desc , d_like desc , dcjd'
			// }
				// ord.split("nw").join('d_regdate')	
			// orderby = " order by [column]";

			// var string a = "[a] 아랑 [a]"
			// orderby.split("[a]").join('안')	
			if (ord == "nw") {
				orderby = " d_regdate desc";
			}else if(ord == "lk"){
				orderby = " d_like desc";
			}else{
				orderby = " d_regdate desc";
			}
	  	if (d_kind == 0 || d_kind== "") {
				const sql = `SELECT * 
									FROM TCM_DATA_MST as data 
									LEFT OUTER JOIN 
									TCM_MEMBER_MST as mem 
									ON data.m_no = mem.m_no
									order by ${orderby}`;

	    	connection.query(sql, function (err, rows) {
							commons.age(rows)	
	        	if (err) console.error("err : " + err);
	          	res.send({data: rows});
	          	connection.release();
	      });
			}else{
				const sql = `SELECT * 
									FROM TCM_DATA_MST as data 
									LEFT OUTER JOIN 
									TCM_MEMBER_MST as mem 
									ON data.m_no = mem.m_no 
									WHERE data.d_kind = ? 
									order by ${orderby}`;
		  	connection.query(sql,[d_kind], function (err, rows) {
						commons.age(rows)
	        	if (err) console.error("err : " + err);
	        	res.send({data: rows});
	        	connection.release();
		  	});
		}
	});
});
	router.get('/home', function(req,res,next){
		const ord =req.param('ord');
	  	pool.getConnection(function (err, connection) {
			let orderby
			if (ord == "nw") {
				orderby = " d_regdate desc";
			}else if(ord == "lk"){
				orderby = " d_like desc";
			}else{
				orderby = " d_regdate desc";
			}
			const sql =`SELECT * 
								FROM TCM_DATA_MST as data 
								LEFT 
								OUTER 
								JOIN TCM_MEMBER_MST as mem 
								ON 	data.m_no = mem.m_no
								order by  ${orderby}`
			// var string a = "[a] 아랑 [a]"
			// a.split("[a]").join('안')	
			// ;
	      	connection.query(sql, function (err, rows) {
				commons.age(rows)
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
					var sql = `SELECT * 
												FROM 
												TCM_DATA_MST as data 
												LEFT OUTER JOIN 
												TCM_MEMBER_MST as mem 
												ON data.m_no = mem.m_no 
												WHERE data.d_location like ? ${orderby}`;
												console.log(sql)
					connection.query(sql,["%"+d_location+"%"],function (err, rows) {
						commons.age(rows)
						if (err) console.error("err : " + err);
						res.send({data: rows});
						connection.release();
					});
				}else{
					var sql = `SELECT * 
												FROM 
												TCM_DATA_MST as data 
												LEFT OUTER JOIN 
												TCM_MEMBER_MST as mem 
												ON data.m_no = mem.m_no 
												where data.d_kind = ? 
												and data.d_location like ? ${orderby}`;
												console.log(sql)
					connection.query(sql,[d_kind,"%"+d_location+"%"], function (err, rows) {
						commons.age(rows)
						if (err) console.error("err : " + err);
						res.send({data: rows});
						connection.release();
					});
				}
			}); 
		});


	router.get('/data_view', function(req,res,next){
		var dnum =req.param('dnum');
			pool.getConnection(function (err, connection) {
				var sql =`SELECT * 
										FROM 
										TCM_DATA_MST as data 
										LEFT OUTER JOIN 
										TCM_MEMBER_MST as mem 
										ON data.m_no = mem.m_no 
										order by d_no desc; `;
		
				connection.query(sql,[dnum], function (err, rows) {
						
					commons.age(rows)

					if (err) console.error("err : " + err);
						
					res.send(rows);
					// res.send({data: rows});
					connection.release();
				});
			}); 
	});		
router.get('/home_mypage', function(req,res,next){
	var dnum =req.param('num');
	console.log("dnuddddm")
	console.log(dnum)
	res.render('./moment/home_mypage',{data:dnum} );
});

router.get('/box_select', function(req,res,next){
	pool.getConnection(function (err, connection) {
			var sql = `SELECT * 
										FROM 
										TCM_DATA_MST as data 
										LEFT OUTER JOIN 
										TCM_MEMBER_MST as mem 
										ON data.m_no = mem.m_no;`;

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
				var sql = `SELECT * 
											FROM 
												(
												TCM_MEMBER_MST as mem 
												LEFT OUTER JOIN 
												like_tbl as mylike 
												ON mem.m_no = mylike.m_no
												) 
												LEFT OUTER JOIN TCM_DATA_MST as mydata 
												ON mylike.d_no = mydata.d_no 
												LEFT OUTER JOIN TCM_MEMBER_MST as mymem 
												ON mydata.m_no = mymem.m_no 
												where mymem.m_email = ?`;
	      connection.query(sql,[m_email], function (err, rows) {
	    	  console.log(sql)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	    });
	}); 
});

router.post('/myrecord_selectdb', function(req,res,next){
	var m_email =req.param('m_email');
	pool.getConnection(function (err, connection) {
			var sql = `SELECT * 
										FROM 
										TCM_MEMBER_MST as mem 
										LEFT OUTER JOIN TCM_DATA_MST as mydata 
										ON mem.m_no = mydata.m_no 
										where mem.m_email=? `;
	    connection.query(sql,[m_email], function (err, rows) {
			commons.age(rows)
						
	        if (err) console.error("err : " + err);
					
			res.send(rows);
	        connection.release();
	    });
	}); 
});

router.post('/mem_searchdb', function(req,res,next){
	var m_no =req.param('num');
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT * FROM TCM_MEMBER_MST WHERE m_no=?";

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
	      var sql = "SELECT * FROM TCM_MEMBER_MST ";

	      connection.query(sql , function (err, rows) {
//	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  
	    	  res.send(rows);
	          connection.release();
	      });
	  }); 
	});

router.post('/imgup', upload.single('image'), function(req, res){
	  res.send(req.file.path); // object를 리턴함
	  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
	});

router.post('/uploaddb',upload.single('image'), function(req,res,next){

	var m_no 					= req.param("m_no");
	var d_kind     		= parseInt(req.param("d_kind"));
	var d_location   	= req.param("d_location");
	var d_title   		= req.param("d_title");
	var d_content   	= req.param("d_content");
	var d_star 			= parseInt(req.param("d_star"));
	var d_path 			= req.file.path.substr(7)
	var d_regdate		= moment().format('YYYY/MM/DD HH:mm:ss');
	var d_like   		= "";
	console.log(req.file.path.substr(7))
	   
	  pool.getConnection(function (err, connection) {
				var sql = `insert into TCM_DATA_MST(m_no,
																				d_regdate,
																				d_kind,
																				d_location,
																				d_title,
																				d_content,
																				d_path,
																				d_star,
																				d_like)
																				values(
																					?,?,?,?,?,?,?,?,0)`;
	      
	      connection.query(sql,[m_no,d_regdate,d_kind,d_location,d_title,d_content,d_path,d_star], function (err, rows) {
//	    	  console.log(rows)
	          if (err) {
							console.error("err : " + err);
							res.send({err: err});
						}else{
							res.send(rows);
						}
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
				var sql = `update TCM_MEMBER_MST 
															set 
															m_nick=?,
															m_pw=?,
															m_phone=? 
															where m_no=?`;
	  	
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
				var sql = `SELECT * 
										FROM 
										TCM_DATA_MST as data 
										LEFT OUTER JOIN 
										TCM_MEMBER_MST as mem 
										ON data.m_no = mem.m_no 
										order by d_like desc;`;

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
	      var sql = "SELECT * FROM TCM_MEMBER_MST WHERE m_email=? and m_pw=?";
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
				var sql = `SELECT * 
								FROM 
								TCM_MEMBER_MST 
								WHERE 
								m_email=?`;
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
	  pool.getConnection(function (err, connection) {
	      var sql = "UPDATE TCM_DATA_MST SET d_like=?  WHERE d_no=?";
	      connection.query(sql,[d_like,d_no], function (err, rows) {
	    	  console.log(rows)
	          if (err) console.error("err : " + err);
	    	  res.send(rows);
	    	  console.log("라이크씨앤티"+rows)
	          connection.release();
	      });
	  }); 
	});

router.get('/likecheck', function(req,res,next){
	var mnum = req.param("mnum");
	console.log("라이크체크")
	  pool.getConnection(function (err, connection) {
	      var sql = "SELECT  likee.d_no, likee.m_no, data.d_like FROM TCM_DATA_MST as data  LEFT OUTER JOIN like_tbl as likee ON data.d_no = likee.d_no where likee.m_no = ?";
	  	
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
