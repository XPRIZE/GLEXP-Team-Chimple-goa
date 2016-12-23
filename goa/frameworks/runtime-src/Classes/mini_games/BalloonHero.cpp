//
//  BalloonHero.cpp
//
//  Created by Jyoti Prakash on 03/10/16.
//
//

#include "BalloonHero.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "../util/CommonText.h"


USING_NS_CC;



BalloonHero::BalloonHero(){

}

BalloonHero::~BalloonHero() {

}


Scene *BalloonHero::createScene() {

	auto scene = Scene::create();
	auto layer = BalloonHero::create();

	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BalloonHero::classname());
	scene->addChild(layer->_menuContext);

	return scene;

}

BalloonHero *BalloonHero::create() {

	BalloonHero * balloonHero = new (std::nothrow) BalloonHero();
	if (balloonHero && balloonHero->init()) {
		balloonHero->autorelease();
		return balloonHero;
	}
	CC_SAFE_DELETE(balloonHero);
	return nullptr;

}


bool BalloonHero::init() {

	if (!Layer::init())
	{
		return false;
	}

	return true;

}

void BalloonHero::onEnterTransitionDidFinish() {
	/*
	auto help = HelpLayer::create(Rect(boxPosition.x, boxPosition.y, boxContentSize.width, boxContentSize.height), Rect(0, 0, 0, 0));
	help->clickAndDrag(Vec2(boxPosition), Vec2(visibleSize.width / 2, visibleSize.height *0.1));
	help->setName("helpLayer");
	this->addChild(help);
	*/
	
	//SpriteFrameCache::getInstance()->addSpriteFramesWithFile("balloonhero/balloonhero.plist");
	//_sceneNumber = RandomHelper::random_int(1, 2);

	
	if (_menuContext->getCurrentLevel() <= 8 && _menuContext->getCurrentLevel() >= 1) {
		
		_menuContext->setMaxPoints(10);
		_sceneNumber = 1;
		switch (_menuContext->getCurrentLevel()) {


		case 1: _set1 =  TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 2: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1); 
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 3: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 4: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 5: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 6: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 7: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;
		case 8: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
				_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
				_hint = LangUtil::getInstance()->translateString("Catch the nouns");
				break;

		}

	}

	//second iteration
	if (_menuContext->getCurrentLevel() <= 16 && _menuContext->getCurrentLevel() >= 9) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 2;
		switch (_menuContext->getCurrentLevel()) {


		case 9: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 10: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 11: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 12: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 13: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 14: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 15: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;
		case 16: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adjective");
			break;

		}

	}

	//third iteration
	if (_menuContext->getCurrentLevel() <= 24 && _menuContext->getCurrentLevel() >= 17) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 3;
		switch (_menuContext->getCurrentLevel()) {


		case 17: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 18: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 19: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 20: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 21: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 22: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 23: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;
		case 24: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the verb");
			break;

		}

	}

	//fourth iteration

	if (_menuContext->getCurrentLevel() <= 32 && _menuContext->getCurrentLevel() >= 25) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 1;
		switch (_menuContext->getCurrentLevel()) {


		case 25: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 26: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 27: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 28: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 29: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 30: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 31: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;
		case 32: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;

		}

	}

	//fifth iteration

	if (_menuContext->getCurrentLevel() <= 40 && _menuContext->getCurrentLevel() >= 33) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 2;
		switch (_menuContext->getCurrentLevel()) {


		case 33: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 34: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 35: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 36: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 37: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 38: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 39: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 40: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;

		}

	}

	//six iteration

	if (_menuContext->getCurrentLevel() <= 48 && _menuContext->getCurrentLevel() >= 41) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 3;
		switch (_menuContext->getCurrentLevel()) {


		case 41: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 42: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 43: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 44: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 45: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 46: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 47: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 48: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;

		}

	}

	//seven iteration
	if (_menuContext->getCurrentLevel() <= 56 && _menuContext->getCurrentLevel() >= 49) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 1;
		switch (_menuContext->getCurrentLevel()) {


		case 49: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 50: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 51: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 52: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 53: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 54: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 55: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 56: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;

		}

	}

	//eight iteration

	if (_menuContext->getCurrentLevel() <= 64 && _menuContext->getCurrentLevel() >= 57) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 2;
		switch (_menuContext->getCurrentLevel()) {


		case 57: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 58: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 59: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADJECTIVE, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 60: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 61: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 62: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 63: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 64: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;

		}

	}

	//ninth iteration

	if (_menuContext->getCurrentLevel() <= 72 && _menuContext->getCurrentLevel() >= 65) {

		_menuContext->setMaxPoints(10);
		_sceneNumber = 3;
		switch (_menuContext->getCurrentLevel()) {


		case 65: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 66: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the nouns");
			break;
		case 67: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::ADVERB, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the adverbs");
			break;
		case 68: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::NOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the nouns");
			break;
		case 69: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PREPOSITION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the prepositions");
			break;
		case 70: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::CONJUNCTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the conjuctions");
			break;
		case 71: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::INTERJECTION, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the interjections");
			break;
		case 72: _set1 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::PRONOUN, 10, 1);
			_set2 = TextGenerator::getInstance()->getWords(TextGenerator::P_O_S::VERB, 10, 1);
			_hint = LangUtil::getInstance()->translateString("Catch the pronouns");
			break;

		}

	}
	
	_menuContext->setMaxPoints(20);

	//_sceneNumber = 1;

	std::string mainSceneplist;

	
	if (_sceneNumber == 1) {
		
		mainSceneplist = "balloonhero/balloonhero.plist";
	}

	if (_sceneNumber == 2) {
		mainSceneplist = "balloonfarm/balloonfarm.plist";
	}
	
	if (_sceneNumber == 3) {
		mainSceneplist = "ballooncandy/ballooncandy.plist";
	}

	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile(mainSceneplist);

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	CCLOG("width : %f", visibleSize.width);
	CCLOG("height : %f", visibleSize.height);
	std::string mainScene;

	if (_sceneNumber == 1) {
		mainScene = "balloonhero/balloonhero.csb";
	}

	if (_sceneNumber == 2) {
		mainScene = "balloonfarm/balloonfarm.csb";
	}
	if (_sceneNumber == 3) {
		mainScene = "ballooncandy/ballooncandy.csb";
	}
	
	_balloonHero = CSLoader::createNode(mainScene);
	
	//_balloonHero->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
	//_balloonHero->setAnchorPoint(Vec2(0, 0));
	this->addChild(_balloonHero);


	std::string foregroundcsb;

	if (_sceneNumber == 1) { foregroundcsb = "foreground"; 
	
	 
	_bgTimeline = CSLoader::createTimeline("balloonhero/background.csb");
	_balloonHero->getChildByName("background")->runAction(_bgTimeline);
	_bgTimeline->play("sky", false);
	}
	if (_sceneNumber == 2) { foregroundcsb = "foreground"; }
	if (_sceneNumber == 3) { foregroundcsb = "foreground"; }


	
		_foreGround = _balloonHero->getChildByName(foregroundcsb);
		auto moveForeground = MoveTo::create(4, Vec2(_foreGround->getPositionX(), -1000));

		_foreGround->runAction(moveForeground);
	

	auto loader = CSLoader::createNode("balloonhero/fuelbar.csb");
	_fuelBar = (cocos2d::ui::LoadingBar*)(loader->getChildren()).at(1);	_fuelBar->setPercent(100);
	
	loader->setPosition(Vec2(visibleSize.width * 0.94, visibleSize.height * 0.61));
	loader->setScale(0.5, 0.5);
	addChild(loader, 1);


	std::string animationcsb;


	if (_sceneNumber == 1) {animationcsb = "balloonhero/firefly.csb";}
	if (_sceneNumber == 2) { animationcsb = "balloonfarm/balloon.csb"; }
	if (_sceneNumber == 3) { animationcsb = "ballooncandy/fluffyanim.csb"; }

		_fireFly = (cocos2d::Sprite *)CSLoader::createNode(animationcsb);

		
		_fireFly->setAnchorPoint(Vec2(0.5, 0.5));
		_fireFly->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
		//_fireFly->getChildByName("firefly")->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));
		
		_fireFly->setScale(0.5, 0.5);
		_fireFly->setName("firefly");

		if (_sceneNumber == 1) {
			//_fireFly->getChildByName("firefly")->setAnchorPoint(Vec2(0.5, 0.5)); _fireFly->setContentSize(Size(494, 1082));
			_fireFly->setContentSize(_fireFly->getChildByName("box")->getContentSize());
		}
		if (_sceneNumber == 2) {
			_fireFly->setContentSize(_fireFly->getChildByName("touch")->getContentSize());
			//_fireFly->setAnchorPoint(Vec2(0, 0));
			//_fireFly->getChildByName("firefly")->setAnchorPoint(Vec2(0.5, 0.5));
			//_fireFly->setAnchorPoint(Vec2(0, 0.5));
		}
		if (_sceneNumber == 3) { _fireFly->setContentSize(_fireFly->getChildByName("touch")->getContentSize());
		}
		
		
		for (auto const& child : _fireFly->getChildren()) {

			//child->setAnchorPoint(Vec2(0, 0));
			//child->setContentSize(Size(0, 0));
		}
		/*
		DrawNode *_drawNode;
		_drawNode = DrawNode::create();
		addChild(_drawNode);

		_drawNode->clear();
		_drawNode->drawSolidRect(cocos2d::Vec2(_fireFly->getPositionX(), _fireFly->getPositionY()), cocos2d::Vec2(_fireFly->getPositionX() + 50, _fireFly->getPositionY() + 50), Color4F(0, 0, 1, 0.2));

		_drawNode->drawRect(cocos2d::Vec2(_fireFly->getPositionX(), _fireFly->getPositionY()), cocos2d::Vec2(_fireFly->getPositionX() + 50, _fireFly->getPositionY() + 50), Color4F::BLUE);
		auto bb = _fireFly->getBoundingBox();
		//_fireFly->setContentSize(Size( _fireFly->getPositionX() + 20, _fireFly->getPositionY() + 20 ));
		*/
		if (_sceneNumber == 3) {
			//_fireFly->setContentSize(Size(200,200));
			_fireFly->setScale(1, 1);
			//_fireFly->getChildByName("firefly")->setContentSize(Size(50, 50));
			//_fireFly->setAnchorPoint(Vec2(0, 0));
			//_fireFly->setAnchorPoint(Vec2(0, 0));

			

		}

		//_fireFly->setContentSize(_fireFly->getChildByName("Sprite")->getContentSize());
		this->addChild(_fireFly, 1);
	
		Vector <Node*> children = _fireFly->getChildren();
		int size = children.size();
		for (auto item = children.rbegin(); item != children.rend(); ++item) {
			Node * monsterItem = *item;
			std::string str = monsterItem->getName().c_str();
			CCLOG("name : %s", str.c_str());
		}


	setupTouch();
	

	std::string animationTimeline;


	if (_sceneNumber == 1) {
		animationTimeline = "balloonhero/firefly.csb";
	}
	if (_sceneNumber == 2) { animationTimeline = "balloonfarm/balloon.csb"; }
	if (_sceneNumber == 3) { animationTimeline = "ballooncandy/fluffyanim.csb"; }


		_fireTimeline = CSLoader::createTimeline(animationTimeline);
		_fireFly->runAction(_fireTimeline);
		_fireTimeline->play("fly", true);

