# 요청 객체 (Request)

req.params : 이름 붙은 라우트 파라미터를 담는다.  
ex : app.get(’/:idx’, (req, res) => { res.send(req.params.idx); });

req.params(name) : 이름 붙은 라우트 파라미터나 GET, POST 파라미터를 담는다. 하지만 여러가지 혼란을 줄 수 있어 사용하는 것을 지양해야한다.

req.query : GET 방식으로 넘어오는 쿼리 스트링 파라미터를 담고 있다.

# 미들웨어
Express는 위에서 부터 미들웨어가 차례대로 실행된다.


#res.json // res.send

출처 
https://haeguri.github.io/2018/12/30/compare-response-json-send-func/

res.send(object)를 실행하면 함수의 호출 순서는 다음과 같다.

res.send(object)
res.json(object)
res.send(string)

그리고 res.json(object)를 실행했을 때 함수의 호출 순서는 다음과 같다.

res.json(object)
res.send(string)
object를 인자로 res.send를 호출하면 res.json을 호출했을 때 보다 불필요한 호출이 한 번 더 발생한다.

JSON 응답을 한다면 res.send보다 res.json이 적절한 것 같다.


# jest

기본적으로
~~~
test("테스트 설명", () => {
  expect("검증 대상").toXxx("기대 결과")
})
~~~

toXxx 부분에서 사용되는 함수를 흔히 Test Mathcher라고 한다   
      
toEqual(): 두 값이 같은지 비교하는 Matcher이다. object가 정확히 같은지 판단할 수 있다. javascript에서 object.is 와 같다.
~~~
expect(response).toEqual(value);
~~~
toBeTruthy(), toBeFalsy(): 값이 false인지 true인지 확인하는 Matcher이다.
~~~
expect(response).toBeTruthy(); // response가 true인지 확인
~~~
toHaveLength(): object의 길이를 확인하는 Matcher이다.
~~~
expect(response).toHaveLength(3);
~~~
toContain(): array에 포함하는지 확인하는 Matcher이다.
~~~
expect(response).toContain('hello');
~~~
toThrow(): 에러를 throw()하는지 확인하는 Matcher이다.
~~~
  expect(() => {
      drinkFlavor('octopus');
  }).toThrow();
~~~

