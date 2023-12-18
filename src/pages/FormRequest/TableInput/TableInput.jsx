import React, { useState } from 'react';
import './TableInput.css';
import Table from 'react-bootstrap/Table';
import { Input, InputNumber } from 'antd';

function TableInput({ formInput: propFormInput, onChange }) {
    const [formInput, setFormInput] = useState(Array.from({ length: 10 }, () => ({ uraian: '', jumlah: null, satuan: '', spesifikasi: '' })));

    const handleRowChange = (index, field, value) => {
        const newRows = [...formInput]
        newRows[index][field] = value
        onChange(newRows)
    };

    return (
        <div className='table-container'>
            <Table bordered hover size='sm' className='' scroll={{ x: true }}>
                <thead className='align-center-text'>
                    <tr>
                        <th style={{ width: '7%' }}>No</th>
                        <th style={{ width: '30%' }}>Uraian Kebutuhan</th>
                        <th style={{width: '12%' }}>Jumlah</th>
                        <th style={{ width: '20%' }}>Satuan</th>
                        <th style={{ width: '31%' }}>Spesifikasi/Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {formInput.map((row, index) => (
                        <tr key={index}>
                            <td className='align-center-text'>{index + 1}</td>
                            <td>
                                <Input
                                    bordered={false}
                                    className='table-input-width'
                                    value={row.description}
                                    onChange={(e) => handleRowChange(index, 'uraian', e.target.value)}
                                />
                            </td>
                            <td>
                                <InputNumber
                                    min={0}
                                    max={2147483647}
                                    bordered={false}
                                    className='table-input-width'
                                    value={row.quantity}
                                    onChange={(value) => handleRowChange(index, 'jumlah', value)}
                                />
                            </td>
                            <td>
                                <Input
                                    bordered={false}
                                    className='table-input-width'
                                    value={row.unit}
                                    onChange={(e) => handleRowChange(index, 'satuan', e.target.value)}
                                />
                            </td>
                            <td>
                                <Input
                                    bordered={false}
                                    className='table-input-width'
                                    value={row.specification}
                                    onChange={(e) => handleRowChange(index, 'spesifikasi', e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TableInput;
