<template lang="html">
	<div id="mybodyhtml">
		<top></top>
		<div class="container" id="mycon" style="height: 100%;">
			<div class="row">
				<form id="mypageform" style="margin-top: 60px;">
					<input
						type="hidden"
						class="form-control"
						name="m_no"
						id="m_no"
						size="10"
						placeholder="Enter email"
					/>

					<div class="form-group">
						<label for="m_email">Email:</label>
						<input
							type="email"
							class="form-control"
							name="m_email"
							id="m_email"
							size="10"
							placeholder="Enter email"
							disabled
						/>
					</div>
					<div class="form-group">
						<label for="m_pw">Password:</label>
						<input
							type="password"
							class="form-control"
							name="m_pw"
							id="m_pw"
							size="10"
							placeholder="Enter password"
						/>
					</div>
					<div class="form-group">
						<label for="m_pw1">Password1:</label>
						<input
							type="password"
							class="form-control"
							name="m_pw1"
							id="m_pw1"
							size="10"
							placeholder="Enter password1"
						/>
					</div>
					<div class="form-group">
						<label for="m_phone">phone:</label>
						<input
							type="tel"
							class="form-control"
							name="m_phone"
							id="m_phone"
							size="10"
							placeholder="Enter phone"
						/>
					</div>

					<div class="form-group">
						<label for="m_nick">nickname:</label>
						<input
							type="text"
							class="form-control"
							name="m_nick"
							id="m_nick"
							size="10"
							placeholder="Enter nick"
						/>
					</div>
					<div class="form-group">
						<label for="m_birth">birth:</label>
						<input
							type="date"
							class="form-control"
							name="m_birth"
							id="m_birth"
							size="10"
							placeholder="Enter nick"
						/>
					</div>
				</form>
				<div id="button">
					<button class="btn btn-default" onclick="ajaxUpdate()">수정</button>
					<button class="btn btn-default" onclick="logoutfn()">로그아웃</button>
					<button class="btn btn-default" onclick="ajaxDelete()">탈퇴</button>
				</div>
			</div>
		</div>

		<div id="foot" class="sk_foot fixed-bottom">
			⊙ Copyright(c)2017 TT All rights reserved.
		</div>

		<v-form v-model="valid">
			<v-container>
				<v-layout>
					<v-flex xs12 md4>
						<v-text-field
							v-model="firstname"
							:rules="nameRules"
							:counter="10"
							label="First name"
							required
						></v-text-field>
					</v-flex>

					<v-flex xs12 md4>
						<v-text-field
							v-model="lastname"
							:rules="nameRules"
							:counter="10"
							label="Last name"
							required
						></v-text-field>
					</v-flex>

					<v-flex xs12 md4>
						<v-text-field
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							required
						></v-text-field>
					</v-flex>
				</v-layout>
			</v-container>
		</v-form>
	</div>
</template>
<script>
import top from '../bar/top.vue';
export default {
	created() {},
	data() {
		return {
			datas: [],
			m_email: '',
			m_pw: '',
		};
	},
	components: {
		top,
	},
	methods: {
		loginfn: function() {
			this.$axios
				.post('/moment/mem_logindb', {
					m_email: this.m_email,
					m_pw: this.m_pw,
				})
				.then(
					response => {
						this.datas = response.data;
						console.log(this.datas);
						console.log(this.datas[0].m_no);
						if (this.datas != null) {
							sessionStorage.setItem('m_email', this.m_email);
							sessionStorage.setItem('m_no', this.datas[0].m_no);
							console.log(sessionStorage.m_email);
							console.log(sessionStorage.m_no);
							location.href = '/home';
						}
						console.log(response);
					},
					function() {
						console.log('failed');
					},
				);
		},
	},
};
</script>

<style lang="css">
@font-face {
  font-family: "나눔고딕";
  src: url("/font/NANUMBARUNGOTHIC.TTF");
}

@font-face {
  font-family: "설렘";
  src: url("/font/210 설렘주의B.ttf");
}

@font-face {
  font-family: "PP";
  src: url("/font/Typo_PapyrusM.ttf");
}

@font-face {
  font-family: "Am";
  src: url("/font/AmaticSC-Regular.ttf");
}
</style>
