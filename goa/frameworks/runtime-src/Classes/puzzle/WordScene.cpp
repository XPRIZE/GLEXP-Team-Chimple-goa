//
//  WordScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//
#include <algorithm>
#include <string>
#include "WordScene.h"
#include "../GameScene.h"
#include "../lang/TextGenerator.h"
#include "GraphemeGrid.h"
#include "Grapheme.h"

USING_NS_CC;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
extern "C"
{
    jboolean Java_org_cocos2dx_javascript_AppActivity_sendRecognizedStringToGame(JNIEnv* env, jobject thiz,jstring textStr)
    {
        const char* str;
        str = env->GetStringUTFChars(textStr, NULL);
        std::string tempStr(str);
        if(!tempStr.empty()) {
            CCLOG("Received Character String %s", tempStr.c_str());
            WordScene::textReceived(tempStr);
        }
        
        return true;
    }
    
}
#endif


cocos2d::Scene* WordScene::createScene() {
    auto layer = WordScene::create();
    auto scene = GameScene::createWithChild(layer, "word");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

WordScene* WordScene::create() {
    WordScene* word = new (std::nothrow) WordScene();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

WordScene* WordScene::createWithWord(std::string wordStr) {
    WordScene* word = new (std::nothrow) WordScene();
    if(word && word->initWithWord(wordStr))
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

WordScene::WordScene():_grid(nullptr) {
    
}

WordScene::~WordScene() {
}

bool WordScene::init() {
    auto tg = TextGenerator::getInstance();
    auto word = tg->generateAWord();
    _showHandWriting = false;
    return initWithWord(word);
}

bool WordScene::initWithWord(std::string word) {
    if(!Node::init()) {
        return false;
    }
    _word = word;
    auto tg = TextGenerator::getInstance();
    _answerGraphemes = tg->getGraphemes(_word);
    _numGraphemes = _answerGraphemes.size();    
    _background = loadNode();
    addChild(_background);
    createAnswer();
    createChoice();
    createGrid();
    return true;
    
}

void WordScene::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    _eventDispatcher->removeCustomEventListeners("grapheme_anim_done");
}

void WordScene::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    _eventDispatcher->addCustomEventListener("grapheme_anim_done", CC_CALLBACK_0(WordScene::checkAnswer, this));
}

GraphemeGrid* WordScene::createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground)
{
	return GraphemeGrid::create(width, height, numRows, numCols, spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground);
}

void WordScene::createGrid() {
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _matrix = TextGenerator::getInstance()->generateMatrix(_word, getGridNumRows(), getGridNumCols());
        _grid = createGraphemeGrid(visibleSize.width, getGridHeight(), getGridNumRows(), getGridNumCols(), getGridBackground(), _matrix, getGraphemeUnselectedBackground(), getGraphemeSelectedBackground());
        auto unselBg = getGraphemeUnselectedBackground();
        if(!unselBg.empty()) {
            _grid->setGraphemeUnselectedBackground(unselBg);
        }
        auto selBg = getGraphemeSelectedBackground();
        if(!selBg.empty()) {
            _grid->setGraphemeSelectedBackground(selBg);
        }
        _grid->setPosition(0, 0);
        addChild(_grid);
        _grid->touchEndedCallback = CC_CALLBACK_2(WordScene::onTouchEnded, this);
    
        if(_showHandWriting) {
            createHandWritingButton();
            _grid->setVisible(false);
        }
}

void WordScene::createHandWritingButton() {
    std::string buttonNormalIcon = "menu/paper_pencil.png";
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    _handWritingDialogButton = ui::Button::create(buttonNormalIcon, buttonNormalIcon, buttonNormalIcon);
    _handWritingDialogButton->setPosition(Vec2(visibleSize.width/2, 400));
    _handWritingDialogButton->addTouchEventListener(CC_CALLBACK_2(WordScene::showHandWritingDialog, this));
    addChild(_handWritingDialogButton, 2);
   
}

int WordScene::getGridHeight() {
    return 600;
}

int WordScene::getGridNumRows() {
    return 2;
}

int WordScene::getGridNumCols() {
    return 8;
}

std::string WordScene::getGridBackground() {
    return "smash_de_rock/letter_correct.png";
}

std::string WordScene::getGraphemeUnselectedBackground() {
    return "";
}

std::string WordScene::getGraphemeSelectedBackground() {
    return "";
}


Node* WordScene::loadNode() {
    auto background = CSLoader::createNode("smash_de_rock/MainScene.csb");
    return background;
}

