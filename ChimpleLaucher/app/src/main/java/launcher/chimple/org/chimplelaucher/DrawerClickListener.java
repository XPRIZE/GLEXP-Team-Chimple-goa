package launcher.chimple.org.chimplelaucher;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ComponentInfo;
import android.content.pm.PackageManager;
import android.view.View;
import android.widget.AdapterView;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class DrawerClickListener implements AdapterView.OnItemClickListener {
    Context mContext;
    Pac[] pacsForListener;
    PackageManager pmForListener;

    public DrawerClickListener(Context c, Pac[] pacs, PackageManager pm) {
        mContext = c;
        pacsForListener = pacs;
        pmForListener = pm;
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

        if(MainActivity.appLauchable) {
            Intent launchIntent = new Intent(Intent.ACTION_MAIN);
            launchIntent.addCategory(Intent.CATEGORY_LAUNCHER);
            ComponentName cp = new ComponentName(pacsForListener[i].packageName, pacsForListener[i].name);
            launchIntent.setComponent(cp);

            mContext.startActivity(launchIntent);
        }
    }
}
