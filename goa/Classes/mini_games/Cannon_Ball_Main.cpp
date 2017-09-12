#include "Cannon_Ball_Main.h"
#include "Cannon_Ball_Listener.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

std::vector<LabelClass*> MainGame::cannonLetter;
std::vector<LabelTTF*> MainGame::cannonLetter_actualImage;

std::vector<LabelClass*> MainGame::bulletArray;
std::vector<LabelTTF*> MainGame::bulletArray_actualImage;

std::vector<EventListenerClass*> MainGame::cannon_ballArray;
std::vector<EventListenerClass*> MainGame::cannonArray;

std::vector<LabelTTF*> MainGame::meteorArray_actualImage;
std::vector<EventListenerClass*> MainGame::letterArray;
std::vector<LabelClass*> MainGame::meteorArray;
std::vector<cocos2d::Node*> MainGame::bulletArray_Animation;
HelpLayer* MainGame::_help;
CocosDenshion::SimpleAudioEngine* MainGame::audioBg;

EventListenerClass* MainGame::cannon1;
EventListenerClass* MainGame::cannon2;
EventListenerClass* MainGame::cannon3;
EventListenerClass* MainGame::cannon4;

int MainGame::_totalHit;
int MainGame::_maxLengthOfQuestion;
int MainGame::_maxLengthOfAnswer;
float MainGame::height;
float MainGame::width;
float MainGame::originX;
float MainGame::originY;
MainGame* MainGame::self;
int MainGame::_helpFlag;
int letterComespeed;
int tweenSpeed;

MainGame::MainGame() 
{

}


MainGame:: ~MainGame() {
	MainGame::audioBg->stopAllEffects();
	_eventDispatcher->removeCustomEventListeners("multipleChoiceQuiz");
}

Scene* MainGame::createScene()
{
	auto scene = Scene::create();
	auto layer = MainGame::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, MainGame::gameName());
    scene->addChild(layer->_menuContext);

	return scene;
}

bool MainGame::init()
{
	if (!Layer::init())
	{
		return false;
	}
//	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(MainGame::PlayVideo, this));

	return true;
}

void MainGame::onEnterTransitionDidFinish()
{
	MainGame::audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
	MainGame::_helpFlag = 0;
	MainGame::_totalHit = 0;
	MainGame::cannonLetter.clear();
	MainGame::cannonLetter_actualImage.clear();

	MainGame::bulletArray.clear();
	MainGame::bulletArray_actualImage.clear();

	MainGame::cannon_ballArray.clear();
	MainGame::cannonArray.clear();

	MainGame::meteorArray_actualImage.clear();
	MainGame::letterArray.clear();
	MainGame::meteorArray.clear();
	MainGame::bulletArray_Animation.clear();

	MainChars.clear();

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	MainGame::height = visibleSize.height;
	MainGame::width = visibleSize.width;
	MainGame::originX = origin.x;
	MainGame::originY = origin.y;

//	_menuContext->setMaxPoints(10);

	p1.x = MainGame::originX + MainGame::width * 88 / 100;
	p1.y = MainGame::originY + MainGame::height * 18 / 100;

	p2.x = MainGame::originX + MainGame::width * 88 / 100;
	p2.y = MainGame::originY + MainGame::height * 32 / 100;

	p3.x = MainGame::originX + MainGame::width * 88 / 100;
	p3.y = MainGame::originY + MainGame::height * 46 / 100;

	p4.x = MainGame::originX + MainGame::width * 88 / 100;
	p4.y = MainGame::originY + MainGame::height * 60 / 100;

	p5.x = MainGame::originX + MainGame::width * 88 / 100;
	p5.y = MainGame::originY + MainGame::height * 74 / 100;

	p8.x = MainGame::originX + MainGame::width * 96 / 100;
	p8.y = MainGame::originY + MainGame::height * 18 / 100;

	p9.x = MainGame::originX + MainGame::width * 96 / 100;
	p9.y = MainGame::originY + MainGame::height * 32 / 100;

	p10.x = MainGame::originX + MainGame::width * 96 / 100;
	p10.y = MainGame::originY + MainGame::height * 46 / 100;

	p11.x = MainGame::originX + MainGame::width * 96 / 100;
	p11.y = MainGame::originY + MainGame::height * 60 / 100;

	p12.x = MainGame::originX + MainGame::width * 96 / 100;
	p12.y = MainGame::originY + MainGame::height * 74 / 100;

	position.push_back(p1);
	position.push_back(p2);
	position.push_back(p3);
	position.push_back(p4);
	position.push_back(p5);
	position.push_back(p8);
	position.push_back(p9);
	position.push_back(p10);
	position.push_back(p11);
	position.push_back(p12);

	p100.x = MainGame::originX;
	p100.y = MainGame::originY + MainGame::height * 15 / 100;

	p101.x = MainGame::originX;
	p101.y = MainGame::originY + MainGame::height * 50 / 100;

	p102.x = MainGame::originX;
	p102.y = MainGame::originY + MainGame::height * 85 / 100;

	letterPosition.push_back(p100);
	letterPosition.push_back(p101);
	letterPosition.push_back(p102);

	self = this;

	//startGame();

	_eventDispatcher->addCustomEventListener("multipleChoiceQuiz", CC_CALLBACK_1(MainGame::startGame, this));
    _lesson.getMultiChoices(10, 0, UPPER_CASE_LETTER_FORMAT, UPPER_CASE_LETTER_FORMAT);
	/*if (_menuContext->getCurrentLevel() == 1)
	{
		displayHelp();
	}
	else
	{
		letterCome(1);
		self->schedule(schedule_selector(MainGame::letterCome), letterComespeed);
	}
	self->scheduleUpdate();*/
}

