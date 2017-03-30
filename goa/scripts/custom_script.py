# custom_script.py

import json
import sys
import os, os.path
import cocos
import cocos_project

# event is the event name which pre-defined in cocos command.
# target_platform is the target platform which you are compiling for.
# args is more arguments of event.
def handle_event(event, target_platform, args):
	print("event is %s" % event)
	print("target_platform is %s" % target_platform)
	print("args is %s" % args)

	if event == cocos_project.Project.CUSTOM_STEP_PRE_COPY_ASSETS:
		project_json = os.path.join(args["project-path"], ".cocos-project.json")
		f = open(project_json)
		project_info = json.load(f)
		f.close()

		if project_info.has_key("chimple_res"):
			res = project_info["chimple_res"]
		else:
			res = "HDR"

		if project_info.has_key("chimple_lang"):
			lang = project_info["chimple_lang"]
		else:
			lang = "eng"
		cocos.copy_files_with_config({
			"from": "../Resources/res/"+res, 
			"to": "res/"+res},
			args["platform-project-path"], 
			args["assets-dir"])
		cocos.copy_files_with_config({
			"from": "../Resources/res/lang/"+lang, 
			"to": "res/lang/"+lang},
			args["platform-project-path"], 
			args["assets-dir"])
