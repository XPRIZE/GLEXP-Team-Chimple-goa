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
#include "../WordSceneLipiTKNode.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

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

WordScene::WordScene():
_grid(nullptr),
_lipiTKResultMenu(nullptr),
_word(""),
_helpLayer(nullptr),
_helpGraphemeText(""),
_numTries(0)
{
}

WordScene::~WordScene() {
    this->getEventDispatcher()->removeCustomEventListeners("chars_recognized");
    this->getEventDispatcher()->removeCustomEventListeners("clearPrintedCharacters");
}

void WordScene::clearLipiTKResult() {
    if(_lipiTKResultMenu && _lipiTKResultMenu->getChildren().size() > 0)
    {
    Vector<Node*> items = _lipiTKResultMenu->getChildren();
    for (std::vector<Node*>::iterator it = items.begin() ; it != items.end(); ++it)
    {
        Node* item = *it;
        item->removeFromParent();
    }
    }
}

void WordScene::charactersRecognized(EventCustom* event) {
    _lipiTKResultMenu = Menu::create();
    _lipiTKResultMenu->setPosition(Vec2(1000, 800));
    
    std::vector<std::string>*messages = reinterpret_cast<std::vector<std::string>*>(event->getUserData());
    std::string resultChar;
    int i = 0;
    for (std::vector<std::string>::iterator it = messages->begin() ; it != messages->end(); ++it)
    {
        std::string alphabet = *it;
        std::transform(alphabet.begin(), alphabet.end(),alphabet.begin(), ::toupper);
        auto label = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), alphabet);
        label->setPosition(Vec2(i * 1000/(messages->size()), 15));
        label->setBMFontSize(150.0f);
        
        MenuItemLabel *menuItem = MenuItemLabel::create( label, CC_CALLBACK_1( WordScene::characterSelected, this ) );
        _lipiTKResultMenu->addChild(menuItem);
        i++;
    }
    addChild(_lipiTKResultMenu);
}

void WordScene::characterSelected(Ref *sender) {
    //CCLOG("res %s", res.c_str());
    MenuItemLabel* menuItem = static_cast<MenuItemLabel*>(sender);
    std::string text = menuItem->getString();
    if(!text.empty())
    {
        WordScene::textReceived(text);
        clearLipiTKResult();
        _lipiTKNode->removeFromParent();
        _handWritingDialogButton->setEnabled(true);

    }
    
}

bool WordScene::init() {
    _showHandWriting = false;
    return true;
}

bool WordScene::initWithWord(std::string word) {
    if(!Node::init()) {
        return false;
    }
    _word = word;
    return true;
    
}

void WordScene::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    _eventDispatcher->removeCustomEventListeners("grapheme_anim_done");
    _eventDispatcher->removeCustomEventListeners("chars_recognized");
    _eventDispatcher->removeCustomEventListeners("clearPrintedCharacters");
    
}

void WordScene::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();

    auto tg = TextGenerator::getInstance();
    if(_word.empty()) {
        int level = std::ceil(_menuContext->getCurrentLevel() / 8.0);
        level = MIN(level, 5);
        _word = tg->generateAWord(level);
    }
    _answerGraphemes = tg->getGraphemes(_word);
    _numGraphemes = _answerGraphemes.size();
    _menuContext->setMaxPoints(_numGraphemes * 2);
    _background = loadNode();
    addChild(_background);
    createAnswer();
    createChoice();
    createGrid();

    _eventDispatcher->addCustomEventListener("grapheme_anim_done", CC_CALLBACK_0(WordScene::checkAnswer, this));
    _eventDispatcher->addCustomEventListener("clearPrintedCharacters", CC_CALLBACK_0(WordScene::clearLipiTKResult, this));
    
    _eventDispatcher->addCustomEventListener("chars_recognized", CC_CALLBACK_1(WordScene::charactersRecognized, this));
    
    if(_menuContext->getCurrentLevel() == 1 && _score == 0) {
        auto children = _answer->getChildren();
        if(children.size() > 0) {
            auto word = children.at(0);
            auto bb = word->getBoundingBox();
            bb.origin = _answer->convertToWorldSpace(word->getPosition());
            _helpGraphemeText = _answerGraphemes.at(0);
            auto graphemeRect = _grid->getGraphemeRect(_helpGraphemeText);
            _helpLayer = HelpLayer::create(graphemeRect, bb);
            addChild(_helpLayer);
            _helpLayer->click(graphemeRect.origin);
        }
    }
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
    
