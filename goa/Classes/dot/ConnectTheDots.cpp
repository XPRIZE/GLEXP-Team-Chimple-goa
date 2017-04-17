//
//  ConnectTheDots.cpp
//  goa
//
//  Created by Srikanth Talapadi on 13/04/17.
//
//

#include "ConnectTheDots.hpp"
#include "DotsLayer.hpp"
#include "../menu/GameScene.h"

USING_NS_CC;

vector<Color3B> ConnectTheDots::COLORS = {
    Color3B(255, 0, 0),
    Color3B(255, 255, 0),
    Color3B(0, 255, 0),
    Color3B(0, 255, 255),
    Color3B(0, 0, 255),
    Color3B(255, 0, 255),
    Color3B(255, 128, 0),
    Color3B(255, 0, 128)
};

cocos2d::Scene* ConnectTheDots::createScene() {
    auto layer = ConnectTheDots::create();
    auto scene = GameScene::createWithChild(layer, "ConnectTheDots");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

ConnectTheDots *ConnectTheDots::create() {
    ConnectTheDots *connectTheDots = new (std::nothrow) ConnectTheDots();
    if(connectTheDots && connectTheDots->init()) {
        connectTheDots->autorelease();
        return connectTheDots;
    }
    CC_SAFE_DELETE(connectTheDots);
    return nullptr;
}

ConnectTheDots::ConnectTheDots() :
_dotNode(nullptr),
_handNode(nullptr),
_hand(nullptr),
_numNode(nullptr),
_num(nullptr),
_targetNum(2),
_gap(0),
_level(0),
_score(0),
_maxColors(3),
_helpLayer(nullptr)
{
}

ConnectTheDots::~ConnectTheDots() {
    
}

bool ConnectTheDots::init() {
    if(!LayerColor::initWithColor(Color4B(0, 0, 248, 255), Director::getInstance()->getVisibleSize().width, Director::getInstance()->getVisibleSize().height)) {
        return false;
    }
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("maths/hand.plist");
    _dotNode = Node::create();
    _dotNode->setPosition(Vec2(WHITEBOARD_PADDING, 0));
    auto whiteboard = Sprite::create("help/whiteboard.png");
    whiteboard->setScale((Director::getInstance()->getVisibleSize().height - WHITEBOARD_PADDING) / WHITEBOARD_HEIGHT);
    whiteboard->setPosition(Director::getInstance()->getVisibleSize().height / 2.0, Director::getInstance()->getVisibleSize().height / 2.0);
    _dotNode->addChild(whiteboard);
    addChild(_dotNode);
    _gap = MIN((Director::getInstance()->getVisibleSize().width - WHITEBOARD_PADDING * 3) / NUM_COLS, (Director::getInstance()->getVisibleSize().height - WHITEBOARD_PADDING * 3) / NUM_ROWS);
    
    return true;
}

void ConnectTheDots::onEnterTransitionDidFinish() {
    _level = _menuContext->getCurrentLevel();
    _targetNum = (_level - 1) % 5 + 2;
    if(_level <= 5) {
        _maxColors = 3;
    } else {
        _maxColors = 5;
    }
    _handNode = Node::create();
    auto h = Director::getInstance()->getVisibleSize().height;
    auto w = Director::getInstance()->getVisibleSize().width;
    _handNode->setPosition(h + (w - h) / 2 + WHITEBOARD_PADDING / 2, (w - h) * 1.5 - WHITEBOARD_PADDING * 2);
    auto handBoard = Sprite::create("help/whiteboard.png");
    handBoard->setScale((w - h - 3 * WHITEBOARD_PADDING) / WHITEBOARD_HEIGHT);
    handBoard->setColor(Color3B(218, 113, 109));
    _handNode->addChild(handBoard);
    _hand = Sprite::createWithSpriteFrameName(DotsLayer::fingerRep[_targetNum]);
    _hand->setScale(0.5);
    _handNode->addChild(_hand);
    addChild(_handNode);
    
    _numNode = Node::create();
    _numNode->setPosition(h + (w - h) / 2 + WHITEBOARD_PADDING / 2, (w - h) / 2 - WHITEBOARD_PADDING / 2);
    auto fBoard = Sprite::create("help/whiteboard.png");
    fBoard->setScale((w - h - 3 * WHITEBOARD_PADDING) / WHITEBOARD_HEIGHT);
    _numNode->addChild(fBoard);
    _num = Label::createWithTTF(MenuContext::to_string(_targetNum), "fonts/Roboto-Regular.ttf", 512);
    _num->setColor(Color3B(255, 192, 203));
    _numNode->addChild(_num);
    addChild(_numNode);

    auto pos = _handNode->getPosition();
    _handNode->setPosition(pos.x, pos.y + h);
    _handNode->runAction(EaseBackOut::create(MoveTo::create(0.5, pos)));
    
    pos = _numNode->getPosition();
    _numNode->setPosition(pos.x, pos.y + h);
    _numNode->runAction(EaseBackOut::create(MoveTo::create(0.5, pos)));
    
    pos = _dotNode->getPosition();
    _dotNode->setPosition(pos.x, pos.y + h);
    
    _dotNode->runAction(Sequence::create(EaseBackOut::create(MoveTo::create(0.5, pos)), DelayTime::create(1.0), CallFunc::create([=]() {
        auto path = iterateToFindPath(true);
        if(_level == 1) {
            auto x = (path[0]->getPosition().x + path[1]->getPosition().x) / 2 + 64;
            auto y = (path[0]->getPosition().y + path[1]->getPosition().y) / 2;
            auto width = abs(path[0]->getPosition().x - path[1]->getPosition().x) + 128;
            auto height = abs(path[0]->getPosition().y - path[1]->getPosition().y) + 128;
            _helpLayer = HelpLayer::create(Rect(x, y, width, height), Rect::ZERO);
            addChild(_helpLayer);
            _helpLayer->clickAndDrag(Vec2(path[0]->getPosition().x + 64, path[0]->getPosition().y + 64), Vec2(path[1]->getPosition().x + 64, path[1]->getPosition().y + 64));
        }
    }), NULL));
    showDots();
}

void ConnectTheDots::showDots() {
    _dots.resize(NUM_ROWS, std::vector<Dot *>(NUM_COLS));

    for (int i = 0; i < NUM_ROWS; i++) {
        for(int j = 0; j < NUM_COLS; j++) {
            auto dot = Dot::createWithColor(COLORS[RandomHelper::random_int(0, _maxColors - 1)]);
            dot->touchBeganCallback = CC_CALLBACK_2(ConnectTheDots::onDotTouchBegan, this);
            dot->touchMovedCallback = CC_CALLBACK_2(ConnectTheDots::onDotTouchMoved, this);
            dot->touchEndedCallback = CC_CALLBACK_2(ConnectTheDots::onDotTouchEnded, this);
            dot->setPosition(WHITEBOARD_PADDING * 1.5 + (j + 0.5) * _gap, WHITEBOARD_PADDING * 1.5 + (i + 0.5) * _gap);
            _dotNode->addChild(dot);
            _dots[i][j] = dot;
        }
    }
}

pair<int, int> ConnectTheDots::getRowCol(Dot* dot) {
    for (int i = 0; i < NUM_ROWS; i++) {
        for(int j = 0; j < NUM_COLS; j++) {
            if(dot == _dots[i][j]) {
                return make_pair(i, j);
            }
        }
    }
    return make_pair(-1, -1); //couldnt find
}

void ConnectTheDots::enableTouch(bool enabled) {
    Vector <Node*> children = _dotNode->getChildren();
    int i = 0;
    for (auto item = children.begin() + 1; item != children.end(); ++item) {
        CCLOG("%i", i++);
        Dot *dot = static_cast<Dot*>(*item);
        dot->enableTouch(enabled);
    }
}

void ConnectTheDots::pulse(Dot* dot) {
    auto pulse = Dot::createWithColor(dot->getColor());
    pulse->setOpacity(64);
    pulse->setScale(1);
    pulse->setPosition(dot->getContentSize().width / 2, dot->getContentSize().height / 2);
    dot->addChild(pulse);
    pulse->runAction(Sequence::create(ScaleBy::create(0.5, 1.8), CallFunc::create([=]() {
        pulse->removeFromParent();
    }), NULL));
}

void ConnectTheDots::showNum(int num) {
    _num->setString(MenuContext::to_string(num));
    _menuContext->pronounceWord(MenuContext::to_string(num));
}

vector<Dot*> ConnectTheDots::iterateToFindPath(bool isHelp) {
    for (int i = 0; i < NUM_ROWS; i++) {
        for(int j = 0; j < NUM_COLS; j++) {
            auto dotArray = findPath(_dots[i][j], i, j, vector<Dot*>(), _targetNum);
            if(dotArray.size() >= _targetNum) {
                if(_helpLayer) {
                    for (auto item = dotArray.rbegin(); item != dotArray.rend(); ++item) {
                        pulse(*item);
                    }
                }
                return dotArray;
            }
        }
    }
    return vector<Dot*>(); //blank vector
}

vector<Dot*> ConnectTheDots::findPath(Dot* dot, int x, int y, vector<Dot*> dotArray, int num) {
    bool found = false;
    for (auto item = dotArray.rbegin(); item != dotArray.rend(); ++item) {
        if(dot == *item) {
            found = true;
        }
    }
    if(!found) {
        dotArray.push_back(dot);
        if(dotArray.size() >= num) {
            return dotArray;
        }
        for (int i = MAX(x - 1, 0); i < MIN(x + 2, NUM_ROWS); i++) {
            for (int j = MAX(y - 1, 0); j < MIN(y + 2, NUM_COLS); j++) {
                if(!(i == x && j == y) && dot->getColor().equals(_dots[i][j]->getColor())) {
                    vector<Dot*> copyDotArray(dotArray);
                    auto retDotArray = findPath(_dots[i][j], i, j, copyDotArray, num);
                    if(retDotArray.size() >= num) {
                        return retDotArray;
                    }
                }
            }
        }
    }
    return dotArray;
}

bool ConnectTheDots::onDotTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event) {
    _touchedDots.clear();
    auto dot = static_cast<Dot*>(event->getCurrentTarget());
    auto locationInNode = dot->getParent()->convertTouchToNodeSpace(touch);
    auto line = DrawNode::create();
    line->drawSegment(dot->getPosition(), locationInNode, 20, Color4F(dot->getColor()));
    dot->getParent()->addChild(line);
    auto rowCol = getRowCol(dot);
    DotInfo d = DotInfo();
    d.dot = dot;
    d.row = rowCol.first;
    d.col = rowCol.second;
    d.drawNode = line;
    _touchedDots.push_back(d);
    pulse(dot);
    showNum((int)_touchedDots.size());
    return true;
}

