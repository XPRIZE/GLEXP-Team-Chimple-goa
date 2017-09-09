//
//  Lesson.cpp
//  goa
//
//  Created by Srikanth Talapadi on 31/07/17.
//
//

#include "Lesson.h"
#include "../menu/MenuContext.h"

using namespace std;

static const vector<string> allLowerStrings = {
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
};

static const vector<string> allUpperStrings = {
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
};

static const vector<string> allWords = {
    "Apple",
    "Baby",
    "Cat",
    "Dalmatian",
    "Elephant",
    "Firebird"
};

static const int MAX_CONCEPTS = 100;
static const int MAX_COMPLEXITY = 9;
static const int MIN_COMPLEXITY = 0;

vector<Lesson::MultiChoice> Lesson::getMultiChoices(int lessons, int choices, int answerFormat, int choiceFormat) {
    vector<Lesson::MultiChoice> vmc;
#if (CC_TARGET_PLATFORM != CC_PLATFORM_ANDROID)
    vmc.reserve(lessons);
    for (int i = 0; i < lessons; i++) {
        Lesson::MultiChoice mc;
        mc.help = "Select the same letter";
        mc.question = allUpperStrings[i % allUpperStrings.size()];
        mc.correctAnswer = 0;
        vector<string> answers;
        answers.reserve(choices + 1);
        for (int j = 0; j < choices + 1; j++) {
            if(_concept == CONCEPT::LETTER) {
                answers.insert(answers.begin() + j, allUpperStrings[(i + j) % allUpperStrings.size()]);
            } else if(_concept == CONCEPT::LETTER_CASE_EQUATE) {
                answers.insert(answers.begin() + j, allLowerStrings[(i + j) % allLowerStrings.size()]);
            }
        }
        mc.answers = answers;
        vmc.insert(vmc.begin() + i, mc);
    }
    string* sendArray = new string[lessons * (choices + 1 + 3) + 2];
    int i = 0;
    sendArray[i++] = MenuContext::to_string(lessons);
    sendArray[i++] = MenuContext::to_string(choices);
    for (int j = 0; j < lessons; j++) {
        sendArray[i++] = "Select the same letter";
        sendArray[i++] = allUpperStrings[i % allUpperStrings.size()];
        sendArray[i++] = "0";
        
        for (int k = 0; k < choices + 1; k++) {
            sendArray[i++] = allWords[(i + k) % allWords.size()];
        }
    }
    Director::getInstance()->getEventDispatcher()->dispatchCustomEvent("multipleChoiceQuiz", static_cast<void*>(sendArray));
    
//    if(multiChoiceReadyCallback) {
//        multiChoiceReadyCallback(vmc);
    
//    }
#else
    CCLOG("getMultiChoices");
    cocos2d::JniMethodInfo methodInfo;
    if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/cpp/AppActivity", "queryMultipleChoiceQuiz", "(IIII)V")) {
    }
    CCLOG("calling getMultiChoices");
    methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID, lessons, choices, answerFormat, choiceFormat);
    methodInfo.env->DeleteLocalRef(methodInfo.classID);
#endif
    return vmc;
}

void Lesson::onReceivedMultipleChoiceQuiz(cocos2d::EventCustom *eventCustom) {
    std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
    CCLOG("onMultipleChoiceQuiz %s", buf[0].c_str());
    CCLOG("onMultipleChoiceQuiz %s", buf[1].c_str());
    CCLOG("onMultipleChoiceQuiz %s", buf[2].c_str());
    if(multiChoiceReadyCallback) {
        vector<Lesson::MultiChoice> vmc;
        Lesson::MultiChoice mc;
        mc.help = buf[0];
        mc.question = buf[1];
        mc.correctAnswer = 0;
        vector<string> answers;
        answers.reserve(10);
        for (int i = 0; i < 10; i++) {
            answers.insert(answers.begin() + i, buf[2]);
        }
        mc.answers = answers;
        vmc.insert(vmc.begin() + 0, mc);

        Lesson::MultiChoice mc1;
        mc1.help = buf[0];
        mc1.question = buf[1];
        mc1.correctAnswer = 0;
        vector<string> answers1;
        answers1.reserve(10);
        for (int i = 0; i < 10; i++) {
            answers1.insert(answers1.begin() + i, buf[2]);
        }
        mc1.answers = answers1;
        vmc.insert(vmc.begin() + 1, mc1);

        multiChoiceReadyCallback(vmc);
    }

}

