class MyWebpackPlugin {
  apply(compiler) {
    // eslint-disable-next-line no-unused-vars
    compiler.hooks.done.tap("My Plugin", (stats) => {
      console.log("MyPlugin: done");
    });

    compiler.plugin("emit", (compilation, callback) => {
      const source = compilation.assets["main.js"].source();
      compilation.assets["main.js"].source = () => {
        const banner = [
          "/**",
          " * 이것은 CustomBannerPlugin이 처리한 결과입니다.",
          " * Build Date: 2023-01-17",
          " */",
        ].join("\n");
        return banner + "\n\n" + source;
      };

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
