// router/index.js
const path = require("path");
const fs = require("fs");
const express = require('express');
const router = express.Router();


const indexJs = path.basename(__filename)

//앞의 명칭이 라우터 경로가 된다 ex) moment
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== indexJs) && (file.slice(-9) === '.route.js'))
  .forEach(routeFile => router.use(`/${routeFile.split('.')[0]}`, require(`./${routeFile}`)))


  
// router.use("/users", users);
// router.use("/pupp", pupp);
// router.use("/moment", moment);
// router.use("/auth", social);

module.exports = router