//	function display help for first time when game is open
void MainGame::displayHelp()
{
	std::string letterName;
	std::vector<std::string> chars =_mainQuestions[0];

	letterName = chars[0];

	int val = 1;
	EventListenerClass *lett = EventListenerClass::createSprite("cannonball/cannonball_mainasset/meteor.png", MainGame::width * .10, MainGame::lettertmpPosition[val].y, letterName, self);
	this->addChild(lett);
	MainGame::letterArray.push_back(lett);

	LabelClass *meteor = LabelClass::createSpt(letterName, MainGame::width * .10, MainGame::lettertmpPosition[val].y, letterName, self);
	MainGame::meteorArray.push_back(meteor);

	//Alphabet *myLabel = Alphabet::createWithSize(letterName, 300); old code
	LabelTTF  *myLabel = CommonLabelTTF::create(letterName, "Helvetica", 150);
	myLabel->setFontSize(std::max(float(50.0), float(150 - (_maxLengthOfAnswer - 1) * 10)));
	myLabel->setPosition(lett->getBoundingBox().size.width / 2, lett->getBoundingBox().size.height / 2.2);
	lett->addChild(myLabel);
	MainGame::meteorArray_actualImage.push_back(myLabel);

	MainGame::lettertmpPosition.erase(MainGame::lettertmpPosition.begin() + val);

	if (_menuContext->getCurrentLevel() == 1)
	{
		for (int i = 0; i < MainGame::cannon_ballArray.size(); i++)
		{
			if (MainGame::cannon_ballArray[i]->id == letterName)
			{
				MainGame::_help = HelpLayer::create(Rect(MainGame::cannon_ballArray[i]->getPositionX(), MainGame::cannon_ballArray[i]->getPositionY(), MainGame::cannon_ballArray[i]->getContentSize().width, MainGame::cannon_ballArray[i]->getContentSize().height), Rect(MainGame::width * .10, lett->getPositionY(), lett->getBoundingBox().size.width, lett->getBoundingBox().size.height));
				MainGame::_help->clickAndDrag(Vec2(MainGame::cannon_ballArray[i]->getPositionX(), MainGame::cannon_ballArray[i]->getPositionY()), Vec2(MainGame::cannon2->getPositionX(), MainGame::cannon2->getPositionY()));
				this->addChild(MainGame::_help, 4);
				MainGame::_helpFlag = 1;
				break;
			}
		}
	}
}

void MainGame::PlayVideo()
{
    _menuContext->showStartupHelp(CC_CALLBACK_0(MainGame::AfterPlayVideo, this));
//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp, _menuContext)), CallFunc::create(CC_CALLBACK_0(MainGame::AfterPlayVideo, this)), NULL));
}

void MainGame::AfterPlayVideo()
{
//	MainGame::audioBg->playEffect("cannonball/gamesound/background1.ogg", true);
} 

void MainGame::startGame(cocos2d::EventCustom *eventCustom)	// starting of game
{
	lettertmpPosition = letterPosition;

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");

	// main background
	auto mySprite = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/background_back.png");
	mySprite->setPosition(origin.x + visibleSize.width * 43 / 100, origin.y + visibleSize.height / 2);
	this->addChild(mySprite);

	auto rack = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/cannon_ball_rack.png");
	rack->setPosition(origin.x + visibleSize.width * 85 / 100, origin.y + visibleSize.height / 2);
	this->addChild(rack);

	// front background
	backGround_front = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/background_front.png");
	backGround_front->setPosition(origin.x + visibleSize.width * 43 / 100, origin.y + visibleSize.height / 2);
	this->addChild(backGround_front);


	for (int i = 0; i < position.size(); i++)
	{
		auto mm = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/cannon_ball_rackpouch.png");
		mm->setPosition(position[i].x, position[i].y);
		this->addChild(mm);
	}

	cannon1 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 0, origin.x + (visibleSize.width * 71 / 100), (visibleSize.height * 15 / 100));
	this->addChild(cannon1, 3);

	cannon2 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 1, origin.x + (visibleSize.width * 71 / 100), (visibleSize.height * 50 / 100));
	this->addChild(cannon2, 3);

	cannon3 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 2, origin.x + (visibleSize.width * 71 / 100), (visibleSize.height * 85 / 100));
	this->addChild(cannon3, 3);

	cannonArray.push_back(cannon1);
	cannonArray.push_back(cannon2);
	cannonArray.push_back(cannon3);

	auto layer = LayerGradient::create(Color4B(255, 0, 0, 255), Color4B(255, 0, 255, 255));
	layer->setContentSize(Size(cannon1->getBoundingBox().size.width, cannon1->getBoundingBox().size.height));
	layer->setPosition(Vec2(cannon1->getPositionX()- cannon1->getBoundingBox().size.width/2, cannon1->getPositionY() - cannon1->getContentSize().height / 2));
