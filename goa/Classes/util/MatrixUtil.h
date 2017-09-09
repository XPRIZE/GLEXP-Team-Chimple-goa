//
//  MatrixUtil.h
//  goa
//
//  Created by Srikanth Talapadi on 03/08/17.
//
//

#ifndef MatrixUtil_h
#define MatrixUtil_h

#include <stdio.h>
#include "../lang/Lesson.h"

using namespace std;

class MatrixUtil
{
public:
    static vector<vector<string>> generateMatrixForChoosing(string answer, vector<string> choices, int numRows, int numCols, int minPercentOfOccurence);
    static map<string, string> questionToAnswerMapping(vector<Lesson::MultiChoice>);
    static vector<pair<string, string>> questionToAnswerVector(vector<Lesson::MultiChoice>);
    static vector<vector<string>> generateMatrix(vector<string> answer, vector<string> choices, int numRows, int numCols);
    static map<int, int> getRandomLocations(int numLoc, int totalNum);

    template <typename T>
    static vector<vector<T>> convert1dTo2d(size_t cols, vector<T> values) {
        vector<vector<T>> result;
        for (size_t i = 0; i < values.size(); ++i) {
            if (i % cols == 0) result.resize(result.size() + 1);
            result[i / cols].push_back(values[i]);
        }
        return result;
    }
    
    template <typename T>
    static vector<T> getOnlyChoices(vector<T> choices, int answer) {
        vector<T> result(choices);
        result.erase(result.begin() + answer);
        return result;
    }
};

#endif /* MatrixUtil_h */
