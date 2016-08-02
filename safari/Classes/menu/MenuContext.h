//
//  MenuContext.h
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#ifndef MenuContext_h
#define MenuContext_h

#include "cocos2d.h"
#include <sstream>
#include "ui/CocosGUI.h"
#include "../alphamon/HPMeter.h"
#include "editor-support/cocostudio/CocoStudio.h"

#define GAME_MAP_MENU "GameMapScene"
#define HELP_MENU "HelpScene"
#define EXIT_MENU "StartMenuScene"
#define MAP_MENU "MapScene"
#define BOOK_MENU "BookScene"
#define BAG_PACK_MENU "BagpackScene"


class MenuContext : public cocos2d::Node {
    
public:
    static MenuContext* create(Node *main, std::string gameName = "", bool lauchCustomEventOnExit = false);
    void pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose = true, cocos2d::Vec2 position = cocos2d::Vec2::ZERO);
    void finalizePoints();
    static const std::string LANG;
    Node* jumpOut(std::string nodeCsbName, float duration, cocos2d::Vec2 position, std::string animationName = "");
    void showStartupHelp();

CC_CONSTRUCTOR_ACCESS:
    MenuContext();
    virtual ~MenuContext();
    bool init(Node* main);
    
    
    
protected:
    int _points;
    bool _menuSelected;
    bool _launchCustomEventOnExit;
    cocos2d::Node* _main;
    cocos2d::Label* _label;
    cocos2d::ui::Slider * _pointMeter;
    cocos2d::ui::Button* _menuButton;
    cocos2d::ui::Button* _exitMenu;
    cocos2d::ui::Button* _helpMenu;
    cocos2d::ui::Button* _mapMenu;
    cocos2d::ui::Button* _bookMenu;
    cocos2d::ui::Button* _gamesMenu;
    cocos2d::LayerColor* _greyLayer;
    cocos2d::Node* _chimp;
    void expandMenu(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void pauseNodeAndDescendants(Node *pNode);
    void resumeNodeAndDescendants(Node *pNode);
    void showMap(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void showBook(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void showGamesMenu(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void showHelp(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void waitForAudioLoad(std::string audioFileName, std::function<void(bool isSuccess)>callback);
    void chimpHelp();
    void tellHelp();
    void stopTellHelp();
    void addGreyLayer();
    void removeMenu();
    void increasePoints(int points);
    void happyFace();
    void sadFace();
    void normalFace();
    std::string gameName;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)  
	void videoEventCallback(Ref* sender, cocos2d::experimental::ui::VideoPlayer::EventType eventType);
#endif 

	void videoPlayStart(std::string gameName);
	void videoPlayOverCallback();

    template <typename T>
    static inline std::string to_string(T value)
    {
        std::ostringstream os ;
        os << value ;
        return os.str() ;
    }
    
    cocos2d::ui::Button* createMenuItem(const std::string normalImage,
                        const std::string selectedImage ,
                        const std::string disableImage,
                        float xPosOffSet);
    
};

#endif /* MenuContext_h */
