#include "PatchTheWallScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../puzzle/CharGenerator.h"
#include "../puzzle/Alphabet.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"
#include "../StartMenuScene.h"
#include "string.h"

USING_NS_CC;
//const std::vector<std::string> Alphabets = {"A","B","C","D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};

PatchTheWall::PatchTheWall() {

}
PatchTheWall::~PatchTheWall() {
//	backgroundMusic->stopBackgroundMusic();
}
Scene* PatchTheWall::createScene()
{
	auto scene = Scene::create();

	auto layer = PatchTheWall::create();
	scene->addChild(layer);

    layer->_menuContext = MenuContext::create(layer, PatchTheWall::gameName());
	scene->addChild(layer->_menuContext);

	return scene;
}

bool PatchTheWall::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
}

void PatchTheWall::onEnterTransitionDidFinish()
{
	visibleSize = Director::getInstance()->getVisibleSize();
	origin = Director::getInstance()->getVisibleOrigin();

	_patchBg = CSLoader::createNode("patchthewall/patchthewall.csb");
	this->addChild(_patchBg);

	_slideBar = (cocos2d::ui::Slider *)(_patchBg->getChildByName("Slider_3"));
	_slideBar->setPercent(0);
	_slideBar->setEnabled(false);

	_matrix = CharGenerator::getInstance()->generateCharMatrix(2, 5);


	float _gridY = visibleSize.height * .19;
	for (int i = 0; i < 5; i++)
	{
		float _gridX = visibleSize.width * .80;

		for (int j = 0; j < 2; j++)
		{
			SpriteDetails._sprite = Sprite::createWithSpriteFrameName("patchthewall/alphagrid.png");
			SpriteDetails._sprite->setPosition(Vec2(_gridX, _gridY));
			this->addChild(SpriteDetails._sprite);

			SpriteDetails._label = Alphabet::createWithSize(_matrix[j][i], 200);
			SpriteDetails._label->setPosition(Vec2(SpriteDetails._sprite->getPositionX(), SpriteDetails._sprite->getPositionY()));
			this->addChild(SpriteDetails._label);
			SpriteDetails._id = _matrix[j][i];
			SpriteDetails.xP = SpriteDetails._sprite->getPositionX();
			SpriteDetails.yP = SpriteDetails._sprite->getPositionY();
			SpriteDetails._sequence = _spriteDetails.size();
//			SpriteDetails._label->setName(std::to_string(_spriteDetails.size()));

			_spriteDetails.push_back(SpriteDetails);
			_gridX += SpriteDetails._sprite->getContentSize().width * 1.05;

			addEvents(SpriteDetails);
		}
		_gridY += _spriteDetails.at(0)._sprite->getContentSize().height * 1.02;
	}

	_gridY = visibleSize.height * .19;
	for (int i = 0; i < 5; i++)
	{
		float _gridX = visibleSize.width * .20;
		for (int j = 0; j < 5; j++)
		{
			Position.x = _gridX;
			Position.y = _gridY;
			Position._flag = 0;
			Position._sequence = _position.size();
			_position.push_back(Position);
			_gridX += SpriteDetails._sprite->getContentSize().width * 1.05;
		}
		_gridY += _spriteDetails.at(0)._sprite->getContentSize().height * 1.02;
	}

	// position the sprite on the center of the screen

/*
	for (int i = 0; i < 5; i++) {
		int hegbox = (i * 210) + 420;
		for (int j = 0; j < 3; j++)
		{
			int randgen = cocos2d::RandomHelper::random_int(0, 25);
			//const char* level = Alphabets.at(randgen).c_str();
			int weibox = visibleSize.width - 200 - (j * 340);
			auto mystr = LangUtil::convertUTF16CharToString(matrix[j][i]);
			auto label = Alphabet::createWithSize(matrix[j][i], 300);

			//auto label = Label::createWithTTF(matrix[j][i], "letters.ttf", 200);
			label->setPositionX(weibox);
			label->setPositionY(hegbox);
			label->setColor(ccc3(73, 39, 20));
			label->setAnchorPoint(Vec2(0.5, 0.5));
			label->setName(mystr);
			this->addChild(label, 7);
			auto listener = EventListenerTouchOneByOne::create();
			listener->setSwallowTouches(true);
			listener->onTouchBegan = CC_CALLBACK_2(PatchTheWall::onTouchBegan, this);
			listener->onTouchMoved = CC_CALLBACK_2(PatchTheWall::onTouchMoved, this);
			listener->onTouchEnded = CC_CALLBACK_2(PatchTheWall::onTouchEnded, this);
			listener->onTouchCancelled = CC_CALLBACK_2(PatchTheWall::onTouchCancelled, this);
			cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, label);
		}
	}

	for (int ii = 1; ii < 6; ii++) {
		float gridwidth = (ii * 250) + 95;
		for (int jj = 1; jj < 5; jj++) {
			float gridheight = (jj * 220) + 418;
			gameX.push_back(gridwidth);
			gameY.push_back(gridheight);
			breakFlag.push_back(false);
		}
	}
*/
//	this->schedule(schedule_selector(PatchTheWall::Blast), 5.0f);
//	this->scheduleUpdate();

	_level = _menuContext->getCurrentLevel();
	_menuContext->setMaxPoints(15);
	blastCome(0);

	if (_level != 1)
		this->schedule(schedule_selector(PatchTheWall::blastCome), 5.0f);
}

