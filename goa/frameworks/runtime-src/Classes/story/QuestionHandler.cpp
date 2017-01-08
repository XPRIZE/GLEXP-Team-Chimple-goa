//
//  QuestionHandler.cpp
//  goa
//
//  Created by Srikanth Talapadi on 07/01/2017.
//
//

#include "QuestionHandler.h"
#include "storage/local-storage/LocalStorage.h"
#include "MultipleChoice.hpp"
#include "FillInTheBlanks.hpp"
#include "Meaning.hpp"
#include "Picture.hpp"
#include "ui/CocosGUI.h"

USING_NS_CC;
using namespace cocos2d::ui;

const std::string STORY_JSON = ".storyJSON";
const std::string QuestionHandler::FONT_NAME = "fonts/Roboto-Regular.ttf";
const int QuestionHandler::FONT_SIZE = 85;
const Color3B QuestionHandler::FONT_COLOR = Color3B::BLACK;
const Color3B QuestionHandler::FONT_HIGHLIGHT_COLOR = Color3B::BLUE;

cocos2d::Scene *QuestionHandler::createScene(std::string storyId) {
    auto layer = QuestionHandler::create(storyId);
    auto scene = Scene::create();
    scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, storyId);
    scene->addChild(layer->_menuContext);
    return scene;
}

QuestionHandler *QuestionHandler::create(std::string storyId) {
    QuestionHandler* lhs = new (std::nothrow) QuestionHandler();
    if(lhs && lhs->initWithStoryId(storyId))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
    
}

void QuestionHandler::onEnterTransitionDidFinish() {
    gotoNextQuestion(0);
}

void QuestionHandler::gotoNextQuestion(int score) {
    if(++_currentQuestion < _questions.size()) {
        if(_currentQuestionNode != nullptr) {
            removeChild(_currentQuestionNode);
        }
        if(_questions[_currentQuestion][0] == "multiple_choice") {
            _currentQuestionNode = MultipleChoice::create(this, _questions[_currentQuestion]);
            addChild(_currentQuestionNode);
        } else if(_questions[_currentQuestion][0] == "fill_in_the_blanks") {
            _currentQuestionNode = FillInTheBlanks::create(this, _questions[_currentQuestion]);
            addChild(_currentQuestionNode);
        } else if(_questions[_currentQuestion][0] == "meanings") {
                _currentQuestionNode = Meaning::create(this, _questions[_currentQuestion]);
                addChild(_currentQuestionNode);
        } else if(_questions[_currentQuestion][0] == "picture") {
            _currentQuestionNode = Picture::create(this, _questions[_currentQuestion]);
            addChild(_currentQuestionNode);
        } else {
            _menuContext->showScore();
        }
    } else {
        _menuContext->showScore();
    }
}

QuestionHandler::QuestionHandler() :
_currentQuestion(-1)
{
    
}

QuestionHandler::~QuestionHandler() {
    
}

bool QuestionHandler::init() {
    return true;
}

std::string QuestionHandler::getBaseDir() {
    return _baseDir;
}

