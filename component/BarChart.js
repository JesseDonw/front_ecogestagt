import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Colors } from '../constants/Colors';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BarChart = (props) => {
  const barWidth = 3.06;
  const barSpacing = 11;
  const cornerRadius = 3.06;

  const previousAnimatedValues = props.previousData.map(() => useSharedValue(0));
  const currentAnimatedValues = props.currentData.map(() => useSharedValue(0));

  useEffect(() => {
    props.previousData.forEach((value, index) => {
      previousAnimatedValues[index].value = withSpring(value, {
        damping: 10,
        stiffness: 100,
      });
    });

    props.currentData.forEach((value, index) => {
      currentAnimatedValues[index].value = withSpring(value, {
        damping: 10,
        stiffness: 100,
      });
    });
  }, [props.previousData, props.currentData]);

  const previousBars = props.previousData.map((value, index) => {
    const animatedProps = useAnimatedProps(() => ({
      height: previousAnimatedValues[index].value,
      y: 100 - previousAnimatedValues[index].value,
    }));

    return (
      <AnimatedRect
        key={`prev-${index}`}
        x={(barWidth + barSpacing) * index}
        width={barWidth}
        rx={cornerRadius}
        fill={Colors.blackGraph}
        animatedProps={animatedProps}
      />
    );
  });

  const currentBars = props.currentData.map((value, index) => {
    const animatedProps = useAnimatedProps(() => ({
      height: currentAnimatedValues[index].value,
      y: 100 - currentAnimatedValues[index].value,
    }));

    return (
      <AnimatedRect
        key={`curr-${index}`}
        x={(barWidth + barSpacing) * (index + props.previousData.length)}
        width={props.barWidth || barWidth}
        rx={props.cornerRadius || cornerRadius}
        fill={Colors.redGraph}
        animatedProps={animatedProps}
      />
    );
  });

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
    paddingBottom: 15,
  },
});

export default BarChart;