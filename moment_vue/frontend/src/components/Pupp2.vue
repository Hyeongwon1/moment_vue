<template lang="html">
	<body id="mybodyhtml">
		<top></top>
		<div style="text-align: center">
			<a
				href="#"
				@click="sendpupp"
				id="write_bt"
				class="btn hbtn"
				style="color: white;"
			>
				<img id="write_img" src="/image/pencil2.png" /> g e t
			</a>
			<a
				href="/moment/home"
				id="cancel_a"
				class="btn hbtn"
				style="color: white;"
			>
				<img id="cancel_img" src="/image/cancel_icon3.png" />Cancel
			</a>
		</div>
		<div class="rank" style="color: green">실시간순위</div>
		<div v-for="data in pupps" :key="data.num" class="viewdata">
			<div id="date">{{ data.num }}</div>
			<div id="nickdiv">
				<span style="color: orange" id="mem_nick">{{ data.value }}</span>
			</div>
			<div class="h1_pupp"></div>
			<div>{{ data.time }}</div>
		</div>
		<bottom></bottom>
	</body>
</template>
<script>
import bottom from './bar/bottom.vue';
import top from './bar/top.vue';
export default {
	created() {
		this.$axios.post('/moment/pupp2', {}).then(
			response => {
				console.log(response.data);
				this.pupps = response.data;
			},
			function() {
				console.log('failed');
			},
		);
	},
	data() {
		return {
			pupps: [],
		};
	},
	components: {
		bottom,
		top,
	},
	methods: {
		fnhome: function() {
			location.href = '/home';
		},
		myupload: function() {
			location.href = '/upload';
		},
		myrecorcd: function() {
			var s_m_email = sessionStorage.m_email;
			console.log(s_m_email);
			this.$axios
				.post('/moment/myrecord_selectdb', {
					m_email: s_m_email,
				})
				.then(
					response => {
						this.datas = response.data;
					},
					function() {
						console.log('failed');
					},
				);
		},
		mypage: function() {
			location.href = '/mypage';
		},
		pupp: function() {
			location.href = '/pupp1';
		},
		sendpupp: function() {
			this.$axios.post('/moment/pupp', {}).then(
				response => {
					console.log(response);
					console.log(response.data);
					this.pupps = response.data;
				},
				function() {
					console.log('failed');
				},
			);
		},
	},
};
</script>

<style>
.h1_pupp {
	border-top: 1px solid lightgray;
}
</style>
