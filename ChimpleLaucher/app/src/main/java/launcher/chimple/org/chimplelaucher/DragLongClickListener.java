package launcher.chimple.org.chimplelaucher;

import android.content.Context;
import android.content.res.Configuration;
import android.media.Image;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.SlidingDrawer;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class DragLongClickListener implements AdapterView.OnItemLongClickListener {
    Context mContext;
    SlidingDrawer mSlidingDrawer;
    RelativeLayout mHomeViewLayout;
    Pac[] pacsForListener;

    public DragLongClickListener(Context c, SlidingDrawer slidingDrawer, RelativeLayout homeViewLayout, Pac[] pacs) {
        mContext = c;
        mSlidingDrawer = slidingDrawer;
        mHomeViewLayout = homeViewLayout;
        pacsForListener = pacs;
    }

    @Override
    public boolean onItemLongClick(AdapterView<?> adapterView, View view, int i, long l) {
        MainActivity.appLauchable = false;
        AppSerializableData objectData = SerializationTools.loadSerializedData();

        if (objectData == null) {
            objectData = new AppSerializableData();
        }

        if (objectData.apps == null) {
            objectData.apps = new ArrayList<Pac>();
        }

        Pac pacToAdd = pacsForListener[i];
        pacToAdd.x = (int) view.getX();
        pacToAdd.y = (int) view.getY();
        if (MainActivity.activity.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
            pacToAdd.lanscape = true;
        }
        else {
            pacToAdd.lanscape = false;
        }

        pacToAdd.cacheIcon();
        objectData.apps.add(pacToAdd);
        SerializationTools.serializeData(objectData);
        pacToAdd.addToHome(mContext, mHomeViewLayout);

        mSlidingDrawer.animateClose();
        mSlidingDrawer.bringToFront();


        return false;
    }
}
