
//  DuelScene.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 22/06/16.
//
//

#include <math.h>
#include "DuelScene.h"
#include "../menu/GameScene.h"
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
#include "../menu/StartMenuScene.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

const std::string DuelScene::BG_NAME = "background";
const std::string DuelScene::PANEL_NAME = "alphabet";
const std::string DuelScene::SLIDER_BG_NAME = "Panel_2";
const std::string DuelScene::LEFT_STAND_NAME = "rock_green";
const std::string DuelScene::RIGHT_STAND_NAME = "rock_red";

DuelScene::DuelScene() :
_turnNumber(0),
_timer(nullptr),
_timerAnimation(nullptr),
_myMonChar(0),
_otherMonChar(0)
{
    
}

DuelScene::~DuelScene() {
    _eventDispatcher->removeCustomEventListeners("alphabet_selected");
    _eventDispatcher->removeCustomEventListeners("alphabet_unselected");    
}

Scene* DuelScene::createScene(wchar_t myMonChar, wchar_t otherMonChar)
{
    auto layer = DuelScene::create(myMonChar, otherMonChar);
    auto scene = GameScene::createWithChild(layer, ALPHAMON_COMBAT);
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

Scene* DuelScene::createScene() {
    auto layer = DuelScene::create();
    auto scene = GameScene::createWithChild(layer, ALPHAMON_COMBAT);
    layer->_menuContext = scene->getMenuContext();
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

DuelScene* DuelScene::create()
{
    DuelScene* duelScene = new (std::nothrow) DuelScene();
    if(duelScene && duelScene->init())
    {
        duelScene->autorelease();
        return duelScene;
    }
    CC_SAFE_DELETE(duelScene);
    return nullptr;
}

void DuelScene::onEnterTransitionDidFinish() {
    if(_myMonChar == 0) {
        auto allChars = LangUtil::getInstance()->getAllCharacters();
        auto level = _menuContext->getCurrentLevel();
        if(level <= LangUtil::getInstance()->getNumberOfCharacters()) {
            _myMonChar = allChars[level-1];
        } else {
            _myMonChar = allChars[rand() % LangUtil::getInstance()->getNumberOfCharacters()];
        }
        _otherMonChar = CharGenerator::getInstance()->generateAChar();
    }
    _background = CSLoader::createNode("battle_ground.csb");
    addChild(_background);
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    auto bg = _background->getChildByName(BG_NAME);
    float offsetX = (visibleSize.width - 2560) / 2;
    bg->setPositionX(bg->getPositionX() + offsetX);
    auto extra1 = _background->getChildByName("background_extra_1");
    extra1->setPositionX(extra1->getPositionX() + offsetX);
    auto extra2 = _background->getChildByName("background_extra_2");
    extra2->setPositionX(extra2->getPositionX() + offsetX);
    auto upper = _background->getChildByName("upper");
    upper->setPositionX(upper->getPositionX() + offsetX);
    _timer = _background->getChildByName("FileNode_1");
    _timer->setPosition(Vec2(_timer->getPositionX() + offsetX, visibleSize.height * 3 / 4));
    _timerPosition = _timer->getPosition();
    _timer->setPosition(Vec2(_timerPosition.x, visibleSize.height + 150));
    
    auto right = _background->getChildByName(RIGHT_STAND_NAME);
    right->setPositionX(right->getPositionX() + offsetX);
    
    const int numRows = MAX_ROWS;
    const int numCols = MAX_COLS;
    _grid = AlphabetGrid::create(SQUARE_WIDTH * numCols, SQUARE_WIDTH * numRows, numRows, numCols);
    auto panel = _background->getChildByName(PANEL_NAME);
    panel->setContentSize(Size(visibleSize.width, panel->getContentSize().height));
    panel->addChild(_grid);
    _grid->setPosition(Vec2((panel->getContentSize().width - SQUARE_WIDTH * numCols) / 2, (panel->getContentSize().height - SQUARE_WIDTH * numRows) / 2));
    
    _timerAnimation = CSLoader::createTimeline("battle_ground/timer.csb");
    _timer->runAction(_timerAnimation);
    _timerAnimation->setLastFrameCallFunc(CC_CALLBACK_0(DuelScene::armMyMon, this));
    _timerAnimation->setTimeSpeed(0.2);
    
    _eventDispatcher->addCustomEventListener("alphabet_selected", CC_CALLBACK_1(DuelScene::onAlphabetSelected, this));
    _eventDispatcher->addCustomEventListener("alphabet_unselected", CC_CALLBACK_1(DuelScene::onAlphabetUnselected, this));
    startDuel();
}

bool DuelScene::init(wchar_t myMonChar, wchar_t otherMonChar)
{
    if (!Node::init()) {
        return false;
    }
    _myMonChar = myMonChar;
    _otherMonChar = otherMonChar;
    
    return true;
}

bool DuelScene::init()
{
    if (!Node::init()) {
        return false;
    }
    
    return true;
}

void DuelScene::startDuel() {
    auto node = CSLoader::createNode("booknode.csb");
    auto pos = Vec2(2300, 1600);
    node->setPosition(pos);
    addChild(node);
    node->setScale(0.2);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    auto jumpTo = MoveTo::create(1, Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    auto scaleTo = ScaleTo::create(1, 1);
        cocostudio::timeline::ActionTimeline* anim = CSLoader::createTimeline("booknode.csb");
        node->runAction(anim);
        auto spawn = Spawn::create(scaleTo, jumpTo, NULL);
    auto callbackOpen = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "book_open", false));
    auto callbackClose = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, anim, "book_close", false));
    anim->setAnimationEndCallFunc("book_open", CC_CALLBACK_0(DuelScene::appearMyMon, this));

    auto fade = FadeOut::create(1.0);
    auto sequence = Sequence::create(TargetedAction::create(node, spawn), callbackOpen, DelayTime::create(1.0), callbackClose, TargetedAction::create(node, fade), NULL);
    runAction(sequence);
}

