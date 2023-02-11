import { Plot2 as Plot, Plot2 } from './grammars/gog/Plot';
import { SVG } from '../components/SVG';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import _ from 'lodash';
import { Circle, Col, Connector, Group, Padding, Rect, Ref, Row } from '../main';
import { NewDot } from './grammars/gog/marks/NewDot';
import { NewLine } from './grammars/gog/marks/NewLine';
import { lookup, useBluefishSymbolContext, useName, useNameList, withBluefish } from '../bluefish';
import { Text } from '../components/Text';
import { Axis } from './grammars/gog/marks/Axis';
import { NewAxis } from './grammars/gog/marks/NewAxis';
import { ticks } from 'd3-array';
import { AlignNew } from '../components/AlignNew';
import { Anchors, PointLabel } from '../components/Label/PointLabel';

type tempSchema = {
  city: string;
  temperature: number;
  month: number;
}[];

const temps: tempSchema = [
  { city: 'Chicago', temperature: 27, month: 1 },
  { city: 'Chicago', temperature: 30, month: 2 },
  { city: 'Chicago', temperature: 39, month: 3 },
  { city: 'Chicago', temperature: 49, month: 4 },
  { city: 'Chicago', temperature: 59, month: 5 },
  { city: 'Chicago', temperature: 70, month: 6 },
  { city: 'Chicago', temperature: 76, month: 7 },
  { city: 'Chicago', temperature: 75, month: 8 },
  { city: 'Chicago', temperature: 67, month: 9 },
  { city: 'Chicago', temperature: 55, month: 10 },
  { city: 'Chicago', temperature: 43, month: 11 },
  { city: 'Chicago', temperature: 32, month: 12 },
  { city: 'Phoenix', temperature: 55, month: 1 },
  { city: 'Phoenix', temperature: 59, month: 2 },
  { city: 'Phoenix', temperature: 65, month: 3 },
  { city: 'Phoenix', temperature: 73, month: 4 },
  { city: 'Phoenix', temperature: 82, month: 5 },
  { city: 'Phoenix', temperature: 92, month: 6 },
  { city: 'Phoenix', temperature: 95, month: 7 },
  { city: 'Phoenix', temperature: 93, month: 8 },
  { city: 'Phoenix', temperature: 88, month: 9 },
  { city: 'Phoenix', temperature: 76, month: 10 },
  { city: 'Phoenix', temperature: 63, month: 11 },
  { city: 'Phoenix', temperature: 55, month: 12 },
];

const legend = [
  { color: '#5ca3d1', title: 'Chicago' },
  { color: '#7c9834', title: 'Phoenix' },
];

type Legend = {
  color: string;
  title: string;
};

export type ChartLegendProps = {
  items: Legend[];
};

const xScale = (width: number) => scaleLinear([0, 13], [0, width]);
const yScale = (height: number) => scaleLinear([0, 100], [height, 0]);

const ChartLegend = withBluefish((props: ChartLegendProps) => {
  const circle = useNameList(props.items.map((item) => `circle-${item.title}`));
  const legend = useNameList(props.items.map((item) => `legend-${item.title}`));

  return (
    <Col spacing={5} alignment={'center'}>
      {props.items.map((item, ind) => (
        <AlignNew>
          <Circle name={circle[ind]} guidePrimary={'centerRight'} r={3} color={item.color} cx={0} cy={0} />
          <Padding all={5}>
            <Text name={legend[ind]} guidePrimary={'centerLeft'} contents={item.title} />
          </Padding>
        </AlignNew>
      ))}
    </Col>
  );
});