//////help
		if (_menuContext->getCurrentLevel() == 1) {

			auto box1 = _fireFly;
			//auto box2 = _fireFly;


			auto box1pos = box1->getPosition();// +Vec2(visibleSize.width * 0.03, visibleSize.height * 0.05);
			//auto box2pos = box2->getPosition();// +Vec2(visibleSize.width * 0.03, visibleSize.height * 0.05);ya


			//_help = HelpLayer::create(Rect(box1pos.x, box1pos.y, box1->getContentSize().width, box1->getContentSize().height), Rect(0,0,0,0));
			
			auto x = visibleSize.width;
			auto y = visibleSize.height;

			//_help = HelpLayer::create(Rect(visibleSize.width/2, visibleSize.height / 2, 500, 550), Rect(400, 0, 400, 4500));

			//_help->clickAndDrag(Vec2(box1pos), Vec2(400, 1200));

			_help = HelpLayer::create(Rect(visibleSize.width/2, visibleSize.height / 2, x* 0.2 , y*0.3), Rect(x*0.15, 0, x*0.15, y*2.5));

			_help->clickAndDrag(Vec2(box1pos), Vec2(x*0.15, y*0.66));


			this->addChild(_help);
		}

		////help


	generateObjectsAndMove();


	addGrid();

	cocos2d::ui::Text * _label;

	//_hint = "Catch the antonyms";
	_label = CommonText::create();
	_label->setFontName("fonts/BalooBhai-Regular.ttf");
	_label->setString(_hint);
	_label->setFontSize(100);
	
	_label->setPosition(Vec2(visibleSize.width/2, visibleSize.height * 0.95));
	_label->setAnchorPoint(Vec2(0.5, 0.5));
	_label->setName("label");
	_label->setTextColor(Color4B::BLUE);
	_label->setColor(Color3B(211, 32, 79));

	this->addChild(_label,20);

	this->scheduleUpdate();
	
}

