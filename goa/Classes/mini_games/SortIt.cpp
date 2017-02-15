//
//  SortIt.cpp
//  
//
//  Created by Jyoti Parkash on 14/02/17.
//
//

#include "SortIt.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../menu/StartMenuScene.h"


USING_NS_CC;


SortIt::SortIt() :
	objectsCount(0),
	solidObjects(NULL),
	transObjects(NULL),
	solidSprites(NULL),
	transSprites(NULL),
	levelObjectsCounter(1),
	overlapped(0),
	enableTouch(true),
	wrong(0),
	right(0),
	helpFlag(0)
{

}

SortIt::~SortIt() {
}



Scene *SortIt::createScene() {

	auto scene = Scene::create();
	auto layer = SortIt::create();

	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, SortIt::classname(), false);
	scene->addChild(layer->_menuContext);
	return scene;
}

SortIt *SortIt::create() {
	SortIt *sortit = new (std::nothrow) SortIt();
	if (sortit && sortit->init()) {
		sortit->autorelease();
		return sortit;
	}
	CC_SAFE_DELETE(sortit);
	return nullptr;

}

bool SortIt::init() {

	if (!Layer::init())
	{
		return false;
	}
	return true;

}


void SortIt::onEnterTransitionDidFinish() {


	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::string successAudioPath = "res/sounds/sortit/comedyBubble.ogg";
	std::string failureAudioPath = "res/sounds/sortit/failure.ogg";

	solidObjects.resize(0);
	transObjects.resize(0);

	switch (_menuContext->getCurrentLevel()) {

		case 1:
				wrong = 0;
				right = 12;
				objectsCount = 6;
				solidObjects.resize(objectsCount);
				transObjects.resize(objectsCount);
				
				solidSprites.resize(objectsCount);
				transSprites.resize(objectsCount);

				bgPath = "sortit/levelone.csb";
				plistPath = "sortit/sortit.plist";
				
				//SOLID OBJECTS

				solidObjects[0].imagePath = "sortit/toy1.png";
				solidObjects[0].anchorX = 0.5;
				solidObjects[0].anchorY = 0.5;
				solidObjects[0].posX = visibleSize.width*0.2;
				solidObjects[0].posY = visibleSize.height*0.11;
				solidObjects[0].id = 1;
				solidObjects[0].scaleX = 1;
				solidObjects[0].scaleY = 1;

				solidObjects[1].imagePath = "sortit/toy2.png";
				solidObjects[1].anchorX = 0.5;
				solidObjects[1].anchorY = 0.5;
				solidObjects[1].posX = visibleSize.width*0.6;
				solidObjects[1].posY = visibleSize.height*0.18;
				solidObjects[1].id = 2;
				solidObjects[1].scaleX = 1;
				solidObjects[1].scaleY = 1;

				solidObjects[2].imagePath = "sortit/toy3.png";
				solidObjects[2].anchorX = 0.5;
				solidObjects[2].anchorY = 0.5;
				solidObjects[2].posX = visibleSize.width*0.8;
				solidObjects[2].posY = visibleSize.height*0.14;
				solidObjects[2].id = 3;
				solidObjects[2].scaleX = 1;
				solidObjects[2].scaleY = 1;

				solidObjects[3].imagePath = "sortit/toy4.png";
				solidObjects[3].anchorX = 0.5;
				solidObjects[3].anchorY = 0.5;
				solidObjects[3].posX = visibleSize.width*0.4;
				solidObjects[3].posY = visibleSize.height*0.22;
				solidObjects[3].id = 4;
				solidObjects[3].scaleX = 1;
				solidObjects[3].scaleY = 1;

				solidObjects[4].imagePath = "sortit/toy5.png";
				solidObjects[4].anchorX = 0.5;
				solidObjects[4].anchorY = 0.5;
				solidObjects[4].posX = visibleSize.width*0.07;
				solidObjects[4].posY = visibleSize.height*0.27;
				solidObjects[4].id = 5;
				solidObjects[4].scaleX = 1;
				solidObjects[4].scaleY = 1;

				solidObjects[5].imagePath = "sortit/toy6.png";
				solidObjects[5].anchorX = 0.5;
				solidObjects[5].anchorY = 0.5;
				solidObjects[5].posX = visibleSize.width*0.93;
				solidObjects[5].posY = visibleSize.height*0.27;
				solidObjects[5].id = 6;
				solidObjects[5].scaleX = 1;
				solidObjects[5].scaleY = 1;

				//TRANS OBJECTS

				transObjects[0].imagePath = "sortit/toy1t.png";
				transObjects[0].anchorX = 0.5;
				transObjects[0].anchorY = 0.5;
				transObjects[0].posX = visibleSize.width*0.50;
				transObjects[0].posY = visibleSize.height*0.40;
				transObjects[0].id = 1;
				transObjects[0].scaleX = 1;
				transObjects[0].scaleY = 1;

				transObjects[1].imagePath = "sortit/toy2t.png";
				transObjects[1].anchorX = 0.5;
				transObjects[1].anchorY = 0.5;
				transObjects[1].posX = visibleSize.width*0.50;
				transObjects[1].posY = visibleSize.height*0.475;
				transObjects[1].id = 2;
				transObjects[1].scaleX = 1;
				transObjects[1].scaleY = 1;

				transObjects[2].imagePath = "sortit/toy3t.png";
				transObjects[2].anchorX = 0.5;
				transObjects[2].anchorY = 0.5;
				transObjects[2].posX = visibleSize.width*0.50;
				transObjects[2].posY = visibleSize.height*0.56;
				transObjects[2].id = 3;
				transObjects[2].scaleX = 1;
				transObjects[2].scaleY = 1;

				transObjects[3].imagePath = "sortit/toy4t.png";
				transObjects[3].anchorX = 0.5;
				transObjects[3].anchorY = 0.5;
				transObjects[3].posX = visibleSize.width*0.50;
				transObjects[3].posY = visibleSize.height*0.67;
				transObjects[3].id = 4;
				transObjects[3].scaleX = 1;
				transObjects[3].scaleY = 1;

				transObjects[4].imagePath = "sortit/toy5t.png";
				transObjects[4].anchorX = 0.5;
				transObjects[4].anchorY = 0.5;
				transObjects[4].posX = visibleSize.width*0.50;
				transObjects[4].posY = visibleSize.height*0.779;
				transObjects[4].id = 5;
				transObjects[4].scaleX = 1;
				transObjects[4].scaleY = 1;

				transObjects[5].imagePath = "sortit/toy6t.png";
				transObjects[5].anchorX = 0.5;
				transObjects[5].anchorY = 0.5;
				transObjects[5].posX = visibleSize.width*0.50;
				transObjects[5].posY = visibleSize.height*0.868;
				transObjects[5].id = 6;
				transObjects[5].scaleX = 1;
				transObjects[5].scaleY = 1;

				break;
		case 2:
				wrong = 0;
				right = 10;
				objectsCount = 5;
				
				solidObjects.resize(objectsCount);
				transObjects.resize(objectsCount);

				solidSprites.resize(objectsCount);
				transSprites.resize(objectsCount);

				bgPath = "sortit/leveltwo.csb";
				plistPath = "sortit/sortit.plist";

				//SOLID OBJECTS

				solidObjects[0].imagePath = "sortit/cake1.png";
				solidObjects[0].anchorX = 0.5;
				solidObjects[0].anchorY = 0.5;
				solidObjects[0].posX = visibleSize.width*0.78;
				solidObjects[0].posY = visibleSize.height*0.13;
				solidObjects[0].id = 1;
				solidObjects[0].scaleX = 0.9;
				solidObjects[0].scaleY = 0.9;

				solidObjects[1].imagePath = "sortit/cake2.png";
				solidObjects[1].anchorX = 0.5;
				solidObjects[1].anchorY = 0.5;
				solidObjects[1].posX = visibleSize.width*0.16;
				solidObjects[1].posY = visibleSize.height*0.26;
				solidObjects[1].id = 2;
				solidObjects[1].scaleX = 0.9;
				solidObjects[1].scaleY = 0.9;

				solidObjects[2].imagePath = "sortit/cake3.png";
				solidObjects[2].anchorX = 0.5;
				solidObjects[2].anchorY = 0.5;
				solidObjects[2].posX = visibleSize.width*0.77;
				solidObjects[2].posY = visibleSize.height*0.28;
				solidObjects[2].id = 3;
				solidObjects[2].scaleX = 0.9;
				solidObjects[2].scaleY = 0.9;

				solidObjects[3].imagePath = "sortit/cake4.png";
				solidObjects[3].anchorX = 0.5;
				solidObjects[3].anchorY = 0.5;
				solidObjects[3].posX = visibleSize.width*0.11;
				solidObjects[3].posY = visibleSize.height*0.10;
				solidObjects[3].id = 4;
				solidObjects[3].scaleX = 0.9;
				solidObjects[3].scaleY = 0.9;

				solidObjects[4].imagePath = "sortit/cake5.png";
				solidObjects[4].anchorX = 0.5;
				solidObjects[4].anchorY = 0.5;
				solidObjects[4].posX = visibleSize.width*0.93;
				solidObjects[4].posY = visibleSize.height*0.35;
				solidObjects[4].id = 5;
				solidObjects[4].scaleX = 0.9;
				solidObjects[4].scaleY = 0.9;

				

				//TRANS OBJECTS

				transObjects[0].imagePath = "sortit/cake1t.png";
				transObjects[0].anchorX = 0.5;
				transObjects[0].anchorY = 0.5;
				transObjects[0].posX = visibleSize.width*0.50;
				transObjects[0].posY = visibleSize.height*0.42;
				transObjects[0].id = 1;
				transObjects[0].scaleX = 0.9;
				transObjects[0].scaleY = 0.9;

				transObjects[1].imagePath = "sortit/cake2t.png";
				transObjects[1].anchorX = 0.5;
				transObjects[1].anchorY = 0.5;
				transObjects[1].posX = visibleSize.width*0.50;
				transObjects[1].posY = visibleSize.height*0.50;
				transObjects[1].id = 2;
				transObjects[1].scaleX = 0.9;
				transObjects[1].scaleY = 0.9;

				transObjects[2].imagePath = "sortit/cake3t.png";
				transObjects[2].anchorX = 0.5;
				transObjects[2].anchorY = 0.5;
				transObjects[2].posX = visibleSize.width*0.50;
				transObjects[2].posY = visibleSize.height*0.57;
				transObjects[2].id = 3;
				transObjects[2].scaleX = 0.9;
				transObjects[2].scaleY = 0.9;

				transObjects[3].imagePath = "sortit/cake4t.png";
				transObjects[3].anchorX = 0.5;
				transObjects[3].anchorY = 0.5;
				transObjects[3].posX = visibleSize.width*0.50;
				transObjects[3].posY = visibleSize.height*0.63;
				transObjects[3].id = 4;
				transObjects[3].scaleX = 0.9;
				transObjects[3].scaleY = 0.9;

				transObjects[4].imagePath = "sortit/cake5t.png";
				transObjects[4].anchorX = 0.5;
				transObjects[4].anchorY = 0.5;
				transObjects[4].posX = visibleSize.width*0.50;
				transObjects[4].posY = visibleSize.height*0.72;
				transObjects[4].id = 5;
				transObjects[4].scaleX = 0.9;
				transObjects[4].scaleY = 0.9;


				
			

				break;
		case 3:
				wrong = 0;
				right = 12;
				objectsCount = 6;
				solidObjects.resize(objectsCount);
				transObjects.resize(objectsCount);

				solidSprites.resize(objectsCount);
				transSprites.resize(objectsCount);

				bgPath = "sortit/levelthree.csb";
				plistPath = "sortit/sortit.plist";

				//SOLID OBJECTS

				solidObjects[0].imagePath = "sortit/string1.png";
				solidObjects[0].anchorX = 0.5;
				solidObjects[0].anchorY = 0.5;
				solidObjects[0].posX = visibleSize.width*0.70;
				solidObjects[0].posY = visibleSize.height*0.25;
				solidObjects[0].id = 1;
				solidObjects[0].scaleX = 2.5;
				solidObjects[0].scaleY = 0.9;

				solidObjects[1].imagePath = "sortit/string2.png";
				solidObjects[1].anchorX = 0.5;
				solidObjects[1].anchorY = 0.5;
				solidObjects[1].posX = visibleSize.width*0.07;
				solidObjects[1].posY = visibleSize.height*0.26;
				solidObjects[1].id = 2;
				solidObjects[1].scaleX = 2.5;
				solidObjects[1].scaleY = 0.85;

				solidObjects[2].imagePath = "sortit/string3.png";
				solidObjects[2].anchorX = 0.5;
				solidObjects[2].anchorY = 0.5;
				solidObjects[2].posX = visibleSize.width*0.74;
				solidObjects[2].posY = visibleSize.height*0.28;
				solidObjects[2].id = 3;
				solidObjects[2].scaleX = 2.5;
				solidObjects[2].scaleY = 0.83;

				solidObjects[3].imagePath = "sortit/string4.png";
				solidObjects[3].anchorX = 0.5;
				solidObjects[3].anchorY = 0.5;
				solidObjects[3].posX = visibleSize.width*0.11;
				solidObjects[3].posY = visibleSize.height*0.30;
				solidObjects[3].id = 4;
				solidObjects[3].scaleX = 2.5;
				solidObjects[3].scaleY = 0.9;

				solidObjects[4].imagePath = "sortit/string5.png";
				solidObjects[4].anchorX = 0.5;
				solidObjects[4].anchorY = 0.5;
				solidObjects[4].posX = visibleSize.width*0.93;
				solidObjects[4].posY = visibleSize.height*0.35;
				solidObjects[4].id = 5;
				solidObjects[4].scaleX = 2.5;
				solidObjects[4].scaleY = 1;

				solidObjects[5].imagePath = "sortit/string6.png";
				solidObjects[5].anchorX = 0.5;
				solidObjects[5].anchorY = 0.5;
				solidObjects[5].posX = visibleSize.width*0.85;
				solidObjects[5].posY = visibleSize.height*0.35;
				solidObjects[5].id = 6;
				solidObjects[5].scaleX = 2.5;
				solidObjects[5].scaleY = 1;

				//TRANS OBJECTS

				transObjects[0].imagePath = "sortit/string1t.png";
				transObjects[0].anchorX = 0.5;
				transObjects[0].anchorY = 0.5;
				transObjects[0].posX = visibleSize.width*0.39;
				transObjects[0].posY = visibleSize.height*0.54;
				transObjects[0].id = 1;
				transObjects[0].scaleX = 2.5;
				transObjects[0].scaleY = 0.9;

				transObjects[1].imagePath = "sortit/string2t.png";
				transObjects[1].anchorX = 0.5;
				transObjects[1].anchorY = 0.5;
				transObjects[1].posX = visibleSize.width*0.42;
				transObjects[1].posY = visibleSize.height*0.55;
				transObjects[1].id = 2;
				transObjects[1].scaleX = 2.5;
				transObjects[1].scaleY = 0.85;

				transObjects[2].imagePath = "sortit/string3t.png";
				transObjects[2].anchorX = 0.5;
				transObjects[2].anchorY = 0.5;
				transObjects[2].posX = visibleSize.width*0.45;
				transObjects[2].posY = visibleSize.height*0.55;
				transObjects[2].id = 3;
				transObjects[2].scaleX = 2.5;
				transObjects[2].scaleY = 0.83;

				transObjects[3].imagePath = "sortit/string4t.png";
				transObjects[3].anchorX = 0.5;
				transObjects[3].anchorY = 0.5;
				transObjects[3].posX = visibleSize.width*0.48;
				transObjects[3].posY = visibleSize.height*0.55;
				transObjects[3].id = 4;
				transObjects[3].scaleX = 2.5;
				transObjects[3].scaleY = 0.9;

				transObjects[4].imagePath = "sortit/string5t.png";
				transObjects[4].anchorX = 0.5;
				transObjects[4].anchorY = 0.5;
				transObjects[4].posX = visibleSize.width*0.51;
				transObjects[4].posY = visibleSize.height*0.56;
				transObjects[4].id = 5;
				transObjects[4].scaleX = 2.5;
				transObjects[4].scaleY = 1;

				transObjects[5].imagePath = "sortit/string6t.png";
				transObjects[5].anchorX = 0.5;
				transObjects[5].anchorY = 0.5;
				transObjects[5].posX = visibleSize.width*0.54;
				transObjects[5].posY = visibleSize.height*0.58;
				transObjects[5].id = 6;
				transObjects[5].scaleX = 2.5;
				transObjects[5].scaleY = 1;

				break;
		case 4:
				wrong = 0;
				right = 10;
				objectsCount = 5;
				
				solidObjects.resize(objectsCount);
				transObjects.resize(objectsCount);

				solidSprites.resize(objectsCount);
				transSprites.resize(objectsCount);

				bgPath = "sortit/levelfour.csb";
				plistPath = "sortit/sortittwo/sortittwo.plist";

				//SOLID OBJECTS

				solidObjects[0].imagePath = "sortit/sortittwo/bowl1.png";
				solidObjects[0].anchorX = 0.5;
				solidObjects[0].anchorY = 0.5;
				solidObjects[0].posX = visibleSize.width*0.85;
				solidObjects[0].posY = visibleSize.height*0.18;
				solidObjects[0].id = 1;
				solidObjects[0].scaleX = 1;
				solidObjects[0].scaleY = 1;

				solidObjects[1].imagePath = "sortit/sortittwo/bowl2.png";
				solidObjects[1].anchorX = 0.5;
				solidObjects[1].anchorY = 0.5;
				solidObjects[1].posX = visibleSize.width*0.19;
				solidObjects[1].posY = visibleSize.height*0.17;
				solidObjects[1].id = 2;
				solidObjects[1].scaleX = 1;
				solidObjects[1].scaleY = 1;

				solidObjects[2].imagePath = "sortit/sortittwo/bowl3.png";
				solidObjects[2].anchorX = 0.5;
				solidObjects[2].anchorY = 0.5;
				solidObjects[2].posX = visibleSize.width*0.46;
				solidObjects[2].posY = visibleSize.height*0.13;
				solidObjects[2].id = 3;
				solidObjects[2].scaleX = 1;
				solidObjects[2].scaleY = 1;

				solidObjects[3].imagePath = "sortit/sortittwo/bowl4.png";
				solidObjects[3].anchorX = 0.5;
				solidObjects[3].anchorY = 0.5;
				solidObjects[3].posX = visibleSize.width*0.62;
				solidObjects[3].posY = visibleSize.height*0.13;
				solidObjects[3].id = 4;
				solidObjects[3].scaleX = 1;
				solidObjects[3].scaleY = 1;

				solidObjects[4].imagePath = "sortit/sortittwo/bowl5.png";
				solidObjects[4].anchorX = 0.5;
				solidObjects[4].anchorY = 0.5;
				solidObjects[4].posX = visibleSize.width*0.07;
				solidObjects[4].posY = visibleSize.height*0.15;
				solidObjects[4].id = 5;
				solidObjects[4].scaleX = 1;
				solidObjects[4].scaleY = 1;

				

				//TRANS OBJECTS

				transObjects[0].imagePath = "sortit/sortittwo/bowl1t.png";
				transObjects[0].anchorX = 0.5;
				transObjects[0].anchorY = 0.5;
				transObjects[0].posX = visibleSize.width*0.29;
				transObjects[0].posY = visibleSize.height*0.43;
				transObjects[0].id = 1;
				transObjects[0].scaleX = 0.9;
				transObjects[0].scaleY = 0.9;

				transObjects[1].imagePath = "sortit/sortittwo/bowl2t.png";
				transObjects[1].anchorX = 0.5;
				transObjects[1].anchorY = 0.5;
				transObjects[1].posX = visibleSize.width*0.48;
				transObjects[1].posY = visibleSize.height*0.42;
				transObjects[1].id = 2;
				transObjects[1].scaleX = 0.9;
				transObjects[1].scaleY = 0.9;

				transObjects[2].imagePath = "sortit/sortittwo/bowl3t.png";
				transObjects[2].anchorX = 0.5;
				transObjects[2].anchorY = 0.5;
				transObjects[2].posX = visibleSize.width*0.65;
				transObjects[2].posY = visibleSize.height*0.42;
				transObjects[2].id = 3;
				transObjects[2].scaleX = 0.9;
				transObjects[2].scaleY = 0.9;

				transObjects[3].imagePath = "sortit/sortittwo/bowl4t.png";
				transObjects[3].anchorX = 0.5;
				transObjects[3].anchorY = 0.5;
				transObjects[3].posX = visibleSize.width*0.80;
				transObjects[3].posY = visibleSize.height*0.42;
				transObjects[3].id = 4;
				transObjects[3].scaleX = 0.9;
				transObjects[3].scaleY = 0.9;

				transObjects[4].imagePath = "sortit/sortittwo/bowl5t.png";
				transObjects[4].anchorX = 0.5;
				transObjects[4].anchorY = 0.5;
				transObjects[4].posX = visibleSize.width*0.91;
				transObjects[4].posY = visibleSize.height*0.42;
				transObjects[4].id = 5;
				transObjects[4].scaleX = 0.9;
				transObjects[4].scaleY = 0.9;

				

				break;
		case 5:
				wrong = 0;
				right = 10;
				objectsCount = 5;
				
				solidObjects.resize(objectsCount);
				transObjects.resize(objectsCount);

				solidSprites.resize(objectsCount);
				transSprites.resize(objectsCount);

				bgPath = "sortit/levelfive.csb";
				plistPath = "sortit/sortittwo/sortittwo.plist";

				//SOLID OBJECTS

				solidObjects[0].imagePath = "sortit/sortittwo/num1.png";
				solidObjects[0].anchorX = 0.5;
				solidObjects[0].anchorY = 0.5;
				solidObjects[0].posX = visibleSize.width*0.23;
				solidObjects[0].posY = visibleSize.height*0.26;
				solidObjects[0].id = 1;
				solidObjects[0].scaleX = 0.9;
				solidObjects[0].scaleY = 0.9;

				solidObjects[1].imagePath = "sortit/sortittwo/num2.png";
				solidObjects[1].anchorX = 0.5;
				solidObjects[1].anchorY = 0.5;
				solidObjects[1].posX = visibleSize.width*0.54;
				solidObjects[1].posY = visibleSize.height*0.26;
				solidObjects[1].id = 2;
				solidObjects[1].scaleX = 0.9;
				solidObjects[1].scaleY = 0.9;

				solidObjects[2].imagePath = "sortit/sortittwo/num3.png";
				solidObjects[2].anchorX = 0.5;
				solidObjects[2].anchorY = 0.5;
				solidObjects[2].posX = visibleSize.width*0.07;
				solidObjects[2].posY = visibleSize.height*0.26;
				solidObjects[2].id = 3;
				solidObjects[2].scaleX = 0.9;
				solidObjects[2].scaleY = 0.9;

				solidObjects[3].imagePath = "sortit/sortittwo/num4.png";
				solidObjects[3].anchorX = 0.5;
				solidObjects[3].anchorY = 0.5;
				solidObjects[3].posX = visibleSize.width*0.70;
				solidObjects[3].posY = visibleSize.height*0.26;
				solidObjects[3].id = 4;
				solidObjects[3].scaleX = 0.9;
				solidObjects[3].scaleY = 0.9;

				solidObjects[4].imagePath = "sortit/sortittwo/num5.png";
				solidObjects[4].anchorX = 0.5;
				solidObjects[4].anchorY = 0.5;
				solidObjects[4].posX = visibleSize.width*0.42;
				solidObjects[4].posY = visibleSize.height*0.16;
				solidObjects[4].id = 5;
				solidObjects[4].scaleX = 0.9;
				solidObjects[4].scaleY = 0.9;

			

				//TRANS OBJECTS

				transObjects[0].imagePath = "sortit/sortittwo/num1t.png";
				transObjects[0].anchorX = 0.5;
				transObjects[0].anchorY = 0.5;
				transObjects[0].posX = visibleSize.width*0.39;
				transObjects[0].posY = visibleSize.height*0.36;
				transObjects[0].id = 1;
				transObjects[0].scaleX = 0.9;
				transObjects[0].scaleY = 0.9;

				transObjects[1].imagePath = "sortit/sortittwo/num2t.png";
				transObjects[1].anchorX = 0.5;
				transObjects[1].anchorY = 0.5;
				transObjects[1].posX = visibleSize.width*0.39;
				transObjects[1].posY = visibleSize.height*0.46;
				transObjects[1].id = 2;
				transObjects[1].scaleX = 0.9;
				transObjects[1].scaleY = 0.9;

				transObjects[2].imagePath = "sortit/sortittwo/num3t.png";
				transObjects[2].anchorX = 0.5;
				transObjects[2].anchorY = 0.5;
				transObjects[2].posX = visibleSize.width*0.39;
				transObjects[2].posY = visibleSize.height*0.57;
				transObjects[2].id = 3;
				transObjects[2].scaleX = 0.9;
				transObjects[2].scaleY = 0.9;

				transObjects[3].imagePath = "sortit/sortittwo/num4t.png";
				transObjects[3].anchorX = 0.5;
				transObjects[3].anchorY = 0.5;
				transObjects[3].posX = visibleSize.width*0.39;
				transObjects[3].posY = visibleSize.height*0.67;
				transObjects[3].id = 4;
				transObjects[3].scaleX = 0.9;
				transObjects[3].scaleY = 0.9;

				transObjects[4].imagePath = "sortit/sortittwo/num5t.png";
				transObjects[4].anchorX = 0.5;
				transObjects[4].anchorY = 0.5;
				transObjects[4].posX = visibleSize.width*0.39;
				transObjects[4].posY = visibleSize.height*0.78;
				transObjects[4].id = 5;
				transObjects[4].scaleX = 0.9;
				transObjects[4].scaleY = 0.9;


				break;
		case 6:
				wrong = 0;
				right = 10;
				objectsCount = 5;
				
				solidObjects.resize(objectsCount);
				transObjects.resize(objectsCount);

				solidSprites.resize(objectsCount);
				transSprites.resize(objectsCount);

				bgPath = "sortit/levelsix.csb";
				plistPath = "sortit/sortittwo/sortittwo.plist";

				//SOLID OBJECTS

				solidObjects[0].imagePath = "sortit/sortittwo/a.png";
				solidObjects[0].anchorX = 0.5;
				solidObjects[0].anchorY = 0.5;
				solidObjects[0].posX = visibleSize.width*0.70;
				solidObjects[0].posY = visibleSize.height*0.22;
				solidObjects[0].id = 1;
				solidObjects[0].scaleX = 0.9;
				solidObjects[0].scaleY = 0.9;

				solidObjects[1].imagePath = "sortit/sortittwo/b.png";
				solidObjects[1].anchorX = 0.5;
				solidObjects[1].anchorY = 0.5;
				solidObjects[1].posX = visibleSize.width*0.31;
				solidObjects[1].posY = visibleSize.height*0.17;
				solidObjects[1].id = 2;
				solidObjects[1].scaleX = 0.9;
				solidObjects[1].scaleY = 0.9;

				solidObjects[2].imagePath = "sortit/sortittwo/c.png";
				solidObjects[2].anchorX = 0.5;
				solidObjects[2].anchorY = 0.5;
				solidObjects[2].posX = visibleSize.width*0.46;
				solidObjects[2].posY = visibleSize.height*0.13;
				solidObjects[2].id = 3;
				solidObjects[2].scaleX = 0.9;
				solidObjects[2].scaleY = 0.9;

				solidObjects[3].imagePath = "sortit/sortittwo/d.png";
				solidObjects[3].anchorX = 0.5;
				solidObjects[3].anchorY = 0.5;
				solidObjects[3].posX = visibleSize.width*0.62;
				solidObjects[3].posY = visibleSize.height*0.13;
				solidObjects[3].id = 4;
				solidObjects[3].scaleX = 0.9;
				solidObjects[3].scaleY = 0.9;

				solidObjects[4].imagePath = "sortit/sortittwo/e.png";
				solidObjects[4].anchorX = 0.5;
				solidObjects[4].anchorY = 0.5;
				solidObjects[4].posX = visibleSize.width*0.07;
				solidObjects[4].posY = visibleSize.height*0.15;
				solidObjects[4].id = 5;
				solidObjects[4].scaleX = 0.9;
				solidObjects[4].scaleY = 0.9;

				

				//TRANS OBJECTS

				transObjects[0].imagePath = "sortit/sortittwo/at.png";
				transObjects[0].anchorX = 0.5;
				transObjects[0].anchorY = 0.5;
				transObjects[0].posX = visibleSize.width*0.43;
				transObjects[0].posY = visibleSize.height*0.69;
				transObjects[0].id = 1;
				transObjects[0].scaleX = 0.9;
				transObjects[0].scaleY = 0.9;

				transObjects[1].imagePath = "sortit/sortittwo/bt.png";
				transObjects[1].anchorX = 0.5;
				transObjects[1].anchorY = 0.5;
				transObjects[1].posX = visibleSize.width*0.52;
				transObjects[1].posY = visibleSize.height*0.72;
				transObjects[1].id = 2;
				transObjects[1].scaleX = 0.9;
				transObjects[1].scaleY = 0.9;

				transObjects[2].imagePath = "sortit/sortittwo/ct.png";
				transObjects[2].anchorX = 0.5;
				transObjects[2].anchorY = 0.5;
				transObjects[2].posX = visibleSize.width*0.61;
				transObjects[2].posY = visibleSize.height*0.69;
				transObjects[2].id = 3;
				transObjects[2].scaleX = 0.9;
				transObjects[2].scaleY = 0.9;

				transObjects[3].imagePath = "sortit/sortittwo/dt.png";
				transObjects[3].anchorX = 0.5;
				transObjects[3].anchorY = 0.5;
				transObjects[3].posX = visibleSize.width*0.71;
				transObjects[3].posY = visibleSize.height*0.67;
				transObjects[3].id = 4;
				transObjects[3].scaleX = 0.9;
				transObjects[3].scaleY = 0.9;

				transObjects[4].imagePath = "sortit/sortittwo/et.png";
				transObjects[4].anchorX = 0.5;
				transObjects[4].anchorY = 0.5;
				transObjects[4].posX = visibleSize.width*0.78;
				transObjects[4].posY = visibleSize.height*0.71;
				transObjects[4].id = 5;
				transObjects[4].scaleX = 0.9;
				transObjects[4].scaleY = 0.9;

				

				break;

	}

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile(plistPath);

	_background = CSLoader::createNode(bgPath);
	_background->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	_background->setAnchorPoint(Vec2(0.5, 0.5));
	addChild(_background);


	if (_menuContext->getCurrentLevel() == 2) {

		//CAKE STAND

		cocos2d::Sprite * cakeStand = Sprite::createWithSpriteFrameName("sortit/stand.png");
		cakeStand->setPosition(visibleSize.width*0.50, visibleSize.height*0.34);
		cakeStand->setScale(0.9, 0.9);
		cakeStand->setAnchorPoint(Vec2(0.5, 0.5));

		this->addChild(cakeStand);
	}

	if (_menuContext->getCurrentLevel() == 3) {

		//HARP PLAY

		cocos2d::Sprite * harp = Sprite::createWithSpriteFrameName("sortit/harpPlay.png");
		harp->setPosition(visibleSize.width*0.46, visibleSize.height*0.50);
		//harp->setScale(0.9, 0.9);
		harp->setAnchorPoint(Vec2(0.5, 0.5));

		this->addChild(harp);
	}


	for (int i = 0; i < objectsCount; i++) {


		solidSprites[i] = Sprite::createWithSpriteFrameName(solidObjects[i].imagePath);
		solidSprites[i]->setPosition(solidObjects[i].posX, solidObjects[i].posY);
		solidSprites[i]->setScale(solidObjects[i].scaleX, solidObjects[i].scaleY);
		solidSprites[i]->setAnchorPoint(Vec2(solidObjects[i].anchorX, solidObjects[i].anchorY));
		solidSprites[i]->setTag(solidObjects[i].id);
		this->addChild(solidSprites[i]);
		setupTouch(solidSprites[i]);


		transSprites[i] = Sprite::createWithSpriteFrameName(transObjects[i].imagePath);
		transSprites[i]->setPosition(transObjects[i].posX, transObjects[i].posY);
		transSprites[i]->setScale(transObjects[i].scaleX, transObjects[i].scaleY);
		transSprites[i]->setAnchorPoint(Vec2(transObjects[i].anchorX, transObjects[i].anchorY));
		transSprites[i]->setTag(transObjects[i].id);
		this->addChild(transSprites[i]);


		
	}
	

	_menuContext->setMaxPoints(objectsCount);

	//adding help

	if (_menuContext->getCurrentLevel() == 1) {

		auto box1 = solidSprites[0];
		auto box2 = transSprites[0];


		auto box1pos = box1->getPosition();
		auto box2pos = box2->getPosition();

		_help = HelpLayer::create(Rect(box1pos.x, box1pos.y, box1->getContentSize().width, box1->getContentSize().height), Rect(box2pos.x, box2pos.y, box1->getContentSize().width, box1->getContentSize().height));


		_help->clickAndDrag(Vec2(box1pos), Vec2(box2pos));


		this->addChild(_help);
	}


}