//	this->addChild(layer, 20);

	// _revampToNewLessonGame

	//auto vmc = _lesson.getMultiChoices(10, 0);
	
	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallMultiChoices");
	vector<Lesson::MultiChoice> vmc = Lesson::unmarshallMultiChoices(buf);

	_vmc = vmc;
	_mainQuestions.clear();
	int column = 10, row = 1;
	_mainQuestions.resize(row);
	_mainQuestions[0].resize(column);

	_mainAnswers.resize(row);
	_mainAnswers[0].resize(column);

	_maxLengthOfAnswer = getMaxWordLength(_mainAnswers[0]);
	_maxLengthOfQuestion = getMaxWordLength(_mainQuestions[0]);

	for (size_t i = 0; i < 10; i++) {
		_mainQuestions[0][i] = vmc[i].question;
		_mainAnswers[0][i] = vmc[i].answers[vmc[i].correctAnswer];
	}

	//
	/*if (_menuContext->getCurrentLevel() >= 1 && _menuContext->getCurrentLevel() <= 4)
	{
		MainChars = CharGenerator::getInstance()->generateCharMatrix(1, 10, true, true);
	}
	else if (_menuContext->getCurrentLevel() >= 5 && _menuContext->getCurrentLevel() <= 8)
	{
		MainChars = CharGenerator::getInstance()->generateCharMatrix(1, 10, true, false);
	}
	else
		MainChars = CharGenerator::getInstance()->generateNumberMatrix(1, 10, true);*/


	letterComespeed = 5;
	tweenSpeed = 40;

	if(_menuContext->getCurrentLevel() ==4 || _menuContext->getCurrentLevel() == 8)
		letterComespeed = 3;

	cannonLetterCome();
	if (_menuContext->getCurrentLevel() == 1)
	{
		displayHelp();
	}
	else
	{
		letterCome(1);
		self->schedule(schedule_selector(MainGame::letterCome), letterComespeed);
	}
	self->scheduleUpdate();
}

void MainGame::letterCome(float d)
{
	if (MainGame::cannonArray.size() == 0)
	{
/*		for (int i = 0; i < MainGame::letterArray.size(); i++)
		{
			this->removeChild(MainGame::letterArray[i]);

			MainGame::meteorArray_actualImage.erase(std::remove(MainGame::meteorArray_actualImage.begin(), MainGame::meteorArray_actualImage.end(), MainGame::meteorArray_actualImage[i]));
			MainGame::meteorArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), MainGame::meteorArray[i]));
			MainGame::letterArray.erase(std::remove(MainGame::letterArray.begin(), MainGame::letterArray.end(), MainGame::letterArray[i]));
		}

		for (int i = 0; i < MainGame::bulletArray.size(); i++)
		{
			this->removeChild(MainGame::bulletArray_actualImage[i]);
			MainGame::bulletArray_actualImage.erase(std::remove(MainGame::bulletArray_actualImage.begin(), MainGame::bulletArray_actualImage.end(), MainGame::bulletArray_actualImage[i]));
			MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[i]));
			MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[i]));
			i--;
		}

		for (int i = 0; i < MainGame::cannonLetter.size(); i++)
		{
			if (MainGame::cannonLetter[i] != NULL)
			{
				this->removeChild(MainGame::cannon_ballArray[i]);
				MainGame::cannon_ballArray.erase(std::remove(MainGame::cannon_ballArray.begin(), MainGame::cannon_ballArray.end(), MainGame::cannon_ballArray[i]));
				MainGame::cannonLetter.erase(std::remove(MainGame::cannonLetter.begin(), MainGame::cannonLetter.end(), MainGame::cannonLetter[i]));
				MainGame::cannonLetter_actualImage.erase(std::remove(MainGame::cannonLetter_actualImage.begin(), MainGame::cannonLetter_actualImage.end(), MainGame::cannonLetter_actualImage[i]));
				i--;
			}
		}
*/
		this->unscheduleUpdate();
		_menuContext->showScore();

//		startGame();
	}

	if (MainGame::letterArray.size() < MainGame::cannonArray.size())
	{
		int flag = 0;
		//wchar_t letterName;
		//std::vector<wchar_t> chars = MainChars[0];
		std::string letterName;
		//std::vector<std::string> chars = _mainQuestions[0]; Old Value
		std::vector<std::string> chars = _mainAnswers[0];

		while (flag == 0)
		{
			letterName = chars[rand() % chars.size()];

			for (int i = 0; i < MainGame::cannonLetter.size(); i++)
			{
				LabelClass *idmatcher_cannonLetter = static_cast<LabelClass*>(MainGame::cannonLetter[i]);
				if (letterName == idmatcher_cannonLetter->id)
				{
					for (int j = 0; j < MainGame::letterArray.size(); j++)
					{
						EventListenerClass * idmatcher_letterArray = static_cast<EventListenerClass*>(MainGame::letterArray[j]);
						if (letterName == idmatcher_letterArray->id)
						{
							flag++;
							i = MainGame::cannonLetter.size();
							break;
						}
					}
					if (MainGame::letterArray.size() == 0 || flag == 0)
					{
						flag++;
						i = MainGame::cannonLetter.size();
						break;
					}
					else if (flag != 0)
					{
						flag = 0;
					}
				}
			}
		}

		int val = rand() % MainGame::lettertmpPosition.size();
		EventListenerClass *lett = EventListenerClass::createSprite("cannonball/cannonball_mainasset/meteor.png", MainGame::lettertmpPosition[val].x, MainGame::lettertmpPosition[val].y, letterName, self);
		this->addChild(lett);
		MainGame::letterArray.push_back(lett);

		LabelClass *meteor = LabelClass::createSpt(letterName, MainGame::lettertmpPosition[val].x, MainGame::lettertmpPosition[val].y, letterName, self);
		MainGame::meteorArray.push_back(meteor);
	

		//Alphabet *myLabel = Alphabet::createWithSize(letterName, 300); old code
		LabelTTF  *myLabel = CommonLabelTTF::create(letterName, "Helvetica", 150);
		myLabel->setFontSize(std::max(float(50.0), float(150 - (_maxLengthOfAnswer - 1) * 10)));
		myLabel->setPosition(lett->getBoundingBox().size.width / 2, lett->getBoundingBox().size.height / 2.2);
		lett->addChild(myLabel);
		MainGame::meteorArray_actualImage.push_back(myLabel);

		MainGame::lettertmpPosition.erase(MainGame::lettertmpPosition.begin() + val);

		auto callBack = CallFunc::create([this, lett]() { removeLetter(lett); });
		auto moveto = MoveTo::create(tweenSpeed, Vec2(MainGame::width + 50, lett->getPosition().y));
		auto seq = Sequence::create(moveto, callBack, NULL);
		lett->runAction(seq);
	}
	else
	{
//		Director::getInstance()->pause();
	}
}

