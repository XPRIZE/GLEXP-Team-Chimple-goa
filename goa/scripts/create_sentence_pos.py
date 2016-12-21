"""
Converts sentences to POS tagged
"""

import sys
import nltk
from nltk import word_tokenize

sentence_file = sys.argv[1]

pos_dict = {
  'CC': 'CONJ',
  'CD': 'ADJ',
  'DT': 'DET',
  'EX': 'PRON',
  'FW': 'FW',
  'IN': 'ADP',
  'JJ': 'ADJ',
  'JJR': 'ADJ',
  'JJS': 'ADJ',
  'LS': 'ADJ',
  'MD': 'VERB',
  'NN': 'NOUN',
  'NNS': 'NOUN',
  'NNP': 'NOUN',
  'NNPS': 'NOUN',
  'PDT': 'DET',
  'POS': 'NOUN',
  'PRP': 'PRON',
  'PRP$': 'PRON',
  'RB': 'ADV',
  'RBR': 'ADV',
  'RBS': 'ADV',
  'RP': 'ADP',
  'SYM': 'NOUN',
  'TO': 'ADP',
  'UH': 'INT',
  'VB': 'VERB',
  'VBD': 'VERB',
  'VBG': 'VERB',
  'VBN': 'VERB',
  'VBP': 'VERB',
  'VBZ': 'VERB',
  'WDT': 'DET',
  'WP': 'PRON',
  'WP$': 'PRON',
  'WRB': 'ADV'
}

f = open(sentence_file, 'r')
fout = open(sentence_file+".pos", "w")
for line in f:
  spos = ''
  lis = line.split(';')
  text = word_tokenize(lis[1])
  for pair in nltk.pos_tag(text):
    if pair[1] in pos_dict:
      spos = spos + ';' + pair[0] + ';' + pos_dict[pair[1]]
    else:
      print(pair)
  fout.write(lis[0] + ';' + spos + "\n")
