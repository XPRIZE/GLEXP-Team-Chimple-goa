//
//  MultipleChoice.hpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#ifndef MultipleChoice_hpp
#define MultipleChoice_hpp

#include "QuestionHandler.h"
#include "cocos2d.h"
#include "ui/CocosGUI.h"

class MultipleChoice: public cocos2d::Node {
public:
    static MultipleChoice *create(QuestionHandler* qHandler, std::vector<std::string> questions);
    void onEnterTransitionDidFinish() override;
    virtual void buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
CC_CONSTRUCTOR_ACCESS:
    MultipleChoice();
    virtual ~MultipleChoice();
    virtual bool init() override;
    virtual bool initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions);
    
protected:
    std::vector<std::string> _questions;
    QuestionHandler* _qHandler;
};

#endif /* MultipleChoice_hpp */
