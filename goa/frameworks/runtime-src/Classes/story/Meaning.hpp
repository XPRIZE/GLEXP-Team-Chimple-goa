//
//  Meaning.hpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#ifndef Meaning_hpp
#define Meaning_hpp

#include "QuestionHandler.h"
#include "cocos2d.h"
#include "ui/CocosGUI.h"

class Meaning: public cocos2d::Node {
public:
    static Meaning *create(QuestionHandler* qHandler, std::vector<std::string> questions);
    void onEnterTransitionDidFinish() override;
    virtual void buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
CC_CONSTRUCTOR_ACCESS:
    Meaning();
    virtual ~Meaning();
    virtual bool init() override;
    virtual bool initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions);
    
protected:
    std::vector<std::string> _questions;
    QuestionHandler* _qHandler;
    cocos2d::ui::Button* _button1;
    cocos2d::ui::Button* _button2;
    int _numSolved;
    virtual void adjustButtons();
};

#endif /* Meaning_hpp */