bool QuestionHandler::initWithStoryId(std::string storyId) {
    rapidjson::Document d;
    std::string data;
    localStorageGetItem(STORY_JSON, &data);
    
    CCLOG("data received %s", data.c_str());
    this->_storyInformation = data;
    if (false == d.Parse<0>(_storyInformation.c_str()).HasParseError()) {
        // document is ok
        // get Content page
        std::string coverPage = d["coverPage"].GetString();
        std::vector<std::string> coverPageInfo = _menuContext->split(coverPage, '/');
        if(coverPageInfo.size() > 0) {
            _baseDir = coverPageInfo.at(0);
        }
    }
    std::string questionsJson = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + ".questions.json";
    if(FileUtils::getInstance()->isFileExist(questionsJson)) {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(questionsJson);
        rapidjson::Document qDoc;
        if (false == qDoc.Parse<0>(jsonData.c_str()).HasParseError()) {
            for (rapidjson::Value::ConstMemberIterator itr = qDoc.MemberBegin();
                 itr != qDoc.MemberEnd(); ++itr) {
                if(itr->name == "fill_in_the_blanks") {
                    const rapidjson::Value& f = itr->value;
                    assert(f.IsArray());
                    for (rapidjson::SizeType i = 0; i < f.Size(); i++) {
                        const rapidjson::Value& q = f[i];
                        if(q.HasMember("answer") && q.HasMember("choices") && q.HasMember("question")) {
                            std::vector<std::string> eachQ;
                            eachQ.push_back("fill_in_the_blanks");
                            eachQ.push_back(q["question"].GetString());
                            eachQ.push_back(q["answer"].GetString());
                            const rapidjson::Value& choicesVal = q["choices"];
                            assert(choicesVal.IsArray());
                            for (rapidjson::SizeType choicesValIndex = 0; choicesValIndex < choicesVal.Size(); choicesValIndex++) {
                                eachQ.push_back(choicesVal[choicesValIndex].GetString());
                            }
                            _questions.push_back(eachQ);
                        }
                    }
                } else if(itr->name == "meanings") {
                    const rapidjson::Value& f = itr->value;
                    assert(f.IsArray());
                    for (rapidjson::SizeType i = 0; i < f.Size(); i++) {
                        const rapidjson::Value& q = f[i];
                        std::vector<std::string> eachQ;
                        eachQ.push_back("meanings");
                        for (rapidjson::Value::ConstMemberIterator itr = q.MemberBegin(); itr != q.MemberEnd(); ++itr) {
                            eachQ.push_back(itr->name.GetString());
                            eachQ.push_back(itr->value.GetString());
                        }
                        _questions.push_back(eachQ);
                    }
                } else if(itr->name == "multiple_choice") {
                    const rapidjson::Value& f = itr->value;
                    assert(f.IsArray());
                    for (rapidjson::SizeType i = 0; i < f.Size(); i++) {
                        const rapidjson::Value& q = f[i];
                        if(q.HasMember("answer") && q.HasMember("choices") && q.HasMember("question")) {
                            std::vector<std::string> eachQ;
                            eachQ.push_back("multiple_choice");
                            eachQ.push_back(q["question"].GetString());
                            eachQ.push_back(q["answer"].GetString());
                            const rapidjson::Value& choicesVal = q["choices"];
                            assert(choicesVal.IsArray());
                            for (rapidjson::SizeType choicesValIndex = 0; choicesValIndex < choicesVal.Size(); choicesValIndex++) {
                                eachQ.push_back(choicesVal[choicesValIndex].GetString());
                            }
                            _questions.push_back(eachQ);
                        }
                    }
                } else if(itr->name == "picture") {
                    const rapidjson::Value& f = itr->value;
                    assert(f.IsArray());
                    for (rapidjson::SizeType i = 0; i < f.Size(); i++) {
                        const rapidjson::Value& q = f[i];
                        std::vector<std::string> eachQ;
                        eachQ.push_back("picture");
                        for (rapidjson::Value::ConstMemberIterator itr = q.MemberBegin(); itr != q.MemberEnd(); ++itr) {
                            eachQ.push_back(itr->name.GetString());
                            eachQ.push_back(itr->value.GetString());
                        }
                        _questions.push_back(eachQ);
                    }
                } else if(itr->name == "words") {
                    const rapidjson::Value& f = itr->value;
                    assert(f.IsArray());
                    for (rapidjson::SizeType i = 0; i < f.Size(); i++) {
                        std::vector<std::string> eachQ;
                        eachQ.push_back("words");
                        eachQ.push_back(f[i].GetString());
                        _questions.push_back(eachQ);
                    }
                }
            }
        }
    }
    return true;
    
}

void QuestionHandler::setButtonProperties(Node* button, std::string name, std::string text, const ui::Widget::ccWidgetTouchCallback& callback) {
    auto button1 = static_cast<Button*> (button);
    if(button1) {
        button1->setTitleText(text);
        button1->setName(name);
        button1->setTitleFontName(QuestionHandler::FONT_NAME);
        button1->setTitleColor(QuestionHandler::FONT_COLOR);
        button1->setTitleFontSize(72);
        button1->addTouchEventListener(callback);
    }

}