void ConnectTheDots::onDotTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event) {
    auto dot = static_cast<Dot*>(event->getCurrentTarget());
    auto locationInNode = dot->getParent()->convertTouchToNodeSpace(touch);
    if(_touchedDots.size() > 0) {
        auto prevDot = _touchedDots[_touchedDots.size() - 1];
        auto line = prevDot.drawNode;
        line->clear();
        line->drawSegment(prevDot.dot->getPosition(), locationInNode, 20, Color4F(prevDot.dot->getColor()));
        for (int i = 0; i < NUM_ROWS; i++) {
            for(int j = 0; j < NUM_COLS; j++) {
                if(_dots[i][j]->getBoundingBox().containsPoint(locationInNode) &&
                   dot->getColor().equals(_dots[i][j]->getColor())) {
                    if(_dots[i][j] == prevDot.dot) {
                        return;
                    } else if(_touchedDots.size() > 1 && _touchedDots[_touchedDots.size() - 2].dot == _dots[i][j]) {
                        prevDot.drawNode->removeFromParent();
                        _touchedDots.pop_back();
                        showNum((int)_touchedDots.size());
                    } else {
                        if(abs(prevDot.row - i) <= 1 && abs(prevDot.col - j) <= 1) {
                            for (int k = 1; k < _touchedDots.size(); k++) {
                                if(_dots[i][j] == _touchedDots[k].dot) {
                                    return;
                                }
                            }
                            prevDot.drawNode->clear();
                            prevDot.drawNode->drawSegment(prevDot.dot->getPosition(), _dots[i][j]->getPosition(), 20, Color4F(prevDot.dot->getColor()));
                            auto line = DrawNode::create();
                            _dots[i][j]->getParent()->addChild(line);
                            DotInfo d = DotInfo();
                            d.dot = _dots[i][j];
                            d.row = i;
                            d.col = j;
                            d.drawNode = line;
                            _touchedDots.push_back(d);
                            pulse(_dots[i][j]);
                            showNum((int)_touchedDots.size());
                            return;
                        }
                    }
                }
            }
        }
    }
}

