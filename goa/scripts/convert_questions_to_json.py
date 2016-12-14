"""
Converts all questions in csv format to json format typically after translation
"""

from glob import glob
import os
import json
import csv
import sys
import os.path

question_csv = sys.argv[1]
dirname = sys.argv[2]

with open(question_csv, 'r') as csvfile:
  questionreader = csv.reader(csvfile, delimiter=';', quoting=csv.QUOTE_ALL)
  story_name = ''
  for row in questionreader:
    if len(row[0]) > 0:
      if len(question_json) > 0:
        with open(dirname + os.path.sep + story_name + '.questions.json', 'w') as data_file:
          data_file.write(json.dumps(question_json, sort_keys=True, indent=4, separators=(',', ': ')))
      question_json = {}
      story_name = row[0]
    if len(row[1]) > 0:
      question_type = row[1]
      
      
  
  for question_json in glob(dirname + os.path.sep + "*.questions.json"):
    basename = os.path.splitext(os.path.splitext(os.path.basename(question_json))[0])[0]
    with open(question_json) as data_file:
      data = json.load(data_file)
      if 'multiple_choice' in data:
        for mc in data['multiple_choice']:
          questionwriter.writerow([basename, 'multiple_choice', mc['question']])
          basename=''
          questionwriter.writerow(['', '', mc['answer']])
          for c in mc['choices']:
            questionwriter.writerow(['', '', c])
      if 'fill_in_the_blanks' in data:
        for mc in data['fill_in_the_blanks']:
          questionwriter.writerow([basename, 'fill_in_the_blanks', mc['question']])
          basename=''
          questionwriter.writerow(['', '', mc['answer']])
          for c in mc['choices']:
            questionwriter.writerow(['', '', c])
      if 'meanings' in data:
        for mc in data['meanings']:
          for key in mc:
            questionwriter.writerow([basename, 'meanings', key])
            questionwriter.writerow(['', '', mc[key]])
            basename=''
      if 'picture' in data:
        for mc in data['picture']:
          for key in mc:
            questionwriter.writerow([basename, 'picture', mc[key]])
            basename=''
      if 'words' in data:
        for mc in data['words']:
          questionwriter.writerow([basename, 'words', mc])
          basename=''