void SortIt::setupTouch(cocos2d::Sprite * object) {
	
		auto listener = EventListenerTouchOneByOne::create();
		listener->onTouchBegan = CC_CALLBACK_2(SortIt::onTouchBegan, this);
		listener->onTouchEnded = CC_CALLBACK_2(SortIt::onTouchEnded, this);
		listener->onTouchMoved = CC_CALLBACK_2(SortIt::onTouchMoved, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, object);
	
}


bool SortIt::onTouchBegan(Touch* touch, Event* event) {

	auto target = event->getCurrentTarget();
	Point locationInNode = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);

	if (target->getBoundingBox().containsPoint(touch->getLocation()) && enableTouch)
	{			
		        CCLOG("onTouchBegan");
				enableTouch = false;
				overlapped = 0;
		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void SortIt::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");
	auto target = event->getCurrentTarget();

	Point location = target->convertToNodeSpace(touch->getLocation());


	auto toy = target->getContentSize();
	Rect rectToy = Rect(0, 0, toy.width, toy.height);
	
	if (overlapped == 0) {
		wrong++;

		
		auto toyMove = MoveTo::create(2, Vec2(solidObjects[target->getTag()-1].posX, solidObjects[target->getTag() - 1].posY));

		
		auto enableTouchfunc = CallFunc::create([=] {		
			enableTouch = true;
		});
		
		auto sequence = Sequence::create(toyMove, enableTouchfunc, NULL);

		target->runAction(sequence);

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("res/sounds/sortit/failure.ogg", false);
	
	}
	
}

