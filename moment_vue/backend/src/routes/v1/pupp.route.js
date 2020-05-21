var express = require("express");
var router = express.Router();
var moment = require("moment");
var pool = require("../../config/db/mysqlConn");
const puppeteer = require("puppeteer");

router.post("/pupp2", function(req, res, next) {
  console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
  puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }).then(browser => {
      return browser.newPage()
        .then( page => {
          return page.goto("https://www.naver.com/", { waitUnitl: "networkidle" })
            .then(() => page.evaluate(() => {
                let elements = Array.from(document.querySelectorAll(".ah_roll ul li"));
                let res = [];
                let rea = [];
                elements.map(li => {
                  let split = li.innerText.trim().split("\n");
                  res.push({ num: split[0], value: split[1] });
                  rea.push([Number(split[0]), split[1]]);
                });
                console.log("adasd1111asd")
                return {res,rea};
              }));
            }).then((title) => {
              browser.close();
          console.log(title)
          title.rea.forEach(element => {
            element.push(moment().format("YYYY/MM/DD HH:mm:ss"));
          });
          title.res.push({ time: moment().format("YYYY/MM/DD HH:mm:ss") });
          console.log("asdasdasdasdas")
          console.log(title.rea);
          // pool.getConnection(function(err, connection) {
          //   var sql = `insert into 
          //                 TCM_RANK_MST 
          //                 (RANK_NUM,
          //                   RANK_VALUE,
          //                   INSERT_DATETIME) 
          //                   values ?`;
          //   connection.query(sql, [title.rea], function(err, rows) {
          //     console.log(rows);
          //     if (err) console.error("err : " + err);
          //     connection.release();
          //   });
          // });
          res.send(title.res);
          // res.send(title);
        });
      });


      return title;
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

router.post("/pupp", function(req, res, next) {
  console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
  (async () => {  
    const browser = await puppeteer.launch(); // headless 브라우저 실행
    const page = await browser.newPage(); // 새로운 페이지 열기
    // `https://www.naver.com/` URL에 접속
    await page.goto("https://www.naver.com/", { waitUnitl: "networkidle" });
    // evaluate() 함수를 이용해 History table을 선택하고 반복문으로 내용을 빈배열에 추가한다
    await page.waitFor(1000)
    const rank = await page.evaluate(() => {
      let res = [];
      let rea = [];
      let elements = Array.from(document.querySelectorAll(".ah_roll ul li"));
      elements.map(li => {
            let split = li.innerText.trim().split("\n");
            res.push({ num: split[0], value: split[1] });
            rea.push([Number(split[0]), split[1]]);
          });
          return {res,rea};
    });
    rank.rea.forEach(element => {
      element.push(moment().format("YYYY/MM/DD HH:mm:ss"));
    });
    rank.res.push({ time: moment().format("YYYY/MM/DD HH:mm:ss") });
    
    console.log("rank")
    console.log(rank)
    // pool.getConnection(function(err, connection) {
    //           var sql = `insert into 
    //                         TCM_RANK_MST 
    //                         (RANK_NUM,
    //                           RANK_VALUE,
    //                           INSERT_DATETIME) 
    //                           values ?`;
    //           connection.query(sql, [title.rea], function(err, rows) {
    //             console.log(rows);
    //             if (err) console.error("err : " + err);
    //             connection.release();
    //           });
    //         });
    res.send(rank.res);
    // 모든 스크래핑 작업을 마치고 브라우저 닫기
    await browser.close();
  })();


});

module.exports = router;
