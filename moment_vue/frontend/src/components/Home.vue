<head>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>  
</head>
<template>
<body id="mybodyhtml">
	<div id="head"></div>


	<div style="margin-top: 51px; width: 100%; background-color: black;">

		<div class="topbtn-group">
			<a href="#" class="topbtn" id="myall" style="color: white;">ALL</a>
			<a href="#" class="topbtn" id="myeat" style="color: white;">EAT</a>
			<a href="#" class="topbtn" id="mybuy" style="color: white;">BUY</a>
			<a href="#" class="topbtn" id="myenjoy" style="color: white;">ENJOY</a>
			<a href="#" class="topbtn" id="myaddress" style="color: white;" data-toggle="collapse" data-target="#myinput">ADDRESS</a>
		</div>


		<div id="myinput" class="collapse" style="padding-left: 10px; padding-right: 10px;">

			<div class="input-group" style="padding-bottom: 5px;">

				<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">
					<input id="msearch" type="text" class="form-control" placeholder="Search for..." style="background-color: white;"></div>
				<span class="input-group-btn">
					<button class="btn btn-secondary mymys ui-btn ui-shadow ui-corner-all" style="width: 60px; background-color: white; border: solid 2px white;" type="button">Go!</button>
				</span>
			</div>

			<div style="background-color: black; height: 4px;"></div>
		</div>

		<button id="odbtn" class="ui-btn" onclick="orderFn()">N E W ▼</button>
	</div>
	<br>
	
		<div class="datas">
		<div v-for="data in datas" :key="data.d_no" class="data">
			<div id="colcol" class="">
				<div class="box" value="7" style="padding: 20px;">
					<div class="s_pic" style="background-color: black; width: 100%; display: table; height: 305px;">
						<div class="ivdiv" style="display:table-cell; vertical-align:middle;">
							<img class="mainimg" src="" width="100%" style="vertical-align: middle; margin: auto;">
						</div>
					</div>
					<br>
					<div id="mynick" class="myname" style="float: left; margin-right: 15px; font-size: 10px;">{{data.m_nick}}</div>
					<div class="titlestar" style="float: right; margin-right: 10px; font-size: 15px; font-family: 설렘;">
						<img src="" style="width:20px;float:left;margin-right:5px;">{{data.d_like}}</div>
						<div class="titlestar" id="myage" style="font-size: 15px; font-family: 설렘;">
						<img src="" style="width:40px;"></div>
					<div id="mytitle" class="titlestar" style="margin-top: 10px; text-decoration: underline; font-size: 15px; font-family: 설렘;">{{data.d_title}}</div>
				</div>
			</div>
		</div>


  <br>
	<br>
	<br>
	<div id="bottom_nav" class="navbar-mobile btn-group btn-group-justified navbar-fixed-bottom">
		<a href="#" class="btn glyphicon glyphicon-home fbtn" id="myhome" style="color: white;"></a>
		<a href="#" class="btn glyphicon glyphicon-heart fbtn" id="mylike" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-camera fbtn" id="myupload" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-menu-hamburger fbtn" id="myrecord" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-user fbtn" id="mymypage" style="color: white;"></a>
	</div>

</body>
</template>
<script>
console.log("aaaaaaaaaaaaaaaa");
export default {
  created(){
    this.$http.get("/moment/home").then(response => {
			this.datas = response.data.data;
			console.log(response.data.data);
    })
  },
  data(){
    return {
		datas: []
    }
  }
}
</script>


<style></style>