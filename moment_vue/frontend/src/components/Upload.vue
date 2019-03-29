<template lang="html">
<body id="mybody">
<div style="margin-top: 100px;" id="head" onclick= "myh()"></div>
   <div> 
      <div style="margin-top: 100px;"></div>
      <div style="text-align: center">
         <table id="up_tb">
            <tr>
               <td colspan="3">
                  <div class="form-group kind_cl">
                     <select class="form-control" id="d_kind" name="d_kind" v-model="d_kind">
                        <option value="1">EAT</option>
                        <option value="2">BUY</option>
                        <option value="3">ENJOY</option>
                     </select>
                  </div>
               </td>
            </tr>
            <tr>
               <td><p id="title_p">TITLE</p></td>
               <td><input type="text" id="d_title" name="d_title" v-model="d_title"></td>
               <td id="mytd">
                  <div id='imgvideo' style='width: 56px; height: 56px;'></div>
               </td>

            </tr>
            <tr>
               <td colspan="3">
                  <form id="fileForm" enctype="multipart/form-data">
                     <button class="replace"></button>
                     <input type=file id="imginput" name="test4" class="upload1" v-model="d_img">
                  </form>
               </td>
            </tr>
            <tr>
               <td>
                  <p @click="handleAddress">
                     <img id="location_img" src="/image/location1.png">
                  </p>
               </td>
               <td colspan="2">
                  <input @click="handleAddress"type="text" id="d_location" name="d_location" placeholder="주소" v-model="d_location">
               </td>

            </tr>
            <tr>
               <td><p id="comment_p">COMMENT</p></td>
               <td colspan="2"><input type="text" id="d_content" name="d_content" v-model="d_content"></td>
            </tr>
            <tr>
               <td><p id="star_p">별점</p></td>
               <td colspan="2">
                  <div>
                     <select id="d_star" name="d_star" v-model="d_star">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                     </select>
                  </div>
               </td>
            </tr>

         </table>
      </div>
      <br> <br>



      <div style="text-align: center">

         <a href="#" @click="sendPost" id="write_bt" class="btn hbtn" style="color: white;">
            <img id="write_img" src="/image/pencil2.png"> Write
         </a> 
         
         <a href="/moment/home" id="cancel_a" class="btn hbtn" style="color: white;"> 
         	<img id="cancel_img" src="/image/cancel_icon3.png">Cancel
         </a>
      </div>

      <div id="foot" class="sk_foot navbar-fixed-bottom">⊙
         Copyright(c)2017 TT All rights reserved.</div>
   </div>
</body>
</template>
<script>
import DaumPostcode from 'vuejs-daum-postcode'
export default {
 data: {
  	d_title: '',
  	d_kind: '',
  	d_location: '',
  	d_path: '',
  	d_img: '',
  	d_content: '',
  	d_star: ''
  },
  components: {
    DaumPostcode
  },
  methods: {
    sendPost: function () {
       console.log(this.d_title)
      this.$axios.post('/moment/uploaddb', {
      	m_no: "1",
      	d_title: this.d_title,
      	d_kind: this.d_kind,
      	d_path: this.d_path,
      	d_location: this.d_location,
      	d_location: this.d_location,
      	d_img: this.d_img,
      	d_content: this.d_content,
      	d_star: this.d_star
      }).then(response => {

      	console.log(response)
      }, function() {
      	console.log('failed')
      })
    },
   handleAddress : function(data){
      let fullAddress = data.address
      let extraAddress = ''
      if (data.addressType === 'R') {
         if (data.bname !== '') {
            extraAddress += data.bname
         }
         if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName)
         }
         fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
      }
      
      console.log(fullAddress) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
      }
   
  }
    
}
</script>

<style lang="css">
@font-face {
   font-family: "Am";
   src: url("/font/AmaticSC-Regular.ttf");
}

.sk_head {
   text-align: center;
   height: 50px;
   background-color: black;
   color: white;
   font-family: "AM";
   font-size: 25pt;
   vertical-align: middle;
}

.sk_foot {
   text-align: center;
   height: 30px;
   background-color: black;
   color: white;
   font-family: "AM";
   font-size: 14pt;
   vertical-align: middle;
}

#up_tb {
   display: inline;
}

a {
   font-family: "나눔";
   font-size: 15px;
}

td {
   font-family: "나눔";
   font-weight: bold;
}

#d_img {
   width: 56px;
   height: 56px;
}

#img_td {
   padding-left: 10px
}

#bt_td {
   text-align: right
}

#title_p, #star_p, #com_p, #comment_p {
   text-shadow: #999999 1px 1px 1px;
   font-size: 10pt;
}

#write_a {
   font-family: AM
}

#location_img {
   width: 8px;
   height: 10px;
}

#d_location, #d_title, #d_content {
   text-align: right;
   border-top: solid 1px white;
   border-left: solid 1px white;
   border-right: solid 1px white;
}

#write_img, #cancel_img {
   width: 10px;
   height: 10px;
}

.hbtn {
   background-color: black;
   font-family: "Am";
   color: white;
   font-size: 10pt;
   height: 30px;
}

.kind_cl {
   background-color: black;
   font-family: "Am";
   color: white;
   font-size: 12pt;
}

#video_img, #camera_img, #gallery_img {
   width: 15px;
   height: 15px;
}

.ui-loading .ui-loader {
   display: block;
}

.ui-loader {
   display: none;
   position: absolute;
   opacity: .85;
   z-index: 100;
   left: 50%;
   width: 200px;
   margin-left: -130px;
   margin-top: -35px;
   padding: 10px 30px;
}

#imginput {
   opacity: 0; /*input type="file" tag 투명하게 처리*/
   position: relative;
   background-color: transparent;
}

button.replace { /*button tag 에 원하는 스타일 적용*/
   position: absolute;
   width: 27px;
   height: 27px;
   background-image: url("/image/camera_icon.png");
   cursor: pointer;
}

</style>