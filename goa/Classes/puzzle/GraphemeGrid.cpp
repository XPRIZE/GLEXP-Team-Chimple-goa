//
//  GraphemeGrid.cpp
//  safari
//
//  Created by Srikanth Talapadi on 07/08/16.
//
//

#include "GraphemeGrid.h"
#include "ui/CocosGUI.h"
#include "WordScene.h"
#include "Grapheme.h"

USING_NS_CC;

GraphemeGrid::GraphemeGrid() :
touchBeganCallback(NULL),
touchMovedCallback(NULL),
touchEndedCallback(NULL)
{
    _graphemeUnselectedBackground = "";
    _graphemeSelectedBackground = "";    
}

GraphemeGrid::~GraphemeGrid() {
}

GraphemeGrid* GraphemeGrid::create(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) {
    GraphemeGrid *graphemeGrid = new (std::nothrow) GraphemeGrid();
    if(graphemeGrid && graphemeGrid->init(width, height, numRows, numCols,  spriteName, graphemes, graphemeUnselectedBackground, graphemeSelectedBackground)) {
        graphemeGrid->autorelease();
        return graphemeGrid;
    }
    CC_SAFE_DELETE(graphemeGrid);
    return nullptr;

}

bool GraphemeGrid::init(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) {
    if (!Layer::init()) {
        return false;
    }
    _spriteName = spriteName;
    _graphemeUnselectedBackground = graphemeUnselectedBackground;
    _graphemeSelectedBackground = graphemeSelectedBackground;
    _tileLayer = Node::create();
    addChild(_tileLayer);
    resize(width, height, numRows, numCols, graphemes);
    return true;
    
}

void GraphemeGrid::resize(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<std::string>> graphemes) {
    _numRows = numRows;
    _numCols = numCols;
    _width = width;
    _height = height;
    
    const float squareWidth = width / numCols;
    const float squareHeight = height / numRows;
    _graphemeMatrix.clear();
    _graphemeMatrix.resize(numRows, std::vector<Grapheme*>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            if(!_spriteName.empty()) {
                auto tile = Sprite::createWithSpriteFrameName(_spriteName);
                tile->setPosition(Vec2((j + 0.5) * squareWidth, (i + 0.5) * squareHeight));
                _tileLayer->addChild(tile);
            }
            auto grapheme = createAndAddGrapheme(graphemes.at(i).at(j));
            grapheme->setPosition(Vec2((j + 0.5) * squareWidth, (i + 0.5) * squareHeight));
            grapheme->touchEndedCallback = CC_CALLBACK_2(GraphemeGrid::onTouchEnded, this);
            _graphemeMatrix.at(i).at(j) = grapheme;
        }
    }
}

Rect GraphemeGrid::getGraphemeRect(std::string alphabet) {
    for (int i = 0; i < _numRows; i++) {
        for (int j = 0; j < _numCols; j++) {
            if(_graphemeMatrix.at(i).at(j)->getGraphemeString() == alphabet) {
                const float squareWidth = _width / _numCols;
                const float squareHeight = _height / _numRows;
                
                return Rect((j + 0.5) * squareWidth, (i + 0.5) * squareHeight, squareWidth, squareHeight);
            }
        }
    }
    return Rect::ZERO;
}


void GraphemeGrid::setGraphemeSelectedBackground(std::string spriteName) {
    _graphemeSelectedBackground = spriteName;
}

void GraphemeGrid::setGraphemeUnselectedBackground(std::string spriteName) {
    _graphemeUnselectedBackground = spriteName;
}

Grapheme* GraphemeGrid::createGrapheme(std::string graphemeString) {
	return Grapheme::create(graphemeString);
}

Grapheme* GraphemeGrid::createAndAddGrapheme(std::string graphemeString) {
	auto grapheme = createGrapheme(graphemeString);
    addChild(grapheme);
    if(!_graphemeUnselectedBackground.empty()) {
        auto bg = Sprite::createWithSpriteFrameName(_graphemeUnselectedBackground);
        grapheme->setUnselectedBackground(bg);
    }
    if(!_graphemeSelectedBackground.empty()) {
        auto bg = Sprite::createWithSpriteFrameName(_graphemeSelectedBackground);
        grapheme->setSelectedBackground(bg);
    }
    return grapheme;
}

int GraphemeGrid::getNumberOfActionsRunning() {
    int num = 0;
    for (int i = 0; i < _numRows; i++) {
        for (int j = 0; j < _numCols; j++) {
            num += _actionManager->getNumberOfRunningActionsInTarget(_graphemeMatrix.at(i).at(j));
        }
    }
    return num;
}

bool GraphemeGrid::onTouchBegan(Touch* touch, Event* event){
    if(touchBeganCallback) {
        return touchBeganCallback(touch, event);
    }
    return true;
}

void GraphemeGrid::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(touchEndedCallback) {
        touchEndedCallback(touch, event);
    }
}

void GraphemeGrid::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(touchMovedCallback) {
        touchMovedCallback(touch, event);
    }
}
