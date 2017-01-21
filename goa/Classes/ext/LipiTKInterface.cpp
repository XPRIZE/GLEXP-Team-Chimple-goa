//
//  LipiTKInterface.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#include <stdio.h>
#include <string.h>
#include "LipiTKInterface.h"
#include "lipiengine/lipiengine.h"
#include "ext/LTKTrace.h"
#include "cocos2d.h"

USING_NS_CC;

static LipiTKInterface* _singletonLipiTKInterface = nullptr;

LipiTKInterface* LipiTKInterface::getInstance(std::string projectPath) {
    if(!_singletonLipiTKInterface)
    {
        _singletonLipiTKInterface = new (std::nothrow) LipiTKInterface(projectPath);
    }
    return _singletonLipiTKInterface;
    
}


LipiTKInterface::LipiTKInterface(std::string lipiDirectoryPath):
_lipiDirectory(""),
_projectRecognizeStr(""),
_lipiEngine(nullptr),
_lipiShapeReco(nullptr)
{
    _lipiDirectory = lipiDirectoryPath;
     _projectRecognizeStr = SHAPEREC_ALPHANUM;
    initialize();
}

LipiTKInterface::~LipiTKInterface() {
    
}


void LipiTKInterface::initialize() {
    CCLOG("lipitkLocation 0000");
    
    int result;
    CCLOG("lipitkLocation 1111");
#if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
//	auto ssssss = FileUtils::sharedFileUtils()->isFileExistInternal("D:/GLEXP-Team-Chimple/goa/frameworks/runtime-src/proj.win32/Debug.win32/res/largeBrush.png");
	auto sss = FileUtils::sharedFileUtils()->fullPathForFilename("res/largeBrush.png");
	std::string lipitkLocation = sss.substr(0, sss.size() - 15);
//	std::string lipitkLocation = FileUtils::sharedFileUtils()->fullPathForFilename(_lipiDirectory);
//	 lipitkLocation = "D:/GLEXP-Team-Chimple/goa/frameworks/runtime-src/proj.win32/Debug.win32/res";
#else
	std::string lipitkLocation = FileUtils::getInstance()->fullPathForFilename(_lipiDirectory);
	CCLOG("Path = %s", lipitkLocation.c_str());
    
#endif // WIN32

    _lipiEngine = createLTKLipiEngine();
    
    _lipiEngine->setLipiRootPath(lipitkLocation);
    
    result = _lipiEngine->initializeLipiEngine();
    
    if(result != 0) {
        cout << "Error: LipiEngine could not be initialized." << endl;
        return;
    }
    
    result = _lipiEngine->createShapeRecognizer(_projectRecognizeStr, &_lipiShapeReco);
    CCLOG("result createShapeRecognizer %d", result);
    if(result != 0) {
        cout << "Error: Shape Recognizer could not be created." << endl;
        return ;
    }
    
    result = _lipiShapeReco->loadModelData();
    
    if(result != 0) {
        cout << "Error: Model data could not be loaded." << endl;
        return;
    }
    
    
    std::string fullFilePath = FileUtils::getInstance()->fullPathForFilename("projects/alphanumeric/config/unicodeMapfile_alphanumeric.ini");
    
    std::string data = FileUtils::getInstance()->getStringFromFile(fullFilePath);
    _englishUnicodeMapping = split(data, ',');

}


std::map<std::string, std::string> LipiTKInterface::getEnglishUnicodeMapping() {
    return _englishUnicodeMapping;
};

std::map<std::string, std::string> LipiTKInterface::split(std::string s, char delim)
{
    std::map<std::string, std::string> map;
    std::vector<std::string> elems;
    std::stringstream ss;
    ss.str(s);
    std::string item;
    while (getline(ss, item, delim)) {
        CCLOG("item %s", item.c_str());
        
        std::string key = item.substr(0,item.find_first_of("="));
        std::string value = item.substr(item.find_first_of(">=") + 1);
        CCLOG("key %s", key.c_str());
        CCLOG("value %s", value.c_str());
        map.insert(std::pair<std::string,std::string>(key, value));
    }
    return map;
}

std::vector<LipiTKResult*> LipiTKInterface::recognizeLipiTK(std::vector<Stroke*> strokes) {
    std::vector<int> _outSubSetOfClasses;
    std::vector<LTKShapeRecoResult> _oResultSet;
    
    LTKScreenContext _oScreenContext;
    LTKCaptureDevice _ltkcapturedevice;

    _ltkcapturedevice.setXDPI(265.0);
    _ltkcapturedevice.setYDPI(265.0);
    
    try
    {
        _oScreenContext.setBboxLeft(0);
        _oScreenContext.setBboxBottom(0);
        _oScreenContext.setBboxRight(2560);
        _oScreenContext.setBboxTop(1800);
    }
    catch (...)
    {
        cout << "Exception inside copyscreencontext" <<endl;
    }
    
    LTKTraceGroup oTraceGroup;
    vector<float> point;
    
    for (std::vector<Stroke* >::iterator it = strokes.begin() ; it != strokes.end(); ++it)
    {
        Stroke* stroke = *it;
        LTKTrace trace;
        int aSize = stroke->getNumberOfPoints();
        for (int i = 0; i < aSize; i++)
        {
            Point p = stroke->getPointAt(i);
            if(p != Point::ZERO) {
                point.push_back(p.x);
                point.push_back(p.y);
                trace.addPoint(point);
                point.clear();

            }
        }
        
        oTraceGroup.addTrace(trace);
    }
    
    
    
    if(_lipiShapeReco)
    {
        int iResult = _lipiShapeReco->recognize(oTraceGroup,
                                               _oScreenContext,
                                               _outSubSetOfClasses,
                                               CONFIDENCE_THRESHOLD,
                                               NUMOFCHOICES, 
                                               _oResultSet);
    }
    else 
    {
        cout << "lipiShapeReco is NULL" << endl;
    }
    
    std::vector<LipiTKResult*> results;
    for (int k = 0; k < _oResultSet.size(); k++)
    {
        LipiTKResult* result = new LipiTKResult(_oResultSet[k].getShapeId(), _oResultSet[k].getConfidence());
        CCLOG("shape Id %d", _oResultSet[k].getShapeId());
        CCLOG("confidence %f", _oResultSet[k].getConfidence());
        results.push_back(result);
    }
    
    return results;
}
