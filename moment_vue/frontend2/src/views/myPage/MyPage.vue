<template lang="html">
	<div id="mybodyhtml">
    <br>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3 fluid>
				<v-card>
					<v-container grid-list-sm fluid>
						<v-layout row wrap>
							<v-flex v-for="data in datas" :key="data.d_no" xs4 d-flex>
								<v-card flat tile class="d-flex">
									<v-img
										:src="'/' + data.d_path"
										:lazy-src="'/' + data.d_path"
										:value="data.d_no"
										aspect-ratio="1"
										class="grey lighten-2"
										@click="picview"
									>
										<template v-slot:placeholder>
											<v-layout fill-height align-center justify-center ma-0>
												<v-progress-circular
													indeterminate
													color="grey lighten-5"
												></v-progress-circular>
											</v-layout>
										</template>
									</v-img>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
		<a
			href="#"
			@click="logoutfn"
			class="btn btn-default lbtn"
			id="mem_logout"
			value="로그아웃"
			>로그아웃</a
		>
	</div>
</template>
<script>
export default {
  created() {
    // var a = window.location.href;
    // var arr = [];
    // arr = a.split('=');
    // var mno = arr[1];
    // var sno = arr[2];
    // this.$axios
    //   .get(`https://www.googleapis.com/auth/userinfo.profile`)
    //   .then(response => {
    //     this.datas = response.data;
    //   });
  },
  data() {
    return {
      datas: []
    };
  },
  components: {},
  methods: {
    myrecorcd: function() {
      var s_m_email = sessionStorage.m_email;
      console.log(s_m_email);
      this.$axios
        .post("/moment/myrecord_selectdb", {
          m_email: s_m_email
        })
        .then(
          response => {
            this.datas = response.data;
          },
          function() {
            console.log("failed");
          }
        );
    },
    logoutfn: function() {
      sessionStorage.removeItem("m_email");
      console.log("aaaaaa");
      // 로컬스토리지 삭제
      this.$router.push({ path: "login" });
    },
    picview: function(evt) {
      console.log(evt);
      // const sNo = sessionStorage.m_no;
      // const m_no =evt.target.attributes[2].value
      // location.href = `/detail?m_no=${m_no}&s_no=${s_no}`;
    }
  }
};
</script>

<style>
@font-face {
  font-family: "나눔고딕";
  src: url("/font/NANUMBARUNGOTHIC.TTF");
}

@font-face {
  font-family: "설렘";
  src: url("/font/210 설렘주의B.ttf");
}

@font-face {
  font-family: "���씠�룷";
  src: url("/font/Typo_PapyrusM.ttf");
}

@font-face {
  font-family: "Am";
  src: url("/font/AmaticSC-Regular.ttf");
}
</style>
