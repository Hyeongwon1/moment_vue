var multer      = require('multer');
var path        = require('path');
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

class User {
    constructor(user_id, user_pwd, user_role){
        this.user_id = user_id;
        this.user_pwd = user_pwd;
    }
}

	router.get('/list', function(req,res,next){
		pool.getConnection(function (err, connection) {
				var sql = `SELECT *
								FROM 
								TCM_DATA_MST as data 
								LEFT JOIN 
								TCM_MEMBER_MST as mem 
								ON mem.m_no = data.m_no
								where data.d_no in(SELECT max(d_no) 
													FROM TCM_DATA_MST 
														group by m_no)
							`;
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
							FROM 
							TCM_DATA_MST as data 
							LEFT JOIN 
							TCM_MEMBER_MST as mem 
							ON mem.m_no = data.m_no
							where data.d_no in(SELECT max(d_no) 
												FROM TCM_DATA_MST 
													group by m_no)
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
			d_location = `'%${d_location}%'`
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
									WHERE data.d_location like ${d_location} ${orderby}`;
						console.log(sql)
					connection.query(sql,function (err, rows) {
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
									where data.d_kind = ${d_kind}
									and data.d_location like ${d_location} ${orderby}`;
							console.log(sql)
					connection.query(sql, function (err, rows) {
						commons.age(rows)
						if (err) console.error("err : " + err);
						res.send({data: rows});
						connection.release();
					});
				}
			}); 
		});


	router.get('/data_view', function(req,res,next){
		var mnum =req.param('mnum');
		var snum =req.param('snum');
			pool.getConnection(function (err, connection) {
			var sql =`SELECT 	data.d_no,
								data.m_no,
								data.d_regdate,
								data.d_kind,
								data.d_location,
								data.d_title,
								data.d_content,
								data.d_path,
								data.d_star,
								data.d_like,
								mem.m_no,
								mem.m_nick,
								mem.m_birth,
								(case when likee.check_flag is null then 0 else likee.check_flag end) as check_flag 
									
									FROM TCM_DATA_MST as data 
									LEFT JOIN 
									TCM_MEMBER_MST as mem 
									ON data.m_no = mem.m_no
									LEFT JOIN
									TCM_LIKE_MST as likee
									ON likee.data_no = data.d_no
									and likee.member_no= ${snum}
									Where data.d_no = ${mnum} 
									order by d_no desc; `;
									console.log(sql)
				connection.query(sql, function (err, rows) {
					commons.age(rows)
					if (err) console.error("err : " + err);
					res.send(rows);
					// res.send({data: rows});
					connection.release();
				});
			}); 
	});

	router.get('/data_view', function(req,res,next){
		var mnum =req.param('mnum');
		var snum =req.param('snum');
			pool.getConnection(function (err, connection) {
			var sql =`SELECT 	data.d_no,
								data.m_no,
								data.d_regdate,
								data.d_kind,
								data.d_location,
								data.d_title,
								data.d_content,
								data.d_path,
								data.d_star,
								data.d_like,
								mem.m_no,
								mem.m_nick,
								mem.m_birth,
								(case when likee.check_flag is null then 0 else likee.check_flag end) as check_flag 
									FROM TCM_DATA_MST as data 
									LEFT JOIN 
									TCM_MEMBER_MST as mem 
									ON data.m_no = mem.m_no
									LEFT JOIN
									TCM_LIKE_MST as likee
									ON likee.data_no = data.d_no
									and likee.member_no= ${snum}
									Where data.d_no = ${mnum} 
									order by d_no desc; `;
									console.log(sql)
			connection.query(sql, function (err, rows) {
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

router.post('/like', function(req,res,next){
	const d_no = req.param("d_no");
	const d_like = req.param("d_like");
	const sno = req.param("sno");
	const heartflag = req.param("flag");
	const idatetime = moment().format('YYYY/MM/DD HH:mm:ss')
    var sql2 =""
	if( heartflag == 0){
		sql2=`INSERT INTO TCM_LIKE_MST 
				(data_no,member_no,check_flag,insertDateTime) 
				VALUES 
				(${d_no},
				${sno},
				1,
				'${idatetime}');`
	}else if(heartflag == 1){
		sql2=`DELETE FROM TCM_LIKE_MST 
				WHERE data_no=${d_no} 
				and member_no=${sno}
				;`;		 
	}
	pool.getConnection( async function (err, connection) {
		var sql =`UPDATE TCM_DATA_MST
					SET d_like=${d_like}  
						WHERE d_no=${d_no};`;
			connection.query(sql+sql2, function (err, rows) {
				console.log(sql)
				console.log(sql2)
			if (err) console.error("err : " + err);
			connection.release();
			});
		}); 
	});

router.get('/likecheck', function(req,res,next){
	var mnum = req.param("mnum");
	console.log("라이크체크")
		pool.getConnection(function (err, connection) {
			var sql = `SELECT likee.d_no, 
								likee.m_no, 
								data.d_like 
								FROM TCM_DATA_MST as data  
								LEFT JOIN 
								TCM_LIKE_MST as likee 
								ON data.d_no = likee.d_no where likee.m_no = ?`;
			
			connection.query(sql,[mnum], function (err, rows) {
				console.log(rows)
				if (err) console.error("err : " + err);
				
				res.send(rows);
				connection.release();
			});
		}); 
	});

module.exports = router;
