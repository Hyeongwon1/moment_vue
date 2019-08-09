<template>
<body id="mybodyhtml">
		<v-tabs
			v-model="tab"
			grow
		>
			<v-tab
			v-model="kinds"
			@click="initt(item.id)"
			v-for="item in items"
			:key="item.id"
			>
			{{ item.name }}
			</v-tab>
		</v-tabs>
		<v-btn 
		id="odbtn"
		@click="odbtn">{{newandlike}}</v-btn>
	<v-layout justify-center>
		<v-flex sm12 md12>
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
			console.log(this.datas)
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
			ord:"",
			searchloc:"",
			d_no:"",
			data_num:"",
			tab: null,
			items: [
				{name:'ALL'  ,id:'0'},
				{name:'EAT'  ,id:'1'},
				{name:'BUY'	 ,id:'2'},
				{name:'ENJOY',id:'3'}
            ],
		}
	},
	methods :{
	initt : function(id){
		this.$axios.get('/moment/listinit?kind='+id).then((response) => {
			this.datas = response.data.data
			this.newandlike="L I K E ▼"
        })
	},
	odbtn : function(){
		if (this.newandlike =="N E W ▼") {
			this.newandlike="L I K E ▼"
			this.ord = "nw"
		} else {
			this.ord = "lk"
			this.newandlike="N E W ▼"
		}
		if (this.searchloc) {
			this.$axios.get('/moment/home_address_selectdb?ord='+this.ord+"&kind="+this.kinds+"&loc="+this.searchloc).then((response) => {
                console.warn(response);
                this.datas = response.data.data
			})
		} else {
			this.$axios.get(`/moment/listinit?ord=${this.ord}&kind=${this.tab}`).then((response) => {
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
.mynick{
	font-family: "설렘";
	float: left; 
	margin-right: 15px; 
	font-size:20px;
}
.myage{
	font-size: 15px;
	margin-bottom: 10px;
}
.myageimg{
	width:50px;
	/* margin-top: 6px; */
}
#odbtn {
	width: 100%;
    /* background-color: antiquewhite; */
	font-size: 12pt;
	color: #007bff;
	font-family: "Am";
	margin: auto;
	height: 40px;
	border: 0px;  
}
.myinputsearch{
    background-color: white;
    color: black;
}
#msearch{
	background-color: white;
}
</style>