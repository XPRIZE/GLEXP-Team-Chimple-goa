var xc = xc || {};
var totalPoints = cc.sys.localStorage.getItem("xc.story.totalPoints");
var currentPoints = cc.sys.localStorage.getItem("xc.story.currentPoints");
var baseDir = cc.sys.localStorage.getItem("xc.story.baseDir");
cc.log("totalPoints in story %d", totalPoints);
cc.log("currentPoints in story %d", currentPoints);
xc.NativeCopyRightHandlerScene.load(baseDir, xc.NativeCopyRightHandlerLayer, totalPoints, currentPoints);

