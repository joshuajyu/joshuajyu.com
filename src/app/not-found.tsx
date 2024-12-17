import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 gap-32 sm:p-20">
      <main className="flex flex-col gap-2 row-start-2 items-start">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Not Found 😔
        </h2>
        <p className="leading-7">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button className="p-0" variant="link" asChild>
          <Link href="/">← Return Home</Link>
        </Button>
      </main>
    </div>
  );
}
