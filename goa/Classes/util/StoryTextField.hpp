//
//  StoryTextField.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 30/05/17.
//
//

#ifndef StoryTextField_hpp
#define StoryTextField_hpp

#include <stdio.h>
#include "cocos2d.h"
#include "ui/CocosGUI.h"

class StoryTextField : public cocos2d::ui::TextField
{
public:
    static StoryTextField *create();
    virtual void onEnterTransitionDidFinish() override;
    virtual void  onExitTransitionDidStart() override;
    void setOriginalText(std::string text);
    std::string getOriginalText();
    
CC_CONSTRUCTOR_ACCESS:
    StoryTextField();
    virtual ~StoryTextField();
    virtual bool init() override;
    bool touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    cocos2d::EventListenerTouchOneByOne *_listener;
    std::string _originalText;
};


#endif /* StoryTextField_hpp */
