import React, { Suspense } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <CounterApp />
      </Suspense>
    </RecoilRoot>
  );
}

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

const counterSelector = selector({
  key: "counterSelector",
  get: ({ get }) => {
    const counter = get(counterState);
    const sumOf = get(sumState);
    return " | " + counter.numberAdded + " | " + sumOf.toString() + " | ";
  },
});

const CounterApp = () => {
  const [counter, setCounter] = useRecoilState(counterState);
  const [sum, setSum] = useRecoilState(sumState);
  const fromSelector = useRecoilValue(counterSelector);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100%",
        padding: 10,
        flexDirection: "column",
      }}
    >
      <p
          style={{
            fontSize: 64,
            padding: 20,
            margin: 0,
          }}
        >
          RECOLI STATE MANAGEMENT
        </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 0,
        }}
      >
        <button
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 20,
            minWidth: 260,
            maxHeight: 100,
            fontSize: 64,
          }}
          onClick={() => {
            setCounter({
              count: counter.count - 1,
              numberAdded: counter.numberAdded + counter.count.toString(),
            });
            setSum(sum + counter.count);
          }}
        >
          MIN
        </button>
        <p
          style={{
            fontSize: 120,
            padding: 20,
            margin: 0,
          }}
        >
          {counter.count}
        </p>
        <button
          style={{
            padding: 10,
            margin: 10,
            borderRadius: 20,
            minWidth: 260,
            maxHeight: 100,
            fontSize: 64,
          }}
          onClick={() => {
            setCounter({
              count: counter.count + 1,
              numberAdded: counter.numberAdded + counter.count.toString(),
            });
            setSum(sum + counter.count);
          }}
        >
          PLUS
        </button>
      </div>
      <p
        style={{
          fontSize: 32,
          padding: 20,
        }}
      >
        SUM : {sum}
      </p>
      <p
        style={{
          fontSize: 32,
          padding: 20,
        }}
      >
        {fromSelector}
      </p>
    </div>
  );
};

export default App;
