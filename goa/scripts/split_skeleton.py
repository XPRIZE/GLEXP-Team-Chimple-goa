import os
import json

def rec(str, name):
	if(type(str)) is list:
		dellist = []
		for i in str:
			if(rec(i, name)):
				dellist.append(i)
		#print(dellist)
		for m in dellist:
			str.remove(m)
		return False
	elif(type(str)) is dict:
		if('ctype' in str and str['ctype'] == 'SpriteObjectData'):
			if(('Name' in str and (name == str['Name'] or (name == 'body' and str['Name'].startswith(name)))) or 'VisibleForFrame' not in str):
				#print(name)
				return False
			else:
				spritename = str['Name']
				fname = 'res/characters/Human_Skeleton/'+spritename+'.json'
				print(fname)
				#os.remove(fname)
				#os.system('touch ' + fname)
				jf = open(fname, 'w')
				jf.write('{"ID": "d4ea9161-6898-4014-a3b5-a1d2a38e5317","Version": "3.10.0.0","Name": "MainScene","Content": {"Content": {"ObjectData":')
				json.dump(str, jf)
				jf.write(',"ctype": "GameFileData"}},"Type": "Scene"}')
				jf.close()
				return True
		else:
			iname = name
			if('Name' in str):
				iname = str['Name']
			for i in str:
				rec(str[i], iname)
	else:
		#print(str)
		return False


f = open('res/animation/human_skeleton_original.json')
j = json.load(f)
rec(j, '')
nf = open('res/animation/human_skeleton.json','w')
json.dump(j, nf)
nf.close()