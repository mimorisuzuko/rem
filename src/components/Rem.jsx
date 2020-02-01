import React, { Component } from 'react';
import { css, keyframes } from 'emotion';
import mjmj from '../assets/mjmj.png';
import wnwn from '../assets/wnwn.png';

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
        frames: mjmjFrames,
        background: mjmj
    },
    wnwn: {
        animation: keyframes`
        100% {
            background-position-y: ${HEIGHT * wnwnFrames}px;
        }
        `,
        frames: wnwnFrames,
        background: wnwn
    }
};

export default class Rem extends Component {
    render = () => {
        const {
            props: { name }
        } = this;
        const { frames, animation, background } = config[name];

        return (
            <div
                className={css({
                    width: WIDTH,
                    height: HEIGHT,
                    background: `url(${background})`,
                    animation: `${animation} ${(1 / 15) *
                        frames}s steps(${frames}) infinite`
                })}
            />
        );
    };
}
