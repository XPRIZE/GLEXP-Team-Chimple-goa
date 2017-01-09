
#include "Pillar.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>


USING_NS_CC;

Pillar::Pillar()
{
	_cakeMove = nullptr;
	
}

Pillar::~Pillar()
{

}

Pillar * Pillar::create()
{
	Pillar* PillarGame = new (std::nothrow) Pillar();
	if (PillarGame && PillarGame->init()) {
		PillarGame->autorelease();
		return PillarGame;
	}
	CC_SAFE_DELETE(PillarGame);
	return nullptr;
}

cocos2d::Scene * Pillar::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Pillar::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Pillar::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool Pillar::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float toplabelX = visibleSize.width / 2 - 30;
	 _differntSceneMapping = {
		{
			{ "candy",  
			{
				{ "bg", "layercandy/layercandy.csb"},
				{ "ladder", "ladder_6"},
				{ "cakePath", "layercandy/cake1.png"},
				{ "character", "layercandy/girl.csb"},
				{ "ladderpath", "layercandy/ladder.json"},
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
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

	//std::vector<std::string> theme = { "candy","iceLand","farm" };
	//_scenePath = differntSceneMapping.at(theme.at(cocos2d::RandomHelper::random_int(0, 2)));//cocos2d::RandomHelper::random_int(0, 2)

	

	

	 return true;


}
void Pillar::onEnterTransitionDidFinish()
{
	CCLOG("onEnterTransitionDidFinish begin");
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Node::onEnterTransitionDidFinish();
	int level = menu->getCurrentLevel();
	std::string themeName;
	int division = ((level - 1) % 15) + 1;
	if (division >= 1 && division < 6) {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division + ((roundLevel - 1) * 5);
		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Synonyms Level = %d", inner);
		themeName = "candy";
		_title = LangUtil::getInstance()->translateString("Identify the NOUN");
		_wordCorrect = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, subLevel);
		std::copy(std::begin(_wordCorrect), std::end(_wordCorrect), std::back_inserter(_wordList));
		auto wordVerb = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 6, subLevel);
		std::copy(std::begin(wordVerb), std::end(wordVerb), std::inserter(_wordList, _wordList.end()));
		auto wordAdj = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 6, subLevel);
		std::copy(std::begin(wordAdj), std::end(wordAdj), std::inserter(_wordList, _wordList.end()));
	}
	else if (division > 5 && division < 11) {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division - 5 + ((roundLevel - 1) * 5);

		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Antonyms Level = %d", inner);
		themeName = "iceLand";
		_title = LangUtil::getInstance()->translateString("Identify the VERB");
		_wordCorrect = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, subLevel);
		std::copy(std::begin(_wordCorrect), std::end(_wordCorrect), std::back_inserter(_wordList));
		auto wordVerb = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 6, subLevel);
		std::copy(std::begin(wordVerb), std::end(wordVerb), std::inserter(_wordList, _wordList.end()));
		auto wordAdj = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 6, subLevel);
		std::copy(std::begin(wordAdj), std::end(wordAdj), std::inserter(_wordList, _wordList.end()));
	}
	else {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division - 10 + ((roundLevel - 1) * 5);

		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		themeName = "farm";
		_title = LangUtil::getInstance()->translateString("Identify the ADJECTIVE");
		_wordCorrect = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, subLevel);
		std::copy(std::begin(_wordCorrect), std::end(_wordCorrect), std::back_inserter(_wordList));
		auto wordVerb = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 6, subLevel);
		std::copy(std::begin(wordVerb), std::end(wordVerb), std::inserter(_wordList, _wordList.end()));
		auto wordAdj = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 6, subLevel);
		std::copy(std::begin(wordAdj), std::end(wordAdj), std::inserter(_wordList, _wordList.end()));
	}

	_scenePath = _differntSceneMapping.at(themeName);

	background = CSLoader::createNode(_scenePath.at("bg"));
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);


	_ladder = background->getChildByName(_scenePath.at("ladder"));
	//ladder->setPosition(Vec2(1500,300));
	_character = CSLoader::createNode(_scenePath.at("character"));
	_character->setPositionY(_ladder->getContentSize().height);
	_character->setPositionX(_ladder->getContentSize().width / 2);
	_ladder->addChild(_character);



	_Ref.push_back(background->getChildByName(_scenePath.at("point1")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point2")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point3")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point4")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point5")));
	//  _Ref.at(0)->setContentSize(cocos2d::Size(100, 100));
	//_pointRef = (Sprite*)_Ref.at(0);
	
	if (_scenePath.at("animation_select").compare("one") == 0)
	{
		_pointRef = (Sprite*)background->getChildByName("base_1");
	}
	else if (_scenePath.at("animation_select").compare("two") == 0)
	{
		_pointRef = (Sprite*)background->getChildByName("base_1");
		//_pointRef->setPositionX(visibleSize.width/2 - 230 + extraX);
		//_pointRef->setPositionY(visibleSize.height/2 - 800);
		//_pointRef->setVisible(false);
		//this->addChild(_pointRef);
	}
	else if (_scenePath.at("animation_select").compare("three") == 0)
	{
		_pointRef = (Sprite*)background->getChildByName("holder_2");
		//_pointRef->setContentSize(Size(200 + extraX, _pointRef->getContentSize().height));
	}
	//_pointRef->setAnchorPoint(Vec2(0, 0.5));
	//_pointRef->setContentSize(Size(200 + extraX, _pointRef->getContentSize().height));
	//_pointRef->setVisible(true);
	//auto node = DrawNode::create();
	//auto nodeWidth = sssize.width * 1.25;
	/* Vec2 vertices[] =
	{
		Vec2(_pointRef->getPositionX(),_pointRef->getPositionY()),
		Vec2(_pointRef->getPositionX()+ 500 + extraX, _pointRef->getPositionY()),

		Vec2(_pointRef->getPositionX()+ 500 + extraX,_pointRef->getPositionY()),
		Vec2(_pointRef->getPositionX(),_pointRef->getPositionY())

	};
	node->drawPolygon(vertices, 4, Color4F(1.0f, 0.3f, 0.3f, 0), 3, Color4F(0.2f, 0.2f, 0.2f, 1));
	addChild(node);*/

	auto swingAction = CallFunc::create(CC_CALLBACK_0(Pillar::blink, this, "blink", false));
	runAction(RepeatForever::create(Sequence::create(DelayTime::create(1 + (rand() % 60) / 30.0), swingAction, NULL)));

	if (_scenePath.at("animation_select").compare("two") == 0)
	{
		auto bubble = background->getChildByName("bubble");
		auto timeline = CSLoader::createTimeline("layerisland/bubble.csb");
		bubble->runAction(timeline);
		timeline->play("bubble", true);

		auto bubble1 = background->getChildByName("bubble_1");
		auto timeline1 = CSLoader::createTimeline("layerisland/bubble.csb");
		bubble1->runAction(timeline1);
		timeline1->play("bubble", true);

		auto bubble2 = background->getChildByName("bubble_2");
		auto timeline2 = CSLoader::createTimeline("layerisland/bubble.csb");
		bubble2->runAction(timeline2);
		timeline2->play("bubble", true);
	}
	if (_scenePath.at("animation_select").compare("three") == 0)
	{

		auto smoke = background->getChildByName("FileNode_1");
		auto timeline = CSLoader::createTimeline("layerfarm/smoke.csb");
		smoke->runAction(timeline);
		timeline->gotoFrameAndPlay(0, true);

		auto wind = background->getChildByName("FileNode_2_0_0");
		auto timeline1 = CSLoader::createTimeline("layerfarm/windmill.csb");
		wind->runAction(timeline1);
		timeline1->gotoFrameAndPlay(0, true);

		auto wind1 = background->getChildByName("FileNode_2");
		auto timeline2 = CSLoader::createTimeline("layerfarm/windmill.csb");
		wind1->runAction(timeline2);
		timeline2->gotoFrameAndPlay(0, true);

		auto wind2 = background->getChildByName("FileNode_2_0");
		auto timeline3 = CSLoader::createTimeline("layerfarm/windmill.csb");
		wind2->runAction(timeline3);
		timeline3->gotoFrameAndPlay(0, true);
	}



	newCake();
	ladderMove();
	this->scheduleUpdate();
	menu->setMaxPoints(4);
	auto  gameLayer = Layer::create();
	this->addChild(gameLayer);
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(Pillar::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, gameLayer);
	CCLOG("onEnterTransitionDidFinish end");
}
void Pillar::gameHelp()
{
	CCLOG("gameHelp begin");
	_helpFlage = true;
	//game help only for first level
	auto labelSize = _cake->getContentSize();
	auto labelPosition = _cake->getPosition();
	/*auto ans = _synonyms.at(_gameWord);
	std::string name;
	for (int i = 0; i < _answers.size(); i++) {
		if (_answers.at(i).find(ans) == 0) {
			CCLOG("help");
			name = _answers.at(i);
		}
	}*/
	auto optionLayer = _topLabel;
	auto optionSize = optionLayer->getContentSize();
	auto optionPosition = optionLayer->getPosition();
	auto help = HelpLayer::create(Rect(_pointRef->getPositionX() + extraX, _ladder->getContentSize().height + _ladder->getPositionY(), labelSize.width , labelSize.height ),Rect(0,0,0,0));
	help->click(Vec2(_pointRef->getPositionX() + extraX, _ladder->getContentSize().height + _ladder->getPositionY() ));
	help->setName("helpLayer");
	this->addChild(help);
	CCLOG("gameHelp end");
}
void Pillar::blink(std::string animationName, bool loop)
{
	CCLOG("blink begin");
	auto timeline = CSLoader::createTimeline(_scenePath.at("character"));
	_character->runAction(timeline);
	timeline->play(animationName, loop);
	CCLOG("blink end");
}
void Pillar::ladderMove()
{
	CCLOG("ladderMove begin");
	auto rotate = RotateBy::create(1.0, 40);
	auto rev = rotate->reverse();
	auto rotate1 = RotateBy::create(1.0, -40);
	auto rev1 = rotate1->reverse();
	auto seq = Sequence::create(rotate, rev, rotate1, rev1, NULL);
    auto action = RepeatForever::create(seq);
	_ladder->runAction(action);
	CCLOG("ladderMove end");
	
}
void Pillar::newCake()
{
	CCLOG("newCake begin");
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_ladder->setRotation(0.0f);
	_cake = Sprite::createWithSpriteFrameName(_scenePath.at("cakePath"));
	//_cake->setScale(0.55);
	if (_scenePath.at("animation_select").compare("one") == 0)
	{
		_cake->setPositionX(_ladder->getContentSize().width / 2 + 18);
	}
	else
	{
		_cake->setPositionX(_ladder->getContentSize().width / 2 );
	}
	_cake->setPositionY(_ladder->getContentSize().height);
	_ladder->addChild(_cake);
	

	//_sentence = LangUtil::getInstance()->translateString(_title);
	auto topLabel = Label::createWithTTF(_title, "fonts/Roboto-Regular.ttf", 100);
	topLabel->setColor(Color3B(0, 0, 0));
	topLabel->setPositionX(visibleSize.width / 2);
	topLabel->setPositionY(visibleSize.height - 50);
	this->addChild(topLabel);


	int size = _wordList.size();
	_num = cocos2d::RandomHelper::random_int(0, size-1);
	//int num = rand() % _wordList.size();
	_topLabel = Label::createWithTTF(_wordList.at(_num).c_str(), "fonts/Roboto-Regular.ttf", 100);
	_topLabel->setPositionX(_cake->getContentSize().width / 2);
	_topLabel->setPositionY(_cake->getContentSize().height/2);
	if (_scenePath.at("animation_select").compare("one") == 0)
	{
		_topLabel->setColor(Color3B(255,255, 255));
	}
	else
	{
		_topLabel->setColor(Color3B(255, 255, 255));
	}
	auto labelSize = _wordList.at(_num).size();
	if (labelSize > 8)
	{
		_topLabel->setScaleX(0.7);
	}
	
	_cake->addChild(_topLabel);

	if (menu->getCurrentLevel() == 1 && _score == 0) {
		this->removeChildByName("helpLayer");
		int numb = _wordCorrect.size() - 1;
		auto str = _wordCorrect.at(RandomHelper::random_int(0, numb));
		auto index = std::find(_wordList.begin(), _wordList.end(), str);
		_num = std::distance(_wordList.begin(), index);
		_topLabel->setString(str);
		gameHelp();
	}
	CCLOG("newCake end");
}

