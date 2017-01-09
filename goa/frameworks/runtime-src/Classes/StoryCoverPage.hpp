//
//  StoryCoverPage.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 07/01/17.
//
//

#ifndef StoryCoverPage_hpp
#define StoryCoverPage_hpp

#include <stdio.h>
#include "menu/MenuContext.h"
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


#define COVER_TEXT "titleText"
#define PLAY_BUTTON "play"
#define SOUND_BUTTON "sound"


class StoryCoverPage : public cocos2d::Layer {
public:
    
    static cocos2d::Scene* createScene();
    static StoryCoverPage* create();
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    StoryCoverPage();
    virtual ~StoryCoverPage();
    
    void load();
    
    void loadCoverPage(std::string coverPageUrl);
    
    void play(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void playSound(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);

    void onExitTransitionDidStart();
    
    void onEnterTransitionDidFinish();
    
    
private:
    std::string _baseDir;
    MenuContext* _menuContext;
    std::string _soundFile;
    std::string _soundEnabled;
    std::string _storyId;
};




#endif /* StoryCoverPage_hpp */
