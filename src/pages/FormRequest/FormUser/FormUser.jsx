import './FormUser.css'
import { Divider, DatePicker, Button, Input, Select, Space, Form, Flex, Typography, Row, Col } from 'antd';
import { useState } from 'react';
const { Text, Title } = Typography;

function FormUser({ formUser: propFormUser, onChange }) {
        
    const [formUser, setFormUser] = new useState({
        namaKaryawan: '',
        deptKaryawan: '',
        jabtKaryawan: '',
        nikManager:'',
    })

    const managerOptions = [

        { value: 'TB000124', label: 'Samideri', },
        { value: 'TB000015', label: 'IWG Jaya Pramitha' },
        { value: 'TB000005', label: 'Denny Setiawan' }
    ]
    const handleInputChange = (field, value) => {
        const newFormUser = {
            ...propFormUser,
            [field]: value,
        };
        onChange(newFormUser);
    };

    return (
        <div className='top-padding-10p' >
            <Row>
                <Col flex='13%' className='form-min-width'>
                    <Title level={5} className='label-input'>
                        Diminta Oleh
                    </Title>
                </Col>
                <Col flex='auto'>

                    <Form.Item
                        name="namaKaryawan"
                        initialValue={formUser.namaKaryawan}
                        rules={[{ required: true, message: 'Mohon masukan Nama Pemohon' }]}>
                        <Input
                            id='namaKaryawan'
                            placeholder='Nama Karyawan'
                            defaultValue={formUser.namaPemohon}
                            onChange={(e) => handleInputChange('namaKaryawan', e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row className='top-padding-10p'>
                <Col flex='13%' className='form-min-width'>
                    <Title level={5} className='label-input'>
                        Departement
                    </Title>
                </Col>
                <Col flex='auto'>
                    <Form.Item
                        name="deptKaryawan"
                        initialValue={formUser.deptKaryawan}
                        rules={[{ required: true, message: 'Mohon masukan Departement Karyawan' }]}>
                        <Input
                            id='deptKaryawan'
                            placeholder='Departement'
                            defaultValue={formUser.namaPemohon}
                            onChange={(e) => handleInputChange('deptKaryawan', e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row className='top-padding-10p'>
                <Col flex='13%' className='form-min-width'>
                    <Title level={5} className='label-input'>
                        Jabatan
                    </Title>
                </Col>
                <Col flex='auto'>
                    <Form.Item
                        name="jabtKaryawan"
                        initialValue={formUser.jabtKaryawan}
                        rules={[{ required: true, message: 'Mohon masukan Jabatan Pemohon' }]}>
                        <Input
                            id='jabtKaryawan'
                            placeholder='Jabatan'
                            defaultValue={formUser.namaPemohon}
                            onChange={(e) => handleInputChange('jabtKaryawan', e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row><Row className='top-padding-10p'>
                <Col flex='13%' className='form-min-width'>
                    <Title level={5} className='label-input'>
                        Manager
                    </Title>
                </Col>
                <Col flex='auto' className='form-min-width'>
                    <Form.Item
                        name="nikManager"
                        initialValue={formUser.nikManager}
                        rules={[{ required: true, message: 'Mohon masukan Manager untuk Konfirmasi' }]}>
                        <Select
                            options={managerOptions}
                            style={{ width: '100%' }}
                            id='nikManager'
                            defaultValue={formUser.nikManager}
                            onChange={(value) => handleInputChange('nikManager', value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </div>

    );
}

export default FormUser