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

import android.animation.Animator;
import android.animation.AnimatorInflater;
import android.animation.AnimatorListenerAdapter;
import android.animation.AnimatorSet;
import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.ContextWrapper;
import android.view.View;
import android.widget.FrameLayout;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.repo.UserUnitRepo;
import org.chimple.bali.viewmodel.CardStatusViewModel;

public class FlashCardView extends FrameLayout {
    private FlashCard mFlashCard;
    private View aView;
    private View bView;
    private boolean isShowingAView = true;

    private final OnClickListener mOnClickListener = new OnClickListener() {
        @Override
        public void onClick(View view) {
            setClickable(false);
            AnimatorSet setOut = (AnimatorSet) AnimatorInflater.loadAnimator(view.getContext(),
                    R.animator.card_flip_right_out);
            AnimatorSet setIn = (AnimatorSet) AnimatorInflater.loadAnimator(view.getContext(),
                    R.animator.card_flip_right_in);
            AnimatorSet setFlip;
            if(isShowingAView) {
                setOut.setTarget(aView);
                setIn.setTarget(bView);
                setFlip = (AnimatorSet) AnimatorInflater.loadAnimator(view.getContext(),
                        R.animator.card_flip_back);
                isShowingAView = false;
            } else {
                setOut.setTarget(bView);
                setIn.setTarget(aView);
                setFlip = (AnimatorSet) AnimatorInflater.loadAnimator(view.getContext(),
                        R.animator.card_flip_front);
                isShowingAView = true;
            }

            setFlip.setTarget(FlashCardView.this);
            AnimatorSet set = new AnimatorSet();
            set.playTogether(setIn, setOut, setFlip);
            set.addListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    setClickable(true);
                    CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(getActivity()).get(CardStatusViewModel.class);
                    cardStatusViewModel.viewed(CardStatusViewModel.READY_TO_GO);

                }
            });
            set.start();
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
        UserLogRepo.logEntity(getContext(), UserLog.LESSON_UNIT_TYPE, mFlashCard.lessonUnit.id, UserLog.START_EVENT, null);
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        UserLogRepo.logEntity(getContext(), UserLog.LESSON_UNIT_TYPE, mFlashCard.lessonUnit.id, UserLog.STOP_EVENT, null);
    }

    private void initView(Context context, FlashCard flashCard) {
        mFlashCard = flashCard;
        UserLogRepo.logEntity(context, UserLog.LESSON_UNIT_TYPE, flashCard.lessonUnit.id, UserLog.START_EVENT, null);

        aView = getView(context, mFlashCard.subjectUnit);
        addView(aView);
        UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.subjectUnit.id, UserLog.START_EVENT, null);
        
        if(mFlashCard.objectUnit != null) {
            bView = getView(context, mFlashCard.objectUnit);
            addView(bView);
            bView.setAlpha(0);
            bView.setRotationY(180);
            UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.objectUnit.id, UserLog.START_EVENT, null);
        }
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

    private LifecycleActivity getActivity() {
        Context context = getContext();
        while (context instanceof ContextWrapper) {
            if (context instanceof LifecycleActivity) {
                return (LifecycleActivity)context;
            }
            context = ((ContextWrapper)context).getBaseContext();
        }
        return null;
    }


}
