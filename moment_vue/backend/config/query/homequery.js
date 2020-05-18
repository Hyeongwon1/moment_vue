function homeSelectq(req) {
  let kind = req.params.kind;
  let ord = req.query.ord;
  let loc = req.query.loc;
  console.log(kind);
  console.log(ord);
  console.log(loc);
  kind = kind.split("EAT").join("1");
  kind = kind.split("BUY").join("2");
  kind = kind.split("ENJOY").join("3");

  let param = ["d_regdate desc", "d_like desc"];
  let kinds = [`AND data.d_kind = ${kind}`];
  if (kind == "ALL") {
    kinds = [];
  }
  let locs = `AND data.d_location like '%${loc}%'`;
  ord = ord.split("NW").join(param[0]);
  ord = ord.split("LK").join(param[1]);
  loc = loc.split(" ").join("");
  const sql = `SELECT * 
                      FROM TCM_DATA_MST as data 
                      LEFT OUTER JOIN 
                      TCM_MEMBER_MST as mem 
                      ON data.m_no = mem.m_no
                      WHERE data.d_use ='Y'
                      ${kinds}
                      ${locs}
                      order by ${ord}`;

  console.log("asdasdasdasdasdasdasddasasd");

  return sql;
}

function dataViewq(req) {
  var post = req.params.post;
  var id = req.params.id;
  console.log("post");
  console.log(post);
  console.log("id");
  console.log(id);

  var sql = `SELECT 	data.d_no,
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
									and likee.member_no= ${id}
									Where data.d_no = ${post} 
                  order by d_no desc; `;

  return sq;
}

module.exports = { homeSelectq, dataViewq };
