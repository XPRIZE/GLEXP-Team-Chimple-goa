
Note : One needs to replace the currently available font with a font that supports local language and update the corresponding code files accordingly.
     Item.cpp
	 ATM.cpp
	 Calculator.cpp
	 Table.cpp
	 LangUtil.cpp
	 UIRichText.cpp
	 Door.cpp
	 TreasureHunt.cpp
	 Units.cpp
	 QuestionHandler.cpp
	 Bubble_Numbers.js
	 Bubble_Puzzle.js
 

------------goa
				classes
					lang
						LangUtil.cpp --> [_instance = new EnglishUtil();]
						Lesson.cpp
						TextGenerator.cpp 
					menu
						Setting.cpp
					mini_games
						AlphaArrange.cpp
						AlphabetWriting.cpp
						AlphamonFeedLevelScene.cpp
						BajaWordScene.cpp
						BlastLetter.cpp
						Decomon.cpp
						DinoGame.cpp
						Order.cpp
						Owl.h
						SmashTheRockLevelScene.cpp
						TraceScene.cpp
						TreasureHunt.cpp
						Wembley.cpp
					misc
						ChooseCharacter.hpp - to be checked
					puzzle
						Alphabet.cpp
						Grapheme.cpp
						GraphemeGrid.cpp - to be checked
					sqlite3
						Sqlite3Helper.cpp
				res
					story
						eng
							*.json
				Resources
					res
						config
							*.json -->[title]
						lang
							eng
								audio
									*.ogg
									*.csv
									*.mp3
								help
									*.webm
								sounds
									*.m4a, *.ogg and *.wav
							*.csv
							eng.po
						story
							eng
								*.json
				scripts
					GameNamesInSwahili.xlsx
				src
					maths
						Dots.js
					mini_games
						alphamon
							LevelScene.js
						jump
							menu.js

