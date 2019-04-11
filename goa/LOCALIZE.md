# Localization of Goa application
## Process

The Goa application comprises of many games which helps a child to get educated.

1. **Analysis of game content**: Make a complete list of the content in the local language which can be taught to a child with these games.
2. **Dialogue creation**: Create basic dialogues in the local language required for a child to learn and effectively communicate in day-to-day life.
3. **Image creation**: Creation of new images containing objects that a child comes across in day-to-day life.
4. **Recording**: Recordings of all audio and video material required in local language.
5. **Final build**: With all assets prepared and added to the project, build the Goa application.

## Key components:
The changes that are required in order to localize the Goa application are as follows:
1. **Content Changes**: In order to make content level changes one needs to make changes to ***[Resources/res](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res)*** and ***[scripts](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/scripts)*** folder.
2. **Code Changes**: In order to make code level changes one needs to make changes to ***[.cocos-project.json](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/.cocos-project.json)*** file, ***[Classes](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes)*** folder and ***[src](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src)*** folder.

### 1. Content Changes:
___

#### Resources/res:

* The ***[lang](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/lang)*** folder inside the ***[res](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res)*** folder contains one folder for each supported language, named ***{lang}*** henceforth. The ***{lang}*** folder contains language specific content like alphabets, words, homonyms, antonyms, synonyms, plurals, sentences, parts of speech and such other things in the form of JSON, CSV, CSB, audio and video files that need to be changed in order to localize the application.
* In order to add language specific instructions and help videos change the content of the ***[help](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/lang/eng/help)*** folder.
* The ***{lang}*** folder also contains ***{lang}.po*** file which contains strings in the `msgstr` tags which needs to be edited as per the local language. After editing ***{lang}.po*** file a ***{lang}.mo*** file must be generated using some utility like [this](https://po2mo.net/).

  ```
  msgid "text"
  msgstr "text in local language"
  ```
* Inside the ***[res](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res)*** folder there is a ***[config](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/config)*** folder which contains one JSON file corresponding to each section. The JSON files contain names of the mini-games inside the `title` tag. The ***[config](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/config)*** folder also contains mapping information for the game and contains `lang` tag which contains labels for the required language.
* The help for each section can be localized by changing the content present in the `help` tags in the ***[game_level.json](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Resources/res/config/game_levels.json)*** file.
  ```json
  "miningbg": [
      {
        "levels": [
          1
        ],
        "help": "help/instruction text in local language",
        "video": "help.webm"
      }
    ]
  ```

#### Scripts:
The ***[scripts](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/scripts)*** folder contains questions related to the stories in the ***[questions.csv](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/scripts/questions.csv)*** file and so this file needs to be modified.

### 2. Code Changes:
___
#### .cocos-project.json file:
 Change the value of the `chimple_lang` tag to the local language.
```json
{
    "engine_version": "cocos2d-x-3.14.1", 
    "project_type": "cpp",
    "custom_step_script": "./scripts/custom_script.py",
    "chimple_res": "HDR",
    "chimple_lang": "{lan}"
}
```
#### Classes:


***[Classes](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes)*** folder contains language utility classes for each language that is supported by the application and the classes useful to switch between these languages. 
* The ***[lang](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/lang)*** folder contains ***[LangUtil.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/LangUtil.cpp)*** class which contains code to create an instance of local language in the `getInstance()` function. One needs to create a class ***{Language}Util.cpp*** for a local language and create instance of that class. The code in the newly created ***{Language}Util.cpp*** class should be similar to the code present in the ***[TeluguUtil.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/TeluguUtil.cpp)*** class.

  ```cpp
  LangUtil* LangUtil::getInstance() {
      if(!_instance) {
          _instance = new {Language}Util();  
      }
      return _instance;
  }
  ```
   ***Note***: In the new {Language}Util.cpp class that was created, replace the font filenames specified in the getFontFile() and getBMFontFileName() functions. 
  Additionally one needs to change ***[Lesson.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/Lesson.cpp)*** and ***[TextGenerator.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/TextGenerator.cpp)***.
  
* The ***[menu](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/menu)*** folder contains classes required for navigation between sections and mini-games.
* The ***[mini-games](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/mini_games)*** folder contains a class for each mini-game. Few classes inside the ***mini-games*** folder have the code to create the game levels, sprite and other similar content based on the alphabets present in the local language. Also, in the ***[BlastLetter.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/mini_games/BlastLetter.cpp)*** file the instructions are getting translated from English to the local language. The following list of files requires changes:

  <pre>
  <b><i>mini_games</i></b> 
     |   <b><i>AlphaArrange.cpp</i></b> 
     |   <b><i>AlphabetWriting.cpp</i></b>
     |   <b><i>AlphamonFeedLevelScene.cpp</i></b> 
     |   <b><i>BlastLetter.cpp</i></b> 
     |   <b><i>DinoGame.cpp</i></b>  
     |   <b><i>Order.cpp</i></b> 
     |   <b><i>Owl.h</i></b> 
     |   <b><i>SmashTheRockLevelScene.cpp</i></b>
     |   <b><i>TraceScene.cpp</i></b>
     |   <b><i>TreasureHunt.cpp</i></b>
</pre>
   
* The ***[sqlite3](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/sqlite3)*** folder contains a class called ***[Sqlite3Helper.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/sqlite3/Sqlite3Helper.cpp)***. It contains code to insert local language content into a database using local language instance and it is defined in the `findAllHints()` and `findAllDialogs()` functions. Change the language in the following code:
  ```cpp
  LangUtil::getInstance()->changeLanguage(SupportedLanguages::{LANGUAGE});
  ```


#### Src:
The ***[src](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src)*** folder contains a sub-folder named ***[maths](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src/maths)*** which contains a file named ***[Dots.js](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/src/maths/Dots.js)*** which has a mapping from the number and the corresponding string. The folder also contains files containing code to generate labels using the alphabets present in a language.
<pre>
<b><i>src</i></b>
   |---<b><i>maths</i></b>
   |   |   <b><i>Dots.js</i></b>
   |---<b><i>mini_games</i></b>
   |   |---<b><i>alphamon</i></b>
   |   |   |   <b><i>LevelScene.js</i></b>
   |   |---<b><i>jump</i></b>
   |   |   |   <b><i>menu.js</i></b>
</pre>
