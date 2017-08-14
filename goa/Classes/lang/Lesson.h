//
//  Lesson.hpp
//  goa
//
//  Created by Srikanth Talapadi on 31/07/17.
//
//

#ifndef Lesson_h
#define Lesson_h

#include "cocos2d.h"
#include <stdio.h>
using namespace std;
USING_NS_CC;

class Lesson
{
public:
    enum class CONCEPT {
        LETTER = 1,
        LETTER_CASE_EQUATE = 2,
        LETTER_ORDER = 3,
        LETTER_SOUND = 4,
        LETTER_PHONIC = 5,
        LETTER_TYPE = 6,
        LETTER_WRITING = 7,
        SYLLABLE_SOUND = 8,
        WORD_BEGINNING = 9,
        WORD_SPELLING = 10,
        WORD_SOUND = 11,
        WORD_SPLIT_INTO_SYLLABLES = 12,
        WORD_WIRITING = 13,
        SENTENCE_SPLIT_INTO_WORDS = 14
    };
    
    typedef struct _MultiChoice
    {
        std::string help;
        std::string question;
        std::vector<std::string> answers;
        int correctAnswer;
    } MultiChoice;

    std::vector<MultiChoice> getMultiChoices(int lessons = 1, int choices = 4);
    
    typedef struct _Bag
    {
        std::string help;
        std::string answerString;
        std::vector<std::string> answers;
        std::vector<std::string> otherChoices;
    } Bag;
    
    std::vector<Bag> getBag(int lessons = 1, int minAnswers = 1, int maxAnswers = 4,
                            int minChoices = 3, int maxChoices = 6,
                            bool order = true);
    
    void setSessionId(int sessionId);
    int getSessionId();
    
    void setComplexity(int complexity);
    int getComplexity();
    
    void setConcept(CONCEPT concept);
    void setComplexityAndConcept(int cc);
    CONCEPT getConcept();

CC_CONSTRUCTOR_ACCESS:
    Lesson();
    virtual ~Lesson();
    
protected:
    int _sessionId;
    int _complexity;
    CONCEPT _concept;
};

#endif /* Lesson_h */
