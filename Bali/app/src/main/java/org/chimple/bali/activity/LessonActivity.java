package org.chimple.bali.activity;

import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.view.View;
import android.widget.AdapterViewAnimator;
import android.widget.ProgressBar;

import org.chimple.bali.MainActivity;
import org.chimple.bali.R;
import org.chimple.bali.db.entity.Unit;
import org.chimple.bali.ui.FlashCardAdapter;
import org.chimple.bali.viewmodel.FlashCardViewModel;

public class LessonActivity extends LifecycleActivity {
    private AdapterViewAnimator mFlashCardView;
    private ProgressBar mProgressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson);
        mFlashCardView = (AdapterViewAnimator) findViewById(R.id.flash_card_view);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        Intent intent = getIntent();
        Long lessonId = intent.getLongExtra(MainActivity.EXTRA_MESSAGE, 0);
        FlashCardViewModel.Factory factory =
                new FlashCardViewModel.Factory(
                        getApplication(), lessonId
                );
        final FlashCardViewModel model = ViewModelProviders.of(this, factory)
                .get(FlashCardViewModel.class);
        model.getFlashCards().observe(this, flashCards -> {
            if(flashCards != null) {
                final FlashCardAdapter flashCardAdapter = new FlashCardAdapter(this, flashCards);
                mFlashCardView.setAdapter(flashCardAdapter);

                mProgressBar.setMax(flashCardAdapter.getCount());
                mProgressBar.setProgress(0);

                final FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.floatingActionButton);
                fab.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        mFlashCardView.advance();
                        mProgressBar.incrementProgressBy(1);
                    }
                });

            }
        });
    }
}
