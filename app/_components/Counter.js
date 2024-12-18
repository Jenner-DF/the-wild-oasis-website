"use client";
import { useState } from "react";

function Counter({ user }) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h4>there are {user.length} users</h4>
      <button onClick={() => setCounter((c) => c + 1)}>
        count : {counter}
      </button>
    </div>
  );
}

export default Counter;
