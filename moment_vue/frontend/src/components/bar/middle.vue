<template>
  <div>
		<div>
			<div class="btn-group d-flex">
				<a href="#" @click="initt" class="btn hbtn" id="0" >A L L</a>
				<a href="#" @click="initt" class="btn hbtn" id="1" >E A T</a>
				<a href="#" @click="initt" class="btn hbtn" id="2" >B U Y</a>
				<a href="#" @click="initt" class="btn hbtn" id="3" >E N J O Y</a>
				<a href="#" class="btn hbtn" id="myaddress" data-toggle="collapse" data-target="#myinput">A D D R E S S</a>
			</div>
			<div id="myinput" class="collapse">
				<div class="input-group">
					<input id="msearch" v-model="searchloc" type="text" class="form-control" placeholder="Search for location" >
					<span class="input-group-btn">
						<button class="btn btn-secondary myinputsearch"  @click="searchlocbtn" type="button"> Go!</button>
					</span>
				</div>
			</div>
			<button id="odbtn" class="ui-btn" @click="odbtn">{{newandlike}}</button>
		</div>
  </div>
</template>
 
<script>
export default {
  name: 'middle',
  data () {
    return {
				newandlike:"N E W ▼",
				searchloc:"",
				datas: []
    }
  },
  components: {
  },
  methods: {
		initt : function(evt){	
						console.log(evt.target.id)
						this.kinds = evt.target.id
				var anchList = document.getElementsByClassName("btn hbtn");
				for (var i = 0; i < anchList.length; i++) {
						if (i == this.kinds) {
								var anchor = document.getElementsByClassName("btn hbtn")[i];
								anchor.className ='btn hbtn active';
						}else{
							var anchor = document.getElementsByClassName("btn hbtn")[i];
								anchor.className ='btn hbtn';
						}
					}
				 
					this.$axios.get('/moment/listinit?kind='+evt.target.id).then((response) => {
								this.datas = response.data.data
								this.newandlike="L I K E ▼"
          })
		},
		odbtn : function(evt){
					var ord ;
					if (evt.target.innerText =="N E W ▼") {
							this.newandlike="L I K E ▼"
							ord = "nw"
					} else {
							ord = "lk"
							this.newandlike="N E W ▼"
					}
					if (this.searchloc) {
						this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
											console.warn(response);
											this.datas = response.data.data
						})
					} else {
						this.$axios.get('/moment/listinit?ord='+ord+"&kind="+this.kinds).then((response) => {
												console.warn(response);
												this.datas = response.data.data
						})
					}
			},
			searchlocbtn : function(){
						this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
											console.warn(response);
											this.datas = response.data.data
					})
			}
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>