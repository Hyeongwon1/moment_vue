<template lang="html">
	<div id="mybodyhtml">
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
		<bottom></bottom>
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
    this.$axios
      .get(`https://www.googleapis.com/auth/userinfo.profile`)
      .then(response => {
        this.datas = response.data;
      });
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
#date,
#mem_nick {
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
#content,
#roll,
#location {
  font-size: 12pt;
  text-shadow: #999999 1px 1px 1px;
}
#content {
  word-break: break-all;
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
#age {
  margin-right: 10px;
}
#kindimg,
#age {
  width: 60px;
  float: right;
}
#starimg {
  margin-left: 10px;
}
</style>
