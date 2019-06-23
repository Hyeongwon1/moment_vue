<template lang="html">
<div id="mybodyhtml">
	<top></top>

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
						<!-- <img id="like" class="img-responsive hj_heart_img" src="/image/like/heart.png"> -->
						<img src="/image/like/heart.png" class="img-responsive hj_heart_img" @click="checklike" value="1">
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
		<bottom></bottom>
</div>
</template>
<script>
import bottom from './bar/bottom.vue'
import top from './bar/top.vue'
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
			bottom,
			top
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
		checklike : function(evt){
			console.log(evt.target.attributes.src)
			console.log(evt.target.attributes)
			var heartflag = evt.target.attributes[1].value
			console.log(heartflag)
			if (heartflag == "1") {
				console.log("aaa")
				console.log(this.dats.d_like)
				this.dats.d_like + 1
				evt.target.attributes.src = '/image/like/full_heart.png'
			} else {
				
			}
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
	/* font-family: "�굹�s닎怨좊뵓"; */
	/* letter-spacing: -1px; */
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
	background-color: #e8f3ff;
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