export const ChartAccent: React.FC<{}> = withBluefish(() => {
  const line1 = useName('line1');
  const line2 = useName('line2');
  const freezing = useName('freezing');
  const chicagoAvgRef = useName('chicagoAverage');
  // const dots = useName('dots');
  const phoenixDots = useName('phoenixDots');

  const chicagoTemps = temps.filter((temp) => temp.city === 'Chicago');
  const phoenixTemps = temps.filter((temp) => temp.city === 'Phoenix');

  const chicagoAvg = chicagoTemps.reduce((prev, cur) => prev + cur.temperature / (chicagoTemps.length * 1.0), 0);

  return (
    <SVG width={1000} height={1000}>
      <Col spacing={5} alignment={'center'}>
        <Padding left={10} top={10} right={10} bottom={20}>
          <Text contents={'Average Monthly Temperature'} />
        </Padding>
        <Row spacing={10} alignment={'top'}>
          <Padding left={30} top={10} right={30} bottom={10}>
            <Plot
              height={400}
              width={800}
              data={temps}
              x={({ width }) =>
                () =>
                  xScale(width)}
              y={({ height }) =>
                () =>
                  yScale(height)}
              color={() => () => 'black'}
            >
              <NewLine
                name={line1}
                x={'month'}
                y={'temperature'}
                color={'#5ca3d1'}
                data={chicagoTemps}
                curved={false}
              />
              <NewDot x={'month'} y={'temperature'} color={'#5ca3d1'} stroke={'#5ca3d1'} data={chicagoTemps} />
              <NewDot
                x={'month'}
                y={'temperature'}
                color={'#5ca3d1'}
                stroke={'black'}
                data={chicagoTemps.filter((data) => data.temperature < 32)}
                label={'temperature'}
              />
              <NewLine
                name={line2}
                x={'month'}
                y={'temperature'}
                color={'#7c9834'}
                data={phoenixTemps}
                curved={false}
              />
              <NewDot name={phoenixDots} x={'month'} y={'temperature'} color={'#eaf3d9'} data={phoenixTemps} />
              <NewLine
                name={freezing}
                x={'month'}
                y={'temperature'}
                color={'black'}
                stroke={'1'}
                data={[
                  { temperature: 32, month: 0 },
                  { temperature: 32, month: 13 },
                ]}
              />
              <NewDot
                x={'month'}
                y={'temperature'}
                color={'#f0b14f'}
                stroke={'#a16c00'}
                data={temps.filter((data) => {
                  return data.month >= 11;
                })}
                label={{ field: 'temperature', avoid: [line1, line2] }}
              />
              <Connector $from={'center'} $to={'center'}>
                <Ref to={lookup(phoenixDots, 'dot-0')} />
                <Text guidePrimary={'center'} contents={'test'} fontSize={'8pt'} />
              </Connector>
              {/* <PointLabel
                texts={[
                  {
                    label: <Text contents={'test'} fontSize={'8pt'} />,
                    ref: <Ref to={lookup(phoenixDots, 'dot-0')} />,
                  },
                ]}
                compare={undefined}
                offset={[1]}
                anchor={Anchors}
                avoidElements={[]}
                avoidRefElements
                padding={0}
              /> */}
              {/* <PointLabel
                texts={[
                  {
                    label: <Text contents={'Freezing Point: 32'} />,
                    ref: <Ref to={freezing} />,
                  },
                ]}
                compare={undefined}
                offset={[1]}
                anchor={Anchors}
                avoidElements={[]}
                avoidRefElements
                padding={0}
              /> */}

              <NewLine
                name={chicagoAvgRef}
                x={'month'}
                y={'temperature'}
                color={'#5ca3d1'}
                stroke={'1'}
                data={[
                  { temperature: chicagoAvg, month: 0 },
                  { temperature: chicagoAvg, month: 13 },
                ]}
              />
              <NewAxis x={'month'} y={'temperature'} color={'black'} ticks={Array.from(Array(14).keys())} axis={'x'} />
              <NewAxis x={'month'} y={'temperature'} color={'black'} ticks={ticks(0, 100, 10)} axis={'y'} />
            </Plot>
          </Padding>
          <Group>
            <ChartLegend items={legend} />
          </Group>
        </Row>

        {/* <Rect width={100} height={100} fill={'red'} /> */}
      </Col>
    </SVG>
  );
});
