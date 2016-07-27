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

class MenuContext : public cocos2d::Node {
    
public:
    static MenuContext* create(Node *main, bool lauchCustomEventOnExit = false);
    void pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose = true, cocos2d::Vec2 position = cocos2d::Vec2::ZERO);
    void finalizePoints();
    static const std::string LANG;

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
    HPMeter* _pointMeter;
    cocos2d::ui::Button* _menuButton;
    cocos2d::ui::Button* _menu;
    cocos2d::LayerColor* _greyLayer;
    void expandMenu(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void pauseNodeAndDescendants(Node *pNode);
    void resumeNodeAndDescendants(Node *pNode);
    void removeMenu();

    template <typename T>
    static inline std::string to_string(T value)
    {
        std::ostringstream os ;
        os << value ;
        return os.str() ;
    }
    
};

#endif /* MenuContext_h */
