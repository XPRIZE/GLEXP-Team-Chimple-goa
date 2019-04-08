## List of files that require changes in order to localize the Goa application
<pre>
<b><i>GLEXP-Team-Chimple-goa</i></b>
|---<b><i>goa</i></b>
│   |---<b><i>classes</i></b>
|   |   |---<b><i>lang:</i></b> Contains language utility classes for each language that is supported by the application and the classes useful to switch between these languages.
|   |   |   |   <b><i>LangUtil.cpp:</i></b> Contains code to create an instance of local language in the getInstance() function.
|   |   |   |   <b><i>Lesson.cpp</i></b>
|   |   |   |   <b><i>TextGenerator.cpp</i></b> 
|   |   |---<b><i>menu:</i></b> Contains classes required for navigating between sections and corresponding mini-games.
|   |   |   |   <b><i>Setting.cpp</i></b>
|   |   |---<b><i>mini_games:</i></b> Contains classes corresponding to each mini-game.
|   |   |   |   <b><i>AlphaArrange.cpp:</i></b> Contains code to switch to the local language and define alphabets and levels accordingly.
|   |   |   |   <b><i>AlphabetWriting.cpp:</i></b> Contains code for alphabet writing starting with the first alphabet of the local language.
|   |   |   |   <b><i>AlphamonFeedLevelScene.cpp:</i></b> Contains code to add alphabet nodes to sprite depending on local language.
|   |   |   |   <b><i>BlastLetter.cpp:</i></b> Contains instructions that are in English and are getting translated to local language using LangUtil class. It also defines levels depending on the number of alphabets in the local language.
|   |   |   |   <b><i>DinoGame.cpp:</i></b>  Contains code to define alphabets depending on the local language.
|   |   |   |   <b><i>Order.cpp:</i></b> Contains vectors consisting of selected alphabets from the local language.
|   |   |   |   <b><i>Owl.h:</i></b> Contains an array of words getting displayed which are specific to the local language.
|   |   |   |   <b><i>SmashTheRockLevelScene.cpp:</i></b>  Contains code to add alphabet nodes to sprite depending on the local language.
|   |   |   |   <b><i>TraceScene.cpp:</i></b> Contains code to set levels depending on the number of alphabets in the local language.
|   |   |   |   <b><i>TreasureHunt.cpp:</i></b> Contains code to set levels depending on the number of alphabets in the local language.
|   |   |---<b><i>puzzle</i></b>
|   |   |   |   <b><i>Alphabet.cpp:</i></b> Contains code to set anchor point for letters depending on the local language.
|   |   |---<b><i>sqlite3</i></b>
|   |   |   |   <b><i>Sqlite3Helper.cpp:</i></b> Contains code to generate a language instance in the findAllHints and findAllDialogs functions.
|   |---<b><i>res</i></b>
|   |   |---<b><i>story</i></b>
|   |   |   |---<b><i>eng</i></b>
|   |   |   |   |   <b><i>*.json:</i></b> Contains questions related to the stories.
|   |---<b><i>Resources</i></b>
|   |   |---<b><i>res</i></b>
|   |   |   |---<b><i>config</i></b>
|   |   |   |   |   <b><i>*.json:</i></b> Contains the text that is getting displayed inside the title tags.
|   |   |   |---<b><i>lang:</i></b> Contains language specific content like alphabets, homonyms, plurals, sentences, parts of speech and so on.
|   |   |   |   |---<b><i>eng:</i></b> Create a .mo file from the .po file using some utility like [this](https://po2mo.net/).
|   |   |   |---<b><i>story:</i></b> Contains audio and json files for each story.
|   |---<b><i>scripts:</i></b> Contais question related to stories.
|   |   |   <b><i>questions.csv</i></b>
|   |   |   <b><i>questions_with_swahili_edited.csv</i></b>
|   |---<b><i>src</i></b>
|   |   |---<b><i>maths</i></b>
|   |   |   |   <b><i>Dots.js:</i></b> Contains mapping between number and string.
|   |   |---<b><i>mini_games</i></b>
|   |   |   |---|<b><i>alphamom</i></b>
|   |   |   |   |   <b><i>LevelScene.js:</i></b> Contains a string of alphabets present in the local language.
|   |   |   |---|<b><i>jump</i></b>
|   |   |   |   |   <b><i>menu.js:</i></b> Contains code to create labels from the alphabets of the local language.
</pre>
____
#### Note: One needs to replace the currently available font with a font that supports local language. In order to support a new language a new <Language>Util.cpp class needs to be made. For example in order to support Hindi language create a HindiUtil.cpp class similar to the TeluguUtil.cpp class and then replace the font filenames specified in the getFontFile() and getBMFontFileName() functions. 
