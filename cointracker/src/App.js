import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true); // 로딩
  const [coins, setCoins] = useState([]); // api 값을 담기 위한 상태
  const [cost, setCost] = useState([]); // 내가 가진 cost 로 검색한 coin을 얼마나 살수 있는지 보여주는값
  const [result, setResult] = useState([]); // onSubmit 될때 result에 coin 값을 담기 위한 상태
  const [keyword, setKeyword] = useState(''); // 부분 랜더링을 위한 상태값
  const [searchInput, setSearchInput] = useState(false); // 부분렌더링

  const onChange = (e) => {
    // cost 값을 업데이트 해주기위한 이벤트
    setCost(e.target.value);
  };
  const onChangeValue = (e) => {
    // 키워드를 업데이트 하기위한 이벤트
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    coins.map((coin) => {
      if (
        coin.name === keyword.toUpperCase() ||
        coin.symbol === keyword.toUpperCase()
      ) {
        setResult(coin); // 키워드값과 coin 상태가 같다면 coin 값을 담게된다
        setSearchInput(true); // 조건이 맞다면 렌더링
      }
      return;
    });
    setKeyword('');
  };

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json()) // 받아온다 api 의 json 데이터를
      .then((json) => {
        setCoins(json); // setConis 에 json 데이터 상태관리
        setLoading(false); // 데이터를 받아온뒤 loading false
      });
  }, []);

  return (
    <div className='App'>
      <h1> The Conin {loading ? '' : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          type='search'
          placeholder='find coin name'
          value={keyword}
          onChange={onChangeValue}
        />
        <button type='submit'>find</button>
      </form>

      {searchInput ? (
        <div>
          <span> your find {result.symbol}</span> <br />
          <input
            type='text'
            placeholder='your cost'
            value={cost}
            onChange={onChange}
          />
          You can get {cost / result.quotes.USD.price} {result.symbol}
        </div>
      ) : null}
      <br />
      <br />
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => {
            return (
              <li>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
                {coin.symbol}
              </li>
            );
          })}
        </ul>
      )}
      <br />
      <br />
    </div>
  );
}

export default App;
