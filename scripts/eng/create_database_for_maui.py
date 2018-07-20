"""
Creates lessons from swahili words
"""

import sys
import csv
import re
import os
from operator import itemgetter, attrgetter, methodcaller

LETTER_TYPE = 1
PHONETIC_TYPE = 2
SYLLABLE_TYPE = 3
WORD_TYPE = 4
SENTENCE_TYPE = 5
LOWER_CASE_LETTER_TYPE = 6
UPPER_CASE_LETTER_TYPE = 7

AREAS = [
	["1","Letters"],
	["2","Words"],
	["3","Sentences"],
	["4","Numbers"],
	["5","Addition"],
	["6","Subtraction"],
	["7","Multiplication"],
	["8","Tables"]
]

UPPER_CASE_LETTER_CONCEPT = 1
UPPER_CASE_TO_LOWER_CASE_CONCEPT = 2
LOWER_CASE_LETTER_TO_WORD_CONCEPT = 3
WORD_LIST_CONCEPT = 4
UPPER_CASE_LETTER_TO_WORD_CONCEPT = 5
LOWER_CASE_LETTER_CONCEPT = 6

CONCEPTS = [
	["Uppercase Letter","1"],
	["Uppercase to Lowercase","1"],
	["Lowercase Letter to Word","1"],
	["Word List","2"],
	["Uppercase Letter to Word","1"],
	["Lowercase Letter","1"],
	["Single digit addition without carryover","5"],
	["Single digit addition with carryover","5"],
	["Double digit addition without carryover","5"],
	["Double digit addition with carryover","5"],
	["Triple digit addition without carryover","5"],
	["Triple digit addition with carryover","5"],
	["Single digit subtraction without borrow","6"],
	["Single digit subtraction with borrow","6"],
	["Double digit subtraction without borrow","6"],
	["Double digit subtraction with borrow","6"],
	["Triple digit subtraction without borrow","6"],
	["Triple digit subtraction with borrow","6"],
	["Single digit multiplication","7"],
	["Single digit with double digit multiplication","7"],
	["Double digit multiplication","7"],
	["1 Tables","8"],
	["2 Tables","8"],
	["3 Tables","8"],
	["4 Tables","8"],
	["5 Tables","8"],
	["6 Tables","8"],
	["7 Tables","8"],
	["8 Tables","8"],
	["9 Tables","8"],
	["10 Tables","8"],
	["1","4"],
	["2","4"],
	["3","4"],
	["4","4"],
	["5","4"],
	["6","4"],
	["7","4"],
	["8","4"],
	["9","4"],
	["10","4"],
	["0-9","4"],
	["0-99","4"]
]

I_DIR = "assets/dict/"
A_DIR = "assets/dict/"

#mapping from letter to unit_id
letter_dict = {}

#mapping from word to num_used
word_dict = {}

#mapping from letter to word array
letter_word_dict = {}

category_list = []

upper_case_letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
lower_case_letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

word_file = sys.argv[1]

with open(word_file, 'r') as word_file_csv:
	wordcsv = csv.reader(word_file_csv, delimiter=',')
	for row in wordcsv:
		start_letter = row[0]
		word = row[1]
		if start_letter not in letter_word_dict:
			letter_word_dict[start_letter] = []
			if start_letter not in lower_case_letters and start_letter not in upper_case_letters:
				category_list.append(start_letter)
		letter_word_dict[start_letter].append(word)
		word_dict[word] = 0

