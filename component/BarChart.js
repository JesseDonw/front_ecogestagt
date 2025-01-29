import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Colors } from '../constants/Colors';

const BarChart = (props) => {

  const barWidth = 3.06;
  const barSpacing = 11;
  const cornerRadius = 3.06;

  const previousBars = props?.previousData.map((value, index) => (
    <Rect
      key={`prev-${index}`}
      x={(barWidth + barSpacing) * index}
      y={100 - value}
      width={barWidth}
      height={value}
      rx={cornerRadius}
      fill={Colors.blackGraph}
    />
  ));

  const currentBars = props?.currentData.map((value, index) => (
    <Rect
      key={`curr-${index}`}
      x={(barWidth + barSpacing) * (index + props?.previousData.length)}
      y={100 - value}
      width={props?.barWidth}
      height={value}
      rx={props?.cornerRadius}
      fill={Colors.redGraph}
    />
  ));

  return (
    <View style={styles.container}>
      <Svg height="100" width="300">
        {previousBars}
        {currentBars}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15
  }
});

export default BarChart;