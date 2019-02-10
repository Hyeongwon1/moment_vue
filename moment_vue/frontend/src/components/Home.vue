<template lang="html">
<body id="mybodyhtml">
	<div id="head"></div>
	

	<div style="margin-top: 51px; width: 100%; background-color: black;">

		<div class="btn-group btn-group-justified">
			<a href="#" class="btn hbtn" id="myall" style="color: white;">ALL</a>
			<a href="#" class="btn hbtn" id="myeat" style="color: white;">EAT</a>
			<a href="#" class="btn hbtn" id="mybuy" style="color: white;">BUY</a>
			<a href="#" class="btn hbtn" id="myenjoy" style="color: white;">ENJOY</a>
			<a href="#" class="btn hbtn" id="myaddress" style="color: white;"
				data-toggle="collapse" data-target="#myinput">ADDRESS</a>
		</div>


		<div id="myinput" class="collapse"
			style="padding-left: 10px; padding-right: 10px;">

			<div class="input-group" style="padding-bottom: 5px;">

				<input id="msearch" type="text" class="form-control" placeholder="Search for..." style="background-color: white;">
				<span class="input-group-btn">
					<button class="btn btn-secondary mymys"style="width: 60px; background-color: white; border: solid 2px white;" type="button">Go!</button>
				</span>
			</div>

			<div style="background-color: black; height: 4px;"></div>
		</div>

		<button id="odbtn" class="ui-btn" onclick="orderFn()">N E W ▼</button>
	</div>
	<br>
	<br>
	<div data-role="" class="container mymain"></div>


	<br>
	<br>
	<br>
	<div id="bottom_nav"
		class="navbar-mobile btn-group btn-group-justified navbar-fixed-bottom">
		<a href="#" class="btn glyphicon glyphicon-home fbtn" 			id="myhome" 	style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-heart fbtn" 			id="mylike"		style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-camera fbtn"			id="myupload" 	style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-menu-hamburger fbtn" id="myrecord"	style="color: white;"></a> 
		<a href="#" class="btn glyphicon glyphicon-user fbtn" 			id="mymypage" 	style="color: white;"></a>
	</div>

</body>
</template>

<script>
console.log("aaaaaaaaaaaaaaaa")
export default {
  created () {
    this.$http.get('/moment/home')
    .then((response) => {
      this.datas = response.data
    })
  },
  data () {
    return {
      movies: []
    }
  }
}
</script>

<style lang="css">
</style>