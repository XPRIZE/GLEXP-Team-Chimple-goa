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
    typedef struct _MultiChoice
    {
        std::string help;
        std::string question;
        std::vector<std::string> answers;
        int correctAnswer;
    } MultiChoice;

    std::vector<MultiChoice> getMultiChoices(int lessons = 1, int choices = 4);
    
    float getComplexity();

CC_CONSTRUCTOR_ACCESS:
    Lesson(int sessionId, float complexity);
    virtual ~Lesson();
    
protected:
    int _sessionId;
    float _complexity;
};

#endif /* Lesson_h */
