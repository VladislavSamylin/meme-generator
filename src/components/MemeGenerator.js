import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            error: null,
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(
                (result) => {
                    const { memes } = result.data;

                    this.setState({
                        isLoaded: true,
                        allMemeImgs: memes
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleChange(event) {
        const { value, name } = event.target;

        this.setState(
            {
                [name]: value
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        this.setState(
            (state) => {
                const randNum = getRandomInt(0, state.allMemeImgs.length);
                const randImgMeme = state.allMemeImgs[randNum].url;

                return {
                    randomImg: randImgMeme
                }
            });
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="topText"
                            value={this.state.topText}
                            onChange={this.handleChange}
                            placeholder="Top Text"
                        />

                        <input
                            type="text"
                            name="bottomText"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                            placeholder="Bottom Text"
                        />

                        <button>Gen</button>
                    </form>

                    <div className={"meme"}>
                        <img src={this.state.randomImg} alt={"meme"} />
                        <h1 className={"top"}> {this.state.topText}</h1>
                        <h1 className={"bottom"}> {this.state.bottomText}</h1>
                    </div>
                </div>
            );
        }
    }
}

export default MemeGenerator;