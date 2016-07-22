#include "Cannon_Ball_Main.h"
#include "Cannon_Ball_Listener.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

std::vector<LabelClass*> MainGame::cannonLetter;
std::vector<Label*> MainGame::cannonLetter_actualImage;

std::vector<LabelClass*> MainGame::bulletArray;
std::vector<Label*> MainGame::bulletArray_actualImage;

std::vector<EventListenerClass*> MainGame::cannon_ballArray;
std::vector<EventListenerClass*> MainGame::cannonArray;

std::vector<cocos2d::Label*> MainGame::meteorArray_actualImage;
std::vector<EventListenerClass*> MainGame::letterArray;
std::vector<LabelClass*> MainGame::meteorArray;
std::vector<cocos2d::Node*> MainGame::bulletArray_Animation;

EventListenerClass* MainGame::cannon1;
EventListenerClass* MainGame::cannon2;
EventListenerClass* MainGame::cannon3;
EventListenerClass* MainGame::cannon4;

float MainGame::height;
float MainGame::width;
float MainGame::originX;
float MainGame::originY;
MainGame* MainGame::self;

Scene* MainGame::createScene()
{
	auto scene = Scene::create();
	auto layer = MainGame::create();
	scene->addChild(layer);

	//	backGround_front = NULL;

	return scene;
}

bool MainGame::init()
{
	if (!Layer::init())
	{
		return false;
	}

	//	auto cannonAnimation = CSLoader::createTimeline("res/cannon.csb");

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	MainGame::height = visibleSize.height;
	MainGame::width = visibleSize.width;
	MainGame::originX = origin.x;
	MainGame::originY = origin.y;

	p1.x = MainGame::originX + MainGame::width * 90 / 100;
	p1.y = MainGame::originY + MainGame::height * 18 / 100;

	p2.x = MainGame::originX + MainGame::width * 90 / 100;
	p2.y = MainGame::originY + MainGame::height * 32 / 100;

	p3.x = MainGame::originX + MainGame::width * 90 / 100;
	p3.y = MainGame::originY + MainGame::height * 46 / 100;

	p4.x = MainGame::originX + MainGame::width * 90 / 100;
	p4.y = MainGame::originY + MainGame::height * 60 / 100;

	p5.x = MainGame::originX + MainGame::width * 90 / 100;
	p5.y = MainGame::originY + MainGame::height * 74 / 100;

/*	p6.x = MainGame::originX + MainGame::width * 83 / 100;
	p6.y = MainGame::originY + MainGame::height * 78 / 100;

	p7.x = MainGame::originX + MainGame::width * 83 / 100;
	p7.y = MainGame::originY + MainGame::height * 92 / 100;
*/
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

/*	p13.x = MainGame::originX + MainGame::width * 90 / 100;
	p13.y = MainGame::originY + MainGame::height * 78 / 100;

	p14.x = MainGame::originX + MainGame::width * 90 / 100;
	p14.y = MainGame::originY + MainGame::height * 92 / 100;
*/
	position.push_back(p1);
	position.push_back(p2);
	position.push_back(p3);
	position.push_back(p4);
	position.push_back(p5);
//	position.push_back(p6);
//	position.push_back(p7);
	position.push_back(p8);
	position.push_back(p9);
	position.push_back(p10);
	position.push_back(p11);
	position.push_back(p12);
//	position.push_back(p13);
//	position.push_back(p14);

	p100.x = MainGame::originX;
	p100.y = MainGame::originY + MainGame::height * 22 / 100;

	p101.x = MainGame::originX;
	p101.y = MainGame::originY + MainGame::height * 50 / 100;

	p102.x = MainGame::originX;
	p102.y = MainGame::originY + MainGame::height * 78 / 100;

//	p103.x = MainGame::originX;
//	p103.y = MainGame::originY + MainGame::height * 87 / 100;

	letterPosition.push_back(p100);
	letterPosition.push_back(p101);
	letterPosition.push_back(p102);
//	letterPosition.push_back(p103);

	self = this;
	startGame();

	this->schedule(schedule_selector(MainGame::letterCome), 3);

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");

	this->scheduleUpdate();

	return true;
}


