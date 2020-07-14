<template>
  <div id="map" style="width:100%;height:100vh;">
    <div class="col-4" style="color:red"></div>
    <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
  </div>
</template> 
<script>
export default {
  created() {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        this.displayMarker(locPosition, message);
      });
    }
  },
  data() {
    return {
      map: ""
    };
  },
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    initMap() {
      var container = document.getElementById("map"); //지도를 표시
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      var map = new kakao.maps.Map(container, options);
      //마커추가 하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({ position: map.getCenter() });

      // var clusterer = new kakao.maps.MarkerClusterer({
      //   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      //   minLevel: 10 // 클러스터 할 최소 지도 레벨
      // });
      marker.setMap(map);
    },
    addScript() {
      const script = document.createElement("script");
      /* global kakao */

      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f2a76fe4d088dbd5f2a75aad459a5e3a&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
    /* displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker_present = new kakao.maps.Marker({
        map: map,
        position: locPosition
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker_present);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    } */
  }
};
</script> 
<style scoped lang="scss">
// @import "@/assets/stylesheets/index.scss";
// #map {
//   @include css-size(300px, 300px);
// }
</style>