void PatchTheWall::addEvents(struct SpriteDetails sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, size.width, size.height);

		if (rect.containsPoint(locationInNode) && _moveFlag==0)
		{
			if (_helpFlag == 0)
			{
				this->removeChild(_help);
				_helpFlag = -1;
				blastCome(0);
				this->schedule(schedule_selector(PatchTheWall::blastCome), 5.0f);
			}

			_moveFlag = 1;
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();
		target->setPosition(touch->getLocation());
	};

	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		int flag = 0;
		auto target = event->getCurrentTarget();
		Rect _targetRect = target->getBoundingBox();
		std::string _targetName = target->getName();
		int _index = atoi(_targetName.c_str());
		for (int i = 0; i < _patchDetails.size(); i++)
		{
			Rect _patchRect = _patchDetails.at(i)._label->getBoundingBox();

			if (_patchRect.intersectsRect(_targetRect) && _spriteDetails.at(_index)._id == _patchDetails.at(i)._id)
			{
				_spriteDetails.at(_index)._label->runAction(Sequence::create(MoveTo::create(.2, Vec2(_patchDetails.at(i)._label->getPositionX(), _patchDetails.at(i)._label->getPositionY())),
					CallFunc::create([=] {
					this->removeChild(_patchDetails.at(i)._label);
					_position.at(_patchDetails.at(i)._sequence)._flag = 0;
					_patchDetails.erase(_patchDetails.begin() + i);
					_moveFlag = 0;
					_menuContext->addPoints(1);
					_totalCount++;

//					CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
//					success->playEffect("sounds/sfx/success.ogg", false);

					_spriteDetails.at(_index)._label->setPosition(Vec2(_spriteDetails.at(_index).xP, _spriteDetails.at(_index).yP));
					_slideBar->setPercent(_slideBar->getPercent() + 15);
					if (_totalCount == 14)
					{
						_menuContext->showScore();
					}

				}), NULL));

				flag = 1;
				break;
			}
		}

		if (flag == 0)
		{
			target->runAction(Sequence::create(MoveTo::create(.5, Vec2(_spriteDetails.at(_index).xP, _spriteDetails.at(_index).yP)), CallFunc::create([=]{
				_moveFlag = 0;
				_menuContext->addPoints(-1);
			}), NULL));
		}
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite._label);
}


void PatchTheWall::blastCome(float _time)
{
	if (_totalLetter < 15)
	{
		int _randomPosition;
		while (1)
		{
			_randomPosition = (rand() % _position.size() - 1);
			if (_position.at(_randomPosition)._flag == 0)
			{
				_position.at(_randomPosition)._flag = 1;
				break;
			}
		}

		Node *_blastNode = CSLoader::createNode("patchthewall/blast.csb");
		auto _blastTimeline = CSLoader::createTimeline("patchthewall/blast.csb");
		_blastNode->setPosition(Vec2(_position.at(_randomPosition).x, _position.at(_randomPosition).y));
		this->addChild(_blastNode);

		_blastNode->runAction(_blastTimeline);
		_blastTimeline->play("blast", false);
		_blastTimeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(PatchTheWall::letterCome, this, _blastNode, _randomPosition));
	}
	else
	{

	}
}

