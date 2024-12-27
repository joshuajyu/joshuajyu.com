import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { ContactTable } from "@/components/contact-table";

export default function Contact() {
  return (
    <div className="flex flex-col flex-1 justify-between items-start gap-6">
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight pb-4">
        Contact Me
      </h2>
      <p>
        Thanks for wanting to contact me! I&apos;ll do my best to try to get
        back to you as soon as possible.
      </p>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Contact Methods & Socials
      </h4>
      <ContactTable />
      <Alert>
        <TriangleAlert size={16} />
        <AlertTitle className="font-bold">Disclaimer:</AlertTitle>
        <AlertDescription>
          I am terrible at regularly checking my personal email. If you really{" "}
          <span className="italic">must</span> reach me, try my school email or
          social media(s).
        </AlertDescription>
      </Alert>
      <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
        “Taking a new step, uttering a new word, is what people fear most.”
        <br />
        ―Fyodor Dostoevsky, Crime and Punishment
      </blockquote>
    </div>
  );
}
