//
//  LipiTKProcessTask.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include <stdio.h>
#include "unistd.h"
#include "AsyncTask.hpp"
#include "LipiTKProcessTask.h"
#include "LipiTKNode.h"

USING_NS_CC;


LipiTKProcessTask::LipiTKProcessTask(LipiTKInterface* lipiTKInterface, std::vector<Stroke*> strokes, LipiTKNode* node) {
    _bIsFinished = false;
    _lipiTKInterface = lipiTKInterface;
    _strokes = strokes;
    _node = node;
}

LipiTKProcessTask::~LipiTKProcessTask() {
    
}

void LipiTKProcessTask::onPreExecute() {
    printf("Eric onPreExecute\n");
}

void LipiTKProcessTask::doInBackground() {
    printf("Eric doing Background Start\n");
    
    _results = _lipiTKInterface->recognizeLipiTK(_strokes);
    printf("Eric doing Background End\n");
    _bIsFinished =  true;
   
}


bool LipiTKProcessTask::isFinished() {
    return _bIsFinished;
}


void LipiTKProcessTask::onPostExecute() {
    CCLOG("Eric onPostExecute with result: %lu", _results.size());
    
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
    
    _node->displayRecognizedChars(_recognizedCharacters);
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
