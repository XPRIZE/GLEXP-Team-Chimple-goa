//
//  TextGenerator.cpp
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#include "TextGenerator.h"
#include "LangUtil.h"
#include "../ext/utf8.h"

static TextGenerator* _singletonTextGenerator = nullptr;

TextGenerator* TextGenerator::getInstance() {
    if(!_singletonTextGenerator)
    {
        _singletonTextGenerator = new (std::nothrow) TextGenerator();
    }
    return _singletonTextGenerator;

}


std::vector<std::vector<std::string>> TextGenerator::generateMatrix(std::string word, int numRows, int numCols) {
    auto allChars = getAllChars();
    auto wordVec = getGraphemes(word);
    int wordLength = wordVec.size();
    int matrixLength = numRows * numCols;
    auto locChars = getRandomLocations(wordLength, matrixLength);
    std::vector<std::vector<std::string>> matrix(numRows, std::vector<std::string>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int numElement = numCols * i + j;
            auto iter = locChars.find(numElement);
            if(iter != locChars.end()) {
                matrix[i][j] = wordVec.at(iter->second);
            } else {
                matrix[i][j] = allChars[rand() % LangUtil::getInstance()->getNumberOfCharacters()];
            }
        }
    }
    return matrix;
}

std::map<int, int> TextGenerator::getRandomLocations(int numLoc, int totalNum) {
    std::map<int, int> locChars;
    if(numLoc > totalNum) {
        return locChars;
    }
    for (int i = 0; i < numLoc; i++) {
        auto randLoc = rand() % totalNum;
        for (auto iter = locChars.find(randLoc); iter != locChars.end(); iter = locChars.find(++randLoc % totalNum)) { }
        
        locChars.insert(std::pair<int,int>(randLoc % totalNum, i));
    }
    return locChars;
}

std::string TextGenerator::generateAWord(int level, int length) {
    level = MIN(level, 10);
    return getSingle("words", level);
}

std::string TextGenerator::generateASentence(int level) {
    level = MIN(level, 10);
    return getSingle("sentences", level);
}


int TextGenerator::getNumGraphemesInString(std::string word) {
    return getGraphemes(word).size();
}

std::vector<std::string> TextGenerator::getGraphemes(std::string word) {
    std::string::iterator end_pos = std::remove(word.begin(), word.end(), ' ');
    word.erase(end_pos, word.end());
    
    std::vector<std::string> graphemes;
    auto wordChar = word.c_str();
    auto end = wordChar + word.length();
    auto graphemeBegin = wordChar;
    uint32_t prevCodePoint = 0;
    while(wordChar != end) {
        auto cp = utf8::peek_next(wordChar, end);
        if(prevCodePoint && LangUtil::getInstance()->isGraphemeStart(prevCodePoint, cp)) {
            auto str = std::string(graphemeBegin, wordChar);
            graphemes.push_back(str);
            graphemeBegin = wordChar;
        }
        prevCodePoint = utf8::next(wordChar, end);
    }
    auto str = std::string(graphemeBegin, wordChar);
    graphemes.push_back(str);
    return graphemes;
}

std::vector<std::string> TextGenerator::getAllChars() {
    int numChar = LangUtil::getInstance()->getNumberOfCharacters();
    auto allChars = LangUtil::getInstance()->getAllCharacters();
    std::vector<std::string> allCharVector;
    allCharVector.clear();
    for (int i = 0; i < numChar; i++) {
        auto charString = LangUtil::getInstance()->convertUTF16CharToString(allChars[i]);
        allCharVector.push_back(charString);
    }
    return allCharVector;
}

std::vector<std::string> TextGenerator::getValidCombinations(std::string chars, int maxLength) {
    const char* args[] = {"one", "two", "three", "four"};
    std::vector<std::string> v(args, args + 4);
    return v;
}

std::map<std::string, std::string> TextGenerator::getSynonyms(int maxNum, int level) {
    level = MIN(level, 10);
    return getPairs("synonyms", maxNum, level);
}

