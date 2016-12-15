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
      if len(story_name) > 0:
        with open(dirname + os.path.sep + 'eng' + os.path.sep + story_name + '.questions.json', 'w') as data_file:
          if len(question_json['multiple_choice']) == 0:
            del question_json['multiple_choice']
          if len(question_json['fill_in_the_blanks']) == 0:
            del question_json['fill_in_the_blanks']
          if len(question_json['meanings']) == 0:
            del question_json['meanings']
          if len(question_json['picture']) == 0:
            del question_json['picture']
          if len(question_json['words']) == 0:
            del question_json['words']
          data_file.write(json.dumps(question_json, sort_keys=True, indent=4, separators=(',', ': ')))
        with open(dirname + os.path.sep + 'swa' + os.path.sep + story_name + '.questions.json', 'w') as data_file:
          if len(question_json_swa['multiple_choice']) == 0:
            del question_json_swa['multiple_choice']
          if len(question_json_swa['fill_in_the_blanks']) == 0:
            del question_json_swa['fill_in_the_blanks']
          if len(question_json_swa['meanings']) == 0:
            del question_json_swa['meanings']
          if len(question_json_swa['picture']) == 0:
            del question_json_swa['picture']
          if len(question_json_swa['words']) == 0:
            del question_json_swa['words']
          data_file.write(json.dumps(question_json_swa, sort_keys=True, indent=4, separators=(',', ': ')))
      question_json = {"multiple_choice":[], 	"fill_in_the_blanks": [], "meanings": [], "picture": [], "words": []}
      question_json_swa = {"multiple_choice":[], 	"fill_in_the_blanks": [], "meanings": [], "picture": [], "words": []}
      meanings = {}
      picture = {}
      meanings_swa = {}
      picture_swa = {}
      story_name = row[0]
    if len(row[1]) > 0:
      question_type = row[1]
      if question_type == 'multiple_choice':
        multiple_choice = {'question': row[2], 'choices': []}
        multiple_choice_swa = {'question': row[3], 'choices': []}
      elif question_type == 'fill_in_the_blanks':
        fill_in_the_blanks = {'question': row[2], 'choices': []}
        fill_in_the_blanks_swa = {'question': row[3], 'choices': []}
      elif question_type == 'meanings':
        meaning_question = row[2]
        meaning_question_swa = row[3]
      elif question_type == 'picture':
        picture[row[2]+'.png'] = row[2] 
        picture_swa[row[2]+'.png'] = row[3] 
        if len(picture) == 4:
          question_json['picture'].append(picture)
          question_json_swa['picture'].append(picture_swa)
          picture = {}
          picture_swa = {}
      elif question_type == 'words':
        question_json['words'].append(row[2]) 
        question_json_swa['words'].append(row[3]) 
    else:
      if question_type == 'multiple_choice':
        if 'answer' not in multiple_choice:
          multiple_choice['answer'] = row[2]
          multiple_choice_swa['answer'] = row[3]
        else:
          multiple_choice['choices'].append(row[2])
          multiple_choice_swa['choices'].append(row[3])
          if len(multiple_choice['choices']) == 3:
            question_json['multiple_choice'].append(multiple_choice)
            question_json_swa['multiple_choice'].append(multiple_choice_swa)
            multiple_choice = {}
            multiple_choice_swa = {}
      elif question_type == 'fill_in_the_blanks':
        if 'answer' not in fill_in_the_blanks:
          fill_in_the_blanks['answer'] = row[2]
          fill_in_the_blanks_swa['answer'] = row[3]
        else:
          fill_in_the_blanks['choices'].append(row[2])
          fill_in_the_blanks_swa['choices'].append(row[3])
          if len(fill_in_the_blanks['choices']) == 3:
            question_json['fill_in_the_blanks'].append(fill_in_the_blanks)
            question_json_swa['fill_in_the_blanks'].append(fill_in_the_blanks_swa)
            fill_in_the_blanks = {}
            fill_in_the_blanks_swa = {}
      elif question_type == 'meanings':
        meanings[meaning_question] = row[2]
        meanings_swa[meaning_question_swa] = row[3]
        if len(meanings) == 4:
          question_json['meanings'].append(meanings)
          question_json_swa['meanings'].append(meanings_swa)
          meanings = {}
          meanings_swa = {}
      elif question_type == 'picture':
        if len(picture) == 4:
          question_json['picture'].append(picture)
          question_json_swa['picture'].append(picture_swa)
          picture = {}
          picture_swa = {}
        picture[row[2]+'.png'] = row[2] 
        picture_swa[row[2]+'.png'] = row[3] 
      elif question_type == 'words':
        question_json['words'].append(row[2]) 
        question_json_swa['words'].append(row[3]) 
