import { H1 } from "@/components/ui";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container min-h-dvh min-w-full flex justify-center items-center flex-col gap-10 max-w-4xl px-4 py-8">
      <H1>Playwright Demo</H1>
      <Button>Click me</Button>
    </div>
  );
}
