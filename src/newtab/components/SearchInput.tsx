import { Input } from "@/components/ui/input";
import { Search16Regular } from "@fluentui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/lib/trpc.tsx";

const formSchema = z.object({
  query: z.string().min(1),
});

export default function SearchInput() {
  const { mutate: search } = trpc.newTab.search.useMutation();

  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  return (
    <form
      className="flex justify-center items-center relative w-[40vw]"
      onSubmit={handleSubmit(async ({ query }) =>
        search(encodeURIComponent(query)),
      )}
    >
      <Input
        placeholder="Search with DuckDuckGo"
        className="pr-10"
        autoFocus
        {...register("query")}
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
