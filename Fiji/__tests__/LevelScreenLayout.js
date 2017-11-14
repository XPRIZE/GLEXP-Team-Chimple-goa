import { Text, ScrollView } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Enzyme, { shallow } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import LevelScreenLayout from '../app/components/LevelScreenLayout'

describe('<LevelScreenLayout />', () => {
    
        
        it('The rendering is correctly', () => {
        
            const levelScreenLayout = shallow(<LevelScreenLayout />);

            expect(levelScreenLayout).toHaveLength(1);
            
            // ScrollView is the only child for inital unit testing ..
            expect(levelScreenLayout.find(ScrollView)).toHaveLength(1);
            console.log('The children is rendering correctly  '+levelScreenLayout);
        });    


        it(' check the childrens are passing or not ... ',() => {

            const levelScreenLayout = shallow(<LevelScreenLayout />);

            let childrenPropStatus = levelScreenLayout.childAt(0).children().exists();

            if(childrenPropStatus){
                console.log('The childrens are available at ScrollView');
            }
            else{
                console.log('The childrens are Not available at ScrollView');
            }

        });
    });