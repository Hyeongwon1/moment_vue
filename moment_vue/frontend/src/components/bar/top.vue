<template>
<div>
<v-app-bar
  app
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
        <router-link to="/home"><a class="head_moment">in the moment</a></router-link>
        <v-spacer/>
        <v-spacer>
        <v-btn 
          v-for="item in items"
          :key="item.id"
          class="ml-1 hidden-sm-and-down"
          style="height : 48px;"
          text
          @click="initt(item.id)"
        >
          {{ item.name }}
        </v-btn>
        </v-spacer>
        <v-text-field
          flat
          v-model="searchloc"
          placeholder="search location"
          v-on:keyup.enter="onEnter"
          hide-details
          solo-inverted
          style="max-width: 180px;"
        />
        <v-btn
        text
        value="search"
        style="height : 48px;"
        @click="search"
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
    </v-container>
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
      items: [
				{name:'ALL'  ,id:'0' ,icon: 'dashboard'},
				{name:'EAT'  ,id:'1' ,icon: 'dashboard'},
				{name:'BUY'	 ,id:'2' ,icon: 'dashboard'},
				{name:'ENJOY',id:'3' ,icon: 'dashboard'}
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
        this.$emit("aaarr",id)
        },
        onEnter: function() {
        console.log("navtop"+this.searchloc)
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
  font-size: 22pt;
  vertical-align: middle;
}
</style>