vector<Lesson::MultiChoice> Lesson::unmarshallMultiChoices(std::string* strArray) {
    vector<Lesson::MultiChoice> vmc;
    int k = 0;
    int numQuizes = atoi(strArray[k++].c_str());
    int numChoices = atoi(strArray[k++].c_str());
    for (int i = 0; i < numQuizes; i++) {
        Lesson::MultiChoice mc;
        mc.help = strArray[k++];
        mc.question = strArray[k++];
        mc.correctAnswer = atoi(strArray[k++].c_str());
        vector<string> answers;
        answers.reserve(numChoices + 1);
        for (int j = 0; j < numChoices + 1; j++) {
            answers.insert(answers.begin() + j, strArray[k++]);
        }
        mc.answers = answers;
        vmc.insert(vmc.begin() + i, mc);
    }
    return vmc;
}

vector<Lesson::Bag> Lesson::unmarshallBag(std::string* strArray) {
    vector<Lesson::Bag> vbag;
    int k = 0;
    int numQuizes = atoi(strArray[k++].c_str());
    for (int i = 0; i < numQuizes; i++) {
        Lesson::Bag bag;
        bag.help = strArray[k++];
        bag.answerString = strArray[k++];
        int numAnswers = atoi(strArray[k++].c_str());
        int numChoices = atoi(strArray[k++].c_str());
        vector<string> answers;
        answers.reserve(numAnswers);
        for (int j = 0; j < numAnswers; j++) {
            answers.insert(answers.begin() + j, strArray[k++]);
        }
        bag.answers = answers;

        vector<string> choices;
        answers.reserve(numChoices);
        for (int j = 0; j < numChoices; j++) {
            choices.insert(choices.begin() + j, strArray[k++]);
        }
        bag.otherChoices = choices;

        vbag.insert(vbag.begin() + i, bag);
    }
    return vbag;
}


static const vector<vector<string>> wordsByLength = {
    {"N","O","N","E"},
    {"A"},
    {"I","T"},
    {"CA","AA","TA"},
    {"M","I","N","T"},
    {"A","P","P","L","E"},
    {"O","R","A","N","G","E"},
    {"G","I","R","A","F","F","E"},
    {"B","R","O","C","C","O","L","I"},
    {"S","U","M","M","A","R","I","Z","E"},
    {"M","A","D","A","G","A","S","C","A","R"}
};

vector<Lesson::Bag> Lesson::getBag(int lessons, int minAnswers, int maxAnswers,
                                   int minChoices, int maxChoices,
                                   bool order) {
vector<Lesson::Bag> vb;
#if (CC_TARGET_PLATFORM != CC_PLATFORM_ANDROID)
    vb.reserve(lessons);
    for (int i = 0; i < lessons; i++) {
        Lesson::Bag b;
        switch (_concept) {
            case CONCEPT::LETTER:
            {
                b.help = "Select the letter";
                b.answerString = allUpperStrings[i % allUpperStrings.size()];
                vector<string> answers;
                answers.reserve(minAnswers);
                for (int j = 0; j < minAnswers; j++) {
                    answers.insert(answers.begin() + j, b.answerString);
                }
                b.answers = answers;
                vector<string> choices;
                choices.reserve(minChoices);
                for (int j = 0; j < minChoices - minAnswers; j++) {
                    choices.insert(choices.begin() + j, allUpperStrings[(i + j + 1) % allUpperStrings.size()]);
                }
                b.otherChoices = choices;
                break;
            }
            case CONCEPT::LETTER_CASE_EQUATE:
            {
                b.help = "Select the lower case letter";
                b.answerString = allUpperStrings[i % allUpperStrings.size()];
                vector<string> answers;
                answers.reserve(minAnswers);
                for (int j = 0; j < minAnswers; j++) {
                    answers.insert(answers.begin() + j, allLowerStrings[i % allLowerStrings.size()]);
                }
                b.answers = answers;
                vector<string> choices;
                choices.reserve(minChoices);
                for (int j = 0; j < minChoices - minAnswers; j++) {
                    choices.insert(choices.begin() + j, allLowerStrings[(i + j + 1) % allLowerStrings.size()]);
                }
                b.otherChoices = choices;
                break;
            }
            case CONCEPT::LETTER_ORDER:
            {
                b.help = "Arrange in order";
                vector<string> answers;
                answers.reserve(minAnswers);
                for (int j = 0; j < minAnswers; j++) {
                    answers.insert(answers.begin() + j, allLowerStrings[i + j % allLowerStrings.size()]);
                }
                b.answers = answers;
                ostringstream imploded;
                copy(b.answers.begin(), b.answers.end(),
                     ostream_iterator<string>(imploded));
                b.answerString = imploded.str();
                vector<string> choices;
                choices.reserve(minChoices);
                for (int j = 0; j < minChoices - minAnswers; j++) {
                    choices.insert(choices.begin() + j, allLowerStrings[(i + j + minAnswers) % allLowerStrings.size()]);
                }
                b.otherChoices = choices;
                break;
            }
            case CONCEPT::WORD_SPELLING:
            {
                b.help = "Make the word";
                b.answers = wordsByLength[minAnswers];
                ostringstream imploded;
                copy(b.answers.begin(), b.answers.end(),
                     ostream_iterator<string>(imploded));
                b.answerString = imploded.str();
                vector<string> otherChoices;
                otherChoices.reserve(minChoices);
                for (int j = 0; j < minChoices; j++) {
                    otherChoices.insert(otherChoices.begin() + j, allUpperStrings[(i + j) % allUpperStrings.size()]);
                }
                b.otherChoices = otherChoices;

            }
            default:
                break;
        }

        
        vb.insert(vb.begin() + i, b);
    }
    
    string* sendArray = new string[lessons * (maxChoices + 4) + 1];
    int i = 0;
    sendArray[i++] = MenuContext::to_string(lessons);
    for (int j = 0; j < lessons; j++) {
        sendArray[i++] = "Arrange the word";
        auto wordAnswer = wordsByLength[maxAnswers];
        ostringstream imploded;
        copy(wordAnswer.begin(), wordAnswer.end(),
             ostream_iterator<string>(imploded));
        sendArray[i++] = imploded.str();
        sendArray[i++] = MenuContext::to_string(maxAnswers);
        sendArray[i++] = MenuContext::to_string(maxChoices - maxAnswers);
        for(int k = 0; k < maxAnswers; k++) {
            sendArray[i++] = wordAnswer[k];
        }
        for (int k = 0; k < maxChoices - maxAnswers; k++) {
            sendArray[i++] = allUpperStrings[(j + k) % allUpperStrings.size()];
        }
    }
    Director::getInstance()->getEventDispatcher()->dispatchCustomEvent("bagOfChoiceQuiz", static_cast<void*>(sendArray));
    
#else
    CCLOG("bagOfChoiceQuiz");
    cocos2d::JniMethodInfo methodInfo;
    if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/cpp/AppActivity", "queryBagOfChoiceQuiz", "(IIIIII)V")) {
    }
    CCLOG("calling bagOfChoiceQuiz");
    methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID, lessons, minAnswers, maxAnswers, minChoices, maxChoices, 1);
    methodInfo.env->DeleteLocalRef(methodInfo.classID);
