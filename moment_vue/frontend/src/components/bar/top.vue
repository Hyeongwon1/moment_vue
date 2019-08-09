<template>
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
      <router-link to="/home"><a class="head_moment">in the moment</a></router-link>
      </v-card-title>
    </v-card>
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