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
#include "Alphamon.h"

class SelectAlphamon : public cocos2d::LayerGradient {
public:
    static cocos2d::Scene* createScene();
    CREATE_FUNC(SelectAlphamon);
    void onAlphabetSelected(cocos2d::EventCustom *event);

CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    SelectAlphamon();
    virtual ~SelectAlphamon();
    
protected:
    char _firstChar;
    char _secondChar;
};

#endif /* SelectAlphamonScene_h */
