import {runInAction, makeAutoObservable} from "mobx";

class Meme {
    constructor() {
        makeAutoObservable(this);
    }

    topText = "";
    bottomText = "";
    allMemeImgs = [];
    randomImg = "https://i.imgflip.com/1ur9b0.jpg";
    error = null;
    isLoaded = false;

    genRandImgMeme = () => {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const randNum = getRandomInt(0, this.allMemeImgs.length);

        return this.allMemeImgs[randNum].url;
    }

    inputTopText = (event) => {
        this.topText = event.target.value;
    }

    inputBottomText = (event) => {
        this.bottomText = event.target.value;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.randomImg = this.genRandImgMeme();
        this.topText = "";
        this.bottomText = "";
    }

    restToAPI = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(
                (result) => {
                    const {memes} = result.data;

                    this.allMemeImgs = memes;

                    runInAction(() => {
                        this.isLoaded = true;
                    });
                },
                (error) => {
                    runInAction(() => {
                        this.isLoaded = true;
                        this.error = error;
                    });
                }
            );
    }
}

export default new Meme();