import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './error404.css'

function Error404() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL_ADMIN;

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

  const handleBack = () => {
    navigate("/admin");
  }

  return (
    <>
      {data ? (

        <Row justify="center" align="middle" style={{ height: '100vh' }}>
          <Col>
            <div class="content">
              <img src={data.thumbnail} />
              <h3>{data.description}</h3>
              <Button class="primary btnBackError404" onClick={() => handleBack()} style={{ background: 'linear-gradient(135deg, #6253e1, #04befe)' }}>
                Quay về trang chủ
              </Button>
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