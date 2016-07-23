
//  DuelScene.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 22/06/16.
//
//

#include <math.h>
#include "DuelScene.h"
#include "../AppDelegate.h"
#include "../alphamon/HPMeter.h"
#include "AlphabetGrid.h"
#include "CharGenerator.h"
#include "../alphamon/Alphamon.h"
#include "../alphamon/SelectAlphamonScene.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include "ui/CocosGUI.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

const std::string DuelScene::BG_NAME = "background_1";
const std::string DuelScene::PANEL_NAME = "Panel_1";
const std::string DuelScene::SLIDER_BG_NAME = "Panel_2";
const std::string DuelScene::LEFT_STAND_NAME = "rocks_2";
const std::string DuelScene::RIGHT_STAND_NAME = "rocks_1";

DuelScene::DuelScene() :
_turnNumber(0) {
    
}

DuelScene::~DuelScene() {
    _eventDispatcher->removeCustomEventListeners("alphabet_selected");
    _eventDispatcher->removeCustomEventListeners("alphabet_unselected");    
}

Scene* DuelScene::createScene(wchar_t myMonChar, wchar_t otherMonChar)
{
    auto scene = Scene::create();
    
    auto layer = DuelScene::create(myMonChar, otherMonChar);
    
    scene->addChild(layer);

    layer->_menuContext = MenuContext::create(layer);
    scene->addChild(layer->_menuContext);
    
    return scene;
}

DuelScene* DuelScene::create(wchar_t myMonChar, wchar_t otherMonChar)
{
    DuelScene* duelScene = new (std::nothrow) DuelScene();
    if(duelScene && duelScene->init(myMonChar, otherMonChar))
    {
        duelScene->autorelease();
        return duelScene;
    }
    CC_SAFE_DELETE(duelScene);
    return nullptr;
}

bool DuelScene::init(wchar_t myMonChar, wchar_t otherMonChar)
{
    if (!Node::init()) {
        return false;
    }
    auto background = CSLoader::createNode("battle_ground.csb");
    addChild(background);
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    auto bg = background->getChildByName(BG_NAME);
    if(visibleSize.width > bg->getContentSize().width) {
        background->setContentSize(visibleSize);
        auto bgTile = Sprite::createWithSpriteFrame(static_cast<Sprite*>(bg)->getSpriteFrame());
        bgTile->setPosition(bg->getPositionX() + bg->getContentSize().width - 10, bg->getPositionY());
        background->addChild(bgTile, -1);
    }
    const int numRows = MAX_ROWS;
    const int numCols = MAX_COLS;
    _grid = AlphabetGrid::create(SQUARE_WIDTH * numCols, SQUARE_WIDTH * numRows, numRows, numCols);
    auto panel = background->getChildByName(PANEL_NAME);
    panel->setContentSize(Size(visibleSize.width, panel->getContentSize().height));
    panel->addChild(_grid);
    _grid->setPosition(Vec2((panel->getContentSize().width - SQUARE_WIDTH * numCols) / 2, (panel->getContentSize().height - SQUARE_WIDTH * numRows) / 2));

    auto sliderBG = background->getChildByName(SLIDER_BG_NAME);
    sliderBG->setContentSize(Size(visibleSize.width, sliderBG->getContentSize().height));

    _timer = HPMeter::createWithTextureAndPercent("battle_ground/bar_out.png", "battle_ground/bar_in.png", "battle_ground/clock.png", 100);
    _timer->setPosition(Vec2(sliderBG->getContentSize().width / 2, sliderBG->getContentSize().height / 2));
    sliderBG->addChild(_timer);

    _myMon = Alphamon::createWithAlphabet(myMonChar);
    auto leftStand = background->getChildByName(LEFT_STAND_NAME);
    leftStand->setPositionX(leftStand->getPositionX() + 150.0);
    _myMon->setPosition(leftStand->getPosition() + Vec2(0, 0));
    addChild(_myMon);
    _myMon->setHealth(100);
//    _myMon->setScale(0.7);
    _eventDispatcher->addCustomEventListener("alphabet_selected", CC_CALLBACK_1(DuelScene::onAlphabetSelected, this));
    _eventDispatcher->addCustomEventListener("alphabet_unselected", CC_CALLBACK_1(DuelScene::onAlphabetUnselected, this));
    
    _otherMon = Alphamon::createWithAlphabet(otherMonChar);
    auto rightStand = background->getChildByName(RIGHT_STAND_NAME);
    rightStand->setPositionX(rightStand->getPositionX() + visibleSize.width - 2560.0 - 150.0);
    addChild(_otherMon);
//    _otherMon->setScale(0.7);
    _otherMon->setPosition(rightStand->getPosition() + Vec2(0, 0));
    _otherMon->setHealth(100);
//    auto lg = LayerGradient::create(Color4B(0.0, 0.0, 0.0, 128.0), Color4B(0.0, 0.0, 0.0, 0.0), Vec2(-1, 0));
//    lg->changeWidthAndHeight(1280.0, 900.0);
//    addChild(lg);
    
    
//    auto amon = CSLoader::createNode("english/A.csb");
//    addChild(amon);
//    amon->setScale(0.5);
//    amon->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
//    auto eyeTimeline = CSLoader::createTimeline("eye_ani/eye_h.csb");
//    amon->getChildByName("FileNode_2")->runAction(eyeTimeline);
//    eyeTimeline->gotoFrameAndPlay(0, true);
//    auto mouthTimeline = CSLoader::createTimeline("mouth_ani/mouth_e.csb");
//    amon->getChildByName("FileNode_4")->runAction(mouthTimeline);
////    mouthTimeline->gotoFrameAndPlay(0, true);
//    mouthTimeline->play("eat", true);
    
    
    startMyTurn();
    return true;
}

