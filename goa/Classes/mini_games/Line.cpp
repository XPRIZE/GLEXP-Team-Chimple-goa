
#include "Line.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>
#include "../menu/HelpLayer.h"
#include "../util/CommonLabel.h"

USING_NS_CC;

Line::Line()
{
	
	
}

Line::~Line()
{

}

Line * Line::create()
{
	Line* LineGame = new (std::nothrow) Line();
	if (LineGame && LineGame->init()) {
		LineGame->autorelease();
		return LineGame;
	}
	CC_SAFE_DELETE(LineGame);
	return nullptr;
}

cocos2d::Scene * Line::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Line::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Line::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool Line::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float toplabelX = visibleSize.width / 2 - 30;
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {
		{
			{ "candy",  
			{
				{ "bg","line/line.csb"},
				{ "tag","line/tag.csb"},
				{ "five","line/five.csb"},
				{ "ten","line/ten.csb"},
				{ "fifteen","line/fifteen.csb"},
				{ "point1","ref_7" },
				{ "point2","ref_7_0" },
				{ "point3","ref_7_0_0" },
				{ "point4","ref_7_0_0_0" },
				{ "point5","ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "one" },

			} },
			{ "iceLand",  
			{
				{ "bg", "layerisland/layerisland.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerisland/cake1.png" },
				{ "character", "layerisland/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy"},
				{ "cry","cry" },
				{ "animation_select", "two" }

			} },
			{ "farm", 
			{
				{ "bg", "layerfarm/layerfarm.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerfarm/cake1.png" },
				{ "character", "layerfarm/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "three" }
			} },

		}
	};

	std::vector<std::string> theme = { "candy","iceLand","farm" };
	_scenePath = differntSceneMapping.at(theme.at(0));

	

	background = CSLoader::createNode(_scenePath.at("bg"));
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);
	
	_levelMapping = {

		{ 1,  //level number
		{
			{ "start", 0},  //"start"
			{ "end", 5},   // "end"
			{ "mid", 1},   // "mid"
			{ "tags", 3 }   // "no of tags"
		} },
		{ 2,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 5 },   // "end"
			{ "mid", 2 },   // "mid"
			{ "tags", 4 }   // "no of tags"
		} },
		{ 3,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 5 },   // "end"
			{ "mid", 3 },   // "mid"
			{ "tags", 4 }   // "no of tags"
		} },
		{ 4,  //level number
		{
			{ "start", 6 },  //"start"
			{ "end", 11 },   // "end"
			{ "mid", 1 },   // "mid"
			{ "tags", 4 }   // "no of tags"
		} },
		{ 5,  //level number
		{
			{ "start", 6 },  //"start"
			{ "end", 11 },   // "end"
			{ "mid", 2 },   // "mid"
			{ "tags", 5 }   // "no of tags"
		} },
		{ 6,  //level number
		{
			{ "start", 6 },  //"start"
			{ "end", 11 },   // "end"
			{ "mid", 3 },   // "mid"
			{ "tags", 5 }   // "no of tags"
		} },
		{ 7,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 10 },   // "end"
			{ "mid", 1 },   // "mid"
			{ "tags", 5 }   // "no of tags"
		} },
		{ 8,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 10 },   // "end"
			{ "mid", 2 },   // "mid"
			{ "tags", 5 }   // "no of tags"
		} },
		{ 9,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 10 },   // "end"
			{ "mid", 3 },   // "mid"
			{ "tags", 5 }   // "no of tags"
		} },
		{ 10,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 10 },   // "end"
			{ "mid", 5 },   // "mid"
			{ "tags", 5 }   // "no of tags"
		} },
		{ 11,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 15 },   // "end"
			{ "mid", 1 },   // "mid"
			{ "tags", 7 }   // "no of tags"
		} },
		{ 12,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 15 },   // "end"
			{ "mid", 2 },   // "mid"
			{ "tags", 7 }   // "no of tags"
		} },
		{ 13,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 15 },   // "end"
			{ "mid", 3 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 14,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 15 },   // "end"
			{ "mid", 4 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 15,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 15 },   // "end"
			{ "mid", 5 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 16,  //level number
		{
			{ "start", 0 },  //"start"
			{ "end", 15 },   // "end"
			{ "mid", 6 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 17,  //level number
		{
			{ "start", 5 },  //"start"
			{ "end", 80 },   // "end"
			{ "mid", 10 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 18,  //level number
		{
			{ "start", 5 },  //"start"
			{ "end", 80 },   // "end"
			{ "mid", 15 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 19,  //level number
		{
			{ "start", 5 },  //"start"
			{ "end", 80 },   // "end"
			{ "mid", 20 },   // "mid"
			{ "tags", 8 }   // "no of tags"
		} },
		{ 20,  //level number
		{
			{ "start", 5 },  //"start"
			{ "end", 80 },   // "end"
			{ "mid", 25 },   // "mid"
			{ "tags", 10 }   // "no of tags"
		} },
	};
	return true;
}
void Line::onEnterTransitionDidFinish()
{
	Node::onEnterTransitionDidFinish();
	auto level = _levelMapping.at(menu->getCurrentLevel());
	this->scheduleUpdate();
	_startNum = level.at("start");
	_endNum = level.at("end");
	_mid = level.at("mid");
	_tagNum = level.at("tags");

	

	if (menu->getCurrentLevel() <= 6)
	{
		_NumberLine = CSLoader::createNode(_scenePath.at("five"));
		int temp = _startNum;
		_diff = (_endNum - _startNum) / 5;
		auto nodeVector = _NumberLine->getChildren();
		int numberCount = 0;
		for (int i = 0; i < nodeVector.size(); i++)
		{
			std::stringstream ss,ss1;
			ss << numberCount;
			std::string str = ss.str();
			ss1 << temp;
			std::string str1 = ss1.str();
			if (nodeVector.at(i)->getName().compare(str) == 0) {
				nodeVector.at(i)->setName(str1);
				temp++;
				numberCount++;
			}
			
		}
	}
	else if (menu->getCurrentLevel() <= 10)
	{
		_NumberLine = CSLoader::createNode(_scenePath.at("ten"));
		int temp = _startNum;
		_diff = (_endNum - _startNum) / 10;
		auto nodeVector = _NumberLine->getChildren();
		int numberCount = 0;
		for (int i = 0; i < nodeVector.size(); i++)
		{
			std::stringstream ss, ss1;
			ss << numberCount;
			std::string str = ss.str();
			ss1 << temp;
			std::string str1 = ss1.str();
			if (nodeVector.at(i)->getName().compare(str) == 0) {
				nodeVector.at(i)->setName(str1);
				temp++;
				numberCount++;
			}

		}
	}
	else if (menu->getCurrentLevel() <= 25)
	{
		_NumberLine = CSLoader::createNode(_scenePath.at("fifteen"));
		int temp = _startNum;
		_diff = (_endNum  - _startNum) / 15;
		auto nodeVector = _NumberLine->getChildren();
		int numberCount = 0;
		for (int i = 0; i < nodeVector.size(); i++)
		{
			std::stringstream ss, ss1;
			ss << numberCount;
			std::string str = ss.str();
			ss1 << temp;
			std::string str1 = ss1.str();
			if (nodeVector.at(i)->getName().compare(str) == 0) {
				nodeVector.at(i)->setName(str1);
				temp += _diff;
				numberCount++;
			}

		}
	}
	
	scaleNumber(_startNum, _endNum, _mid);
	tagCreate(_tagNum);
	
	_NumberLine->setPosition(Vec2(extraX, 150));
	this->addChild(_NumberLine);

}
void Line::gameHelp()
{
	auto tag = _five.at(1);
	auto numberlinechild = _NumberLine->getChildByName(tag);
	auto onClick = this->getChildByName(tag);
	auto help = HelpLayer::create(Rect(onClick->getPositionX(), onClick->getPositionY(), onClick->getContentSize().width, onClick->getContentSize().height),Rect(numberlinechild->getPositionX() + extraX, numberlinechild->getPositionY()-30,100,200));
	help->setName("help");
	help->clickAndDrag(Vec2(onClick->getPositionX(), onClick->getPositionY()), Vec2(numberlinechild->getPositionX() + extraX, numberlinechild->getPositionY()));
	this->addChild(help);
}

void Line::scaleNumber(int start, int end,int mid)
{
	for(int i=start ; i<=end ; i+= _mid)
	{
		std::stringstream ss;
		ss << i;
		std::string str = ss.str();
		auto number_label = CommonLabel::createWithTTF(str, "fonts/Roboto-Regular.ttf", 70);
		number_label->setPositionX(_NumberLine->getChildByName(str)->getPositionX() + extraX);
		number_label->setPositionY(_NumberLine->getChildByName(str)->getPositionY() - 60);
		number_label->setColor(Color3B(0, 0, 0));
		this->addChild(number_label);
		_numRef.push_back(str);
	}
	for (int i = start; i <= end; i+= _diff)
	{
		std::stringstream ss;
		ss << i;
		std::string str = ss.str();
		_nodeRef.push_back(_NumberLine->getChildByName(str));
		_five.push_back(str);
	}
}

void Line::tagCreate(int choice)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	std::random_shuffle(_five.begin(), _five.end());

	if (_mid > 1)
	{
		for (int i = 0; i < _numRef.size(); i++)
		{
			for (int j = 0; j < _five.size(); j++)
			{
				if (_five.at(j) == _numRef.at(i))
				{
					_five.erase(_five.begin() + j);
				}
			}
		}
		for (int i = 1; i <= _five.size(); i++)
		{
			_tag = Sprite::createWithSpriteFrameName("line/candy_1.png");
			_tag->setPosition(visibleSize.width / (_five.size())*(i)-(visibleSize.width / (_five.size()) * 0.5), 700);
			//_tag->setContentSize(Size(200, 200));
			//_tag->setAnchorPoint(Vec2(0.5, 1));
			this->addChild(_tag);
			_tag->setScaleX(0.9);
			_tag->setScaleY(0.9);
			_tagRef.push_back(_tag);


			auto number_label = CommonLabel::createWithTTF(_five.at(i - 1), "fonts/Roboto-Regular.ttf", 90);
			number_label->setPositionX(_tag->getContentSize().width / 2);
			number_label->setPositionY(_tag->getContentSize().height / 4);
			number_label->setColor(Color3B(0, 0, 0));
			_tag->addChild(number_label);
			_tag->setName(_five.at(i - 1));



			auto listener = EventListenerTouchOneByOne::create();
			listener->setSwallowTouches(true);
			listener->onTouchBegan = CC_CALLBACK_2(Line::onTouchBegan, this);
			listener->onTouchMoved = CC_CALLBACK_2(Line::onTouchMoved, this);
			listener->onTouchEnded = CC_CALLBACK_2(Line::onTouchEnded, this);
			_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _tag);
		}
	}
	else
	{
		for (int i = 1; i <= choice; i++)
		{
			_tag = Sprite::createWithSpriteFrameName("line/candy_1.png");
			_tag->setPosition(visibleSize.width / (choice + 1)*i + extraX, 700);
			//_tag->setContentSize(Size(200, 200));
			//_tag->setAnchorPoint(Vec2(0.5, 1));
			this->addChild(_tag);
			_tag->setScaleX(0.9);
			_tag->setScaleY(0.9);
			_tagRef.push_back(_tag);


			auto number_label = CommonLabel::createWithTTF(_five.at(i), "fonts/Roboto-Regular.ttf", 90);
			number_label->setPositionX(_tag->getContentSize().width / 2);
			number_label->setPositionY(_tag->getContentSize().height / 4);
			number_label->setColor(Color3B(0, 0, 0));
			_tag->addChild(number_label);
			_tag->setName(_five.at(i));

			auto listener = EventListenerTouchOneByOne::create();
			listener->setSwallowTouches(true);
			listener->onTouchBegan = CC_CALLBACK_2(Line::onTouchBegan, this);
			listener->onTouchMoved = CC_CALLBACK_2(Line::onTouchMoved, this);
			listener->onTouchEnded = CC_CALLBACK_2(Line::onTouchEnded, this);
			_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _tag);
		}
	}
	if (menu->getCurrentLevel() == 1)
	{
		gameHelp();
	}
}
void Line::update(float dt)
{
	
}
void Line::scoreBoard(float dt)
{
	if (_mid > 1)
	{
		menu->setMaxPoints(_five.size());
	}
	else if( _mid == 1)
	{
		menu->setMaxPoints(_tagNum);
	}
	
	menu->showScore();
}

bool Line::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	if (rect.containsPoint(location) && _flag)
	{
		_flag = false;
		_tagX = target->getPositionX();
		_tagY = target->getPositionY();
		return true;
	}
	return false;
}

