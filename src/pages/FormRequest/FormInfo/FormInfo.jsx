import React, { useState } from 'react';
import './FormInfo.css';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, DatePicker, Button, Input, Select, Space, Form, Flex, Typography, Row, Col } from 'antd';

const { Text, Title } = Typography;

function FormInfo({ formData: propFormData, onChange }) {
    const [form] = Form.useForm();
    const validateFields = async () => {
        try {
            await form.validateFields();
            // All fields are valid, proceed with form submission
            console.log('All fields are valid');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };
    const [jenisKebutuhan, setJenisKebutuhan] = useState()
    const jenisKebutuhanOptions = [
        {
            label: 'Bangunan', options: [
                { value: 1, label: 'Bangunan Baru',},
                { value: 2, label: 'Renovasi' },
                { value: 3, label: 'Lain lain' }
            ]
        },
        {
            label: 'Pengadaan', options: [
                { value: 4, label: 'Barang' },
                { value: 5, label: 'Jasa' },
                { value: 6, label: 'Lain lain' }
            ]
        }
    ];

    const handleInputChange = (field, value) => {
        const newFormData = {
            ...propFormData,
            [field]: value,
        };
        if (field == 'jenisKebutuhan') {
            setJenisKebutuhan(value)
        }
        onChange(newFormData);
    };

    return (
        <div>
            <Row gutter={8} className='form-input-divider'>
                <Col flex='13%' className='form-min-width'>
                    <Title level={5} className='label-input'>
                        Nama Kebutuhan
                    </Title>
                </Col>
                <Col flex='auto'>
                    <Form.Item
                        name="namaKebutuhan"
                        initialValue={propFormData.namaKebutuhan}
                        rules={[{ required: true, message: 'Please enter Nama Kebutuhan' }]}>
                        <Input
                            id='namaKebutuhan'
                            onChange={(e) => handleInputChange('namaKebutuhan', e.target.value)
                            }
                            help='status'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={8} className='form-input-divider'>
                <Col flex='13%' className='form-min-width' >
                    <Title level={5} className='label-input'>
                        Jenis Kebutuhan
                    </Title>
                </Col>
                <Col flex='auto' >
                    <Form.Item
                        name="jenisKebutuhan"
                        initialValue={propFormData.jenisKebutuhan}
                        rules={[{ required: true, message: 'Please select Jenis Kebutuhan' }]}>
                        <Select
                            options={jenisKebutuhanOptions}
                            style={{ width: '100%' }}
                            id='jenisKebutuhan'
                            defaultValue={propFormData.jenisKebutuhan}
                            onChange={(value) => handleInputChange('jenisKebutuhan', value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {jenisKebutuhan == 3 || jenisKebutuhan == 6 ? (<Row gutter={8} className='form-input-divider'>
                <Col flex='13%' >
                </Col>
                <Col flex='auto'>
                    <Input
                        id='detailKebutuhan'
                        placeholder='detail kebutuhan'
                        defaultValue={propFormData.detailKebutuhan}
                        onChange={(e) => handleInputChange('detailKebutuhan', e.target.value)}
                    />
                </Col>
            </Row>) : null}
            
            <Row gutter={8} className='form-input-divider'>
                <Col flex='13%' className='form-min-width-160'>
                    <Title level={5} className='label-input'>
                        Tanggal Permintaan
                    </Title>
                </Col>
                <Col flex='auto'>
                    <Form.Item
                        name="tanggalPermintaan"
                        initialValue={propFormData.tanggalPermintaan}
                        rules={[{ required: true, message: 'Please masukan Tanggal Permintaan' }]}>
                    <DatePicker
                        id='tanggalPermintaan'
                        style={{ width: '100%' }}
                            defaultValue={propFormData.tanggalPermintaan}
                        format="YYYY-MM-DD"
                        onChange={(value, dateString) => handleInputChange('tanggalPermintaan', dateString) }
                        />
                    </Form.Item>
                </Col>
                <Col flex='13%' className='form-min-width-160'>
                    <Title level={5} className='label-input'>
                        Tanggal Pembelian
                    </Title>
                </Col>
                <Col flex='auto'>
                    <Form.Item
                        name="tanggalPembelian"
                        initialValue={propFormData.tanggalPembelian}
                        rules={[{ required: true, message: 'Please masukan Tanggal Pembelian (Jika belum dibeli, masukan Tanggal Sekarang)' }]}>
                    <DatePicker
                        id='tanggalPembelian'
                        style={{ width: '100%' }}
                            defaultValue={propFormData.tanggalPembelian}
                        format="YYYY-MM-DD"
                        onChange={(value, dateString) => handleInputChange('tanggalPembelian', dateString)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/* Add a button or any other action to submit the form data */}
        </div>
    );
}

export default FormInfo;
