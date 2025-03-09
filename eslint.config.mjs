import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['src/**/*.js'],
    languageOptions: {globals: globals.node},
    rules: {
      'no-unused-vars': ['error', {args: 'none'}],
      'no-undef': 'error',
    },
  },
];


// import globals from "globals";
// import pluginJs from "@eslint/js";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
// ];
