import {makeAutoObservable} from "mobx";

class Meme {
    constructor() {
        makeAutoObservable(this);
    }

    topText = "";
    bottomText = "";
    randomImg = "http://i.imgflip.com/1bij.jpg";
    allMemeImgs = [];
    error = null;
    isLoaded = false;

    inputTopText = (event) => {
        this.topText = event.target.value;
    }

    inputBottomText = (event) => {
        this.bottomText = event.target.value;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const randNum = getRandomInt(0, this.allMemeImgs.length);
        const randImgMeme = this.allMemeImgs[randNum].url;

        this.randomImg = randImgMeme;
        this.topText = "";
        this.bottomText = "";
    }

    restToAPI = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(
                (result) => {
                    const {memes} = result.data;

                    this.isLoaded = true;
                    this.allMemeImgs = memes;
                },
                (error) => {
                    this.isLoaded = true;
                    this.error = error;
                }
            )
    }

    pressingGenBtn = () => {
        this.restToAPI();
    }
}

export default new Meme();