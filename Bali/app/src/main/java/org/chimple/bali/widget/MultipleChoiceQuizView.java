package org.chimple.bali.widget;

import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.res.AssetFileDescriptor;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.media.MediaPlayer;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.widget.CardView;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.viewmodel.CardStatusViewModel;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

/**
 * TODO: document your custom view class.
 */
public class MultipleChoiceQuizView extends FrameLayout {
    private static final int TEXT_TO_TEXT_QUIZ = 1;
    private static final int TEXT_TO_IMAGE_QUIZ = 2;
    private static final int TEXT_TO_SOUND_QUIZ = 3;
    private static final int IMAGE_TO_TEXT_QUIZ = 4;
    private static final int SOUND_TO_TEXT_QUIZ = 5;

    private static final String TAG = MultipleChoiceQuizView.class.getName();
    private MultipleChoiceQuiz mMcq;
    private int mQuizType;
    View mButton0;
    View mButton1;
    View mButton2;
    View mButton3;
    CardView mQuestionView;
    private View mcurrentSelectedView;
    private View mCorrectView;


    public MultipleChoiceQuizView(Context context, MultipleChoiceQuiz mcq) {
        super(context);
        init(null, 0, mcq);
    }

    public MultipleChoiceQuizView(Context context, AttributeSet attrs, MultipleChoiceQuiz mcq) {
        super(context, attrs);
        init(attrs, 0, mcq);
    }

    public MultipleChoiceQuizView(Context context, AttributeSet attrs, int defStyle, MultipleChoiceQuiz mcq) {
        super(context, attrs, defStyle);
        init(attrs, defStyle, mcq);
    }

    private void init(AttributeSet attrs, int defStyle, MultipleChoiceQuiz mcq) {
        mMcq = mcq;
        mQuizType = decideQuizType();

        if(mQuizType == TEXT_TO_IMAGE_QUIZ) {
            View view = inflate(getContext(), R.layout.multiple_choice_quiz_image_view, null);
            addView(view);
            setupButtons();
            ((ImageButton)mButton0).setImageDrawable(mcq.answerUnits[0].getPictureDrawable(getContext()));
            ((ImageButton)mButton1).setImageDrawable(mcq.answerUnits[1].getPictureDrawable(getContext()));
            ((ImageButton)mButton2).setImageDrawable(mcq.answerUnits[2].getPictureDrawable(getContext()));
            ((ImageButton)mButton3).setImageDrawable(mcq.answerUnits[3].getPictureDrawable(getContext()));
        } else if(mQuizType == TEXT_TO_SOUND_QUIZ) {
            View view = inflate(getContext(), R.layout.multiple_choice_quiz_image_view, null);
            addView(view);
            setupButtons();
            ((ImageButton)mButton0).setImageResource(R.drawable.ic_volume_up_black_24dp);
            ((ImageButton)mButton1).setImageResource(R.drawable.ic_volume_up_black_24dp);
            ((ImageButton)mButton2).setImageResource(R.drawable.ic_volume_up_black_24dp);
            ((ImageButton)mButton3).setImageResource(R.drawable.ic_volume_up_black_24dp);
        } else {
            View view = inflate(getContext(), R.layout.multiple_choice_quiz_view, null);
            addView(view);
            setupButtons();
            ((Button)mButton0).setText(mcq.answers[0]);
            ((Button)mButton1).setText(mcq.answers[1]);
            ((Button)mButton2).setText(mcq.answers[2]);
            ((Button)mButton3).setText(mcq.answers[3]);
        }

        mQuestionView = findViewById(R.id.questionView);
        if(mQuizType == TEXT_TO_IMAGE_QUIZ
                || mQuizType == TEXT_TO_SOUND_QUIZ
                || mQuizType == TEXT_TO_TEXT_QUIZ) {
            TextView textView = new TextView(getContext());
            textView.setText(mcq.question);
            textView.setTextAppearance(getContext(), R.style.fontForMCQ);
            LayoutParams lay = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            lay.gravity = Gravity.CENTER;
            textView.setLayoutParams(lay);
            mQuestionView.addView(textView);
        } else if(mQuizType == IMAGE_TO_TEXT_QUIZ) {
            ImageView imageView = new ImageView(getContext());
            imageView.setImageDrawable(mMcq.questionUnit.getPictureDrawable(getContext()));
            LayoutParams lay = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            lay.gravity = Gravity.CENTER;
            imageView.setLayoutParams(lay);
            imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
            mQuestionView.addView(imageView);
        } else if(mQuizType == SOUND_TO_TEXT_QUIZ) {
            ImageView imageView = new ImageView(getContext());
            imageView.setImageResource(R.drawable.ic_volume_up_black_24dp);
            LayoutParams lay = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            lay.gravity = Gravity.CENTER;
            imageView.setLayoutParams(lay);
            mQuestionView.addView(imageView);

            OnClickListener soundOnClickListener = new OnClickListener() {
                @Override
                public void onClick(View view) {
                    playSound(view);
                }
            };
            mQuestionView.setOnClickListener(soundOnClickListener);
        }
        
        OnClickListener checkOnClickListener = new OnClickListener() {
            @Override
            public void onClick(View view) {
                view.setVisibility(INVISIBLE);
                CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(getActivity()).get(CardStatusViewModel.class);
                mButton0.setClickable(false);
                mButton1.setClickable(false);
                mButton2.setClickable(false);
                mButton3.setClickable(false);
                mCorrectView.setBackground(getResources().getDrawable(R.drawable.button_correct, null));
                if(mCorrectView == mcurrentSelectedView) {
                    cardStatusViewModel.viewed(CardStatusViewModel.CORRECT_CHOICE);
                } else {
                    mcurrentSelectedView.setBackground(getResources().getDrawable(R.drawable.button_incorrect, null));
                    cardStatusViewModel.viewed(CardStatusViewModel.INCORRECT_CHOICE);
                }
            }
        };

        FloatingActionButton checkFab = (FloatingActionButton) findViewById(R.id.checkFab);
        checkFab.setOnClickListener(checkOnClickListener);
    }

