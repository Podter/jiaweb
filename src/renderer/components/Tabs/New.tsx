import { Add20Filled } from "@fluentui/react-icons";
import { Dispatch, SetStateAction } from "react";

type Props = {
  count: string[];
  setCount: Dispatch<SetStateAction<string[]>>;
};

export default function New({ count, setCount }: Props) {
  return (
    <button
      className="btn btn-ghost btn-circle carousel-item"
      onClick={() => setCount([...count, ""])}
    >
      <Add20Filled />
    </button>
  );
}
