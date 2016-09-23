#include "Bingo.h"
#include "SimpleAudioEngine.h"
#include "math.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Scene* Bingo::createScene()
{

	// 'layer' is an autorelease object
	auto layer = Bingo::create();
	auto scene = Scene::create();

	//layer->_menuContext = MenuContext::create(layer, CrossTheBridge::gameName());
	scene->addChild(layer);

	return scene;
}
// on 'init' you need to initialize your instance
bool Bingo::init()
{

	if (!Layer::init())
	{
		return false;
	}
	auto bingoBackground = CSLoader::createNode("bingo/main.csb");
	this->addChild(bingoBackground, 0);

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		bingoBackground->setPositionX(myGameWidth);
	}

	_data = TextGenerator::getInstance()->getAntonyms(16);

	
	for (std::map<std::string, std::string>::iterator it = _data.begin(); it != _data.end(); ++it) {
		  _data_key.push_back(it->first);
		}
	
   for (std::map<std::string, std::string>::iterator it = _data.begin(); it != _data.end(); ++it) {
		  _data_value.push_back(it->second);
       }

   std::vector<int> randomIndex;
   int a = _data.size();

   while (randomIndex.size() != _data.size()) {
	   bool duplicateCheck = true;
	   int numberPicker = RandomHelper::random_int(0,a-1);
	   for (int i = 0; i < randomIndex.size(); i++) {
		   if (numberPicker == randomIndex[i]) {
			   duplicateCheck = false;
		   }
	   }
	   if (duplicateCheck) {
		   randomIndex.push_back(numberPicker);
	   }

   }

   std::vector<int> ac = randomIndex;

	_boxBoard = (Sprite *)bingoBackground->getChildren().at(0)->getChildByName("board");
	_helpBoard = (Sprite *)bingoBackground->getChildren().at(0)->getChildByName("boardhelp");

	setWordInHelpBoard();

	/*auto leave1 = (Sprite *)bingoBackground->getChildren().at(0)->getChildByName("tree_leave_front");*/
	
	/*auto addX = _boxBoard->getBoundingBox().size.width * 0.10;
	auto addY = _boxBoard->getBoundingBox().size.height * 0.125;*/

	/*auto addX = _boxBoard->getBoundingBox().size.width * 0.17;
	auto addY = _boxBoard->getBoundingBox().size.height * 0.18;*/

	auto addX = _boxBoard->getBoundingBox().size.width * 0.13;
	auto addY = _boxBoard->getBoundingBox().size.height * 0.15;

	auto boxId =0;
	Sprite* box;
	Sprite*	boxShade;
	Sprite* bingoFace;
	Sprite* wrong;
	cocos2d::LabelTTF * label;
	
	//// adding grid structure to game
	_boxContainer.clear();
	//_boxContainer = Bingo::createGrid(3,3);
	////_boxContainer = Bingo::createGrid(5, 5);
	_boxContainer = Bingo::createGrid(4, 4);
	
	_charFace.clear();
	//_charFace = Bingo::createGrid(3, 3);
	////_charFace = Bingo::createGrid(5, 5);
	_charFace = Bingo::createGrid(4, 4);

	_charAnimContainer.clear();
	//_charAnimContainer = Bingo::createGridOfCharcater(3, 3);
	////_charAnimContainer = Bingo::createGridOfCharcater(5, 5);
	_charAnimContainer = Bingo::createGridOfCharcater(4,4);

	_bingoAnimBin.clear();
	//_bingoAnimBin = Bingo::createGrid(3, 3);
	////_bingoAnimBin = Bingo::createGrid(5, 5);
	_bingoAnimBin = Bingo::createGrid(4,4);

	std::string charFaceName[6] = { "chimp", "giraffe", "leopard", "lion", "zebra","wildebeest" };
	
	for (int i = 0; i<_boxContainer.size(); i++)
	{
		for (int j = 0; j<_boxContainer.size(); j++)
		{
			box = Sprite::createWithSpriteFrameName("bingo/bingob/bg 2-05.png");
			float c = box->getBoundingBox().size.width / 2;
			float d = box->getBoundingBox().size.height / 2;
			/*setAllSpriteProperties(box, 2, addX, addY, true, 0.5, 0.5, 0, 0.6, 0.6, _boxBoard);*/
			//setAllSpriteProperties(box, 2, addX, addY, true, 0.5, 0.5, 0, 1, 1, _boxBoard);
			setAllSpriteProperties(box, 2, addX, addY, true, 0.5, 0.5, 0, 0.75, 0.75, _boxBoard);
			box->setTag(0);

			boxShade = Sprite::createWithSpriteFrameName("bingo/bingob/bg 2-06.png");
			//setAllSpriteProperties(boxShade, 0, addX, addY, true, 0.5, 0.5, 0, 0.6, 0.6, _boxBoard);
			//setAllSpriteProperties(boxShade, 0, addX, addY, true, 0.5, 0.5, 0, 1, 1, _boxBoard);
			setAllSpriteProperties(boxShade, 0, addX, addY, true, 0.5, 0.5, 0, 0.75, 0.75, _boxBoard);

			bingoFace = Sprite::createWithSpriteFrameName("bingo/bingob/bg 2-06.png");
			//setAllSpriteProperties(boxShade, 0, addX, addY, true, 0.5, 0.5, 0, 0.6, 0.6, _boxBoard);
			//setAllSpriteProperties(bingoFace, 0, addX, addY, true, 0.5, 0.5, 0, 1, 1, _boxBoard);
			setAllSpriteProperties(bingoFace, 3, addX, addY, false, 0.5, 0.5, 0, 0.75, 0.75, _boxBoard);
			_bingoAnimBin[i][j] = bingoFace;

			//Label

			label = LabelTTF::create(_data_key[randomIndex[boxId]], "Helvetica", 100);
			float a = label->getBoundingBox().size.width / 2;
			float b = label->getBoundingBox().size.height / 2;
			label->setPosition(c,d);
			label->setAnchorPoint(Vec2(0.5, 0.5));
			box->addChild(label, 3);
			
			label->setName(_data_value[randomIndex[boxId]]);
			boxId++;

			std::ostringstream str_i;
			str_i <<i ;
			std::string string_i = str_i.str();

			std::ostringstream str_j;
			str_j << j;
			std::string string_j = str_j.str();

			_boxContainer[i][j] = box;
			_boxContainer[i][j]->setName("box"+ string_i + string_j);
			 addEvents(box);

			 //ANIMATION PART
			std::string index = charFaceName[RandomHelper::random_int(0, 5)];
			auto charTimeline = CSLoader::createTimeline("bingo/"+ index +".csb");
			auto charFace = (Sprite *)CSLoader::createNode("bingo/" + index + ".csb");
			charFace->setGlobalZOrder(4);

			/*setAllSpriteProperties(charFace, 1, addX ,addY, true, 0.5, 0.5, 0, 0.6, 0.6, _boxBoard);*/
			//setAllSpriteProperties(charFace, 1, addX, addY, false, 0.5, 0.5, 0, 1, 1, _boxBoard);
			setAllSpriteProperties(charFace, 1, addX, addY, false, 0.5, 0.5, 0, 0.75, 0.75, _boxBoard);
			
			charFace->runAction(charTimeline);
			_charAnimContainer[i][j] = charTimeline;
			_charFace[i][j] = charFace;

			addX += box->getBoundingBox().size.width + _boxBoard->getBoundingBox().size.width * 0.011;
		}

		addY = addY + box->getBoundingBox().size.height+ _boxBoard->getBoundingBox().size.width *0.011;
	    /*addX = _boxBoard->getBoundingBox().size.width * 0.10;*/
		 //addX = _boxBoard->getBoundingBox().size.width * 0.17;
		addX = _boxBoard->getBoundingBox().size.width * 0.13;
	}

	Vector <Node*> children = bingoBackground->getChildren().at(0)->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
		}

	return true;
}
Bingo::~Bingo(void)
{

}
Bingo::Bingo(void)
{

}
void Bingo::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY,float rotation, float scaleX, float scaleY, Sprite* parent)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
	parent->addChild(sprite, zOrder);
}
void Bingo::setAllSpritePropertiesParentLabel(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, cocos2d::LabelTTF* parent)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
	parent->addChild(sprite, zOrder);
}

