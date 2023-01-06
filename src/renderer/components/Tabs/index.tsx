import Tab from "./Tab";
import New from "./New";
import { useState } from "react";

export default function Tabs() {
  const [count, setCount] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  return (
    <div
      className="h-[3.125rem] carousel snap-none scroll-auto justify-start items-center"
      onWheel={(e) => {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
      }}
    >
      {count.map((_value, index) => (
        <Tab key={index} index={index} />
      ))}
      <New count={count} setCount={setCount} />
    </div>
  );
}
