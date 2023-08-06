import { Input } from "@/components/ui/input.tsx";
import { ArrowRight12Regular } from "@fluentui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { useActiveTab } from "@/contexts/ActiveTabContext.tsx";
import createUrl from "@/lib/createUrl.ts";

const { tabs } = window;

const formSchema = z.object({
  url: z.string().min(1),
});

type Props = {
  cancel: () => void;
  setOverrideHostname: Dispatch<SetStateAction<string | undefined>>;
};

export default function UrlInput({ cancel, setOverrideHostname }: Props) {
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

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        cancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit({ url }: z.infer<typeof formSchema>) {
    if (activeTab) {
      const newUrl = createUrl(url);
      tabs.setUrl(activeTab.id, newUrl);

      const urlObj = new URL(newUrl);
      setOverrideHostname(urlObj.hostname);
    }
    cancel();
  }

  return (
    <form
      className="flex justify-center items-center relative w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="h-8 !z-0 pr-8"
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