void::Bingo::setWordInHelpBoard()
{
//	_label->getString().compare("")
	//strcmp(_label->getString().c_str,empty.c_str()) != 0
	
	if (_label != NULL)
	{
		for (int i = 0; i < _data_value.size(); i++)
		{ 
			if (_label->getString().compare(_data_value[i]) == 0)
			{
				this->removeChild(_label, true);
				_data_value.erase(_data_value.begin() + i);
				break;
			}
		}
	}
	int size = _data_value.size()-1;
	if (size != -1)
	{
		_label = LabelTTF::create(_data_value[RandomHelper::random_int(0, size)], "Helvetica", 200);
		_label->setPosition(visibleSize.width / 2 + origin.x, visibleSize.height *.875);
		_label->setAnchorPoint(Vec2(0.5, 0.5));
		this->addChild(_label, 3);
	}
	
}

void Bingo::addEvents(Sprite* clickedObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);

    	if (rect.containsPoint(locationInNode))
    	{
			if(!_isBingoDone)
			{
					bool bingo = false;
					std::string helpLabelPair = target->getChildren().at(0)->getName();
					if (helpLabelPair.compare(_label->getString()) == 0)
					{
						target->setVisible(false);
						target->setTag(1);
						setWordInHelpBoard();

						auto targetName = target->getName();
						for (int i = 0; i < _boxContainer.size(); i++)
						{
							for (int j = 0; j < _boxContainer.size(); j++)
							{
								if (targetName == _boxContainer[i][j]->getName())
								{
									_boxContainer[i][j]->getEventDispatcher()->removeEventListener(listener);
									CCLOG("listener removed %s", targetName);
									_charAnimContainer[i][j]->gotoFrameAndPlay(0, true);

									/*auto sequence_E = ScaleTo::create(1, 0.5);
									auto sequence_F = ScaleTo::create(1, 0.6);*/
									/*auto sequence_E = ScaleTo::create(1, 0.9);
									auto sequence_F = ScaleTo::create(1, 1);*/
									auto sequence_E = ScaleTo::create(1, 0.65);
									auto sequence_F = ScaleTo::create(1, 0.75);
									auto sequence_scale = Sequence::create(sequence_E, DelayTime::create(1), sequence_F, NULL);

									auto sequence_A = MoveBy::create(0.5, Vec2(10, 0));
									auto sequence_B = MoveBy::create(0.5, Vec2(0, -10));
									auto sequence_C = MoveBy::create(0.5, Vec2(0, 10));
									auto sequence_D = MoveBy::create(0.5, Vec2(-10, 0));
									auto sequence_rotate = Sequence::create(sequence_A, sequence_B, sequence_C, sequence_D, NULL);

									auto mySpawn = Spawn::createWithTwoActions(sequence_scale, sequence_rotate);

									auto action = RepeatForever::create(mySpawn);
									_charFace[i][j]->setVisible(true);
									_charFace[i][j]->runAction(action);
								}
							}
						}
					}
					else
					{
						FShake* shake = FShake::actionWithDuration(0.5f, 5.0f);
						target->runAction(shake);

					}
						 if (-1 != bingoHorizotally()) {
							 bingo = true;
							 int row = bingoHorizotally();
							 for (int j = 0; j < _boxContainer.size(); j++)
							 {
								 _bingoAnimBin[row][j]->setVisible(true);
							 }
							 CCLOG("THIS IS BINGO ... HORIZONTAL");

						 }
						 if (-1 != bingoVertically()) {
							 bingo = true;
							 int column = bingoVertically();
							 for (int i = 0; i < _boxContainer.size(); i++)
							 {
								 _bingoAnimBin[i][column]->setVisible(true);
							 }
							 CCLOG("THIS IS BINGO ... VERTICAL ");
						 }
						  if (-1 != bingoRightDiagonally()) {
							  bingo = true;
							  for (int i = 0; i<_boxContainer.size(); i++)
							  {
								  _bingoAnimBin[i][i]->setVisible(true);
							  }
							 CCLOG("THIS IS BINGO ... Right Diagonally ");
						 }
						 if (-1 != bingoLeftDiagonally()) {
							 bingo = true;
							 for (int i = 0; i<_boxContainer.size(); i++)
							 {
								 _bingoAnimBin[i][_boxContainer.size() - 1 - i]->setVisible(true);
							 }
							 CCLOG("THIS IS BINGO ... Left Diagonally ");
						 }
						 if (bingo)
						 {
							 _isBingoDone = true;
						 }
					  }
			}
		return true;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, clickedObject);
}

