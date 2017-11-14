package org.chimple.bali.activity;

import android.content.Intent;
import android.graphics.drawable.AnimationDrawable;
import android.provider.ContactsContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import org.chimple.bali.R;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.launcher.LauncherScreen;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.TollBroadcastReceiver;

public class CoinRewardActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_coin_reward);
    }

    @Override
    protected void onResume() {
        super.onResume();
        ImageView imageView = (ImageView) findViewById(R.id.piggy);
        imageView.setBackgroundResource(R.drawable.piggy_in);
        AnimationDrawable piggy_in = (AnimationDrawable) imageView.getBackground();
        piggy_in.start();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onResume", "org.chimple.bali");
        sendBroadcast(intent);
    }

    public void goToHome(View view) {
        Intent intent = new Intent(this, LauncherScreen.class);
        startActivity(intent);
    }

    @Override
    protected void onPause() {
        super.onPause();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onPause", "org.chimple.bali");
        sendBroadcast(intent);
    }
}