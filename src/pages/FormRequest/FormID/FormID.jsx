import { Button, Input, Select, Space, Form, Flex, Typography, Row, Col } from 'antd';
import { useState } from 'react';
import './FormID.css'
import Axios from 'axios'
import { useEffect } from 'react';
const { Text, Title } = Typography;

function FormID({ formId: propFormID, onChange }) {

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];
    const [monthFormID, setMonthFormID] = useState(0)
    useEffect(() => {
        var formIDURL = "https://" + window.location.hostname + ":5001/api/FormInfo/ID"
        Axios.get(formIDURL)
            .then(response => {
                setMonthFormID(response.data + 1)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            });
    }, []);
    
    const currentMonthIndex = new Date().getMonth()+1
    const currentYear = new Date().getFullYear()
    const handleInputChange = (field, value) => {
        const newFormId = {
            ...propFormID,
            [field]: value,
        };
        onChange(newFormId)
    };
    return (<Row gutter={8}>
        <Col flex='13%' className='min-label-width'>
            <Title level={5} className='label-input'>
                Nomor FPPK
            </Title>
        </Col>
        <Col flex='20%' className='min-input'>
            <Form.Item
                rules={[{ required: false, message: 'Mohon masukan Nomor PPK' }]}>
                {monthFormID && (
                    <Input defaultValue={monthFormID} onChange={(e) => handleInputChange('formID', e.target.value)} />
                )}
               
            </Form.Item>
        </Col>


        <Col flex='15%' className='min-input'>
            <Form.Item
                name="formType"
                value='FPPK'
                rules={[{ required: false, message: 'Mohon masukan Nomor PPK' }]}>
                <Input defaultValue='FPPK' onChange={(e) => handleInputChange('formType', e.target.value)}></Input>
            </Form.Item>
        </Col>
        <Col flex='10%' className='min-input'>
            <Form.Item
                name="kodeDept"
                value='GA'
                rules={[{ required: false, message: 'Mohon masukan Kode Dept' }]}>
                <Input defaultValue='GA' onChange={(e) => handleInputChange('formDept', e.target.value)}></Input>
            </Form.Item>
        </Col>
        <Col flex='10%' className='min-input'>
            <Form.Item
                name="kodeComp"
                value='TB'
                rules={[{ required: false, message: 'Mohon masukan Kode Perusahaan' }]}>
                <Input defaultValue='TB' onChange={(e) => handleInputChange('formCompany', e.target.value)}></Input>
            </Form.Item>
        </Col>
        <Col flex='auto' className='min-input'>
            <Form.Item
                name="formMonth"
                value={currentMonthIndex}
                rules={[{ required: false, message: 'Mohon masukan Bulan' }]}>
                <Select
                    options={months}
                    defaultValue={currentMonthIndex}
                    style={{ width: '100%' }}
                    onChange={(label) => handleInputChange('formMonth', label)}
                ></Select>
            </Form.Item>
        </Col>
        <Col flex='20%' className='min-input'>
            <Form.Item
                name="formYear"
                value={currentYear}
                rules={[{ required: false, message: 'Mohon masukan Tahun' }]}>
                <Input defaultValue={currentYear} onChange={(e) => handleInputChange('formYear', e.target.value)}></Input>
            </Form.Item>
        </Col>
    </Row>
        
                    
        
    );
}

export default FormID