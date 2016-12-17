package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import org.chimple.goa.R;
import org.cocos2dx.javascript.AppActivity;
/**
 * Created by Shyamal.Upadhyaya on 28/09/16.
 */

public class BootUpReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
            System.out.println("inside org.cocos2dx.javascript.BootUpReceiver BroadcastReceiver");
            Intent i = new Intent(context, AppActivity.class);  
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(i);  
    }
}