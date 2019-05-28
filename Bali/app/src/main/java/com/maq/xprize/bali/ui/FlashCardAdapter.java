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

package com.maq.xprize.bali.ui;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.maq.xprize.bali.R;
import com.maq.xprize.bali.db.entity.Unit;
import com.maq.xprize.bali.db.pojo.FlashCard;
import com.maq.xprize.bali.model.MultipleChoiceQuiz;
import com.maq.xprize.bali.widget.FlashCardView;
import com.maq.xprize.bali.widget.LetterView;
import com.maq.xprize.bali.widget.MultipleChoiceQuizView;
import com.maq.xprize.bali.widget.SentenceView;
import com.maq.xprize.bali.widget.WordView;

import java.util.ArrayList;
import java.util.Collections;
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
        if ((mCurrentIndex >= mFlashCards.size() || mCurrentIndex % 4 == 0 ) &&
                mUnquizzedIndexes.size() > 0) {
            Collections.shuffle(mUnquizzedIndexes);
            int quizIndex =  mUnquizzedIndexes.remove(mUnquizzedIndexes.size() - 1);
            ArrayList<Integer> choiceList = new ArrayList<Integer>();
            for (int j=0; j<mCurrentIndex; j++) {
                if(!mFlashCards.get(quizIndex).subjectUnit.name.equals(mFlashCards.get(j).subjectUnit.name)) {
                    choiceList.add(new Integer(j));
                }
            }
            Collections.shuffle(choiceList);

            Unit[] choices = new Unit[4];
            int randIndex = ThreadLocalRandom.current().nextInt(choices.length);
            for (int j = 0; j < choices.length; j++) {
                if(j == randIndex) {
                    choices[j] = mFlashCards.get(quizIndex).objectUnit;
                } else {
                    int randChoiceIndex = choiceList.get(Math.min(j, choiceList.size() - 1));
                    choices[j] = mFlashCards.get(randChoiceIndex).objectUnit;
                }
            }
            MultipleChoiceQuiz multipleChoiceQuiz = new MultipleChoiceQuiz(
                    "help",
                    mFlashCards.get(quizIndex).subjectUnit,
                    choices,
                    randIndex
            );
            return multipleChoiceQuiz;
        }
        mUnquizzedIndexes.add(mCurrentIndex);
        FlashCard flashCard = mFlashCards.get(mCurrentIndex);
        if(mCurrentIndex < mFlashCards.size()) {
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
