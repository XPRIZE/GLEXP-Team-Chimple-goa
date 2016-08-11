//
//  PegWord.cpp
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#include "PegWord.h"
#include "../GameScene.h"

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
    WordScene::createGrid();
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
        choiceNode->setString(_answerGraphemes.at(i));
        choiceNode->setPosition(Vec2((i + 0.5) * width, 0));
        addChoice(choiceNode);
    }
}

Node* PegWord::loadNode() {
    auto background = CSLoader::createNode("farmhouse/farmhouse.csb");
    background->setPosition(Vec2(-2560, 0));
    return background;
}


GraphemeGrid* PegWord::createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground)
{
    return PegGrid::create(width, height, numRows, numCols, spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground);
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

Grapheme* PegGrid::createGrapheme(std::string graphemeString) {
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
    return true;
}
