"""
Checks if pronunciation exists
"""

import sys
import os.path

word_file = sys.argv[1]
audio_dir = sys.argv[2]


f = open(word_file, 'r')
all_pos = []
for line in f:
  line = line.rstrip('\n')
  if(not os.path.exists(audio_dir + "/" + line + ".ogg")):
    print(line)