void MainGame::startGame()	// starting of game
{
	lettertmpPosition = letterPosition;

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("cannonball_mainassetPlist.plist");

	// main background
	auto mySprite = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/background_back.png");
	mySprite->setPosition(origin.x + visibleSize.width *43 /100, origin.y + visibleSize.height / 2);
	this->addChild(mySprite);

	auto rack = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/cannon_ball_rack.png");
	rack->setPosition(origin.x + visibleSize.width * 85 / 100, origin.y + visibleSize.height / 2);
	this->addChild(rack);


	// front background
	backGround_front = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/background_front.png");
	backGround_front->setPosition(origin.x + visibleSize.width * 43 / 100, origin.y + visibleSize.height / 2);
	this->addChild(backGround_front, 3);



	for (int i = 0; i < position.size(); i++)
	{
		auto mm = Sprite::createWithSpriteFrameName("cannonball/cannonball_mainasset/cannon_ball_rackpouch.png");
		mm->setPosition(position[i].x, position[i].y);
		this->addChild(mm);
	}

	//	layer 1
	auto Layer1 = LayerGradient::create(Color4B(255, 0, 0, 255), Color4B(255, 0, 0, 255));
	Layer1->setContentSize(Size(visibleSize.width, 5));
	Layer1->setPosition(Vec2(0, origin.y + (visibleSize.height * 33.3 / 100)));
	this->addChild(Layer1);

	//	layer 2
	auto Layer2 = LayerGradient::create(Color4B(0, 255, 0, 255), Color4B(0, 255, 0, 255));
	Layer2->setContentSize(Size(visibleSize.width, 5));
	Layer2->setPosition(Vec2(0, origin.y + (visibleSize.height * 66.6 / 100)));
	this->addChild(Layer2);

	//	layer 3
	auto Layer3 = LayerGradient::create(Color4B(0, 0, 255, 255), Color4B(0, 0, 255, 255));
	Layer3->setContentSize(Size(visibleSize.width, 5));
	Layer3->setPosition(Vec2(0, origin.y + (visibleSize.height * 100 / 100)));
	this->addChild(Layer3);

	//	layer 4
/*	auto Layer4 = LayerGradient::create(Color4B(0, 255, 255, 255), Color4B(0, 255, 255, 255));
	Layer4->setContentSize(Size(visibleSize.width, 5));
	Layer4->setPosition(Vec2(0, origin.y + (visibleSize.height * 100 / 100)));
	this->addChild(Layer4);
*/
	cannon1 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 0);
	cannon1->setPosition(origin.x + (visibleSize.width * 75 / 100), origin.y + (visibleSize.height * 22 / 100));
	this->addChild(cannon1, 3);

	cannon2 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 1);
	cannon2->setAnchorPoint(Vec2(.5, .5));
	cannon2->setPosition(origin.x + (visibleSize.width * 75 / 100), origin.y + (visibleSize.height*50 / 100));
	this->addChild(cannon2, 3);

	cannon3 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 2);
	cannon3->setAnchorPoint(Vec2(.5, .5));
	cannon3->setPosition(origin.x + (visibleSize.width * 75 / 100), origin.y + (visibleSize.height*78 / 100));
	this->addChild(cannon3, 3);

/*	cannon4 = EventListenerClass::createCannon("cannon1.png", 0, 0, 1, 3);
	cannon4->setAnchorPoint(Vec2(.5, .5));
	cannon4->setPosition(origin.x + (visibleSize.width * 65 / 100), origin.y + (visibleSize.height*87.5 / 100));
	this->addChild(cannon4, 3);
*/
	cannonArray.push_back(cannon1);
	cannonArray.push_back(cannon2);
	cannonArray.push_back(cannon3);
//	cannonArray.push_back(cannon4);

	cannonLetterCome();
}

