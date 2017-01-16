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
    auto scene = GameScene::createWithChild(layer, "jasmine");
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

Spirograph::~Spirograph() {
//	audioBg->stopAllEffects();
}

bool Spirograph::init() {
	Size visibleSize = Director::getInstance()->getVisibleSize();

//	audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
//	audioBg->playEffect("jasmine/jasmin_background.ogg", true);


	auto node = CSLoader::createNode("jasmine/jasmine_win.csb");
	node->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
	node->setAnchorPoint(Vec2(.5, .5));
	addChild(node);

	_R = (node->getChildByName("outercircle_16")->getBoundingBox().size.width / 2) * 80/100;

	_innercircle1 = Sprite::createWithSpriteFrameName("jasmine/innercircle.png");
	_innercircle1->setPosition(Vec2(visibleSize.width * 30/100, visibleSize.height*70/100));
	_innercircle1->setScale(.2);
	addChild(_innercircle1);

	_innercircle2 = Sprite::createWithSpriteFrameName("jasmine/innercircle.png");
	_innercircle2->setPosition(Vec2(visibleSize.width * 70 / 100, visibleSize.height * 70 / 100));
	_innercircle2->setScale(.2);
	addChild(_innercircle2);

	_innercircle3 = Sprite::createWithSpriteFrameName("jasmine/innercircle.png");
	_innercircle3->setPosition(Vec2(visibleSize.width * 50 / 100, visibleSize.height * 15 / 100));
	_innercircle3->setScale(.2);
	addChild(_innercircle3);

    _drawNode = DrawNode::create();
    _drawNode->setPosition(visibleSize.width / 2, visibleSize.height / 2);
    addChild(_drawNode);
//	_drawNode->setLineWidth(5);


	auto _listener = EventListenerTouchOneByOne::create();
	_listener->setSwallowTouches(true);
	_listener->onTouchBegan = CC_CALLBACK_2(Spirograph::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, _innercircle1);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(_listener->clone(), _innercircle2);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(_listener->clone(), _innercircle3);

    return true;
}

void Spirograph::startGame()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	_step = 0.15;
	_r = 300;
	_rho = 300;
	_spirality = random(0.0, 1.0);
	_limit = rand() % 1000;

	_divPI = rand() % 10;

	_t = 0;
	_pos = trace();
	_pos.x = visibleSize.width / 100 + _pos.x;
	_pos.y = visibleSize.height / 100 + _pos.y;

	cx = visibleSize.width / 100;
	cy = visibleSize.height / 100;

	scheduleUpdate();

}

bool Spirograph::onTouchBegan(Touch *touch, Event *event)
{
	auto target = (event->getCurrentTarget());
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);

	if (rect.containsPoint(locationInNode))
	{
		_innercircle1->setVisible(false);
		_innercircle2->setVisible(false);
		_innercircle3->setVisible(false);
		_eventDispatcher->removeEventListenersForTarget(_innercircle1);
		_eventDispatcher->removeEventListenersForTarget(_innercircle2);
		_eventDispatcher->removeEventListenersForTarget(_innercircle3);

		startGame();
		return true;
	}
	return false;
}

void Spirograph::update(float dt) {
    if(_t < _limit/5*M_PI){
        Vec2 newPos = trace();
		newPos.x += cx;
		newPos.y += cy;

	    _drawNode->drawLine(_pos, newPos, Color4F(rand()% 255, rand() % 255, rand() % 255, rand() % 255));

        _t += M_PI/_divPI;
        _pos = newPos;
    }
	else
	{
		this->unscheduleUpdate();
		_menuContext->showScore();
	}
}

Vec2 Spirograph::trace() {
    Vec2 p;
    float s = 1 + _spirality*(log(_t + 1.0) - 1.0);
    p.x = (_R - _r) * cos(_t) + _rho * cos((_R - _r) / _r * _t);
    p.y = (_R - _r) * sin(_t) - _rho * sin((_R - _r) / _r * _t);
    return p;
}

float Spirograph::random(float min, float max) {
//    return  (max - min) * ((((float) rand()) / (float) max)) + min ;
    return (min + 1) + (((float) rand()) / (float) RAND_MAX) * (max - (min + 1));
}
