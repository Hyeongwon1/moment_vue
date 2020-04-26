import { posts } from "./index";

//메인 셀렉트
function homeSelect(data) {
  return posts.post(`/homeSelect`, data);
}

function dataView(data) {
  return posts.post(`/data_view`, data);
}

export { homeSelect, dataView };
