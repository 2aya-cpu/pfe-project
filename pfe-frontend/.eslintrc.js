module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential', // ou 'plugin:vue/vue3-recommended' pour des règles plus strictes
      'eslint:recommended',
    ],
    parserOptions: {
      parser: '@babel/eslint-parser',
      requireConfigFile: false, // Désactive la vérification du fichier de configuration Babel
    },
    rules: {
      // Vos règles ESLint personnalisées
    },
  };