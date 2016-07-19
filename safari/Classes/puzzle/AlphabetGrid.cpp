//
//  AlphabetGrid.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 24/06/16.
//
//

#include "AlphabetGrid.h"
#include "Alphabet.h"

USING_NS_CC;

AlphabetGrid::AlphabetGrid() :
_alphabetLayer(nullptr),
_labelLayer(nullptr)
{
}

AlphabetGrid::~AlphabetGrid() {}

AlphabetGrid *AlphabetGrid::create(GLfloat width, GLfloat height, int numRows, int numCols) {
    AlphabetGrid *alphabetGrid = new (std::nothrow) AlphabetGrid();
    if(alphabetGrid && alphabetGrid->initWithSize(width, height, numRows, numCols)) {
        alphabetGrid->autorelease();
        return alphabetGrid;
    }
    CC_SAFE_DELETE(alphabetGrid);
    return nullptr;
}

bool AlphabetGrid::initWithSize(GLfloat width, GLfloat height, int numRows, int numCols) {
    if (!Layer::init()) {
        return false;
    }
    resize(width, height, numRows, numCols);
    return true;
};

void AlphabetGrid::resize(GLfloat width, GLfloat height, int numRows, int numCols) {
    _numRows = numRows;
    _numCols = numCols;
    _width = width;
    _height = height;
    if(_labelLayer) {
        removeChild(_labelLayer);
    }
    _labelLayer = Node::create();
    addChild(_labelLayer);
    
    if(_alphabetLayer) {
        removeChild(_alphabetLayer);
    }
    _alphabetLayer = Node::create();
    addChild(_alphabetLayer);
    
    _alphabetMatrix.resize(numRows, std::vector<Alphabet *>(numCols));
    
    const float squareWidth = width / numCols;
    const float squareHeight = height / numRows;
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            auto label = LayerColor::create(((i+j) % 2 ? Color4B(0xE8, 0x9F, 0x69, 255.0f) : Color4B(0xD1, 0x86, 0x54, 255.0f)), squareWidth, squareHeight);
            label->setPosition(Vec2(j * squareWidth, i * squareHeight));
            _labelLayer->addChild(label);
        }
    }
}

void AlphabetGrid::setCharacters(std::vector<std::vector<char> > charArray) {
    _alphabetLayer->removeAllChildren();
    const float squareWidth = _width / _numCols;
    const float squareHeight = _height / _numRows;
    for (int i = 0; i < _numRows; i++) {
        for (int j = 0; j < _numCols; j++) {
            const float maxWidth = 600.0; //somehow OPENGL exception if more than this
            auto alphabet = Alphabet::createWithSize(charArray.at(i).at(j), std::min(squareWidth, maxWidth));
            alphabet->setPosition(Vec2(j * squareWidth + squareWidth/2, i * squareHeight + squareHeight/2));
            _alphabetLayer->addChild(alphabet, 1);
            _alphabetMatrix[i][j] = alphabet;
        }
    }    
}

std::vector<Alphabet *> AlphabetGrid::getAlphabetsWhichMatch(char a) {
    std::vector<Alphabet *> matchingAlphabets = std::vector<Alphabet *>();
    for (int i = 0; i < _numRows; i++) {
        for (int j = 0; j < _numCols; j++) {
            Alphabet *alpha = _alphabetMatrix[i][j];
            if(alpha->isSelected() && alpha->getChar() == a) {
                CCLOG("matched %c", alpha->getChar());
                matchingAlphabets.push_back(_alphabetMatrix[i][j]);
            }
        }
    }
    return matchingAlphabets;
}

int AlphabetGrid::getCountOfAlphabetsWhichMatch(char a) {
    int count = 0;
    for (int i = 0; i < _numRows; i++) {
        for (int j = 0; j < _numCols; j++) {
            Alphabet *alpha = _alphabetMatrix[i][j];
            if(alpha->getChar() == a) {
                count++;
            }
        }
    }
    return count;
}

void AlphabetGrid::enableTouch(bool value) {
    for (int i = 0; i < _numRows; i++) {
        for (int j = 0; j < _numCols; j++) {
            Alphabet *alpha = _alphabetMatrix[i][j];
            alpha->enableTouch(value);
        }
    }
    if(value) {
        if(_overlay) {
            removeChild(_overlay);
            _overlay = nullptr;
        }
    } else {
        _overlay = DrawNode::create();
        _overlay->drawSolidRect(Vec2::ZERO, Vec2(_width, _height), Color4F(128.0, 128.0, 128.0, 128.0));
        addChild(_overlay, 1);
    }
}
