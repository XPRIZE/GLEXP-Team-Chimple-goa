//
//  Picture.hpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#ifndef Picture_hpp
#define Picture_hpp

#include "Meaning.hpp"

class Picture: public Meaning {
public:
    static Picture *create(QuestionHandler* qHandler, std::vector<std::string> questions);
    void onEnterTransitionDidFinish() override;
    virtual void buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) override;
    
CC_CONSTRUCTOR_ACCESS:
    Picture();
    virtual ~Picture();
    virtual bool initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) override;
protected:
    virtual void adjustButtons() override;
};

#endif /* Picture_hpp */
