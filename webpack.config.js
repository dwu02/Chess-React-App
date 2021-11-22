module.exports = {
    entry: "./src/",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        { test: /\.css$/, use: ["style-loader","css-loader"] }
      ]
    }
};