    private void playSound(View view) {
        Unit unit = null;
        if(view.equals(mButton0)) {
            unit = mMcq.answerUnits[0];
        } else if(view.equals(mButton1)) {
            unit = mMcq.answerUnits[1];
        } else if(view.equals(mButton2)) {
            unit = mMcq.answerUnits[2];
        } else if(view.equals(mButton3)) {
            unit = mMcq.answerUnits[3];
        } else if(view.equals(mQuestionView)) {
            unit = mMcq.questionUnit;
        }
        MediaPlayer mediaPlayer = new MediaPlayer();
        mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                mediaPlayer.release();
            }
        });
        try {
            AssetFileDescriptor afd = getContext().getAssets().openFd(unit.sound);
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(),
                    afd.getLength());
            afd.close();
            mediaPlayer.prepare();
            mediaPlayer.start();
        } catch (IOException e) {
            e.printStackTrace();
            mediaPlayer.release();
        }
    }

    private int decideQuizType() {
        List<Integer> possibleQuizTypes = new LinkedList<Integer>();
        possibleQuizTypes.add(TEXT_TO_TEXT_QUIZ);
        if(mMcq.questionUnit.picture != null && !mMcq.questionUnit.picture.isEmpty()) {
            possibleQuizTypes.add(IMAGE_TO_TEXT_QUIZ);
        }
        if(mMcq.questionUnit.sound != null && !mMcq.questionUnit.sound.isEmpty()) {
            possibleQuizTypes.add(SOUND_TO_TEXT_QUIZ);
        }
        boolean allContainImages = true;
        boolean allContainSounds = true;
        for(Unit unit: mMcq.answerUnits) {
            if(unit.picture == null || unit.picture.isEmpty()) {
                allContainImages = false;
            }
            if(unit.sound == null || unit.sound.isEmpty()) {
                allContainSounds = false;
            }
        }
        if(allContainImages) {
            possibleQuizTypes.add(TEXT_TO_IMAGE_QUIZ);
        }
        if(allContainSounds) {
            possibleQuizTypes.add(TEXT_TO_SOUND_QUIZ);
        }
        int randIndex = ThreadLocalRandom.current().nextInt(possibleQuizTypes.size());
        return possibleQuizTypes.get(randIndex);
    }

    private void setupButtons() {
        OnClickListener onClickListener = new OnClickListener() {
            @Override
            public void onClick(View view) {
                if(mQuizType == TEXT_TO_SOUND_QUIZ) {
                    playSound(view);
                }
                if(mcurrentSelectedView != null) {
                    mcurrentSelectedView.setBackground(getResources().getDrawable(R.drawable.button_unselected, null));
                }
                view.setBackground(getResources().getDrawable(R.drawable.button_selected, null));
                mcurrentSelectedView = view;
                FloatingActionButton checkFab = (FloatingActionButton) findViewById(R.id.checkFab);
                checkFab.show();
            }
        };

        mButton0 = findViewById(R.id.button0);
        mButton0.setOnClickListener(onClickListener);
        mButton1 = findViewById(R.id.button1);
        mButton1.setOnClickListener(onClickListener);
        mButton2 = findViewById(R.id.button2);
        mButton2.setOnClickListener(onClickListener);
        mButton3 = findViewById(R.id.button3);
        mButton3.setOnClickListener(onClickListener);

        switch (mMcq.correctAnswer) {
            case 0:
                mCorrectView = mButton0;
                break;
            case 1:
                mCorrectView = mButton1;
                break;
            case 2:
                mCorrectView = mButton2;
                break;
            case 3:
                mCorrectView = mButton3;
                break;
        }
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

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        if(mQuizType == SOUND_TO_TEXT_QUIZ) {
            playSound(mQuestionView);
        }
    }

}
