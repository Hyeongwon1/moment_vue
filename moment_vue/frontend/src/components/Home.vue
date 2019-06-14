<template>
<body id="mybodyhtml">
<div @click="fnhome" id="head" class="hj_head fixed-top">
	in the moment
</div>

<div style="margin-top: 50px; width: 100%; background-color: black;">
			<div class="btn-group d-flex">
				<a href="#" @click="initt" class="btn hbtn" id="0" >A L L</a>
				<a href="#" @click="initt" class="btn hbtn" id="1" >E A T</a>
				<a href="#" @click="initt" class="btn hbtn" id="2" >B U Y</a>
				<a href="#" @click="initt" class="btn hbtn" id="3" >E N J O Y</a>
				<a href="#" class="btn hbtn" id="myaddress" data-toggle="collapse" data-target="#myinput">A D D R E S S</a>
			</div>
			<div id="myinput" class="collapse" style="padding-left: 10px; padding-right: 10px;">

				<div class="input-group" style="padding-bottom: 5px;">

						<input id="msearch" v-model="searchloc" type="text" class="form-control" placeholder="Search for..." style="background-color: white;">
					<span class="input-group-btn">
						<button class="btn btn-secondary mymys"  @click="searchlocbtn" style="width: 50px; background-color: white; color:black;" type="button"> Go!</button>
					</span>
				</div>

				<div style="background-color: black; height: 4px;"></div>
			</div>
			<button id="odbtn" class="ui-btn" @click="odbtn">{{newandlike}}</button>
	</div>
		<div class="datas" style="padding: 70px; margin-top: -50px;">
		<div v-for="data in datas" :key="data.d_no" class="data" style="width:350px; float:left; padding: 23px; margin-bottom: 50px; margin-top: 20px; position: relative;">
			<div id="colcol" class="" style="height: 300px;">
				<div class="box">
					<div class="s_pic" style="background-color: #d6dade; width: 100%; display: table;">
						<div class="ivdiv">
							<img class="mainimg" v-bind:src="'/'+data.d_path" v-bind:value="data.d_no" @click="picview" >
						</div>
					</div>
					<br>
					<div id="mynick" class="myname" style="float: left; margin-right: 15px; font-size: 10px;">{{data.m_nick}}</div>
						<div class="titlestar" style="float: right; margin-right: 10px; font-size: 15px; font-family: 설렘;">
							<img src="/image/like/heart.png" style="width:20px;float:left;margin-right:5px;" @click="checklike" value="1">{{data.d_like}}</div>
							<div class="titlestar" id="myage" style="font-size: 15px; font-family: 설렘;">
							<img v-bind:src="'/image/age/'+data.m_age+'0s.png'" style="width:40px;">
						</div>
						<div><p class="loctxt">{{data.d_location}}</p></div>
					<div id="mytitle" class="titlestar" style="margin-top: 10px; text-decoration: underline; font-size: 15px; font-family: 설렘;">{{data.d_title}}</div>
				</div>
			</div>

		</div>
		<div class="pupps" style="padding: 70px; margin-top: -50px;">
				{{pupps}}


		</div>
<div style="margin-top: 51px; width: 100%; background-color: black;">
	<div id="bottom_nav" class="btn-group d-flex fixed-bottom">
		<a href="#" class="btn fbtn" id="myhome" @click="pupp" >H O M E</a>
		<a href="#" class="btn fbtn" id="mylike" >L I K E</a> 
		<a href="#" class="btn fbtn" id="myupload" @click="myupload" >U P L O A D</a> 
		<a href="#" class="btn fbtn" id="myrecord" @click="myrecorcd" >M Y M Y</a> 
		<a href="#" class="btn fbtn" id="mymypage" @click="mypage">M Y p a g e</a>
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
		})
  },
  data(){
    return {
		datas: [],
		pupps: "",
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
	
		var anchList = document.getElementsByClassName("btn hbtn");
	   	 for (var i = 0; i < anchList.length; i++) {
					if (i == this.kinds) {
							var anchor = document.getElementsByClassName("btn hbtn")[i];
							anchor.className ='btn hbtn active';
					}else{
						var anchor = document.getElementsByClassName("btn hbtn")[i];
							anchor.className ='btn hbtn';
					}
				 }
				 
		this.$axios.get('/moment/listinit?kind='+evt.target.id).then((response) => {
								this.datas = response.data.data
								this.newandlike="L I K E ▼"
            })
	},
	myupload : function(){
			location.href = "/upload"
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
		
		if (this.searchloc) {
			this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
                console.warn(response);
                this.datas = response.data.data
    	})
		} else {
			this.$axios.get('/moment/listinit?ord='+ord+"&kind="+this.kinds).then((response) => {
									console.warn(response);
									this.datas = response.data.data
    	})
		}
	},
	searchlocbtn : function(){
			this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
                console.warn(response);
                this.datas = response.data.data
    })
	},
	picview : function(evt){
			console.log(evt.target.attributes[1].value)
			location.href = "/detail?d_no="+evt.target.attributes[1].value;
	},
	checklike : function(evt){
			console.log(evt.target.attributes.src)
			console.log(evt.target.attributes)
			var heartflag = evt.target.attributes[1].value
			console.log(heartflag)
			if (heartflag == "1") {
				console.log("aaa")
				
				evt.target.attributes.src = '/image/like/full_heart.png'
			} else {
				
			}
	},
	myrecorcd: function(){
		var s_m_email = sessionStorage.m_email
		console.log(s_m_email)
			this.$axios.post('/moment/myrecord_selectdb', {
					m_email: s_m_email								
			}).then(response => {

			this.datas = response.data

      }, function() {
      	console.log('failed')
      })
	},
	fnhome : function(){
		location.href = "/home";
	},
	mypage : function(){
		location.href = "/mypage";
	},
	pupp: function(){
			this.$axios.post('/moment/pupp', {
											
			}).then(response => {
				console.log(response.data)
				this.pupps = response.data
		
      }, function() {
      	console.log('failed')
      })
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
	font-family: "설렘";
	src: url("/font/210 설렘주의B.ttf")
}

@font-face {
	font-family: "나눔고딕";
	src: url("/font/NANUMBARUNGOTHIC.TTF")
}

div {
	font-family: "�������";
	text-shadow: #999999 1px 1px 1px;
}

div p.loctxt{
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mainimg {
	vertical-align: middle; 
	margin: auto; 
	height: 230px; 
	width:100%;
	
}
.ivdiv{
	display:table-cell; 
	vertical-align:middle; 
	height: 320px;
	background-color: black;
}
.hj_head {
   text-align: center;
   height: 50px;
   background-color: black;
   color: white;
   font-family: "Am";
   font-size: 25pt;
   vertical-align: middle;
}

.box {
	box-shadow: 5px 5px 20px #ccc;
	background-color: #e5e7e8;
	padding: 20px;
  width: 320px;
	
}

.btn.hbtn {
	background-color: black;
	font-family: "Am";
	color: white;
	font-size: 14pt;
	
}
.btn-group {
	width: 100%;
}
.btn.hbtn.active {
	background-color: white;
	font-family: "Am";
	color: black;
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
.btn.fbtn {
	background-color: black;
	font-family: "Am";
	color: white;
	font-size: 14pt;
}
.mymys{
    width: 50px;
    background-color: white;
    color: black;
}
#bottom_nav {
	width: 100%;
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