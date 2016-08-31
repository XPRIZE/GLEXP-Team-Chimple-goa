package launcher.chimple.org.chimplelaucher;

import android.content.Context;
import android.content.Intent;
import android.view.View;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class ShortcutClickListener implements View.OnClickListener {
    Context mContext;

    public ShortcutClickListener(Context ctxt){
        mContext = ctxt;
    }

    @Override
    public void onClick(View v) {
        // TODO Auto-generated method stub
        Intent data;
        data= (Intent) v.getTag();
        mContext.startActivity(data);

    }

}