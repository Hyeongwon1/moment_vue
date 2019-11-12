<template>
	<body id="mybodyhtml">
		<navtop
			:id="id"
			:searchloc="searchloc"
			:ord="ord"
			@aaarr="initt"
			@ord="odbtn"
			@searchloc="searchlocbtn"
		></navtop>
		<!-- <v-btn
      id="odbtn"
      @click="odbtn">
      {{newandlike}}
  </v-btn>-->
		<br />
		<br />
		<v-layout align-stretch>
			<v-flex sm12 md12>
				<v-container grid-list-md sm12 md12>
					<v-layout row wrap>
						<v-flex v-for="data in datas" :key="data.d_no" xs6 sm6 md4 lg3>
							<v-card>
								<v-img :src="data.d_path" height="250px" @click="picview">
									<input id v-text="data.d_no" type="hidden" />
								</v-img>
								<v-card-title>
									<v-layout fill-height>
										<v-flex xs12 align-end flexbox>
											<span
												id="mynick"
												class="mynick"
												v-text="data.m_nick"
											></span>
										</v-flex>
									</v-layout>
									<div class="myage" id="myage">
										<img
											class="myageimg"
											v-bind:src="'/image/age/' + data.m_age + '0s.png'"
										/>
									</div>
								</v-card-title>
								<v-card-actions>
									<v-spacer>
										<v-icon
											v-for="data in data.d_star"
											:key="data.d_no"
											color="teal"
											>star</v-icon
										>
									</v-spacer>
									<v-btn icon>
										<v-icon color="red">favorite</v-icon>
									</v-btn>
									<p class v-text="data.d_like"></p>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>
		</v-layout>
		<navbottom></navbottom>
	</body>
</template>
<script>
export default {
	created() {
		this.$axios.get('/moment/home').then(response => {
			this.datas = response.data.data;
			console.log(this.datas);
		});
	},
	watch: {},
	components: {},
	data() {
		return {
			datano: '',
			datas: [],
			pupps: '',
			id: '',
			newandlike: 'N E W ▼',
			kinds: '',
			ord: '',
			searchloc: '',
			d_no: '',
			data_num: '',
			tab: null,
		};
	},
	methods: {
		initt: function(id) {
			this.id = id;
			this.$axios.get('/moment/listinit?kind=' + id).then(response => {
				this.datas = response.data.data;
				this.newandlike = 'L I K E ▼';
			});
		},
		odbtn: function() {
			if (this.newandlike === 'N E W ▼') {
				this.newandlike = 'L I K E ▼';
				this.ord = 'nw';
			} else {
				this.ord = 'lk';
				this.newandlike = 'N E W ▼';
			}
			if (this.searchloc) {
				this.$axios
					.get(
						'/moment/home_address_selectdb?ord=' +
							this.ord +
							'&kind=' +
							this.id +
							'&loc=' +
							this.searchloc,
					)
					.then(response => {
						console.warn(response);
						this.datas = response.data.data;
					});
			} else {
				this.$axios
					.get(`/moment/listinit?ord=${this.ord}&kind=${this.id}`)
					.then(response => {
						this.datas = response.data.data;
					});
			}
		},
		searchlocbtn: function(searchloc) {
			console.log('여기탄거..?');
			console.log(searchloc);
			this.searchloc = searchloc;
			console.log(this.searchloc);
			this.$axios
				.get(
					`/moment/home_address_selectdb?kind=${this.id}&loc=${this.searchloc}`,
				)
				.then(response => {
					// console.warn(response);
					this.datas = response.data.data;
				});
		},
		picview: function(evt) {
			const sNo = sessionStorage.m_no;
			const mNo = evt.target.firstChild.innerText;
			this.$router.push({ path: 'detail', query: { m_no: mNo, s_no: sNo } });
		},
		checklike: function(evt) {
			console.log(evt.target.attributes.src);
			console.log(evt.target.attributes);
			var heartflag = evt.target.attributes[1].value;
			console.log(heartflag);
			if (heartflag === '1') {
				console.log('aaa');
				evt.target.attributes.src = '/image/like/full_heart.png';
			}
		},
	},
};
</script>

<style>
@font-face {
	font-family: 'Am';
	src: url('/font/AmaticSC-Regular.ttf');
}
@font-face {
	font-family: '설렘';
	src: url('/font/210 설렘주의B.ttf');
}
@font-face {
	font-family: '나눔고딕';
	src: url('/font/NANUMBARUNGOTHIC.TTF');
}

div p.loctxt {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.mynick {
	font-family: '설렘';
	float: left;
	margin-right: 15px;
	font-size: 20px;
}
.myage {
	font-size: 15px;
	margin-bottom: 10px;
}
.myageimg {
	width: 50px;
	/* margin-top: 6px; */
}
#odbtn {
	width: 100%;
	/* background-color: antiquewhite; */
	font-size: 17pt;
	color: #007bff;
	font-family: 'Am';
	margin-top: 50px;
	height: 55px;
	border: 0px;
}
.myinputsearch {
	background-color: white;
	color: black;
}
#msearch {
	background-color: white;
}
</style>
