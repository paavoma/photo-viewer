import React, { Component } from 'react';
import classes from './ThumbnailView.module.css';
import LargeImage from '../../components/LargeImage/LargeImage';

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
                <div>
                    <button onClick={this.props.changeNextPage}>Next page</button>
                </div>
                <div>
                    {
                        this.props.shownThumbnails.map((thumbnail) => {
                            return <img src={thumbnail.thumbnailUrl} key={thumbnail.id} onClick={this.showClickedImage} id={thumbnail.id}></img>

                        })
                    }

                </div>
                
            </div>
        )
    }

    render() {
        return (
            <div>


                <div>
                    {
                        this.state.showThumbnailView ?

                            this.drawThumbnailView()
                            :
                            <LargeImage url={this.props.shownThumbnails[this.state.clickedImageIndex].url} title={this.props.shownThumbnails[this.state.clickedImageIndex].title} showThumbnailView={() => this.showThumbnailView()}></LargeImage>
                    }
                </div>

            </div>
        )
    }



}

export default ThumbnailView;