std::vector<std::vector<Sprite*>> Bingo::createGrid(int row, int column)
{
	std::vector<std::vector<Sprite*>> tempContainer;

	tempContainer.resize(row);
	for (int i = 0; i < row; ++i)
		tempContainer[i].resize(column);

	return tempContainer;
}
std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> Bingo::createGridOfCharcater(int row, int column)
{
	std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> tempContainer;

	tempContainer.resize(row);
	for (int i = 0; i < row; ++i)
		tempContainer[i].resize(column);
	return tempContainer;
}

int Bingo::bingoHorizotally()
{
	int counter = 0;
	bool flagForNextMethod = false;
	for (int i = 0; i < _boxContainer.size(); i++)
	{
		for (int j = 0; j < _boxContainer.size(); j++)
		{
			if (_boxContainer[i][j]->getTag() == 1)
			{
				counter++;
				if (counter == _boxContainer.size())
				{   
					return i;
				}
			}
			else
			{	break;	}
		}
		counter = 0;
	}
	return -1;
}

int Bingo::bingoVertically()
{
	int counter = 0;
	bool flagForNextMethod = false;
	for (int j=0; j<_boxContainer.size(); j++)
	{
		for (int i=0; i<_boxContainer.size(); i++)
		{
			if (_boxContainer[i][j]->getTag() == 1)
			{
				counter++;
				if (counter == _boxContainer.size())
				{
					return j;
				}
			}
			else
			{ break; }
		}
		counter = 0;
	}
	return -1;
}
int Bingo::bingoRightDiagonally()
{
	
	int counter = 0;
	bool flagForNextMethod = false;
	for (int i=0; i<_boxContainer.size(); i++)
	{
			if (_boxContainer[i][i]->getTag() == 1)
			{
				counter++;
				if (counter == _boxContainer.size())
				{
					return i+1;
				}
			}
			else
			{ break; }
	 }
	return -1;
}
int Bingo::bingoLeftDiagonally()
{
	int counter = 0;
	bool flagForNextMethod = false;
	for (int i = 0; i<_boxContainer.size(); i++)
	{
		CCLOG("row : %d  column : %d ", i, (_boxContainer.size() - 1 - i));
		if (_boxContainer[i][_boxContainer.size()-1-i]->getTag() == 1)
		{
			counter++;
			if (counter == _boxContainer.size())
			{
				return i + 1;
			}
		}
		else
		{
			break;
		}

	}
	return -1;
}
