//
//  ConnectTheDots.hpp
//  goa
//
//  Created by Srikanth Talapadi on 13/04/17.
//
//

#ifndef ConnectTheDots_hpp
#define ConnectTheDots_hpp


#include "cocos2d.h"
#include "ui/CocosGUI.h"
#include "Dot.hpp"
#include "../menu/HelpLayer.h"
#include "../menu/MenuContext.h"

using namespace std;
using namespace cocos2d;

class ConnectTheDots : public cocos2d::LayerColor
{
public:
    static cocos2d::Scene* createScene();
    static ConnectTheDots* create();
    bool onDotTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onDotTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
    void onDotTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    struct DotInfo {
        Dot* dot;
        int row;
        int col;
        DrawNode* drawNode;
    };

CC_CONSTRUCTOR_ACCESS:
    ConnectTheDots();
    ~ConnectTheDots();
    bool init() override;
    void onEnterTransitionDidFinish() override;
protected:
    constexpr static const int NUM_ROWS = 8;
    constexpr static const int NUM_COLS = 8;
    constexpr static const int WHITEBOARD_WIDTH = 1640;
    constexpr static const int WHITEBOARD_HEIGHT = 1640;
    constexpr static const int WHITEBOARD_PADDING = 80;
    MenuContext* _menuContext;
    vector<vector<Dot*>> _dots;
    Node* _dotNode;
    Node* _handNode;
    Sprite* _hand;
    Node* _numNode;
    Label* _num;
    vector<DotInfo> _touchedDots;
    int _targetNum;
    int _gap;
    int _level;
    int _score;
    int _maxColors;
    HelpLayer* _helpLayer;
    static vector<Color3B> COLORS;
    void showDots();
    pair<int, int> getRowCol(Dot* dot);
    void enableTouch(bool enabled);
    void pulse(Dot* dot);
    void showNum(int num);
    vector<Dot*> iterateToFindPath(bool isHelp);
    vector<Dot*> findPath(Dot* dot, int x, int y, vector<Dot*> dotArray, int num);
    
};

#endif /* ConnectTheDots_hpp */
