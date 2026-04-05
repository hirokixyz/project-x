import { useState } from "react";
import Create from "./pages/Create";
import Subscriptions from "./pages/Subscriptions";

export default function App() {
  const [page, setPage] = useState("create");

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setPage("create")}>Create</button>
        <button onClick={() => setPage("subscriptions")}>Subscriptions</button>
      </div>

      {page === "create" && <Create />}
      {page === "subscriptions" && <Subscriptions />}
    </div>
  );
}