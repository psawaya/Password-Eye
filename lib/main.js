const dataDir = require("self").data;
var pageMod = require("page-mod");
 
pageMod.PageMod({
  include: "*",
  contentScriptFile: dataDir.url("js/highlight.js"),
  // Pass through the URL to the data dir in the extension without having
  // to use a postMessage. I'm pretty sure this is secure because it's not
  // attached to unsafeWindow, but I should double check. (TODO)
  contentScript: "window.IMG_DIR = '" + dataDir.url('') + "'"
});
