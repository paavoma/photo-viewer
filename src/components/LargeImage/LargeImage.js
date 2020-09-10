import React from 'react';
import classes from './LargeImage.module.css';


function LargeImage(props){
    return(
        <div className={classes.LargeImage}>
            <div className={classes.ImgContainer}>
            <img src={props.url} alt={props.title}></img>
            </div>
            <p>{props.title}</p>
            <button onClick={props.showThumbnailView}>Back</button>
        </div>
    )

}

export default LargeImage;