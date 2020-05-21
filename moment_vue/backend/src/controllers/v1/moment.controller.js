const pool = require("../../config/db/mysqlConn");
const homequery = require("../../config/query/homequery");

const kinds = async function (req, res, next) {
    try {
      console.log("req.params.kind");
      console.log(req.params.kind);
      const sql = await homequery.homeSelectq(req);
      await pool(function (err, connection) {
        console.log(sql);
        connection.query(sql, function (err, results) {
          connection.release();
          // console.log(rows)
          // commons.age(rows);
          if (err) console.error("err : " + err);
          
          // return res.send(
          //   JSON.stringify({ status: 200, error: null, response: results })
          // );
          return res.json({ status: 200, error: null, response: results });
        });
      });
    } catch (e) {
      next(e)
    }
  }

  export {
    kinds
  }