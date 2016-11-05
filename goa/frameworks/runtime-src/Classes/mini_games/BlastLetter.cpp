#include "BlastLetter.h"
#include "../WordSceneLipiTKNode.h"
#include "BlastLetterNode.h"
#include "../lang/TextGenerator.h"

USING_NS_CC;

Scene* BlastLetter::createScene()
{
	auto scene = Scene::create();
	auto layer = BlastLetter::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BlastLetter::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BlastLetter *BlastLetter::create() {
	BlastLetter *blast = new (std::nothrow) BlastLetter();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool BlastLetter::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BlastLetter::onEnterTransitionDidFinish() {

	auto bgLayerGradient = LayerGradient::create(Color4B(25, 5, 55, 55), Color4B(255, 255, 255, 255));
	this->addChild(bgLayerGradient, 0);
	
	BlastLetterNode* BlastLetterNodeObj;
	
	auto coord = getAllGridCoord(2,3);

	for (size_t coordIndex = 0; coordIndex < coord.size(); coordIndex++) {
		BlastLetterNodeObj = BlastLetterNode::create(500, 500, Vec2(coord.at(coordIndex).second, coord.at(coordIndex).first));
		addChild(BlastLetterNodeObj);
		std::ostringstream stringStream;
		stringStream << "Node" << (coordIndex + 1);
		BlastLetterNodeObj->setName(stringStream.str());
	}

	this->scheduleUpdate();

}

std::vector<std::pair<int, int>> BlastLetter::getAllGridCoord(int rowData, int columnData)
{
	std::vector<std::pair<int, int>> coord;
	auto win = Director::getInstance()->getVisibleSize();
	int gridWidth = win.width/(columnData +1), gridHeight = win.height/(rowData +1) ;
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

void BlastLetter::update(float delta) {

	if (checkRecognizeLetter()) {
		_menuContext->showScore();
	}
	else {
		_result = ((BlastLetterNode *)this->getChildByName("Node1"))->getPosibileCharacter();
	}

}

bool BlastLetter::checkRecognizeLetter()
{
	for (size_t i = 0; i < _result.size(); i++) {
		if (_result.at(i).compare("A") == 0) {
			return true;
		}
	}
	return false;
}

BlastLetter::~BlastLetter(void)
{
	this->removeAllChildrenWithCleanup(true);
}
