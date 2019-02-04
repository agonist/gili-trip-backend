module.exports = {
  extends: [
    "react-app",
    "eslint-config-airbnb",
    "eslint-config-prettier"
  ],
  plugins: [
    "prettier"
  ],
  rules: {
    "camelcase": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/href-no-hash": 0,
    "no-underscore-dangle": 0,
    "prettier/prettier": "error",
    "react/jsx-filename-extension": 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-wrap-multilines": 0,
  }
};