void BalloonHero::startGame() {

	//_menuContext->showStartupHelp(CC_CALLBACK_0(Memory::dummy, this));
	//	runAction(Sequence::create(CallFunc::create(CC_CALLBACK_0(MenuContext::showStartupHelp,_menuContext)), NULL));

}



void BalloonHero::setupTouch() {

	
	auto listener = EventListenerTouchOneByOne::create();
	
	Sprite * firefly;
	//Node * firefly = _fireFly;
	if (_sceneNumber == 1) {

		firefly = (Sprite *)_fireFly;
	}

	if (_sceneNumber == 2) {

		firefly = (Sprite *)_fireFly;
	}

	if (_sceneNumber == 3) {

		firefly = (Sprite *)_fireFly;// ->getChildByName("touch");
		firefly->setVisible(true);
	}


	//auto firefly = (Sprite *)_fireFly->getChildByName("firefly");
	
	
	listener->onTouchBegan = CC_CALLBACK_2(BalloonHero::onTouchBegan, this);
	listener->onTouchEnded = CC_CALLBACK_2(BalloonHero::onTouchEnded, this);
	listener->onTouchMoved = CC_CALLBACK_2(BalloonHero::onTouchMoved, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, firefly);
	

}


bool BalloonHero::onTouchBegan(Touch* touch, Event* event) {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto target = event->getCurrentTarget();
	
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

	auto bb = target->getBoundingBox();
	
	
	std::string character;

	if (_sceneNumber == 1) {
		
		character = "firefly";
		bb = target->getBoundingBox();
		locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

	}
	if (_sceneNumber == 2) {

		character = "firefly";
		bb = target->getBoundingBox();
		locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

		//bb = target->getBoundingBox();
		//locationInNode = target->convertToNodeSpace(touch->getLocation());

	}
	if (_sceneNumber == 3) {

		/*character = "firefly";
		bb = target->getBoundingBox();
		locationInNode = target->convertToNodeSpace(touch->getLocation());*/

		//character = "firefly";
		bb = target->getBoundingBox();
		locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

	}
	
	
	if (bb.containsPoint(locationInNode))
	{
		CCLOG("touched me");
		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void BalloonHero::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchEnded");

	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());


}



