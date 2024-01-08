import packageJson from "../package.json";

const { version } = packageJson;
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: "Face Blur AI",
  name: "Face Blur AI",
  description: "An AI that blurs faces in images.",
  domain: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  githubUrl: "https://github.com/TDC-Machine-Learning-AI-Club/face-blur",
  descriptionEn: "An AI that blurs faces in images.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    logo: "/images/logo/brand/main.svg",
  },
  version: version,
  authorUrl: "https://github.com/fredygerman",
};
