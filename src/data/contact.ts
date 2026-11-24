export interface ContactMethod {
  name: string;
  emoji: string;
  label: string;
  href: string;
  external: boolean;
}

export const contact: ContactMethod[] = [
  {
    name: "Email",
    emoji: "📧",
    label: "jo2004yu@gmail.com",
    href: "mailto:jo2004yu@gmail.com",
    external: false,
  },
  {
    name: "GitHub",
    emoji: "💻",
    label: "joshuajyu",
    href: "https://github.com/joshuajyu",
    external: true,
  },
  {
    name: "LinkedIn",
    emoji: "🔗",
    label: "Joshua Yu",
    href: "https://www.linkedin.com/in/joshuajyu/",
    external: true,
  },
  {
    name: "Instagram",
    emoji: "📸",
    label: "yujun4__",
    href: "https://www.instagram.com/yujun4__/",
    external: true,
  },
];
