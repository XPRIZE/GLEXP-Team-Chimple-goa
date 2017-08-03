//
//  MatrixUtil.cpp
//  goa
//
//  Created by Srikanth Talapadi on 03/08/17.
//
//

#include "MatrixUtil.h"

std::vector<std::vector<std::string>> MatrixUtil::generateMatrixForChoosing(std::string answer, std::vector<std::string> choices, int numRows, int numCols, int minPercentOfOccurence) {
    int minOccurence = ceil(numRows * numCols * minPercentOfOccurence / 100);
    std::vector<std::string> allStrings;
    allStrings.reserve(numRows * numCols);
    for (int i = 0; i < numRows * numCols; i++) {
        if(i < minOccurence) {
            allStrings.insert(allStrings.begin() + i, answer);
        } else {
            allStrings.insert(allStrings.begin() + i, choices[rand() % choices.size()]);
        }
    }
    std::random_shuffle(allStrings.begin(), allStrings.end());
    return MatrixUtil::convert1dTo2d(numCols, allStrings);
}

