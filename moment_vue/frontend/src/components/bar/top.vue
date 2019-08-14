<template>
<div>
 <v-app-bar
    app
    grow
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click.stop="drawer = !drawer"
    />
    <v-container
      mx-auto
      py-0
    >
      <v-layout>
        <!-- <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        /> -->
        <router-link to="/home"><a class="head_moment">in the moment</a></router-link>
        <v-spacer />
        <v-btn 
          v-for="item in items"
          :key="item.id"
          class="ml-0 hidden-sm-and-down"
          text
          @click="initt(item.id)"
        >
          {{ item.name }}
        </v-btn>
    
        <v-spacer />
        <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />
      </v-layout>
    </v-container>
  </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> -->
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item-content>
              <v-list-item-title>
                <a id="home" href="#" @click="pupp">
                  <span>puppnaver</span>
                </a>
              </v-list-item-title>
            </v-list-item-content>

      <v-divider></v-divider>
        <v-list dense>
  
          <v-list-item
            v-for="item in items"
            :key="item.id"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</div>
    <!-- <v-card>
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
    </v-card> -->
</template>

<script>
import { Slide } from 'vue-burger-menu' 
export default {
  name: 'top',
  data () {
    return {
      drawer : false,
      items: [
				{name:'ALL'  ,id:'0' ,icon: 'dashboard'},
				{name:'EAT'  ,id:'1' ,icon: 'dashboard'},
				{name:'BUY'	 ,id:'2' ,icon: 'dashboard'},
				{name:'ENJOY',id:'3' ,icon: 'dashboard'}
            ],
    }
  },
  watch: {

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