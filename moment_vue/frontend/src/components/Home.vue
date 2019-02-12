<template lang="html">
<body id="mybodyhtml" class="ui-mobile-viewport ui-overlay-a"><div data-role="page" data-url="/moment/list" tabindex="0" class="ui-page ui-page-theme-a ui-page-active" style="">
	<div id="head">
   <div onclick="fn()" id="head" class="hj_head  navbar-fixed-top">in the moment</div>
</div>
	

	<div style="margin-top: 51px; width: 100%; background-color: black;">

		<div class="btn-group btn-group-justified">
			<a href="#" class="btn hbtn ui-link" id="myall" style="color: white; background-color: black;">ALL</a>
			<a href="#" class="btn hbtn ui-link" id="myeat" style="color: white; background-color: black;">EAT</a>
			<a href="#" class="btn hbtn ui-link" id="mybuy" style="color: white; background-color: rgb(169, 169, 245);">BUY</a>
			<a href="#" class="btn hbtn ui-link" id="myenjoy" style="color: white; background-color: black;">ENJOY</a>
			<a href="#" class="btn hbtn ui-link" id="myaddress" style="color: white; background-color: black;" data-toggle="collapse" data-target="#myinput">ADDRESS</a>
		</div>


		<div id="myinput" class="collapse" style="padding-left: 10px; padding-right: 10px;">

			<div class="input-group" style="padding-bottom: 5px;">

				<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="msearch" type="text" class="form-control" placeholder="Search for..." style="background-color: white;"></div>
				<span class="input-group-btn">
					<button class="btn btn-secondary mymys ui-btn ui-shadow ui-corner-all" style="width: 60px; background-color: white; border: solid 2px white;" type="button">Go!</button>
				</span>
			</div>

			<div style="background-color: black; height: 4px;"></div>
		</div>

		<button id="odbtn" class="ui-btn" onclick="orderFn()">N E W ▼</button>
	</div>
	<br>
	<br>
	<div data-role="" class="container mymain">
		<div class="row">
			<div id="colcol" class="col-xs-6 col-sm-6 col-md-4 col-md-offset-2 col-lg-4 col-lg-offset-2">
				<div class="box" value="7" style="padding: 20px;">
					<div class="s_pic" style="background-color: black; width: 100%; display: table; height: 305px;">
						<div class="ivdiv" style="display:table-cell; vertical-align:middle;">
							<img class="mainimg" src="uploads/1548990181604.jpg" width="100%" style="vertical-align: middle; margin: auto;">
						</div>
					</div>
					<br>
					<div id="mynick" class="myname" style="float: left; margin-right: 15px; font-size: 10px;">피카츄</div>
					<div class="titlestar" style="float: right; margin-right: 10px; font-size: 15px; font-family: 설렘;">
						<img src="/image/like/full_heart.png" style="width:20px;float:left;margin-right:5px;">-1</div>
						<div class="titlestar" id="myage" style="font-size: 15px; font-family: 설렘;">
							<img src="/image/age/30s.png" style="width:40px;"></div>
							<div id="mytitle" class="titlestar" style="margin-top: 10px; text-decoration: underline; font-size: 15px; font-family: 설렘;">aaaa</div>
						</div>
					</div>
		</div>


	<br>
	<br>
	<br>
	<div id="bottom_nav" class="navbar-mobile btn-group btn-group-justified navbar-fixed-bottom">
		<a href="#" class="btn glyphicon glyphicon-home fbtn ui-link" id="myhome" style="color: white; background-color: black;"></a> 
		<a href="#" class="btn glyphicon glyphicon-heart fbtn ui-link" id="mylike" style="color: white; background-color: black;"></a> 
		<a href="#" class="btn glyphicon glyphicon-camera fbtn ui-link" id="myupload" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-menu-hamburger fbtn ui-link" id="myrecord" style="color: white; background-color: black;"></a> 
		<a href="#" class="btn glyphicon glyphicon-user fbtn ui-link" id="mymypage" style="color: white; background-color: black;"></a>
	</div>


</div><div class="ui-loader ui-corner-all ui-body-a ui-loader-default"><span class="ui-icon-loading"></span><h1>loading</h1></div></body>
</template>

<script>
console.log("aaaaaaaaaaaaaaaa");
export default {
  created() {
    this.$http.get("/moment/home").then(response => {
      this.datas = response.data;
    });
  },
  name: "app",
  data() {
    return {
      msg: ""
    };
  }
};
</script>

<style lang="css">
@font-face {
  font-family: "Am";
  src: url("/font/AmaticSC-Regular.ttf");
}

@font-face {
  font-family: "����";
  src: url("/font/210 설렘주의B.ttf");
}

@font-face {
  font-family: "�������";
  src: url("/font/NANUMBARUNGOTHIC.TTF");
}

div {
  font-family: "�������";
  text-shadow: #999999 1px 1px 1px;
}

.box {
  box-shadow: 5px 5px 20px #ccc;
  background-color: white;
}

.hbtn {
  background-color: black;
  font-family: "Am";
  color: white;
  font-size: 14pt;
}

#odbtn {
  color: white;
  font-size: 12pt;
  font-family: "Am";
  background-color: black;
  margin: auto;
  height: 40px;
}

#bottom_nav {
  background-color: black;
}

.fbtn:active {
  background-color: #a9a9f5;
}

.fbtn:hover {
  background-color: #a9a9f5;
}

.hbtn:active {
  background-color: #a9a9f5;
}

.hbtn:hover {
  background-color: #a9a9f5;
}
</style>