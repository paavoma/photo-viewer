import React from 'react';
import classes from './LargeImage.module.css';

function LargeImage(props){
    return(
        <div>
            <img src={props.url}></img>
            <p>{props.title}</p>
            <button onClick={props.showThumbnailView}>Back</button>
        </div>
    )

}

export default LargeImage;