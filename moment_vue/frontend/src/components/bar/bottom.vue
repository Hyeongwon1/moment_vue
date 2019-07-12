<template>
  <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="color"
      id='bottom_nav'
    >
      <v-btn
        color="teal"
        flat
        value="Home"
        @click="home" 
      >
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="Image"
        @click="myupload" 
      >
        <span>Image Up</span>
        <v-icon>image</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="search"
        @click="myrecorcd"
      >
        <span>search</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="mypage"
        @click="mypage"
      >
        <span>mypage</span>
        <v-icon>perm_identity</v-icon>
      </v-btn>
    </v-bottom-nav>
</template>
<script>
export default {
  name: 'bottom',
  data () {
    return {
    
    }
  },
  components: {

  },
  methods: {
      home : function(){
          this.$router.push({ path: 'home' })
      },
      myupload : function(){
          this.$router.push({ path: 'upload' })
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
      },
      mypage : function(){
			const s_no = sessionStorage.m_no
			const m_no =sessionStorage.m_no
      // location.href = `/mypage?m_no=${m_no}&s_no=${s_no}`;
      this.$router.push({ path: 'mypage', query: { m_no : m_no , s_no : s_no }})
      }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bottom_nav {
  background-color: antiquewhite
	/* width: 100%; */
	/* position: sticky; */
	/* background-color: black; */
}
</style>