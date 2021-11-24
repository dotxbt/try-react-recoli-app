import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import "./App.css";

// EXAMPLE STATE
const counterState = atom<{
  count: number;
  numberAdded: string;
}>({
  key: "counter",
  default: {
    count: 0,
    numberAdded: "",
  },
});

const sumState = atom({
  key: "sumState",
  default: 0,
});

// EXAMPLE SELECTOR
const counterSelector = selector({
  key: "counterSelector",
  get: ({ get }) => {
    const counter = get(counterState);
    const sumOf = get(sumState);
    const result =
      " | " + counter.numberAdded + " | " + sumOf.toString() + " | ";
    const sumAgain = counter.count + sumOf;
    return {
      result,
      sumAgain,
    };
  },
});

// EXAMPLE CONSUME STATE TO COMPONENT
const CounterApp = () => {
  const [counter, setCounter] = useRecoilState(counterState);
  const [sum, setSum] = useRecoilState(sumState);
  const { result, sumAgain } = useRecoilValue(counterSelector);
  const resetCounter = useResetRecoilState(counterState);
  const resetSum = useResetRecoilState(sumState);

  const setCounterChange = (n: number) => {
    setCounter({
      count: counter.count + n,
      numberAdded:
        counter.count % 10 === 0
          ? counter.numberAdded + counter.count.toString() + " "
          : counter.numberAdded + counter.count.toString(),
    });
    setSum(sum + counter.count);
  };

  const resetCounte = () => {
    resetCounter();
    resetSum();
  };

  return (
    <div className="container">
      <p className="title">COUNTER</p>
      <div className="rowCenter">
        <button className="mButton" onClick={async () => setCounterChange(-1)}>
          MIN
        </button>
        <p className="counter">{counter.count}</p>
        <button className="mButton" onClick={async () => setCounterChange(1)}>
          PLUS
        </button>
      </div>
      <button className="mButton" onClick={async () => resetCounte()}>
        RESET
      </button>
      <p className="contentText">
        SUM : {sum} | SUM AGAIN : {sumAgain}
      </p>
      <p
        className="contentText"
        style={{
          maxWidth: 500,
        }}
      >
        COUNTER SELECTOR : {result}
      </p>
    </div>
  );
};

export default CounterApp;
