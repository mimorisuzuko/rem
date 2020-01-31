import React, { Component, createRef } from 'react';
import { css } from 'emotion';
import yargsParser from 'yargs-parser';
import fz from 'fz';
import _ from 'lodash';
import { ipcRenderer } from 'electron';
import Rem from './Rem';

export default class App extends Component {
    static getDerivedStateFromProps(props, { query, candidates }) {
        const yargsParsedQuery = yargsParser(query);
        const {
            _: [parsed]
        } = yargsParsedQuery;
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

        return { filteredCandidates, yargsParsedQuery };
    }

    state = {
        rem: 'mjmj',
        query: '',
        yargsParsedQuery: {},
        selectedIndex: 0,
        candidates: {
            mjmj: {
                description: 'MJMJ mode.',
                exec: () => {
                    this.setState({ rem: 'mjmj', query: '', selectedIndex: 0 });
                },
                minArgs: 0,
                _skipReset: true
            },
            wnwn: {
                description: 'WNWN mode.',
                exec: () => {
                    this.setState({ rem: 'wnwn', query: '', selectedIndex: 0 });
                },
                minArgs: 0,
                _skipReset: true
            }
        },
        filteredCandidates: []
    };
    _$input = createRef();

    componentDidMount = () => {
        const {
            _$input: { current: $input }
        } = this;

        $input.focus();
        window.addEventListener('focus', () => {
            $input.focus();
        });
    };

    onChange = ({ currentTarget: { value } }) => {
        this.setState({ query: value, selectedIndex: 0 });
    };

    onKeyDown = (e) => {
        const {
            state: {
                selectedIndex,
                filteredCandidates,
                query,
                yargsParsedQuery
            },
            _$input: { current: $input }
        } = this;
        const { keyCode } = e;

        if (keyCode === 27) {
            $input.blur();
        } else if (keyCode == 13) {
            const selected = filteredCandidates[selectedIndex];

            if (selected) {
                const { key, exec } = selected;
                const { matched } = fz(key, query, true);

                if (matched) {
                    this.setState({ query: `${key} ` });
                } else {
                    const {
                        _: [, ...args],
                        ...options
                    } = yargsParsedQuery;

                    exec(args, options);
                    this.setState({ query: '', selectedIndex: 0 }, () => {
                        ipcRenderer.send('hide');
                    });
                }

                e.preventDefault();
            }
        } else if (keyCode === 38) {
            this.setState({ selectedIndex: Math.max(selectedIndex - 1, 0) });
            e.preventDefault();
        } else if (keyCode === 40) {
            const { length } = filteredCandidates;

            this.setState({
                selectedIndex: Math.min(selectedIndex + 1, length - 1)
            });
            e.preventDefault();
        }
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
                        borderRadius: 4,
                        boxSizing: 'border-box'
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
                        ref={this._$input}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
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
