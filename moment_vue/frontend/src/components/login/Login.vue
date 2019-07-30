<template>
<body class="loginbody">
	<v-layout column align-center persistent>
		<v-form
			ref="form"
			@submit.prevent="loginfn"
		>
			<v-text-field
			v-model="m_email"
			:counter="15"
			label="Email"
			required
			></v-text-field>
			<v-text-field
			v-model="m_pw"
			:counter="15"
			label="Password"
			required
			:append-icon="'visibility'"
			:type="'password'"
			></v-text-field>
			<v-checkbox
			v-model="Remember"
			label="Remember?"
			required
			></v-checkbox>
			<v-layout justify-center>
				<v-btn type="submit" class="mr-4 lbtn" >:Login</v-btn>
			</v-layout >
		</v-form>
	</v-layout>

	<v-layout justify-center>
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on }">
				<v-btn color="" v-on="on">:Sign Up</v-btn>
				<v-btn  @click="initt" data-toggle="modal" data-target="#myModal">Forgot Id/Pw?</v-btn >
			</template>
			<v-card>
			<v-card-title>
				<span class="headline">User Profile</span>
			</v-card-title>
			<v-card-text>
				<v-container grid-list-md>
				<v-layout wrap>
					<v-flex xs12 sm6 md4>
					<v-text-field v-model="i_nick" label="Nick name*" required ></v-text-field>
					</v-flex>
					<v-flex xs12>
					<v-text-field v-model="i_email" label="Email*" required></v-text-field>
					</v-flex>
					<v-flex xs12>
					<v-text-field v-model="i_pw" label="Password*" type="password" required></v-text-field>
					</v-flex>
					<v-flex xs12 sm6>
						<v-menu
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						:return-value.sync="date"
						transition="scale-transition"
						offset-y
						full-width
						min-width="290px"
						>
						<template v-slot:activator="{ on }">
							<v-text-field
							v-model="i_date"
							label="BirthDay"
							prepend-icon="event"
							readonly
							v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="i_date" no-title scrollable>
							<v-spacer></v-spacer>
							<v-btn text color="" @click="menu = false">Cancel</v-btn>
							<v-btn text color="" @click="$refs.menu.save(i_date)">OK</v-btn>
						</v-date-picker>
						</v-menu>
					</v-flex>
					<v-flex xs12 sm6>
					<v-text-field v-model="i_phone" label="Phone" type="Phone" required></v-text-field>
					</v-flex>
				</v-layout>
				</v-container>
				<small></small>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="signUp">Save</v-btn>
			</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>



		<!-- <form id="loginform" class="loginf" @submit.prevent="loginfn"> 
			<v-text-field
				v-model="m_email"
				:error-messages="nameErrors"
				:counter="15"
				label="Email"
				required
				@input="$v.name.$touch()"
				@blur="$v.name.$touch()"
			></v-text-field>
			<v-text-field
				v-model="m_pw"
				v-bind="$attrs"
				v-on="$listeners"
				:counter="10"
				required
				label="Password"
				:append-icon="visible ? 'visibility_off' : 'visibility'"
				:append-icon-cb="() => (visible = !visible)"
				:type="visible ? 'text' : 'password'"
			/>
			<v-btn class="mr-4 lbtn" @click="submit">submit</v-btn>
			<v-btn class="lbtn" @click="clear">clear</v-btn>
		</form>
			<a href="#" @click="inittrrrr"  class="btn btn-default lbtn"  id="mem_insert" value="회원가입">:Sign Up</a>
			<a href="#" @click="logoutfn"  class="btn btn-default lbtn"  id="mem_logout" value="로그아웃">로그아웃</a>
			<a href="#" @click="initt"  class="btn btn-default lbtn" data-toggle="modal" data-target="#myModal">Forgot Id/Pw?</a> -->

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
import router from '@/router'
export default {
created(){
	},   
	data() {
		return {
			datas:[],
			m_email:"",
			m_pw:"",
			i_email:"",
			i_nick:"",
			i_date:"",
			i_pw:"",
			i_phone:"",	
			dialog: false,
			alert:false,
			date: new Date().toISOString().substr(0, 10),
			menu: false
		}
	},
	components: {

	},
	methods: {
		loginfn : async function () {
				var self = this;
				var result = await this.$axios.post('/moment/mem_logindb', {
						m_email: this.m_email,
						m_pw: this.m_pw,
				})
				if (result.data != "" && result.data != null) {
					sessionStorage.setItem('m_email', this.m_email);
					sessionStorage.setItem('m_no', result.data[0].m_no);
					router.push({ path: 'home' })
					console.log('여기는 오는거야????')
				} else {
					alert = true;
					console.log('널임')
					alert('아이디 또는 비밀번호가 다릅니다.')
				}
				console.log(result.data)
				console.log(result)
				// this.$axios.post('/moment/mem_logindb', {
				// 		m_email: this.m_email,
				// 		m_pw: this.m_pw,
				// }).then(response => {
				// 	this.datas = response.data
				// 	console.log(this.datas[0].m_no)
				// if (this.datas != null) {
				// 	sessionStorage.setItem('m_email', this.m_email);
				// 	sessionStorage.setItem('m_no', this.datas[0].m_no);
				// 	console.log("라우터")
				// 	console.log(router)
				// 	// location.href = "/home";
				// 	router.push({ path: 'home' })
				// } else {
					
				// }
				// 	console.log(response)
				// }, function() {
				// 	console.log('failed')
				// })
		},
		logoutfn : function () {
			sessionStorage.removeItem('m_email')
			console.log("aaaaaa")
			//로컬스토리지 삭제
			// router.push({ path: 'login' })
		},
		inittrrrr : function () {
			console.log("aaaaaa")
			this.dialog = false

		},
		signUp : async function () {
			console.log(this.i_email)
			console.log(this.i_pw)
			console.log(this.i_phone)
			console.log(this.i_date)
			console.log(this.i_email)
			var formData = new FormData();
			formData.append("i_email", this.i_email);
			formData.append("i_pw", this.i_pw);
			formData.append("i_date", this.i_date);
			formData.append("i_phone", this.i_phone);
			formData.append("i_nick", this.i_nick);
			const config = {
				headers: { 'content-type': 'multipart/form-data' }
				}
				
				// this.$axios.post('/moment/mem_insertdb',formData).then(response => {
				// 	if (response.data.err) {
				// 		alert(response.data.err.code)
				// 	} else {
				// 	}
				// }, function() {
				// 	console.log('failed')
				// })

				var result = await this.$axios.post('/moment/mem_insertdb',formData, config)
				// if (result.data != "" && result.data != null) {
				// 	sessionStorage.setItem('m_email', this.m_email);
				// 	sessionStorage.setItem('m_no', result.data[0].m_no);
				// 	router.push({ path: 'home' })
				// 	console.log('여기는 오는거야????')
				// } else {
				// 	alert = true;
				// 	console.log('널임')
				// 	alert('아이디 또는 비밀번호가 다릅니다.')
				// }
				// console.log(result.data)
				// console.log(result)
				// this.$axios.post('/moment/mem_logindb', {
				// 		m_email: this.m_email,
				// 		m_pw: this.m_pw,
				// }).then(response => {
				// 	this.datas = response.data
				// 	console.log(this.datas[0].m_no)
				// if (this.datas != null) {
				// 	sessionStorage.setItem('m_email', this.m_email);
				// 	sessionStorage.setItem('m_no', this.datas[0].m_no);
				// 	console.log("라우터")
				// 	console.log(router)
				// 	// location.href = "/home";
				// 	router.push({ path: 'home' })
				// } else {
					
				// }
				// 	console.log(response)
				// }, function() {
				// 	console.log('failed')
				// })
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
.loginbody{
	background-color: antiquewhite;	
	height: -webkit-fill-available;
}

.loginf{
	background-color: antiquewhite;
	font-family: "나눔고딕";
	color: #007bff;
	font-size: 20pt;
}
.container{

}
.form-group{
	font-family: "나눔고딕";
	color: #007bff;
	font-size: 20pt;
}
.form-control{
	border: 1px solid #999;
	/* border-radius: 0; */
}
.btn-group {
	font-family: "AM";
	width: 100%;
}


</style>