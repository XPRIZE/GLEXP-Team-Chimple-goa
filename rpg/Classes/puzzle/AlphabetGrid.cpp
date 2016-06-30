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

AlphabetGrid::AlphabetGrid() {}

AlphabetGrid::~AlphabetGrid() {}

AlphabetGrid *AlphabetGrid::create(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<char>> charArray) {
    AlphabetGrid *alphabetGrid = new (std::nothrow) AlphabetGrid();
    if(alphabetGrid && alphabetGrid->initWithSize(width, height, numRows, numCols, charArray)) {
        alphabetGrid->autorelease();
        return alphabetGrid;
    }
    CC_SAFE_DELETE(alphabetGrid);
    return nullptr;
}

bool AlphabetGrid::initWithSize(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<char>> charArray) {
    if (!Layer::init()) {
        return false;
    }
    const float squareWidth = width / numRows;
    const float squareHeight = height / numCols;
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            auto labelLayer = LayerColor::create(((i+j) % 2 ? Color4B::GRAY : Color4B::YELLOW), squareWidth, squareHeight);
            labelLayer->setPosition(Vec2(j * squareWidth, i * squareHeight));
            this->addChild(labelLayer);
            
            auto label = Alphabet::createWithSize(charArray.at(i).at(j), 96);
            
            label->setPosition(Vec2(squareWidth / 2, squareHeight / 2));
            labelLayer->addChild(label, 1);
        }
    }
    
    return true;
};
