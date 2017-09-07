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
#include "../menu/MenuContext.h"
#include "cocos2d.h"
#include "../hero/RPGConfig.h"
#include "../menu/MenuContext.h"
#include "../lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "../util/CommonText.h"
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
    
    void narrateDialog(float dt);
    

    void loadTimings();
    
    void highlightedNarrateWord(float dt);
    
    void unhighlightText(float dt);
    
    void highlightWord(float time, cocos2d::ui::Text* text);
    
    std::vector<float> splitFloat(std::string s, char delim);
    
    void renderStoryText(Node* parentNode, Node* storyTextNode);
    
    void positionTextNode(CommonText* textNode, Node* storyTextNode, float currentNodeX, float currentNodeY);
    
    void preloadAllAudio();

    
private:
    std::string _baseDir;
    MenuContext* _menuContext;
    std::string _soundFile;
    std::string _soundEnabled;
    std::string _storyId;
    std::string _contentPageText;
    std::vector<float> _loadedSplitWordsTimings;
    unsigned long _totalSplitTimings;
    cocos2d::ui::Text* highlightedNWord;
    cocos2d::ui::Text* preHighlightedNWord;
    unsigned long _currentSplitWordIndex;
    unsigned long _totalSplitWords;
    std::vector<CommonText*> _contentCommonTextTokens;
    std::vector<std::string> _individualTextsTokens;
    std::vector<std::string> _loadedSplitWordsEffects;
    bool _isAudionEngineInitialized;
    Node* talkBubbleNode;
};




#endif /* StoryCoverPage_hpp */
