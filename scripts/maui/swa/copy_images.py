import sys
import csv
import os.path
import shutil

unit_file = sys.argv[1]
image_dir = sys.argv[2]

with open(unit_file, 'r') as unit_file_csv:
  unitfilecsv = csv.reader(unit_file_csv, delimiter=',')
  for row in unitfilecsv:
    id_col = row[0]
    name_col = row[1]
    type_col = row[2]
    image_col = row[3]
    sound_col = row[4]
    phoneme_sound_col = row[5]
    if image_col != '':
      if(os.path.exists(image_dir+'/'+image_col)):
        try:
          shutil.copy(image_dir+'/'+image_col, "db/"+image_col)
        except IOError as e:
          print(image_dir+'/'+image_col);
          print("Unable to copy file. %s" % e)
        except:
          print("Unexpected error:", sys.exc_info())
      else:
        print('Cannot find: %s' % image_col)