import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { CardTable } from "@/components/work-library";

export default function Work() {
  return (
    <div className="flex flex-col flex-1 justify-between items-start gap-6">
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight pb-4">
        Work
      </h2>
      <CardTable />
      <Alert className="hidden sm:block">
        <TriangleAlert size={16} />
        <AlertTitle className="font-bold">Tip:</AlertTitle>
        <AlertDescription>
          If you don't know what a particular icon is, hover over it for a
          clarification.
        </AlertDescription>
      </Alert>
      <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
        “Far and away the best prize that life has to offer is the chance to
        work hard at work worth doing.”
        <br />
        ―Theodore Roosevelt, The Key to Success in Life
      </blockquote>
    </div>
  );
}
