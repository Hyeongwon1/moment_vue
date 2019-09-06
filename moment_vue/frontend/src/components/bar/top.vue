<template>
<div>
<v-app-bar
  app
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click.stop="drawer = !drawer"
    />
    <!-- <v-container
      mx-auto
      py-0
    > -->
      <v-layout>
        <v-spacer/>
        <router-link to="/home"><a class="head_moment">in the moment</a></router-link>
        <v-spacer>
          <v-tabs
            v-model="model"
            align-with-title
            background-color="transparent"
            slider-color="pink"
          >
            <v-tab
              v-for="item in items"
              :key="item.id"
              v-model="model"
              align-with-title
              background-color="transparent"
              class="ml-2 hidden-sm-and-down"
              style="height : 48px;"
              text
              @click="initt(item.id)"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </v-spacer>
        <v-btn
        text
        value="search"
        style="height : 48px;"
        @click="onEnter"
        >
        {{newandlike}}
        </v-btn>
        <v-text-field
          flat
          v-model="searchloc"
          placeholder="search location"
          v-on:keyup.enter="onEnter"
          hide-details
          solo-inverted
          style="max-width: 150px;"
        />
        <v-btn
        text
        value="search"
        style="height : 48px;"
        @click="onEnter"
        >
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn 
          class="ml-1 hidden-sm-and-down"
          style="height : 48px;"
          text
          @click="login('99')"
        >
        LOGIN
        </v-btn>
      </v-layout>
    <!-- </v-container> -->
  </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
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

      <v-list dense>
      <v-list-item-content>
          <v-list-item
              v-for="title in titles"
              :key="title.id"
              @click="login(title.id)"
            >
            <v-list-item-icon>
              <v-icon>{{ title.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ title.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list-item-content>
      </v-list>
      <v-divider></v-divider>
        <v-list dense>
          <v-list-item-group v-model="model" active-class="border" color="pink">
            <v-list-item
              v-for="item in items"
              :key="item.id"
              @click="initt(item.id)"
            >
            <v-list-item-icon>
              <v-icon>{{ item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
</div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      drawer : false,
      searchloc: "",
      newandlike:"NEW ▼",
      model: 1,
      items: [
				{name:'ALL'  ,id:'0' ,icon: 'dashboard'},
				{name:'EAT'  ,id:'1' ,icon: 'restaurant_menu'},
				{name:'BUY'	 ,id:'2' ,icon: 'money'},
				{name:'ENJOY',id:'3' ,icon: 'map'}
            ],
        titles: [
				{name:'LOGIN' ,id:'99' ,icon: 'dashboard'},
				{name:'PUPP'  ,id:'88' ,icon: 'dashboard'},
            ],    
    }
  },
  props:{

  },
  watch: {

  },
  components: {
  
  },
  methods: {
        login: function(id){
          if (id == "99") {
            this.$router.push({ path: 'login' })
          } else {
            this.$router.push({ path: 'pupp1' })
          }
        },
        initt: function(id){
        this.$router.push({ path: 'home' })
        this.$emit("aaarr",id)
        },
        onEnter: function() {
        this.$router.push({ path: 'home' })
        this.$emit("searchloc",this.searchloc)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.head_moment {
  color: black;
  font-family: "Am";
  font-size: 20pt;
  vertical-align: middle;
}
</style>