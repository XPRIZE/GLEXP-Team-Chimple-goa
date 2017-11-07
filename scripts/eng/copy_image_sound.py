"""
Copy images and sounds so that they can be put in app
"""

import sys
import os.path
import shutil

word_file = sys.argv[1]
audio_dir = sys.argv[2]
output_dir = sys.argv[3]

f = open(word_file, 'r')
all_pos = []
for line in f:
	line = line.rstrip('\n')
	try:
		shutil.copy(audio_dir + "/" + line + ".ogg", output_dir+"/audio")
	except IOError as e:
		print("Unable to copy file. %s" % e)
	except:
		print("Unexpected error:", sys.exc_info())