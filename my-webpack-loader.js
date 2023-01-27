module.exports = function myWebpackLoader(content) {
  console.log("myWebpackLoader Init");
  return content.replace("console.log(", "alert(");
};