void Line::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	target->setPosition(touch->getLocation());
	

}

void Line::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
   
	bool flag = false;
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	target->setPosition(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	for (int i = 0; i < _nodeRef.size(); i++)
	{
		if ((target->getBoundingBox().containsPoint(Vec2(_nodeRef.at(i)->getPositionX() + extraX, _nodeRef.at(i)->getPositionY()))) && (target->getName().compare(_nodeRef.at(i)->getName()) == 0))
		{
			if (menu->getCurrentLevel() == 1)
			{
				this->removeChildByName("help");
			}
			menu->pickNumber(atoi(target->getName().c_str()),atoi(_nodeRef.at(i)->getName().c_str()),menu->IDENTIFY);

			target->setPositionX(_nodeRef.at(i)->getPositionX()+ extraX);
			target->setPositionY(_nodeRef.at(i)->getPositionY());
			target->setAnchorPoint(Vec2(0.5, 0.4));
			_eventDispatcher->removeEventListenersForTarget(target);
			CCLOG("correct");
			flag = true;
			_score++;
			CCLOG("score = %d", _score);
			
			menu->addPoints(1);
			_flag = true;
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("sounds/sfx/drop.ogg", false);
			if ( _mid >1 && _score == _five.size())
			{
				CCLOG("_five.size() = %d", _five.size());
				this->scheduleOnce(schedule_selector(Line::scoreBoard), 2);
			}
			else if (_mid ==1 && _score == _tagNum)
			{
				CCLOG("_tagNum = %d", _tagNum);
				this->scheduleOnce(schedule_selector(Line::scoreBoard), 2);
			}
		}
	}
		if(!flag )
		{
			auto name = target->getName();
			auto action = MoveTo::create(1.0, Vec2(_tagX, _tagY));
			target->runAction(Sequence::create(action, CallFunc::create([=]() {
				_flag = true;
			}), NULL));
			menu->addPoints(-1);
			//_flag = true;
			auto randomNumber = 0;
			
			while (true) {
				randomNumber = RandomHelper::random_int(1, 10);
				if (randomNumber != atoi(target->getName().c_str()))
					break;
			}
			menu->pickNumber(atoi(target->getName().c_str()), randomNumber, menu->IDENTIFY);
			
		}
	


}
	

