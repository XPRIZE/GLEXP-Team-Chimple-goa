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

import android.animation.ObjectAnimator;
import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Rect;
import android.support.annotation.IntDef;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterViewFlipper;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ViewSwitcher;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.repo.UserUnitRepo;

import static org.chimple.bali.R.id.floatingActionButton;

public class FlashCardView extends FrameLayout {
    private FlashCard mFlashCard;

    private final OnClickListener mOnClickListener = new OnClickListener() {
        @Override
        public void onClick(View view) {
//            showNext();
        }
    };

    public FlashCardView(Context context, FlashCard flashCard) {
        super(context);
        initView(context, flashCard);
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        UserUnitRepo.createOrUpdateUserUnit(getContext(), mFlashCard.objectUnit.id, -1);
        if (mFlashCard.subjectUnit != null) {
            UserUnitRepo.createOrUpdateUserUnit(getContext(), mFlashCard.subjectUnit.id, -1);
        }
        UserLogRepo.logEntity(getContext(), UserLog.LESSON_UNIT_TYPE, mFlashCard.lessonUnit.id, UserLog.START_EVENT);
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        UserLogRepo.logEntity(getContext(), UserLog.LESSON_UNIT_TYPE, mFlashCard.lessonUnit.id, UserLog.STOP_EVENT);
    }

    private void initView(Context context, FlashCard flashCard) {
        mFlashCard = flashCard;
        UserLogRepo.logEntity(context, UserLog.LESSON_UNIT_TYPE, flashCard.lessonUnit.id, UserLog.START_EVENT);

        View subjectView = getView(context, mFlashCard.subjectUnit);
        addView(subjectView);
        UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.subjectUnit.id, UserLog.START_EVENT);
        
        if(mFlashCard.objectUnit != null) {
            View objectView = getView(context, mFlashCard.objectUnit);
            addView(objectView);
            UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.objectUnit.id, UserLog.START_EVENT);
        }
//        setInAnimation(context, R.anim.card_flip_right_in);
//        setInAnimation(context, R.animator.card_flip_right_in);
//        setOutAnimation(context, R.animator.card_flip_right_out);
//        setInAnimation(ObjectAnimator.ofFloat(this, "rotationY", 180, 0));
//        setOutAnimation(context, R.anim.card_flip_right_out);

        setOnClickListener(mOnClickListener);
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
