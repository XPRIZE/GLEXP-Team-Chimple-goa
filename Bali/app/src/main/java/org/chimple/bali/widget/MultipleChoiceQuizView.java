package org.chimple.bali.widget;

import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.ContextWrapper;
import android.graphics.Color;
import android.support.annotation.ColorInt;
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
import android.widget.LinearLayout;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.viewmodel.CardStatusViewModel;

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
    private View mcurrentSelectedView;

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

        OnClickListener onClickListener = new OnClickListener() {
            @Override
            public void onClick(View view) {
                if(mcurrentSelectedView != null) {
                    mcurrentSelectedView.setBackgroundColor(Color.WHITE);
                }
                view.setBackgroundColor(Color.BLUE);
                mcurrentSelectedView = view;
                switch (view.getId()) {
                    case R.id.button0:
                        if(mcq.correctAnswer == 0) {
                            Log.d(TAG, "Correct answer 0");
                        }
                        break;
                    case R.id.button1:
                        if(mcq.correctAnswer == 1) {
                            Log.d(TAG, "Correct answer 1");
                        }
                        break;
                    case R.id.button2:
                        if(mcq.correctAnswer == 2) {
                            Log.d(TAG, "Correct answer 2");
                        }
                        break;
                    case R.id.button3:
                        if(mcq.correctAnswer == 3) {
                            Log.d(TAG, "Correct answer 3");
                        }
                        break;
                }
                FloatingActionButton checkFab = (FloatingActionButton) findViewById(R.id.checkFab);
                checkFab.show();

            }
        };

        if(mQuizType == TEXT_TO_IMAGE_QUIZ) {
            View view = inflate(getContext(), R.layout.multiple_choice_quiz_image_view, null);
            addView(view);

            ImageButton button0 = (ImageButton) findViewById(R.id.button0);
            button0.setImageDrawable(mcq.answerUnits[0].getPictureDrawable(getContext()));
            button0.setOnClickListener(onClickListener);
            ImageButton button1 = (ImageButton) findViewById(R.id.button1);
            button1.setImageDrawable(mcq.answerUnits[1].getPictureDrawable(getContext()));
            button1.setOnClickListener(onClickListener);
            ImageButton button2 = (ImageButton) findViewById(R.id.button2);
            button2.setImageDrawable(mcq.answerUnits[2].getPictureDrawable(getContext()));
            button2.setOnClickListener(onClickListener);
            ImageButton button3 = (ImageButton) findViewById(R.id.button3);
            button3.setImageDrawable(mcq.answerUnits[3].getPictureDrawable(getContext()));
            button3.setOnClickListener(onClickListener);
        } else if(mQuizType == TEXT_TO_SOUND_QUIZ) {
            View view = inflate(getContext(), R.layout.multiple_choice_quiz_image_view, null);
            addView(view);

            ImageButton button0 = (ImageButton) findViewById(R.id.button0);
            button0.setImageResource(R.drawable.ic_volume_up_black_24dp);
            button0.setOnClickListener(onClickListener);
            ImageButton button1 = (ImageButton) findViewById(R.id.button1);
            button1.setImageResource(R.drawable.ic_volume_up_black_24dp);
            button1.setOnClickListener(onClickListener);
            ImageButton button2 = (ImageButton) findViewById(R.id.button2);
            button2.setImageResource(R.drawable.ic_volume_up_black_24dp);
            button2.setOnClickListener(onClickListener);
            ImageButton button3 = (ImageButton) findViewById(R.id.button3);
            button3.setImageResource(R.drawable.ic_volume_up_black_24dp);
            button3.setOnClickListener(onClickListener);
        } else {
            View view = inflate(getContext(), R.layout.multiple_choice_quiz_view, null);
            addView(view);

            Button button0 = (Button) findViewById(R.id.button0);
            button0.setText(mcq.answers[0]);
            button0.setOnClickListener(onClickListener);
            Button button1 = (Button) findViewById(R.id.button1);
            button1.setText(mcq.answers[1]);
            button1.setOnClickListener(onClickListener);
            Button button2 = (Button) findViewById(R.id.button2);
            button2.setText(mcq.answers[2]);
            button2.setOnClickListener(onClickListener);
            Button button3 = (Button) findViewById(R.id.button3);
            button3.setText(mcq.answers[3]);
            button3.setOnClickListener(onClickListener);
        }

        CardView cardView = (CardView) findViewById(R.id.questionView);
        if(mQuizType == TEXT_TO_IMAGE_QUIZ
                || mQuizType == TEXT_TO_SOUND_QUIZ
                || mQuizType == TEXT_TO_TEXT_QUIZ) {
            TextView textView = new TextView(getContext());
            textView.setText(mcq.question);

            LayoutParams lay = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            lay.gravity = Gravity.CENTER;
            textView.setLayoutParams(lay);
            cardView.addView(textView);
        } else if(mQuizType == IMAGE_TO_TEXT_QUIZ) {
            ImageView imageView = new ImageView(getContext());
            imageView.setImageDrawable(mMcq.questionUnit.getPictureDrawable(getContext()));
            LayoutParams lay = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            lay.gravity = Gravity.CENTER;
            imageView.setLayoutParams(lay);
            cardView.addView(imageView);
        } else if(mQuizType == SOUND_TO_TEXT_QUIZ) {
            ImageView imageView = new ImageView(getContext());
            imageView.setImageResource(R.drawable.ic_volume_up_black_24dp);
            LayoutParams lay = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            lay.gravity = Gravity.CENTER;
            imageView.setLayoutParams(lay);
            cardView.addView(imageView);
        }
        
        OnClickListener checkOnClickListener = new OnClickListener() {
            @Override
            public void onClick(View view) {
                view.setVisibility(INVISIBLE);
                CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(getActivity()).get(CardStatusViewModel.class);
                cardStatusViewModel.viewed(CardStatusViewModel.SELECTED);
            }
        };

        FloatingActionButton checkFab = (FloatingActionButton) findViewById(R.id.checkFab);
        checkFab.setOnClickListener(checkOnClickListener);
    }

    private int decideQuizType() {
        List<Integer> possibleQuizTypes = new LinkedList<Integer>();
        possibleQuizTypes.add(TEXT_TO_TEXT_QUIZ);
        if(mMcq.questionUnit.picture != null) {
            possibleQuizTypes.add(IMAGE_TO_TEXT_QUIZ);
        }
        if(mMcq.questionUnit.sound != null) {
            possibleQuizTypes.add(SOUND_TO_TEXT_QUIZ);
        }
        boolean allContainImages = true;
        boolean allContainSounds = true;
        for(Unit unit: mMcq.answerUnits) {
            if(unit.picture == null) {
                allContainImages = false;
            }
            if(unit.sound == null) {
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
