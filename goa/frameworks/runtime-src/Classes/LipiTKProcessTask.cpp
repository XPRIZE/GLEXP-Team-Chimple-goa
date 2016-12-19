//
//  LipiTKProcessTask.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include <cctype>
#include <stdio.h>
#include "AsyncTask.hpp"
#include "LipiTKProcessTask.h"
#include "LipiTKNode.h"
#include "menu/MenuContext.h"

#include "storage/local-storage/LocalStorage.h"

USING_NS_CC;

static const std::string CURRENT_LEVEL = ".currentLevel";
static const std::string NUMERIC_WRITING = ".numeric";
static const std::string UPPER_ALPHABET_WRITING = ".upper";
static const std::string LOWER_ALPHABET_WRITING = ".lower";


LipiTKProcessTask::LipiTKProcessTask(LipiTKInterface* lipiTKInterface, std::vector<Stroke*> strokes, LipiTKNode* node) {
    _bIsFinished = false;
    _lipiTKInterface = lipiTKInterface;
    _strokes = strokes;
    _node = node;
}

LipiTKProcessTask::~LipiTKProcessTask() {
    
}

void LipiTKProcessTask::onPreExecute() {
    printf("onPreExecute\n");
}

void LipiTKProcessTask::doInBackground() {
    printf("doing Background Start\n");
    
    _results = _lipiTKInterface->recognizeLipiTK(_strokes);
    printf("doing Background End\n");
    _bIsFinished =  true;
   
}


bool LipiTKProcessTask::isFinished() {
    return _bIsFinished;
}


void LipiTKProcessTask::onPostExecute() {
    CCLOG("onPostExecute with result: %lu", _results.size());
    if(!_results.empty() && _results.size() > 0) {
        sort( _results.begin( ), _results.end( ), [ ]( LipiTKResult* lhs, LipiTKResult* rhs )
             {
                 return lhs->getConfidence() > rhs->getConfidence();
             });
        
        for (std::vector<LipiTKResult* >::iterator it = _results.begin() ; it != _results.end(); ++it)
        {
            LipiTKResult* res = *it;
            std::string shapeAlphabet = decodeSymbol(res->getShapeId());
            CCLOG("shapeAlphabet putting into _recognizedCharacters %s", shapeAlphabet.c_str());
            _recognizedCharacters.push_back(shapeAlphabet);
        }
        
        
        std::string gameName;
        localStorageGetItem("currentGame", &gameName);
        
        std::string currentLevelStr;
        localStorageGetItem(gameName + CURRENT_LEVEL, &currentLevelStr);
        int _currentLevel = 1;
        if(!currentLevelStr.empty()) {
            _currentLevel = std::atoi( currentLevelStr.c_str());
        }
        
        
        std::string isNumeric;
        localStorageGetItem(gameName + MenuContext::to_string(_currentLevel) + NUMERIC_WRITING, &isNumeric);
        
        std::string isUpperAlphabet;
        localStorageGetItem(gameName + MenuContext::to_string(_currentLevel) + UPPER_ALPHABET_WRITING, &isUpperAlphabet);

        
        std::vector<std::string> _recognizedChars;
        
        if(!isNumeric.empty()) {
            for (std::vector<std::string>::iterator itStr = _recognizedCharacters.begin() ; itStr != _recognizedCharacters.end(); ++itStr)
            {
                std::string res = *itStr;
                bool has_only_digits = (res.find_first_not_of("0123456789" ) == string::npos);
                if(has_only_digits) {
                    _recognizedChars.push_back(res);
                }
            }
            
            Director::getInstance()->getScheduler()->performFunctionInCocosThread(CC_CALLBACK_0(LipiTKNode::broadCastRecognizedChars, _node, _recognizedChars));
            
            
        } else if(!isUpperAlphabet.empty()) {
            for (std::vector<std::string>::iterator itStr = _recognizedCharacters.begin() ; itStr != _recognizedCharacters.end(); ++itStr)
            {
                std::string res = *itStr;
                bool has_only_digits = (res.find_first_not_of("0123456789") == string::npos);
                if(!has_only_digits && std::isalpha(res[0])) {
                    if (isUpperAlphabet.compare("true") == 0 && std::isupper(res[0])) {
                        _recognizedChars.push_back(res);
                    } else if(isUpperAlphabet.compare("false") == 0 && !std::isupper(res[0])) {
                        _recognizedChars.push_back(res);
                    }
                }
            }
            Director::getInstance()->getScheduler()->performFunctionInCocosThread(CC_CALLBACK_0(LipiTKNode::broadCastRecognizedChars, _node, _recognizedChars));
            
        } else {
            Director::getInstance()->getScheduler()->performFunctionInCocosThread(CC_CALLBACK_0(LipiTKNode::broadCastRecognizedChars, _node, _recognizedCharacters));

        }
        
    }
    
}


std::vector<std::string> LipiTKProcessTask::getRecognizedCharacters() {
    return _recognizedCharacters;
}

std::string LipiTKProcessTask::decodeSymbol(int shapeId) {
    std::string result = "";
    std::map<std::string,std::string>::iterator mapIt;
    auto englishMap = _lipiTKInterface->getEnglishUnicodeMapping();
    stringstream ss;
    ss << shapeId;
    string str = ss.str();
    mapIt = englishMap.find(str);
    
    if (mapIt != englishMap.end()) {
        result = mapIt->second;
        CCLOG("shapeAlphabet %s", result.c_str());
    }
    
    return result;
}
