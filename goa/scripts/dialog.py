import re
from bs4 import BeautifulSoup
from urllib import request

url="http://www.africanstorybook.org/readbook.php?id=2651&a=1"
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
print(json)