with open('db/'+word_file + '_lesson.csv', 'w') as lesson_csvfile:
	with open('db/'+word_file + '_lesson_unit.csv', 'w') as lesson_unit_csvfile:
		lesson_writer = csv.writer(lesson_csvfile, delimiter=',')
		lesson_writer.writerow(['id','title','conceptId','seq'])
		lesson_unit_writer = csv.writer(lesson_unit_csvfile, delimiter=',')
		lesson_unit_writer.writerow(['id','lessonId','seq','subjectUnitId','objectUnitId','highlight'])
		lesson_id = 0
		lesson_unit_id = 0

		lesson_id = lesson_id + 1
		lesson_writer.writerow([lesson_id, 'Upper Case Letters', UPPER_CASE_LETTER_CONCEPT, lesson_id,1])
		seq = 0
		for val in upper_case_letters:
			lesson_unit_id = lesson_unit_id + 1
			seq = seq + 1
			lesson_unit_writer.writerow([lesson_unit_id, lesson_id, seq, val, val, ''])

		lesson_id = lesson_id + 1
		lesson_writer.writerow([lesson_id, 'Lower Case Letters', LOWER_CASE_LETTER_CONCEPT, lesson_id,1])
		seq = 0
		for val in lower_case_letters:
			lesson_unit_id = lesson_unit_id + 1
			seq = seq + 1
			lesson_unit_writer.writerow([lesson_unit_id, lesson_id, seq, val, val, ''])

		lesson_id = lesson_id + 1
		lesson_writer.writerow([lesson_id, 'Upper Case to Lower Case Letters', UPPER_CASE_TO_LOWER_CASE_CONCEPT, lesson_id,0])
		seq = 0
		for i in range(len(upper_case_letters)):
			lesson_unit_id = lesson_unit_id + 1
			seq = seq + 1
			lesson_unit_writer.writerow([lesson_unit_id, lesson_id, seq, upper_case_letters[i], lower_case_letters[i], ''])

		num_words = 8
		seq = 0
		for val in upper_case_letters:
			lesson_id = lesson_id + 1
			lesson_writer.writerow([lesson_id, val.upper(), UPPER_CASE_LETTER_TO_WORD_CONCEPT, lesson_id,0])
			for seq in range(num_words):
				if seq >= len(letter_word_dict[val.lower()]):
					break
				lesson_unit_id = lesson_unit_id + 1
				lesson_unit_writer.writerow([lesson_unit_id, lesson_id, seq+1, val, letter_word_dict[val.lower()][seq].upper(), ''])
				word_dict[letter_word_dict[val.lower()][seq]] = word_dict[letter_word_dict[val.lower()][seq]] + 1

		seq = 0
		for val in lower_case_letters:
			lesson_id = lesson_id + 1
			lesson_writer.writerow([lesson_id, val, LOWER_CASE_LETTER_TO_WORD_CONCEPT, lesson_id,0])
			for seq in range(num_words):
				if seq >= len(letter_word_dict[val]):
					break
				lesson_unit_id = lesson_unit_id + 1
				lesson_unit_writer.writerow([lesson_unit_id, lesson_id, seq+1, val, letter_word_dict[val][seq], ''])
				word_dict[letter_word_dict[val][seq]] = word_dict[letter_word_dict[val][seq]] + 1

		for val in category_list:
			CONCEPTS.append([val, "2"])
			lesson_id = lesson_id + 1
			lesson_writer.writerow([lesson_id, val, WORD_LIST_CONCEPT, lesson_id,0])

			for concept_word in letter_word_dict[val]:
				word_dict[concept_word] = word_dict[concept_word] + 1
				lesson_unit_id = lesson_unit_id + 1
				lesson_unit_writer.writerow([lesson_unit_id, lesson_id, seq+1, concept_word, '', ''])

with open('db/'+word_file + '_unit.csv', 'w') as csvfile:
	db_writer = csv.writer(csvfile, delimiter=',')
	db_writer.writerow(['id','name','type','image','sound','phonemeSound'])
	for val in upper_case_letters:
		db_writer.writerow([val, val, UPPER_CASE_LETTER_TYPE,'',A_DIR+val.lower()+'.ogg',A_DIR+val.lower()+'.ogg'])
	for val in lower_case_letters:
		db_writer.writerow([val, val, LOWER_CASE_LETTER_TYPE,'',A_DIR+val+'.ogg',A_DIR+val+'.ogg'])

	for word, num_uses in word_dict.items():
		if(num_uses > 0):
			db_writer.writerow([word, word, WORD_TYPE, I_DIR+word+'.png',A_DIR+word+'.ogg',A_DIR+word+'.ogg'])

with open('db/'+word_file + '_concept.csv', 'w') as csvfile:
	db_writer = csv.writer(csvfile, delimiter=',')
	db_writer.writerow(['id','name','areaId'])
	for i in range(len(CONCEPTS)):
		db_writer.writerow([i+1, CONCEPTS[i][0], CONCEPTS[i][1]])
