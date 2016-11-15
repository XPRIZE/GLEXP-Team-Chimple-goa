#include "Units.h"


USING_NS_CC;

Scene* Units::createScene()
{
	auto scene = Scene::create();
	auto layer = Units::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Units::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

Units *Units::create() {
	Units *units = new (std::nothrow) Units();
	if (units && units->init()) {
		units->autorelease();
		return units;
	}
	CC_SAFE_DELETE(units);
	return nullptr;

}

bool Units::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void Units::onEnterTransitionDidFinish() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();


	if (_menuContext->getCurrentLevel() == 1) {

		//gameHelpLayer();

	}

	_menuContext->setMaxPoints(1);

	_bg = CSLoader::createNode("unit/unit.csb");
	_bg->setName("bg");
	_bg->setAnchorPoint(Vec2(0.5, 0.5));
	_bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//bg->setScale(0.5, 0.5);
	this->addChild(_bg);

	
	float delay = 0.5;
	outlet_1 = _bg->getChildByName("outlet_1")->getPosition();
	outlet_2 = _bg->getChildByName("outlet_2")->getPosition();

	_pizza = CSLoader::createNode("unit/pizza.csb");

	_pizza->setAnchorPoint(Vec2(0.5, 0.5));
	_pizza->setPosition(Vec2(visibleSize.width / 2 + origin.x, outlet_2.y - 550 + origin.y));
	//bg->setScale(0.5, 0.5);
	this->addChild(_pizza);

	for (int i = 1; i <= 10; i++) {
		createOrder(i);
		//delay = delay + 0.5;
		//DelayTime::create(delay);
	}

}



Units::~Units(void)
{
	this->removeAllChildrenWithCleanup(true);
}




void Units::gameHelpLayer()
{


	Size visibleSize = Director::getInstance()->getVisibleSize();
	_help = HelpLayer::create(Rect(visibleSize.width / 2, visibleSize.height / 2, visibleSize.width / 2.8, visibleSize.height * 0.4), Rect(0, 0, 0, 0));
	std::vector <Point> points;
	float boxWidth = (visibleSize.width / 2.8) / 2;
	float boxHeight = (visibleSize.height * 0.4) / 2;
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2, visibleSize.height / 2 + boxHeight*0.7));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	_help->writing(points);
	this->addChild(_help);
	_help->setName("gameHelpLayer");
}


void Units::createOrder(int id) {

	float time = 0.5;
	std::ostringstream sstreamb;
	sstreamb << "pizzatoppings_" << id;
	std::string queryb = sstreamb.str();

	auto moveObjectToOutletOne = MoveTo::create(time, outlet_1);
	auto moveObjectToOutletTwo = MoveTo::create(time, outlet_2);
	
	auto moveObjectToOrderContainer = MoveTo::create(time, Vec2(_pizza->getPosition()) + _pizza->getChildByName(queryb)->getPosition());
	

	Sprite * newObject = (Sprite*)_bg->getChildByName(queryb);

	auto switchParentSequence = CallFunc::create([=] {
		
		//_bg->getChildByName(queryb)->removeFromParent();
		//removeChild(_bg->getChildByName(queryb));
		//_bg->reorderChild(_bg->getChildByName(queryb), 4);
		_bg->getChildByName(queryb)->setGlobalZOrder(4);
		//object->removeFromParent();

	});


	auto addCookieToPizzaSequence = CallFunc::create([=] {

		//_bg->getChildByName(queryb)->removeFromParent();
		//removeChild(_bg->getChildByName(queryb));
		//_bg->reorderChild(_bg->getChildByName(queryb), 4);
		//_bg->getChildByName(queryb)->setGlobalZOrder(4);
		//object->removeFromParent();
		//_pizza->getChildByName(queryb)->addChild(_bg->getChildByName(queryb));

	});

	auto moveSequenceOne = Sequence::create(moveObjectToOutletOne, switchParentSequence,moveObjectToOutletTwo, moveObjectToOrderContainer, NULL);
	_bg->getChildByName(queryb)->runAction(moveSequenceOne);
	
	//std::chrono::seconds duration(3);
	//std::this_thread::sleep_for(duration); // Sleep for 1 seconds.

	//auto moveSequenceTwo = Sequence::create(moveObjectToOrderContainer, NULL);
	//newObject->runAction(moveSequenceTwo);

	//auto mainSequence = Sequence::create(sequenceOne, sequenceTwo,  NULL);
	//_bg->runAction(mainSequence);
	


	
	

}