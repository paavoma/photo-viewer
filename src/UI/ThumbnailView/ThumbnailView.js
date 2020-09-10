import React, { Component } from 'react';
import classes from './ThumbnailView.module.css';
import LargeImage from '../../components/LargeImage/LargeImage';
import Modal from '../../components/Modal/Modal';
import ThumbnailViewControls from '../ThumbnailViewControls/ThumbnailViewControls';

class ThumbnailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showThumbnailView: true,
            clickedImageIndex: 0
        }
    }



    showClickedImage = e => {
        let imageIndex = this.findElementIndexWithId(e.currentTarget.id);
        this.setState({
            showThumbnailView: false,
            clickedImageIndex: imageIndex,
        })

    }

    showThumbnailView() {
        this.setState({
            showThumbnailView: true
        })
    }



    //this is used instead of straight id-1 as index because the images might be later re-ordered and located in a different index.
    findElementIndexWithId(id) {

        const list = this.props.shownThumbnails;
        var element = list.find(thumbnail => thumbnail.id == id);
        return list.indexOf(element);
    }

    drawThumbnailView() {
        return (
            <div>
                
                
                    <h1>photo-viewer</h1>
                    <div className={classes.PrevButtonOverlay} onClick={this.props.changePrevPage}>
                        <a className={classes.PrevButton}>&#8249;</a>
                    </div>
                    <div className={classes.NextButtonOverlay} onClick={this.props.changeNextPage}>
                        <a className={classes.NextButton}>&#8250;</a>
                    </div>
                

                
                <div className={classes.ThumbnailsContainer}>

                    {
                        this.props.shownThumbnails.map((thumbnail, index) => {
                            return <div className={classes.ThumbnailContainer} key={thumbnail.id}><img src={thumbnail.thumbnailUrl} key={thumbnail.id} onClick={this.showClickedImage} id={thumbnail.id}></img></div>

                        })
                    }
                </div>
                <ThumbnailViewControls changePrevPage={this.props.changePrevPage}
                    changeNextPage={this.props.changeNextPage}
                    currentPage={this.props.currentPage}></ThumbnailViewControls>
            </div>
        )
    }

    render() {
        return (
            <div className={classes.ThumbnailView}>
                
                {this.drawThumbnailView()}
                {
                    this.state.showThumbnailView ?
                        ""
                        :
                        <Modal show={this.state.showThumbnailView} clicked={() => this.showThumbnailView()}>
                            <LargeImage url={this.props.shownThumbnails[this.state.clickedImageIndex].url} title={this.props.shownThumbnails[this.state.clickedImageIndex].title} showThumbnailView={() => this.showThumbnailView()}></LargeImage>
                        </Modal>

                }
            </div>
        )
    }



}

export default ThumbnailView;