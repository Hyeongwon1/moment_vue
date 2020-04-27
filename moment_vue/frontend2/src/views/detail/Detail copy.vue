<template lang="html">
	<div id="mybodyhtml">
		<navtop
			:id="id"
			:searchloc="searchloc"
			:ord="ord"
			@aaarr="initt"
			@ord="odbtn"
			@searchloc="searchlocbtn"
		>
		</navtop>
		<div v-for="data in datas" :key="data.d_no" class="viewdata">
			<div class="headmargin">
				<div id="date">{{ data.d_regdate }}</div>
				<div id="nickdiv">
					<span style="color: orange" id="mem_nick">{{ data.m_nick }}</span>
				</div>
				<div class="h1_1"></div>
				<div id="mainData" class="">
					<img
						class="img-responsive"
						v-bind:src="'/' + data.d_path"
						style="width:75%; margin:auto; display: block;"
					/>
				</div>
				<div class="h1_1"></div>
				<div id="icon" class="col-sm-12">
					<img
						v-if="data.d_kind == '1'"
						id="kindimg"
						class="img-responsive"
						src="/image/kind/eat.png"
					/>
					<img
						v-if="data.d_kind == '2'"
						id="kindimg"
						class="img-responsive "
						src="/image/kind/buy.png"
					/>
					<img
						v-if="data.d_kind == '3'"
						id="kindimg"
						class="img-responsive "
						src="/image/kind/enjoy.png"
					/>
					<img
						id="age"
						class="img-responsive "
						v-bind:src="'/image/age/' + data.m_age + '0s.png'"
					/>
					<div v-if="data.check_flag == '0'">
						<img
							src="/image/like/heart.png"
							class="img-responsive hj_heart_img"
							@click="checklike"
							v-bind:value="0"
							v-bind:aaa="data.d_no"
						/>
						<span class="likecnt">{{ data.d_like }}</span>
						<img
							id="starimg"
							class="img-responsive hj_roll_img"
							v-bind:src="'/image/roll/r' + data.d_star + '.png'"
						/>
					</div>
					<div v-if="data.check_flag == '1'">
						<img
							src="/image/like/full_heart.png"
							class="img-responsive hj_heart_img"
							@click="checklike"
							v-bind:value="data.check_flag"
							v-bind:aaa="data.d_no"
						/>
						<span class="likecnt">{{ data.d_like }}</span>
						<img
							id="starimg"
							class="img-responsive hj_roll_img"
							v-bind:src="'/image/roll/r' + data.d_star + '.png'"
						/>
					</div>
				</div>
				<div id="row" style="margin-top: 10px;">
					<div class=" h1_2"></div>
					<div id="title" class=" col-sm-12  col-md-12 col-lg-12 ">
						{{ data.d_title }}
					</div>
					<div id="content" class=" col-sm-12  col-md-12 col-lg-12">
						{{ data.d_content }}
					</div>
					<div class="h1_1 "></div>
					<div id="location">
						<a id="mya" href="#">{{ data.d_location }}</a
						>에서,
					</div>
				</div>
			</div>
		</div>

		<v-card
			v-for="data in datas"
			:key="data.d_no"
			:loading="loading"
			class="mx-auto my-12"
			max-width="374"
		>
			<v-img height="250" :src="'/' + data.d_path"> </v-img>

			<v-card-title>{{ data.d_title }} </v-card-title>
			<v-card-text>
				<v-row align="center">
					<v-rating
						:value="data.d_star"
						color="amber"
						half-increments
						dense
						size="14"
						readonly
					></v-rating>

					<div class="grey--text ml-4">{{ data.d_star }} (413)</div>
				</v-row>

				<div class="my-4 subtitle-1 black--text">
					{{ data.d_location }}
				</div>

				<div>
					{{ data.d_content }}
				</div>
			</v-card-text>

			<v-divider class="mx-4"></v-divider>

			<v-card-text>
				<div class="title text--primary">Tonight's availability</div>
				<v-chip-group
					v-model="selection"
					active-class="deep-purple accent-4 white--text"
					column
				>
					<v-chip>5:30PM</v-chip>
					<v-chip>7:30PM</v-chip>
					<v-chip>8:00PM</v-chip>
					<v-chip>9:00PM</v-chip>
				</v-chip-group>
			</v-card-text>

			<v-card-actions>
				<v-btn color="deep-purple accent-4" text @click="reserve">
					Reserve
				</v-btn>
			</v-card-actions>
		</v-card>
		<navbottom></navbottom>
	</div>
</template>
<script>
export default {
  created() {
    var a = window.location.href;
    var arr = [];
    arr = a.split("=");
    var mno = arr[1];
    var sno = arr[2];
    this.$axios
      .get(`/moment/data_view?mnum=${mno}&snum=${sno}`)
      .then(response => {
        this.datas = response.data;
      });
  },
  data() {
    return {
      datas: []
    };
  },
  props: {},
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
    checklike: async function(evt) {
      // console.log(evt.target)
      // console.log(evt.target.nextSibling.nextSibling.innerText)
      // console.log(evt.target.attributes[1].value)
      // console.log(evt.target.attributes[2].value)
      const s_no = sessionStorage.m_no;
      var heartflag = evt.target.attributes[1].value;
      if (heartflag == "0") {
        evt.target.attributes.src.nodeValue = "/image/like/full_heart.png";
        evt.target.attributes[1].value = 1;
        var likecnt = evt.target.nextSibling.nextSibling.innerText;
        evt.target.nextSibling.nextSibling.innerText = Number(likecnt) + 1;
      } else if (heartflag == "1") {
        evt.target.attributes.src.nodeValue = "/image/like/heart.png";
        evt.target.attributes[1].value = 0;
        var likecntt = evt.target.nextSibling.nextSibling.innerText;
        evt.target.nextSibling.nextSibling.innerText = Number(likecntt) - 1;
      }
      await this.$axios
        .post("/moment/like", {
          d_no: evt.target.attributes[2].value,
          d_like: evt.target.nextSibling.nextSibling.innerText,
          sno: s_no,
          flag: heartflag
        })
        .then(
          response => {
            console.log(response.data);
          },
          function() {
            console.log("failed");
          }
        );
      // var result = await this.$axios.poos
      // var result = await this.$axios.poos
      // var result = await this.$axios.poos
      // var result = await this.$axios.poos
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
  height: 20px;
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
