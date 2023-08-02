import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return <Button onClick={() => setCount((c) => c + 1)}>Count: {count}</Button>;
}
