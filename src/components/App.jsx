import React, { Component } from 'react';
import { css } from 'emotion';
import yargsParser from 'yargs-parser';
import fz from 'fz';
import _ from 'lodash';
import Rem from './Rem';

export default class App extends Component {
    static getDerivedStateFromProps(props, { query, candidates }) {
        const {
            _: [parsed]
        } = yargsParser(query);
        const filteredCandidates = [];

        _.forEach(candidates, (candidate, key) => {
            const { matched, results: chars } = fz(key, parsed || '', true);

            if (matched) {
                filteredCandidates.push({
                    chars,
                    key,
                    ...candidate
                });
            }
        });

        return { filteredCandidates };
    }

    state = {
        rem: 'mjmj',
        query: '',
        selectedIndex: 0,
        candidates: {
            mjmj: {
                description: 'MJMJ mode.',
                exec: () => {
                    this.setState({ rem: 'mjmj' });
                }
            },
            wnwn: {
                description: 'WNWN mode.',
                exec: () => {
                    this.setState({ rem: 'wnwn' });
                }
            }
        },
        filteredCandidates: []
    };

    onChange = ({ currentTarget: { value } }) => {
        this.setState({ query: value });
    };

    render = () => {
        const {
            state: { rem, query, filteredCandidates, selectedIndex }
        } = this;
        const margin = 10;

        return (
            <div
                className={css({
                    position: 'relative'
                })}
            >
                <Rem name={rem} />
                <div
                    className={css({
                        position: 'absolute',
                        backgroundColor: 'white',
                        left: margin,
                        bottom: margin,
                        width: `calc(100% - ${margin * 2}px)`,
                        padding: '9px 16px',
                        boxShadow:
                            '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)',
                        borderRadius: 4
                    })}
                >
                    <div
                        className={css({
                            display: 'flex'
                        })}
                    >
                        {_.map(filteredCandidates, ({ chars }, i) => {
                            const selected = selectedIndex === i;

                            return (
                                <div
                                    key={i}
                                    className={css({
                                        marginRight: 4,
                                        fontSize: selected
                                            ? '1.5rem'
                                            : '1.2rem',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        fontWeight: selected ? 'bold' : 'normal'
                                    })}
                                >
                                    {_.map(chars, ({ char, matched }, j) => {
                                        return (
                                            <span
                                                key={j}
                                                className={css({
                                                    textDecoration: matched
                                                        ? 'underline'
                                                        : 'none'
                                                })}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <div
                        className={css({
                            marginBottom: 4
                        })}
                    >
                        {_.get(
                            filteredCandidates,
                            `${selectedIndex}.description`
                        )}
                    </div>
                    <input
                        onChange={this.onChange}
                        type='text'
                        value={query}
                        className={css({
                            outline: 'none',
                            padding: '4px 8px',
                            borderRadius: 4,
                            border: 'none',
                            font: 'inherit',
                            width: '100%',
                            fontSize: '2rem',
                            display: 'block',
                            backgroundColor: 'rgb(0, 0, 0, 0.03)'
                        })}
                    />
                </div>
            </div>
        );
    };
}