void MainGame::removeLetter(EventListenerClass *img)
{
	if (MainGame::lettertmpPosition.size() < 4)
	{
		Position pp;
		pp.x = img->xP;
		pp.y = img->yP;
		MainGame::lettertmpPosition.push_back(pp);
	}

	int ind = std::find(MainGame::letterArray.begin(), MainGame::letterArray.end(), img) - MainGame::letterArray.begin();
	MainGame::letterArray.erase(MainGame::letterArray.begin() + ind);
	MainGame::meteorArray.erase(MainGame::meteorArray.begin() + ind);
	MainGame::meteorArray_actualImage.erase(MainGame::meteorArray_actualImage.begin() + ind);

	this->removeChild(img);
}

void MainGame::cannonLetterCome()	//cannon letter will come which will be dragged on the cannon
{
	if (MainGame::cannonLetter.size() == 0)
	{
		std::vector<std::string> tmpMainChars = _mainQuestions[0];

		MainGame::cannon_ballArray.clear();
		for (int i = 0; i < position.size(); i++)
		{
			std::string letterName = tmpMainChars[i];
			EventListenerClass * e1 = EventListenerClass::createCannonBall("cannon_ball.png", cannon1, cannon2, cannon3, i, tmpMainChars[i], position[i].x, position[i].y, self);
			this->addChild(e1);
			MainGame::cannon_ballArray.push_back(e1);

			// _chnage
			//Alphabet *myLabel = Alphabet::createWithSize(tmpMainChars[i], 200); old code
			LabelTTF  *myLabel = CommonLabelTTF::create(tmpMainChars[i], "Helvetica", 100);
			myLabel->setFontSize(std::max(float(50.0), float(100 - (_maxLengthOfQuestion - 1) * 10)));
			myLabel->setPosition(e1->getBoundingBox().size.width/2 , e1->getBoundingBox().size.height/2);
			e1->addChild(myLabel);			
			MainGame::cannonLetter_actualImage.push_back(myLabel);

			LabelClass *lb = LabelClass::createSpt(letterName, position[i].x, position[i].y, letterName, self);
			MainGame::cannonLetter.push_back(lb);
		}
	}
	else
	{
		int remcharPos;
		LabelClass *remchar = NULL;
		int flag = 0;
		for (int i = 0; i < MainGame::cannonLetter.size(); i++)
		{
			LabelClass *eventCannonLetterObject = static_cast<LabelClass*>(MainGame::cannonLetter[i]);
			if (eventCannonLetterObject->flag == 1 && eventCannonLetterObject->answer =="n")
			{
				remchar = eventCannonLetterObject;
				remcharPos = i;
				flag++;
				break;
			}
			else if (eventCannonLetterObject->flag == 1 && eventCannonLetterObject->answer == "y")
			{
				remchar = eventCannonLetterObject;
				remcharPos = i;
				break;
			}
		}

		if (remchar != NULL)
		{
			std::string letterName;
			if (flag == 0)
			{
				//wchar_t lett; 
				std::string lett;
			/*	if (_menuContext->getCurrentLevel() >= 1 && _menuContext->getCurrentLevel() <= 4)
				{
					lett = CharGenerator::getInstance()->generateAnotherChar(MainChars[0], true);
				}
				else if (_menuContext->getCurrentLevel() >= 5 && _menuContext->getCurrentLevel() <= 8)
				{
					lett = CharGenerator::getInstance()->generateAnotherChar(MainChars[0], false);
				}
				else*/
					lett = _mainQuestions[0][remcharPos];

				_mainQuestions[0][remcharPos] = lett;
				letterName = lett;
			}
			else
				letterName = remchar->id;

			EventListenerClass *letter = EventListenerClass::createCannonBall("cannon_ball.png", cannon1, cannon2, cannon3, remcharPos, letterName, remchar->xP, remchar->yP, self);
			MainGame::cannon_ballArray[remcharPos] = letter;
			self->addChild(letter);

			//Alphabet *myLabel = Alphabet::createWithSize(letterName, 200); old code
			LabelTTF  *myLabel = CommonLabelTTF::create(letterName, "Helvetica", 100);
			myLabel->setFontSize(std::max(float(50.0), float(100 - (_maxLengthOfQuestion - 1) * 10)));
			myLabel->setPosition(letter->getBoundingBox().size.width / 2, letter->getBoundingBox().size.height / 2);
			letter->addChild(myLabel);
			MainGame::cannonLetter_actualImage[remcharPos] = myLabel;

			LabelClass *let = LabelClass::createSpt(letterName, remchar->xP, remchar->yP, letterName, self);
			MainGame::cannonLetter[remcharPos] = let;
		}
	}
}

