To localize to a new language, ideally content should be created that is relevant to the children using the app. But, at a bare minimum, the existing content can be translated.

## Create the lesson plans / curriculum.
- Create a word list like A -> Apple or Animals -> Lion. Example can be found in scripts/eng/words.txt
- Create the csv file from this. Custom script can be written using the example in scripts/create_lessons.py. Run the script:
  ```
  cd scripts
  python3 create_lessons.py
  ```
  This will create a db.csv file.


- Create a language folder inside Bali/app/src/main/assets. See the example of English in eng folder. Inside this folder create the following:

  - Record audio for each word in the word list. Save it in **audio** folder with name of word. For example, apple will be saved as apple.ogg

  - Create an image for each word in the word list. Save it in **image** folder with name of word. For example, apple will be saved as apple.png

  - Copy the db.csv file as database.csv

- In the file `Bali⁩/app⁩/src⁩/main⁩/java⁩/org⁩/chimple⁩/bali⁩/db⁩/AppDatabase.java` change the below to the newly created language folder 
  ```
  inputStream = assetManager.open("swa/database.csv");
  ```

## Create the translations
- Open `Bali⁩/app⁩/src⁩/main⁩/res⁩/values⁩/strings.xml` in Android Studio's Translation Editor. Create a translation for each string in the new language
