<template lang="html">
<body id="mybody" class="mybody">
	<div class="container" id="mycon" style="height: 100%;">
		<form id="loginform" class="loginf" style="margin-top: 60px;" @submit.prevent="login"> 
			<div class="form-group">
				<label for="m_email">Email:</label> 
				<input type="email"class="form-control" name="m_email" id="m_email" size="10"placeholder="Enter email" v-model="m_email">
			</div>
			<div class="form-group">
				<label for="m_pw">Password:</label> 
				<input type="password" class="form-control" name="m_pw" id="m_pw" size="10" placeholder="Enter password" v-model="m_pw">
			</div>
			<button type="submit" class="btn btn-default lbtn" id="mem_login">:Login</button >
		</form>
<!-- 			<div class="checkbox"> -->
<!-- 				<label><input type="checkbox"> Remember me</label> -->
<!-- 			</div> -->
		<div id="btn-group btn-group d-flex">
			<a href="#" @click="initt"  class="btn btn-default lbtn" onclick="location.href='/moment/mem_insert'" id="mem_insert" value="회원가입">:Sign Up</a>
			<!-- <a href="#" @click="initt"  class="btn btn-default lbtn" onclick="logoutfn()" id="mem_logout" value="로그아웃">로그아웃</a> -->
			<a href="#" @click="initt"  class="btn btn-default lbtn" data-toggle="modal" data-target="#myModal">Forgot Id/Pw?</a>
		</div>
	</div>

<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">
		
		<!-- Modal content-->
		<div class="modal-content">
		
			<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">아이디 비밀번호 찾기</h4>
			</div>
			<div class="modal-body">
			
	<h3 align="center">아이디 찾기</h3>
	<div align="center">
		<div class="form-group">
				<label for="m_phone">Phone:</label> 
				<input type="tel" class="form-control" name="m_phone" id="m_phone" size="10" placeholder="Enter tel">
			</div>
		<span id="id_result"></span><br><br>
		<button class="btn btn-default" id="id" onclick="emailsearchfn()">ID찾기</button>
	</div>
	<br />
	<hr/>
	
	<h3 align="center">비번 찾기</h3>
	<div align="center">
		<div class="form-group">
				<label for="m_email_s">Email:</label> 
				<input type="email" class="form-control" name="m_email_s" id="m_email_s" size="10" placeholder="Enter email" >
			</div>
		<div class="form-group">
				<label for="m_tel_s">Phone:</label> 
				<input type="tel" class="form-control" name="m_tel_s" id="m_tel_s" size="10" placeholder="Enter phone">
			</div>
		<span id="pw_result"></span><br /><br />
		<button id="pw" class="btn btn-default" onclick="emailsearchpwfn()">PW찾기</button>
	</div>
        </div>
        <div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
		</div>
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
			console.log(this.datas[0].m_no)
			if (this.datas != null) {
				sessionStorage.setItem('m_email', this.m_email);
				sessionStorage.setItem('m_no', this.datas[0].m_no);
				this.$router.push({ path: 'home' })
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
	background-color: antiquewhite;	
}

.loginf{
	background-color: antiquewhite;
	font-family: "Am";
	color: #007bff;
	font-size: 20pt;
}
.container{

}
.form-group{
	font-family: "Am";
	color: #007bff;
	font-size: 20pt;
	
}
.form-control{
	border: 1px solid #999;
	/* border-radius: 0; */
}

.btn.lbtn {
	background-color: antiquewhite;
	font-family: "AM";
	color: #007bff;
	font-size: 20pt;
}
.btn-group {
	font-family: "AM";
	width: 100%;
}


</style>