std::map<std::string, std::string> TextGenerator::getAntonyms(int maxNum, int level) {
    level = MIN(level, 10);
    return getPairs("antonyms", maxNum, level);
}

std::map<std::string, std::string> TextGenerator::getHomonyms(int maxNum, int level) {
    level = MIN(level, 10);
    return getPairs("homonyms", maxNum, level);
}

std::map<std::string, std::string> TextGenerator::getSingularPlurals(int maxNum, int level) {
    level = MIN(level, 10);
    return getPairs("plurals", maxNum, level);
}

std::map<std::string, std::string> TextGenerator::getPairs(std::string type, int maxNum, int level) {
    std::string contents = cocos2d::FileUtils::getInstance()->getStringFromFile(LangUtil::getInstance()->getDir() + "/" + type + ".csv");
    std::vector<std::pair<std::string, std::string>> pairs;
    std::stringstream ss;
    ss.str(contents);
    std::string line;
    while (std::getline(ss, line)) {
    if ( line.size() && line[line.size()-1] == '\r' ) {
        line = line.substr( 0, line.size() - 1 );
    }
        std::stringstream sline;
        sline.str(line);
        std::string item;
        std::vector<std::string> elems;
        while (std::getline(sline, item, ';')) {
            elems.push_back(item);
        }
        if(atoi(elems[0].c_str()) == level) {
            pairs.push_back(std::pair<std::string, std::string>(elems[1], elems[2]));
        }
    }

    std::map<std::string, std::string> data;
    for(int i = 0; i < maxNum; i++) {
        int rIndex = rand() % pairs.size();
        auto pair = pairs[rIndex];
        pairs.erase(pairs.begin() + rIndex);
        data.insert(pair);
    }
    
    return data;
}

std::vector<std::string> TextGenerator::getWordList(std::string type, int level) {
    std::string contents = cocos2d::FileUtils::getInstance()->getStringFromFile(LangUtil::getInstance()->getDir() + "/" + type + ".csv");
    std::vector<std::string> pairs;
    std::stringstream ss;
    ss.str(contents);
    std::string line;
    while (std::getline(ss, line)) {
        if ( line.size() && line[line.size()-1] == '\r' ) {
            line = line.substr( 0, line.size() - 1 );
        }
        std::stringstream sline;
        sline.str(line);
        std::string item;
        std::vector<std::string> elems;
        while (std::getline(sline, item, ';')) {
            elems.push_back(item);
        }
        if(atoi(elems[0].c_str()) == level) {
            pairs.push_back(elems[1]);
        }
    }
    
    return pairs;
}

std::string TextGenerator::getSingle(std::string type, int level) {
    std::string contents = cocos2d::FileUtils::getInstance()->getStringFromFile(LangUtil::getInstance()->getDir() + "/" + type + ".csv");
    std::vector<std::string> pairs;
    std::stringstream ss;
    ss.str(contents);
    std::string line;
    while (std::getline(ss, line)) {
        if ( line.size() && line[line.size()-1] == '\r' ) {
            line = line.substr( 0, line.size() - 1 );
        }
        std::stringstream sline;
        sline.str(line);
        std::string item;
        std::vector<std::string> elems;
        while (std::getline(sline, item, ';')) {
            elems.push_back(item);
        }
        if(atoi(elems[0].c_str()) == level) {
            pairs.push_back(elems[1]);
        }
    }
    
    int rIndex = rand() % pairs.size();
    return pairs[rIndex];
}



