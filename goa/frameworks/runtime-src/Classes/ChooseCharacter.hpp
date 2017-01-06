//
//  ChooseCharacter.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 06/01/17.
//
//

#ifndef ChooseCharacter_hpp
#define ChooseCharacter_hpp

#include <stdio.h>
#include "cocos2d.h"
#include "RPGConfig.h"
#include "menu/MenuContext.h"
#include "lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"
#include "storage/local-storage/LocalStorage.h"

#define CHOOSE_TEXT "choose_text"
#define BOY_BUTTON "boy_button"
#define GIRL_BUTTON "girl_button"
#define BOY_TEXT "boy_text"
#define GIRL_TEXT "girl_text"
#define CHOOSE_CHARACTER_TEXT "Choose Character"
#define BOY_LABEL_TEXT "Boy"
#define GIRL_LABEL_TEXT "Girl"


class ChooseCharacter : public cocos2d::Layer {
public:
    
    static cocos2d::Scene* createScene(const std::string& island);
    static ChooseCharacter* create(const std::string& island);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init(const std::string& island);
    ChooseCharacter();
    virtual ~ChooseCharacter();
    
private:
    std::string island;
    MenuContext* menuContext;    
    void load();
    void processChildNodes(cocos2d::Node *rootNode);
    void characterSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
};


#endif /* ChooseCharacter_hpp */
