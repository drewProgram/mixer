import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Row, Col, Slider, Card, Timeline, Table, Tag, Space } from 'antd';

import menuOptions from '@/components/SidebarData';
import { IProject } from '@/types';
import api from '@/services/api';
import WorldChart from '@/components/WorldChart';

import { StepsContainer } from '@styles/Project';

const { Column } = Table;

const Project = props => {
  const router = useRouter();

  const [project, setProject] = useState({} as IProject);
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(0);
  const [digitalMedia, setDigitalMedia] = useState<object[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const project = menuOptions.find(project => project.path === router.asPath);

    (async function getProject() {
      const response = await api.get(`projects/${project?.id}`);
      const _p = response.data;
      setProject(_p);
      setLoading(false);
      setMinDate(Date.parse(_p.contracts.constraints.dttm[0]));
      setMaxDate(Date.parse(_p.contracts.constraints.dttm[1]));

      const digitalData = [
        {
          key: '1',
          visualizationType: 'FVOD',
          regions: _p.contracts.constraints.medias.digital.fvod,
        },
        {
          key: '2',
          visualizationType: 'SVOD',
          regions: _p.contracts.constraints.medias.digital.svod,
        },
        {
          key: '3',
          visualizationType: 'TVOD',
          regions: _p.contracts.constraints.medias.digital.tvod,
        },
        {
          key: '4',
          visualizationType: 'VOD',
          regions: _p.contracts.constraints.medias.digital.vod,
        },
      ];

      setDigitalMedia(digitalData);
    })();
  }, [router.asPath]);

  console.log(maxDate);
  return loading ? (
    <div>Carregando...</div>
  ) : (
    <>
      <Slider
        range
        min={minDate}
        max={maxDate}
        defaultValue={[minDate, maxDate]}
      />

      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Card
            title={project.summary.title}
            extra={<a href="#">Mais</a>}
            style={{ maxWidth: 400 }}
          >
            <p>Empresa: {project.summary.distribution[0]}</p>
            <p>Formato: {project.summary.format}</p>
            <p>Produtora: {project.summary.producer}</p>
            <p>Co-Produtora: {project.summary.co_producer}</p>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}></Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <StepsContainer>
            <strong>Próximos passos</strong>
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </StepsContainer>
        </Col>
        <Col className="gutter-row" span={6}>
          <Table dataSource={digitalMedia} pagination={false}>
            <Column
              title="Tipo Visualização"
              dataIndex="visualizationType"
              key="visualizationType"
            />
            <Column
              title="Regiões"
              dataIndex="regions"
              key="regions"
              render={tags => (
                <>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
          </Table>
        </Col>
      </Row>

      {/* <WorldChart /> */}
    </>
  );
};

export default Project;
