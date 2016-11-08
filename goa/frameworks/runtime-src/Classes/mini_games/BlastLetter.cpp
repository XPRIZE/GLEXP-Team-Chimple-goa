#include "BlastLetter.h"

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

void BlastLetter::checkAlphabets()
{
	std::ostringstream stringStream;
	stringStream << "Node" << (_counterLetter + 1);

	if (checkRecognizeLetter(LangUtil::convertUTF16CharToString(_data_value[_counterLetter]))) {
		
		((BlastLetterNode *)this->getChildByName(stringStream.str()))->_drawingBoard->removeAllChildren();
		((BlastLetterNode *)this->getChildByName(stringStream.str()))->setScale(1.0f/3.0f);
		((BlastLetterNode *)this->getChildByName(stringStream.str()))->drawAllowance(false);
		auto grid = this->getChildByName(LangUtil::convertUTF16CharToString(_data_value[_counterLetter]));
		((BlastLetterNode *)this->getChildByName(stringStream.str()))->setPosition(Vec2(grid->getPositionX(), grid->getPositionY()));
		_checkingAlphabets = false;
		_bang = false;
		_touch = true;
		this->removeChildByName("blastScene");
		this->removeChildByName("tempBoard");
		this->removeChildByName("tempBg");

		_counterLetter++;		
		if (_counterLetter == _data_value.size()) {
			this->runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() {_menuContext->showScore(); }), NULL));
		}
	}
	else {
		_result = ((BlastLetterNode *)this->getChildByName(stringStream.str()))->getPosibileCharacter();
	}
}

void BlastLetter::wrongSoTryAgain(BlastLetterNode *canvasWriting)
{
	canvasWriting->_paintingNode->clear();
	canvasWriting->_canvas->clear(0, 0, canvasWriting->getContentSize().width, canvasWriting->getContentSize().height);
	canvasWriting->_strokes.clear();
	canvasWriting->clearPrintedCharacters();
	_timelineBlast->play("blast", false);
	_maxWrong--;
	if (_maxWrong == 0) {
		_menuContext->showScore();
	}
}

bool BlastLetter::init()
{
	if (!Layer::init()) { return false;}

	return true;
}

void BlastLetter::onEnterTransitionDidFinish() {
	//screen_blast
	Node* bg = CSLoader::createNode("blastletter/blastletter.csb");
	addChild(bg);
	bg->setName("bg");

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	BlastLetterNode* BlastLetterNodeObj;
	
	_data_key = getConvertInUpperCase(TextGenerator::getInstance()->generateAWord(1));
	_data_value = _data_key;
	auto coord = getAllGridCoord(1, _data_key.size());

	for (size_t coordIndex = 0; coordIndex < _data_key.size(); coordIndex++) {
		auto letterBoardSprite = Sprite::create();
		letterBoardSprite->setTextureRect(Rect(0, 0, 350, 380));
		letterBoardSprite->setColor(Color3B(219, 224, 252));
		letterBoardSprite->setPosition(Vec2(coord.at(coordIndex).second, coord.at(coordIndex).first));		
		addChild(letterBoardSprite);

		auto myLabel = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), LangUtil::convertUTF16CharToString(_data_value[coordIndex]));
		myLabel->setPosition(Vec2(letterBoardSprite->getContentSize().width * 0.5, letterBoardSprite->getContentSize().height * 0.45));
		myLabel->setScale(0.7);
		myLabel->setName(myLabel->getString());
		letterBoardSprite->addChild(myLabel);
		letterBoardSprite->setName(myLabel->getString());
		letterBoardSprite->setTag(coordIndex+1);
		addEventsOnGrid(letterBoardSprite);
	}
		auto myLabel = LabelTTF::create(_data_key, "Helvetica", this->getChildByName("bg")->getChildByName("topboard ")->getContentSize().height *0.8);
		myLabel->setPosition(Vec2(this->getChildByName("bg")->getChildByName("topboard ")->getContentSize().width/2, this->getChildByName("bg")->getChildByName("topboard ")->getContentSize().height/2));
		myLabel->setName(myLabel->getString());
		this->getChildByName("bg")->getChildByName("topboard ")->addChild(myLabel);

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

	if(_checkingAlphabets)
		checkAlphabets();

}

bool BlastLetter::checkRecognizeLetter(string letter)
{
	if (_result.size() > 0) {
		if ((_result.at(0).compare("o") == 0 || _result.at(0).compare("0") == 0) && (LangUtil::convertUTF16CharToString(_data_value[_counterLetter]).compare("O") == 0)) {
			return true;
		}
	}

	for (size_t i = 0; i < _result.size(); i++) {
		if (_result.at(i).compare(letter) == 0) {
			return true;
		}
	}
	return false;
}

