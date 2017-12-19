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

I_DIR = "tel/image/"
A_DIR = "tel/audio/"

#mapping from letter to unit_id
letter_dict = {}

# mapping from syllable to unit_id
syllable_dict = {}

#mapping from word to (unit_id, num_used)
word_dict = {}

#mapping from word to list of syllables
word_syllable_dict = {}


syllable_word_dict = {}

letter_word_dict = {}

lang_eng_dict = {}

#todo add "ಂ", "ಃ", 
upper_case_letters = ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ", "ಂ", "ಃ", "క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ"]
lower_case_letters = ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ", "ಂ", "ಃ", "క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ", "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ"]

word_file = sys.argv[1]
wf = open(word_file, 'r')
wf_csv = csv.reader(wf)
for row in wf_csv:
	word = row[1]
	lang_eng_dict[row[1]] = row[0]
	if word not in word_syllable_dict:
		prev_code_point = ''
		current_syllable = ''
		syllables = []
		for current_code_point in word:
			if prev_code_point != "\u0c4d" and current_code_point >= "\u0c05" and current_code_point <= "\u0c39":
				if current_syllable != '':
					syllables.append(current_syllable)
				current_syllable = current_code_point
			else:
				current_syllable = current_syllable + current_code_point
			prev_code_point = current_code_point
		syllables.append(current_syllable)
		for syllable in syllables:
			if syllable not in syllable_dict:
				syllable_dict[syllable] = 1
		word_syllable_dict[word] = syllables

syllable_list = sorted(list(syllable_dict))
word_list = sorted(list(word_syllable_dict))
with open(word_file + '.db.csv', 'w') as csvfile:
	db_writer = csv.writer(csvfile, delimiter=',')
	db_writer.writerow(['tableName','col1','col2','col3','col4','col5','col6','col7'])
	unit_id = 0
	for val in upper_case_letters:
		unit_id = unit_id + 1
		letter_dict[val] = unit_id
		db_writer.writerow(['Unit', unit_id, val, LETTER_TYPE,'',A_DIR+val.lower()+'.ogg',A_DIR+val.lower()+'.ogg'])
	for val in syllable_list:
		unit_id = unit_id + 1
		syllable_dict[val] = unit_id
		db_writer.writerow(['Unit', unit_id, val, SYLLABLE_TYPE,'',A_DIR+val+'.ogg',A_DIR+val+'.ogg'])
	for val in word_list:
		unit_id = unit_id + 1
		word_dict[val] = (unit_id, 0)
		db_writer.writerow(['Unit', unit_id, val, WORD_TYPE, I_DIR+lang_eng_dict[val]+'.png',A_DIR+val+'.ogg',A_DIR+val+'.ogg'])
	for val in word_list:
		if len(word_syllable_dict[val]) > 1:
			for i, syllable in enumerate(word_syllable_dict[val]):
				db_writer.writerow(['UnitPart', word_dict[val][0], syllable_dict[syllable], SYLLABLE_TYPE, i + 1, '#',val,syllable])
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

	# lessons for lower case letter -> word with starting letter
	nsplit = 6
	for ir in range(nsplit):
		lesson_id = lesson_id + 1
		seq = 0
		ll = len(upper_case_letters)
		db_writer.writerow(['Lesson', lesson_id, lower_case_letters[int(ir*ll/nsplit)] + '-' + lower_case_letters[int((ir+1)*ll/nsplit-1)], LETTER_TO_WORD_CONCEPT, lesson_id])
		for rep in range(3):
			for i, val in enumerate(lower_case_letters[int(ir*ll/nsplit):int((ir+1)*ll/nsplit)]):
				word_dict_list = [(k,v[0],v[1]) for (k,v) in word_dict.items()]
				start_words = [w for w in word_dict_list if w[0].startswith(val)]
				if len(start_words) > 0:
					lesson_unit_id = lesson_unit_id + 1
					seq = seq + 1
					#sort by alphabetical order, length, num_uses
					sorted_start_words = sorted(sorted(sorted(start_words),key=lambda w: len(w[0])),key=itemgetter(2))
					db_writer.writerow(['LessonUnit', lesson_unit_id, lesson_id, seq, letter_dict[val], sorted_start_words[0][1], '#', val, sorted_start_words[0][0]])
					print(['LessonUnit', lesson_unit_id, lesson_id, seq, letter_dict[val], sorted_start_words[0][1], '#', val, sorted_start_words[0][0]])
					word_dict[sorted_start_words[0][0]] = (sorted_start_words[0][1], sorted_start_words[0][2]+1)

	# lessons for syllable -> word with syllable
	nsplit = 120
	for ir in range(nsplit):
		lesson_id = lesson_id + 1
		seq = 0
		ll = len(syllable_list)
		db_writer.writerow(['Lesson', lesson_id, syllable_list[int(ir*ll/nsplit)] + '-' + syllable_list[int((ir+1)*ll/nsplit-1)], SYLLABLE_TO_WORD_CONCEPT, lesson_id])
		for rep in range(3):
			for i, val in enumerate(syllable_list[int(ir*ll/nsplit):int((ir+1)*ll/nsplit)]):
				lesson_unit_id = lesson_unit_id + 1
				seq = seq + 1
				word_dict_list = [(k,v[0],v[1]) for (k,v) in word_dict.items()]
				start_words = [w for w in word_dict_list if val in w[0]]
				#sort by length, location of syllable, num_uses
				sorted_start_words = sorted(sorted(sorted(start_words,key=lambda w: len(w[0])),key=lambda w: w[0].find(val)),key=itemgetter(2))
				db_writer.writerow(['LessonUnit', lesson_unit_id, lesson_id, seq, syllable_dict[val], sorted_start_words[0][1], '#', val, sorted_start_words[0][0]])
				word_dict[sorted_start_words[0][0]] = (sorted_start_words[0][1], sorted_start_words[0][2]+1)

	db_writer.writerow(['User',1,'test','test.png',1,5])
unused = [w for (w,n) in word_dict.items() if n[1] == 0]
print("Unused words:" + str(len(unused)))
print(unused)
