import {
  ArrowLeft20Filled,
  ArrowRight20Filled,
  LineHorizontal320Filled,
  LockClosed16Regular,
  ArrowClockwise20Filled,
} from "@fluentui/react-icons";

export default function Navbar() {
  return (
    <div className="h-12 flex items-center">
      <div className="tooltip tooltip-bottom" data-tip="Back">
        <button className="btn btn-ghost btn-circle">
          <ArrowLeft20Filled />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Forward">
        <button className="btn btn-ghost btn-circle">
          <ArrowRight20Filled />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Refresh">
        <button className="btn btn-ghost btn-circle">
          <ArrowClockwise20Filled />
        </button>
      </div>
      <div className="form-control w-full">
        <div className="input-group">
          <button
            className="tooltip tooltip-bottom btn btn-square btn-sm btn-success normal-case font-normal"
            data-tip="Secured with Deek"
          >
            <LockClosed16Regular />
          </button>
          <input
            type="text"
            placeholder="Search or enter web address"
            className="input input-sm input-bordered w-full"
          />
        </div>
      </div>
      <button className="btn btn-ghost btn-circle">
        <LineHorizontal320Filled />
      </button>
    </div>
  );
}