void Pillar::update(float dt)
{
	CCLOG("update begin");
	Size visibleSize = Director::getInstance()->getVisibleSize();
	if (_cakeMove != nullptr)
	{
		
		if (_cakeMove->getBoundingBox().intersectsRect((_pointRef)->getBoundingBox()) && _rotateFlag)
		{
			_cakeMove->stopAllActions();
			if (_count == 0)
			{
				if (_scenePath.at("animation_select").compare("two") == 0)
				{
					_cakeMove->setPositionX(_pointRef->getPositionX() + 40 + extraX);
					_cakeMove->setPositionY(_pointRef->getPositionY() + 30);
					
				}
				else if (_scenePath.at("animation_select").compare("three") == 0)
				{
					_cakeMove->setPositionX(_pointRef->getPositionX()+ 15 + extraX);
					_cakeMove->setPositionY(_pointRef->getPositionY()+ 40);
					
				}
				else
				{
					_cakeMove->setPositionX(_pointRef->getPositionX() + extraX);
					_cakeMove->setPositionY(_pointRef->getPositionY() + 80);
					
				}
			}
			else
			{
				
				_cakeMove->setPositionX(_pointRef->getPositionX() );
				_cakeMove->setPositionY(_pointRef->getPositionY() + 100);
			}
			if (_cakeFlag == false)
			{
				
				auto timeline = CSLoader::createTimeline(_scenePath.at("character"));
				_character->runAction(timeline);
				timeline->play(_scenePath.at("happy"), false);
				runAction(Sequence::create(DelayTime::create(2), CallFunc::create([=]() {
					_pointRef = _cakeMove;
					//_cakeMove = nullptr;
					_pillarRef.push_back(_cakeMove);
					CCLOG("cake initial = %d", _pillarRef.size());
				//	_cakeMove = nullptr;
					_score++;
					_count++;
					menu->addPoints(1);
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/success.ogg", false);
					CCLOG("score = %d", _score);
					newCake();
					ladderMove();
				}), NULL));

				_rotateFlag = false;
			}
			else
			{
				
				this->removeChild(_cakeMove);
				auto timeline1 = CSLoader::createTimeline(_scenePath.at("character"));
				_character->runAction(timeline1);
				timeline1->play(_scenePath.at("cry"), false);
				if (_pillarRef.size() != 0 )
				{
					CCLOG("initial = % d", _pillarRef.size());
					this->removeChild(_pillarRef.at(_pillarRef.size() - 1));
					_pillarRef.pop_back();
					CCLOG("size pop = % d", _pillarRef.size());
					if (_pillarRef.size() == 0)
					{
						CCLOG("size if pop = % d", _pillarRef.size());
						if (_scenePath.at("animation_select").compare("one") == 0)
						{
							_pointRef = (Sprite*)background->getChildByName("base_1");
						}
						else if (_scenePath.at("animation_select").compare("two") == 0)
						{
							_pointRef = (Sprite*)background->getChildByName("base_1");
							//_pointRef->setPositionX(visibleSize.width / 2  - 230+ extraX);
							//_pointRef->setPositionY(visibleSize.height / 2 - 800);
							//_pointRef->setVisible(false);
							//this->addChild(_pointRef);

						}
						else if (_scenePath.at("animation_select").compare("three") == 0)
						{
							_pointRef = (Sprite*)background->getChildByName("holder_2");
						}
						_count = 0;
					}
					else
					{
						CCLOG("size else pop = % d", _pillarRef.size());
						_pointRef = _pillarRef.at(_pillarRef.size() - 1);
					}
					
				}
				else
				{
					if (_scenePath.at("animation_select").compare("one") == 0)
					{
						_pointRef = (Sprite*)background->getChildByName("base_1");
					}
					else if (_scenePath.at("animation_select").compare("two") == 0)
					{
						_pointRef = (Sprite*)background->getChildByName("base_1");
						//_pointRef->setPositionX(visibleSize.width / 2  - 230+ extraX);
						//_pointRef->setPositionY(visibleSize.height / 2 - 800);
						//_pointRef->setVisible(false);
						//this->addChild(_pointRef);

					}
					else if (_scenePath.at("animation_select").compare("three") == 0)
					{
						_pointRef = (Sprite*)background->getChildByName("holder_2");
					}
				}
				_cakeMove = nullptr;
				//_score--;
				menu->addPoints(-1);
				auto audio1 = CocosDenshion::SimpleAudioEngine::getInstance();
				audio1->playEffect("sounds/sfx/error.ogg", false);
				CCLOG("score = %d", _score);
				_rotateFlag = false;
			}
			//CCLOG("size = %d", _pillarRef.size());
			if (_pillarRef.size() == 4)
			{
				std::string header = "";
				//CCLOG("size = %d", _pillarRef.size());
				if (_scenePath.at("animation_select").compare("one") == 0)
				{
					 header = LangUtil::getInstance()->translateString("List of Nouns");
				}
				else if (_scenePath.at("animation_select").compare("two") == 0)
				{
					 header = LangUtil::getInstance()->translateString("List of Verbs");
				}
				else
				{
					 header = LangUtil::getInstance()->translateString("List of Adjectives");
				}
				menu->showAnswer("Words", header);
			}
			//_cakeMove->setPosition(_Ref.at(0)->getPositionX(), _Ref.at(0)->getPositionY());
		}
		
	}
	CCLOG("update end");
}
void Pillar::enableListener(float dt)
{
	_cakeTouchFlag = true;

}
bool Pillar::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	CCLOG("onTouchBegan begin");
	Size visibleSize = Director::getInstance()->getVisibleSize();
	
	
	//Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	

	if (_cakeTouchFlag && _cake != nullptr)
	{
		auto target = event->getCurrentTarget();
		auto  location = _cake->getParent()->convertToWorldSpace(_cake->getPosition());
		_cakeTouchFlag = false;
		this->scheduleOnce(schedule_selector(Pillar::enableListener), 3);
		auto check =_wordList.at(_num);
			if (std::find(_wordCorrect.begin(), _wordCorrect.end(),check) != _wordCorrect.end())
			{
				CCLOG("done\\\\\\\\");
				_cakeFlag = false;
				_ladder->stopAllActions();
				_ladder->removeChild(_cake);
				_cake = nullptr;
				_ladder->removeChild(_topLabel);
				_cakeMove = Sprite::createWithSpriteFrameName(_scenePath.at("cakePath"));
				//_cakeMove->setScale(0.55);
				
				auto size = _cakeMove->getContentSize();
				if (_scenePath.at("animation_select").compare("two") == 0)
				{
					_cakeMove->setContentSize(Size(size.width, size.height - 30));
				}
				else
				{
					_cakeMove->setContentSize(Size(size.width, size.height - 60));
				}
				
				//_cakeMove->setColor(Color3B(212, 232, 222));
				_cakeMove->setPositionX(location.x);
				_cakeMove->setPositionY(location.y);
				this->addChild(_cakeMove);
				auto labelCake = Label::createWithTTF(check.c_str(), "fonts/Roboto-Regular.ttf", 100);
				labelCake->setPositionX(_cakeMove->getContentSize().width/2);
				if (_scenePath.at("animation_select").compare("three") == 0)
				{
					labelCake->setPositionY(_cakeMove->getContentSize().height / 2 - 25);
					labelCake->setColor(Color3B(255, 255, 255));
				}
				else if (_scenePath.at("animation_select").compare("two") == 0)
				{
					labelCake->setPositionY(_cakeMove->getContentSize().height / 2 - 10);
					labelCake->setColor(Color3B(255, 255, 255));
				}
				else
				{
					labelCake->setPositionY(_cakeMove->getContentSize().height / 2);
					labelCake->setColor(Color3B(255, 255, 255));
				}		
				//labelCake->setColor(Color3B(255, 255, 255));
				if (check.size() > 8)
				{
					labelCake->setScaleX(0.7);
				}
				_cakeMove->addChild(labelCake);
				auto callbackStart = CallFunc::create(CC_CALLBACK_0(Pillar::newCake, this));
				auto callbackStart1 = CallFunc::create(CC_CALLBACK_0(Pillar::ladderMove, this));
				
				
				auto cakeFall = MoveBy::create(1.5, Vec2(0, -1800));
				//_cakeMove->runAction(cakeFall);
				auto seq = Sequence::create(cakeFall, callbackStart, callbackStart1, NULL);
				//auto action = RepeatForever::create(seq);
				_cakeMove->runAction(seq);
				_rotateFlag = true;
				
				this->removeChildByName("helpLayer");
				_helpFlage = false;
				menu->wordPairList(check);
			}

			else
			{
				_cakeFlag = true;
				_ladder->stopAllActions();
				_ladder->removeChild(_cake);
				_cake = nullptr;
				_ladder->removeChild(_topLabel);
				_cakeMove = Sprite::createWithSpriteFrameName(_scenePath.at("cakePath"));
				//_cakeMove->setScale(0.55);

				auto size = _cakeMove->getContentSize();
				if (_scenePath.at("animation_select").compare("two") == 0)
				{
					_cakeMove->setContentSize(Size(size.width, size.height - 30));
				}
				else
				{
					_cakeMove->setContentSize(Size(size.width, size.height - 60));
				}

				//_cakeMove->setColor(Color3B(212, 232, 222));
				_cakeMove->setPositionX(location.x);
				_cakeMove->setPositionY(location.y);
				this->addChild(_cakeMove);
				auto labelCake = Label::createWithTTF(check.c_str(), "fonts/Roboto-Regular.ttf", 100);
				labelCake->setPositionX(_cakeMove->getContentSize().width / 2);
				if (_scenePath.at("animation_select").compare("three") == 0)
				{
					labelCake->setPositionY(_cakeMove->getContentSize().height / 2 - 25);
					labelCake->setColor(Color3B(255, 255, 255));
				}
				else if(_scenePath.at("animation_select").compare("two") == 0)
				{
					labelCake->setPositionY(_cakeMove->getContentSize().height / 2 -10);
					labelCake->setColor(Color3B(255, 255, 255));
				}
				else
				{
					labelCake->setPositionY(_cakeMove->getContentSize().height / 2);
					labelCake->setColor(Color3B(255, 255, 255));
				}
				//labelCake->setColor(Color3B(255, 255, 255));
				if (check.size() > 8)
				{
					labelCake->setScaleX(0.7);
				}
				_cakeMove->addChild(labelCake);
				auto callbackStart = CallFunc::create(CC_CALLBACK_0(Pillar::newCake, this));
				auto callbackStart1 = CallFunc::create(CC_CALLBACK_0(Pillar::ladderMove, this));


				auto cakeFall = MoveBy::create(1.5, Vec2(0, -1800));
				//_cakeMove->runAction(cakeFall);
				auto seq = Sequence::create(cakeFall, NULL);
				//auto action = RepeatForever::create(seq);
				_cakeMove->runAction(seq);
				_rotateFlag = true;
				if (_scenePath.at("animation_select").compare("one") == 0)
				{
					auto puff = CSLoader::createNode("circlecandy/puff.csb");
					puff->setPosition(_ladder->getContentSize().width / 2, _ladder->getContentSize().height);
					_ladder->addChild(puff);
					auto timeline = CSLoader::createTimeline("circlecandy/puff.csb");
					puff->runAction(timeline);
					timeline->play("puff", false);
				}
				auto timeline1 = CSLoader::createTimeline(_scenePath.at("character"));
				_character->runAction(timeline1);
				//timeline1->play(_scenePath.at("cry"), false);
				runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() {
					newCake();
					ladderMove();
				}), NULL));
			}
		
	
	}
	CCLOG("onTouchBegan end");
	return false;
}
