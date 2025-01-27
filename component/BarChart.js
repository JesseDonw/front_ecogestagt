import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Colors } from '../constants/Colors';

const BarChart = (props) => {
  const previousData = [20, 30, 40, 35, 50, 45, 10, 5, 15, 10, 20, 15, 12, 18];
  const currentData = [10, 15, 20, 25, 30, 35, 40];

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
      x={(props?.barWidth + props?.barSpacing) * (index + props?.previousData.length)}
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
    padding: 20,
    paddingTop: 15
  }
});

export default BarChart;