void ConnectTheDots::onDotTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event) {
    int touchedDots = 1;
    for (int i = 0; i < _touchedDots.size(); i++) {
        _touchedDots[i].dot->removeAllChildren();
        _touchedDots[i].drawNode->removeFromParent();
        if(_touchedDots[i].dot != _touchedDots[0].dot) {
            touchedDots++;
        }
    }
    if(touchedDots == _targetNum) {
        if(_helpLayer) {
            removeChild(_helpLayer);
            _helpLayer = nullptr;
        }
        CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("res/sounds/sfx/pop.ogg");
        if(++_score >= 5) {
            _menuContext->setMaxPoints(5);
            _menuContext->addPoints(_score);
            _menuContext->showScore();
        }
        enableTouch(false);
        for (int j = 0; j < NUM_COLS; j++) {
            for (int i = NUM_ROWS - 1; i >= 0; i--) {
                for (int k = 0; k < _touchedDots.size(); k++) {
                    if(_touchedDots[k].dot == _dots[i][j]) {
                        auto currentDot = _dots[i][j];
                        for (int m = i; m < NUM_ROWS - 1; m++) {
                            _dots[m][j] = _dots[m+1][j];
                        }
                        _dots[NUM_ROWS - 1][j] = currentDot;
                        currentDot->setColor(COLORS[RandomHelper::random_int(0, _maxColors - 1)]);
                        currentDot->setPosition(Vec2(currentDot->getPosition().x, WHITEBOARD_PADDING * 1.5 + (NUM_COLS + 0.5) * _gap));
                    }
                }
            }
        }
        while (iterateToFindPath(false).size() == 0) {
            for (int i = 0; i < NUM_ROWS; i++) {
                for(int j = 0; j < NUM_COLS; j++) {
                    auto dot = _dots[i][j];
                    int iNew = RandomHelper::random_int(0, NUM_ROWS - 1);
                    int jNew = RandomHelper::random_int(0, NUM_COLS - 1);
                    auto dotNew = _dots[iNew][jNew];
                    _dots[iNew][jNew] = dot;
                    _dots[i][j] = dotNew;
                }
            }
        }
        for (int i = 0; i < NUM_ROWS; i++) {
            for(int j = 0; j < NUM_COLS; j++) {
                auto newPos = Vec2(WHITEBOARD_PADDING * 1.5 + (j + 0.5) * _gap, WHITEBOARD_PADDING * 1.5 + (i + 0.5) * _gap);
                if(!newPos.equals(_dots[i][j]->getPosition())) {
                    _dots[i][j]->runAction(EaseBackOut::create(MoveTo::create(0.5, newPos)));
                }
            }
        }
        runAction(Sequence::create(DelayTime::create(0.5), CallFunc::create([=]() {
            enableTouch(true);
        }), NULL));
        return;
    }
    
}
