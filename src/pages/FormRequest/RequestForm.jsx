import { Col,Alert, Button, Form, Row, Flex } from 'antd';
import { Typography } from 'antd';
import './RequestForm.css';
import FormID from './FormID/FormID';
import FormInfo from './FormInfo/FormInfo';
import FormTable from './TableInput/TableInput'
import FormUser from './FormUser/FormUser'
import { useState } from 'react';
import Axios from 'axios'
import { useEffect } from 'react';
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function RequestForm() {
    const currentMonthIndex = new Date().getMonth() + 1
    const [submitLoading, setSubmitLoading] = useState(false)
    const currentYear = new Date().getFullYear()
    const [form] = Form.useForm()
    const [alertData, setAlertData] = useState({ type: null, message: null, show: false});
    const navigate = useNavigate();

    
    const [formInput, setFormInput] = useState(
        Array.from({ length: 10 }, () =>
            ({ uraian: '', jumlah: null, satuan: '', spesifikasi: '' })
        )
    );

    const [formUser, setFormUser] = useState({
        namaKaryawan: '',
        deptKaryawan: '',
        jabtKaryawan: '',
        nikManager: '',
    })

    const [formData, setFormData] = useState({
        namaKebutuhan: '',
        jenisKebutuhan: '',
        detailKebutuhan: '',
        tanggalPermintaan: null,
        tanggalPembelian: null,
    })

    const [formId, setFormID] = useState({
        formID: 0,
        formNum: '',
        formType: 'FPPK',
        formDept: 'GA',
        formCompany: 'TB',
        formMonth: currentMonthIndex,
        formYear: currentYear,
    })
    const handleFormUserChange = (newFormUser) => {
        setFormUser(newFormUser)
    }
    const handleFormInfoChange = (newFormData) => {
        setFormData(newFormData)
    }
    const handleFormInputChange = (newFormInput) => {
        setFormInput(newFormInput)
    }

    const handleAlertClose = () => {
        setAlertData({ type: null, message: null, show: false });
    };
    
    const submitForm = () => {
        setSubmitLoading(true)
        
        const formPost = {
            form_id: formId.formID + '/' + formId.formType + '/' + formId.formDept + '/' + formId.formCompany + '/' + formId.formMonth + '/' + formId.formYear,
            form_id_num: formId.formID,
            form_id_type: formId.formType, 
            form_id_dept: formId.formDept,
            form_id_comp: formId.formCompany,
            form_id_month: new Date(formId.formYear, formId.formMonth, 1, 0, 0, 0, 0),
            form_id_year: new Date(formId.formYear, formId.formMonth, 1, 0, 0, 0, 0),
            nama_kebutuhan: formData.namaKebutuhan,
            jenis_kebutuhan: formData.jenisKebutuhan,
            detail_jenis_kebutuhan: formData.detailKebutuhan,
            tanggal_permintaan: formData.tanggalPermintaan,
            tanggal_pembelian: formData.tanggalPembelian,
            user_id: 'arifak07',
            nama_karyawan: formUser.namaKaryawan,
            departement_karyawan: formUser.deptKaryawan,
            jabatan_karyawan: formUser.jabtKaryawan,
            nik_manager: formUser.nikManager
        }
        const formProperties = [
            formId.formID, formId.formType, formId.formDept, formId.formCompany,
            formId.formMonth, formId.formYear, formData.namaKebutuhan, formData.jenisKebutuhan,
            formData.detailKebutuhan, formData.tanggalPermintaan, formData.tanggalPembelian,
            formUser.namaKaryawan, formUser.deptKaryawan, formUser.jabtKaryawan, formUser.nikManager
        ];
        const formInputFinal = formInput
            .filter((item) => (
                item.uraian !== '' && item.jumlah !== null && item.satuan !== '' && item.spesifikasi !== ''
            )).map((item) => ({ form_id: formPost.form_id, ...item, }));
        const formInfoURL = "https://" + window.location.hostname + ":5001/api/FormInfo"
        const formDetailUrl = "https://" + window.location.hostname + ":5001/api/FormDetail"
        if (formProperties.every(value => value !== null)) {
            Axios.post(formInfoURL, formPost)
                .then(response => {
                    console.log('Success form PPK:', response.data);
                    setSubmitLoading(false);
                })
                .catch(error => {
                    setAlertData({ type: 'error', message: 'Failed to submit form', show: true });
                    console.error('Error form PPK:', error.message);
                    setSubmitLoading(false);
                });
            formInputFinal.forEach((item) => {
                Axios.post(formDetailUrl, item)
                    .then(response => {
                        console.log('Success form Detail:', response.data);
                        setAlertData({ type: 'success', message: 'Form submitted successfully', show: true });
                        setSubmitLoading(false);
                        setTimeout(() => { navigate('/FormList'); }, 2000)

                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                        setAlertData({ type: 'error', message: 'Failed to submit form', show: true });
                        setSubmitLoading(false);
                    });
            })
        }
        else {
            setAlertData({ type: 'error', message: 'Complete the Form', show: true });
            setSubmitLoading(false);
        }
        
        
        
    }
    useEffect(() => {
        if (alertData.show) {
            // Close the alert after 5 seconds
            const timeoutId = setTimeout(() => {
                setAlertData({ type: null, message: null, show: false });
            }, 5000);

            // Cleanup the timeout on component unmount or when the alert is closed manually
            return () => clearTimeout(timeoutId);
        }
    }, [alertData.show]);
    const handleFormIDChange = (newFormID) => {
        setFormID(newFormID)        
    }
    return (
        <Form form={form}>            
            <Row gutter={8}>                
                <Col span={24}>
                    {alertData.show && (
                        <Alert
                            message={alertData.message}
                            type={alertData.type}
                            closable
                            onClose={handleAlertClose}
                            className='alert-shown'
                        />
                    )}
                    
                    <Flex justify="center">
                        <Title level={2} className="title">
                            FORM PERMINTAAN PEMENUHAN KEBUTUHAN
                        </Title>
                    </Flex>
                </Col>
            </Row>
            <Row gutter={[0, 8]} className="border-form">
                <Col span={24}>
                    <FormID formId={formId} onChange={handleFormIDChange} />
                </Col>
            </Row>

            <Row className="border-form">
                <Col span={24}>
                    <FormInfo formData={formData} onChange={handleFormInfoChange} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormTable formInput={formInput} onChange={handleFormInputChange }/>
                </Col>
            </Row>
            <Row className="border-form">
                <Col span={24}>
                    <FormUser formUser={formUser} onChange={handleFormUserChange} />
                </Col>
            </Row>
            <Row className='form-button'>
                <Col span={24}>
                    <Button type='primary' className='submit-button' htmlType="submit" onClick={submitForm} loading={submitLoading}>
                            Submit
                     </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default RequestForm;