void PatchTheWall::letterCome(Node *blastNode, int _randomPosition)
{
	this->removeChild(blastNode);
	SpriteDetails._sprite = Sprite::createWithSpriteFrameName("patchthewall/alphagrid.png");
	SpriteDetails._sprite->setPosition(Vec2(_position.at(_randomPosition).x, _position.at(_randomPosition).y));
//	this->addChild(SpriteDetails._sprite);

	int _randomRow = cocos2d::RandomHelper::random_int(0, 4);
	int _randomCol = cocos2d::RandomHelper::random_int(0, 1);

	SpriteDetails._label = Alphabet::createWithSize(_matrix[_randomCol][_randomRow], 200);
	SpriteDetails._label->setPosition(Vec2(SpriteDetails._sprite->getPositionX(), SpriteDetails._sprite->getPositionY()));
	this->addChild(SpriteDetails._label);
	SpriteDetails._id = _matrix[_randomCol][_randomRow];
	SpriteDetails.xP = SpriteDetails._sprite->getPositionX();
	SpriteDetails.yP = SpriteDetails._sprite->getPositionY();
	SpriteDetails._sequence = _randomPosition;
	_patchDetails.push_back(SpriteDetails);
	_totalLetter++;

	if (_helpFlag == 0)
	{
		_help = HelpLayer::create(Rect(SpriteDetails._sprite->getPositionX() - SpriteDetails._sprite->getContentSize().width / 2, SpriteDetails._sprite->getPositionY() - SpriteDetails._sprite->getContentSize().height / 2, SpriteDetails._sprite->getContentSize().width, SpriteDetails._sprite->getContentSize().height), Rect(0, 0, 0, 0));
//		_help->clickAndDrag(Vec2(_position[2].x, _position[2].y), Vec2(_position[2].x, _position[2].y + _allBar.at(2)->getContentSize().width));
		this->addChild(_help);
		_helpFlag = 0;
	}

}

/*
void PatchTheWall::startGame() {
    _menuContext->showStartupHelp(CC_CALLBACK_0(PatchTheWall::callingBlast, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, _menuContext)), CallFunc::create(CC_CALLBACK_0(PatchTheWall::callingBlast, this)), NULL));
}
void PatchTheWall::callingBlast()
{
	this->schedule(schedule_selector(PatchTheWall::Blast), 5.0f);
	this->scheduleUpdate();
}
*/


