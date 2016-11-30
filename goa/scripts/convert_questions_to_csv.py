"""
Converts all questions in json format to csv format for easy translation
"""

from glob import glob
import os
import json
import csv
import sys
import os.path

dirname = sys.argv[1]

with open('questions.csv', 'w') as csvfile:
  questionwriter = csv.writer(csvfile, delimiter=';', quoting=csv.QUOTE_ALL)  
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
