//
//  Spirograph.cpp
//  safari
//
//  Created by Srikanth Talapadi on 18/08/16.
//
//

#include "Spirograph.h"
#include "../GameScene.h"

USING_NS_CC;

cocos2d::Scene* Spirograph::createScene() {
    auto layer = Spirograph::create();
    auto scene = GameScene::createWithChild(layer, "spirograph");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

Spirograph* Spirograph::create() {
    Spirograph* spirograph = new (std::nothrow) Spirograph();
    if(spirograph && spirograph->init())
    {
        spirograph->autorelease();
        return spirograph;
    }
    CC_SAFE_DELETE(spirograph);
    return nullptr;
}

Spirograph::Spirograph() :
_t(0.0)
{
}

Spirograph::~Spirograph() { }

bool Spirograph::init() {
    _step = 0.01;
    _R = random(0.1, 500.0);
    _r = random(0.1, 500.0);
    _rho = random(0.1, 500.0);
    _spirality = random(0.0, 1.0);
    _limit = rand() % 1000;
//    _R = 300.0;
//    _r = 50.0;
//    _rho = 30.0;
//    _spirality = 0.0;
//    _limit = 2;
    Size visibleSize = Director::getInstance()->getVisibleSize();
    _drawNode = DrawNode::create();
    _drawNode->setPosition(visibleSize.width / 2, visibleSize.height / 2);
    addChild(_drawNode);
    _pos = trace();
    _t = _step;
    scheduleUpdate();
    return true;
}

void Spirograph::update(float dt) {
    if(_t < _limit*2*M_PI){
        Vec2 newPos = trace();
        _drawNode->drawLine(_pos, newPos, Color4F::GREEN);
        _t += _step;
        _pos = newPos;
    }
}

Vec2 Spirograph::trace() {
    Vec2 p;
    float s = 1 + _spirality*(log(_t + 1.0) - 1.0);
    p.x = (_R - _r) * cos(_t) + _rho * cos((_R - _r) / _r * _t);
    p.y = (_R - _r) * sin(_t) - _rho * sin((_R - _r) / _r * _t);
    return s * p;
}

float Spirograph::random(float min, float max) {
//    return  (max - min) * ((((float) rand()) / (float) max)) + min ;
    return (min + 1) + (((float) rand()) / (float) RAND_MAX) * (max - (min + 1));
}
