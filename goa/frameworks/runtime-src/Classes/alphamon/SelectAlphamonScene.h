//
//  SelectAlphamonScene.h
//  rpg
//
//  Created by Srikanth Talapadi on 10/07/16.
//
//

#ifndef SelectAlphamonScene_h
#define SelectAlphamonScene_h

#include "cocos2d.h"
#include "../menu/StartMenuScene.h"
#include "Alphamon.h"

class SelectAlphamon : public cocos2d::ui::ScrollView {
public:
    static cocos2d::Scene* createScene();
    CREATE_FUNC(SelectAlphamon);
    void onAlphabetSelected(cocos2d::EventCustom *event);    
    
    static const char* gameName() { return ALPHAMON_COMBAT.c_str();}

CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    SelectAlphamon();
    virtual ~SelectAlphamon();
    
protected:
    cocos2d::Layer* _layer;
    wchar_t _firstChar;
    wchar_t _secondChar;
};

#endif /* SelectAlphamonScene_h */
