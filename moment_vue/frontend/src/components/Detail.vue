<template lang="html">
<body id="mybodyhtml">
	<div class="headtop">
		<Slide>
		<a id="home" href="#" @click="pupp">
			<span>pupptest</span>
		</a>
		</Slide>
	</div>	
	<div id="head" class="hj_head">	
		<a @click="fnhome" class="head_moment">in the moment</a>
	</div>

	<div v-for="data in datas" :key="data.d_no" class="viewdata">
         <div class="headmargin">
               <div id="date">{{data.d_regdate}}</div>
               <div id="nickdiv">
                  <span style="color: orange" id="mem_nick" >{{data.m_nick}}</span>
               </div>
            <div class="h1_1"></div>
            <div id="mainData" class="">
				<img class="img-responsive" v-bind:src="'/'+data.d_path" style="width:75%; margin:auto; display: block;">
            </div>
            <div class="h1_1"></div>
				<div id="icon" class="col-sm-12" >
						<div v-if="data.d_kind =='1'">
							<img id="kindimg" class="img-responsive " src="/image/kind/eat.png">
						</div>
						<div v-else-if="data.d_kind =='2'">
							<img id="kindimg" class="img-responsive " src="/image/kind/buy.png">
						</div> 
						<div v-else-if="data.d_kind =='3'">
							<img id="kindimg" class="img-responsive " src="/image/kind/enjoy.png">
						</div>  
					<img id="age" class="img-responsive " v-bind:src="'/image/age/'+data.m_age+'0s.png'"> 
					<div>
						<img id="like" class="img-responsive hj_heart_img" src="/image/like/heart.png">
						<span id="likecnt">{{data.d_like}}</span>
						<img id="starimg" class="img-responsive hj_roll_img" v-bind:src="'/image/roll/r'+data.d_star+'.png'">
					</div>
				</div>
				<div id="row" style="margin-top: 10px;">
					<div class=" h1_2"></div>
					<div id="title" class=" col-sm-12  col-md-12 col-lg-12 ">{{data.d_title}}</div>
					<div id="content" class=" col-sm-12  col-md-12 col-lg-12">{{data.d_content}}</div>
					<div class="h1_1 "></div>
					<div id="location">
						<a id="mya" href="#">{{data.d_location}}</a>에서,
					</div>
				</div>
        </div>	
	</div>
		<div id="bottom_navd" class="btn-group d-flex fixed-bottom">
			<a href="#" class="btn fbtn" id="myhome" >H O M E</a>
			<a href="#" class="btn fbtn" id="mylike" >L I K E</a> 
			<a href="#" class="btn fbtn" id="myupload" @click="myupload" >U P L O A D</a> 
			<a href="#" class="btn fbtn" id="myrecord" @click="myrecorcd" >M Y M Y</a> 
			<a href="#" class="btn fbtn" id="mymypage" @click="mypage">M Y p a g e</a>
		</div>
</body>
</template>
<script>
import { Slide } from 'vue-burger-menu' 
export default {
	created(){
      var a = window.location.href
		var arr = []
		arr = a.split("=")
		var dno = arr[1]
		
      console.log(dno)
    this.$axios.get('/moment/data_view?dnum='+dno).then(response => {
			console.log("aaaa")
		 this.datas = response.data;
         console.log(this.datas)
         console.log(response.data)
		})
  	},   
	data() {
		return {
			datas: []
    	}	
  	},
  	components: {
		Slide // Register your component
  	},
  	methods: {
		fnhome : function(){
			location.href = "/home";
		},
		myupload : function(){
				location.href = "/upload"
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
		mypage : function(){
			location.href = "/mypage";
		},
		pupp : function(){
			location.href = "/pupp1";
		}
	}
}
</script>

<style>
@font-face {
	font-family: "나눔고딕";
	src: url("/font/NANUMBARUNGOTHIC.TTF")
}

@font-face {
	font-family: "설렘";
	src: url("/font/210 설렘주의B.ttf")
}

@font-face {
	font-family: "���씠�룷";
	src: url("/font/Typo_PapyrusM.ttf")
}

@font-face {
	font-family: "Am";
	src: url("/font/AmaticSC-Regular.ttf");
}
body {
	font-family: "�굹�닎怨좊뵓";
	letter-spacing: -1px;
}
#date {
	text-align: left;
	margin-left: 8px;
	float: left;
	vertical-align: bottom;
}
#nickdiv {
	text-align: right;
	margin-left: auto;
	vertical-align: bottom;
	margin-right: 10px;
}
#date, #mem_nick {
	text-shadow: #999999 1px 1px 1px;
}
.headmargin {
	margin-top: 60px;
	margin-bottom: 40px;
	/* height:-webkit-fill-available; */
}
#clear {
	float: both;
}
#title {
	text-decoration: underline;
	font-size: 16pt;
	margin-bottom: 10px;
	text-shadow: #999999 2px 2px 2px;
	font-family: "�꽕�젞";
}
#location {
	float: right;
	text-align: right;
	margin-right: 10px;
	text-shadow: #999999 1px 1px 1px;
}
#content, #roll, #location {
	font-size: 12pt;
	text-shadow: #999999 1px 1px 1px;
}
#content{
	word-break:break-all;
}
.h1_1 {
	border-top: 1px solid lightgray;
	margin: 10px;
}
.h1_2 {
	border-top: 1px solid lightgray;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 10px;
}
.hj_roll_img {
	width: 35px;
}
.hj_heart_img {
	width: 18px;
}
#bottom_navd {
	width: 100%;
	background-color: black;
}
#age {
	margin-right: 10px;
}
#kindimg, #age {
	width: 60px;
	float: right ;
}
#starimg {
    margin-left: 10px;
}
</style>