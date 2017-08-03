//
//  Lesson.hpp
//  goa
//
//  Created by Srikanth Talapadi on 31/07/17.
//
//

#ifndef Lesson_h
#define Lesson_h

#include <stdio.h>

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

CC_CONSTRUCTOR_ACCESS:
    Lesson(int sessionId);
    virtual ~Lesson();
    
protected:
    int _sessionId;
};

#endif /* Lesson_h */
