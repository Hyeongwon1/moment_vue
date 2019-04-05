<template lang="html">
<body id="mybodyhtml">
<div @click="fnhome" id="head" class="hj_head fixed-top">
	in the moment
</div>
   <div class="datas">   
	   <div v-for="data in datas" :key="data.d_no" class="data">
         <div class="row hj_headmargin  col-sm-12  col-md-12 col-lg-12">
               <div id="date"></div>
               <div id="nickdiv">
                  <span style="color: orange" id="mem_nick" >{{data.m_nick}}</span>&nbsp;님
               </div>
            <div id="clear"></div>

            <div class=" h1_1 col-sm-12  col-md-12 col-lg-12"></div>
            <div id="mainData" class="col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
				<img class="img-responsive" v-bind:src="'/'+data.d_path" style="width:100%; margin:auto;">
            </div>
            <div class=" h1_1 col-sm-12  col-md-12 col-lg-12"></div>

            <div id="row">
               <div class="col-sm-12" id="icon">
				<div v-if="data.d_kind =='1'">
				  <img id="kindimg" style="float: right" class="img-responsive " src="/image/kind/eat.png">
				</div>
				<div v-else-if="data.d_kind =='2'">
				  <img id="kindimg" style="float: right" class="img-responsive " src="/image/kind/buy.png">
				</div> 
				<div v-else-if="data.d_kind =='3'">
				  <img id="kindimg" style="float: right" class="img-responsive " src="/image/kind/enjoy.png">
				</div>  
				  <!-- <div id ="clear" style="flaot: both"> -->
                  <img style="float: right" id="age" class="img-responsive " v-bind:src="'/image/age/'+data.m_age+'0s.png'"> 
                  <img id="like" style="float: left; margin-right: 3px" class="img-responsive hj_heart_img" src="/image/like/heart.png">
                  <span style="float: left" id="likecnt">{{data.d_like}}</span>
                   <img id="starimg" class="img-responsive hj_roll_img" style="float: left; margin-left: 10px"  v-bind:src="'/image/roll/r'+data.d_star+'.png'">
                 </div>
               </div>
               <div class=" h1_2 col-sm-12  col-md-12 col-lg-12"></div>
               <div id="title" class=" col-sm-12  col-md-12 col-lg-12 ">{{data.d_title}}</div>


               <div id="content" class=" col-sm-12  col-md-12 col-lg-12">{{data.d_content}}</div>

               <div class=" h1_1 col-sm-12  col-md-12 col-lg-12"></div>
               <div id="location">
                  <a id="mya" href="#">{{data.d_location}}</a>에서,
               </div>

            </div>
      
	   		</div>
	   </div>
	<div id="foot"></div>
</body>
</template>
<script>

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

  },
  methods: {
	fnhome : function(){
		location.href = "/home";
	}
   
  }
    
}
</script>

<style lang="css">
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
	float: left;
	vertical-align: bottom;
}

#nickdiv {
	text-align: right;
	vertical-align: bottom;
}

#date, #mem_nick {
	text-shadow: #999999 1px 1px 1px;
}

.hj_headmargin {
	margin-top: 60px;
	margin-bottom: 40px;
}

#clear {
	flaot: both;
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
	text-shadow: #999999 1px 1px 1px;
}

#content, #roll, #location {
	font-size: 10pt;
	text-shadow: #999999 1px 1px 1px;
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

#foot {
	margin-top: 80px
}

.hj_roll_img {
	width: 35px;
}

.hj_heart_img {
	width: 18px;
	margin-right: 10px;
}

#age {
	margin-right: 10px;
}

#kindimg, #age {
	width: 60px;
}

#icon {
	margin-bottom: 10px;
}
</style>