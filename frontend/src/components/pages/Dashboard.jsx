import React, { Fragment } from 'react'
import { Hoc } from '../hoc/Hoc'
import '../../styles/pages/dashboard.scss'
import { Line, PolarArea, Bar } from 'react-chartjs-2';
import { Col, Container, Label, Row } from 'reactstrap';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Year 2023',
      data: [10, 2, 15, 24, 21, 12, 27],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Year 2022',
      data: [30, 23, 51, 23, 4, 5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const dataTwo = {
  labels: [2017, 2018, 2019, 2020, 2021, 2022],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 15, 20, 16, 9],
      backgroundColor: [
        'rgba(192, 69, 57, 0.5)',
        'rgba(159, 105, 168, 0.5)',
        'rgba(121, 171, 190, 0.5)',
        'rgba(206, 216, 113, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};


/* Chart Three Data */
export const optionsThree = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labelsThree = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const dataThree = {
  labels:labelsThree,
  datasets: [
    {
      fill: true,
      label: 'Dataset',
      data: [12, 19, 30, 20, 22, 9,18],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
/* Chart Three Data */

/* chart four data */
export const optionsFour = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labelsFour = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dataFour = {
  labels:labelsFour,
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 40, 90, 60,24,36],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 1',
    },
    {
      label: 'Dataset 2',
      data: [12, 19, 3, 20, 22, 9,30],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 2',
    },
    {
      label: 'Dataset 3',
      data: [40, 20, 70, 30, 35, 47,21],
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 3',
    },
  ],
}
/* chart four data */
const Dashboard = () => {
  return (
    <Fragment>
      <Container fluid className='p-3'>
        <Row>
          <Col xs={12} md={6}>
            <div className='dashboard_chartOne d-inline-block border border-2 border-black m-2 rounded-2'>
              <Label className='label-dashboar'>Sales Report Year</Label>
              <Line data={dataThree} option={optionsThree} />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className='dashboard_chartOne d-inline-block border border-2 border-black m-2 rounded-2'>
              <Label className='label-dashboar'>Expense Report Year 2023</Label>
              <Bar data={dataFour} options={optionsFour} />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className='dashboard_chartTwo d-inline-block border border-2 border-black m-2 rounded-2 p-2'>
              <Label className='label-dashboar'>Purchase Report Year 2023</Label>
              <PolarArea data={dataTwo} />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className='dashboard_chartOne d-inline-block border border-2 border-black m-2 rounded-2'>
              <Label className='label-dashboar'>Revenue Report Year 2023</Label>
              <Line data={data} option={options} />
            </div>
          </Col>
        </Row>
        <div><h1>Company Data (Year 2023)</h1></div>
        <Row className='g-0 bottom_row'>
          <Col xs={6} md={3}>
            <div className='revenue'>Total Revenue</div>
            <div className='revenue_bottom'>20 Million Rupees</div>
          </Col>
          <Col xs={6} md={3}>
            <div className='revenue'>Total Expense</div>
            <div className='revenue_bottom'>30 Million Rupees</div>
          </Col>
          <Col xs={6} md={3}>
            <div className='revenue'>Total Sales</div>
            <div className='revenue_bottom'>2 Million Products</div>
          </Col>
          <Col xs={6} md={3}>
            <div className='revenue'>Total Purchase</div>
            <div className='revenue_bottom'>1.8 Million Products</div>
          </Col>
        </Row>
      </Container>
    </Fragment >
  )
}

export default Hoc(Dashboard)