void MainGame::letterCome(float d)
{
	if (MainGame::cannonArray.size() == 0)
	{
		for (int i = 0; i < MainGame::letterArray.size(); i++)
		{
			this->removeChild(MainGame::letterArray[i]);
			this->removeChild(MainGame::meteorArray_actualImage[i]);

			MainGame::meteorArray_actualImage.erase(std::remove(MainGame::meteorArray_actualImage.begin(), MainGame::meteorArray_actualImage.end(), MainGame::meteorArray_actualImage[i]));
			MainGame::meteorArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), MainGame::meteorArray[i]));
			MainGame::letterArray.erase(std::remove(MainGame::letterArray.begin(), MainGame::letterArray.end(), MainGame::letterArray[i]));

			//			MainGame::meteorArray.erase(MainGame::meteorArray.begin() + i);
			//			MainGame::letterArray.erase(MainGame::letterArray.begin() + i);
		}

		for (int i = 0; i < MainGame::bulletArray.size(); i++)
		{
			this->removeChild(MainGame::bulletArray_actualImage[i]);
			MainGame::bulletArray_actualImage.erase(std::remove(MainGame::bulletArray_actualImage.begin(), MainGame::bulletArray_actualImage.end(), MainGame::bulletArray_actualImage[i]));
			MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[i]));
			MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[i]));
			//			MainGame::bulletArray.erase(MainGame::bulletArray.begin() + i);
			//			MainGame::bulletArray_Animation.erase(MainGame::bulletArray_Animation.begin() + i);
			i--;
		}

		for (int i = 0; i < MainGame::cannonLetter.size(); i++)
		{
			if (MainGame::cannonLetter[i] != NULL)
			{
				this->removeChild(MainGame::cannonLetter_actualImage[i]);
				MainGame::cannonLetter.erase(std::remove(MainGame::cannonLetter.begin(), MainGame::cannonLetter.end(), MainGame::cannonLetter[i]));
				MainGame::cannonLetter_actualImage.erase(std::remove(MainGame::cannonLetter_actualImage.begin(), MainGame::cannonLetter_actualImage.end(), MainGame::cannonLetter_actualImage[i]));
				//				MainGame::cannonLetter.erase(MainGame::cannonLetter.begin() + i);
				i--;
			}
		}

		startGame();
	}

	if (MainGame::letterArray.size() < MainGame::cannonArray.size())
	{
		int flag = 0;
		std::vector<char> chars = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
		char letterName;

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
		lett->setScale(.7, .7);
		this->addChild(lett);
		MainGame::letterArray.push_back(lett);

		std::string value = "";
		if (letterName == 'A')
			value = "A .png";
		else
		{
			value = letterName;
			value.append(".png");
		}

//		EventListenerClass *meteor = EventListenerClass::createSprite(value, MainGame::lettertmpPosition[val].x, MainGame::lettertmpPosition[val].y, letterName, self);
		LabelClass *meteor = LabelClass::createSpt(letterName, MainGame::lettertmpPosition[val].x, MainGame::lettertmpPosition[val].y, letterName, self);
//		meteor->setScale(.25, .25);
//		this->addChild(meteor);
		MainGame::meteorArray.push_back(meteor);

		std::string value1 = "";
		value1 += letterName;
		Label *myLabel = Label::createWithBMFont("english/baloo_bhai.fnt", value1);
		myLabel->setPosition(MainGame::lettertmpPosition[val].x, MainGame::lettertmpPosition[val].y);
		myLabel->setScale(.10, .10);
		this->addChild(myLabel);
		MainGame::meteorArray_actualImage.push_back(myLabel);

		MainGame::lettertmpPosition.erase(MainGame::lettertmpPosition.begin() + val);

		/*		if (backGround_front != NULL)
		{
		this->removeChild(backGround_front);
		}

		backGround_front = Sprite::createWithSpriteFrameName("background_front.png");
		backGround_front->setPosition(width / 2, height / 2);
		this->addChild(backGround_front);
		*/

		myLabel->runAction(MoveTo::create(40, Vec2(MainGame::width + 50, myLabel->getPosition().y)));
		//		lett->runAction(Sequence::create(MoveTo::create(20, Vec2(lett->getPosition().x, 0)), CC_CALLBACK_1(removeLetter, this, lett)));
		/*		auto callBack = CallFunc::create([&]() {
		removeLetter(lett);
		});
		*/
		auto callBack = CallFunc::create([this, lett]() { removeLetter(lett); });
		auto moveto = MoveTo::create(40, Vec2(MainGame::width + 50, lett->getPosition().y));
		auto seq = Sequence::create(moveto, callBack, NULL);
		lett->runAction(seq);
		//		lett.runAction(cc.sequence(cc.MoveTo.create(20, cc.p(lett.getPosition().x, 0)), cc.callFunc(self.removeLetter, this, lett)));

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

	//	MainGame::letterArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), img));
	//	MainGame::meteorArray.erase(std::remove(MainGame::meteorArray.begin(), MainGame::meteorArray.end(), img));

	this->removeChild(img);
}

