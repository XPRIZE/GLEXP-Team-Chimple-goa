/*
 * Copyright 2017, Team Chimple
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.chimple.bali.ui;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.widget.FlashCardView;
import org.chimple.bali.widget.LetterView;
import org.chimple.bali.widget.MultipleChoiceQuizView;
import org.chimple.bali.widget.SentenceView;
import org.chimple.bali.widget.WordView;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class FlashCardAdapter extends BaseAdapter {
    private final Context mContext;
    private List<FlashCard> mFlashCards;
    private List<Integer> mUnquizzedIndexes;
    private int mCurrentIndex;

    public FlashCardAdapter(Context context) {
        mContext = context;
    }

    public FlashCardAdapter(Context context, List<FlashCard> flashCards) {
        mContext = context;
        mFlashCards = flashCards;
        mUnquizzedIndexes = new ArrayList<Integer>();
        mCurrentIndex = 0;
    }

    public void setFlashCards(List<FlashCard> flashCards) {
        mFlashCards = flashCards;
        notifyDataSetChanged();
    }

    @Override
    public int getCount() {
        return mFlashCards.size() * 2;
    }

    @Override
    public Object getItem(int i) {
        if ((mCurrentIndex >= mFlashCards.size() - 1 || mCurrentIndex % 4 == 0 ) &&
                mUnquizzedIndexes.size() > 0) {
            int quizIndex =  mUnquizzedIndexes.remove(0);
            int[] choices = new int[4];
            int randIndex = ThreadLocalRandom.current().nextInt(choices.length);
            for (int j = 0; j < choices.length; j++) {
                if(j == randIndex) {
                    choices[j] = quizIndex;
                } else {
                    int x = 0;
                    do {
                        x = ThreadLocalRandom.current().nextInt(mCurrentIndex);
                        choices[j] = x;
                    } while(x == quizIndex);
                }
            }
            String[] answers = {
                    mFlashCards.get(choices[0]).subjectUnit.name,
                    mFlashCards.get(choices[1]).subjectUnit.name,
                    mFlashCards.get(choices[2]).subjectUnit.name,
                    mFlashCards.get(choices[3]).subjectUnit.name
            };
            MultipleChoiceQuiz multipleChoiceQuiz = new MultipleChoiceQuiz(
                    "help",
                    mFlashCards.get(quizIndex).subjectUnit.name,
                    answers,
                    randIndex
            );
            return multipleChoiceQuiz;
        }
        mUnquizzedIndexes.add(mCurrentIndex);
        FlashCard flashCard = mFlashCards.get(mCurrentIndex);
        if(mCurrentIndex < mFlashCards.size() - 1) {
            mCurrentIndex++;
        }
        return flashCard;
    }

    @Override
    public long getItemId(int i) {
//        return mFlashCards.get(i).lessonUnit.seq;
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        Object data = getItem(i);
        if(data instanceof FlashCard) {
//        if(flashCard.objectUnit.type == Unit.WORD_TYPE) {
//            WordView wordView = new WordView(mContext, flashCard.objectUnit);
//            return wordView;
//        } else if(flashCard.objectUnit.type == Unit.SENTENCE_TYPE) {
//            SentenceView sentenceView = new SentenceView(mContext, flashCard.objectUnit);
//            return sentenceView;
//        }
//        LetterView letterView = new LetterView(mContext, flashCard.objectUnit);
//        return letterView;
            return new FlashCardView(mContext, (FlashCard) data);
        } else if(data instanceof MultipleChoiceQuiz) {
            return new MultipleChoiceQuizView(mContext, (MultipleChoiceQuiz) data);
        }
        return null;
    }
}