/*

bool PatchTheWall::onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event)
{
	//CCLOG("touchdshfdtj= %d", gameX.size());
	auto parentNode = event->getCurrentTarget();
	//CCLOG("hsxhschjjhjsh = %f", parentNode->getContentSize().width);
	Point touchPosition = parentNode->convertToNodeSpace(touch->getLocation());
	if (parentNode->getBoundingBox().containsPoint(touch->getLocation()) && flag1) {
		flag1 = false;
		no = (Alphabet*)parentNode;
		PatchTheWall::x = parentNode->getPositionX();
		PatchTheWall::y = parentNode->getPositionY();
		//CCLOG("touch");

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		auto path = LangUtil::getInstance()->getAlphabetSoundFileName(no->getChar());
		audio->playEffect(path.c_str(), false);

		flag = 0;
		auto touchaction = ScaleTo::create(0.1, .7);
		no->runAction(touchaction);
		return true;
	}

	return false;
}
void PatchTheWall::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event)
{
	no->setPosition(touch->getLocation());
	if(flag==0)
		flag = -1;
	//CCLOG("box size = %f", no->getContentSize().width);
	for (int i = 0; i < blastAlphaReff.size(); i++)
	{
		auto my_point = blastAlphaReff.at(i)->getPosition();
	
		if ((no->getBoundingBox()).containsPoint(my_point) && ((no->getChar()) == (blastAlphaReff.at(i)->getChar())))
		{
			_menuContext->pickAlphabet(no->getChar(), blastAlphaReff.at(i)->getChar(), true);
			int splash = ((crackReff.at(i)->getPositionX() - 95) / 250)-1;
			int splash1 = ((crackReff.at(i)->getPositionY() - 418) / 220)-1;
			int val1 = ((splash1) * 5) + splash;
			breakFlag.at(val1) = false;
			// fades in the sprite in 1 seconds 
			auto fadeIn = FadeOut::create(1.0f);
			blastAlphaReff.at(i)->runAction(fadeIn);
			this->removeChild(crackReff.at(i));
			crackReff.erase(i);
			blastAlphaReff.erase(i);
			no->setOpacity(0);
			score = score + 5;
			slideBar->setPercent(score);
			
			flag = 1;
		}
	}
}
void PatchTheWall::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event)
{
	if (flag==1) {
		//flag1 = true;
		flag = -1;
//		no->runAction(MoveTo::create(3, Vec2(PatchTheWall::x, PatchTheWall::y)));
		no->setPositionX(PatchTheWall::x);
		no->setPositionY(PatchTheWall::y);
		no->setOpacity(255);
		this->scheduleOnce(schedule_selector(PatchTheWall::gridTouch), 1.0f);
	}
	else if(flag==0)
	{
	//	flag1 = true;
		flag = -1;
		this->scheduleOnce(schedule_selector(PatchTheWall::gridTouch), 1.0f);
	}
	else if(flag==-1)
	{
		flag = -1;
		//flag1 = true;
		this->scheduleOnce(schedule_selector(PatchTheWall::gridTouch), 2.0f);
		no->runAction(MoveTo::create(2, Vec2(PatchTheWall::x, PatchTheWall::y)));
		no->setOpacity(255);
		_menuContext->pickAlphabet('A', 'B', true);
	}
	auto touchaction = ScaleTo::create(1, .375);
	no->runAction(touchaction);

	//isTouching = false;
}
void PatchTheWall::onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event)
{
	onTouchEnded(touch, event);
}
void PatchTheWall::update(float dt) {
	if (slideBar->getPercent() == 100) {
        _menuContext->showScore();
	}
	
}

void PatchTheWall::fort(float dt) {
	
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	int randgen = cocos2d::RandomHelper::random_int(0, 25);
	//const char* level = Alphabets.at(randgen).c_str();
    this->removeChild(blastImage);
	auto block = Sprite::createWithSpriteFrameName("crack.png");
	block->setPositionX(randx);
	block->setPositionY(randy);
	this->addChild(block,3);
	//block->setName(level);
	crackReff.pushBack(block);
	
	//auto label = Label::createWithTTF(level, "letters.ttf", 200);
	int i = cocos2d::RandomHelper::random_int(0, 4);
	int j = cocos2d::RandomHelper::random_int(0, 2);
	//auto mystr = LangUtil::convertUTF16CharToString(matrix[j][i]);
	auto label = Alphabet::createWithSize(matrix[j][i], 300);
	label->setPositionX(randx);
	label->setPositionY(randy);
	label->setColor(ccc3(218, 239, 237));
	//label->setName(mystr);
	this->addChild(label, 4);
	blastAlphaReff.pushBack(label);
}
void PatchTheWall::Blast(float dt) {
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	int mykey = cocos2d::RandomHelper::random_int(0, 19);

	if (breakFlag.at(mykey) == false) {
		randx = gameX.at(mykey);
		randy = gameY.at(mykey);
		breakFlag.at(mykey) = true;
		auto alpha_animation = CSLoader::createTimeline("blast.csb");
		blastImage = CSLoader::createNode("blast.csb");
		blastImage->runAction(alpha_animation);
		blastImage->setPositionX(randx - 250);
		blastImage->setPositionY(randy - 250);
		this->addChild(blastImage);

		alpha_animation->gotoFrameAndPlay(0, false);
		auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
		audioBg->playEffect("cannonball/gamesound/meteorblast.wav", false, 1, 1, .2);

		this->scheduleOnce(schedule_selector(PatchTheWall::fort), 1.0f);
	}
	else {
		this->Blast(0.0);
	}
}
void PatchTheWall::gridTouch(float dt)
{
	flag1 = true;
}
void PatchTheWall::menuCloseCallback(Ref* pSender)
{
    Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    exit(0);
#endif
}

*/
