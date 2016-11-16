import re
import csv
import sys

with open(sys.argv[1], newline='') as csvfile:
	wordcsv = csv.reader(csvfile)
	for row in wordcsv:
		if row[0].lower() != row[1].lower():
			print(row[1])
