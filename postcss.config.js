const path = require("path");

module.exports = (ctx) => ({
    plugins: [
        require("postcss-import")(),
        require("postcss-calc")(),
        require("postcss-preset-env")({
            stage: 0,
            features: {
                "nesting-rules": true,
            },
            autoprefixer: true,
            preserve: false,
            importFrom: "./src/css/variables.css",
        }),
        require("postcss-inline-svg")({
            paths: [path.join(__dirname, "src/images/svg")]
        }),
        ctx.env === "production" &&
            require("cssnano")({
                preset: "default",
            }),
    ],
});
