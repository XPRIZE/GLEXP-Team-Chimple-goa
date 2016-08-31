package launcher.chimple.org.chimplelaucher;

import android.service.carrier.CarrierService;
import android.view.MotionEvent;
import android.view.View;
import android.widget.RelativeLayout;

/**
 * Created by shyamalupadhyaya on 27/08/16.
 */
public class AppTouchListener implements View.OnTouchListener {

    int leftMargin;
    int topMargin;

    public AppTouchListener() {
    }
    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        switch (motionEvent.getAction()) {
            case MotionEvent.ACTION_MOVE:
                RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(view.getWidth(), view.getHeight());
                leftMargin = (int) motionEvent.getRawX() - view.getWidth()/2;
                topMargin = (int) motionEvent.getRawY() - view.getHeight()/2;

                if(leftMargin + view.getWidth() > view.getRootView().getWidth()) {
                    leftMargin = view.getRootView().getWidth() - view.getWidth();
                }

                if (leftMargin < 0) {
                    leftMargin = 0;
                }

                if (topMargin + view.getHeight() >((View) view.getParent()).getHeight()) {
                    topMargin = ((View) view.getParent()).getHeight() - view.getHeight();
                }

                if (topMargin < 0) {
                    topMargin = 0;
                }



                lp.leftMargin =leftMargin;
                lp.topMargin =  topMargin;


                view.setLayoutParams(lp);
                break;
            case MotionEvent.ACTION_UP:
                view.setOnTouchListener(null);
                break;
        }
        return true;
    }
}
