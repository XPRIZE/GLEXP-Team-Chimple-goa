"""
Detects duplicates in language csv files in any particular level
"""

import re
import csv
import sys

corpus = {}
with open(sys.argv[1], newline='') as csvfile:
  wordcsv = csv.reader(csvfile, delimiter=';')
  for row in wordcsv:
    if row[0] not in corpus:
      corpus[row[0]] = []
    corpus[row[0]].append(row[1])
    corpus[row[0]].append(row[2])    
for level, lang_dict in corpus.items():
  if len(lang_dict) < 60:
  	print("Length of level: " + level + " is " + str(len(lang_dict) / 2))
  for val in sorted(lang_dict):
    if lang_dict.count(val) > 1:
      print("Duplicate Level: " + level + " Value: " + val)
with open(sys.argv[1], newline='') as csvfile:
  pattern = re.compile('\s+$')
  for row in csvfile:
    if pattern.search(row) != None:
      print("Whitespace: " + row)
