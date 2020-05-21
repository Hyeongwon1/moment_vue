# 요청 객체 (Request)

req.params : 이름 붙은 라우트 파라미터를 담는다.  
ex : app.get(’/:idx’, (req, res) => { res.send(req.params.idx); });

req.params(name) : 이름 붙은 라우트 파라미터나 GET, POST 파라미터를 담는다. 하지만 여러가지 혼란을 줄 수 있어 사용하는 것을 지양해야한다.

req.query : GET 방식으로 넘어오는 쿼리 스트링 파라미터를 담고 있다.

# 미들웨어
Express는 위에서 부터 미들웨어가 차례대로 실행된다.


