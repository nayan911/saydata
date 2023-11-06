import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
  {
    name: 'Week 1',
    uv: 4000,
    pv: 9000,
    amt: 1000,
  },
  {
    name: 'Week 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Week 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Week 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const CustomBar = ({ x, y, width, height }) => (
  <g>
    <rect x={x} y={y} width={width} height={height} fill="#98D89E" rx={10} ry={10} />
    <Label value="" position="insideTop" />
  </g>
);

const CustomBar1 = ({ x, y, width, height }) => (
  <g>
    <rect x={x} y={y} width={width} height={height} fill="#EE8484" rx={10} ry={10} />
    <Label value="" position="insideTop" />
  </g>
);

const Chartgrapg = () => {
    return (
      <div className='chartgraph'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#98D89E"  barSize={40} shape={<CustomBar />} />
            <Bar dataKey="uv" fill="#EE8484"  barSize={40} shape={<CustomBar1 />}  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
}

export default Chartgrapg