std::map<std::string, std::map<std::string, std::string>> TextGenerator::getMapOfWords(std::string type, int maxNum, int maxChoices, int level) {
    std::string contents = cocos2d::FileUtils::getInstance()->getStringFromFile(LangUtil::getInstance()->getDir() + "/" + type + ".csv");
    std::map<std::string, std::vector<std::string>> pairMap;
    std::vector<std::string> keys;
    std::stringstream ss;
    ss.str(contents);
    std::string line;
    while (std::getline(ss, line)) {
        if ( line.size() && line[line.size()-1] == '\r' ) {
            line = line.substr( 0, line.size() - 1 );
        }
        std::stringstream sline;
        sline.str(line);
        std::string item;
        std::vector<std::string> elems;
        while (std::getline(sline, item, ';')) {
            elems.push_back(item);
        }
        if(atoi(elems[0].c_str()) == level) {
            pairMap[elems[1]].push_back(elems[2]);
            auto valueVector = pairMap[elems[1]];
            if(valueVector.size() == 1) {
                keys.push_back(elems[1]);
            }
        }
    }
    
    std::vector<std::vector<std::string>> pairs;
    std::map<std::string, std::map<std::string, std::string>> data;
    for(int i = 0; i < maxNum; i++) {
        int rIndex = rand() % keys.size();
        auto key = keys[rIndex];
        auto choices = pairMap[key];
        keys.erase(keys.begin() + rIndex);
        std::map<std::string, std::string> newChoices;
        for(int j = 0; j < maxChoices; j++) {
            int rx = rand() % choices.size();
            auto choice = choices[rx];
            choices.erase(choices.begin() + rx);
            newChoices[choice] = "dummy";
        }
        data[key] = newChoices;
    }
    return data;
}

std::map<std::string, std::map<std::string, std::string>> TextGenerator::getInitialSyllableWords(int maxNum, int maxChoices, int level) {
    level = MIN(level, 3);
    return getMapOfWords("initial_syllables", maxNum, maxChoices, level);
}

std::vector<std::string> TextGenerator::getWords(TextGenerator::P_O_S partOfSpeech, int maxLength, int level) {
    level = MIN(level, 10);
    std::string pos = "";
    switch( partOfSpeech ) {
        case TextGenerator::P_O_S::NOUN:
            pos = "NOUN";
            break;
        case TextGenerator::P_O_S::VERB:
            pos = "VERB";
            break;
        case TextGenerator::P_O_S::ADJECTIVE:
            pos = "ADJ";
            break;
        case TextGenerator::P_O_S::PRONOUN:
            pos = "PRON";
            break;
        case TextGenerator::P_O_S::ADVERB:
            pos = "ADV";
            break;
        case TextGenerator::P_O_S::PREPOSITION:
            pos = "ADP";
            break;
        case TextGenerator::P_O_S::CONJUNCTION:
            pos = "CONJ";
            break;
        case TextGenerator::P_O_S::INTERJECTION:
            pos = "INT";
            break;
        case TextGenerator::P_O_S::ARTICLE:
            pos = "DET";
            break;
    }
    std::string contents = cocos2d::FileUtils::getInstance()->getStringFromFile(LangUtil::getInstance()->getDir() + "/pos.csv");
    std::vector<std::string> words;
    std::stringstream ss;
    ss.str(contents);
    std::string line;
    while (std::getline(ss, line)) {
        if ( line.size() && line[line.size()-1] == '\r' ) {
            line = line.substr( 0, line.size() - 1 );
        }
        std::stringstream sline;
        sline.str(line);
        std::string item;
        std::vector<std::string> elems;
        while (std::getline(sline, item, ';')) {
            elems.push_back(item);
        }
        if(atoi(elems[0].c_str()) == level && (pos.empty() || pos == elems[1])) {
            words.push_back(elems[2]);
        }
    }
    
    std::vector<std::string> data;
    for(int i = 0; i < maxLength; i++) {
        int rIndex = rand() % words.size();
        auto word = words[rIndex];
        words.erase(words.begin() + rIndex);
        data.push_back(word);
    }
    
    return data;
}

