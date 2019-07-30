<template>
<body id="mybodyhtml">
<div>
	<div class="btn-group d-flex">
		<button @click="initt" class="btn hbtn" id="0" >A L L</button>
		<button @click="initt" class="btn hbtn" id="1" >E A T</button>
		<button @click="initt" class="btn hbtn" id="2" >B U Y</button>
		<button @click="initt" class="btn hbtn" id="3" >E N J O Y</button>
		<button class="btn hbtn" id="myaddress" data-toggle="collapse" data-target="#myinput">A D D R E S S</button>
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
	<v-layout justify-center>
		<v-flex sm10 md10>
		<v-card>
			<v-container
			fluid
			grid-list-md
			id='homecon'
			>
			<v-layout row wrap>
				<v-flex
				v-for="data in datas"
				:key="data.d_no"
				sm6 md3 xs6
				>
				<v-card>
					<v-img
					:src="data.d_path"
					height="250px"
					@click="picview"
					>
					<input id="" v-text="data.d_no" type="hidden"/>
					</v-img>
					<v-card-title>
						<v-layout fill-height>
						<v-flex xs12 align-end flexbox>
							<span id="mynick" class="mynick" v-text="data.m_nick"></span>
						</v-flex>
						</v-layout>
							<div class="myage" id="myage">
								<img class="myageimg" v-bind:src="'/image/age/'+data.m_age+'0s.png'">
							</div>
					</v-card-title>
					<v-card-actions>
					<v-spacer>
						<v-icon v-for=" data in data.d_star" 
								:key="data.d_no"
								color="teal" >star</v-icon>
						<!-- <img id="starimg" class="img-responsive hj_roll_img" v-bind:src="'/image/roll/r'+data.d_star+'.png'"> -->
					</v-spacer>
					<v-btn icon>
						<v-icon color="red">favorite</v-icon>
					</v-btn>
						<p class="" v-text="data.d_like"></p>
					</v-card-actions>
				</v-card>
				</v-flex>
			</v-layout>
			</v-container>
		</v-card>
		</v-flex>
	</v-layout>
</body>
</template>
<script>

export default {
	created(){
    this.$axios.get('/moment/home').then(response => {
			this.datas = response.data.data;
		})
	},
	components: {
	
	},
	data(){
		return {
			datas: [],
			pupps: "",
			newandlike:"N E W ▼",
			kinds:"",
			searchloc:"",
			d_no:"",
			data_num:""
		}
	},
	methods :{
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
									this.datas = response.data.data
    	})
		}
	},
	searchlocbtn : function(){
			this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
                console.warn(response);
                this.datas = response.data.data
    })
	},
	picview : function(evt){
			const s_no = sessionStorage.m_no
			const m_no = evt.target.firstChild.innerText
			this.$router.push({ path: 'detail', query: { m_no : m_no , s_no : s_no }})
	},
	checklike : function(evt){
			console.log(evt.target.attributes.src)
			console.log(evt.target.attributes)
			var heartflag = evt.target.attributes[1].value
			console.log(heartflag)
			if (heartflag == "1") {
				console.log("aaa")
				evt.target.attributes.src = '/image/like/full_heart.png'
			} else {
				
			}
	}
  }
}
</script>

<style>
@font-face {
	font-family: "Am";
	src: url("/font/AmaticSC-Regular.ttf");
}
@font-face {
	font-family: "설렘";
	src: url("/font/210 설렘주의B.ttf")
}
@font-face {
	font-family: "나눔고딕";
	src: url("/font/NANUMBARUNGOTHIC.TTF")
}

div p.loctxt{
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}
#myinput{
	padding-left: 10px; 
	padding-right: 10px;
	background-color: antiquewhite;	
}
.data{
	float:left; 
	margin: 30px;
	position: relative;
}
.data *{
	font-family: "설렘";
	font-size:20px;
}
.box {
	box-shadow: 5px 5px 20px #ccc;
	background-color: #e5e7e8;
	padding: 15px;
    width: 320px;
}
.mainimg {
	vertical-align: middle; 
	margin: auto; 
	height: 230px; 
	width:100%;
}
.ivdiv{
	display:table-cell; 
	vertical-align:middle; 
	height: 320px;
	background-color: black;
}
.mynick{
	font-family: "설렘";
	float: left; 
	margin-right: 15px; 
	font-size:20px;
}
.mylike{
	float: right; 
	margin-right: 10px; 
	font-size: 15px;
}
.mylikeimg{
	width:20px;
	float:left;
	margin-right:5px;
}
.myage{
	font-size: 15px;
	margin-bottom: 10px;
}
.myageimg{
	width:50px;
	/* margin-top: 6px; */
}
.mytitle{
	margin-top: 10px; 
	text-decoration: underline; 
}
.btn.hbtn {
	border-radius: 0rem;
	background-color: antiquewhite;
	font-family: "Am";
	color: #007bff;
	font-size: 14pt;
}
.btn-group {
	width: 100%;
}
.btn.hbtn.active {
	background-color: white;
	font-family: "Am";
	color: black;
	font-size: 14pt;
}

#odbtn {
	width: 100%;
    background-color: antiquewhite;
	font-size: 12pt;
	color: #007bff;
	font-family: "Am";
	margin: auto;
	height: 40px;
	border: 0px;  
}
.btn.fbtn {
	background-color: black;
	font-family: "Am";
	color: white;
	font-size: 14pt;
}
.myinputsearch{
    background-color: white;
    color: black;
}
#msearch{
	background-color: white;
}
</style>