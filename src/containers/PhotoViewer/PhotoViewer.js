import React, { Component } from 'react';
import classes from './PhotoViewer.module.css';
import ThumbnailView from '../../UI/ThumbnailView/ThumbnailView';

const API = 'https://jsonplaceholder.typicode.com/photos';
const QUERY = '';
const THUMBNAILAMOUNT = 12;
let pageAmount = 0;

class PhotoViewer extends Component {
    constructor() {
        super();
        this.state = {
            content: {},
            isLoading: true,
            shownStartIndex: 0,
            currentEndIndex: 0,
            shownThumbnails: []
        }
    };
    //fetch data from API
    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(API+QUERY);
            const json = await response.json();

            this.setState({
                content: json,
                isLoading: false,
            },
                () => {
                    this.updateShownThumbnails();
                    this.setPageAmount();
                });

        } catch (error) {
            console.log(error);
        }

    }
    //calculates the amount of pages to display
    setPageAmount() {
        const dataLength = this.state.content.length;
        const amountThumbnails = THUMBNAILAMOUNT;
        let numberOfPages = 0;

        if (dataLength % amountThumbnails === 0) {
            numberOfPages = dataLength / amountThumbnails;
        } else {
            numberOfPages = ((dataLength - (dataLength % amountThumbnails)) / amountThumbnails) + 1;
        }
        pageAmount = numberOfPages;
    }
    //text to display current page like "2 / 320"
    getCurrentPageOfMax() {
        const resultText = 1 + (((this.state.shownStartIndex) / THUMBNAILAMOUNT)) + " / " + pageAmount;
        return resultText;

    }

    updateShownThumbnails() {
        const amountThumbnails = THUMBNAILAMOUNT;
        let shownThumbnails = [];
        let currentIndex = this.state.shownStartIndex;
        let endingIndex = currentIndex + amountThumbnails;

        for (currentIndex; currentIndex < endingIndex; currentIndex++) {
            //if there is less images to show than amountThumbnails
            if (currentIndex >= this.state.content.length)
                break;
            else
                shownThumbnails.push(this.state.content[currentIndex]);
        }
        this.setState({
            currentEndIndex: currentIndex - 1,
            shownThumbnails: shownThumbnails
        },
            () => {
                console.log("startIndex" + this.state.shownStartIndex);
                console.log("ending index" + this.state.currentEndIndex);
            })

    }

    changeNextPage() {
        let currentEndIndex = this.state.currentEndIndex;
        let newStartIndex = currentEndIndex + 1;

        if (newStartIndex >= this.state.content.length) {
            newStartIndex = 0;
        }


        this.updateShownIndexAndThumbnails(newStartIndex);
    }
    changePrevPage() {
        let currentStartIndex = this.state.shownStartIndex;
        let newStartIndex = currentStartIndex - THUMBNAILAMOUNT;
        let dataLength = this.state.content.length;

        if (newStartIndex < 0) {
            const dataLengthModAmountshown = (dataLength % THUMBNAILAMOUNT);
            if (dataLengthModAmountshown === 0)
                newStartIndex = dataLength - THUMBNAILAMOUNT;
            else {
                newStartIndex = dataLength - (dataLengthModAmountshown);
            }
        }

        this.updateShownIndexAndThumbnails(newStartIndex);

    }

    updateShownIndexAndThumbnails(newStartIndex) {
        //because setState is asynchronous, callback function is required to properly update the view
        this.setState({
            shownStartIndex: newStartIndex
        },
            () => this.updateShownThumbnails()
        )
    }

    drawThumbnailView() {
        return <ThumbnailView shownThumbnails={this.state.shownThumbnails}
            currentPage={this.getCurrentPageOfMax()}
            changeNextPage={() => this.changeNextPage()}
            changePrevPage={() => this.changePrevPage()}></ThumbnailView>;
    }

    render() {
        return (
            <div className={classes.PhotoViewer}>
                {
                    this.state.isLoading ?
                        <div className={classes.LoadingText}>
                            <p>Loading Page</p>
                        </div>
                        :
                        <div>
                            {this.drawThumbnailView()}
                        </div>
                }
            </div>
        )


    }
}

export default PhotoViewer;