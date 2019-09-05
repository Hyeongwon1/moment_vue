<template>
  <div>
    <br>
    <br>
    <v-bottom-navigation
      :active.sync="bottomNav"
      :value="true"
      fixed
      grow
      id='bottom_nav'
    >
      <v-btn
        color="teal"
        text
        value="Home"
        @click="home" 
      >
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="favorites"
        @click="favorites" 
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="Image"
        @click="myupload" 
      >
        <span>Image Up</span>
        <v-icon>image</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="search"
        @click="myrecorcd"
      >
        <span>search</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        text
        value="mypage"
        @click="mypage"
      >
        <span>mypage</span>
        <v-icon>perm_identity</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
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
      favorites : function(){
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

</style>