import re
import csv
import sys

swa_eng_dict = {}

with open('swahili_eng.csv', newline='') as csvfile:
	wordcsv = csv.reader(csvfile)
	for row in wordcsv:
		swa_eng_dict[row[1]] = row[0]

with open('images.txt') as imagefile:
	for image in imagefile:
		image = image.rstrip('\n')
		if image in swa_eng_dict:
			print(image+','+swa_eng_dict[image])