void BalloonHero::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	//    CCLOG("onTouchMoved");

	auto target = event->getCurrentTarget();
	
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	
	

	if (_sceneNumber == 1) {
		if ((touch->getLocation().x > (visibleSize.width * 0.003) && touch->getLocation().x < visibleSize.width - (visibleSize.width * 0.01)) && (touch->getLocation().y >(visibleSize.height * 0.005) && touch->getLocation().y < visibleSize.height - (visibleSize.height * 0.005))) {
			target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
			// to indicate that we have consumed it.
		}
	}

	if (_sceneNumber == 2) {
		if ((touch->getLocation().x > (visibleSize.width * 0.007) && touch->getLocation().x < visibleSize.width - (visibleSize.width * 0.007)) && (touch->getLocation().y > (visibleSize.height * 0.01) && touch->getLocation().y < visibleSize.height - (visibleSize.height * 0.01))) {
			target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
			// to indicate that we have consumed it.
		}
	}
	if (_sceneNumber == 3) {
		if ((touch->getLocation().x >(visibleSize.width * 0.007) && touch->getLocation().x < visibleSize.width - (visibleSize.width * 0.007)) && (touch->getLocation().y >(visibleSize.height * 0.01) && touch->getLocation().y < visibleSize.height - (visibleSize.height * 0.01))) {
			target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
			// to indicate that we have consumed it.
		}
	}
		
}


