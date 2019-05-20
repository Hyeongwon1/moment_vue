<template lang="html">
<body id="mybody" class="mybody">

	<div onclick="fn()" id="head" class="hj_head fixed-top">
		in the moment
	</div>
	<br>
	<div class="container" id="mycon" style="height: 100%;">
       <div class="row">
		<form id="mypageform" style="margin-top: 60px;">
			
			<input type="hidden" class="form-control" name="m_no" id="m_no" size="10"placeholder="Enter email">
		
			<div class="form-group">
				<label for="m_email">Email:</label> 
				<input type="email"class="form-control" name="m_email" id="m_email" size="10"placeholder="Enter email" disabled>
			</div>
			<div class="form-group">
				<label for="m_pw">Password:</label> 
				<input type="password" class="form-control" name="m_pw" id="m_pw" size="10" placeholder="Enter password">
			</div>
			<div class="form-group">
				<label for="m_pw1">Password1:</label> 
				<input type="password" class="form-control" name="m_pw1" id="m_pw1" size="10" placeholder="Enter password1">
			</div>
			<div class="form-group">
				<label for="m_phone">phone:</label> 
				<input type="tel" class="form-control" name="m_phone" id="m_phone" size="10" placeholder="Enter phone">
			</div>
			
			<div class="form-group">
				<label for="m_nick">nickname:</label> 
				<input type="text" class="form-control" name="m_nick" id="m_nick" size="10" placeholder="Enter nick">
			</div>
			<div class="form-group">
				<label for="m_birth">birth:</label> 
				<input type="date" class="form-control" name="m_birth" id="m_birth" size="10" placeholder="Enter nick">
			</div>
			
		</form>
		<div id="button">
		<button class="btn btn-default" onclick="ajaxUpdate()">수정</button>
		<button class="btn btn-default" onclick="logoutfn()">로그아웃</button>
		<button class="btn btn-default" onclick="ajaxDelete()">탈퇴</button> 
	    </div>
	  </div>
	</div>
	
	 	<div id="foot" class="sk_foot fixed-bottom">⊙
         Copyright(c)2017 TT All rights reserved.
      </div>
</body>
</template>
<script>

export default {
created(){
  },   
 data() {
	return {
		datas:[],
		m_email:"",
		m_pw:""
    }
  },
  components: {

  },
  methods: {
	loginfn : function () {
		  this.$axios.post('/moment/mem_logindb', {
				m_email: this.m_email,
				m_pw: this.m_pw,
      }).then(response => {
		  this.datas = response.data
		  console.log(this.datas)
		  console.log(this.datas[0].m_no)
		  if (this.datas != null) {
			sessionStorage.setItem('m_email', this.m_email);
			sessionStorage.setItem('m_no', this.datas[0].m_no);
			console.log(sessionStorage.m_email)
			console.log(sessionStorage.m_no)
			location.href = "/home";
		  } else {
			  
		  }
      	console.log(response)
      }, function() {
      	console.log('failed')
      })
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
	font-family: "PP";
	src: url("/font/Typo_PapyrusM.ttf")
}

@font-face {
	font-family: "Am";
	src: url("/font/AmaticSC-Regular.ttf");
}
.mybody{
	background-color: black;	
}

.loginf{
	background-color: black;
	font-family: "Am";
	color: white;
	font-size: 20pt;
}
.container{

}
.form-group{
	font-family: "Am";
	color: white;
	font-size: 20pt;
	
}
.form-control{
	border: 1px solid #999;
	/* border-radius: 0; */
}

.btn.lbtn {
	background-color: black;
	font-family: "AM";
	color: white;
	font-size: 20pt;
}
.btn-group {
	font-family: "AM";
	width: 100%;
}




body {
	font-family: "";
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

.lbtn:active {
	background-color: #A9A9F5;
}

.lbtn:hover {
	background-color: #A9A9F5;
}
</style>