void MainGame::loadCannon(EventListenerClass* letterObject)
{
	if (MainGame::_helpFlag == 1)
	{
		self->schedule(schedule_selector(MainGame::letterCome), letterComespeed);
		self->removeChild(MainGame::_help);
		MainGame::_helpFlag = -1;
	}
	auto timeline = CSLoader::createTimeline("cannonball_cannonanimation.csb");
	auto mycannon = CSLoader::createNode("cannonball_cannonanimation.csb");

	for (int i = 0; i < MainGame::cannonArray.size(); i++)
	{
		if (MainGame::cannonArray[i]->cannonID == letterObject->placedNumber)
		{
			mycannon->setPosition(MainGame::cannonArray[i]->getPositionX() - 3, MainGame::cannonArray[i]->getPositionY());
			MainGame::cannonArray[i]->setOpacity(0);
			break;
		}
	}
	self->addChild(mycannon);	// add cannon animation

	mycannon->runAction(timeline);
	timeline->gotoFrameAndPause(0);
	timeline->play("cannon_shoot", false);
	timeline->setAnimationEndCallFunc("cannon_shoot", CC_CALLBACK_0(MainGame::startFire, this, letterObject, mycannon));
	MainGame::audioBg->playEffect("cannonball/gamesound/cannonshoot.ogg", false);
}

void MainGame::startFire(EventListenerClass* letterObject, Node *mycannon)
{
	MainGame::_totalHit++;
	self->removeChild(mycannon);	// remove cannon animation
	int flag = 0;
	for (int i = 0; i < MainGame::cannonArray.size(); i++)
	{
		if (MainGame::cannonArray[i]->cannonID == letterObject->placedNumber)
		{
			MainGame::cannonArray[i]->setOpacity(255);
			flag++;
			break;
		}
	}

	if (flag == 1)
	{
		std::string val = "";
		val += letterObject->id;

		cocostudio::timeline::ActionTimeline *timeline = CSLoader::createTimeline("cannonball_cannonballanimation.csb");
		Node *mycannon1 = (Node *)CSLoader::createNode("cannonball_cannonballanimation.csb");
		mycannon1->setPosition(letterObject->getPositionX() - (letterObject->getContentSize().width * 2), letterObject->getPositionY());
		self->addChild(mycannon1);	// add fire animation
		mycannon1->runAction(timeline);
		timeline->gotoFrameAndPause(0);
		timeline->play("cannonblaze", true);
		MainGame::bulletArray_Animation.push_back(mycannon1);

		LabelClass *fire = LabelClass::createSpt(letterObject->id, letterObject->getPositionX() - (letterObject->getContentSize().width * 2), letterObject->getPositionY(), letterObject->id, self);
		MainGame::bulletArray.push_back(fire);

		//Alphabet *myLabel = Alphabet::createWithSize(letterObject->id, 200);old code
		LabelTTF  *myLabel = CommonLabelTTF::create(letterObject->id, "Helvetica", 100);
		auto a = _maxLengthOfQuestion;
		myLabel->setFontSize(std::max(float(50.0), float(100.0 - (_maxLengthOfQuestion - 1) * 10)));
		myLabel->setPosition(letterObject->getPositionX() - (letterObject->getContentSize().width * 2.8), letterObject->getPositionY());
		self->addChild(myLabel);
		MainGame::bulletArray_actualImage.push_back(myLabel);

		auto moveto_animation = MoveTo::create(5, Vec2(10, myLabel->getPosition().y));
		mycannon1->runAction(moveto_animation);

		auto callBack = CallFunc::create([this, letterObject, myLabel, mycannon1]() { removeFire(letterObject, myLabel, mycannon1); });

		auto moveto = MoveTo::create(4.7, Vec2(10, myLabel->getPosition().y));
		auto seq = Sequence::create(moveto, callBack, NULL);
		myLabel->runAction(seq);
	}
	else
	{
		for (int i = 0; i < MainGame::cannonLetter.size(); i++)
		{
			if (MainGame::cannonLetter[i]->id == letterObject->id)
			{
				self->removeChild(MainGame::cannon_ballArray[i]);
				MainGame::cannonLetter[i]->flag = 1;
				MainGame::cannonLetter[i]->answer = 'n';
				break;
			}
		}
		cannonLetterCome();
	}

}

