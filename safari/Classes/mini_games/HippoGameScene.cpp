#include "HippoGameScene.h"
#include "HippoScene.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

HippoGame::HippoGame()
{
}

HippoGame::~HippoGame()
{
}

HippoGame * HippoGame::create()
{
	//Hippo* hippo = new (std::nothrow) Hippo();
	HippoGame* hippoGame = new(std::nothrow) HippoGame();
	if (hippoGame && hippoGame->init())
	{
		hippoGame->autorelease();
		return hippoGame;
	}
	CC_SAFE_DELETE(hippoGame);
	return nullptr;
}

cocos2d::Scene * HippoGame::createScene()
{
	auto layer = HippoGame::create();
	auto scene = GameScene::createWithChild(layer, "hippo");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

bool HippoGame::init()
{
	if (!Layer::init())
	{
		return false;
	}
	this->addChild(LayerGradient::create(Color4B(255, 219, 161, 255), Color4B(255, 255, 255, 255)), 0);
	auto node = CSLoader::createNode("hippo/hippo.csb");
	this->addChild(node);
	_buildingLayer = Layer::create();
	_buildingLayer->setPositionX(0);
	this->addChild(_buildingLayer);
	auto test1 = (Node *)LayerColor::create(Color4B(255, 255, 255, 200.0));
	test1->setContentSize(Size(Director::getInstance()->getVisibleSize().width, 600));
	this->addChild(test1,1);
	_xPos = 0;
	_yPos = 900;
	createBuilding();
	return true;
}

void HippoGame::createBuilding()
{
	while (_xPos < 1280.0f) {
		auto build1 = Sprite::createWithSpriteFrameName("hippo/b3.png");
		build1->setPosition(Vec2(_xPos, _yPos));
		build1->setAnchorPoint(Vec2(0, 1));
		_buildingLayer->addChild(build1);
		//	buildingLayer2->addChild(build1);
		auto build2 = Sprite::createWithSpriteFrameName("hippo/b3.png");
		build2->setPosition(Vec2(build1->getContentSize().width  + build1->getPositionX(), _yPos));
		build2->setAnchorPoint(Vec2(0, 1));
		_buildingLayer->addChild(build2);
		//	buildingLayer2->addChild(build2);
		_xPos = build2->getContentSize().width  + build2->getPositionX();
	}
	stringGap();
}

void HippoGame::buildingMovingAction()
{
	auto moveTo = MoveBy::create(7, Vec2(-500, 0));
	_buildingLayer->runAction(moveTo);
	runAction(Sequence::create(TargetedAction::create(_buildingLayer, moveTo), CallFunc::create([=]() {
		auto hippo = new (std::nothrow) Hippo();
		hippo->_stringPositionX1 = _stringPositionX;
		hippo->_stringPositionY1 = _stringPositionY;
		hippo->_gapNodes1 = _gapNodes;
		hippo->init();
		this->addChild(hippo, 1);
		
	}), NULL));
	
}

void HippoGame::stringGap()
{
	int randomNumber = 6;
	while (randomNumber != 0) {
		auto gap = Sprite::createWithSpriteFrameName("hippo/button.png");
		gap->setPosition(Vec2(_xPos , _yPos));
	//	gap->setAnchorPoint(Vec2(0, 1));
		_stringPositionX.push_back(_xPos );
		_stringPositionY.push_back(_yPos);
		_gapNodes.push_back((Node*)gap);
	//	gap->setVisible(false);
		_buildingLayer->addChild(gap);
		//	buildingLayer2->addChild(gap);
		_xPos = gap->getContentSize().width + gap->getPositionX() ;
		//if (str.compare("stright") == 0) {
		//	//no change
		//}
		//else if (str.compare("up") == 0) {
			_yPos = gap->getContentSize().height/2.5 + gap->getPositionY();
		//}
		//else if (str.compare("down") == 0) {
		//	yPos = -gap->getContentSize().height + gap->getPositionY();
		//}
		//yPos			= gap->getContentSize().height + gap->getPositionY();
		randomNumber--;
	}
	_xPos = _xPos + 100;
	buildingMovingAction();
}