void BalloonHero::generateObjectsAndMove() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::vector<int> durations = {3,4,5,6};
	std::vector<float> startPosX = { 400,1000,1600,2200 };
	std::vector<float> startPosY = { 1600,1700,1800,1900 };
	

	std::vector<float> endPosX = { 400,1000,1600,2200 };
	std::vector<float> endPosY = { -300,-300,-300,-300 };


	if (_sceneNumber == 1) {
		_objects = { "balloonhero/safe.png","balloonhero/safe.png" ,"balloonhero/cloud2.png", "balloonhero/meteor.png" , "balloonhero/cloud4.png" ,"balloonhero/safe.png" };
	}
	if (_sceneNumber == 2) {
		_objects = { "balloonfarm/wordballoon.png","balloonfarm/wordballoon.png" ,"balloonfarm/cloud1.png", "balloonfarm/wrongballoon.png" , "balloonfarm/cloud2.png" ,"balloonfarm/wordballoon.png" };
	}
	if (_sceneNumber == 3) {
		_objects = { "ballooncandy/balloon1.png","ballooncandy/balloon1.png" ,"ballooncandy/cloud1.png", "ballooncandy/candyblast1.png" , "ballooncandy/cloud2.png" ,"ballooncandy/balloon1.png" };
	}

	
	std::string obj1, obj2, obj3, obj4;

	if (_sceneNumber == 1) {
		obj1 = "balloonhero/cloud1.png";
		obj2 = "balloonhero/cloud2.png";
		obj3 = "balloonhero/cloud3.png";
		obj4 = "balloonhero/cloud4.png";
	}
	if (_sceneNumber == 2) {
		obj1 = "balloonfarm/cloud1.png";
		obj2 = "balloonfarm/cloud2.png";
		obj3 = "balloonfarm/cloud1.png";
		obj4 = "balloonfarm/cloud2.png";
	}
	if (_sceneNumber == 3) {
		obj1 = "ballooncandy/cloud1.png";
		obj2 = "ballooncandy/cloud2.png";
		obj3 = "ballooncandy/cloud1.png";
		obj4 = "ballooncandy/cloud2.png";
	}
	
	_cloud1 = Sprite::createWithSpriteFrameName(obj1);
	_cloud1->setPosition(400, 1600);
	_cloud1->setScale(0.9, 0.9);
	_cloud1->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud1);


	_cloud2 = Sprite::createWithSpriteFrameName(obj2);
	_cloud2->setPosition(1000, 1700);
	_cloud2->setScale(0.9, 0.9);
	_cloud2->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud2);


	_cloud3 = Sprite::createWithSpriteFrameName(obj3);
	_cloud3->setPosition(1600, 1800);
	_cloud3->setScale(0.9, 0.9);
	_cloud3->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud3);


	_cloud4 = Sprite::createWithSpriteFrameName(obj4);
	_cloud4->setPosition(2200, 1900);
	_cloud4->setScale(0.9, 0.9);
	_cloud4->setAnchorPoint(Vec2(0.5, 0.5));
	this->addChild(_cloud4);



	auto moveCloud1 = MoveTo::create(4, Vec2(400, -300));
	auto moveCloud2 = MoveTo::create(5, Vec2(1000, -300));
	auto moveCloud3 = MoveTo::create(4, Vec2(1600, -300));
	auto moveCloud4 = MoveTo::create(6, Vec2(2200, -300));


	auto refixCloud1 = CallFunc::create([=] {
		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud1->removeAllChildren();
		_cloud1->setVisible(true);
		_flag1 = true;
		fuelMeterMinus();
		_cloud1->setName("a");
		if (numberPicker == 3) {

			_cloud1->setName("m");
			_cloud1->setTag(1);
			
		}
		if (numberPicker == 5 || numberPicker == 1 || numberPicker == 0) {
			

			int nounPicker = RandomHelper::random_int(0, 9);
			int otherPicker = RandomHelper::random_int(0, 9);

			auto label = CommonText::create();
			if (numberPicker == 5 || numberPicker == 1) {
				label->setString(_set1[nounPicker]);
				_cloud1->setName("balloon");
			}
			if (numberPicker == 0) {
				label->setString(_set2[otherPicker]);
				_cloud1->setName("m");
				_cloud1->setTag(2);
			}
			label->setFontSize(_labelFontSize);
			label->setFontName("fonts/BalooBhai-Regular.ttf");
			

			if (_sceneNumber == 1) {
				label->setPosition(Vec2(visibleSize.width * 0.079, visibleSize.height * 0.05));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::ORANGE);
				label->setScaleX(0.5);
			}
			
			if (_sceneNumber == 2) {
				label->setPosition(Vec2(visibleSize.width * 0.12, visibleSize.height * 0.07));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}
			
			if (_sceneNumber == 3) { 
				label->setPosition(Vec2(visibleSize.width * 0.07, visibleSize.height * 0.4));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}
			
			
			_cloud1->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(_objects[numberPicker]);
		
		_cloud1->setSpriteFrame(textureA);
		_cloud1->setPosition(400, 1600);

	});

	auto refixCloud2 = CallFunc::create([=] {

		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud2->removeAllChildren();
		_cloud2->setVisible(true);
		_flag2 = true;
		fuelMeterMinus();
		_cloud2->setName("a");
		if (numberPicker == 3) {

			_cloud2->setName("m");
			_cloud1->setTag(1);

		}

		if (numberPicker == 5 || numberPicker == 1 || numberPicker == 0) {
			
			int nounPicker = RandomHelper::random_int(0, 9);
			int otherPicker = RandomHelper::random_int(0, 9);

			auto label = CommonText::create();
			if (numberPicker == 5 || numberPicker == 1) {
				label->setString(_set1[nounPicker]);
				_cloud2->setName("balloon");
			}
			if (numberPicker == 0) {
				label->setString(_set2[otherPicker]);
				_cloud2->setName("m");
				_cloud1->setTag(2);
			}
			label->setFontSize(_labelFontSize);
			label->setFontName("fonts/BalooBhai-Regular.ttf");


			if (_sceneNumber == 1) {
				label->setPosition(Vec2(visibleSize.width * 0.079, visibleSize.height * 0.05));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::ORANGE);
				label->setScaleX(0.5);
			}

			if (_sceneNumber == 2) {
				label->setPosition(Vec2(visibleSize.width * 0.12, visibleSize.height * 0.07));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}


			if (_sceneNumber == 3) {
				label->setPosition(Vec2(visibleSize.width * 0.07, visibleSize.height * 0.4));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}
			_cloud2->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(_objects[numberPicker]);

		_cloud2->setSpriteFrame(textureA);

		_cloud2->setPosition(1000, 1700);

	});

	auto refixCloud3 = CallFunc::create([=] {

		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud3->removeAllChildren();
		_cloud3->setVisible(true);
		_flag3 = true;

		fuelMeterMinus();
		_cloud3->setName("a");
		if (numberPicker == 3) {

			_cloud3->setName("m");
			_cloud1->setTag(1);

		}

		if (numberPicker == 5 || numberPicker == 1 || numberPicker == 0) {
			int nounPicker = RandomHelper::random_int(0, 9);
			int otherPicker = RandomHelper::random_int(0, 9);

            auto label = CommonText::create();
			if (numberPicker == 5 || numberPicker == 1) {
				label->setString(_set1[nounPicker]);
				_cloud3->setName("balloon");
			}
			if (numberPicker == 0) {
				label->setString(_set2[otherPicker]);
				_cloud3->setName("m");
				_cloud1->setTag(2);
			}
			label->setFontSize(_labelFontSize);
			label->setFontName("fonts/BalooBhai-Regular.ttf");

			if (_sceneNumber == 1) {
				label->setPosition(Vec2(visibleSize.width * 0.079, visibleSize.height * 0.05));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::ORANGE);
				label->setScaleX(0.5);
			}

			if (_sceneNumber == 2) {
				label->setPosition(Vec2(visibleSize.width * 0.12, visibleSize.height * 0.07));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}


			if (_sceneNumber == 3) {
				label->setPosition(Vec2(visibleSize.width * 0.07, visibleSize.height * 0.4));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}
			
			_cloud3->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(_objects[numberPicker]);

		_cloud3->setSpriteFrame(textureA);

		_cloud3->setPosition(1600, 1800);

	});

	auto refixCloud4 = CallFunc::create([=] {

		int numberPicker = RandomHelper::random_int(0, 5);
		//cloud1->setSpriteFrame();
		_cloud4->removeAllChildren();
		_cloud4->setVisible(true);
		_flag4 = true;

		fuelMeterMinus();

		_cloud4->setName("a");
		if (numberPicker == 3) {

			_cloud4->setName("m");
			_cloud1->setTag(1);

		}


		if (numberPicker == 5 || numberPicker == 1 || numberPicker == 0) {
			
			int nounPicker = RandomHelper::random_int(0, 9);
			int otherPicker = RandomHelper::random_int(0, 9);

			auto label = CommonText::create();
			if (numberPicker == 5 || numberPicker == 1) {
				label->setString(_set1[nounPicker]);
				_cloud4->setName("balloon");
			}
			if (numberPicker == 0) {
				label->setString(_set2[otherPicker]);
				_cloud4->setName("m");
				_cloud1->setTag(2);
			}
			label->setFontSize(_labelFontSize);
			label->setFontName("fonts/BalooBhai-Regular.ttf");

			if (_sceneNumber == 1) {
				label->setPosition(Vec2(visibleSize.width * 0.079, visibleSize.height * 0.05));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::ORANGE);
				label->setScaleX(0.5);
			}

			if (_sceneNumber == 2) {
				label->setPosition(Vec2(visibleSize.width * 0.12, visibleSize.height * 0.07));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}

			if (_sceneNumber == 3) {
				label->setPosition(Vec2(visibleSize.width * 0.07, visibleSize.height * 0.4));
				label->setAnchorPoint(Vec2(0.5, 0.5));
				label->setTextColor(Color4B::BLUE);
				label->setScaleX(0.5);
			}
			
			_cloud4->addChild(label);

		}
		auto textureA = SpriteFrameCache::getInstance()->getSpriteFrameByName(_objects[numberPicker]);

		_cloud4->setSpriteFrame(textureA);

		_cloud4->setPosition(2200, 1900);

	});

	auto tweenSequence1 = Sequence::create(moveCloud1, refixCloud1, NULL);

	auto repeat1 = RepeatForever::create(tweenSequence1);

	_cloud1->runAction(repeat1);


	auto tweenSequence2 = Sequence::create(moveCloud2, refixCloud2, NULL);

	auto repeat2 = RepeatForever::create(tweenSequence2);

	_cloud2->runAction(repeat2);

	auto tweenSequence3 = Sequence::create(moveCloud3, refixCloud3, NULL);

	auto repeat3 = RepeatForever::create(tweenSequence3);

	_cloud3->runAction(repeat3);

	auto tweenSequence4 = Sequence::create(moveCloud4, refixCloud4, NULL);

	auto repeat4 = RepeatForever::create(tweenSequence4);

	_cloud4->runAction(repeat4);


}


