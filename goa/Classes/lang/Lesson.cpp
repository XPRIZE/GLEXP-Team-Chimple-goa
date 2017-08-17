//
//  Lesson.cpp
//  goa
//
//  Created by Srikanth Talapadi on 31/07/17.
//
//

#include "Lesson.h"

using namespace std;

static const vector<string> allLowerStrings = {
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
};

static const vector<string> allUpperStrings = {
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
};

static const int MAX_CONCEPTS = 100;
static const int MAX_COMPLEXITY = 9;
static const int MIN_COMPLEXITY = 0;

vector<Lesson::MultiChoice> Lesson::getMultiChoices(int lessons, int choices) {
    vector<Lesson::MultiChoice> vmc;
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
    return vmc;
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
