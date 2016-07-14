"""
Adjusts Physics Editor files for HD (50%) and SD (25%) resolution
Expects the HDR file to be in a subdirectory named HDR
Standard usage: adjust_physicseditor_res.py filename
"""


import xml.etree.ElementTree as ET
import re
import sys

filename = sys.argv[1]

tree = ET.parse(filename)
root = tree.getroot()
for s in root.findall("./dict/dict/dict/array/dict/array/array/string"):
	a = re.findall("[-0-9\.]+",s.text)
	s.text = '{{ {:.5f},{:.5f} }}'.format(float(a[0])/2, float(a[1])/2)
hdfile = re.sub('HDR','HD',filename)	
print('Writing 50% reduced file to: {}'.format(hdfile))
tree.write(hdfile)

for s in root.findall("./dict/dict/dict/array/dict/array/array/string"):
	a = re.findall("[-0-9\.]+",s.text)
	s.text = '{{ {:.5f},{:.5f} }}'.format(float(a[0])/2, float(a[1])/2)
sdfile = re.sub('HDR','SD',filename)
print('Writing 25% reduced file to: {}'.format(sdfile))
tree.write(sdfile)