void MainGame::cannonBallHitAnimation(Node *nd)
{
	self->removeChild(nd);
}

void MainGame::meteorBlast(Node *nd)
{
	self->removeChild(nd);
	if (_score >= 10)
	{
		_menuContext->setMaxPoints(MainGame::_totalHit);
		_menuContext->addPoints(_score);
		_menuContext->showScore();
	}
}

void MainGame::removeFire(EventListenerClass* letterObject, LabelTTF* removableFire, Node *fireAnimation)
{
	self->removeChild(removableFire);
	self->removeChild(fireAnimation);
	int it = find(MainGame::bulletArray_actualImage.begin(), MainGame::bulletArray_actualImage.end(), removableFire) - MainGame::bulletArray_actualImage.begin();	//find bullet index in bulletarray 
	std::string removableFire_id = MainGame::bulletArray[it]->id;
	MainGame::bulletArray_actualImage.erase(std::remove(MainGame::bulletArray_actualImage.begin(), MainGame::bulletArray_actualImage.end(), removableFire));
	MainGame::bulletArray.erase(MainGame::bulletArray.begin() + it);
	MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), fireAnimation));

	if (letterObject != NULL)
	{
		for (int i = 0; i < MainGame::cannonArray.size(); i++)
		{
			if (MainGame::cannonArray[i]->placedNumber == letterObject->placedNumber)
			{
				MainGame::cannonArray[i]->flag = 0;
				MainGame::cannonArray[i]->placedNumber = -1;
				letterObject->flag = 1;
				self->removeChild(letterObject);
				break;
			}
		}

		for (int i = 0; i < MainGame::cannonLetter.size(); i++)
		{
			if (MainGame::cannonLetter[i]->id == removableFire_id)
			{
				MainGame::cannonLetter[i]->flag = 1;
				MainGame::cannonLetter[i]->answer = 'n';
				break;
			}
		}
	}
	cannonLetterCome();
}