string BlastLetter::getConvertInUpperCase(string data)
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

void BlastLetter::addEventsOnGrid(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
		if (target->getBoundingBox().containsPoint(touch->getLocation())) {
			auto childText = target->getChildByName(target->getName());
			target->setColor(Color3B::GRAY);
			auto x = childText->getName();
			CCLOG("Touched : %c", x.at(0));
			auto t = target->getTag();
			if (target->getTag() == (_counterLetter+1) && _touch) {
				return true;
			}
			else {
				target->setColor(Color3B(219, 224, 252));
				CCLOG("The selected grid tagNo is : %d and the counter value is (count + 1 ): %d ", target->getTag(), (_counterLetter + 1));
			}
		}
		return false;
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
		auto x = target->getName();
		target->setColor(Color3B(219, 224, 252));
		CCLOG("Touched : %c", x.at(0));
		_touch = false;
		if (target->getBoundingBox().containsPoint(touch->getLocation())) {
		
			auto fadeOut = FadeOut::create(2.0f);
			target->getChildByName(target->getName())->runAction(fadeOut);
			
			auto letterBoardSprite = Sprite::create();
			letterBoardSprite->setTextureRect(Rect(0, 0, 350, 380));
			letterBoardSprite->setColor(Color3B(219, 224, 252));
			letterBoardSprite->setPosition(Vec2(target->getPositionX(),target->getPositionY()));
			addChild(letterBoardSprite,5);
			letterBoardSprite->setName("tempBoard");
			
			auto bgLayerGradient = LayerGradient::create(Color4B(49, 42, 53,191.25), Color4B(49, 42, 53, 191.25));
			addChild(bgLayerGradient, 3);
			bgLayerGradient->setName("tempBg");

			auto myLabel = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), target->getChildByName(target->getName())->getName());
			myLabel->setPosition(Vec2(letterBoardSprite->getContentSize().width * 0.5, letterBoardSprite->getContentSize().height * 0.45));
			myLabel->setScale(0.7);
			letterBoardSprite->addChild(myLabel);
			
			letterBoardSprite->runAction(MoveTo::create(1,Vec2(Director::getInstance()->getVisibleSize().width/2 , Director::getInstance()->getVisibleSize().height * 0.540072222)));
			letterBoardSprite->runAction(ScaleTo::create(1,3));

			auto letterCharacterBoard = CallFunc::create([=]() {
				auto fadeOut1 = FadeOut::create(1.0f);
				target->getChildByName(target->getName())->runAction(fadeOut1);
				auto fadeOut2 = FadeOut::create(2.0f);
				myLabel->runAction(fadeOut2);
			});
			auto letterCharacter = CallFunc::create([=]() {
				Node* popGrid = CSLoader::createNode("blastletter/screen_blast.csb");
				auto timelineBlast = CSLoader::createTimeline("blastletter/screen_blast.csb");
				_timelineBlast = timelineBlast;
				addChild(popGrid, 4);
				popGrid->setName("blastScene");
				popGrid->runAction(timelineBlast);
				
				auto dataBoard = popGrid->getChildByName("board");
				auto dataBomb = popGrid->getChildByName("bomb_group");

				auto myGameWidth = 0.0f;
				if (Director::getInstance()->getVisibleSize().width > 2560) {
					myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
					popGrid->setPositionX(myGameWidth);
				}
				auto BlastLetterNodeObj = BlastLetterNode::create(dataBoard->getContentSize().width, dataBoard->getContentSize().height, Vec2(dataBoard->getPositionX() + myGameWidth, dataBoard->getPositionY()));
				addChild(BlastLetterNodeObj ,4);
				std::ostringstream stringStream;
				stringStream << "Node" << target->getTag();
				BlastLetterNodeObj->setName(stringStream.str());
				_checkingAlphabets = true;
				
				auto afterBlast = CallFunc::create([=]() {
					if (_bang ) {
						timelineBlast->play("bang", false);
						_bang = false;
						//this->removeChildByName("blastScene");
						//this->removeChildByName("tempBoard");
						//this->removeChildByName("tempBg");
						_checkingAlphabets = false;

						//std::ostringstream objName;
						//objName << "Node" << (_counterLetter+1);
						//this->removeChildByName(objName.str());

					}
				});

				timelineBlast->play("blast",false);
				runAction(Sequence::create(DelayTime::create(10), CallFunc::create([=]() {  }), afterBlast, NULL));
				
				this->removeChildByName("tempBoard");
			});

			this->runAction(Sequence::create(DelayTime::create(1), letterCharacterBoard, DelayTime::create(2), letterCharacter, NULL));
		}

		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

BlastLetter::~BlastLetter(void)
{
	this->removeAllChildrenWithCleanup(true);
}
