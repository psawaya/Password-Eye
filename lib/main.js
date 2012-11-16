const dataDir = require("self").data;
var pageMod = require("page-mod");
 
pageMod.PageMod({
  include: "*",
  contentScriptFile: dataDir.url("js/highlight.js")
});