void SortIt::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	
	//    CCLOG("onTouchMoved");
	
		
		auto target = event->getCurrentTarget();

		Point location = target->convertToNodeSpace(touch->getLocation());
		target->setPosition(touch->getLocation());

		auto toyRect = target->getBoundingBox();
		auto toytRect = transSprites[target->getTag() - 1]->getBoundingBox();

		if (toyRect.intersectsRect(toytRect) && target->getTag() == levelObjectsCounter) {


			if (_menuContext->getCurrentLevel() == 1 && levelObjectsCounter == 1) {
				this->removeChild(_help);
			}

			auto x = transSprites[target->getTag() - 1]->getPosition().x;
			auto y = transSprites[target->getTag() - 1]->getPosition().y;

			target->setPosition(x, y);
			enableTouch = true;

			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("res/sounds/sortit/comedyBubble.ogg", false);

			overlapped = 1;
			levelObjectsCounter++;

			Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target);

			
			if (levelObjectsCounter == objectsCount + 1) {


				auto showScore = CallFunc::create([=] {
					
					if ((_menuContext->getMaxPoints() - wrong) <= 0) {
						
						_menuContext->addPoints(_menuContext->getMaxPoints() * 0.33);
					}
					else {
						_menuContext->addPoints(_menuContext->getMaxPoints() - wrong);
						
					}

					_menuContext->showScore();
				});

				auto sequence = Sequence::create(DelayTime::create(1.0), showScore, NULL);

				this->runAction(sequence);
				
			}
		}	
}

