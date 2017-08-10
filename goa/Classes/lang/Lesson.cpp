//
//  Lesson.cpp
//  goa
//
//  Created by Srikanth Talapadi on 31/07/17.
//
//

#include "Lesson.h"



static const std::vector<std::string> allLowerStrings = {
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
};

static const std::vector<std::string> allUpperStrings = {
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
};


std::vector<Lesson::MultiChoice> Lesson::getMultiChoices(int lessons, int choices) {
    std::vector<Lesson::MultiChoice> vmc;
    vmc.reserve(lessons);
    for (int i = 0; i < lessons; i++) {
        Lesson::MultiChoice mc;
        mc.help = "Select the same letter";
        mc.question = allUpperStrings[i % allUpperStrings.size()];
        mc.correctAnswer = 0;
        std::vector<std::string> answers;
        answers.reserve(choices + 1);
        for (int j = 0; j < choices + 1; j++) {
            answers.insert(answers.begin() + j, allLowerStrings[(i + j) % allLowerStrings.size()]);
        }
        mc.answers = answers;
        vmc.insert(vmc.begin() + i, mc);
    }
    return vmc;
}

Lesson::Lesson(int sessionId) {
    _sessionId = sessionId;
}

Lesson::~Lesson() {
    
}
