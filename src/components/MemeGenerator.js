import React from "react";

import meme from "../store/meme";
import {observer} from "mobx-react";

const MemeGenerator = observer (() => {
    const { error, isLoaded, randomImg,
        topText, bottomText } = meme;

    meme.restToAPI();

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <form
                    className="meme-form"
                    onSubmit={(event) => meme.handleSubmit(event)}>

                    <input
                        type="text"
                        value={meme.topText}
                        onChange={(event) => meme.inputTopText(event)}
                        placeholder="Top Text"
                    />

                    <input
                        type="text"
                        value={meme.bottomText}
                        onChange={(event) => meme.inputBottomText(event)}
                        placeholder="Bottom Text"
                    />

                    <button onClick={meme.restToAPI()}>Gen</button>
                </form>

                <div className={"meme"}>
                    <img src={randomImg} alt={"meme"}/>
                    <h1 className={"top"}> {topText}</h1>
                    <h1 className={"bottom"}> {bottomText}</h1>
                </div>
            </div>
        );
    }
});

export default MemeGenerator;