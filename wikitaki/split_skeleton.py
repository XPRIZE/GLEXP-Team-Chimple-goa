import os
import json
import sys

def rec(str, name, filename):
	if(type(str)) is list:
		dellist = []
		for i in str:
			if(rec(i, name, filename)):
				dellist.append(i)
		print(dellist)
		for m in dellist:
			str.remove(m)
		return False
	elif(type(str)) is dict:
		if('ctype' in str and str['ctype'] == 'SpriteObjectData'):
			print (str)
			print ('name ' + name +  ' str["Name"] ' + str['Name'])
			if(('Name' in str and (name == str['Name'] or (name == 'body' and str['Name'].startswith(name))))):
				print('return with ' + name)
				return False
			else:
				spritename = str['Name']
				print('processing spritename ' + spritename)
				fname = 'res/characters/' + filename + '/'+spritename+'.json'
				print(fname)
				if not os.path.exists('res/characters/' + filename):
					os.mkdir('res/characters/' + filename)
				#os.remove(fname)
				# os.system('touch ' + fname)
				jf = open(fname, 'w')
				jf.write('{"ID": "a2ee0952-26b5-49ae-8bf9-4f1d6279b799","Version": "3.10.0.0","Name": "MainScene","Content": {"Content": {"ObjectData":')
				json.dump(str, jf)
				jf.write(',"ctype": "GameFileData"}},"Type": "Scene"}')
				jf.close()
				return True
		else:
			iname = name
			if('Name' in str):
				iname = str['Name']
			for i in str:
				rec(str[i], iname, filename)
	else:
		print(str)
		return False

fname = sys.argv[1]

f = open('res/' + fname + '.json')
j = json.load(f)
rec(j, '', fname)
nf = open('res/split_' + fname + '.json','w')
json.dump(j, nf)
nf.close()