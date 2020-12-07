import { useEffect, useState } from 'react';
import axios from 'axios';

import { Slider, Card } from 'antd';

import menuOptions from '@/components/SidebarData';
import { IProject } from '@/types';
import api from '@/services/api';

// const marks = {
//   0: '0°C',
//   26: '26°C',
//   37: '37°C',
//   100: {
//     style: {
//       color: '#f50',
//     },
//     label: <strong>100°C</strong>,
//   },
// };

const Project = () => {
  const minDate = 0;
  const maxDate = 100;

  const [project, setProject] = useState({} as IProject);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const p = menuOptions.find(
  //     project => project.path === `/projects/a-garota-da-moto-2-temporada`,
  //   );
  //   (async function getProject() {
  //     const response = await api.get(`projects/${p?.id}`);
  //     setProject(response.data);
  //     minDate = Date.parse(project.contracts.constraints.dttm[0]);
  //     maxDate = Date.parse(project.contracts.constraints.dttm[1]);
  //     setLoading(false);
  //   })();
  // }, []);

  // 86400000

  return loading ? (
    <div>Carregando...</div>
  ) : (
    <>
      <Slider range min={minDate} max={maxDate} step={1}></Slider>

      <Card
        // title={project.summary.title}
        title="teste"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>

      <div id="chart"></div>
    </>
  );
};

export default Project;
