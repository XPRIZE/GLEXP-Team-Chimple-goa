#include "TreasureHunt.h"
#include "../WordSceneLipiTKNode.h"
#include "TreasureHuntNode.h"
#include "../util/CommonText.h"

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

	_alpha = LangUtil::getInstance()->getAllCharacters();
	
	
	setLevel(_menuContext->getCurrentLevel()-1);


	//TreasureHuntNode* TreasureHuntNodeObj;
	//TreasureHuntNodeObj.resize(6);


	TreasureHuntNodeObj = TreasureHuntNode::create(1550, 800, Vec2(visibleSize.width/2 + 120, visibleSize.height/2));
	TreasureHuntNodeObj->setName("1");
	this->addChild(TreasureHuntNodeObj);
	
	_box = (Sprite *)CSLoader::createNode("box/box1.csb");
	_box->setPosition(Vec2(350, visibleSize.height / 2));
	auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName("box/box1.png");
	auto x = (Sprite *)_box->getChildByName("Sprite_1");
	x->setDisplayFrame(texture);
	_box->setAnchorPoint(Vec2(0.5, 0.5));
	_box->setScaleX(1.5);
	_box->setScaleY(1.5);
	_box->setName("box");
	this->addChild(_box, 1);


	Sprite* labelBoard = Sprite::createWithSpriteFrameName("box/board.png");
	labelBoard->setPosition(Vec2(visibleSize.width / 2 + 100, visibleSize.height / 2 + 750));
	labelBoard->setAnchorPoint(Vec2(0.5, 0.5));
	labelBoard->setScaleX(1);
	labelBoard->setScaleY(1.2);
	labelBoard->setName("board");
	this->addChild(labelBoard, 1);

	auto label = CommonText::create();
	label->setString(_currentLetter);
	label->setFontSize(150);
	label->setFontName("fonts/Marker Felt.ttf");
	//label->setPosition(Vec2(labelBoard->getPositionX()/2, labelBoard->getPositionY()/2));
	label->setPosition(Vec2(labelBoard->getBoundingBox().size.width/2, labelBoard->getBoundingBox().size.height / 2 - 20));
	label->setAnchorPoint(Vec2(0.5, 0.5));
	label->setTextColor(Color4B::BLUE);
	label->setScaleX(1);
	labelBoard->addChild(label);
	
	if (_menuContext->getCurrentLevel() == 1) {
		
		//auto startPos = Vec2(visibleSize.width / 2, visibleSize.height / 2 - 300);
		//auto endPos = Vec2(visibleSize.width / 2 + 300, visibleSize.height / 2);

		//_help = HelpLayer::create(Rect(startPos.x, startPos.y, 50, 50), Rect(endPos.x, endPos.y, 50, 50));

		//_help->clickAndDrag(startPos, endPos);

		//this->addChild(_help);
		
		gameHelpLayer();
		
	}
	

	_menuContext->setMaxPoints(1);
	//std::vector<Sprite*> boxes;
	//boxes.resize(6);

	//std::vector<Sprite*> layer;
	//layer.resize(6);

	//auto coord = getAllGridCoord(1, 6);
	/*
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
	*/
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
	
	

	if (TreasureHuntNode::done == 1 && _menuContext->getCurrentLevel() == 1) {
		this->removeChild(_help);
		TreasureHuntNode::done = 0;
	}
	
	if (checkRecognizeLetter(_currentLetter) && _flag ==0) {

		

		auto openBox = CallFunc::create([=] {
			TreasureHuntNodeObj->removeClearButton();
			openCoinBox();
			
		});

		auto gameOver = CallFunc::create([=] {
			_menuContext->addPoints(1);
			_menuContext->showScore();
		});

	
		auto completeSequence = Sequence::create(openBox, DelayTime::create(2.0), gameOver, NULL);

		this->runAction(completeSequence);
		
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

string TreasureHunt::getConvertInUpperCase(string data)
{
	std::ostringstream blockName;
	int i = 0;
	while (data[i])
	{
		blockName << (char)toupper(data[i]);
		i++;
	}
	return blockName.str();
}

void TreasureHunt::openCoinBox() {

	
	cocostudio::timeline::ActionTimeline * _openBox;
	_openBox = CSLoader::createTimeline("box/box1.csb");
	_box->runAction(_openBox);
	_openBox->play("correct", false);
	_flag = 1;
}


void TreasureHunt::openStoneBox() {
	//_drawingBoard->removechild(_clearButton);
	
	cocostudio::timeline::ActionTimeline * _openBox;
	_openBox = CSLoader::createTimeline("box/box1.csb");
	_box->runAction(_openBox);
	_openBox->play("wrong", false);
	_flag = 1;


}
void TreasureHunt::setLevel(int level) {

	_currentLetter = _alpha[level];
	
}



void TreasureHunt::gameHelpLayer()
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


