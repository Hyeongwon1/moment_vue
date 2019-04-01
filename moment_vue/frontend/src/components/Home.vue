<template>
<body id="mybodyhtml">
	<script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
	<div id="head"></div>


	<div style="margin-top: 51px; width: 100%; background-color: black;">

		<div class="btn-group btn-group-justified">
			<a href="#" @click="initt" class="btn hbtn" id="0" style="color: white;">ALL</a>
			<a href="#" @click="initt" class="btn hbtn" id="1" style="color: white;">EAT</a>
			<a href="#" @click="initt" class="btn hbtn" id="2" style="color: white;">BUY</a>
			<a href="#" @click="initt" class="btn hbtn" id="3" style="color: white;">ENJOY</a>
			<a href="#" class="btn hbtn" id="myaddress" style="color: white;" data-toggle="collapse" data-target="#myinput">ADDRESS</a>
		</div>


		<div id="myinput" class="collapse" style="padding-left: 10px; padding-right: 10px;">

			<div class="input-group" style="padding-bottom: 5px;">

				<!-- <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"> -->
					<input id="msearch" v-model="searchloc" type="text" class="form-control" placeholder="Search for..." style="background-color: white;">
					<!-- </div> -->
				<span class="input-group-btn">
					<button class="btn btn-secondary mymys"  @click="searchlocbtn" style="width: 50px; background-color: white; color:black;" type="button"> Go!</button>
				</span>
			</div>

			<div style="background-color: black; height: 4px;"></div>
		</div>
		<button id="odbtn" class="ui-btn" @click="odbtn">{{newandlike}}</button>
	</div>
	
		<div class="datas">
		<div v-for="data in datas" :key="data.d_no" class="data">
			<div class="row"></div><br>
			<div id="colcol" class="">
				<div class="box" @click="picview" style="padding: 20px;">
					<input type="hidden" id="d_no" v-bind:value="data.d_no" v-model="d_no"/>
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
	<div id="bottom_nav" class="navbar-mobile btn-group btn-group-justified navbar-fixed-bottom">
		<a href="#" class="btn glyphicon glyphicon-home fbtn" id="myhome" style="color: white;"></a>
		<a href="#" class="btn glyphicon glyphicon-heart fbtn" id="mylike" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-camera fbtn" id="myupload" @click="myupload" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-menu-hamburger fbtn" id="myrecord" style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-user fbtn" id="mymypage" style="color: white;"></a>
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
		datas: [],
		newandlike:"N E W ▼",
		kinds:"",
		searchloc:"",
		d_no:""
    }
  },
  methods :{
	initt : function(evt){
		console.log(evt.target.id)
		this.kinds = evt.target.id
		this.$axios.get('/moment/listinit?kind='+evt.target.id).then((response) => {
								this.datas = response.data.data
								this.newandlike="L I K E ▼"
            })
	},
	myupload : function(){
			location.href = "/upload"
		console.log("orderF22222222222222222222norderFnorderFnorderFnorderFn")
	},
	odbtn : function(evt){
		var ord ;
		if (evt.target.innerText =="N E W ▼") {
				this.newandlike="L I K E ▼"
				ord = "nw"
		} else {
				ord = "lk"
		 		this.newandlike="N E W ▼"
		}
		this.$axios.get('/moment/listinit?ord='+ord+"&kind="+this.kinds).then((response) => {
                console.warn(response);
                this.datas = response.data.data
				console.log("aaa")
    })
	},
	searchlocbtn : function(){
		this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
                console.warn(response);
                this.datas = response.data.data
				console.log("aaa")
    })
	},
	picview : function(){
			console.log(this.target)
			console.log(this.d_no)
			console.log(this.target.d_no)


	}
  }
}

</script>


<style>
@font-face {
	font-family: "Am";
	src: url("/font/AmaticSC-Regular.ttf");
}

@font-face {
	font-family: "����";
	src: url("/font/210 설렘주의B.ttf")
}

@font-face {
	font-family: "�������";
	src: url("/font/NANUMBARUNGOTHIC.TTF")
}

div {
	font-family: "�������";
	text-shadow: #999999 1px 1px 1px;
}

#mainimg {
	
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
	width: 100%;
  background-color: black;
	font-size: 12pt;
	color: white;
	font-family: "Am";
	margin: auto;
	height: 40px;
	border: 0px;  
}

.mymys{
    width: 50px;
    background-color: white;
    color: black;
}
#bottom_nav {
	background-color: black;
}

.fbtn:active {
	background-color: #A9A9F5;
}

.fbtn:hover {
	background-color: #A9A9F5;
}

.hbtn:active {
	background-color: #A9A9F5;
}

.hbtn:hover {
	background-color: #A9A9F5;
}
</style>