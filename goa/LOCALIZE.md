## List of files that require changes in order to localize the Goa application
<pre>
<b>GLEXP-Team-Chimple-goa</b>
|---<b>goa</b>
│   |---<b>classes</b>
|   |   |---<b>lang:</b> Contains language utility classes for each language that is supported by the application and the classes useful to switch between these languages.
|   |   |   |   <b>LangUtil.cpp:</b> Contains code to create an instance of local language in the getInstance() function.
|   |   |   |   <b>Lesson.cpp</b>
|   |   |   |   <b>TextGenerator.cpp</b> 
|   |   |---<b>menu:</b> Contains classes required for navigating between sections and corresponding mini-games.
|   |   |   |   <b>Setting.cpp</b>
|   |   |---<b>mini_games:</b> Contains classes corresponding to each mini-game.
|   |   |   |   <b>AlphaArrange.cpp:</b> Contains code to switch to the local language and define alphabets and levels accordingly.
|   |   |   |   <b>AlphabetWriting.cpp:</b> Contains code for alphabet writing starting with the first alphabet of the local language.
|   |   |   |   <b>AlphamonFeedLevelScene.cpp:</b> Contains code to add alphabet nodes to sprite depending on local language.
|   |   |   |   <b>BlastLetter.cpp:</b> Contains instructions that are in English and are getting translated to local language using LangUtil class. It also defines levels depending on the number of alphabets in the local language.
|   |   |   |   <b>DinoGame.cpp:</b>  Contains code to define alphabets depending on the local language.
|   |   |   |   <b>Order.cpp:</b> Contains vectors consisting of selected alphabets from the local language.
|   |   |   |   <b>Owl.h:</b> Contains an array of words getting displayed which are specific to the local language.
|   |   |   |   <b>SmashTheRockLevelScene.cpp:</b>  Contains code to add alphabet nodes to sprite depending on the local language.
|   |   |   |   <b>TraceScene.cpp:</b> Contains code to set levels depending on the number of alphabets in the local language.
|   |   |   |   <b>TreasureHunt.cpp:</b> Contains code to set levels depending on the number of alphabets in the local language.
|   |   |---<b>puzzle</b>
|   |   |   |   <b>Alphabet.cpp:</b> Contains code to set anchor point for letters depending on the local language.
|   |   |---<b>sqlite3</b>
|   |   |   |   <b>Sqlite3Helper.cpp:</b> Contains code to generate a language instance in the findAllHints and findAllDialogs functions.
|   |---<b>res</b>
|   |   |---<b>story</b>
|   |   |   |---<b>eng</b>
|   |   |   |   |   <b>*.json:</b> Contains questions related to the stories.
|   |---<b>Resources</b>
|   |   |---<b>res</b>
|   |   |   |---<b>config</b>
|   |   |   |   |   <b>*.json:</b> Contains the text that is getting displayed inside the title tags.
|   |   |   |---<b>lang:</b> Contains language specific content like alphabets, homonyms, plurals, sentences, parts of speech and so on.
|   |   |   |   |---<b>eng:</b> Create a .mo file from the .po file using some utility like [this] (https://po2mo.net/).
|   |   |   |---<b>story:</b> Contains audio and json files for each story.
|   |---<b>scripts:</b> Contais question related to stories.
|   |   |   <b>questions.csv</b>
|   |   |   <b>questions_with_swahili_edited.csv</b>
|   |---<b>src</b>
|   |   |---<b>maths</b>
|   |   |   |   <b>Dots.js:</b> Contains mapping between number and string.
|   |   |---<b>mini_games</b>
|   |   |   |---|<b>alphamom</b>
|   |   |   |   |   <b>LevelScene.js:</b> Contains a string of alphabets present in the local language.
|   |   |   |---|<b>jump</b>
|   |   |   |   |   <b>menu.js:</b> Contains code to create labels from the alphabets of the local language.
</pre>
____
#### Note: One needs to replace the currently available font with a font that supports local language and update the following files accordingly

* Item.cpp
* ATM.cpp
* Calculator.cpp
* Table.cpp
* LangUtil.cpp
* UIRichText.cpp
* Door.cpp
* TreasureHunt.cpp
* Units.cpp
* QuestionHandler.cpp
* Bubble_Numbers.js
* Bubble_Puzzle.js
