//
//  LipiTKInterface.h
//  Hello
//
//  Created by Shyamal.Upadhyaya on 15/10/16.
//
//

#ifndef LipiTKInterface_h
#define LipiTKInterface_h

#define SHAPEREC_ALPHANUM "SHAPEREC_ALPHANUM"

#include "ext/LTKShapeRecognizer.h"
#include "LTKLipiEngineInterface.h"
#include "Stroke.hpp"
#include "LipiTKResult.h"

#define NUMOFCHOICES 5
#define CONFIDENCE_THRESHOLD 0.0002

class LipiTKInterface {
public:
    
    static LipiTKInterface* getInstance(std::string projectPath);
    
    LipiTKInterface(std::string projectPath);
    ~LipiTKInterface();
    
    
    std::vector<LipiTKResult*> recognizeLipiTK(std::vector<Stroke*> strokes);
    std::map<std::string, std::string> getEnglishUnicodeMapping();
    
private:
    std::string _lipiDirectory;
    std::string _projectRecognizeStr;
    std::map<std::string, std::string> _englishUnicodeMapping;
    
    virtual void initialize();
    std::map<std::string, std::string> split(std::string s, char delim);
    
    LTKLipiEngineInterface* _lipiEngine;
    LTKShapeRecognizer* _lipiShapeReco = NULL;
};


#endif /* LipiTKInterface_h */
