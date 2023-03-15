import React from 'react';
import {BarChart as RNBarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

type Props = {
  labels: string[];
  data: number[];
  color: string;
};

const BarChart: React.FC<Props> = ({data, labels, color}) => {
  return (
    <RNBarChart
      data={{
        labels,
        datasets: [
          {
            data,
          },
        ],
      }}
      yAxisSuffix=""
      yAxisLabel=""
      fromZero
      width={Dimensions.get('window').width - 55}
      height={350}
      withInnerLines={false}
      chartConfig={{
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        height: 5000,
        fillShadowGradient: color,
        fillShadowGradientOpacity: 1,
        color: () => color,
        labelColor: () => 'rgb(0, 0, 0)',
        barPercentage: 0.5,
        decimalPlaces: 0,
      }}
      showBarTops
      showValuesOnTopOfBars
      verticalLabelRotation={-85}
      xLabelsOffset={35}
    />
  );
};

export default BarChart;
