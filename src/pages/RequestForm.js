import React, { useState, useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import './RequestForm.css'

function RequestForm() {
    const currentDate = new Date().getDate().toString() +
        "/" + new Date().getMonth().toString() +
        "/" + new Date().getFullYear().toString()
    const currentYear = new Date().getFullYear()
    const currentMonthIndex = new Date().getMonth()      
    const months = ["Januari", "Febuari", "Maret", "April",
        "Mei", "Juni", "Juli", "Agustus", "September",
        "Oktober", "November", "Desember"]
    const jenisKebutuhan = ["Bangunan Baru", "Renovasi", "Lain-Lain", "Barang", "Jasa", "Lain-Lain"]
    const [checkBoxKebutuhan, setCheckBoxKebutuhan] = useState([false, false, false, false, false, false]);
    const handleCheckBoxChange = (index) => {
        const newCheckBoxKebutuhan = Array(jenisKebutuhan.length).fill(false);
        newCheckBoxKebutuhan[index] = !newCheckBoxKebutuhan[index];
        setCheckBoxKebutuhan(newCheckBoxKebutuhan);
    };
    const indices = Array.from({ length: 15 }, (_, index) => index);

    return (
        <>
            <Form>
                <h1 className='title-form'>Form Permintaan Pemenuhan Kebutuhan</h1>
                <Row className='row-border-around'>
                    <Form.Group as={Row} controlId='nomorFPPK'>
                        <Col sm={3} className='left-right-5p-padding'>
                            <Form.Label className='label-title left-10p-padding'>
                                Nomor FPPK
                            </Form.Label>
                        </Col>
                        <Col sm={2} className='left-right-5p-padding'>
                            <Form.Control readOnly defaultValue="-" />
                        </Col>

                        <Col sm={1} className='left-right-5p-padding'>
                            <Form.Control defaultValue="FPPK" />
                        </Col>
                        <Col sm={1} className='left-right-5p-padding'>
                            <Form.Control defaultValue="GA" />
                        </Col>
                        <Col sm={1} className='left-right-5p-padding'>
                            <Form.Control defaultValue="TB" />
                        </Col >
                        <Col sm={2} className='left-right-5p-padding'>
                            <Form.Select defaultValue={months[currentMonthIndex]}>
                                {months.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col sm={2}>
                            <Form.Control defaultValue={currentYear} />
                        </Col>
                    </Form.Group>
                </Row>
                <div className='row-border-around form-fppk'>
                    <Row>
                            <Form.Group as={Row} controlId='namaKebutuhan'>
                                <Col sm={3}>
                                    <Form.Label className='label-title'>
                                        Nama Kebutuhan
                                    </Form.Label>
                                </Col>
                                <Col sm={9} >
                                    <Form.Control placeholder="Keterangan" />
                                </Col>
                            </Form.Group>
                    </Row>
                        <Row>
                            <Col sm={3}>
                                <Form.Label className='label-title top-5p-padding'>
                                    Jenis Kebutuhan
                                </Form.Label>
                            </Col>
                            <Col sm={2} className='top-5p-padding'>
                                <Form.Label className='label-title'>
                                    Bangunan
                                </Form.Label>
                            </Col>
                            <Col className='top-10p-padding'>
                                {jenisKebutuhan.slice(0, 3).map((item, index) => (
                                    <Form.Check
                                        type="radio"
                                        id={`radio-${index}`}
                                        name="jenisKebutuhan"
                                        label={item}
                                        value={item}
                                        checked={checkBoxKebutuhan[index]}
                                        onChange={() => handleCheckBoxChange(index)} />
                                ))}
                            </Col>
                            <Col sm={2} className='top-5p-padding'>
                                <Form.Label className='label-title'>
                                    Pengadaan
                                </Form.Label>
                            </Col>
                            <Col className='top-10p-padding'>
                                {jenisKebutuhan.slice(3, 6).map((item, index) => (
                                    <Form.Check
                                        type="radio"
                                        id={`radio-${index + 3}`}
                                        name="jenisKebutuhan"
                                        label={item}
                                        value={item}
                                        checked={checkBoxKebutuhan[index + 3]}
                                        onChange={() => handleCheckBoxChange(index + 3)} />
                                ))}
                            </Col>
                        </Row>
                    <Row className='top-10p-margin'>
                            <Form.Group as={Row} controlId='namaKebutuhan'>
                                <Col sm={3}>
                                    <Form.Label className='label-title'>
                                        Tanggal Permintaan
                                    </Form.Label>
                                </Col>
                            <Col sm={9}>
                                <DatePicker className='date-picker-fill'/>
                                </Col>
                            </Form.Group>
                    </Row>
                    <Row className="top-10p-margin">
                        <Col sm={3}>
                            <Form.Label className='label-title'>Rincian Kebutuhan</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Label className='label-title'>:</Form.Label>
                        </Col>
                    </Row>
                    <Row className='table-padding'>
                        <Col>
                            <Table striped bordered hover size='sm' className='table-limit'>
                                <thead className='align-center-text'>
                                    <tr>
                                        <th>No</th>
                                        <th>Uraian Kebutuhan</th>
                                        <th>Jumlah</th>
                                        <th>Sat</th>
                                        <th>Spesifikasi/Detail</th>
                                    </tr>
                                </thead>
                                <tbody>{indices.map((index) => (
                                    <tr key={index}>
                                        <td className='align-center-text'>{index + 1}</td>
                                        <td contentEditable></td>
                                        <td contentEditable></td>
                                        <td contentEditable></td>
                                        <td contentEditable></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Col>

                    </Row>
                </div>
                <div className='row-border-around form-fppk '>


                    <Row className='top-10p-padding left-10p-padding right-30p-padding'>
                        <Col sm={3}>
                            <Form.Label className='label-title'>
                                NIK
                            </Form.Label>
                        </Col>
                        <Col sm={9} >
                            <Form.Control placeholder="NIK Karyawan" />
                        </Col>
                    </Row>
                    <Row className='top-10p-padding left-10p-padding right-30p-padding'>
                        <Col sm={3}>
                            <Form.Label className='label-title'>
                                Diminta Oleh
                            </Form.Label>
                        </Col>
                        <Col sm={9} >
                            <Form.Control placeholder="Nama Karyawan" />
                        </Col>
                    </Row>

                    <Row className='top-10p-padding left-10p-padding right-30p-padding'>
                        <Col sm={3}>
                            <Form.Label className='label-title'>
                                Departement
                            </Form.Label>
                        </Col>
                        <Col sm={9} >
                            <Form.Control placeholder="Departement" />
                        </Col>
                    </Row>



                    <Row className='top-10p-padding left-10p-padding right-30p-padding'>
                        <Col sm={3}>
                            <Form.Label className='label-title'>
                                Jabatan
                            </Form.Label>
                        </Col>
                        <Col sm={9} >
                            <Form.Control placeholder="Jabatan Karyawan" />
                        </Col>
                    </Row>
                    <Row className='button-padding'>
                        <Button variant='success'> Submit</Button>
                    </Row>
                </div>
            </Form>


        </>
    );
}

export default RequestForm;