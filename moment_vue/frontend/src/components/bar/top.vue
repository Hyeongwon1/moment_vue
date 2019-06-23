<template>
  <div>
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
  </div>
</template>
 
<script>
import { Slide } from 'vue-burger-menu' 
export default {
  name: 'top',
  data () {
    return {
     
    }
  },
  components: {
    Slide, // Register your component
  },
  methods: {
      fnhome : function(){
		    location.href = "/home";
    	},
	    pupp: function(){
		    location.href = "/pupp1";
      }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>