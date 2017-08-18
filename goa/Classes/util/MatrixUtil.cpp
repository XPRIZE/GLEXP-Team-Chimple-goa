//
//  MatrixUtil.cpp
//  goa
//
//  Created by Srikanth Talapadi on 03/08/17.
//
//

#include "MatrixUtil.h"

using namespace std;

vector<vector<string>> MatrixUtil::generateMatrixForChoosing(string answer, vector<string> choices, int numRows, int numCols, int minPercentOfOccurence) {
    int minOccurence = ceil(numRows * numCols * minPercentOfOccurence / 100);
    vector<string> allStrings;
    allStrings.reserve(numRows * numCols);
    for (int i = 0; i < numRows * numCols; i++) {
        if(i < minOccurence) {
            allStrings.insert(allStrings.begin() + i, answer);
        } else {
            allStrings.insert(allStrings.begin() + i, choices[rand() % choices.size()]);
        }
    }
    random_shuffle(allStrings.begin(), allStrings.end());
    return MatrixUtil::convert1dTo2d(numCols, allStrings);
}

map<string, string> MatrixUtil::questionToAnswerMapping(vector<Lesson::MultiChoice> vmc) {
    map<string, string> mapping;
    for(auto const& value: vmc) {
        mapping.insert(pair<string, string>(value.question, value.answers[value.correctAnswer]));
    }
    return mapping;
}

vector<vector<string>> MatrixUtil::generateMatrix(vector<string> answer, vector<string> choices, int numRows, int numCols) {
    int wordLength = answer.size();
    int matrixLength = numRows * numCols;
    auto locChars = getRandomLocations(wordLength, matrixLength);
    vector<vector<string>> matrix(numRows, vector<string>(numCols));
    int choiceIndex = 0;
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int numElement = numCols * i + j;
            auto iter = locChars.find(numElement);
            if(iter != locChars.end()) {
                matrix[i][j] = answer.at(iter->second);
            } else {
                matrix[i][j] = choices.at(choiceIndex++ % choices.size());
            }
        }
    }
    return matrix;
}

map<int, int> MatrixUtil::getRandomLocations(int numLoc, int totalNum) {
    map<int, int> locChars;
    if(numLoc > totalNum) {
        return locChars;
    }
    for (int i = 0; i < numLoc; i++) {
        auto randLoc = rand() % totalNum;
        for (auto iter = locChars.find(randLoc); iter != locChars.end(); iter = locChars.find(++randLoc % totalNum)) { }
        
        locChars.insert(pair<int,int>(randLoc % totalNum, i));
    }
    return locChars;
}

