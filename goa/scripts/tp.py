"""
Given a cocos studio directory name, it will go to the subdirectories and creates HDR, HD, SD sprite sheets
Output will be in Resources/res
"""

from subprocess import check_call, STDOUT
from glob import glob
import sys
import os
import tempfile
import shutil

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
	tempdir = tempfile.mkdtemp()
	os.makedirs(tempdir + os.path.sep + subdirname)
	imagefound = 0
	for png in glob(dirname + os.path.sep + "cocosstudio" + os.path.sep + subdirname + os.path.sep + "*.png"):
		shutil.copy(png, tempdir + os.path.sep + subdirname)
		imagefound = 1
	if(imagefound):
		print "Creating TexturePacker files for: " + tempdir + os.path.sep + dirname + os.path.sep + subdirname
		param = ["TexturePacker", "--format", "cocos2d-x", "--algorithm", "MaxRects", "--maxrects-heuristics", "Best", "--max-size", "4096",  "--data", dirname + "/Resources/res/{v}/" + subdirname + "/" + imagedirname + ".plist", "--png-opt-level", "1", "--sheet", dirname + "/Resources/res/{v}/" + subdirname + "/" + imagedirname + ".png", "--variant", "1:HDR", "--variant", "0.5:HD", "--variant", "0.25:SD", "--prepend-folder-name", tempdir + os.path.sep + dirname]
		param.extend(sys.argv[2:])
		print param
		check_call(param, stderr=STDOUT)
	shutil.rmtree(tempdir)
