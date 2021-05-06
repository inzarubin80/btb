import React from 'react';
import {withRouter} from "react-router-dom";


const ReportCard =(props)=> {

    console.log('Report card');
    return (

        <div>
            <h1>{props.match.params.id}</h1>
        </div>

    );
}


export default withRouter(ReportCard)