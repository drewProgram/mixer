import { Chart, Tooltip, Legend, View, Polygon, Point } from 'viser-react';
import $ from 'jquery';
const DataSet = require('@antv/data-set');

const scale = [
  {
    dataKey: 'longitude',
    sync: true,
  },
  {
    dataKey: 'latitude',
    sync: true,
  },
];

const userDataScale = [
  {
    dataKey: 'trend',
    alias: '每100位女性对应的男性数量',
  },
];

const view1Opts = {
  quickType: 'polygon',
  position: 'longitude*latitude',
  style: {
    fill: '#fff',
    stroke: '#ccc',
    lineWidth: 1,
  },
  tooltip: false,
};
const view2Opts = {
  quickType: 'polygon',
  position: 'longitude*latitude',
  opacity: 'value',
  color: ['trend', ['#F51D27', '#0A61D7']],
  tooltip: 'name*trend',
  animate: {
    leave: {
      animation: 'fadeOut',
    },
  },
};

export default class App extends React.Component {
  state = {
    geoData: [],
    data: [],
  };

  componentDidMount() {
    $.when(
      $.getJSON('/assets/data/worldGeo.json'),
      $.getJSON('/assets/data/map-2.json'),
    ).then((geoData, data) => {
      const worldMap = new DataSet.View().source(geoData[0], {
        type: 'GeoJSON',
      });

      const userDv = new DataSet.View()
        .source(data[0])
        .transform({
          geoDataView: worldMap,
          field: 'name',
          type: 'geo.region',
          as: ['longitude', 'latitude'],
        })
        .transform({
          type: 'map',
          callback: obj => {
            obj.trend = obj.value > 100 ? '男性更多' : '女性更多';
            return obj;
          },
        });
      this.setState({ geoData: worldMap, data: userDv });
    });
  }

  render() {
    const { geoData, data } = this.state;

    return (
      <div>
        <Chart forceFit height={400} padding={[20, 20]} scale={scale}>
          <Tooltip showTitle={false} />
          <Legend dataKey={'trend'} position={'left'} />
          <View data={geoData} scale={scale}>
            <Polygon {...view1Opts} />
          </View>
          <View data={data} scale={userDataScale}>
            <Polygon {...view2Opts} />
          </View>
        </Chart>
      </div>
    );
  }
}
