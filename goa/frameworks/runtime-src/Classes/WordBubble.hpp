//
//  WordBubble.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 25/12/16.
//
//

#ifndef WordBubble_hpp
#define WordBubble_hpp

#include <stdio.h>
#include "cocos2d.h"
#include <unordered_map>
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"


class WordBubble : public cocos2d::Node {
public:
    WordBubble();
    
    ~WordBubble();
    
    
    
    static WordBubble* create(std::string word, cocos2d::Point position);
    
    virtual bool initialize(std::string word, cocos2d::Point position);
    
    std::vector<std::string> split(std::string s, char delim);
    
    void join(const std::vector<std::string>& v, char c, std::string& s);
    
    cocos2d::ui::Button* currentButton();
    
    void soundSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    
protected:
    cocos2d::ui::Button* _soundButton;
    cocos2d::ui::Button* _button;
};


#endif /* WordBubble_hpp */
