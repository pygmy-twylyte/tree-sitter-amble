const root = require("path").join(__dirname, "..", "..");

module.exports =
  typeof process.versions.bun === "string"
    // Support `bun build --compile` by being statically analyzable enough to find the .node file at build-time
    ? require(`../../prebuilds/${process.platform}-${process.arch}/tree-sitter-amble.node`)
    : require("node-gyp-build")(root);

try {
  const nodeTypeInfo = require("../../src/node-types.json");
  module.exports.nodeTypeInfo = nodeTypeInfo;
  module.exports.language.nodeTypeInfo = nodeTypeInfo;
} catch (_) {}