std::vector<std::string> TextGenerator::getOrderedConcepts(int level) {
	std::map<int, std::vector<std::string>> orderedMap;
	if (LangUtil::getInstance()->getLang() == "eng") {
		orderedMap = {

			{ 1,
			{ "A","B","C","D","E","F","G","H","I","J" }
			},
			{ 2,
			{ "K","L","M","N","O","P","Q","R","S","T" }
			},
			{ 3,
			{ "Q","R","S","T","U","V","W","X","Y","Z" }
			},
			{ 4,
			{ "A == a","B == b","C == c","D == d","E == e","F == f","G == g","H == h","I == i","J == j" }
			},
			{ 5,
			{ "K == k","L == l","M == m","N == n","O == o","P == p","Q == q","R == r","S == s","T == t" }
			},
			{ 6,
			{ "Q == q","R == r","S == s","T == t","U == u","V == v","W == w","X == x","Y == y","Z == z" }
			},
			{ 7,
			{ "1","2","3","4","5","6","7","8","9" }
			},
			{ 8,
			{ "1","3","5","7","9" }
			},
			{ 9,
			{ "2","4","6","8" }
			},
			{ 10,
			{ "1","2","3","5","6","7","9" }
			},
			{ 11,
			{ "2","3","4","6","7","9" }
			},
			{ 12,
			{ "0","1","2","3","4","5","6","7","8","9" }
			},
			{ 13,
			{ "11","12","13","14","15","16","17","18","19","20" }
			},
			{ 14,
			{ "50","100","150","200","250","300","350","400","450","500" }
			},
			{ 15,
			{ "550","600","650","700","750","800","850","900","950","1000" }
			},
			{ 16,
			{ "10","20","30","40","50","60","70","80","90","100" }
			},
			{ 17,
			{ "100","200","300","400","500","600","700","800","900","1000" }
			},
			{ 18,
			{ "1","57","100","145","219","300","389","450","666","963", "999","1010" }
			},
			{ 19,
			{ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" }
			},
			{ 20,
			{ "January", "February","March","April","May","June","July","August","September","October","November","December" }
			},
		};
	}
	else if (LangUtil::getInstance()->getLang() == "swa") {
		orderedMap = {

			{ 1,
			{ "A","B","C","D","E","F","G","H","I","J" }
			},
			{ 2,
			{ "K","L","M","N","O","P","R","S","T" }
			},
			{ 3,
			{ "Q","R","S","T","U","V","W","Y","Z" }
			},
			{ 4,
			{ "A == a","B == b","C == c","D == d","E == e","F == f","G == g","H == h","I == i","J == j" }
			},
			{ 5,
			{ "K == k","L == l","M == m","N == n","O == o","P == p","R == r","S == s","T == t" }
			},
			{ 6,
			{ "Q == q","R == r","S == s","T == t","U == u","V == v","W == w","Y == y","Z == z" }
			},
			{ 7,
			{ "1","2","3","4","5","6","7","8","9" }
			},
			{ 8,
			{ "1","3","5","7","9" }
			},
			{ 9,
			{ "2","4","6","8" }
			},
			{ 10,
			{ "1","2","3","5","6","7","9" }
			},
			{ 11,
			{ "2","3","4","6","7","9" }
			},
			{ 12,
			{ "0","1","2","3","4","5","6","7","8","9" }
			},
			{ 13,
			{ "11","12","13","14","15","16","17","18","19","20" }
			},
			{ 14,
			{ "50","100","150","200","250","300","350","400","450","500" }
			},
			{ 15,
			{ "550","600","650","700","750","800","850","900","950","1000" }
			},
			{ 16,
			{ "10","20","30","40","50","60","70","80","90","100" }
			},
			{ 17,
			{ "100","200","300","400","500","600","700","800","900","1000" }
			},
			{ 18,
			{ "1","57","100","145","219","300","389","450","666","963", "999","1010" }
			},
			{ 19,
			{ "Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi" }
			},
			{ 20,
			{ "Januari", "Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Desemba" }
			},
		};
	}
    return orderedMap.at(level);
}

std::vector<std::vector<std::pair<std::string, TextGenerator::P_O_S>>> TextGenerator::getSentenceWithPOS(TextGenerator::P_O_S partOfSpeech, int maxLength, int level) {
    /* minimum 10 sentences per level and 10 levels */
    level = MIN(level, 10);
    std::string pos = "";
    switch( partOfSpeech ) {
        case TextGenerator::P_O_S::NOUN:
            pos = "NOUN";
            break;
        case TextGenerator::P_O_S::VERB:
            pos = "VERB";
            break;
        case TextGenerator::P_O_S::ADJECTIVE:
            pos = "ADJ";
            break;
        case TextGenerator::P_O_S::PRONOUN:
            pos = "PRON";
            break;
        case TextGenerator::P_O_S::ADVERB:
            pos = "ADV";
            break;
        case TextGenerator::P_O_S::PREPOSITION:
            pos = "ADP";
            break;
        case TextGenerator::P_O_S::CONJUNCTION:
            pos = "CONJ";
            break;
        case TextGenerator::P_O_S::INTERJECTION:
            pos = "INT";
            break;
        case TextGenerator::P_O_S::ARTICLE:
            pos = "DET";
            break;
    }
    std::string contents = cocos2d::FileUtils::getInstance()->getStringFromFile(LangUtil::getInstance()->getDir() + "/sentences_pos.csv");
    std::vector<std::vector<std::pair<std::string, TextGenerator::P_O_S>>> Sentences;
    std::vector<std::string> words;
    std::stringstream ss;
    ss.str(contents);
    std::string line;
    while (std::getline(ss, line)) {
        if ( line.size() && line[line.size()-1] == '\r' ) {
            line = line.substr( 0, line.size() - 1 );
        }
        std::stringstream sline;
        sline.str(line);
        std::string item;
        std::vector<std::string> elems;
        while (std::getline(sline, item, ';')) {
            elems.push_back(item);
        }
        if(atoi(elems[0].c_str()) == level) {
            bool foundPos = false;
            if(!pos.empty()) {
                for (auto it=elems.begin() + 1; it!=elems.end(); ++it) {
                    if(pos == *it) {
                        foundPos = true;
                        break;
                    }
                }
            }
            if(pos.empty() || foundPos) {
                std::vector<std::pair<std::string, TextGenerator::P_O_S>> sentence;
                std::string word = "";
                bool odd = true;
                for (auto it=elems.begin() + 1; it!=elems.end(); ++it) {
                    if(odd) {
                        word = *it;
                        odd = false;
                    } else {
                        TextGenerator::P_O_S wordPos;
                        if("NOUN" == *it)
                            wordPos = TextGenerator::P_O_S::NOUN;
                        else if("VERB" == *it)
                            wordPos = TextGenerator::P_O_S::VERB;
                        else if("ADJ" == *it)
                            wordPos = TextGenerator::P_O_S::ADJECTIVE;
                        else if("PRON" == *it)
                            wordPos = TextGenerator::P_O_S::PRONOUN;
                        else if("ADP" == *it)
                            wordPos = TextGenerator::P_O_S::PREPOSITION;
                        else if("CONJ" == *it)
                            wordPos = TextGenerator::P_O_S::CONJUNCTION;
                        else if("INT" == *it)
                            wordPos = TextGenerator::P_O_S::INTERJECTION;
                        else if("DET" == *it)
                            wordPos = TextGenerator::P_O_S::ARTICLE;
                        else if("ADV" == *it)
                            wordPos = TextGenerator::P_O_S::ADVERB;
                        else
                            wordPos = TextGenerator::P_O_S::ANY;
                        sentence.push_back(std::make_pair(word, wordPos));
                        odd = true;
                    }
                }
                Sentences.push_back(sentence);
            }
        }
    }
    
    std::vector<std::vector<std::pair<std::string, TextGenerator::P_O_S>>> data;
    for(int i = 0; i < maxLength; i++) {
        int rIndex = rand() % Sentences.size();
        auto word = Sentences[rIndex];
        Sentences.erase(Sentences.begin() + rIndex);
        data.push_back(word);
    }
    
    return data;
}


std::string TextGenerator::getLang() {
    return LangUtil::getInstance()->getLang();
}

std::vector<std::string> TextGenerator::wordsWithGivenLetter(std::string str)
{
    auto wordList = getWordList("words", 1);
    std::vector<std::string> listOfWords;
    for (int i = 0; i < wordList.size(); i++) {
        if (wordList.at(i).find(str) == 0) {
            listOfWords.push_back(wordList.at(i));
        }
    }
    
	return listOfWords;
}


