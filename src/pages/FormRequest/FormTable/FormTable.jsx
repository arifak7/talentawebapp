import React, { useState } from 'react';
import { Form, Row, Col, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { Button, Flex } from 'antd';
import { PlusCircleOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const originData = [];
for (let i = 0; i < 10; i++) {
    originData.push({
        key: i.toString(),
        nomor: `${i+1}`,
        uraian: '',
        jumlah: 0,
        satuan: '',
        spesifikasi: ''
    });
}
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Empty!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
function FormTable() {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            nomor: '',
            uraian: '',
            jumlah: 0,
            satuan: '',
            spesifikasi: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'No,',
            dataIndex: 'nomor',
            width: '5%',
        },
        {
            title: 'Uraian',
            dataIndex: 'uraian',
            width: '30%',
            editable: true,
        },
        {
            title: 'Jumlah',
            dataIndex: 'jumlah',
            width: '10%',
            editable: true,
        },
        {
            title: 'Satuan',
            dataIndex: 'satuan',
            width: '10%',
            editable: true,
        },
        {
            title: 'Spesifikasi',
            dataIndex: 'spesifikasi',
            width: '20%',
            editable: true,
        },
        {
            title: 'Add',
            dataIndex: 'operation',
            width: '10%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <CheckCircleTwoTone onClick={() => save(record.key)}
                            style={{
                                marginRight: 10,
                            }}
                            twoToneColor="#3ae869"
                        />
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <CloseCircleTwoTone twoToneColor="red" />
                        </Popconfirm>
                    </span>
                ) : (
                        <PlusCircleOutlined disabled={editingKey !== ''} onClick={() => edit(record)} />
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'jumlah' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Row >
                <Col span={24}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                        scroll={{ x: true }}
                    />
                </Col>
            </Row>
            
        </Form>
    );
};
export default FormTable;