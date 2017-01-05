"""
Checks if sentence_pos file is valid
"""

import sys

sentence_file = sys.argv[1]

pos_tag = [
  'ADJ',
  'ADP',
  'ADV',
  'CONJ',
  'DET',
  'INT',
  'NOUN',
  'PRON',
  'VERB'
]

f = open(sentence_file, 'r')
all_pos = {}
for line in f:
  spos = ''
  lis = line.split(';')
  for word in lis[1::2]:
    all_pos[word.rstrip('\n')] = 1
print(all_pos)
