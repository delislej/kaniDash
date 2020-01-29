import React from 'react';
import {Component} from 'react';
import {Grid} from 'rsuite'
import {Row} from 'rsuite'
import {Panel} from 'rsuite'
import {Col} from 'rsuite'
class TotalsBar extends Component {




    render() {
        return (
            <div>
                <Grid fluid>
                <Row gutter={10} >
                    <Col xs={0} sm={1} md={2} ></Col>
                    <Col xs={24}  sm={4} md={4}><Panel style={{ maxHeight:60, backgroundColor: '#4d79ff'}} >

                        <p style={{color: 'black'}}>Apprentice:{this.props.data[0]}</p>

                    </Panel></Col>
                    <Col xs={24}  sm={4} md={4}><Panel style={{ maxHeight:60, backgroundColor: '#348744'}} >

                        <p style={{color: 'black'}}>Guru:{this.props.data[1]}</p>

                    </Panel></Col>
                    <Col xs={24}   sm={4} md={4}><Panel style={{ maxHeight:60, backgroundColor: '#9f9f31'}} >

                        <p style={{color: 'black'}}>Master:{this.props.data[2]}</p>

                    </Panel></Col>
                    <Col xs={24}   sm={4} md={4}><Panel style={{ maxHeight:60, backgroundColor: '#8f572d'}} >

                        <p style={{color: 'black'}}>Enlightened:{this.props.data[3]}</p>

                    </Panel></Col>
                    <Col xs={24}  sm={4} md={4} ><Panel style={{ maxHeight:60, backgroundColor: '#ac3737'}} >

                        <p style={{color: 'black'}}>Burned:{this.props.data[4]}</p>

                    </Panel></Col>
                    <Col xs={0}  sm={1} md={2} ></Col>

                </Row>
                </Grid>
            </div>
        );
    }
}
export default TotalsBar;
