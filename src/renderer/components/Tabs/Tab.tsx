type Props = {
  index: number;
};

export default function Tab({ index }: Props) {
  return (
    <button className="btn btn-wide justify-start carousel-item">
      New tab {index}
    </button>
  );
}
