<template>
  <div>
    <br>
    <br>
    <v-bottom-navigation
       v-model="bottomNav"
      :value="activeBtn"
      fixed
      color="pink"
      grow
    >
      <v-btn
        v-for="bitem in bitems"
        :key="bitem.id"
        text
        @click="nav(bitem.id)"
      >
        <span>{{bitem.name}}</span>
        <v-icon>{{bitem.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>
export default {
  name: 'bottom',
  data () {
    return {
      activeBtn : 1,
      id:"",
      bitems: [
				{name:'Home'       ,id:0 ,icon: 'home'},
				{name:'Favorites'  ,id:1 ,icon: 'favorite'},
				{name:'Image Up'	 ,id:2 ,icon: 'image'},
				{name:'search'     ,id:3 ,icon: 'search'},
				{name:'mypage'     ,id:4 ,icon: 'perm_identity'}
            ],
    }
  },
  components: {

  },
  methods: {
      nav : function(id){
        console.log("asdsadsadasd")
        console.log(id)
        this.id=id
        switch (this.id) {
            case 0: return this.$router.push({ path: 'home' }) 
            case 1: return "";
            case 2: return this.$router.push({ path: 'upload' })
            case 3: return "";
            case 4: return mypage();
          }
      },
      home : function(){
          this.$router.push({ path: 'home' })
      },
      favorites : function(){
          // this.$router.push({ path: 'home' })
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
      this.$router.push({ path: 'mypage', query: { m_no : m_no , s_no : s_no }})
      }
  }
}
</script>
<style scoped>

</style>