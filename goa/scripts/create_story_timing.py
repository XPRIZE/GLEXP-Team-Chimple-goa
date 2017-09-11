"""
Creates audio timing file
"""

from glob import glob
import os
import json
import csv
import sys
import os.path
import re
import mutagen
from mutagen.oggvorbis import OggVorbis

dirname = sys.argv[1]

story_dict = {}

for story_json in glob(dirname + os.path.sep + "*.json"):
  if 'question' in story_json or 'timing' in story_json:
    continue
  if 'Upepo_Wind' not in story_json:
    continue
  print(story_json)
  basename = os.path.splitext(os.path.splitext(os.path.basename(story_json))[0])[0]
  print(basename)
  timing = "{\n"
  first_line = True
  page_dict = {}
  for page in glob(dirname + os.path.sep + basename + os.path.sep + "[0-9]*"):
    num = os.path.basename(page)
    page_dict[int(num)] = page
  for num in sorted(page_dict):
    page = page_dict[num]
    if first_line:
      first_line = False
    else:
      timing = timing + '",\n'
    timing = timing + '"' + str(num) +'":"'
    first = True
    for name in glob(page + os.path.sep + "*.ogg"):
      if first:
        first = False
      else:
        timing = timing + ','
      timing = timing + str(OggVorbis(name).info.length)
  if not first_line:
    with open(dirname + os.path.sep + basename + "_timing.json", 'w') as data_file:
      timing = timing + '"\n}'
      data_file.write(timing)
