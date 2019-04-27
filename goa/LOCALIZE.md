# Localization of Goa application
## Process

We propose the below steps in order to streamline the localization process.

1. **Analysis of game content**: Make a complete list of content which needs to be localized.
2. **Dialogue creation**: Create basic dialogues in the local language required for a child to learn and effectively communicate in day-to-day life.
3. **Image creation**: Create new images for objects that a child would encounter in day-to-day life.
4. **Recording**: Record audio and create video in local language.
5. **Final build**: With all assets prepared and added to the project, build the Goa application.

## Key components:
The changes that are required in order to localize the Goa application are as follows:
1. **Content Changes**: In order to make content level changes, one needs to make changes to ***[Resources/res](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res)*** and ***[scripts](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/scripts)*** folder.
2. **Code Changes**: In order to make code level changes, one needs to make changes to ***[.cocos-project.json](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/.cocos-project.json)*** file, ***[Classes](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes)*** and ***[src](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src)*** folders.

## Content Changes

#### Resources/res:

* The ***[lang](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/lang)*** folder contains locale specific content for all the currently supported languages. It contains language specific content like alphabets, words, homonyms, antonyms, synonyms, plurals, sentences, parts of speech, and similar things in the form of JSON, CSV, CSB, audio and video files.
* Instructions and _help videos_ are present in ***[help](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/lang/eng/help)***. These media files need to be localized. 
* The language folder also contains ***.po*** file which contains strings in the `msgstr` tags that need to be replaced as per the locale language.

  ```
  msgid "text"
  msgstr "text in local language"
  ```
  After editing ***.po*** file, a ***.mo*** file should be generated using an external utility ([sample](https://po2mo.net/)).
* In the ***[config](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/config)*** folder, there are JSON files that contains names of the minigames with `title` as their key. This folder also contains JSON files in which the values of `lang` key are a combination of letters/numbers that represent different levels of games. These combination of letters/numbers can be localized.
* The help instruction is contained in ***[game_level.json](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Resources/res/config/game_levels.json)*** file with `help` as the key for each section.
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
The ***[scripts](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/scripts)*** folder contains questions related to the stories in the ***[questions.csv](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/scripts/questions.csv)*** file. These questions must also be localized into the desired language.

## Code Changes
#### .cocos-project.json file:
 Change the value of the item with key as `chimple_lang` in this file to the desired language.
```json
{
    "engine_version": "cocos2d-x-3.14.1", 
    "project_type": "cpp",
    "custom_step_script": "./scripts/custom_script.py",
    "chimple_res": "HDR",
    "chimple_lang": "{lang}"
}
```
#### Classes:


***[Classes](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes)*** folder contains utility classes for each language that are supported by the application. These classes are useful to switch between languages. 
* The ***[lang](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/lang)*** folder contains ***[LangUtil.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/LangUtil.cpp)*** class which contains code to create an instance of local language in the `getInstance()` function. One needs to create a class ***{Language}Util.cpp*** for a local language and create an instance of that class. The code in the newly created ***{Language}Util.cpp*** class should be similar to the code present in the ***[TeluguUtil.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/TeluguUtil.cpp)*** class.

  ```cpp
  LangUtil* LangUtil::getInstance() {
      if(!_instance) {
          _instance = new {Language}Util();  
      }
      return _instance;
  }
  ```
   ***Note***: Font related code is present in {Language}Util.cpp class in _getFontFile()_ and _getBMFontFileName()_ functions. 
  Additionally, one needs to change locale specific content in ***[Lesson.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/Lesson.cpp)*** and ***[TextGenerator.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/lang/TextGenerator.cpp)*** files.
  
* The ***[menu](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/menu)*** folder contains classes required for navigating between sections and minigames. This folder contains ***.cpp*** files which has game names and menu titles that need to be updated.
* The ***[minigames](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/mini_games)*** folder contains a class for each minigame. Few classes inside the ***minigames*** folder have the code to create the game levels, sprite and other similar content based on the local language.

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
   
* The ***[sqlite3](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/sqlite3)*** folder contains a class called ***[Sqlite3Helper.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/sqlite3/Sqlite3Helper.cpp)***. This class contains code to add new language content into a database with the help of a new language instance. The code is present in _findAllHints()_ and _findAllDialogs()_ functions which can be modified in the following way:
  ```cpp
  LangUtil::getInstance()->changeLanguage(SupportedLanguages::{LANGUAGE});
  ```


#### Src:
The ***[src](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src)*** folder contains a sub-folder named ***[maths](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src/maths)*** which contains a file named ***[Dots.js](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/src/maths/Dots.js)*** which has a mapping from the number to its corresponding string. This folder also contains code files to generate labels.
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
