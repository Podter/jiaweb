import { Input } from "@/components/ui/input";
import { Search16Regular } from "@fluentui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const { tabs } = window;

const formSchema = z.object({
  search: z.string().min(1),
});

export default function SearchInput() {
  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit({ search }: z.infer<typeof formSchema>) {
    const activeTab = await tabs.getActiveTabId();
    await tabs.setUrl(
      activeTab,
      "https://duckduckgo.com/?q=" + encodeURIComponent(search),
    );
  }

  return (
    <form
      className="flex justify-center items-center relative w-[40vw]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Search with DuckDuckGo"
        className="pr-10"
        autoFocus
        {...register("search")}
      />
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 absolute right-1 z-20"
        type="submit"
      >
        <Search16Regular />
      </Button>
    </form>
  );
}