void WordScene::createAnswer() {
	Size visibleSize = Director::getInstance()->getVisibleSize();

    auto label = ui::Text::create();
    label->setString(_word);
    label->setFontSize(200);
    _answer = Node::create();
    _answer->addChild(label);
    _answer->setPosition(Vec2(visibleSize.width / 2, 1600));
    addChild(_answer);
    
}

void WordScene::createChoice() {
    _choice = Node::create();
    _choice->setPosition(Vec2(1280, 900));
    addChild(_choice);
    for (int i = 0; i < _numGraphemes; i++) {
        auto choiceNode = Node::create();
        choiceNode->setPosition(Vec2(i * 200, 0));
        addChoice(choiceNode);
    }
}

void WordScene::addChoice(Node* choice) {
    _answerVector.push_back(std::pair<Node*, Grapheme*>(choice, nullptr));
    _choice->addChild(choice);
}

void WordScene::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    auto grapheme = static_cast<Grapheme*>(event->getCurrentTarget());
    processGrapheme(grapheme);
}

void WordScene::processGrapheme(Grapheme* grapheme) {
    if(grapheme->isSelected()) {
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == grapheme) {
                *it = std::pair<Node*, Grapheme*>((*it).first, nullptr);
                grapheme->selected(false);
                grapheme->setZOrder(0);
                grapheme->animateToPositionAndChangeBackground(grapheme->getPrevPosition());
                return;
            }
        }
    } else {
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == nullptr) {
                auto targetNode = (*it).first;
                *it = std::pair<Node*, Grapheme*>(targetNode, grapheme);
                auto tPos = targetNode->getParent()->convertToWorldSpace(targetNode->getPosition());
                grapheme->selected(true);
                grapheme->setZOrder(1);
                grapheme->animateToPositionAndChangeBackground(_grid->convertToNodeSpace(tPos));
                return;
            }
        }
    }
}

void WordScene::checkAnswer() {
    if(_grid->getNumberOfActionsRunning() > 1) {
        return;
    }
    bool correct = true;
    for (auto i = 0; i < _answerGraphemes.size(); i++) {
        auto grapheme = _answerVector.at(i).second;
        if(grapheme == nullptr) {
            return;
        }
        if(grapheme->getGraphemeString() != _answerGraphemes.at(i)) {
            correct = false;
        }
    }
    gameOver(correct);
}

void WordScene::gameOver(bool correct) {
    if(correct) {
        _menuContext->showScore();        
    }
}

void WordScene::enableHandWriting() {
    _showHandWriting = true;
}

bool WordScene::isHandWritingEnabled() {
    return _showHandWriting;
}


void WordScene::showHandWritingDialog(Ref* pSender, ui::Widget::TouchEventType eEventType) {
    
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
            break;
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            bool processHandWriting = false;
            clickedButton->setEnabled(false);
            for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
                if((*it).second == nullptr) {
                    processHandWriting = true;
                }
            }
            if(processHandWriting)
            {
                _grid->setVisible(false);
                #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
                    cocos2d::JniMethodInfo methodInfo;
                    if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "drawCanvas", "(IIII)V")) {
                    return;
                    }
                    int x = 0;
                    int y = 0;
                    methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID, x, y, LAYOUT_CENTER_HORIZONTAL, LAYOUT_CENTER_VERTICAL);
                    methodInfo.env->DeleteLocalRef(methodInfo.classID);
                #else
                    WordScene::textReceived("A");
                #endif   
            }
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
}

void WordScene::textReceived(std::string text) {
    std::transform(text.begin(), text.end(),text.begin(), ::toupper);
    GameScene* gameScene = dynamic_cast<GameScene *>(Director::getInstance()->getRunningScene());
    if(gameScene) {
        WordScene* wordScene = dynamic_cast<WordScene *>(gameScene->getChildLayer());
        if(wordScene) {
            wordScene->_handWritingDialogButton->setEnabled(true);
            Grapheme* createGrapheme = Grapheme::create(text);
            createGrapheme->touchEndedCallback = CC_CALLBACK_2(WordScene::onHandWrittenAlphabetTouchEnded, wordScene);
            Size visibleSize = Director::getInstance()->getVisibleSize();
            createGrapheme->setPosition(Vec2(visibleSize.width/2, 400));
            wordScene->addChild(createGrapheme);
            wordScene->_grid->setVisible(false);
            wordScene->processGrapheme(createGrapheme);
        }
    }
}


void WordScene::onHandWrittenAlphabetTouchEnded(Touch* touch, Event* event){
    Grapheme* grapheme = static_cast<Grapheme*>(event->getCurrentTarget());
    processGrapheme(grapheme);
}
