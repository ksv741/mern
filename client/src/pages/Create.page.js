import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";

const CreatePage = () => {
    const history = useHistory()
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async (event) => {
        if(event.key === 'Enter'){
            try{

                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            }catch(e){

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Insert link"
                        id="link"
                        name="email"
                        type="text"
                        onChange={e => setLink(e.target.value)}
                        value={link}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="email">Insert link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;