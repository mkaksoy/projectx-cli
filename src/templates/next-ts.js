export default {
  page: "export default function Page() {\n  return <h1>Hello, Next.js!</h1>\n}",
  layout:
    'export default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  )\n}',
};
