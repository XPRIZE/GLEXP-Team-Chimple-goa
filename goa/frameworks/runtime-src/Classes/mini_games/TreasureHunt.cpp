#include "TreasureHunt.h"
#include "../WordSceneLipiTKNode.h"
#include "TreasureHuntNode.h"

USING_NS_CC;

Scene* TreasureHunt::createScene()
{
	auto scene = Scene::create();
	auto layer = TreasureHunt::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, TreasureHunt::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

TreasureHunt *TreasureHunt::create() {
	TreasureHunt *blast = new (std::nothrow) TreasureHunt();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool TreasureHunt::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void TreasureHunt::onEnterTransitionDidFinish() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	//Added bg
	auto bg = CSLoader::createNode("box/box.csb");

	bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	bg->setAnchorPoint(Vec2(0.5, 0.5));
	addChild(bg, 0);

	//Adding bubble animation and running it
	cocostudio::timeline::ActionTimeline * bubble =  CSLoader::createTimeline("box/bubble.csb");
	bg->runAction(bubble);
	bubble->play("bubble", true);

	//auto bgLayerGradient = LayerGradient::create(Color4B(25, 115, 155, 55), Color4B(255, 255, 255, 255));
	//this->addChild(bgLayerGradient, 0);

	std::vector<TreasureHuntNode*> TreasureHuntNodeObj;
	TreasureHuntNodeObj.resize(6);

	std::vector<Sprite*> boxes;
	boxes.resize(6);

	std::vector<Sprite*> layer;
	layer.resize(6);

	auto coord = getAllGridCoord(1, 6);

	for (size_t coordIndex = 0; coordIndex < coord.size(); coordIndex++) {
		TreasureHuntNodeObj[coordIndex] = TreasureHuntNode::create(350, 380, Vec2(coord.at(coordIndex).second, coord.at(coordIndex).first));
		addChild(TreasureHuntNodeObj[coordIndex]);
		std::ostringstream stringStream;
		stringStream << (coordIndex + 1);
		TreasureHuntNodeObj[coordIndex]->setName(stringStream.str());

		boxes[coordIndex] = Sprite::createWithSpriteFrameName("box/box1.png");
		boxes[coordIndex]->setPosition(Vec2(coord.at(coordIndex).second, coord.at(coordIndex).first + 450));
		boxes[coordIndex]->setAnchorPoint(Vec2(0.5, 0.5));
		boxes[coordIndex]->setScaleX(0.8);
		boxes[coordIndex]->setScaleY(0.8);
		boxes[coordIndex]->setName(stringStream.str());
		this->addChild(boxes[coordIndex], 1);

		layer[coordIndex] = Sprite::create();
		layer[coordIndex]->setName(stringStream.str());
		layer[coordIndex]->setTextureRect(Rect(0, 0, 350, 380));
		layer[coordIndex]->setAnchorPoint(Vec2(0.5, 0.5));
		layer[coordIndex]->setColor(Color3B::WHITE);
		layer[coordIndex]->setOpacity(GLubyte(6));
		layer[coordIndex]->setPosition(Vec2(coord.at(coordIndex).second, coord.at(coordIndex).first));
		this->addChild(layer[coordIndex], 10);

	}
	this->removeChild(layer[0], 4);
	this->scheduleUpdate();

}

std::vector<std::pair<int, int>> TreasureHunt::getAllGridCoord(int rowData, int columnData)
{
	std::vector<std::pair<int, int>> coord;
	auto win = Director::getInstance()->getVisibleSize();
	int gridWidth = win.width / (columnData + 1), gridHeight = win.height / (rowData + 1);
	int rowCoord = 0, columnCoord = 0;

	for (int row = 0; row < rowData; row++) {
		rowCoord = rowCoord + gridHeight;
		for (int column = 0; column < columnData; column++) {
			columnCoord = columnCoord + gridWidth;
			coord.push_back(std::make_pair(win.height - rowCoord, columnCoord));
		}
		columnCoord = 0;
	}
	return coord;
}

void TreasureHunt::update(float delta) {

	if (checkRecognizeLetter("A")) {
		_menuContext->showScore();
	}
	else {
		_result = ((TreasureHuntNode *)this->getChildByName("1"))->getPosibileCharacter();
	}

}

bool TreasureHunt::checkRecognizeLetter(string letter)
{
	for (size_t i = 0; i < _result.size(); i++) {
		if (_result.at(i).compare(letter) == 0) {
			return true;
		}
	}
	return false;
}

TreasureHunt::~TreasureHunt(void)
{
	this->removeAllChildrenWithCleanup(true);
}