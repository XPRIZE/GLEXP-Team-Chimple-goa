//
//  FillInTheBlanks.hpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#ifndef FillInTheBlanks_hpp
#define FillInTheBlanks_hpp

#include "MultipleChoice.hpp"

class FillInTheBlanks: public MultipleChoice {
public:
    static FillInTheBlanks *create(QuestionHandler* qHandler, std::vector<std::string> questions);
    void onEnterTransitionDidFinish() override;
    void onExitTransitionDidStart() override;
    virtual void buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) override;
    
CC_CONSTRUCTOR_ACCESS:
    FillInTheBlanks();
    virtual ~FillInTheBlanks();
    virtual bool initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) override;
    cocos2d::ui::Button* _soundButton;
    
};


#endif /* FillInTheBlanks_hpp */
