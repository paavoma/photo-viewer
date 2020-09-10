import React from 'react';
import classes from './ThumbnailViewControls.module.css';


function ThumbnailViewControls(props) {
    return (
        <div className={classes.ThumbnailControlsContainer}>
            <div className={classes.ThumbnailControl}>
                <button onClick={props.changePrevPage}>Back</button>
            </div>
            <div className={classes.ThumbnailControl}>
                <p>{props.currentPage}</p>
            </div>
            <div className={classes.ThumbnailControl}>
                <button onClick={props.changeNextPage}>Next</button>
            </div>
        </div>
    )

}

export default ThumbnailViewControls;