void BalloonHero::update(float delta) {

	if (_fuelBar->getPercent() <= 0) {
		_menuContext->showScore();
	}

	auto _fireflyBB = _fireFly->getBoundingBox();
	auto _cloud1BB = _cloud1->getBoundingBox();
	auto _cloud2BB = _cloud2->getBoundingBox();
	auto _cloud3BB = _cloud3->getBoundingBox();
	auto _cloud4BB = _cloud4->getBoundingBox();


	std::string burst;
	float scalex = 0.9, scaley = 0.9;
	if (_sceneNumber == 1) {
		burst = "balloonhero/meteor.csb";
	}
	if (_sceneNumber == 2) {
		burst = "balloonfarm/wrongballoon.csb";
		//scalex = 0.7, scaley = 0.7;
	}
	if (_sceneNumber == 3) {
		burst = "ballooncandy/meteor.csb";
	}
	auto helpflag = 0;
	if (_fireflyBB.intersectsRect(_cloud1BB) && helpflag == 0) {

		helpflag = 1;
		if (_menuContext->getCurrentLevel() == 1) {
		
			this->removeChild(_help);
		}
	}

	if (_fireflyBB.intersectsRect(_cloud1BB) && _cloud1->getName() == "m" && _flag1) {
		_flag1 = false;
		fuelMeterMinus();
		_menuContext->addPoints(-1);
		_cloud1->setVisible(false);

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/baloonhero/blast.mp3", false);

		if (_cloud1->getTag() == 1) {

			_meteor1 = (cocos2d::Node *)CSLoader::createNode(burst);
			float x = _cloud1->getPositionX();
			float y = _cloud1->getPositionY();
			_meteor1->setPosition(Vec2(x, y));
			_meteor1->setAnchorPoint(Vec2(0.5, 0.5));
			_meteor1->setScale(scalex, scaley);
			this->addChild(_meteor1, 4);

			auto  _Timeline = CSLoader::createTimeline(burst);
			_meteor1->runAction(_Timeline);
			_Timeline->play("blast", false);

			_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor1Animation, this));
		}

		//auto rotateFirefly = RotateBy::create(1, 360);
		//_fireFly->runAction(rotateFirefly);
		if (_sceneNumber == 1) { _fireTimeline->play("wrong", false); }
		if (_sceneNumber == 2) { _fireTimeline->play("shock", false); }
		if (_sceneNumber == 3) { _fireTimeline->play("sad", false); }


		

		

		

	}
	
	if (_fireflyBB.intersectsRect(_cloud2BB) && _cloud2->getName() == "m" && _flag2) {
		
		_flag2 = false;
		fuelMeterMinus();
		_menuContext->addPoints(-1);
		_cloud2->setVisible(false);
		
		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/baloonhero/blast.mp3", false);

		if (_cloud2->getTag() == 1) {

			_meteor2 = (cocos2d::Node *)CSLoader::createNode(burst);
			float x = _cloud2->getPositionX();
			float y = _cloud2->getPositionY();
			_meteor2->setPosition(Vec2(x, y));
			_meteor2->setAnchorPoint(Vec2(0.5, 0.5));
			_meteor2->setScale(scalex, scaley);
			this->addChild(_meteor2, 4);

			auto  _Timeline = CSLoader::createTimeline(burst);
			_meteor2->runAction(_Timeline);
			_Timeline->play("blast", false);

			_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor2Animation, this));
		}

		
		


		//auto rotateFirefly = RotateBy::create(1, 360);
		//_fireFly->runAction(rotateFirefly);
		if (_sceneNumber == 1) { _fireTimeline->play("wrong", false); }
		if (_sceneNumber == 2) { _fireTimeline->play("shock", false); }
		if (_sceneNumber == 3) { _fireTimeline->play("sad", false); }


		

		
	}
	if (_fireflyBB.intersectsRect(_cloud3BB) && _cloud3->getName() == "m" && _flag3) {
		_flag3 = false;
		
		fuelMeterMinus();
		_menuContext->addPoints(-1);
		_cloud3->setVisible(false);

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/baloonhero/blast.mp3", false);
		

		if (_cloud3->getTag() == 1) {

			_meteor3 = (cocos2d::Node *)CSLoader::createNode(burst);
			float x = _cloud3->getPositionX();
			float y = _cloud3->getPositionY();
			_meteor3->setPosition(Vec2(x, y));
			_meteor3->setAnchorPoint(Vec2(0.5, 0.5));
			_meteor3->setScale(scalex, scaley);
			this->addChild(_meteor3, 4);

			auto  _Timeline = CSLoader::createTimeline(burst);
			_meteor3->runAction(_Timeline);
			_Timeline->play("blast", false);

			_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor3Animation, this));
		}
	

		//auto rotateFirefly = RotateBy::create(1, 360);
		//_fireFly->runAction(rotateFirefly);
		if (_sceneNumber == 1) { _fireTimeline->play("wrong", false); }
		if (_sceneNumber == 2) { _fireTimeline->play("shock", false); }
		if (_sceneNumber == 3) { _fireTimeline->play("sad", false); }


		

		
	}
	if (_fireflyBB.intersectsRect(_cloud4BB) && _cloud4->getName() == "m" && _flag4) {
		
		_flag4 = false;
		fuelMeterMinus();
		_menuContext->addPoints(-1);
		_cloud4->setVisible(false);

		auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		audio->playEffect("sounds/baloonhero/blast.mp3", false);

		if (_cloud4->getTag() == 1) {

			_meteor4 = (cocos2d::Node *)CSLoader::createNode(burst);
			float x = _cloud4->getPositionX();
			float y = _cloud4->getPositionY();
			_meteor4->setPosition(Vec2(x, y));
			_meteor4->setAnchorPoint(Vec2(0.5, 0.5));
			_meteor4->setScale(scalex, scaley);
			this->addChild(_meteor4, 4);

			auto  _Timeline = CSLoader::createTimeline(burst);
			_meteor4->runAction(_Timeline);
			_Timeline->play("blast", false);

			_Timeline->setAnimationEndCallFunc("blast", CC_CALLBACK_0(BalloonHero::removeMeteor4Animation, this));

		}

		//auto rotateFirefly = RotateBy::create(1, 360);
		//_fireFly->runAction(sad);
		if (_sceneNumber == 1) { _fireTimeline->play("wrong", false); }
		if (_sceneNumber == 2) { _fireTimeline->play("shock", false); }
		if (_sceneNumber == 3) { _fireTimeline->play("sad", false); }


	
		
	}
	


	if (_fireflyBB.intersectsRect(_cloud1BB) && _cloud1->getName() == "balloon" && _flagCorrect1) {
		fuelMeterPlus();
		_menuContext->addPoints(1);
		_cloud1->setVisible(false);


		//auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		//audio->playEffect("sounds/baloonhero/pop_balloon.mp3", false);

		auto turnOffscoreAdd = CallFunc::create([=] {_flagCorrect1 = false; });
		auto turnOnscoreAdd = CallFunc::create([=] {_flagCorrect1 = true; });

		auto scoreSequence = Sequence::create(turnOffscoreAdd, DelayTime::create(0.5), turnOnscoreAdd, NULL);
		this->runAction(scoreSequence);
	}
	

	if (_fireflyBB.intersectsRect(_cloud2BB) && _cloud2->getName() == "balloon" && _flagCorrect2) {
		fuelMeterPlus();
		_menuContext->addPoints(1);
		_cloud2->setVisible(false);

		//auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		//audio->playEffect("sounds/baloonhero/pop_balloon.mp3", false);

		auto turnOffscoreAdd = CallFunc::create([=] {_flagCorrect2 = false; });
		auto turnOnscoreAdd = CallFunc::create([=] {_flagCorrect2 = true; });

		auto scoreSequence = Sequence::create(turnOffscoreAdd, DelayTime::create(0.5), turnOnscoreAdd, NULL);
		this->runAction(scoreSequence);
	}

	if (_fireflyBB.intersectsRect(_cloud3BB) && _cloud3->getName() == "balloon" && _flagCorrect3) {
		fuelMeterPlus();
		_menuContext->addPoints(1);
		_cloud3->setVisible(false);

		//auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		//audio->playEffect("sounds/baloonhero/pop_balloon.mp3", false);

		auto turnOffscoreAdd = CallFunc::create([=] {_flagCorrect3 = false; });
		auto turnOnscoreAdd = CallFunc::create([=] {_flagCorrect3 = true; });

		auto scoreSequence = Sequence::create(turnOffscoreAdd, DelayTime::create(0.5), turnOnscoreAdd, NULL);
		this->runAction(scoreSequence);
	}

	if (_fireflyBB.intersectsRect(_cloud4BB) && _cloud4->getName() == "balloon" && _flagCorrect4) {
		fuelMeterPlus();
		_menuContext->addPoints(1);
		_cloud4->setVisible(false);

		//auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
		//audio->playEffect("sounds/baloonhero/pop_balloon.mp3", false);

		auto turnOffscoreAdd = CallFunc::create([=] {_flagCorrect4 = false; });
		auto turnOnscoreAdd = CallFunc::create([=] {_flagCorrect4 = true; });

		auto scoreSequence = Sequence::create(turnOffscoreAdd, DelayTime::create(0.5), turnOnscoreAdd, NULL);
		this->runAction(scoreSequence);
	}
}


