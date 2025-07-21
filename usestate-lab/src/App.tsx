// src/App.tsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  const handleClick = () => {
    setUser(prevUser =>( {...prevUser , age: prevUser.age+1}))
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setTimeout(() => setCount((prevCount) => prevCount+1), 3000)}>+1 in 3 s</button>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <button onClick={handleClick}>age +1</button>
    </>
  );
}