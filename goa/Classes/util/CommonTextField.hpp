//
//  CommonTextField.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 21/05/17.
//
//

#ifndef CommonTextField_hpp
#define CommonTextField_hpp

#include <stdio.h>
#include "cocos2d.h"
#include "ui/CocosGUI.h"

class CommonTextField : public cocos2d::ui::TextField
{
public:
    static CommonTextField *create();
    virtual void onEnterTransitionDidFinish() override;
    virtual void  onExitTransitionDidStart() override;
    void setOriginalText(std::string text);
    std::string getOriginalText();
    
CC_CONSTRUCTOR_ACCESS:
    CommonTextField();
    virtual ~CommonTextField();
    virtual bool init() override;
    bool touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    cocos2d::EventListenerTouchOneByOne *_listener;
    std::string _originalText;
};


#endif /* CommonTextField_hpp */