void DuelScene::appearMyMon() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    _myMon = Alphamon::createWithAlphabet(_myMonChar);
    _myMon->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    _myMon->setScale(0.2);
    
    addChild(_myMon);
    _myMon->setHealth(100, "green");
    
    auto monScale = ScaleTo::create(1, 1);
    auto leftStand = _background->getChildByName(LEFT_STAND_NAME);
    auto monJumpTo = JumpTo::create(1, leftStand->getPosition() + Vec2(0, 40), 100, 1);
    auto monSpawn = Spawn::create(monScale, monJumpTo, NULL);

    _otherMon = Alphamon::createWithAlphabet(_otherMonChar);
    auto rightStand = _background->getChildByName(RIGHT_STAND_NAME);
    addChild(_otherMon);
    _otherMon->setPosition(rightStand->getPosition() + Vec2(2000, 40));
    _otherMon->setHealth(100, "red");
    
    
    auto otherMonJumpTo = MoveTo::create(1, rightStand->getPosition() + Vec2(0, 40));
    
    runAction(Sequence::create(TargetedAction::create(_myMon, monSpawn), TargetedAction::create(_otherMon, otherMonJumpTo), CallFunc::create(CC_CALLBACK_0(DuelScene::initial, this)), NULL));
    
}

void DuelScene::initial() {
    _menuContext->showStartupHelp(CC_CALLBACK_0(DuelScene::startMyTurn, this));
}

void DuelScene::appearOtherMon() {

}

void DuelScene::startMyTurn() {
    if(_myMon->getHealth() <= 0) {
        gameOver();
    } else if (_otherMon->getHealth() <= 0) {
        gameOver();
    } else {
        _turnNumber++;
        int numCols = MAX_COLS;
        int numRows = MAX_ROWS;
        
        if(_turnNumber < 3) {
            numCols /= 4;
            numRows /= 4;
        } else {
            numCols /= 2;
            numRows /= 2;
            _timerAnimation->setTimeSpeed(0.1);
        }
        auto charArray = CharGenerator::getInstance()->generateMatrixForChoosingAChar(_myMon->getAlphabet(), numRows, numCols, 50);
        _grid->resize(SQUARE_WIDTH * MAX_COLS, SQUARE_WIDTH * MAX_ROWS, numRows, numCols);
        _grid->setCharacters(charArray);
        _grid->enableTouch(false);
        _powerIncr = ceil(100.0 / _grid->getCountOfAlphabetsWhichMatch(_myMon->getAlphabet()));
        
        _timerAnimation->gotoFrameAndPause(1);
        auto moveTo = MoveTo::create(2.0, _timerPosition);
        auto elastic = EaseElasticOut::create(moveTo);
        auto timerCallback = CallFunc::create(CC_CALLBACK_0(cocostudio::timeline::ActionTimeline::play, _timerAnimation, "timer", false));
        auto gridCallback = CallFunc::create(CC_CALLBACK_0(AlphabetGrid::enableTouch, _grid, true));
        _timer->runAction(Sequence::create(elastic, gridCallback, timerCallback, NULL));
        _myMon->startMyTurn();
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
    _menuContext->showScore();
}

void DuelScene::armMyMon() {
    _grid->enableTouch(false);
    auto matchingAlphabets = _grid->getAlphabetsWhichMatch(_myMon->getAlphabet());
    for(auto alpha: matchingAlphabets) {
        auto particle = cocos2d::ParticleMeteor::create();
        particle->setPosition(convertToNodeSpace(alpha->getParent()->convertToWorldSpace(alpha->getPosition())));
        addChild(particle);
        auto myMonPosition = _myMon->getCenterPosition();
        if(LangUtil::getInstance()->getLang() == "kan") {
            myMonPosition = Vec2(myMonPosition.x, myMonPosition.y - 180);
        }
        auto moveTo = JumpTo::create(0.5, myMonPosition, 25.0, 1);
        auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::endMeteor, this, particle));
        
        auto sequence = Sequence::create(moveTo, callbackJump, NULL);
        particle->runAction(sequence);
        
    }
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto moveTimerTo = TargetedAction::create(_timer, EaseElasticIn::create(MoveTo::create(1.0, Vec2(_timerPosition.x, visibleSize.height + 150))));
    auto callbackAttack = CallFunc::create(CC_CALLBACK_0(DuelScene::attackOtherMon, this));
    auto callbackShowPower = TargetedAction::create(_myMon, CallFunc::create(CC_CALLBACK_0(Alphamon::showPower, _myMon, true)));
    
    this->runAction(Sequence::create(DelayTime::create(1), moveTimerTo, callbackShowPower, DelayTime::create(1), callbackAttack, nullptr));
}

