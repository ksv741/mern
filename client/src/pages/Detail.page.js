import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const {request, loading} = useHttp()

    const getLink = useCallback(async () => {
        try{
            request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            }).then(response => {
                setLink(response)
            })

        }catch(err){

        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    );
};

export default DetailPage;