#endif
    return vb;
};

void Lesson::setSessionId(int sessionId) {
    _sessionId = sessionId;
}

int Lesson::getSessionId() {
    return _sessionId;
}

void Lesson::setComplexity(int complexity) {
    _complexity = min(MAX_COMPLEXITY, max(MIN_COMPLEXITY, complexity));
}

int Lesson::getComplexity() {
    return _complexity;
}

void Lesson::setConcept(CONCEPT concept) {
    _concept = concept;
}

void Lesson::setComplexityAndConcept(int cc) {
    setComplexity(cc / MAX_CONCEPTS);
    int concept = cc % MAX_CONCEPTS;
    switch (concept) {
        case 1:
            _concept = Lesson::CONCEPT::LETTER;
            break;
        case 2:
            _concept = Lesson::CONCEPT::LETTER_CASE_EQUATE;
            break;
        case 3:
            _concept = Lesson::CONCEPT::LETTER_ORDER;
            break;
        case 4:
            _concept = Lesson::CONCEPT::LETTER_SOUND;
            break;
        case 5:
            _concept = Lesson::CONCEPT::LETTER_PHONIC;
            break;
        case 6:
            _concept = Lesson::CONCEPT::LETTER_TYPE;
            break;
        case 7:
            _concept = Lesson::CONCEPT::LETTER_WRITING;
            break;
        case 8:
            _concept = Lesson::CONCEPT::SYLLABLE_SOUND;
            break;
        case 9:
            _concept = Lesson::CONCEPT::WORD_BEGINNING;
            break;
        case 10:
            _concept = Lesson::CONCEPT::WORD_SPELLING;
            break;
        case 11:
            _concept = Lesson::CONCEPT::WORD_SOUND;
            break;
        case 12:
            _concept = Lesson::CONCEPT::WORD_SPLIT_INTO_SYLLABLES;
            break;
        case 13:
            _concept = Lesson::CONCEPT::WORD_WIRITING;
            break;
        case 14:
            _concept = Lesson::CONCEPT::SENTENCE_SPLIT_INTO_WORDS;
            break;
        default:
            _concept = Lesson::CONCEPT::LETTER;
            break;
    }
}

Lesson::CONCEPT Lesson::getConcept() {
    return _concept;
}


Lesson::Lesson() :
_concept(Lesson::CONCEPT::LETTER),
_sessionId(1),
_complexity(0)
{
}

Lesson::~Lesson() {
    
}
