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

class MatrixUtil
{
public:
    static std::vector<std::vector<std::string>> generateMatrixForChoosing(std::string answer, std::vector<std::string> choices, int numRows, int numCols, int minPercentOfOccurence);
    
    template <typename T>
    static std::vector<std::vector<T>> convert1dTo2d(size_t cols, std::vector<T> values) {
        std::vector<std::vector<T>> result;
        for (std::size_t i = 0; i < values.size(); ++i) {
            if (i % cols == 0) result.resize(result.size() + 1);
            result[i / cols].push_back(values[i]);
        }
        return result;
    }
    
    template <typename T>
    static std::vector<T> getOnlyChoices(std::vector<T> choices, int answer) {
        std::vector<T> result(choices);
        result.erase(result.begin() + answer);
        return result;
    }
};

#endif /* MatrixUtil_h */
