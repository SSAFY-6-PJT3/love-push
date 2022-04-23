import { useState } from 'react';

export const ChatTest = () => {
  const [id, setId] = useState('');
  const [setObj, _] = useState(new Set<number>());
  const [num, setNum] = useState(0);
  const onChangeId = (e: any) => {
    setId(e.target.value);
  };
  const addSetFunc = () => {
    console.log(setObj);
    console.log(setObj.has(5));

    setObj.add(num);
    setNum((n) => n + 1);
  };
  return (
    <div>
      id:{' '}
      <input
        type="text"
        placeholder="default"
        value={id}
        onChange={onChangeId}
      />
      <br />
      <button>Send Heart</button>
      <br />
      <div>
        {Array.from(setObj).map((v) => (
          <div key={v.toString()}>{v}</div>
        ))}
      </div>
      <br />
      <button onClick={addSetFunc}>add Set</button>
    </div>
  );
};
