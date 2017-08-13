//
//  StudySession.cpp
//  goa
//
//  Created by Srikanth Talapadi on 11/08/17.
//
//

#include "StudySession.h"
#include "cocos2d.h"

USING_NS_CC;

StudySession::StudySession():
_lesson(nullptr)
{
    
}

StudySession::~StudySession() {
    CC_SAFE_DELETE(_lesson);
}

void StudySession::setLesson(Lesson* lesson) {
    _lesson = lesson;
}

Lesson* StudySession::getLesson() {
    return _lesson;
}
