//
//  Stroke.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include "Stroke.hpp"

USING_NS_CC;

Stroke::Stroke():_visibleHeight(0) {
    _visibleHeight = Director::getInstance()->getWinSize().height;
}

Stroke::~Stroke() {
    
}

void Stroke::addPoints(float x, float y) {
    //convert to lipi co-ordinate system    
    _points.push_back(Vec2(x, _visibleHeight - y));
}


int Stroke::getNumberOfPoints() {
    return _points.size();
}


Point Stroke::getPointAt(int index) {
    if(index < _points.size()) {
        return _points.at(index);
    }
    return Point::ZERO;
}
