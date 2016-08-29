package launcher.chimple.org.chimplelaucher;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.Serializable;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class Pac implements Serializable {
    private static final long serialVersionUID = -4322566871133353807L;
    transient Drawable icon;
    String name;
    String label;
    String packageName;
    int x , y;
    String iconLocation;
    boolean lanscape;

    public void cacheIcon(){
        if (iconLocation==null)
            new File(MainActivity.activity.getApplicationInfo().dataDir+"/cachedApps/").mkdirs();

        if (icon!=null){

            iconLocation = MainActivity.activity.getApplicationInfo().dataDir+"/cachedApps/" +packageName + name;
            FileOutputStream fos = null;
            try{
                fos = new FileOutputStream(iconLocation);
            }catch(FileNotFoundException e){
                e.printStackTrace();
            }

            if (fos!=null){
                Tools.drawableToBitmap(icon).compress(Bitmap.CompressFormat.PNG, 100, fos);
                try{
                    fos.flush();
                    fos.close();
                }catch(IOException e){
                    e.printStackTrace();
                }
            }else
                iconLocation = null;
        }

    }

    public Bitmap getCachedIcon(){
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = false;
        options.inPreferredConfig = Bitmap.Config.ARGB_8888;
        options.inDither = true;

        if (iconLocation !=null){
            File cachedIcon = new File(iconLocation);
            if (cachedIcon.exists()){
                return BitmapFactory.decodeFile(cachedIcon.getAbsolutePath(), options);
            }
        }

        return null;
    }

    public void addToHome(Context mContext, RelativeLayout homeViewForAdapter){
        RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT,android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.leftMargin = x;
        lp.topMargin = y;

        LayoutInflater li = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        LinearLayout ll = (LinearLayout) li.inflate(R.layout.drawer_item, null);

        if (icon == null){
            icon = new BitmapDrawable(mContext.getResources(),getCachedIcon());
        }

        ((ImageView)ll.findViewById(R.id.icon_image)).setImageDrawable(icon);

        ((TextView)ll.findViewById(R.id.icon_text)).setText(label);

        ll.setOnLongClickListener(new View.OnLongClickListener() {

            @Override
            public boolean onLongClick(View v) {
                v.setOnTouchListener(new AppTouchListener());
                return false;
            }
        });

        ll.setTag(this);
        ll.setOnClickListener(new AppClickListener(mContext));
        homeViewForAdapter.addView(ll, 0, lp);
    }

    public void deleteIcon(){
        if (iconLocation!=null)
            new File(iconLocation).delete();
    }
}
