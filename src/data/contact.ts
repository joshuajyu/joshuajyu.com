/** Icons drawn by src/components/ContactIcon.astro. */
export type ContactIconName = "email" | "github" | "linkedin" | "instagram";

export interface ContactMethod {
  name: string;
  icon: ContactIconName;
  label: string;
  href: string;
  external: boolean;
}

export const contact: ContactMethod[] = [
  {
    name: "Email",
    icon: "email",
    label: "joshua@joshuajyu.com",
    href: "mailto:joshua@joshuajyu.com",
    external: false,
  },
  {
    name: "GitHub",
    icon: "github",
    label: "joshuajyu",
    href: "https://github.com/joshuajyu",
    external: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    label: "Joshua Yu",
    href: "https://www.linkedin.com/in/joshuajyu/",
    external: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    label: "yujun4__",
    href: "https://www.instagram.com/yujun4__/",
    external: true,
  },
];
