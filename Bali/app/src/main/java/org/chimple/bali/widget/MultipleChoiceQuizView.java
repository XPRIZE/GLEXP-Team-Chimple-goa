package org.chimple.bali.widget;

import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.ContextWrapper;
import android.support.v7.widget.CardView;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.viewmodel.CardStatusViewModel;

/**
 * TODO: document your custom view class.
 */
public class MultipleChoiceQuizView extends FrameLayout {
    private static final String TAG = MultipleChoiceQuizView.class.getName();
    private MultipleChoiceQuiz mMcq;

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

        View view = inflate(getContext(), R.layout.multiple_choice_quiz_view, null);
        addView(view);
        CardView cardView = (CardView) findViewById(R.id.questionView);
        TextView textView = new TextView(getContext());
        textView.setText(mcq.question);
        cardView.addView(textView);

        OnClickListener onClickListener = new OnClickListener() {
            @Override
            public void onClick(View view) {
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
                CardStatusViewModel cardStatusViewModel = ViewModelProviders.of(getActivity()).get(CardStatusViewModel.class);
                cardStatusViewModel.viewed(true);
            }
        };

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
