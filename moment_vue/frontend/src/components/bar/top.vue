<template>
  <!-- <div>
    <div class="headtop">
	</div>	
	<div id="head" class="hj_head">	
		<a @click="fnhome" class="head_moment">in the moment</a>
		<router-link to="/home"><a class="head_moment">in the moment</a></router-link>
	</div> -->
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        	<Slide>
            <a id="home" href="#" @click="pupp">
              <span>puppnaver</span>
            </a>
            <a id="skysc" href="#" @click="pupp">
              <span>puppskysc</span>
            </a>
          </Slide>
        <!-- <h1 to="/home"><h1 class="font-weight-bold display-1">in the moment</h1></router-link> -->
      <router-link to="/home"><a class="head_moment">in the moment</a></router-link>
      </v-card-title>
  
      <v-tabs
        v-model="tab"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
        </v-tab-item>
      </v-tabs-items>
    </v-card>
</template>
 
<script>
import { Slide } from 'vue-burger-menu' 
export default {
  name: 'top',
  data () {
    return {
        tab: null,
        items: [
                'ALL', 'EAT', 'BUY', 'ENJOY','ADDRESS'
              ],
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
			this.$router.push({ path: 'pupp1' })
      }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hj_head {
   text-align: center;
   /* height: 50px; */
   background-color: antiquewhite;
   /* font-family: "Am"; */
   /* font-size: 25pt; */
   /* vertical-align: middle; */
}
.head_moment {
   color: black;
   font-family: "Am";
   font-size: 25pt;
   vertical-align: middle;
}
.headtop{
    height: 30px;
    background: antiquewhite;
}
</style>