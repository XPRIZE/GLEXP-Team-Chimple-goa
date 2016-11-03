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

	auto bgLayerGradient = LayerGradient::create(Color4B(25, 115, 155, 55), Color4B(255, 255, 255, 255));
	this->addChild(bgLayerGradient, 0);

	TreasureHuntNode* TreasureHuntNodeObj;


	for (size_t coordIndex = 0; coordIndex < coord.size(); coordIndex++) {
		TreasureHuntNodeObj = TreasureHuntNode::create(500, 500, Vec2(coord.at(coordIndex).second, coord.at(coordIndex).first));
		addChild(TreasureHuntNodeObj);
		std::ostringstream stringStream;
		stringStream << "Node" << (coordIndex + 1);
		TreasureHuntNodeObj->setName(stringStream.str());
	}

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

	if (checkRecognizeLetter()) {
		_menuContext->showScore();
	}
	else {
		_result = ((TreasureHuntNode *)this->getChildByName("Node1"))->getPosibileCharacter();
	}

}

bool TreasureHunt::checkRecognizeLetter()
{
	for (size_t i = 0; i < _result.size(); i++) {
		if (_result.at(i).compare("A") == 0) {
			return true;
		}
	}
	return false;
}

TreasureHunt::~TreasureHunt(void)
{
	this->removeAllChildrenWithCleanup(true);
}
