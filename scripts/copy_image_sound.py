"""
Copy images and sounds so that they can be put in app
"""

import sys
import os.path
import shutil

word_file = sys.argv[1]
image_dir = sys.argv[2]
audio_dir = sys.argv[3]
output_dir = sys.argv[4]

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
	try:
		shutil.copy(image_dir + "/" + line + ".png", output_dir+"/image")
	except IOError as e:
		print("Unable to copy file. %s" % e)
	except:
		print("Unexpected error:", sys.exc_info())
