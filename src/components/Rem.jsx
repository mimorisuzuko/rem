import React, { Component } from 'react';
import { css, keyframes } from 'emotion';
import { remote } from 'electron';
import libpath from 'path';

const { app } = remote;
const WIDTH = 753;
const HEIGHT = 651;
const mjmjFrames = 9;
const wnwnFrames = 11;
const config = {
    mjmj: {
        animation: keyframes`
        100% {
            background-position-y: ${HEIGHT * mjmjFrames}px;
        }
        `,
        frames: mjmjFrames
    },
    wnwn: {
        animation: keyframes`
        100% {
            background-position-y: ${HEIGHT * wnwnFrames}px;
        }
        `,
        frames: wnwnFrames
    }
};

export default class Rem extends Component {
    render = () => {
        const {
            props: { name }
        } = this;
        const { frames, animation } = config[name];

        return (
            <div
                className={css({
                    width: WIDTH,
                    height: HEIGHT,
                    background: `url(file://${libpath.join(
                        app.getAppPath(),
                        `app/dst/assets/${name}.png`
                    )})`,
                    animation: `${animation} ${(1 / 15) *
                        frames}s steps(${frames}) infinite`
                })}
            />
        );
    };
}