void MainGame::cannonLetterCome()	//cannon letter will come which will be dragged on the cannon
{
	std::vector<char> chars = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

	if (MainGame::cannonLetter.size() == 0)
	{
		MainGame::cannon_ballArray.clear();
		for (int i = 0; i < position.size(); i++)
		{
			char letterName = chars[rand() % chars.size()];
			EventListenerClass * e1 = EventListenerClass::createCannonBall("cannon_ball.png", cannon1, cannon2, cannon3, i, letterName, position[i].x, position[i].y, self);
			this->addChild(e1);
			MainGame::cannon_ballArray.push_back(e1);

			//			LabelClass *e2;
			std::string val = "";
			val += letterName;
			/*			if (letterName == 'A')
			val = "A .png";
			else
			{
			val = letterName;
			val.append(".png");
			}
			*/
			Label *myLabel = Label::createWithBMFont("english/baloo_bhai.fnt", val);
			myLabel->setPosition(position[i].x, position[i].y);
			myLabel->setScale(.08, .08);
			this->addChild(myLabel);
			MainGame::cannonLetter_actualImage.push_back(myLabel);

			LabelClass *lb = LabelClass::createSpt(letterName, position[i].x, position[i].y, letterName, self);
			//			lb->setScale(.25, .25);
			//			this->addChild(lb, 20);

			chars.erase(std::remove(chars.begin(), chars.end(), letterName));
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
			if (eventCannonLetterObject->flag == 1 && eventCannonLetterObject->answer=='n')
			{
				remchar = eventCannonLetterObject;
				remcharPos = i;
				flag++;
				break;
			}
			else if (eventCannonLetterObject->flag == 1 && eventCannonLetterObject->answer == 'y')
			{
				remchar = eventCannonLetterObject;
				remcharPos = i;
			}

			for (int j = 0; j < chars.size(); j++)
			{
				if (chars[j] == eventCannonLetterObject->id)
				{
					chars.erase(std::remove(chars.begin(), chars.end(), chars[j]));
					i--;
					break;
				}
			}
		}

		if (remchar != NULL)
		{
			char letterName;
			if (flag == 0)
				letterName = chars[rand() % chars.size()];
			else
				letterName = remchar->id;

			EventListenerClass *letter = EventListenerClass::createCannonBall("cannon_ball.png", cannon1, cannon2, cannon3, remcharPos, letterName, remchar->xP, remchar->yP, self);
			MainGame::cannon_ballArray[remcharPos] = letter;
			self->addChild(letter);

			std::string val = "";
			/*			if (letterName == 'A')
			val = "A .png";
			else
			{
			val = letterName;
			val.append(".png");
			}
			*/
			val += letterName;


			Label *myLabel = Label::createWithBMFont("english/baloo_bhai.fnt", val);
			myLabel->setPosition(remchar->xP, remchar->yP);
			myLabel->setScale(.10, .10);
			self->addChild(myLabel);
			MainGame::cannonLetter_actualImage[remcharPos] = myLabel;

			LabelClass *let = LabelClass::createSpt(letterName, remchar->xP, remchar->yP, letterName, self);
			MainGame::cannonLetter[remcharPos] = let;
		}
	}
}

void MainGame::loadCannon(EventListenerClass* letterObject)
{
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
}