//        if(_showHandWriting) {
//            createHandWritingButton();
//            _grid->setVisible(false);
//        }
		
}

void WordScene::createHandWritingButton() {
    std::string buttonNormalIcon = "menu/paper_pencil.png";
    std::string buttonDisabledIcon = "menu/dis_paper_pencil.png";
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    _handWritingDialogButton = ui::Button::create(buttonNormalIcon, buttonNormalIcon, buttonDisabledIcon);
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
    if(_helpLayer != nullptr) {
        if(grapheme->getGraphemeString().compare(_helpGraphemeText) == 0) {
            removeChild(_helpLayer);
            _helpLayer = nullptr;
            _helpGraphemeText = "";
        } else {
            return;
        }
    }
    processGrapheme(grapheme);
}

void WordScene::processGrapheme(Grapheme* grapheme) {
    if(grapheme->isSelected()) {
        int i = 0;
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == grapheme) {
                *it = std::pair<Node*, Grapheme*>((*it).first, nullptr);
                grapheme->selected(false);
                grapheme->setZOrder(0);
                grapheme->animateToPositionAndChangeBackground(grapheme->getPrevPosition());
                if(grapheme->getGraphemeString() == _answerGraphemes.at(i)) {
                    _menuContext->addPoints(-2);
                } else {
                    _menuContext->addPoints(1);
                }
//                if(_showHandWriting) {
//                    _handWritingDialogButton->setEnabled(true);
//                    clearLipiTKResult();
//                    //_lipiTKNode->removeFromParent();
//                    Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(grapheme);
//
//                }
                return;
            }
            i++;
        }
    } else {
        int i = 0;
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == nullptr) {
                auto targetNode = (*it).first;
                *it = std::pair<Node*, Grapheme*>(targetNode, grapheme);
                auto tPos = targetNode->getParent()->convertToWorldSpace(targetNode->getPosition());
                grapheme->selected(true);
                grapheme->setZOrder(1);
                grapheme->animateToPositionAndChangeBackground(_grid->convertToNodeSpace(tPos));
                if(_answerGraphemes.at(i) == grapheme->getGraphemeString()) {
                    _menuContext->addPoints(2);
                } else {
                    _menuContext->addPoints(-2);
                }
                return;
            }
            i++;
        }
    }
}

void WordScene::checkAnswer() {
    _numTries++;
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
//    if(correct) {
//        _menuContext->addPoints(_numGraphemes + _numGraphemes - _numTries);
//    }
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
                clickedButton->setEnabled(false);
                _lipiTKNode = WordSceneLipiTKNode::create(1000,1000,Vec2(clickedButton->getPosition().x, clickedButton->getPosition().y + 600));
                addChild(_lipiTKNode);
            } else {
                clickedButton->setEnabled(false);
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
            wordScene->_handWritingDialogButton->setEnabled(false);
            Grapheme* createGrapheme = Grapheme::create(text);
            createGrapheme->touchEndedCallback = CC_CALLBACK_2(WordScene::onHandWrittenAlphabetTouchEnded, wordScene);
            Size visibleSize = Director::getInstance()->getVisibleSize();
            createGrapheme->setPosition(Vec2(visibleSize.width/2, 400));
            wordScene->addChild(createGrapheme);
            wordScene->_grid->setVisible(false);
            wordScene->processGrapheme(createGrapheme);
            for (auto it = wordScene->_answerVector.begin() ; it != wordScene->_answerVector.end(); ++it) {
                if((*it).second == nullptr) {
                    wordScene->_handWritingDialogButton->setEnabled(true);
                }
            }
            
        }
    }
}


void WordScene::onHandWrittenAlphabetTouchEnded(Touch* touch, Event* event){
    Grapheme* grapheme = static_cast<Grapheme*>(event->getCurrentTarget());
    processGrapheme(grapheme);
}
