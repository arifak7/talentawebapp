import { useEffect, useState } from "react"
import Axios from 'axios';

function FormDetail({ propFormDetail }) {
    const [formDetail, setFormDetail] = useState([])
    const [formDetailAPI, setFormDetailAPI] = useState([[]])
    useEffect(() => {
        setFormDetail(propFormDetail)
        const encodedValue = encodeURIComponent(propFormDetail.form_id);
        var formPPKUrlByID = "https://" + window.location.hostname + ":5001/api/FormDetail/" + encodedValue;
        Axios.get(formPPKUrlByID)
            .then(response => {
                setFormDetailAPI(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            });
    }, [])
    return (
        <div>
            <h1>{(formDetailAPI[0]!=null)? formDetailAPI[0].form_id : 'Empty Data'}</h1>
        </div>
    )
}

export default FormDetail
