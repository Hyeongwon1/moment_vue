<template>
<body id="mybodyhtml">
  <div class="headtop">
		<Slide>
		<a id="home" href="#" @click="pupp">
			<span>puppnaver</span>
		</a>
		<a id="skysc" href="#" @click="pupp">
			<span>puppskysc</span>
		</a>
		</Slide>
	</div>	
	<div id="head" class="hj_head">	
		<a @click="fnhome" class="head_moment">in the moment</a>
	</div>







  <div>
    <div id="bottom_nav" class="btn-group d-flex fixed-bottom">
      <a href="#" class="btn fbtn" id="myhome" >H O M E</a>
      <a href="#" class="btn fbtn" id="mylike" >L I K E</a> 
      <a href="#" class="btn fbtn" id="myupload" @click="myupload">U P L O A D</a> 
      <a href="#" class="btn fbtn" id="myrecord" @click="myrecorcd">M Y M Y</a> 
      <a href="#" class="btn fbtn" id="mymypage" @click="mypage">M Y p a g e</a>
    </div>
  </div>
</body>
</template>
 
<script>
import { Slide } from 'vue-burger-menu' 
export default {
  name: 'lay',
  data () {
    return {
     
    }
  },
  components: {
    Slide
  },
  methods: {
      myupload : function(){
          location.href = "/upload"
      },
      myrecorcd: function(){
        var s_m_email = sessionStorage.m_email
        console.log(s_m_email)
          this.$axios.post('/moment/myrecord_selectdb', {
              m_email: s_m_email								
          }).then(response => {

          this.datas = response.data

          }, function() {
            console.log('failed')
          })
      }
      ,
      mypage : function(){
        location.href = "/mypage";
      }
      ,pupp: function(){
		location.href = "/pupp1";

	// 		this.$axios.post('/moment/pupp', {
											
	// 		}).then(response => {
	// 			console.log(response.data)
	// 			this.pupps = response.data
		
    //   }, function() {
    //   	console.log('failed')
    //   })
	}
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>