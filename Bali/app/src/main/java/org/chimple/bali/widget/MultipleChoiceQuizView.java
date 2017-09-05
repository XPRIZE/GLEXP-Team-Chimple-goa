package org.chimple.bali.widget;

import android.content.Context;
import android.support.v7.widget.CardView;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.model.MultipleChoiceQuiz;

/**
 * TODO: document your custom view class.
 */
public class MultipleChoiceQuizView extends FrameLayout {
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

        Button button0 = (Button) findViewById(R.id.button0);
        button0.setText(mcq.answers[0]);
        Button button1 = (Button) findViewById(R.id.button1);
        button1.setText(mcq.answers[1]);
        Button button2 = (Button) findViewById(R.id.button2);
        button2.setText(mcq.answers[2]);
        Button button3 = (Button) findViewById(R.id.button3);
        button3.setText(mcq.answers[3]);

    }

}