void DuelScene::startMyTurn() {
    if(_myMon->getHealth() <= 0) {
        CCLOG("MyMon game over");
        gameOver();
    } else if (_otherMon->getHealth() <= 0) {
        CCLOG("OtherMon game over");
        gameOver();
    } else {
        _turnNumber++;
        int numCols = MAX_COLS;
        int numRows = MAX_ROWS;
        
        if(_turnNumber < 2) {
            numCols /= 4;
            numRows /= 4;
        } else if (_turnNumber < 4) {
            numCols /= 2;
            numRows /= 2;
        }
        auto charArray = CharGenerator::getInstance()->generateMatrixForChoosingAChar(_myMon->getAlphabet(), numRows, numCols, 50);
        _grid->resize(SQUARE_WIDTH * MAX_COLS, SQUARE_WIDTH * MAX_ROWS, numRows, numCols);
        _grid->setCharacters(charArray);
        _grid->enableTouch(true);
        _powerIncr = ceil(100.0 / _grid->getCountOfAlphabetsWhichMatch(_myMon->getAlphabet()));

        _timer->setPercent(100);
        
        auto actionTimer = ActionTween::create(10, "percent", 100.0, 0.0);
        auto armMyMonFunc = CallFunc::create(CC_CALLBACK_0(DuelScene::armMyMon, this));
        
        _timer->runAction(Sequence::create(actionTimer, armMyMonFunc, NULL));
        _myMon->startMyTurn();
//        CCLOG("%s", TextureCache::sharedTextureCache()->getCachedTextureInfo().c_str());
    }
}

void DuelScene::gameOver() {
    auto winner = (_otherMon->getHealth() <= 0) ? _myMon : _otherMon;
    auto scaleBy = ScaleBy::create(1.0, 1.2);
    auto moveTo = MoveTo::create(1.0, Vec2(1280.0, 900.0));
    auto spawn = TargetedAction::create(winner, Spawn::createWithTwoActions(scaleBy, moveTo));
    auto callbackStart = CallFunc::create(CC_CALLBACK_0(DuelScene::returnToPrevScene, this));
    auto sequence = Sequence::createWithTwoActions(spawn, callbackStart);
    runAction(sequence);
}

