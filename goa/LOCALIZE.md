## Prerequisites
Install Cocos Studio for [Mac](http://cocos2d-x.org/filedown/CocosForMac-v3.10.dmg) or [Windows](http://cocos2d-x.org/filedown/CocosForWin-v3.10.exe)

This is used for creating scene assets representing the monster characters used in the game

## Creation of new language support 
- Create a new folder under Resources/res/lang/. Lets say the folder name is xyz

- Record letter pronunciation voice files for all letters in the language and save in **sounds** folder *ex a.ogg*

- Record phonetic pronunciation voice files for all letters in the language and save in **audio/phonetic** folder *ex a.ogg*

- Record word pronunciation voice files for each word according to word list in [Bali](https://github.com/XPRIZE/GLEXP-Team-Chimple-goa/blob/master/Bali/LOCALIZE.md) and save in **audio/words** folder *ex apple.ogg*

- Using Cocos Studio, create monster csb files for each letter in the alphabet and store *ex A.csb*

- Using Cocos Studio, create fruit csb file for each letter in the alphabet and store in **alphabet fruits** folder *ex A.csb*

- Generate a fnt (font) file from ttf font of the language using any convertor such as [BMGlyph](https://www.bmglyph.com) or [Glyph Designer](https://www.71squared.com/glyphdesigner) or [Hiero](https://github.com/libgdx/libgdx/wiki/Hiero)

- In `goa/Classes/hero/RPGConfig.h` add the language like this:
```
enum SupportedLanguages
{
    ENGLISH = 0,
    KANNADA = 1,
    GERMAN = 2,
    SWAHILI = 3,
    TELUGU = 4,
    XYZ = 5
};
```

- Create a new subclass of **LangUtil** in `goa/Classes/lang/XyzUtil.cpp` like `goa/Classes/lang/SwahiliUtil.cpp`. Override each method with language specific details such as number of letters in alphabet, etc

- In `goa/Classes/lang/LangUtil.cpp`:
	Add a new switch case in line 58 like this:
  ```
        case SupportedLanguages::XYZ:
        {
            LangUtil::_instance = new XyzUtil();
            Data moData = FileUtils::getInstance()->getDataFromFile("res/lang/xyz/xyz.mo");
            I18N::I18nUtils::getInstance()->removeAllMO();
            I18N::I18nUtils::getInstance()->addMO(moData.getBytes());
            break;
        }
  ```
  Also comment other languages and add this line after line 28:
  ```
  _instance = new XyzUtil();
  ```

## Translation of text

- Translate the `Resources/res/lang/eng/eng.po` file to the new language and store in `Resources/res/lang/xyz/xyz.mo`. For convenience, you can use [POEditor](https://poeditor.com/) or any other PO editing software
- Copy the folder `Resources/res/story/eng` to `Resources/res/story/xyz`
  - Translate each story by translating the 2 json files:
    - Story.json *ex Adhabu_Punishment.json*
    - Story.questions.json *ex Adhabu_Punishment.questions.json*
  - Record the voice over for each story and save in **Story** folder with prefix of page number. *For ex, Adhabu_Punishment/Adhabu_Punishment_0.ogg, Adhabu_Punishment/Adhabu_Punishment_1.ogg*



