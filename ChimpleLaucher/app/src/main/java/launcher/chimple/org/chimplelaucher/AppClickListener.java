package launcher.chimple.org.chimplelaucher;


import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class AppClickListener implements View.OnClickListener {
    Context mContext;

    public AppClickListener(Context c) {
        mContext = c;
    }
    @Override
    public void onClick(View view) {

        Pac data;
        data= (Pac) view.getTag();

        Intent launchIntent = new Intent(Intent.ACTION_MAIN);
        launchIntent.addCategory(Intent.CATEGORY_LAUNCHER);
        ComponentName cp = new ComponentName(data.packageName,data.name);
        launchIntent.setComponent(cp);
        mContext.startActivity(launchIntent);
    }
}
