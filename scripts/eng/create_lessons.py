"""
Creates lessons from swahili words
"""

import sys
import csv
import re
from operator import itemgetter, attrgetter, methodcaller

LETTER_TYPE = 1
PHONETIC_TYPE = 2
SYLLABLE_TYPE = 3
WORD_TYPE = 4
SENTENCE_TYPE = 5

LETTER_CONCEPT = 1
UPPER_CASE_TO_LOWER_CASE_CONCEPT = 2
LETTER_TO_WORD_CONCEPT = 3
SYLLABLE_TO_WORD_CONCEPT = 4
UPPER_CASE_LETTER_TO_WORD_CONCEPT = 5

I_DIR = "eng/image/"
A_DIR = "eng/audio/"

#mapping from letter to unit_id
letter_dict = {}

#mapping from word to (unit_id, num_used)
word_dict = {}

letter_word_dict = {}

upper_case_letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
lower_case_letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

word_file = sys.argv[1]
wf = open(word_file, 'r')
p = re.compile(r'[^aeiou]*[aeiou]+')
word_list = []
for word in wf:
	word = word.rstrip('\n').lower()
	word_list.append(word)
word_list.sort()
with open(word_file + '.db.csv', 'w') as csvfile:
	db_writer = csv.writer(csvfile, delimiter=',')
	db_writer.writerow(['tableName','col1','col2','col3','col4','col5','col6','col7'])
	unit_id = 0
	for val in upper_case_letters:
		unit_id = unit_id + 1
		letter_dict[val] = unit_id
		db_writer.writerow(['Unit', unit_id, val, LETTER_TYPE,'',A_DIR+val.lower()+'.ogg',A_DIR+val.lower()+'.ogg'])
	for val in lower_case_letters:
		unit_id = unit_id + 1
		letter_dict[val] = unit_id
		db_writer.writerow(['Unit', unit_id, val, LETTER_TYPE,'',A_DIR+val+'.ogg',A_DIR+val+'.ogg'])
	for val in word_list:
		unit_id = unit_id + 1
		word_dict[val] = (unit_id, 0)
		db_writer.writerow(['Unit', unit_id, val, WORD_TYPE, I_DIR+val+'.png',A_DIR+val+'.ogg',A_DIR+val+'.ogg'])
	lesson_id = 0
	lesson_unit_id = 0
	nsplit = 3
	for ir in range(nsplit):
		lesson_id = lesson_id + 1
		ll = len(upper_case_letters)
		db_writer.writerow(['Lesson', lesson_id, upper_case_letters[int(ir*ll/nsplit)] + '-' + upper_case_letters[int((ir+1)*ll/nsplit-1)], LETTER_CONCEPT, lesson_id])
		for i, val in enumerate(upper_case_letters[int(ir*ll/nsplit):int((ir+1)*ll/nsplit)]):
			lesson_unit_id = lesson_unit_id + 1
			db_writer.writerow(['LessonUnit', lesson_unit_id, lesson_id, i + 1, letter_dict[val], letter_dict[val], '#', val])
	for ir in range(nsplit):
		lesson_id = lesson_id + 1
		ll = len(lower_case_letters)
		db_writer.writerow(['Lesson', lesson_id, lower_case_letters[int(ir*ll/nsplit)] + '-' + lower_case_letters[int((ir+1)*ll/nsplit-1)], LETTER_CONCEPT, lesson_id])
		for i, val in enumerate(lower_case_letters[int(ir*ll/nsplit):int((ir+1)*ll/nsplit)]):
			lesson_unit_id = lesson_unit_id + 1
			db_writer.writerow(['LessonUnit', lesson_unit_id, lesson_id, i + 1, letter_dict[val], letter_dict[val], '#', val])
	# lessons for upper case letter -> word with starting letter
	nsplit = 6
	for alpha_rep in range(10):
		for ir in range(nsplit):
			lesson_id = lesson_id + 1
			seq = 0
			ll = len(upper_case_letters)
			db_writer.writerow(['Lesson', lesson_id, 'Words ' + upper_case_letters[int(ir*ll/nsplit)] + '-' + upper_case_letters[int((ir+1)*ll/nsplit-1)], UPPER_CASE_LETTER_TO_WORD_CONCEPT, lesson_id])
			for rep in range(3):
				for i, val in enumerate(upper_case_letters[int(ir*ll/nsplit):int((ir+1)*ll/nsplit)]):
					lesson_unit_id = lesson_unit_id + 1
					seq = seq + 1
					word_dict_list = [(k,v[0],v[1]) for (k,v) in word_dict.items()]
					start_words = [w for w in word_dict_list if w[0].startswith(val.lower())]
					#sort by alphabetical order, length, num_uses
					sorted_start_words = sorted(sorted(sorted(start_words),key=lambda w: len(w[0])),key=itemgetter(2))
					db_writer.writerow(['LessonUnit', lesson_unit_id, lesson_id, seq, letter_dict[val], sorted_start_words[0][1], '#', val, sorted_start_words[0][0]])
					word_dict[sorted_start_words[0][0]] = (sorted_start_words[0][1], sorted_start_words[0][2]+1)

		# lessons for lower case letter -> word with starting letter
		for ir in range(nsplit):
			lesson_id = lesson_id + 1
			seq = 0
			ll = len(upper_case_letters)
			db_writer.writerow(['Lesson', lesson_id, 'Words ' + lower_case_letters[int(ir*ll/nsplit)] + '-' + lower_case_letters[int((ir+1)*ll/nsplit-1)], LETTER_TO_WORD_CONCEPT, lesson_id])
			for rep in range(3):
				for i, val in enumerate(lower_case_letters[int(ir*ll/nsplit):int((ir+1)*ll/nsplit)]):
					lesson_unit_id = lesson_unit_id + 1
					seq = seq + 1
					word_dict_list = [(k,v[0],v[1]) for (k,v) in word_dict.items()]
					start_words = [w for w in word_dict_list if w[0].startswith(val)]
					#sort by alphabetical order, length, num_uses
					sorted_start_words = sorted(sorted(sorted(start_words),key=lambda w: len(w[0])),key=itemgetter(2))
					db_writer.writerow(['LessonUnit', lesson_unit_id, lesson_id, seq, letter_dict[val], sorted_start_words[0][1], '#', val, sorted_start_words[0][0]])
					word_dict[sorted_start_words[0][0]] = (sorted_start_words[0][1], sorted_start_words[0][2]+1)

	db_writer.writerow(['User',1,'test','test.png',1,5])
unused = [w for (w,n) in word_dict.items() if n[1] == 0]
print("Unused words:" + str(len(unused)))
print(unused)
