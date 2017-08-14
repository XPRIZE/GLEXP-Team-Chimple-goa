//
//  StudySession.h
//  goa
//
//  Created by Srikanth Talapadi on 11/08/17.
//
//

#ifndef StudySession_h
#define StudySession_h

#include "Lesson.h"

using namespace std;

class StudySession
{
public:
    StudySession();
    virtual ~StudySession();
    void setLesson(Lesson* lesson);
    Lesson* getLesson();
    static const vector<Lesson::CONCEPT> CONCEPT_CAPABILITIES;
    
protected:
    Lesson* _lesson;
};

#endif /* StudySession_h */
