import React from 'react'
import { Card, Col, Row } from 'reactstrap'
import style from './dashboard.module.css'

const Home = ({data,supply}) => {
  return (
    <React.Fragment>
      <div className={style.container}>
        <Row>
          <Col>
            <Card className={style.card1}>
              <span>Total Customer</span>
              <p>{data.length}</p>
            </Card>
          </Col>

          <Col>
            <Card className={style.card2}>
              <span>Pending Job</span>
                <p>{supply.length}</p>
            </Card>
          </Col>
          <Col>
            <Card className={style.card3}>
              <span>Claimed Job</span>
              <p>34</p>
            </Card>
          </Col>
          <Col>
            <Card className={style.card4}>
              <span>Ready Job</span>
              <p>34</p>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Home
