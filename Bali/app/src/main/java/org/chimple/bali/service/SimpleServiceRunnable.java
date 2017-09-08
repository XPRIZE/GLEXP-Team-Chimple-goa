package org.chimple.bali.service;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public abstract class SimpleServiceRunnable extends ServiceRunnable
{
    @Override
    public void executeFailure(Exception e)
    {
        // No-op
    }
}