void MainGame::startFire(EventListenerClass* letterObject, Node *mycannon)
{
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
		/*		if (letterObject->id == 'A')
		value = "A .png";
		else
		{
		value = letterObject->id;
		value.append(".png");
		}
		*/
		// bullet animation
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

		Label *myLabel = Label::createWithBMFont("english/baloo_bhai.fnt", val);
		myLabel->setPosition(letterObject->getPositionX() - (letterObject->getContentSize().width * 2), letterObject->getPositionY());
		myLabel->setScale(.10, .10);
		self->addChild(myLabel);
		MainGame::bulletArray_actualImage.push_back(myLabel);

		auto moveto_animation = MoveTo::create(5, Vec2(200, myLabel->getPosition().y));
		mycannon1->runAction(moveto_animation);


		auto callBack = CallFunc::create([this, letterObject, myLabel, mycannon1]() { removeFire(letterObject, myLabel, mycannon1); });

		auto moveto = MoveTo::create(5, Vec2(200, myLabel->getPosition().y));
		auto seq = Sequence::create(moveto, callBack, NULL);
		myLabel->runAction(seq);
	}
	else
	{
		for (int i = 0; i < MainGame::cannonLetter.size(); i++)
		{
			if (MainGame::cannonLetter[i]->id == letterObject->id)
			{
				self->removeChild(MainGame::cannonLetter_actualImage[i]);
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
	//	MainGame::cannonArray[0]->setOpacity(255);
	//	CCLOG("yes");
}

void MainGame::meteorBlast(Node *nd)
{
	self->removeChild(nd);
}

void MainGame::removeFire(EventListenerClass* letterObject, Label* removableFire, Node *fireAnimation)
{
	self->removeChild(removableFire);
	self->removeChild(fireAnimation);
	int it = find(MainGame::bulletArray_actualImage.begin(), MainGame::bulletArray_actualImage.end(), removableFire) - MainGame::bulletArray_actualImage.begin();	//find bullet index in bulletarray 
	char removableFire_id = MainGame::bulletArray[it]->id;
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
				self->removeChild(MainGame::cannonLetter_actualImage[i]);
				MainGame::cannonLetter[i]->flag = 1;
				MainGame::cannonLetter[i]->answer = 'y';
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
				mycannon->setPosition(MainGame::letterArray[j]->getBoundingBox().origin.x + (MainGame::meteorArray_actualImage[j]->getContentSize().width / 3), MainGame::letterArray[j]->getBoundingBox().origin.y + (MainGame::meteorArray_actualImage[j]->getContentSize().height / 16));
				mycannon->setScale(.5, .5);
				self->addChild(mycannon);	// add cannon animation
				mycannon->runAction(timeline);
				timeline->gotoFrameAndPlay(46, false);
				//				timeline->play("forcefield", false);
				timeline->setAnimationEndCallFunc("forcefield", CC_CALLBACK_0(MainGame::cannonBallHitAnimation, this, mycannon));

				if (MainGame::cannonArray[i]->totalShoot == MainGame::cannonArray[i]->currentShoot)
				{
					this->removeChild(MainGame::letterArray[j]);
					this->removeChild(MainGame::cannonArray[i]);
					this->removeChild(MainGame::meteorArray_actualImage[j]);

					if (MainGame::cannonArray[i]->flag == 1)
					{
						for (int x = 0; x < MainGame::bulletArray.size(); x++)
						{
							if (MainGame::bulletArray_actualImage[x]->getPositionY() >= (MainGame::cannonArray[i]->getPositionY() - MainGame::cannonArray[i]->getContentSize().height / 2) &&
								MainGame::bulletArray_actualImage[x]->getPositionY() <= (MainGame::cannonArray[i]->getPositionY() + MainGame::cannonArray[i]->getContentSize().height / 2))
							{

								for (int y = 0; y < MainGame::cannonLetter.size(); y++)
								{
									if (MainGame::cannonLetter[y]->id == MainGame::bulletArray[x]->id)
									{
										self->removeChild(MainGame::cannonLetter_actualImage[y]);
										self->removeChild(MainGame::cannon_ballArray[y]);
										MainGame::cannonLetter[y]->flag = 1;
										MainGame::cannonLetter[y]->answer = 'y';
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
					//					MainGame::letterArray.erase(MainGame::letterArray.begin() + j);
					//					MainGame::meteorArray.erase(MainGame::meteorArray.begin() + j);

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
					this->removeChild(MainGame::meteorArray_actualImage[j]);
					//					MainGame::letterArray.erase(MainGame::letterArray.begin()+j);
					//					MainGame::meteorArray.erase(MainGame::meteorArray.begin()+j);
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
			Rect targetRect = MainGame::letterArray[i]->getBoundingBox();
			if (targetRect.intersectsRect(MainGame::bulletArray_actualImage[j]->getBoundingBox()))
			{
				if (MainGame::letterArray[i]->id == MainGame::bulletArray[j]->id)
				{
					for (int k = 0; k < MainGame::cannonLetter.size(); k++)
					{
						if (MainGame::cannonLetter[k]->id == MainGame::bulletArray[j]->id)
						{
							MainGame::cannonLetter[k]->flag = 1;
							MainGame::cannonLetter[k]->answer = 'y';

							this->removeChild(MainGame::cannonLetter_actualImage[k]);

							for (int m = 0; m < MainGame::cannonArray.size(); m++)
							{
								if (MainGame::cannonArray[m]->placedNumber == MainGame::cannon_ballArray[k]->placedNumber)
								{
									MainGame::cannonArray[m]->flag = 0;
									break;
								}
								//								if (MainGame::cannonArray[MainGame::cannon_ballArray[k]->placedNumber] != NULL)
								//									MainGame::cannonArray[MainGame::cannon_ballArray[k]->placedNumber]->flag = 0;
							}
							this->removeChild(MainGame::cannon_ballArray[k]);
						}
					}

					auto timeline = CSLoader::createTimeline("cannonball_meteoranimation.csb");
					Node *mycannon = (Node *)CSLoader::createNode("cannonball_meteoranimation.csb");
					mycannon->setPosition(MainGame::letterArray[i]->getBoundingBox().origin.x + (MainGame::meteorArray_actualImage[i]->getContentSize().width / 3), MainGame::letterArray[i]->getBoundingBox().origin.y + (MainGame::meteorArray_actualImage[i]->getContentSize().height / 16));
					mycannon->setScale(.7, .7);
					self->addChild(mycannon);	// add cannon animation
					mycannon->runAction(timeline);
					timeline->gotoFrameAndPlay(00, false);
					//				timeline->play("forcefield", false);
					timeline->setAnimationEndCallFunc("meteor_blast", CC_CALLBACK_0(MainGame::meteorBlast, this, mycannon));

					this->removeChild(MainGame::bulletArray_actualImage[j]);
					this->removeChild(MainGame::letterArray[i]);
					this->removeChild(MainGame::meteorArray_actualImage[i]);
					this->removeChild(MainGame::bulletArray_Animation[j]);

					int it = find(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]) - MainGame::bulletArray.begin();	//find bullet index in bulletarray 
					MainGame::bulletArray_actualImage.erase(MainGame::bulletArray_actualImage.begin() + it);

					MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]));
					MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[j]));
					//					MainGame::bulletArray.erase(MainGame::bulletArray.begin()+j);
					//					MainGame::bulletArray_Animation.erase(MainGame::bulletArray_Animation.begin() + j);

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
					//					MainGame::letterArray.erase(MainGame::letterArray.begin()+i);
					//					MainGame::meteorArray.erase(MainGame::meteorArray.begin() + i);
					j--;
					i--;
					cannonLetterCome();
				}
				else
				{
					for (int k = 0; k < MainGame::cannonLetter.size(); k++)
					{
						if (MainGame::cannonLetter[k]->id == MainGame::bulletArray[j]->id)
						{
							MainGame::cannonLetter[k]->flag = 1;
							MainGame::cannonLetter[k]->answer = 'n';
							this->removeChild(MainGame::cannonLetter_actualImage[k]);

							for (int m = 0; m < MainGame::cannonArray.size(); m++)
							{
								if (MainGame::cannonArray[m]->placedNumber == MainGame::cannon_ballArray[k]->placedNumber)
								{
									MainGame::cannonArray[m]->flag = 0;
									break;
								}
								//								if (MainGame::cannonArray[MainGame::cannon_ballArray[k]->placedNumber] != NULL)
								//									MainGame::cannonArray[MainGame::cannon_ballArray[k]->placedNumber]->flag = 0;
							}
							this->removeChild(MainGame::cannon_ballArray[k]);
							break;
						}
					}


					auto timeline = CSLoader::createTimeline("cannonball_meteoranimation.csb");
					Node *mycannon = (Node *)CSLoader::createNode("cannonball_meteoranimation.csb");
					mycannon->setPosition(MainGame::letterArray[i]->getBoundingBox().origin.x + (MainGame::meteorArray_actualImage[i]->getContentSize().width / 4), MainGame::letterArray[i]->getBoundingBox().origin.y + (MainGame::meteorArray_actualImage[i]->getContentSize().height / 16));
					mycannon->setScale(.7, .7);
					self->addChild(mycannon);	// add cannon animation
					mycannon->runAction(timeline);
					timeline->gotoFrameAndPlay(40, false);
					//				timeline->play("forcefield", false);
					timeline->setAnimationEndCallFunc("meteor_strike", CC_CALLBACK_0(MainGame::meteorBlast, this, mycannon));
					//	new changes
					this->removeChild(MainGame::bulletArray_actualImage[j]);
					this->removeChild(MainGame::bulletArray_Animation[j]);

					int it = find(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]) - MainGame::bulletArray.begin();	//find bullet index in bulletarray 
					MainGame::bulletArray_actualImage.erase(MainGame::bulletArray_actualImage.begin() + it);

					MainGame::bulletArray.erase(std::remove(MainGame::bulletArray.begin(), MainGame::bulletArray.end(), MainGame::bulletArray[j]));
					MainGame::bulletArray_Animation.erase(std::remove(MainGame::bulletArray_Animation.begin(), MainGame::bulletArray_Animation.end(), MainGame::bulletArray_Animation[j]));

					//					MainGame::bulletArray.erase(MainGame::bulletArray.begin() + j);
					//					MainGame::bulletArray_Animation.erase(MainGame::bulletArray_Animation.begin() + j);

					j--;
					cannonLetterCome();
				}
			}
		}
	}
}