void DuelScene::attackOtherMon() {
    auto particle = cocos2d::ParticleMeteor::create();
    
    auto monPosition = _myMon->getCenterPosition();
    if(LangUtil::getInstance()->getLang() == "kan") {
        monPosition = Vec2(monPosition.x, monPosition.y - 180);
    }

    particle->setPosition(monPosition);
    addChild(particle);

    monPosition = _otherMon->getCenterPosition();
    if(LangUtil::getInstance()->getLang() == "kan") {
        monPosition = Vec2(monPosition.x, monPosition.y - 180);
    }
    
    auto moveTo = TargetedAction::create(particle, JumpTo::create(0.5, monPosition, 25.0, 1));
    auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::endMeteor, this, particle));
    auto callbackAttack = CallFunc::create(CC_CALLBACK_0(DuelScene::armOtherMon, this));
    auto callbackReduceHP = CallFunc::create(CC_CALLBACK_0(DuelScene::reduceHP, this, _otherMon, _myMon->getPower() * MAX_POINTS_PER_TURN / 100));
    auto sequence = Sequence::create(moveTo, callbackJump, _otherMon->shakeAction(), callbackReduceHP, DelayTime::create(1.0), callbackAttack, NULL);
    runAction(sequence);
    _myMon->endMyTurn();
}

void DuelScene::armOtherMon() {
    auto otherPower = rand() % MAX_POINTS_PER_TURN;
    _otherMon->setPower(otherPower);
    auto callbackShowPower = CallFunc::create(CC_CALLBACK_0(Alphamon::showPower, _otherMon, false));
    auto callbackAttack = CallFunc::create(CC_CALLBACK_0(DuelScene::attackMyMon, this));
    auto sequence = Sequence::create(callbackShowPower, DelayTime::create(1.0),  callbackAttack, NULL);
    runAction(sequence);
}

void DuelScene::attackMyMon() {
    auto particle = cocos2d::ParticleMeteor::create();
    auto monPosition = _otherMon->getCenterPosition();
    if(LangUtil::getInstance()->getLang() == "kan") {
        monPosition = Vec2(monPosition.x, monPosition.y - 180);
    }
    
    particle->setPosition(monPosition);
    addChild(particle);
    
    monPosition = _myMon->getCenterPosition();
    if(LangUtil::getInstance()->getLang() == "kan") {
        monPosition = Vec2(monPosition.x, monPosition.y - 180);
    }

    auto moveTo = TargetedAction::create(particle, JumpTo::create(0.5, monPosition, 25.0, 1));
    auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::endMeteor, this, particle));
    auto callbackStart = CallFunc::create(CC_CALLBACK_0(DuelScene::startMyTurn, this));
    auto callbackReduceHP = CallFunc::create(CC_CALLBACK_0(DuelScene::reduceHP, this, _myMon, _otherMon->getPower()));
    auto callbackEndTurn = CallFunc::create(CC_CALLBACK_0(Alphamon::endMyTurn, _otherMon));
    auto sequence = Sequence::create(moveTo, callbackJump, _myMon->shakeAction(), callbackReduceHP, DelayTime::create(1.0), callbackEndTurn, callbackStart, NULL);
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
    if(_myMon->getAlphabet() == buf[0]) {
        _myMon->changePower(_powerIncr);
    } else {
        _myMon->changePower(-_powerIncr);
    }
    _menuContext->pickAlphabet(_myMon->getAlphabet(), buf[0], true);
}

void DuelScene::onAlphabetUnselected(EventCustom *event) {
    wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
    if(_myMon->getAlphabet() == buf[0]) {
        _myMon->changePower(-_powerIncr);
    } else {
        _myMon->changePower(_powerIncr);
    }
    _menuContext->pickAlphabet(_myMon->getAlphabet(), buf[0], false);
}
