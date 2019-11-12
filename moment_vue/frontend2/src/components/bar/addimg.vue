<template lang="html">
	<div>
		<v-card flat tile class="d-flex">
			<img
				:src="sel.img"
				:value="sel.no"
				height="250px"
				aspect-ratio="1"
				class="grey lighten-2"
				@click="picview"
			/>
		</v-card>
	</div>
</template>
<script>
export default {
	data() {
		return {
			imageData: '',
			imageFiles: [],
			// sel_file: [{ no: '', img: '' }],
			sel_file: [],
			sel_aaa: '',
			customImageMaxSize: 3,
		};
	},
	components: {},
	methods: {
		sendPost: function() {
			var formData = new FormData();
			formData.append('image', this.imageFiles[0]);
			formData.append('m_no', sessionStorage.m_no);
			formData.append('d_title', this.d_title);
			formData.append('d_kind', this.d_kind);
			formData.append('d_location', this.d_location);
			formData.append('d_content', this.d_content);
			formData.append('d_star', this.d_star);
			const config = {
				headers: { 'content-type': 'multipart/form-data' },
			};
			console.log(formData);
			this.$axios.post('/moment/uploaddb', formData, config).then(
				response => {
					if (response.data.err) {
						alert(response.data.err.code);
					} else {
						location.href = '/home';
					}
				},
				function() {
					console.log('failed');
				},
			);
		},
		handleAddress: function(data) {
			let fullAddress = data.address;
			let extraAddress = '';
			if (data.addressType === 'R') {
				if (data.bname !== '') {
					extraAddress += data.bname;
				}
				if (data.buildingName !== '') {
					extraAddress +=
						extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
				}
				fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
			}
			console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
			this.d_location = fullAddress;
			if (fullAddress) {
				this.$refs.modalclose.click();
			}
		},
		onSelectFile3: function(event) {
			this.imageFiles = event.target.files;
			var input = event.target;
			console.log(input.files.length);

			var filesArr = Array.prototype.slice.call(this.imageFiles);

			filesArr.forEach(f => {
				// if (!f.type.match('image/jpeg.*')) {
				// 	alert('이미지 확장자만 가능');
				// 	return;
				// }
				console.log(f);
				this.sel_file.push(f);

				var reader = new FileReader();
				reader.onload = e => {
					this.sel_file.push({ data: e.target.result, no: 1 });
					console.log(this.sel_file[0].data);
				};
				reader.readAsDataURL(input.files[0]);
			});
		},
		onSelectFile: function(event) {
			this.imageFiles = event.target.files;
			// Reference to the DOM input element
			var input = event.target;
			// Ensure that you have a file before attempting to read it
			console.log(input.files.length);
			// var imagess;
			console.log(this.sel_file.length);
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = e => {
					// var imagess =
					this.sel_file.push({
						no: this.sel_file.length,
						img: e.target.result,
					});
				};
				// Start the reader job - read file as a data url (base64 format)
				reader.readAsDataURL(input.files[0]);
			}
		},
		onSelectFile2: function(event) {
			this.imageFiles = event.target.files;
			// Reference to the DOM input element
			var input = event.target;
			// Ensure that you have a file before attempting to read it
			console.log(input.files.length);
			if (input.files && input.files[0]) {
				// create a new FileReader to read this image and convert to base64 format
				var reader = new FileReader();
				// Define a callback function to run, when FileReader finishes its job
				reader.onload = e => {
					// Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
					// Read image as base64 and set to imageData
					this.imageData = e.target.result;
					console.log(this.imageData);
				};
				// Start the reader job - read file as a data url (base64 format)
				reader.readAsDataURL(input.files[0]);
			}
		},
		chooseImage() {
			this.$refs.fileInput.click();
		},
		// onSelectFile2() {
		// 	const input = this.$refs.fileInput;
		// 	const files = input.files;
		// 	if (files && files[0]) {
		// 		const reader = new FileReader();
		// 		reader.onload = e => {
		// 			this.imageData = e.target.result;
		// 		};
		// 		reader.readAsDataURL(files[0]);
		// 		this.$emit('input', files[0]);
		// 	}
		// },
		fnhome: function() {
			location.href = '/home';
		},
	},
};
</script>

<style lang="css">
@font-face {
  font-family: "Am";
  src: url("/font/AmaticSC-Regular.ttf");
}

.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}

img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
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
  padding-left: 10px;
}

#bt_td {
  text-align: right;
}

#title_p,
#star_p,
#com_p,
#comment_p {
  text-shadow: #999999 1px 1px 1px;
  font-size: 10pt;
}

#write_a {
  font-family: AM;
}

#location_img {
  width: 15px;
  height: 20px;
}

#d_kind {
  width: 100%;
}

#d_location,
#d_title,
#d_content {
  text-align: right;
  border-top: solid 1px white;
  border-left: solid 1px white;
  border-right: solid 1px white;
  width: 100%;
}

#write_img,
#cancel_img {
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

#video_img,
#camera_img,
#gallery_img {
  width: 15px;
  height: 15px;
}

.ui-loading .ui-loader {
  display: block;
}

.ui-loader {
  display: none;
  position: absolute;
  opacity: 0.85;
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

v-btn.replace {
  /*button tag 에 원하는 스타일 적용*/
  position: absolute;
  width: 24.5px;
  height: 26px;
  background-image: url("/image/camera_icon.png");
  cursor: pointer;
}
</style>
