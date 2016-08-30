package launcher.chimple.org.chimplelaucher;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by shyamalupadhyaya on 28/08/16.
 */
public class AppSerializableData implements Serializable {
    private static final long serialVersionUID = -7686982243938769284L;

    List<Pac> apps = new ArrayList<Pac>();
}
