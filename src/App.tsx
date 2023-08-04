import TitleBar from "@/components/TitleBar";
import TabBar from "@/components/TabBar";

export default function App() {
  return (
    <>
      <TitleBar />
      <TabBar />
      <webview
        src="http://www.google.com/"
        className="mt-[5.25rem] h-[calc(100vh-5.25rem)] w-full"
      ></webview>
    </>
  );
}
