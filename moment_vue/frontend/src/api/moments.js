import { posts } from "./index";

//메인 셀렉트
function homeSelect(data) {
  console.log(data);
  data.loc = data.loc || " ";
  return posts.get(`/moment/${data.kind}?ord=${data.ord}&loc=${data.loc}`);
}

function dataView(data) {
  return posts.get(`/moment/data-view/${data.dnum}/${data.mnum}`);
}

export { homeSelect, dataView };
