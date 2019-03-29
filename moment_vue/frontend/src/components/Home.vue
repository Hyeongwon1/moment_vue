<template>
<body id="mybodyhtml">
	<link rel='stylesheet' href='/stylesheets/home.css' />
	<div id="head"></div>


	<div style="margin-top: 51px; width: 100%; background-color: black;">

		<div class="topbtn-group">
			<a href="#" @click="initt" class="topbtn" id="0" style="color: white;">ALL</a>
			<a href="#" @click="initt" class="myeat"  id="1" style="color: white;">EAT</a>
			<a href="#" @click="initt" class="topbtn" id="2" style="color: white;">BUY</a>
			<a href="#" @click="initt" class="topbtn" id="3" style="color: white;">ENJOY</a>
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

		<button id="odbtn" class="ui-btn" @click="aa">N E W ▼</button>
	</div>
	<br>
	
		<div class="datas">
		<div v-for="data in datas" :key="data.d_no" class="data">
			<div class="row"></div><br>
			<div id="colcol" class="">
				<div class="box" value="" style="padding: 20px;">
					<div class="s_pic" style="background-color: black; width: 100%; display: table; height: 305px;">
						<div class="ivdiv" style="display:table-cell; vertical-align:middle;"></div>
							<img class="mainimg" v-bind:src="'/'+data.d_path "  width="100%" style="vertical-align: middle; margin: auto;">
						</div>
					</div>
					<br>

					<div id="mynick" class="myname" style="float: left; margin-right: 15px; font-size: 10px;">{{data.m_nick}}</div>
						<div class="titlestar" style="float: right; margin-right: 10px; font-size: 15px; font-family: 설렘;">
							<img src="/image/like/full_heart.png" style="width:20px;float:left;margin-right:5px;">{{data.d_like}}</div>
							<div class="titlestar" id="myage" style="font-size: 15px; font-family: 설렘;">
							<img v-bind:src="'/image/age/'+data.m_age+'0s.png'" style="width:40px;">
						</div>
					<div id="mytitle" class="titlestar" style="margin-top: 10px; text-decoration: underline; font-size: 15px; font-family: 설렘;">{{data.d_title}}</div>
				</div>
			</div>
		</div>
		
<div style="margin-top: 51px; width: 100%; background-color: black;">
	<div id="bottom_nav" class="">
		<a href="#" class="btn_b" id="myhome" style="color: white;">aaaaa</a>
		<a href="#" class="btn_b" id="mylike" style="color: white;">aaaaa</a> 
		<a href="#" class="btn_b" id="myupload" style="color: white;">aaaa</a> 
		<a href="#" class="btn_b" id="myrecord" style="color: white;">aaaaa</a> 
		<a href="#" class="btn_b" id="mymypage" style="color: white;">aaaaa</a>
	</div>
</div>
</body>
</template>
<script>
export default {
	created(){
    this.$axios.get('/moment/home').then(response => {
			console.log("aaaa")
			this.datas = response.data.data;
			console.log(response.data.data);
		})
  },
  data(){
    return {
		datas: []
    }
  },
  methods :{
	initt : function(evt){
		console.log(evt.target.id)
		this.$axios.get('/moment/listinit?kind='+evt.target.id).then((response) => {
                console.warn(response);
                this.datas = response.data.data
				console.log("aaa")
            })
	},
	myupload : function(){
			location.href = "/upload"
		console.log("orderF22222222222222222222norderFnorderFnorderFnorderFn")
	},
	aa : function(){
			location.href = "/upload"
		console.log("orderF22222222222222222222norderFnorderFnorderFnorderFn")
	}
  }
}

</script>


<style>
.box {
	box-shadow: 5px 5px 20px #ccc;
	background-color: white;
}
</style>