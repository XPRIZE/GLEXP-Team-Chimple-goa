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

package org.chimple.bali.widget;

import android.content.Context;
import android.support.annotation.IntDef;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.repo.UserLogRepo;

public class FlashCardView extends LinearLayout {
    private FlashCard mFlashCard;

    public FlashCardView(Context context, FlashCard flashCard) {
        super(context);
        initView(context, flashCard);
    }

    public FlashCardView(Context context, @Nullable AttributeSet attrs, FlashCard flashCard) {
        super(context, attrs);
        initView(context, flashCard);
    }

    public FlashCardView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, FlashCard flashCard) {
        super(context, attrs, defStyleAttr);
        initView(context, flashCard);
    }

    public FlashCardView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes, FlashCard flashCard) {
        super(context, attrs, defStyleAttr, defStyleRes);
        initView(context, flashCard);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
    }

    @Override
    protected void onVisibilityChanged(@NonNull View changedView, int visibility) {
        super.onVisibilityChanged(changedView, visibility);
    }

    @Override
    protected void onAnimationStart() {
        super.onAnimationStart();
    }

    @Override
    protected void onAnimationEnd() {
        super.onAnimationEnd();
    }

    private void initView(Context context, FlashCard flashCard) {
        mFlashCard = flashCard;
        UserLogRepo.logEntity(context, UserLog.LESSON_UNIT_TYPE, flashCard.lessonUnit.id, UserLog.START_EVENT);
        setOrientation(HORIZONTAL);

        View objectView = getView(context, mFlashCard.objectUnit);
        LayoutParams layoutParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
                1);
        addView(objectView, layoutParams);
        UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.objectUnit.id, UserLog.START_EVENT);

        if(mFlashCard.subjectUnit != null) {
            View subjectView = getView(context, mFlashCard.subjectUnit);
            LayoutParams sLayoutParams = new LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    1);
            addView(subjectView, sLayoutParams);
            UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.subjectUnit.id, UserLog.START_EVENT);
        }
    }

    private View getView(Context context, Unit unit) {
        if(unit.type == Unit.WORD_TYPE) {
            WordView wordView = new WordView(context, unit);
            return wordView;
        } else if(unit.type == Unit.SENTENCE_TYPE) {
            SentenceView sentenceView = new SentenceView(context, unit);
            return sentenceView;
        }
        LetterView letterView = new LetterView(context, unit);
        return letterView;
    }
}
