import * as React from "react";
import { ExternalLink } from "lucide-react";

const contactMethods: {
  name: string;
  emoji: string;
  value: React.JSX.Element;
}[] = [
  {
    name: "Personal Email",
    emoji: "📧",
    value: (
      <a href="mailto:jo2004yu@gmail.com" className="underline">
        jo2004yu@gmail.com
      </a>
    ),
  },
  {
    name: "GitHub",
    emoji: "💻",
    value: (
      <a
        href="https://www.github.com/joshuajyu/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 underline">joshuajyu</span>{" "}
        <ExternalLink size={14} className="inline" />
      </a>
    ),
  },
  {
    name: "LinkedIn",
    emoji: "🔗",
    value: (
      <a
        href="https://linkedin.com/in/joshuajyu/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 underline">Joshua Yu</span>{" "}
        <ExternalLink size={14} className="inline" />
      </a>
    ),
  },
  {
    name: "Instagram",
    emoji: "📸",
    value: (
      <a
        href="https://www.instagram.com/yujun4__/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline-offset-2 underline">yujun04</span>{" "}
        <ExternalLink size={14} className="inline" />
      </a>
    ),
  },
];

export async function ContactTable() {
  return (
    <div className="w-full overflow-y-auto">
      <table className="w-full">
        <tbody>
          {contactMethods.map((method) => (
            <TableRow
              key={method.name}
              name={method.name}
              emoji={method.emoji}
              value={method.value}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TableRow = React.forwardRef<
  React.ElementRef<"td">,
  React.ComponentPropsWithoutRef<"td"> & {
    name: string;
    emoji: string;
    value: React.JSX.Element;
  }
>(({ name, emoji, value }) => {
  return (
    <tr className="m-0 border-t p-0 even:bg-muted">
      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {name}
      </td>
      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {emoji} {value}
      </td>
    </tr>
  );
});
TableRow.displayName = "TableRow";
