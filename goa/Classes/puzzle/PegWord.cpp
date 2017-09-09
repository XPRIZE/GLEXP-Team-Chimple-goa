//
//  PegWord.cpp
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#include "PegWord.h"
#include "../menu/GameScene.h"
#include "../lang/TextGenerator.h"

USING_NS_CC;

cocos2d::Scene* PegWord::createScene() {
    auto layer = PegWord::create();
    auto scene = GameScene::createWithChild(layer, "peg");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

PegWord* PegWord::create() {
    PegWord* word = new (std::nothrow) PegWord();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

PegWord* PegWord::createWithWord(std::string wordStr) {
    PegWord* word = new (std::nothrow) PegWord();
    if(word && word->initWithWord(wordStr))
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

PegWord::PegWord() {
    
}

PegWord::~PegWord() {
    
}

int PegWord::getGridHeight() {
    return 600;
}

int PegWord::getGridNumRows() {
    return 1;
}

int PegWord::getGridNumCols() {
    return _numGraphemes;
}

std::string PegWord::getGridBackground() {
    return "";
}

void PegWord::createAnswer() {
    _answer = Node::create();
    addChild(_answer);
}

void PegWord::createGrid() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    std::vector<std::vector<std::string>> _matrix;
    _matrix.push_back(TextGenerator::getInstance()->getGraphemes(_word));
    _grid = createGraphemeGrid(visibleSize.width, getGridHeight(), getGridNumRows(), getGridNumCols(), getGridBackground(), _matrix, getGraphemeUnselectedBackground(), getGraphemeSelectedBackground());
    auto unselBg = getGraphemeUnselectedBackground();
    if(!unselBg.empty()) {
        _grid->setGraphemeUnselectedBackground(unselBg);
    }
    auto selBg = getGraphemeSelectedBackground();
    if(!selBg.empty()) {
        _grid->setGraphemeSelectedBackground(selBg);
    }
    _grid->setPosition(Vec2(0, visibleSize.height / 2));
    addChild(_grid);
    _grid->touchEndedCallback = CC_CALLBACK_2(WordScene::onTouchEnded, this);
}

void PegWord::createChoice() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    const float width = visibleSize.width / _numGraphemes;
    _choice = Node::create();
    _choice->setPosition(Vec2(0, visibleSize.height / 2));
    addChild(_choice);
    for (int i = 0; i < _numGraphemes; i++) {
        auto choiceNode = ui::Text::create();
        choiceNode->setFontSize(600);
        choiceNode->setTextColor(Color4B(209, 157, 113, 255));
        choiceNode->setString(_answerGraphemes.at(i));
        choiceNode->setPosition(Vec2((i + 0.5) * width, 0));
        addChoice(choiceNode);
    }
}

Node* PegWord::loadNode() {
    auto background = CSLoader::createNode("common_screen/MainScene.csb");
    return background;
}


GraphemeGrid* PegWord::createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground)
{
    return PegGrid::create(width, height, numRows, numCols, spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground);
}

void PegWord::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    auto grapheme = static_cast<PegGrapheme*>(event->getCurrentTarget());
    auto graphemeText = grapheme->getTextInGrapheme();
    auto graphemeRect = graphemeText->getBoundingBox();
    auto graphemeRectInWorld = Rect(grapheme->convertToWorldSpace(graphemeRect.origin), Size(graphemeRect.size.width / 2, graphemeRect.size.height / 4));

    for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
        if((*it).second == grapheme) {
            *it = std::pair<Node*, Grapheme*>((*it).first, nullptr);
        }
    }
    int i = 0;
    for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
        if((*it).second == nullptr) {
            auto targetNode = (*it).first;
            auto targetRect = targetNode->getBoundingBox();
            auto targetRectInWorld = Rect(targetNode->getParent()->convertToWorldSpace(targetRect.origin), Size(targetRect.size.width / 2, targetRect.size.height / 4));
            if(graphemeRectInWorld.intersectsRect(targetRectInWorld)) {
                if(grapheme->getGraphemeString() == _answerGraphemes.at(i)) {
                    *it = std::pair<Node*, Grapheme*>(targetNode, grapheme);
                    auto tPos = targetNode->getParent()->convertToWorldSpace(targetNode->getPosition());
                    grapheme->animateToPositionAndChangeBackground(_grid->convertToNodeSpace(tPos));
                } else {
                    grapheme->animateToPositionAndChangeBackground(grapheme->getUnoccupiedRandomLocation());
                }
                return;
            }
        }
        i++;
    }
}


