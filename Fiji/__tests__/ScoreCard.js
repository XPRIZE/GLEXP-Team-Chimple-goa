import { Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import App from '../App';

import ScoreCard from '../app/components/ScoreCard';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<ScoreCard />',() =>{
    it('The button rendring is positive',()=>{

     const  component = shallow(<ScoreCard />);
        
      expect(component).toHaveLength(1);
    });

    it('Check the childrens count', () => {
  
        const component = shallow(<ScoreCard />);
   
         expect(component.find(Text)).toHaveLength(5);
    });
    it('Check the lenth of Image',()=>{

        const component =shallow(<ScoreCard />);

        expect(component.find(Image)).toHaveLength(1);
    });
});