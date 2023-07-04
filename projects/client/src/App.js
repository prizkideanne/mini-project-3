import axios from "axios";

import { useEffect, useState } from "react";
import { createProduct } from "../../server/src/controllers/product";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div>
      <createProduct />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header> */}
      <h1 className="text-3xl font-bold underline">{message}</h1>
    </div>
  );
}

export default App;
