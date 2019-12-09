<template lang="html">
	<div>
		<navtop></navtop>
		<br />
		<br />
		<div class="rank" style="color: green">실시간순위</div>
		<v-simple-table dense>
			<thead>
				<tr>
					<th class="text-left">no</th>
					<th class="text-left">검색어</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="data in pupps" :key="data.num">
					<td>{{ data.num }}</td>
					<td>{{ data.value }}</td>
					<td>{{ data.time }}</td>
				</tr>
			</tbody>
		</v-simple-table>

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
		<br />
		<br />
		<br />
		<navbottom></navbottom>
	</div>
</template>
<script>
export default {
  created() {
    this.$axios.post(`${this.$store.state.host}/pupp/pupp`, {}).then(
      response => {
        console.log(response.data);
        this.pupps = response.data;
      },
      function() {
        console.log("failed");
      }
    );
  },
  data() {
    return {
      pupps: []
    };
  },
  components: {},
  methods: {
    fnhome: function() {
      location.href = "/home";
    },
    myupload: function() {
      location.href = "/upload";
    },
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
    mypage: function() {
      location.href = "/mypage";
    },
    pupp: function() {
      location.href = "/pupp1";
    },
    sendpupp: function() {
      this.$axios.post(`${this.$store.state.host}/pupp/pupp`, {}).then(
        response => {
          console.log(response);
          console.log(response.data);
          this.pupps = response.data;
        },
        function() {
          console.log("failed");
        }
      );
    }
  }
};
</script>

<style>
.h1_pupp {
  border-top: 1px solid lightgray;
}
</style>
