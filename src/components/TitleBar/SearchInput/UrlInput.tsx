import { Input } from "@/components/ui/input.tsx";
import { ArrowRight12Regular } from "@fluentui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";
import createUrl from "@/lib/createUrl.ts";

const { tabs } = window;

const formSchema = z.object({
  url: z.string().min(1),
});

type Props = {
  cancel: () => void;
};

export default function UrlInput({ cancel }: Props) {
  const activeTab = useActiveTab();

  const { handleSubmit, register, setFocus, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  const { ref: inputFormRef, ...inputProps } = register("url");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("url", activeTab?.url ?? "");
    setFocus("url");
    inputRef.current?.select();
  }, []);

  function onSubmit({ url }: z.infer<typeof formSchema>) {
    if (activeTab) {
      tabs.setUrl(activeTab.id, createUrl(url));
    }
    cancel();
  }

  return (
    <form
      className="flex justify-center items-center relative w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="h-8 !z-0"
        placeholder="Search or enter web address"
        {...inputProps}
        ref={(e) => {
          inputFormRef(e);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          inputRef.current = e;
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 absolute right-1 z-50"
        type="submit"
      >
        <ArrowRight12Regular />
      </Button>
    </form>
  );
}