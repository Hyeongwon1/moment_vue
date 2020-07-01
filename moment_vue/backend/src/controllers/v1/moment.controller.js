const pool = require("../../configs/db/mysqlConn");
const homequery = require("../../configs/query/homequery");

const kinds = async function (req, res, next) {
    try {
      console.log("req.params.kind");
      console.log(req.params.kind);
      const sql = await homequery.homeSelectq(req);
      await pool(function (err, connection) {
        console.log(sql);
        connection.query(sql, function (err, results) {
          connection.release();
          if (err) console.error("err : " + err);
          return res.json({ status: 200, error: null, response: results });
        });
      });
    } catch (e) {
      next(e)
    }
  }

const dataview =  async function (req, res, next) {
  try{
    const sql = await homequery.dataViewq(req);
    await pool(function (err, connection) {
      if (err) throw err;
      console.log(sql);
      connection.query(sql, function (err, rows) {
        connection.release();
        // commons.age(rows);
        if (err) throw err;
        return res.send(rows);
        // res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        // res.send({data: rows});
      });
    });
  }catch(e){
    next(e)
  }
  };
  
  
  export {
    kinds,dataview
  }