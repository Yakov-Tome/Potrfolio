// Every page lives under /[locale], and that layout is the one that renders
// <html> — it is the only place the language and direction are known. This root
// layout exists solely because Next requires one, so it passes through.
export default function RootLayout({ children }) {
  return children;
}
