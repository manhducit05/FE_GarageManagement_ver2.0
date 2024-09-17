import React, { useEffect, useState } from 'react';
import { Row, Col, Space } from 'antd';
import './error404.css'

function Error404() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/error404`);
        const json = await res.json();
        console.log(json)
        if (json.data != []) {
          setData(json.data[0]);
          data.description = data.description.replace(/<br>/g, "\n")
          console.log(data)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  return (
    <>
      {data ? (

        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Col>
            <div className="space-align-container">
              <div className="space-align-block">
                <Space align="center">
                  <div>
                    <img src={data.thumbnail} />
                    <p>{data.description}</p>
                  </div>
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      )
        : "Lỗi"
      }
    </>
  )

}
export default Error404