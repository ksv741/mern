import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({links}) => {

    if(!links || !links.length){
        return <p className="center">No links yet</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Original</th>
                <th>Cut</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td><a href={link.to}>{link.to}</a></td>
                            <td> <Link to={`/detail/${link._id}`}>Open</Link> </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
    );
};

export default LinksList;