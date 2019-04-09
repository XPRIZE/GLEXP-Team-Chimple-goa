## List of folders inside ***[~/goa](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa)*** folder that require changes in order to localize the Goa application 
### Classes
***[Classes](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes)*** folder contains language utility classes for each language that is supported by the application and the classes useful to switch between these languages. 
* The ***[lang](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/lang)*** folder inside it contains code to create an instance of local language in the `getInstance()` function.
* The ***[menu](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/menu)*** folder contains classes required for navigation between sections and mini-games. 
* The ***[mini-games](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/mini_games)*** folder contains a class for each mini-game. Few classes inside the ***mini-games*** folder have the code to create the game levels, sprite and other similar content based on the alphabets present in the local language. Also, in the ***[BlastLetter.cpp](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Classes/mini_games/BlastLetter.cpp)*** file the instructions are getting translated from English to the local language. 
* The ***[sqlite3](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Classes/sqlite3)*** folder contains code to insert local language content into a database using local language instance and it is defined in the `findAllHints()` and `findAllDialogs()` functions. 

The files inside the ***Classes*** folder that require changes are listed below.
<pre>
<b><i>Classes</i></b>
   |---<b><i>lang</i></b> 
   |   |   <b><i>LangUtil.cpp</i></b> 
   |   |   <b><i>Lesson.cpp</i></b>
   |   |   <b><i>TextGenerator.cpp</i></b> 
   |---<b><i>menu</i></b>
   |   |   <b><i>Setting.cpp</i></b>
   |---<b><i>mini_games</i></b> 
   |   |   <b><i>AlphaArrange.cpp</i></b> 
   |   |   <b><i>AlphabetWriting.cpp</i></b>
   |   |   <b><i>AlphamonFeedLevelScene.cpp</i></b> 
   |   |   <b><i>BlastLetter.cpp</i></b> 
   |   |   <b><i>DinoGame.cpp</i></b>  
   |   |   <b><i>Order.cpp</i></b> 
   |   |   <b><i>Owl.h</i></b> 
   |   |   <b><i>SmashTheRockLevelScene.cpp</i></b>
   |   |   <b><i>TraceScene.cpp</i></b>
   |   |   <b><i>TreasureHunt.cpp</i></b>
   |---<b><i>puzzle</i></b>
   |   |   <b><i>Alphabet.cpp</i></b> 
   |---<b><i>sqlite3</i></b>
   |   |   <b><i>Sqlite3Helper.cpp</i></b>
</pre>

### Resources
The ***[Resources](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources)*** folder contains a sub-folder named ***[res](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res)***. Inside the ***res*** folder there is a ***[config](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/config)*** folder which contains one JSON file corresponding to each section. The JSON files contain names of the mini-games inside the `title` tag. The help for each section can be localized by changing the content present in the `help` tags in the ***[game_level.json](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/Resources/res/config/game_levels.json)*** file. The ***{lang}*** folder inside the ***res*** folder contains language specific content like alphabets, homonyms, plurals, sentences, parts of speech and such other things in the form of JSON and audio files. Inside the ***{lang}*** folder there is a ***{lang}.po*** file which contains section names and after editing the file a ***{lang}.mo*** file must be generated using some utility like [this](https://po2mo.net/). The content inside all the JSON and audio files inside the ***{lang}*** and ***[story/{lang}](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/Resources/res/story/)*** folders need to be changed in order to localize the application.
<pre>
<b><i>Resources</i></b>
   |---<b><i>res</i></b>
   |   |---<b><i>config</i></b>
   |   |   |   <b><i>*.json</i></b>
   |   |---<b><i>lang:</i></b> 
   |   |   |---<b><i>{lang}</i></b> 
   |   |---<b><i>story</i></b> 
   |   |   |---<b><i>{lang}</i></b> 
</pre>

### Scripts]
The ***[scripts](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/scripts)*** folder contains questions related to the stories in the ***[questions.csv](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/scripts/questions.csv)*** file and so this file needs to be modified.

### Src
The ***[src](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src)*** folder contains a sub-folder named ***[maths](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/tree/master/goa/src/maths)*** which contains a file named ***[Dots.js](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/goa/src/maths/Dots.js)*** which has a mapping from the number and the corresponding string. The folder also contains files contining code to generate labels using the alphabets present in a language.
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
____
#### Note: One needs to replace the currently available font with a font that supports local language. In order to support a new language a new {Lang}Util.cpp class needs to be made. For example in order to support Hindi language create a HindiUtil.cpp class similar to the TeluguUtil.cpp class and then replace the font filenames specified in the getFontFile() and getBMFontFileName() functions. 
