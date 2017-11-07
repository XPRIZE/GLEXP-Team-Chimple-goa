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
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.transition.ChangeBounds;
import android.transition.Scene;
import android.transition.Slide;
import android.transition.Transition;
import android.transition.TransitionListenerAdapter;
import android.transition.TransitionManager;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.db.pojo.FlashCard;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.repo.UserUnitRepo;
import org.chimple.bali.viewmodel.CardStatusViewModel;

public class FlashCardView extends LinearLayout {
    private FlashCard mFlashCard;
    private ViewGroup aView;
    private View bView;
    private boolean isShowingAView = true;

    private final OnClickListener mOnClickListener = new OnClickListener() {
        @Override
        public void onClick(View view) {
            setClickable(false);

            if(mFlashCard.objectUnit != null) {
                TransitionManager.beginDelayedTransition(FlashCardView.this, new Slide());

                Drawable d = mFlashCard.objectUnit.getPictureDrawable(getContext());
                if(d != null) {
                    ImageView imageView = new ImageView(getContext());
                    imageView.setImageDrawable(d);
                    LinearLayout.LayoutParams llLayoutParams = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, 0);
                    llLayoutParams.weight = 1;
                    imageView.setLayoutParams(llLayoutParams);
                    imageView.setBackgroundColor(Color.WHITE);
                    addView(imageView);
                }
                bView = getView(view.getContext(), mFlashCard.objectUnit);
                bView.setBackground(new ColorDrawable(getResources().getColor(R.color.secondaryColor)));
                LinearLayout.LayoutParams llLayoutParams = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, 0);
                llLayoutParams.weight = 1;
                bView.setLayoutParams(llLayoutParams);
                addView(bView);
                UserLogRepo.logEntity(view.getContext(), UserLog.UNIT_TYPE, mFlashCard.objectUnit.id, UserLog.START_EVENT, null);
            }
            CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(getActivity()).get(CardStatusViewModel.class);
            cardStatusViewModel.viewed(CardStatusViewModel.READY_TO_GO);
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
        setOrientation(LinearLayout.VERTICAL);
        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);
        setLayoutParams(layoutParams);
        mFlashCard = flashCard;
        UserLogRepo.logEntity(context, UserLog.LESSON_UNIT_TYPE, flashCard.lessonUnit.id, UserLog.START_EVENT, null);

        aView = getView(context, mFlashCard.subjectUnit);
        LinearLayout.LayoutParams llLayoutParams = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, 0);
        llLayoutParams.weight = 1;
        aView.setLayoutParams(llLayoutParams);
        aView.setBackground(new ColorDrawable(getResources().getColor(R.color.primaryColor)));

//        Scene scene = Scene.getSceneForLayout(this, R.layout.word, context);
//        Scene scene = new Scene(this, aView);
//        scene.enter();
//        TextView wordView = (TextView) findViewById(R.id.word);
//        wordView.setText(Html.fromHtml("<b>"+word.name+"</b><i>h</i>"));
//        wordView.setText(mFlashCard.subjectUnit.name);

        addView(aView);
        UserLogRepo.logEntity(context, UserLog.UNIT_TYPE, flashCard.subjectUnit.id, UserLog.START_EVENT, null);
        
        setOnClickListener(mOnClickListener);
    }

    private ViewGroup getView(Context context, Unit unit) {
//        if(unit.type == Unit.WORD_TYPE) {
//            WordView wordView = new WordView(context, unit);
//            return wordView;
//        } else if(unit.type == Unit.SENTENCE_TYPE) {
//            SentenceView sentenceView = new SentenceView(context, unit);
//            return sentenceView;
//        }
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
