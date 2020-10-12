const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const env = process.env.NODE_ENV;

const config = {
    devtool: env == "development" && "source-map",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/js"),
        },
    },
    // extensions: ['.js', '.css'],
    entry: path.resolve(__dirname, "src/index.js"),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: env == "development",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: env == "development",
                            config: {
                                path: "postcss.config.js",
                                ctx: {
                                    env,
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "images/[name].[ext]",
                            fallback: "file-loader",
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            fallback: "file-loader",
                            limit: 10000,
                            publicPath: "./",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "APP",
        libraryTarget: "umd",
        filename: "bundle.js",
    },
};

module.exports =
    env == "development"
        ? merge(config, {
              mode: "development",
              watch: true,
          })
        : merge(config, {
              mode: "production",
              plugins: [
                  new CleanWebpackPlugin({
                    cleanAfterEveryBuildPatterns: ["*.js", "*.css"],
                  }),
              ],
              optimization: {
                  minimize: true,
                  minimizer: [new TerserWebpackPlugin()],
              },
          });