void MainGame::update(float dt)
{
	for (int i = 0; i < MainGame::cannonArray.size(); i++)
	{
		for (int j = 0; j < MainGame::letterArray.size(); j++)
		{
			if (i < 0 || j < 0)
			{
				break;
			}
			Rect targetRect = MainGame::cannonArray[i]->getBoundingBox();
			if (targetRect.intersectsRect(MainGame::letterArray[j]->getBoundingBox()))
			{
				auto timeline = CSLoader::createTimeline("cannonball_cannonanimation.csb");
				Node *mycannon = (Node *)CSLoader::createNode("cannonball_cannonanimation.csb");
				mycannon->setPosition(MainGame::cannonArray[i]->getBoundingBox().origin.x + (MainGame::cannonArray[i]->getContentSize().width / 4), MainGame::cannonArray[i]->getBoundingBox().origin.y + (MainGame::cannonArray[i]->getContentSize().height / 2));
				self->addChild(mycannon);	// add cannon animation
				mycannon->runAction(timeline);
				timeline->gotoFrameAndPlay(46, false);
				timeline->setAnimationEndCallFunc("forcefield", CC_CALLBACK_0(MainGame::cannonBallHitAnimation, this, mycannon));
				MainGame::audioBg->playEffect("cannonball/gamesound/forceshield.ogg", false);

				if (MainGame::cannonArray[i]->totalShoot == MainGame::cannonArray[i]->currentShoot)
				{
					this->removeChild(MainGame::letterArray[j]);
					this->removeChild(MainGame::cannonArray[i]);

					if (MainGame::cannonArray[i]->flag == 1)
					{
						for (int y = 0; y < MainGame::cannon_ballArray.size(); y++)
						{
							Rect re = MainGame::cannonArray[i]->getBoundingBox();
							if (re.intersectsRect(MainGame::cannon_ballArray[y]->getBoundingBox()))
							{
								self->removeChild(MainGame::cannon_ballArray[y]);
								MainGame::cannonLetter[y]->flag = 1;
								MainGame::cannonLetter[y]->answer = 'n';
								break;
							}
						}

						for (int x = 0; x < MainGame::bulletArray.size(); x++)
						{
							if (MainGame::bulletArray_actualImage[x]->getPositionY() >= (MainGame::cannonArray[i]->getPositionY() - MainGame::cannonArray[i]->getContentSize().height / 2) &&
								MainGame::bulletArray_actualImage[x]->getPositionY() <= (MainGame::cannonArray[i]->getPositionY() + MainGame::cannonArray[i]->getContentSize().height / 2))
							{
								for (int y = 0; y < MainGame::cannonLetter.size(); y++)
								{
									if (MainGame::cannonLetter[y]->id == MainGame::bulletArray[x]->id)
									{
										self->removeChild(MainGame::cannon_ballArray[y]);
										MainGame::cannonLetter[y]->flag = 1;
										MainGame::cannonLetter[y]->answer = 'n';
										break;
									}
								}

								this->removeChild(bulletArray_actualImage[x]);
								this->removeChild(bulletArray_Animation[x]);

								int it = find(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[x]) - MainGame::bulletArray.begin();	//find bullet index in bulletarray 
								MainGame::bulletArray_actualImage.erase(MainGame::bulletArray_actualImage.begin() + it);

								MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[x]));
								MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[x]));
								x--;
								break;
							}
						}
					}

					MainGame::cannonArray.erase(std::remove(MainGame::cannonArray.begin(), MainGame::cannonArray.end(), MainGame::cannonArray[i]));
					MainGame::letterArray.erase(std::remove(MainGame::letterArray.begin(), MainGame::letterArray.end(), MainGame::letterArray[j]));
					MainGame::meteorArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), MainGame::meteorArray[j]));
					MainGame::meteorArray_actualImage.erase(std::remove(MainGame::meteorArray_actualImage.begin(), MainGame::meteorArray_actualImage.end(), MainGame::meteorArray_actualImage[j]));

					if (MainGame::cannonArray.size() == 1)
					{
						tweenSpeed = 15;
						letterComespeed = 1;
					}

					i--;
					j--;
					cannonLetterCome();
					break;
				}
				else
				{
					if (MainGame::lettertmpPosition.size() < MainGame::cannonArray.size())
					{
						Position p99;
						p99.x = MainGame::letterArray[j]->xP;
						p99.y = MainGame::letterArray[j]->yP;
						MainGame::lettertmpPosition.push_back(p99);
					}
					this->removeChild(MainGame::letterArray[j]);
					MainGame::letterArray.erase(std::remove(MainGame::letterArray.begin(), MainGame::letterArray.end(), MainGame::letterArray[j]));
					MainGame::meteorArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), MainGame::meteorArray[j]));
					MainGame::meteorArray_actualImage.erase(std::remove(MainGame::meteorArray_actualImage.begin(), MainGame::meteorArray_actualImage.end(), MainGame::meteorArray_actualImage[j]));

					MainGame::cannonArray[i]->currentShoot = MainGame::cannonArray[i]->currentShoot + 1;
					MainGame::cannonArray[i]->setOpacity(MainGame::cannonArray[i]->getOpacity() - 50);
					j--;
				}
			}
		}
	}

	for (int i = 0; i < MainGame::letterArray.size(); i++)
	{
		for (int j = 0; j < MainGame::bulletArray.size(); j++)
		{
			if (i < 0 || j < 0)
			{
				break;
			}
			Rect targetRect = Rect(MainGame::bulletArray_Animation[j]->getBoundingBox().origin.x - (MainGame::bulletArray_Animation[j]->getChildByName("blaze")->getContentSize().width / 2) , MainGame::bulletArray_Animation[j]->getBoundingBox().origin.y, MainGame::bulletArray_Animation[j]->getChildByName("blaze")->getContentSize().width, MainGame::bulletArray_Animation[j]->getChildByName("blaze")->getContentSize().height);
			if (targetRect.intersectsRect(MainGame::letterArray[i]->getBoundingBox()))
			{
				//if (MainGame::letterArray[i]->id == MainGame::bulletArray[j]->id) old code
				
				if (checkAnswer(MainGame::bulletArray[j]->id, MainGame::letterArray[i]->id))
				{
					auto que = MainGame::letterArray[i]->id;
					auto ans = MainGame::bulletArray[j]->id;
					for (int k = 0; k < MainGame::cannonLetter.size(); k++)
					{
						if (MainGame::cannonLetter[k]->id == MainGame::bulletArray[j]->id)
						{
							MainGame::cannonLetter[k]->flag = 1;
							MainGame::cannonLetter[k]->answer = 'y';

							for (int m = 0; m < MainGame::cannonArray.size(); m++)
							{
								if (MainGame::cannonArray[m]->placedNumber == MainGame::cannon_ballArray[k]->placedNumber)
								{
									MainGame::cannonArray[m]->flag = 0;
									break;
								}
							}
							this->removeChild(MainGame::cannon_ballArray[k]);
						}
					}

					_score++;

					auto timeline = CSLoader::createTimeline("cannonball_meteoranimation.csb");
					Node *mycannon = (Node *)CSLoader::createNode("cannonball_meteoranimation.csb");
					mycannon->setPosition(MainGame::letterArray[i]->getBoundingBox().origin.x + (MainGame::letterArray[i]->getContentSize().width*55/100), MainGame::letterArray[i]->getBoundingBox().origin.y + (MainGame::letterArray[i]->getContentSize().height * 51/100));
					self->addChild(mycannon);	// add cannon animation
					mycannon->runAction(timeline);
					timeline->gotoFrameAndPlay(00, false);
//					_menuContext->addPoints(1);
					timeline->setAnimationEndCallFunc("meteor_blast", CC_CALLBACK_0(MainGame::meteorBlast, this, mycannon));
					MainGame::audioBg->playEffect("cannonball/gamesound/meteorblast.ogg", false, 1, 1, .2);

					_menuContext->pickAlphabet(LangUtil::getInstance()->convertStringToUTF16Char( MainGame::bulletArray[j]->id), LangUtil::getInstance()->convertStringToUTF16Char(MainGame::letterArray[i]->id), true);

					this->removeChild(MainGame::bulletArray_actualImage[j]);
					this->removeChild(MainGame::letterArray[i]);
					this->removeChild(MainGame::bulletArray_Animation[j]);

//					int score = _menuContext->getPoints();
//					if (score == 15)

					int it = find(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]) - MainGame::bulletArray.begin();	//find bullet index in bulletarray 
					MainGame::bulletArray_actualImage.erase(MainGame::bulletArray_actualImage.begin() + it);

					MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]));
					MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[j]));

					if (MainGame::lettertmpPosition.size() < MainGame::cannonArray.size())
					{
						Position p98;
						p98.x = letterArray[i]->xP;
						p98.y = letterArray[i]->yP;
						MainGame::lettertmpPosition.push_back(p98);
					}

					MainGame::letterArray.erase(std::remove(MainGame::letterArray.begin(), MainGame::letterArray.end(), MainGame::letterArray[i]));
					MainGame::meteorArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), MainGame::meteorArray[i]));
					MainGame::meteorArray_actualImage.erase(std::remove(MainGame::meteorArray_actualImage.begin(), MainGame::meteorArray_actualImage.end(), MainGame::meteorArray_actualImage[i]));

					j--;
					i--;
					cannonLetterCome();
				}
				else
				{
					auto que = MainGame::letterArray[i]->id;
					auto ans = MainGame::bulletArray[j]->id;
					for (int k = 0; k < MainGame::cannonLetter.size(); k++)
					{
						if (MainGame::cannonLetter[k]->id == MainGame::bulletArray[j]->id)
						{
							MainGame::cannonLetter[k]->flag = 1;
							MainGame::cannonLetter[k]->answer = 'n';

							for (int m = 0; m < MainGame::cannonArray.size(); m++)
							{
								if (MainGame::cannonArray[m]->placedNumber == MainGame::cannon_ballArray[k]->placedNumber)
								{
									MainGame::cannonArray[m]->flag = 0;
									break;
								}
							}
							this->removeChild(MainGame::cannon_ballArray[k]);
							break;
						}
					}

					auto timeline = CSLoader::createTimeline("cannonball_meteoranimation.csb");
					Node *mycannon = (Node *)CSLoader::createNode("cannonball_meteoranimation.csb");
					mycannon->setPosition(MainGame::letterArray[i]->getBoundingBox().origin.x + (MainGame::letterArray[i]->getContentSize().width * 80/100), MainGame::letterArray[i]->getBoundingBox().origin.y + (MainGame::letterArray[i]->getContentSize().height / 2));

					_menuContext->pickAlphabet(LangUtil::getInstance()->convertStringToUTF16Char(MainGame::letterArray[i]->id), LangUtil::getInstance()->convertStringToUTF16Char(bulletArray[j]->id), true);

					self->addChild(mycannon);	// add cannon animation
					mycannon->runAction(timeline);
					timeline->gotoFrameAndPlay(40, false);

					timeline->setAnimationEndCallFunc("meteor_strike", CC_CALLBACK_0(MainGame::meteorBlast, this, mycannon));

					MainGame::audioBg->playEffect("cannonball/gamesound/meteorstrike.ogg", false, 1, 1, .2);
//					_menuContext->addPoints(-1);
					this->removeChild(MainGame::bulletArray_actualImage[j]);
					this->removeChild(MainGame::bulletArray_Animation[j]);

					int it = find(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]) - MainGame::bulletArray.begin();	//find bullet index in bulletarray 
					MainGame::bulletArray_actualImage.erase(MainGame::bulletArray_actualImage.begin() + it);
					MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]));
					MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[j]));

					j--;
					cannonLetterCome();
				}
			}
		}
	}
}
bool MainGame::checkAnswer(string boardText, string choiceText) {

	for (int i = 0; i < _vmc.size(); i++) {
		if (_vmc[i].question.compare(boardText) == 0) {
			if (_vmc[i].answers[_vmc[i].correctAnswer].compare(choiceText) == 0) {
				return true;
			}
		}
	}
	return false;
}
int MainGame::getMaxWordLength(std::vector<string> wordVector)
{
	int maxSize = 1;
	int index = 0;
	while (index != (wordVector.size() - 1))
	{
		if (wordVector[index].length() > maxSize)
		{
			maxSize = wordVector[index].length();
		}
		index++;
	}
	return maxSize;
}
