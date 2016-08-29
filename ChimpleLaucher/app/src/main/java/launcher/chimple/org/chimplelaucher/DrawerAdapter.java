package launcher.chimple.org.chimplelaucher;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class DrawerAdapter extends BaseAdapter {

    Context mContext;
    Pac[]  pacArrayForAdapter;

    public DrawerAdapter(Context c, Pac pacs[]) {
        this.mContext = c;
        this.pacArrayForAdapter = pacs;
    }

    @Override
    public int getCount() {
        return pacArrayForAdapter.length;
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    static class ViewHolder {
        TextView text;
        ImageView icon;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        ViewHolder viewHolder;
        LayoutInflater li = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if(view == null) {
            view = li.inflate(R.layout.drawer_item, null);
            viewHolder = new ViewHolder();
            viewHolder.text = (TextView) view.findViewById(R.id.icon_text);
            viewHolder.icon  = (ImageView) view.findViewById(R.id.icon_image);
            view.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) view.getTag();
        }

        viewHolder.icon.setImageDrawable(pacArrayForAdapter[i].icon);
        viewHolder.text.setText(pacArrayForAdapter[i].label);

        return view;
    }
}
