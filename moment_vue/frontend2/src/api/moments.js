import { posts } from "./index";

//메인 셀렉트
function homeSelect(data) {
  console.log(data)
  return posts.get(`/homeSelect/`+data.ord+'/'+data.kind+'/'+data.loc);
}

function dataView(data) {
  return posts.get(`/data_view/`+data.dnum+'/'+data.mnum);
}

export { homeSelect, dataView };
