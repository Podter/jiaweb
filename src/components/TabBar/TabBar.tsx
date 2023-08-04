import Tab from "./Tab.tsx";

export default function TabBar() {
  return (
    <div className="h-9 w-full bg-background justify-stretch items-center flex fixed top-12 left-0 right-0 border-b border-border z-40">
      {[...Array(2)].map((_, i) => (
        <Tab
          key={i}
          title="Google"
          favicon="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
        />
      ))}
      <Tab title="New tab" />
    </div>
  );
}
