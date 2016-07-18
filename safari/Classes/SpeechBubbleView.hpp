//
//  SpeechBubbleView.hpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 10/07/16.
//
//

#ifndef SpeechBubbleView_hpp
#define SpeechBubbleView_hpp

#include <stdio.h>
#include "cocos2d.h"
#include <unordered_map>
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"


class SpeechBubbleView : public cocos2d::Node {
public:
    SpeechBubbleView();
    
    ~SpeechBubbleView();
    
    static SpeechBubbleView* create(std::unordered_map<int, std::string> textMap, cocos2d::Point position);
    
    virtual bool initialize(std::unordered_map<int, std::string> textMap, cocos2d::Point position);
    
    
    // touch listeners
//    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
//    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);

    virtual void dialogSelected(cocos2d::Ref* sender, cocos2d::ui::Widget::TouchEventType type);
    
    virtual void destroySpeechBubbles();
    
protected:
//    std::vector<cocos2d::Label*> texts;
    std::vector<cocos2d::ui::Button*> textButtons;
};

#endif /* SpeechBubbleView_hpp */
