import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import LockUnlock from '../app/components/LockUnlock';

// Note: test renderer must be required after react-native ..
import renderer from 'react-test-renderer';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<LockUnlock />', () => {
    
    // checking component renders successfully ..
    it('rendering is successfull', () => {
            const lockUnlock = shallow(< LockUnlock />);
            expect(lockUnlock).toHaveLength(1);
       });


    // checking component properties
    it('checking what properties LockUnlock contains', () => {
            const lockUnlock = shallow(< LockUnlock />);

            // checking for touchableOpacity ..
            expect(lockUnlock.find(TouchableOpacity)).toHaveLength(1);

            // checking for text  ..
            expect(lockUnlock.find(Text)).toHaveLength(1);
        });

    // checking component props value
    it('checking values of my props', () => { 
        
            const lockUnlock = shallow(< LockUnlock />);

            //checking levelNo ..
            expect(lockUnlock.instance().props.levelNo).toBe(5);

            //checking isLock ..
            expect(lockUnlock.instance().props.isLock).toBe(true);
         });
});
  
