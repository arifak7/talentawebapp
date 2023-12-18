import './FormList.css';
import { PlusOutlined, DownloadOutlined, CheckOutlined,CloseOutlined } from '@ant-design/icons';
import { Divider, DatePicker, Button, Input, Select, Space, Form, Flex, Typography, Row, Col } from 'antd';
import { useState } from 'react';
import  Axios  from 'axios';
import { useEffect } from 'react';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  FormDetail  from '../FormDetail/FormDetail'

const { Text, Title } = Typography;


function FormList({ onChange }) {


    const [formData, setFormData] = useState([])

    useEffect(() => {
        //Fetch data from the API using Axios

        var formPPKUrl = "https://" + window.location.hostname + ":5001/api/FormInfo"
        Axios.get(formPPKUrl)
            .then(response => {
                setFormData(response.data)
                onChange(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            });
    }, []);
    return(
        <div>
                {formData.map(item => (
                    <Row className='border-form'>
                    
                        <Col flex='80%' className='form-panel'>                            
                            <Row>
                                <Title level={3}><Link to={`/FormDetail/${item.form_id}`}>{item.form_id}</Link></Title>
                            </Row>
                            <Row>
                                <Title level={5}>{item.nama_karyawan}</Title>
                            </Row>
                            <Row>
                                <Text>{item.nama_kebutuhan}</Text>
                            </Row>

                            <Text>
                            </Text>
                        </Col>
                        <Col flex='auto' offset={2} className='margin-top-10p'>
                            <Space>
                                <Button type="primary" shape="circle" icon={<CheckOutlined />} size='large' />
                                <Button type="primary" shape="circle" icon={<CloseOutlined />} size='large' danger ></Button>
                            </Space>
                        </Col>
                </Row>
                ))}
           
            
        </div>
        
    );
}
export default FormList