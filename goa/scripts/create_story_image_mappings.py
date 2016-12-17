"""
Creates a image node to english word mapping
"""

from glob import glob
import os
import json
import csv
import sys
import os.path
import re

dirname = sys.argv[1]
resdir = sys.argv[2]

story_dict = {}

with open('scripts/story_mappings.csv', 'rb') as csvfile:
  mappingreader = csv.reader(csvfile, delimiter=';', quoting=csv.QUOTE_ALL)
  for row in mappingreader:
    if row[0] not in story_dict:
      story_dict[row[0]] = {}
    if row[1] not in story_dict[row[0]]:
      story_dict[row[0]][row[1]] = {}
    if len(row) > 3:
      story_dict[row[0]][row[1]][row[2]] = row[3]
    else:
      story_dict[row[0]][row[1]][row[2]] = ''
# print(story_dict)
for story_json in glob(dirname + os.path.sep + "*.json"):
  if 'question' in story_json:
    continue
  # print(story_json)
  basename = os.path.splitext(os.path.splitext(os.path.basename(story_json))[0])[0]
  if basename not in story_dict:
    story_dict[basename] = {}
  for scene_json in glob(resdir + os.path.sep + basename + os.path.sep + "*.json"):
    scene_basename = os.path.splitext(os.path.splitext(os.path.basename(scene_json))[0])[0]
    # print('basename:' + basename)
    # print('scene_basename:' + scene_basename)
    if basename in scene_basename:
      if scene_basename not in story_dict[basename]:
        story_dict[basename][scene_basename] = {}
      with open(scene_json) as data_file:
        data = json.load(data_file)
        # print(scene_json)
        if 'Children' in data['Content']['Content']['ObjectData']:
          for child in data['Content']['Content']['ObjectData']['Children']:
            if child['ctype'] == 'PanelObjectData':
              continue
            node_name = child['Name']
            if node_name not in story_dict[basename][scene_basename]:
              story_dict[basename][scene_basename][node_name] = ''
with open('scripts/story_mappings.csv', 'w') as csvfile:
  mappingwriter = csv.writer(csvfile, delimiter=';', quoting=csv.QUOTE_ALL)  
  for story in story_dict:
    mapping = {}
    for scene in story_dict[story]:
      for node in story_dict[story][scene]:
        if story_dict[story][scene][node] == '':
          mapping[node] = re.sub(r'^([a-zA-Z_]+?)_*[\d_]*$',r'\1',node).lower()
        else:
          mapping[node] = story_dict[story][scene][node]
        mappingwriter.writerow([story, scene, node, story_dict[story][scene][node]])
    # print(story)
    # print(json.dumps(mapping))
    with open(dirname + os.path.sep + story + '.mapping.json', 'w') as mapping_json:
      mapping_json.write(json.dumps(mapping, sort_keys=True, indent=4, separators=(',', ': ')))