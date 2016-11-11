import re
import csv
from bs4 import BeautifulSoup
from urllib import request

def download_and_save(url, filename):
	print("Getting " + url + " and saving to " + filename)		
	html = request.urlopen(url).read().decode('utf8')
	soup = BeautifulSoup(html)

	str = ''
	for txt in soup.find("div", class_="cover_title").stripped_strings:
		str = str + txt + "\\n"

	title = re.sub('"', '\\"', str)

	json = '{\n  "0": "' + title + '",\n'
	for txt in soup.find_all("div", class_=re.compile("page-text")):
		str = ''
		for string in txt.stripped_strings:
			str = str + string + "\\n"
		str = re.sub('"', '\\"', str)
		id = txt['id']
		json = json + '  "' + id[2:] + '":"' + str + '",\n'

	str = ''
	for txt in soup.find("div", class_="backcover_wrapper").stripped_strings:
		str = str + txt + "\\n"
	json = json + '  "copyright": "' + re.sub('"', '\\"', str) + '"\n}'
	f = open(filename, 'w')
	f.write(json)
	f.close()

with open('story.csv', newline='') as csvfile:
	storycsv = csv.DictReader(csvfile)
	for row in storycsv:
		download_and_save(row['English URL'], "../res/story/eng/" + row['CocosDirectory']+'.json')
		download_and_save(row['Swahili URL'], "../res/story/swa/" + row['CocosDirectory']+'.json')


