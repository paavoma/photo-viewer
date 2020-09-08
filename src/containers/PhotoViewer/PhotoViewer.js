import React, { Component } from 'react';
import classes from './PhotoViewer.module.css';
import LargeImage from '../../components/LargeImage/LargeImage';
import ThumbnailView from '../../UI/ThumbnailView/ThumbnailView';

const API = 'https://jsonplaceholder.typicode.com/photos';
const DEFAULT_QUERY = '';

class PhotoViewer extends Component {
    constructor() {
        super();
        this.state = {
            content: {},
            isLoading: true,
            shownStartIndex: 0,
            currentEndIndex: 0,
            shownThumbnails: [],
            amountThumbnails: 30
        }
    };

    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(API);
            const json = await response.json();

            this.setState({
                content: json,
                
                isLoading: false,
            });
            
        } catch (error) {
            console.log(error);
        }
        this.setState({
            shownThumbnails: this.getShownThumbnails(this.state.amountThumbnails),
        })
        
    }
    
    changeNextPage(){  
        console.log("täällä käyty")
        let currentEndIndex = this.state.currentEndIndex;
        let newStartIndex = 0;

        if(currentEndIndex < this.state.content.length){
            console.log("iffissä käyty")
            newStartIndex = currentEndIndex+1; 
        }

        this.setState({
            shownStartIndex: newStartIndex,
            shownThumbnails: this.getShownThumbnails(this.state.amountThumbnails)
        })

        console.log("alotusindex " + this.state.shownStartIndex)
        console.log("lopetusindex " + this.state.currentEndIndex)
        
    }

    drawUI(){
            return this.drawThumbnailView();
    }

    drawThumbnailView(){
        return <ThumbnailView   shownThumbnails={this.state.shownThumbnails} 
                                
                                changeNextPage={() => this.changeNextPage()}></ThumbnailView>;
    }
    

    getShownThumbnails(amountThumbnails){
        let shownThumbnails = [];
        let currentIndex = this.state.shownStartIndex;
        let endingIndex = currentIndex+amountThumbnails;
        for(currentIndex; currentIndex < endingIndex; currentIndex++){
            //if there is less images to show than amountThumbnails
            if(currentIndex > this.state.content.length)
            break;
            else
            shownThumbnails.push(this.state.content[currentIndex]);
        }
        this.setState({
            currentEndIndex: currentIndex
        })
        return shownThumbnails;
    }

    

    render() {
        return (
            <div>


                {
                    this.state.isLoading ?
                        <div>
                            <p>loading page</p>
                        </div>
                        :
                        <div>
                            {this.drawUI()}
                        </div>
                }
            </div>
        )


    }
}

export default PhotoViewer;