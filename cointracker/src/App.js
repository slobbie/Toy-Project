import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState([]);
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState(false);

  const onChange = (e) => {
    setCost(e.target.value);
  };
  const onChangeValue = (e) => {
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    coins.map((coin) => {
      if (
        coin.name === keyword.toUpperCase() ||
        coin.symbol === keyword.toUpperCase()
      ) {
        setResult(coin);
        setSearchInput(true);
      } else if (
        coin.name !== keyword.toUpperCase() ||
        coin.symbol !== keyword.toUpperCase()
      ) {
        setSearchInput(null);
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