void DuelScene::returnToPrevScene() {
//    stopAllActions();
    Director::getInstance()->replaceScene(SelectAlphamon::createScene());
}

void DuelScene::armMyMon() {
    _grid->enableTouch(false);
    auto matchingAlphabets = _grid->getAlphabetsWhichMatch(_myMon->getAlphabet());
    for(auto alpha: matchingAlphabets) {
        CCLOG("meteor %c", alpha->getChar());
        auto particle = cocos2d::ParticleMeteor::create();
        particle->setPosition(convertToNodeSpace(alpha->getParent()->convertToWorldSpace(alpha->getPosition())));
        addChild(particle);
        auto moveTo = JumpTo::create(0.5, _myMon->getPosition(), 25.0, 1);
        auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::endMeteor, this, particle));
        
        auto sequence = Sequence::create(moveTo, callbackJump, NULL);
        particle->runAction(sequence);
        
    }
    auto callbackAttack = CallFunc::create(CC_CALLBACK_0(DuelScene::attackOtherMon, this));
    this->runAction(Sequence::create(DelayTime::create(2), callbackAttack, nullptr));
}

void DuelScene::attackOtherMon() {
    auto particle = cocos2d::ParticleMeteor::create();
    particle->setPosition(_myMon->getPosition());
    addChild(particle);
    auto moveTo = TargetedAction::create(particle, JumpTo::create(0.5, _otherMon->getPosition(), 25.0, 1));
    auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::endMeteor, this, particle));
    auto callbackAttack = CallFunc::create(CC_CALLBACK_0(DuelScene::attackMyMon, this));
    auto callbackReduceHP = CallFunc::create(CC_CALLBACK_0(DuelScene::reduceHP, this, _otherMon, _myMon->getPower() * MAX_POINTS_PER_TURN / 100));
    auto sequence = Sequence::create(moveTo, callbackJump, _otherMon->shakeAction(), callbackReduceHP, callbackAttack, NULL);
    runAction(sequence);
    _myMon->endMyTurn();
}

void DuelScene::attackMyMon() {
    auto particle = cocos2d::ParticleMeteor::create();
    particle->setPosition(_otherMon->getPosition());
    addChild(particle);
    auto moveTo = TargetedAction::create(particle, JumpTo::create(0.5, _myMon->getPosition(), 25.0, 1));
    auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::endMeteor, this, particle));
    auto callbackStart = CallFunc::create(CC_CALLBACK_0(DuelScene::startMyTurn, this));
    auto callbackReduceHP = CallFunc::create(CC_CALLBACK_0(DuelScene::reduceHP, this, _myMon, rand() % MAX_POINTS_PER_TURN));
    auto sequence = Sequence::create(moveTo, callbackJump, _myMon->shakeAction(), callbackReduceHP, callbackStart, NULL);
    runAction(sequence);
    
}

void DuelScene::reduceHP(Alphamon *amon, int numPoints) {
    amon->changeHealth(numPoints * -1);
}

void DuelScene::endMeteor(Node* node) {
    removeChild(node);
}

void DuelScene::onAlphabetSelected(EventCustom *event) {
    wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
    CCLOG("Pressed %c",buf[0]);
    if(_myMon->getAlphabet() == buf[0]) {
        _myMon->changePower(_powerIncr);
    } else {
        _myMon->changePower(-_powerIncr);
    }
    _menuContext->pickAlphabet(_myMon->getAlphabet(), buf[0], true);
}

void DuelScene::onAlphabetUnselected(EventCustom *event) {
    wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
    CCLOG("Pressed %c",buf[0]);
    if(_myMon->getAlphabet() == buf[0]) {
        _myMon->changePower(-_powerIncr);
    } else {
        _myMon->changePower(_powerIncr);
    }
    _menuContext->pickAlphabet(_myMon->getAlphabet(), buf[0], false);
}
