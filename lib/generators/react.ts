const reactGenerator = {
  staticFiles() {
    return [
      {
        path: "src/app/page.tsx",
        content: `
export default function Page() {
  return <h1>Hello React Scaffold</h1>;
}
`,
      },
    ];
  },
};

export default reactGenerator;