/////////////////////////////////////////////////////////////////////////
//                           PegGrid                                   //
/////////////////////////////////////////////////////////////////////////

PegGrid* PegGrid::create(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) {
    PegGrid *graphemeGrid = new (std::nothrow) PegGrid();
    if(graphemeGrid && graphemeGrid->init(width, height, numRows, numCols,  spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground)) {
        graphemeGrid->autorelease();
        return graphemeGrid;
    }
    CC_SAFE_DELETE(graphemeGrid);
    return nullptr;
    
}

bool PegGrid::init(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) {
    if (!GraphemeGrid::init(width, height, numRows, numCols,  spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground)) {
        return false;
    }
    return true;
}

void PegGrid::resize(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<std::string>> graphemes) {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    const float squareWidth = visibleSize.width / numCols;
    _numRows = numRows;
    _numCols = numCols;
    _width = width;
    _height = height;
    _graphemeMatrix.clear();
    _graphemeMatrix.resize(numRows, std::vector<Grapheme*>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            auto grapheme = createGrapheme(graphemes.at(i).at(j));
            addChild(grapheme);
            grapheme->setPosition(Vec2((j + 0.5) * squareWidth, 0));
            grapheme->touchEndedCallback = CC_CALLBACK_2(GraphemeGrid::onTouchEnded, this);
            _graphemeMatrix.at(i).at(j) = grapheme;
        }
    }
}


Grapheme* PegGrid::createGrapheme(std::string graphemeString, float size) {
    return PegGrapheme::create(graphemeString);
}

/////////////////////////////////////////////////////////////////////////
//                           PegGrapheme                               //
/////////////////////////////////////////////////////////////////////////

PegGrapheme* PegGrapheme::create(std::string graphemeString) {
    PegGrapheme *grapheme = new (std::nothrow) PegGrapheme();
    if(grapheme && grapheme->init(graphemeString)) {
        grapheme->autorelease();
        return grapheme;
    }
    CC_SAFE_DELETE(grapheme);
    return nullptr;
}

bool PegGrapheme::init(std::string graphemeString) {
    if(!Grapheme::init(graphemeString)) {
        return false;
    }
    _text->setFontSize(600);
    _newPosition = Vec2::ZERO;
    return true;
}

void PegGrapheme::onEnterTransitionDidFinish() {
    Grapheme::onEnterTransitionDidFinish();
    _eventDispatcher->pauseEventListenersForTarget(this);
    _newPosition = getUnoccupiedRandomLocation();
    auto moveTo = MoveTo::create(1.0, _newPosition);
    auto callback = CallFunc::create(CC_CALLBACK_0(PegGrapheme::initialAnimationDone, this));
    runAction(Sequence::create(moveTo, callback, NULL));
}

void PegGrapheme::initialAnimationDone() {
    _eventDispatcher->resumeEventListenersForTarget(this);
}

bool PegGrapheme::onTouchBegan(Touch* touch, Event* event){
    return Grapheme::onTouchBegan(touch, event);
}

void PegGrapheme::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    Grapheme::onTouchEnded(touch, event);
    
}

void PegGrapheme::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
    Grapheme::onTouchMoved(touch, event);
    auto n = getParent()->convertTouchToNodeSpace(touch);
    setPosition(n);
}

Vec2 PegGrapheme::getRandomLocation() {
    float x = 256 + rand() % 2304;
    float y = 200 - rand() % 400;
    if(y < 0) {
        y -= 400;
    } else {
        y += 400;
    }
    return Vec2(x, y);
}

Vec2 PegGrapheme::getUnoccupiedRandomLocation() {
    bool empty = true;
    Vec2 loc;
    do {
        loc = getRandomLocation();
        auto bb = getTextInGrapheme()->getBoundingBox();
        bb.origin = loc;
        empty = true;
        auto children = getParent()->getChildren();
        for (auto it = children.begin() ; it != children.end(); ++it) {
            auto grapheme = dynamic_cast<PegGrapheme* >(*it);
            if(grapheme && this != grapheme) {
                auto graphemeBb = grapheme->getTextInGrapheme()->getBoundingBox();
                if(bb.intersectsRect(graphemeBb)) {
                    empty = false;
                }
                graphemeBb.origin = grapheme->_newPosition;
                if(bb.intersectsRect(graphemeBb)) {
                    empty = false;
                }
            }
        }
    } while (!empty);
    return loc;
}

void PegGrapheme::changeBackground() {
    Grapheme::changeBackground();
    
}
