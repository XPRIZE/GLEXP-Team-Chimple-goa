## List of files that require changes in order to localize the Goa application
```
GLEXP-Team-Chimple-goa
|---goa
│   |---classes
|   |   |---lang
|   |   |   |   LangUtil.cpp --> [_instance = new EnglishUtil();]
|   |   |   |   Lesson.cpp
|   |   |   |   TextGenerator.cpp 
|   |   |---menu
|   |   |   |   MainMenuHome.cpp
|   |   |   |   Setting.cpp
|   |   |---mini_games
|   |   |   |   AlphaArrange.cpp
|   |   |   |   AlphabetWriting.cpp
|   |   |   |   AlphamonFeedLevelScene.cpp
|   |   |   |   BajaWordScene.cpp
|   |   |   |   BlastLetter.cpp
|   |   |   |   Decomon.cpp
|   |   |   |   DinoGame.cpp
|   |   |   |   Order.cpp
|   |   |   |   Owl.h
|   |   |   |   SmashTheRockLevelScene.cpp
|   |   |   |   TraceScene.cpp
|   |   |   |   TreasureHunt.cpp
|   |   |   |   Wembley.cpp
|   |   |---puzzle
|   |   |   |   Alphabet.cpp
|   |   |   |   Grapheme.cpp
|   |   |   |   GraphemeGrid.cpp - to be checked
|   |   |---sqlite3
|   |   |   |   Sqlite3Helper.cpp
|   |---res
|   |   |---story
|   |   |   |---eng
|   |   |   |   |   *.json
|   |---Resources
|   |   |---res
|   |   |   |---config
|   |   |   |   |   *.json -->[title]
|   |   |   |---lang
|   |   |   |   |---eng
|   |   |   |   |   |---audio
|   |   |   |   |   |   |---phonetic
|   |   |   |   |   |   |   |   *.ogg
|   |   |   |   |   |   |---words
|   |   |   |   |   |   |   |   *.mp3
|   |   |   |   |   |   |   |   *.ogg
|   |   |   |   |   |---help
|   |   |   |   |   |   |   |   *.ogg
|   |   |   |   |   |   |   |   *.wav
|   |   |   |   |   |   |   |   *.webm
|   |   |   |   |   |---sounds
|   |   |   |   |   |   |   |   *.m4a
|   |   |   |   |   |   |   |   *.ogg
|   |   |   |   |   |   |   |   *.wav
|   |   |   |   |   |   *.csv
|   |   |   |   |   |   *.json
|   |   |   |---story
|   |   |   |   |---eng
|   |   |   |   |   |---|*
|   |   |   |   |   |   |   *.mp3
|   |   |   |   |   |   |   *.ogg
|   |   |   |   |   |   *.json
|   |---scripts
|   |   |   GameNamesInSwahili.xlsx
|   |   |   questions.csv
|   |   |   questions_with_swahili_edited.csv
|   |---src
|   |   |---maths
|   |   |   |   Dots.js
|   |   |---mini_games
|   |   |   |---|alphamom
|   |   |   |   |   LevelScene.js
|   |   |   |---|jump
|   |   |   |   |   menu.js
```
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
