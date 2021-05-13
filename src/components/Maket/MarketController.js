import React from 'react';
import { MaketCardContext } from '../../context/MaketCard/MaketCardContext';
import MaketProject from '../MaketProjet/MaketProject'
import MaketCard from './MaketCard'
import { withRouter } from "react-router-dom";

const MarketController = (props) => {

    const {maket, openCard } = React.useContext(MaketCardContext);
    
    React.useEffect(() => {
        if (props.match.params.id != 'new') {
            openCard(props.match.params.id)
        }
    }, [props.match.params.id]);


    if (props.match.params.id == 'new') {
        return (<MaketProject />);
    } else if (maket) {
        return (<MaketCard />);
    } else return (<div></div>)

}

export default withRouter(MarketController)