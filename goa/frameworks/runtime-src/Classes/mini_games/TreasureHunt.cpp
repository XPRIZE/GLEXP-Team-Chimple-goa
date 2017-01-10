#include "TreasureHunt.h"
#include "../WordSceneLipiTKNode.h"
#include "TreasureHuntNode.h"
#include "../util/CommonText.h"
#include "AlphabetWriting.h"


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

	_alpha = LangUtil::getInstance()->getAllCharacters();
	
	if (LangUtil::getInstance()->getLang() == "swa") {
		if (_menuContext->getCurrentLevel() == 25) {
			setLevel(RandomHelper::random_int(0,12));
		}
		else if (_menuContext->getCurrentLevel() == 26) {
			setLevel(RandomHelper::random_int(12, 23));
		}
		else {
			setLevel(_menuContext->getCurrentLevel() - 1);
		}
	}
	else {

		setLevel(_menuContext->getCurrentLevel() - 1);
	}
	//setLevel(_menuContext->getCurrentLevel()-1);

	TreasureHuntNodeObj = TreasureHuntNode::create(visibleSize.width / 2, visibleSize.height * 0.6, Vec2(visibleSize.width / 2 + visibleSize.width * 0.03, visibleSize.height / 2 - visibleSize.height * 0.05));
	TreasureHuntNodeObj->setName("1");
	this->addChild(TreasureHuntNodeObj);
	TreasureHuntNodeObj->setParent(this);

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
	labelBoard->setPosition(Vec2(visibleSize.width / 2 + visibleSize.width * 0.03, visibleSize.height / 2 + visibleSize.height * 0.41));
	labelBoard->setAnchorPoint(Vec2(0.5, 0.5));
	labelBoard->setScaleX(1);
	labelBoard->setScaleY(1.2);
	labelBoard->setName("board");
	this->addChild(labelBoard, 1);

	auto label = CommonText::create();
	label->setString(_currentLetter);
	label->setFontSize(150);
	label->setFontName("fonts/Helvetica.ttf");
	label->setPosition(Vec2(labelBoard->getBoundingBox().size.width/2, labelBoard->getBoundingBox().size.height / 2 - 20));
	label->setAnchorPoint(Vec2(0.5, 0.5));
	label->setTextColor(Color4B::BLUE);
	label->setScaleX(1);
	labelBoard->addChild(label);
	
	if (_menuContext->getCurrentLevel() == 1) {
	
		gameHelpLayer();
		
	}
	

	_menuContext->setMaxPoints(1);
	

	auto alphabetHelp = AlphabetWriting::createAlphabetWithAnimation(_currentLetter, true);
	alphabetHelp->setPositionX(visibleSize.width / 2 + visibleSize.width * 0.03);
	alphabetHelp->setPositionY(visibleSize.height / 2 - visibleSize.height * 0.05);
	this->addChild(alphabetHelp);
	alphabetHelp->setName("Alphabet");

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("cardraw/cardraw.plist");

	TreasureHuntNodeObj->setClearButtonTexture("cardraw/ref.png", "cardraw/ref_clicked.png", "cardraw/ref.png");

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
	_help = HelpLayer::create(Rect(visibleSize.width / 2 + visibleSize.width * 0.03, visibleSize.height / 2 - visibleSize.height * 0.05, visibleSize.width / 2, visibleSize.height * 0.6), Rect(0, 0, 0, 0));
	


	this->addChild(_help);
	_help->setName("gameHelpLayer");
}


void TreasureHunt::postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint)
{
	
	this->removeChildByName("Alphabet");
	

}