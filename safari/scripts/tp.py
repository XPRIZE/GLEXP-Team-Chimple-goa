"""
Given a cocos studio directory name, it will go to the subdirectories and creates HDR, HD, SD sprite sheets
Output will be in Resources/res
"""

from subprocess import check_call, STDOUT
from glob import glob
import sys
import os

dirname = sys.argv[1]

for subdir in os.walk(dirname + os.path.sep + "cocosstudio" + os.path.sep + dirname):
	subdirname = subdir[0].partition(dirname + os.path.sep + "cocosstudio" + os.path.sep)[2]
	imagedirname = subdirname.partition(os.path.sep)[2]
	for png in glob(dirname + os.path.sep + "Resources" + os.path.sep + "res" + os.path.sep + subdirname + os.path.sep + "*.png"):
		os.remove(png)
	for plist in glob(dirname + os.path.sep + "Resources" + os.path.sep + "res" + os.path.sep + subdirname + os.path.sep + "*.plist"):
		os.remove(plist)
	if imagedirname == '':
		imagedirname = subdirname
	else:
		if(os.path.exists(dirname + os.path.sep + "Resources" + os.path.sep + "res" + os.path.sep + subdirname)):
			os.rmdir(dirname + os.path.sep + "Resources" + os.path.sep + "res" + os.path.sep + subdirname)
	print "Creating TexturePacker files for: " + subdirname + "/" + imagedirname
	param = ["TexturePacker", "--format", "cocos2d-x", "--algorithm", "MaxRects", "--maxrects-heuristics", "Best", "--opt", "RGBA4444", "--data", dirname + "/Resources/res/{v}/" + subdirname + "/" + imagedirname + ".plist", "--png-opt-level", "1", "--sheet", dirname + "/Resources/res/{v}/" + subdirname + "/" + imagedirname + ".png", "--variant", "1:HDR", "--variant", "0.5:HD", "--variant", "0.25:SD", "--prepend-folder-name"]
	param.extend(sys.argv[2:])
	param.extend(glob(dirname + os.path.sep + "cocosstudio" + os.path.sep + subdirname + os.path.sep + "*.png"))
	print param
	check_call(param, stderr=STDOUT)
