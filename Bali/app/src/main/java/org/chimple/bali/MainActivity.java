package org.chimple.bali;

import android.content.ComponentName;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void sendMessage(View view) {
        // Do something in response to button
        ComponentName componentName = new ComponentName("org.chimple.goa", "org.cocos2dx.cpp.AppActivity");
        Intent intent = new Intent();
        intent.setComponent(componentName);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        view.getContext().startActivity(intent);
    }

}
