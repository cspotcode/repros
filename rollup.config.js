import dts from "rollup-plugin-dts";

const config = [
  {
    input: "./input.d.ts",
    output: [{ file: "output.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;