void BalloonHero::generateRandomNumbers() {
/*
	int a = 4;
	//std::vector<int> randomIndex;
	_randomIndex.clear();
	while (_randomIndex.size() != 4) {
		bool duplicateCheck = true;
		int numberPicker = RandomHelper::random_int(0, 3);
		for (int i = 0; i < _randomIndex.size(); i++) {
			if (numberPicker == _randomIndex[i]) {
				duplicateCheck = false;
			}
		}
		if (duplicateCheck) {
			_randomIndex.push_back(numberPicker);
		}
	}
	*/
}

void BalloonHero::removeMeteor1Animation() {
	this->removeChild(_meteor1);
	//_flag1 = true;
	//_cloud1->setPosition(400, -300);
	//_cloud1->setVisible(true);
}

void BalloonHero::removeMeteor2Animation() {
	this->removeChild(_meteor2);
	//_flag2 = true;
	//_cloud2->setPosition(1000, -300);
	//_cloud2->setVisible(true);
}

void BalloonHero::removeMeteor3Animation() {
	this->removeChild(_meteor3);
	//_flag3 = true;
	//_cloud3->setPosition(1600, -300);
	//_cloud3->setVisible(true);
}

void BalloonHero::removeMeteor4Animation() {
	this->removeChild(_meteor4);
	//_flag4 = true;
	//_cloud4->setPosition(2200, -300);
	//_cloud4->setVisible(true);
}

void BalloonHero::fuelMeterMinus()
{
	
	_fuelBar->setPercent(_fuelBar->getPercent() - 0.8);
}

void BalloonHero::fuelMeterPlus()
{
	
	_fuelBar->setPercent(_fuelBar->getPercent() + 0.1);
}

void BalloonHero::addGrid() {

	auto gridPanel = Sprite::create();
	gridPanel->setTextureRect(Rect(0, 0, Director::getInstance()->getVisibleSize().width/2, Director::getInstance()->getVisibleSize().height* 0.15));
	gridPanel->setColor(Color3B(41, 158, 170));
	gridPanel->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.95));
	gridPanel->setOpacity(60);
	gridPanel->setName("gridpanel");
	addChild(gridPanel, 18);

}
