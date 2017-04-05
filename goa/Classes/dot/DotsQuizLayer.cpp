//
//  DotsQuizLayer.cpp
//  goa
//
//  Created by Srikanth Talapadi on 03/04/17.
//
//

#include "DotsQuizLayer.hpp"

USING_NS_CC;

DotsQuizLayer* DotsQuizLayer::create() {
    DotsQuizLayer *dotsQuizLayer = new (std::nothrow) DotsQuizLayer();
    if(dotsQuizLayer && dotsQuizLayer->init()) {
        dotsQuizLayer->autorelease();
        return dotsQuizLayer;
    }
    CC_SAFE_DELETE(dotsQuizLayer);
    return nullptr;
}

DotsQuizLayer::DotsQuizLayer() {
    
}
DotsQuizLayer::~DotsQuizLayer() {
    
}
bool DotsQuizLayer::init() {
    if(!Node::init()) {
        return false;
    }
    return true;
}
