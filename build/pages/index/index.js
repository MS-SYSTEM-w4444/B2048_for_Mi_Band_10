export default function(global, globalThis, window, $app_exports$, $app_evaluate$) {
    var org_app_require = $app_require$;
    (function(global, globalThis, window, $app_exports$, $app_evaluate$) {
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var $app_require$1 = global.$app_require$ || org_app_require;
        var createPageHandler = function() {
            return (()=>{
                var __webpack_modules__ = {};
                var __webpack_module_cache__ = {};
                function __webpack_require__(moduleId) {
                    var cachedModule = __webpack_module_cache__[moduleId];
                    if (void 0 !== cachedModule) return cachedModule.exports;
                    var module = __webpack_module_cache__[moduleId] = {
                        exports: {}
                    };
                    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
                    return module.exports;
                }
                (()=>{
                    __webpack_require__.g = (()=>{
                        if ('object' == typeof globalThis) return globalThis;
                        try {
                            return this || new Function('return this')();
                        } catch (e) {
                            if ('object' == typeof window) return window;
                        }
                    })();
                })();
                (()=>{
                    __webpack_require__.rv = ()=>"1.4.11";
                })();
                (()=>{
                    __webpack_require__.ruid = "bundler=rspack@1.4.11";
                })();
                var $app_style$ = [
                    [
                        [
                            [
                                2,
                                "text"
                            ]
                        ],
                        {
                            fontWeight: "bold",
                            textAlign: "center"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "score"
                            ]
                        ],
                        {
                            position: "absolute",
                            left: "0px",
                            top: "75px",
                            width: "192px",
                            fontSize: "28px",
                            color: "rgba(255, 255, 255, 0.6)"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "square"
                            ]
                        ],
                        {
                            width: "40px",
                            height: "40px",
                            marginTop: "4px",
                            marginLeft: "4px",
                            borderRadius: "13px",
                            fontSize: "15px",
                            color: "#59503f"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "bg"
                            ]
                        ],
                        {
                            position: "absolute",
                            width: "192px",
                            height: "469px",
                            backgroundColor: "black"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "btn"
                            ]
                        ],
                        {
                            position: "absolute",
                            left: "45px",
                            top: "504px"
                        }
                    ]
                ];
                var $app_script$ = function __scriptModule__(module, exports, $app_require$1) {
                    "use strict";
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                    exports.default = void 0;
                    var _system = _interopRequireDefault($app_require$1("@app-module/system.prompt"));
                    var _system2 = _interopRequireDefault($app_require$1("@app-module/system.storage"));
                    var _system3 = _interopRequireDefault($app_require$1("@app-module/system.folme"));
                    function _interopRequireDefault(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        };
                    }
                    var sc = 0, ls, lhs, board = Array(4), added = Array(4), over = 0, lm = Array(4), that;
                    for(let i = 0; i < 4; i++){
                        lm[i] = new Array(4);
                        board[i] = new Array(4);
                        added[i] = new Array(4);
                    }
                    var _default = exports.default = {
                        public: {
                            blocks: [
                                "0",
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                                "12",
                                "13",
                                "14",
                                "15"
                            ],
                            md: [],
                            hsc: 0,
                            sco: sc,
                            bgc: [],
                            ise: [],
                            ch: 0,
                            dark: false,
                            menuFlag: false,
                            ani: true
                        },
                        onInit () {
                            that = this;
                            let tempc = "rgba(0,0,0,0) #EFE5DA #F0E0C9 #fcb477 #ff9c61 #ff865d #ff6a38 #ebcf71 #ebcc5f #ebc94f #ebc53f #ebc22c #F2B6B6 #E8ED51 #FFE3FB #E8FF8C #FFDEC9 #F5A433 #E6109B #96C4E6 #E560CD".split(" ");
                            tempc.forEach((a, index)=>{
                                this.bgc[2 ** index] = a;
                            });
                            this.bgc[""] = "rgba(0, 0, 0, 0)";
                            _system2.default.get({
                                key: "score",
                                success: (data)=>{
                                    if (data) {
                                        let o = JSON.parse(data);
                                        board = o.map;
                                        rm0(o.map);
                                        this.hsc = o.hs;
                                        this.sco = o.sc;
                                        this.ch = 0;
                                        this.dark = o.dark;
                                        this.ani = o.ani;
                                    } else this.new_game();
                                }
                            });
                            clear(added);
                        },
                        chcb () {
                            if (1 == this.ch) {
                                this.hsc = lhs;
                                this.sco = ls;
                                for(let i = 0; i < 4; i++){
                                    for(let j = 0; j < 4; j++)board[i][j] = lm[i][j];
                                }
                                rm0(board);
                                over = 0;
                                this.save();
                                this.ch = 0;
                            } else _system.default.showToast({
                                message: "不能再撤啦",
                                duration: 1000
                            });
                        },
                        new_game () {
                            backup();
                            newgame();
                            this.sco = 0;
                            this.save();
                            clearani();
                        },
                        move (eve) {
                            if (this.menuFlag) {
                                if ("right" == eve.direction) this.exit('e');
                                return;
                            }
                            mo(eve.direction);
                            if (over) _system.default.showToast({
                                message: "Gameover!",
                                duration: 2000
                            });
                            if (this.sco > this.hsc) this.hsc = this.sco;
                            this.save();
                        },
                        save () {
                            let o = {
                                map: board,
                                hs: this.hsc,
                                sc: this.sco,
                                dark: this.dark,
                                ani: this.ani
                            };
                            _system2.default.set({
                                key: "score",
                                value: JSON.stringify(o),
                                success: ()=>{},
                                fail: ()=>{}
                            });
                        },
                        exit (a) {
                            if ('right' == a.direction || "e" == a) if (this.menuFlag) {
                                _system3.default.to({
                                    id: "about",
                                    toState: {
                                        translateX: "192px"
                                    },
                                    config: {
                                        duration: 0.1,
                                        ease: "out"
                                    }
                                });
                                setTimeout(()=>{
                                    this.menuFlag = false;
                                }, 100);
                            } else this.$app.exit();
                        },
                        openMenu () {
                            this.menuFlag = true;
                            setTimeout(()=>{
                                _system3.default.to({
                                    id: "about",
                                    toState: {
                                        translateX: "0px"
                                    },
                                    config: {
                                        duration: 0.1,
                                        ease: "out"
                                    }
                                });
                            }, 50);
                        },
                        changeMode () {
                            this.dark = !this.dark;
                            this.save();
                        },
                        changeani () {
                            this.ani = !this.ani;
                            this.save();
                        },
                        onBackPress () {
                            this.exit('e');
                            return true;
                        }
                    };
                    function rm0(sm) {
                        let a = 0;
                        for(let i = 0; i < 4; i++){
                            for(var b = 0; 4 > b; b++){
                                if (0 == sm[i][b]) {
                                    that.md[a] = "";
                                    that.ise[a] = "#00000000";
                                } else {
                                    that.ise[a] = "#ffffff20";
                                    that.md[a] = sm[i][b];
                                }
                                a++;
                            }
                        }
                        return;
                    }
                    function clear(m) {
                        for(let i = 0; i < 4; i++)m[i].fill(0);
                    }
                    function newgame() {
                        over = 0;
                        clear(board);
                        newblock();
                        newblock();
                        rm0(board);
                    }
                    function rand_num() {
                        return Math.floor(1000 * Math.random());
                    }
                    function newblock() {
                        for(var a = 3, b = rand_num() % 4, c = rand_num() % 4, d = 50 < rand_num() % 100 ? 4 : 2; 0 < a;){
                            if (0 == board[b][c]) return board[b][c] = d;
                            b = rand_num() % 4;
                            c = rand_num() % 4;
                            a--;
                        }
                        for(a = 0; 4 > a; a++)for(b = 0; 4 > b; b++)if (0 == board[a][b]) return board[a][b] = 2;
                    }
                    function mo(dir) {
                        let up = canMoveUp(board), down = canMoveDown(board), right = canMoveRight(board), left = canMoveLeft(board);
                        if (up || left || down || right) {
                            if (eval(dir)) {
                                backup();
                                eval("move" + dir + "()");
                                clear(added);
                                if (that.ani) {
                                    setTimeout(()=>{
                                        clearani();
                                    }, 120);
                                    setTimeout(()=>{
                                        newblock();
                                        rm0(board);
                                    }, 110);
                                } else {
                                    newblock();
                                    rm0(board);
                                }
                            }
                            return;
                        }
                        over = 1;
                        rm0(board);
                        return;
                    }
                    function backup() {
                        for(let i = 0; i < 4; i++){
                            for(let j = 0; j < 4; j++)lm[i][j] = board[i][j];
                        }
                        ls = that.sco;
                        lhs = that.hsc;
                        that.ch = 1;
                        return;
                    }
                    function fromTo(id1, id2) {
                        if (that.ani) {
                            id1 = id1.toString();
                            id2 = id2.toString();
                            let x1, y1, x2, y2;
                            that.$element(id1).getBoundingClientRect({
                                success: (data)=>{
                                    let { top, bottom, left, right, width, height } = data;
                                    x1 = left;
                                    y1 = top;
                                }
                            });
                            that.$element(id2).getBoundingClientRect({
                                success: (data)=>{
                                    let { top, bottom, left, right, width, height } = data;
                                    x2 = left;
                                    y2 = top;
                                }
                            });
                            x2 -= x1;
                            y2 -= y1;
                            _system3.default.fromTo({
                                id: id1,
                                fromState: {
                                    translateY: "0px",
                                    translateX: "0px"
                                },
                                toState: {
                                    translateY: y2 + "px",
                                    translateX: x2 + "px"
                                },
                                config: {
                                    duration: 0.1
                                }
                            });
                        }
                        return 0;
                    }
                    function clearani() {
                        for(let i = 0; i < 16; i++){
                            let id = i.toString();
                            _system3.default.cancel({
                                id: id
                            });
                            _system3.default.setTo({
                                id: id,
                                toState: {
                                    translateY: "0px",
                                    translateX: "0px"
                                }
                            });
                        }
                    }
                    function moveleft() {
                        for(var a = 0; 4 > a; a++)for(var b = 1; 4 > b; b++)if (0 != board[a][b]) for(var c = 0; c < b; c++)if (0 == board[a][c] && noBlockHorizontal(a, c, b, board)) {
                            board[a][c] = board[a][b], board[a][b] = 0;
                            fromTo(4 * a + b, 4 * a + c);
                            break;
                        } else board[a][c] == board[a][b] && noBlockHorizontal(a, c, b, board) && (0 != added[a][c] ? (board[a][c + 1] = board[a][b], board[a][b] = 0, fromTo(4 * a + b, 4 * a + c + 1)) : (board[a][c] += board[a][b], that.sco += 2 * board[a][b], board[a][b] = 0, added[a][c] = 1, fromTo(4 * a + b, 4 * a + c)));
                        return !0;
                    }
                    function moveright() {
                        for(var a = 0; 4 > a; a++)for(var b = 2; 0 <= b; b--)if (0 != board[a][b]) for(var c = 3; c > b; c--)if (0 == board[a][c] && noBlockHorizontal(a, b, c, board)) {
                            board[a][c] = board[a][b], board[a][b] = 0;
                            fromTo(4 * a + b, 4 * a + c);
                            break;
                        } else board[a][c] == board[a][b] && noBlockHorizontal(a, b, c, board) && (0 != added[a][c] ? (board[a][c - 1] = board[a][b], board[a][b] = 0, fromTo(4 * a + b, 4 * a + c - 1)) : (board[a][c] += board[a][b], that.sco += 2 * board[a][b], board[a][b] = 0, added[a][c] = 1, fromTo(4 * a + b, 4 * a + c)));
                        return !0;
                    }
                    function moveup() {
                        for(var a = 0; 4 > a; a++)for(var b = 1; 4 > b; b++)if (0 != board[b][a]) for(var c = 0; c < b; c++)if (0 == board[c][a] && noBlockVertical(a, c, b, board)) {
                            board[c][a] = board[b][a], board[b][a] = 0;
                            fromTo(4 * b + a, 4 * c + a);
                            break;
                        } else board[c][a] == board[b][a] && noBlockVertical(a, c, b, board) && (0 != added[c][a] ? (board[c + 1][a] = board[b][a], board[b][a] = 0, fromTo(4 * b + a, (c + 1) * 4 + a)) : (board[c][a] += board[b][a], that.sco += board[c][a], board[b][a] = 0, added[c][a] = 1, fromTo(4 * b + a, 4 * c + a)));
                    }
                    function movedown() {
                        for(var a = 0; 4 > a; a++)for(var b = 2; 0 <= b; b--)if (0 != board[b][a]) for(var c = 3; c > b; c--)if (0 == board[c][a] && noBlockVertical(a, b, c, board)) {
                            board[c][a] = board[b][a], board[b][a] = 0;
                            fromTo(4 * b + a, 4 * c + a);
                            break;
                        } else board[c][a] == board[b][a] && noBlockVertical(a, b, c, board) && (0 != added[c][a] ? (board[c - 1][a] = board[b][a], board[b][a] = 0, fromTo(4 * b + a, (c - 1) * 4 + a)) : (board[c][a] += board[b][a], that.sco += board[c][a], board[b][a] = 0, added[c][a] = 1, fromTo(4 * b + a, 4 * c + a)));
                    }
                    function canMoveLeft(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 0 != c && (0 == a[b][c - 1] || a[b][c - 1] == a[b][c])) return !0;
                        return !1;
                    }
                    function canMoveRight(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 3 != c && (0 == a[b][c + 1] || a[b][c + 1] == a[b][c])) return !0;
                        return !1;
                    }
                    function canMoveUp(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 0 != b && (0 == a[b - 1][c] || a[b - 1][c] == a[b][c])) return !0;
                        return !1;
                    }
                    function canMoveDown(a) {
                        for(var b = 0; 4 > b; b++)for(var c = 0; 4 > c; c++)if (0 != a[b][c] && 3 != b && (0 == a[b + 1][c] || a[b + 1][c] == a[b][c])) return !0;
                        return !1;
                    }
                    function noBlockHorizontal(a, b, c, d) {
                        for(b += 1; b < c; b++)if (0 != d[a][b]) return !1;
                        return !0;
                    }
                    function noBlockVertical(a, b, c, d) {
                        for(b += 1; b < c; b++)if (0 != d[b][a]) return !1;
                        return !0;
                    }
                    const moduleOwn = exports.default || module.exports;
                    const accessors = [
                        'public',
                        'protected',
                        'private'
                    ];
                    if (moduleOwn.data && accessors.some(function(acc) {
                        return moduleOwn[acc];
                    })) throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
                    if (!moduleOwn.data) {
                        moduleOwn.data = {};
                        moduleOwn._descriptor = {};
                        accessors.forEach(function(acc) {
                            const accType = typeof moduleOwn[acc];
                            if ('object' === accType) {
                                moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
                                for(const name in moduleOwn[acc])moduleOwn._descriptor[name] = {
                                    access: acc
                                };
                            } else if ('function' === accType) console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
                        });
                    }
                };
                var $app_template$ = function(vm) {
                    const _vm_ = vm || this;
                    return aiot.__ce__("div", {
                        __vm__: _vm_,
                        __opts__: {
                            events: {
                                swipe: function(evt) {
                                    return _vm_.move(evt);
                                }
                            },
                            classList: [
                                "bg"
                            ]
                        }
                    }, [
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return _vm_.dark;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "bg"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            src: "/common/bg2.png",
                                            classList: [
                                                "bg"
                                            ]
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "8px",
                                                top: "347px"
                                            },
                                            src: "/common/reset_b.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.new_game(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "100px",
                                                top: "347px"
                                            },
                                            src: "/common/undo_b.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.chcb(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "56px",
                                                top: "405px"
                                            },
                                            src: "/common/info_b.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.openMenu(evt);
                                                }
                                            }
                                        }
                                    }, [])
                                ])
                            ];
                        }),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return !_vm_.dark;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "bg"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            src: "/common/bg1.png",
                                            classList: [
                                                "bg"
                                            ]
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "8px",
                                                top: "347px"
                                            },
                                            src: "/common/reset.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.new_game(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "100px",
                                                top: "347px"
                                            },
                                            src: "/common/undo.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.chcb(evt);
                                                }
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("image", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            style: {
                                                position: "absolute",
                                                left: "56px",
                                                top: "405px"
                                            },
                                            src: "/common/info.png",
                                            events: {
                                                click: function(evt) {
                                                    return _vm_.openMenu(evt);
                                                }
                                            }
                                        }
                                    }, [])
                                ])
                            ];
                        }),
                        aiot.__ce__("div", {
                            __vm__: _vm_,
                            __opts__: {
                                style: {
                                    position: "absolute",
                                    left: "5px",
                                    top: "156px",
                                    width: "186px",
                                    height: "186px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                    display: "flex",
                                    flexWrap: "wrap"
                                }
                            }
                        }, [
                            aiot.__ci__({
                                __vm__: _vm_,
                                __opts__: {
                                    shown: function() {
                                        return !_vm_.dark;
                                    }
                                }
                            }, function() {
                                return [
                                    aiot.__cf__({
                                        __vm__: _vm_,
                                        __opts__: {
                                            exp: function() {
                                                return _vm_.blocks;
                                            },
                                            key: "$idx",
                                            value: "$item"
                                        }
                                    }, function($idx, $item) {
                                        return [
                                            aiot.__ce__("text", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    classList: [
                                                        "square"
                                                    ],
                                                    style: function() {
                                                        return __webpack_require__.g.$translateStyle$("background-color: " + _vm_.bgc[_vm_.md[$item]] + ";");
                                                    },
                                                    id: function() {
                                                        return $item;
                                                    },
                                                    value: function() {
                                                        return _vm_.md[$item];
                                                    }
                                                }
                                            }, [])
                                        ];
                                    })
                                ];
                            }),
                            aiot.__ci__({
                                __vm__: _vm_,
                                __opts__: {
                                    shown: function() {
                                        return !!_vm_.dark;
                                    }
                                }
                            }, function() {
                                return [
                                    aiot.__cf__({
                                        __vm__: _vm_,
                                        __opts__: {
                                            exp: function() {
                                                return _vm_.blocks;
                                            },
                                            key: "$idx",
                                            value: "$item"
                                        }
                                    }, function($idx, $item) {
                                        return [
                                            aiot.__ce__("text", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    classList: [
                                                        "square"
                                                    ],
                                                    style: function() {
                                                        return __webpack_require__.g.$translateStyle$("color: " + _vm_.bgc[_vm_.md[$item]] + ";background-color: " + _vm_.ise[$item]);
                                                    },
                                                    id: function() {
                                                        return $item;
                                                    },
                                                    value: function() {
                                                        return _vm_.md[$item];
                                                    }
                                                }
                                            }, [])
                                        ];
                                    })
                                ];
                            })
                        ]),
                        aiot.__ce__("text", {
                            __vm__: _vm_,
                            __opts__: {
                                classList: [
                                    "score"
                                ],
                                value: function() {
                                    return "最高 " + _vm_.hsc;
                                }
                            }
                        }, []),
                        aiot.__ce__("text", {
                            __vm__: _vm_,
                            __opts__: {
                                classList: [
                                    "score"
                                ],
                                style: {
                                    top: "115px"
                                },
                                value: function() {
                                    return "当前 " + _vm_.sco;
                                }
                            }
                        }, []),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return _vm_.menuFlag;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "bg"
                                        ],
                                        style: {
                                            backgroundColor: "rgba(0, 0, 0, 0)"
                                        }
                                    }
                                }, [
                                    aiot.__ce__("scroll", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "bg"
                                            ],
                                            scrollY: "true",
                                            bounces: "true",
                                            id: "about",
                                            style: {
                                                transform: "{\"translateX\":\"192px\"}"
                                            }
                                        }
                                    }, [
                                        aiot.__ce__("image", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                src: "/common/about.png"
                                            }
                                        }, []),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return _vm_.dark;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/true.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeMode(evt);
                                                            }
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        }),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return !_vm_.dark;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/false.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeMode(evt);
                                                            }
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        }),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return _vm_.ani;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/true.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        style: {
                                                            top: "674px"
                                                        },
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeani(evt);
                                                            }
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        }),
                                        aiot.__ci__({
                                            __vm__: _vm_,
                                            __opts__: {
                                                shown: function() {
                                                    return !_vm_.ani;
                                                }
                                            }
                                        }, function() {
                                            return [
                                                aiot.__ce__("image", {
                                                    __vm__: _vm_,
                                                    __opts__: {
                                                        src: "/common/false.png",
                                                        classList: [
                                                            "btn"
                                                        ],
                                                        events: {
                                                            click: function(evt) {
                                                                return _vm_.changeani(evt);
                                                            }
                                                        },
                                                        style: {
                                                            top: "674px"
                                                        }
                                                    }
                                                }, [])
                                            ];
                                        })
                                    ])
                                ])
                            ];
                        }),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return _vm_.dark || _vm_.menuFlag;
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("image", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        style: {
                                            position: "absolute",
                                            left: "45px",
                                            top: "6px"
                                        },
                                        src: "/common/back_b.png",
                                        events: {
                                            click: function(evt) {
                                                return _vm_.exit("e", evt);
                                            }
                                        }
                                    }
                                }, [])
                            ];
                        }),
                        aiot.__ci__({
                            __vm__: _vm_,
                            __opts__: {
                                shown: function() {
                                    return !(_vm_.dark || _vm_.menuFlag);
                                }
                            }
                        }, function() {
                            return [
                                aiot.__ce__("image", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        style: {
                                            position: "absolute",
                                            left: "45px",
                                            top: "6px"
                                        },
                                        src: "/common/back.png",
                                        events: {
                                            click: function(evt) {
                                                return _vm_.exit("e", evt);
                                            }
                                        }
                                    }
                                }, [])
                            ];
                        })
                    ]);
                };
                $app_exports$['entry'] = function($app_exports$) {
                    $app_script$({}, $app_exports$, $app_require$1);
                    $app_exports$.default.template = $app_template$;
                    $app_exports$.default.style = $app_style$;
                };
            })();
        };
        return createPageHandler();
    })(global, globalThis, window, $app_exports$, $app_evaluate$);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvaW5kZXgvaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3JzcGFja192ZXJzaW9uIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvcnNwYWNrX3VuaXF1ZV9pZCIsIndlYnBhY2s6Ly8vc3JjL3BhZ2VzL2luZGV4L2luZGV4LnV4Il0sInNvdXJjZXNDb250ZW50IjpbIl9fd2VicGFja19yZXF1aXJlX18uZyA9ICgoKSA9PiB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ucnYgPSAoKSA9PiAoXCIxLjQuMTFcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnJ1aWQgPSBcImJ1bmRsZXI9cnNwYWNrQDEuNC4xMVwiO1xuIiwiPHRlbXBsYXRlPlxuXHQ8ZGl2IG9uc3dpcGU9XCJtb3ZlXCIgY2xhc3M9XCJiZ1wiPlxuXHRcdDwhLS3og4zmma8r5oyJ6ZKuLS0+XG5cdFx0PGRpdiBjbGFzcz1cImJnXCIgaWY9XCJ7e2Rhcmt9fVwiPlxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2JnMi5wbmdcIiBjbGFzcz1cImJnXCIvPlxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA4cHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3Jlc2V0X2IucG5nXCIgQGNsaWNrPVwibmV3X2dhbWVcIiAvPlxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiAxMDBweDt0b3A6IDM0N3B4O1wiIHNyYz1cIi9jb21tb24vdW5kb19iLnBuZ1wiIEBjbGljaz1cImNoY2JcIiAvPlxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA1NnB4O3RvcDogNDA1cHg7XCIgc3JjPVwiL2NvbW1vbi9pbmZvX2IucG5nXCIgQGNsaWNrPVwib3Blbk1lbnUoKVwiLz5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiYmdcIiBlbHNlPlxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2JnMS5wbmdcIiBjbGFzcz1cImJnXCIvPlxuXHRcdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA4cHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3Jlc2V0LnBuZ1wiIEBjbGljaz1cIm5ld19nYW1lXCIgLz5cblx0XHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogMTAwcHg7dG9wOiAzNDdweDtcIiBzcmM9XCIvY29tbW9uL3VuZG8ucG5nXCIgQGNsaWNrPVwiY2hjYlwiIC8+XG5cdFx0XHQ8aW1nIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlO2xlZnQ6IDU2cHg7dG9wOiA0MDVweDtcIiBzcmM9XCIvY29tbW9uL2luZm8ucG5nXCIgQGNsaWNrPVwib3Blbk1lbnUoKVwiLz5cblx0XHQ8L2Rpdj5cblx0XHQ8IS0t5Lit6Ze0LS0+XG5cdFx0PGRpdiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA1cHg7dG9wOiAxNTZweDt3aWR0aDogMTg2cHg7aGVpZ2h0OiAxODZweDtwYWRkaW5nLXRvcDogM3B4O3BhZGRpbmctbGVmdDozcHg7ZGlzcGxheTogZmxleDtmbGV4LXdyYXA6IHdyYXA7XCIgPlxuXHRcdFx0PHRleHQgY2xhc3M9XCJzcXVhcmVcIiBmb3I9XCJ7e2Jsb2Nrc319XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB7e2JnY1ttZFskaXRlbV1dfX07XCIgaWQ9e3skaXRlbX19ICBpZj1cInt7IWRhcmt9fVwiPlxuXHRcdFx0XHR7eyBtZFskaXRlbV0gfX1cblx0XHRcdDwvdGV4dD5cblx0XHRcdDx0ZXh0IGNsYXNzPVwic3F1YXJlXCIgZm9yPVwie3tibG9ja3N9fVwiIHN0eWxlPVwiY29sb3I6IHt7YmdjW21kWyRpdGVtXV19fTtiYWNrZ3JvdW5kLWNvbG9yOiB7e2lzZVskaXRlbV19fVwiIGlkPXt7JGl0ZW19fSBlbHNlID5cblx0XHRcdFx0e3sgbWRbJGl0ZW1dIH19IFxuXHRcdFx0PC90ZXh0PlxuXHRcdDwvZGl2PlxuXHRcdDwhLS3np6/liIbniYgtLT5cblx0XHQ8dGV4dCBjbGFzcz1cInNjb3JlXCI+5pyA6auYIHt7IGhzYyB9fTwvdGV4dD5cblx0XHQ8dGV4dCBjbGFzcz1cInNjb3JlXCJzdHlsZT1cInRvcDogMTE1cHg7XCI+5b2T5YmNIHt7IHNjbyB9fTwvdGV4dD5cblx0XHQ8IS0tYWJvdXQtLT5cblx0XHQ8ZGl2IGNsYXNzPVwiYmdcIiBpZj1cInt7bWVudUZsYWd9fVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApXCI+XG5cdFx0PHNjcm9sbCBjbGFzcz1cImJnXCIgc2Nyb2xsLXk9XCJ0cnVlXCIgYm91bmNlcz1cInRydWVcIiBpZD1cImFib3V0XCIgc3R5bGU9XCJ0cmFuc2Zvcm06dHJhbnNsYXRlWCgxOTJweClcIj5cblx0XHRcdDxpbWcgc3JjPVwiL2NvbW1vbi9hYm91dC5wbmdcIi8+XG5cdFx0XHQ8aW1nIHNyYz1cIi9jb21tb24vdHJ1ZS5wbmdcIiBpZj1cInt7ZGFya319XCIgY2xhc3M9XCJidG5cIm9uY2xpY2s9XCJjaGFuZ2VNb2RlXCIvPlxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL2ZhbHNlLnBuZ1wiIGVsc2UgY2xhc3M9XCJidG5cIm9uY2xpY2s9XCJjaGFuZ2VNb2RlXCIvPlxuXHRcdFx0PGltZyBzcmM9XCIvY29tbW9uL3RydWUucG5nXCIgaWY9XCJ7e2FuaX19XCIgY2xhc3M9XCJidG5cIiBzdHlsZT1cInRvcDogNjc0cHg7XCIgb25jbGljaz1cImNoYW5nZWFuaVwiLz5cblx0XHRcdDxpbWcgc3JjPVwiL2NvbW1vbi9mYWxzZS5wbmdcIiBlbHNlIGNsYXNzPVwiYnRuXCJvbmNsaWNrPVwiY2hhbmdlYW5pXCJzdHlsZT1cInRvcDogNjc0cHg7XCIvPlxuXHRcdDwvc2Nyb2xsPjwvZGl2PlxuXHRcdDwhLS1iYWNrLS0+XG5cdFx0PGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA0NXB4O3RvcDogNnB4O1wiIHNyYz1cIi9jb21tb24vYmFja19iLnBuZ1wiIEBjbGljaz1cImV4aXQoJ2UnKVwiIGlmPVwie3tkYXJrfHxtZW51RmxhZ319XCIvPlxuXHRcdDxpbWcgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogNDVweDt0b3A6IDZweDtcIiBzcmM9XCIvY29tbW9uL2JhY2sucG5nXCIgQGNsaWNrPVwiZXhpdCgnZScpXCIgZWxzZS8+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxudGV4dHtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zY29yZSB7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMHB4O1xuXHR0b3A6IDc1cHg7XG5cdHdpZHRoOiAxOTJweDtcblx0Zm9udC1zaXplOiAyOHB4O1xuXHRjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xufVxuLnNxdWFyZSB7XG5cdHdpZHRoOiA0MHB4O1xuXHRoZWlnaHQ6IDQwcHg7XG5cdG1hcmdpbi10b3A6IDRweDtcblx0bWFyZ2luLWxlZnQ6IDRweDtcblx0Ym9yZGVyLXJhZGl1czogMTNweDtcblx0Zm9udC1zaXplOiAxNXB4O1xuXHRjb2xvcjogIzU5NTAzZjtcbn1cbi5iZ3tcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTkycHg7XG4gIGhlaWdodDogNDY5cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuLmJ0bntcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiA0NXB4O1xuXHR0b3A6IDUwNHB4O1xufVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbmltcG9ydCBwcm9tcHQgZnJvbSBcIkBzeXN0ZW0ucHJvbXB0XCI7XG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiQHN5c3RlbS5zdG9yYWdlXCI7XG5pbXBvcnQgZm9sbWUgZnJvbSAnQHN5c3RlbS5mb2xtZSdcblxudmFyIHNjID0gMCxcblx0bHMsXG5cdGxocyxcblx0Ym9hcmQgPSBBcnJheSg0KSxcblx0YWRkZWQgPSBBcnJheSg0KSxcblx0b3ZlciA9IDAsXG5cdGxtID1BcnJheSg0KSxcblx0dGhhdDtcbmZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7bG1baV09bmV3IEFycmF5KDQpO2JvYXJkW2ldPW5ldyBBcnJheSg0KTthZGRlZFtpXT1uZXcgQXJyYXkoNCl9XG5leHBvcnQgZGVmYXVsdCB7XG5cdHB1YmxpYzoge1xuXHRcdGJsb2NrczogW1xuXHRcdFx0XCIwXCIsXG5cdFx0XHRcIjFcIixcblx0XHRcdFwiMlwiLFxuXHRcdFx0XCIzXCIsXG5cdFx0XHRcIjRcIixcblx0XHRcdFwiNVwiLFxuXHRcdFx0XCI2XCIsXG5cdFx0XHRcIjdcIixcblx0XHRcdFwiOFwiLFxuXHRcdFx0XCI5XCIsXG5cdFx0XHRcIjEwXCIsXG5cdFx0XHRcIjExXCIsXG5cdFx0XHRcIjEyXCIsXG5cdFx0XHRcIjEzXCIsXG5cdFx0XHRcIjE0XCIsXG5cdFx0XHRcIjE1XCIsXG5cdFx0XSxcblx0XHRtZDogW10sXG5cdFx0aHNjOiAwLFxuXHRcdHNjbzogc2MsXG5cdFx0YmdjOiBbXSxcblx0XHRpc2U6IFtdLFxuXHRcdGNoOjAsXG5cdFx0ZGFyazpmYWxzZSxcblx0XHRtZW51RmxhZzpmYWxzZSxcblx0XHRhbmk6dHJ1ZVxuXHR9LFxuXHRvbkluaXQoKSB7XG5cdFx0dGhhdCA9IHRoaXM7XG5cdFx0bGV0IHRlbXBjID1cblx0XHRcdFwicmdiYSgwLDAsMCwwKSAjRUZFNURBICNGMEUwQzkgI2ZjYjQ3NyAjZmY5YzYxICNmZjg2NWQgI2ZmNmEzOCAjZWJjZjcxICNlYmNjNWYgI2ViYzk0ZiAjZWJjNTNmICNlYmMyMmMgI0YyQjZCNiAjRThFRDUxICNGRkUzRkIgI0U4RkY4QyAjRkZERUM5ICNGNUE0MzMgI0U2MTA5QiAjOTZDNEU2ICNFNTYwQ0RcIi5zcGxpdChcblx0XHRcdFx0XCIgXCJcblx0XHRcdCk7XG5cdFx0dGVtcGMuZm9yRWFjaCgoYSwgaW5kZXgpID0+IHtcblx0XHRcdHRoaXMuYmdjWzIgKiogaW5kZXhdID0gYTtcblx0XHR9KTtcblx0XHR0aGlzLmJnY1tcIlwiXSA9IFwicmdiYSgwLCAwLCAwLCAwKVwiO1xuXHRcdHN0b3JhZ2UuZ2V0KHtcblx0XHRcdGtleTogXCJzY29yZVwiLFxuXHRcdFx0c3VjY2VzczogKGRhdGEpID0+IHtcblx0XHRcdFx0aWYgKGRhdGEpIHtcblx0XHRcdFx0XHRsZXQgbyA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0XHRcdFx0Ym9hcmQ9by5tYXBcblx0XHRcdFx0XHRybTAoby5tYXApO1xuXHRcdFx0XHRcdHRoaXMuaHNjID0gby5ocztcblx0XHRcdFx0XHR0aGlzLnNjbz1vLnNjXG5cdFx0XHRcdFx0dGhpcy5jaCA9IDA7XG5cdFx0XHRcdFx0dGhpcy5kYXJrPW8uZGFya1xuXHRcdFx0XHRcdHRoaXMuYW5pPW8uYW5pXG5cdFx0XHRcdC8vY29uc29sZS5sb2coZGF0YSlcblx0XHRcdFx0fSBlbHNlIHRoaXMubmV3X2dhbWUoKTtcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y2xlYXIoYWRkZWQpXG5cdH0sXG5cdGNoY2IoKSB7XG5cdFx0aWYgKHRoaXMuY2ggPT0xKSB7XG5cdFx0XHR0aGlzLmhzYyA9IGxocztcblx0XHRcdHRoaXMuc2NvID0gbHM7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8NDsgaSsrKSB7XG5cdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XG5cdFx0XHRcdFx0Ym9hcmRbaV1bal09bG1baV1bal1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cm0wKGJvYXJkKTtcblx0XHRcdG92ZXI9MDtcblx0XHRcdHRoaXMuc2F2ZSgpO1xuXHRcdFx0dGhpcy5jaCA9IDA7XG5cdFx0fWVsc2V7XG5cdFx0XHRwcm9tcHQuc2hvd1RvYXN0KHtcbiAgICAgICAgXHRcdG1lc3NhZ2U6IFwi5LiN6IO95YaN5pKk5ZWmXCIsXG4gICAgICAgIFx0XHRkdXJhdGlvbjogMTAwMFxuICAgICAgXHRcdH0pO1xuXHRcdH1cblx0fSxcblx0bmV3X2dhbWUoKSB7XG5cdFx0YmFja3VwKClcblx0XHRuZXdnYW1lKCk7XG5cdFx0dGhpcy5zY28gPSAwO1xuXHRcdHRoaXMuc2F2ZSgpO1xuXHRcdGNsZWFyYW5pKClcblx0fSxcblx0bW92ZShldmUpIHtcblx0XHRpZih0aGlzLm1lbnVGbGFnKXtcblx0XHRcdGlmKGV2ZS5kaXJlY3Rpb249PVwicmlnaHRcIil0aGlzLmV4aXQoJ2UnKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdC8vaWYoZXZlPT1cImRvd25cIiltbyhldmUpO2Vsc2Vcblx0XHRtbyhldmUuZGlyZWN0aW9uKTtcblx0XHRpZiAob3Zlcikge1xuXHRcdFx0cHJvbXB0LnNob3dUb2FzdCh7XG5cdFx0XHRcdG1lc3NhZ2U6IFwiR2FtZW92ZXIhXCIsXG5cdFx0XHRcdGR1cmF0aW9uOiAyMDAwLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNjbyA+IHRoaXMuaHNjKSB7XG5cdFx0XHR0aGlzLmhzYyA9IHRoaXMuc2NvO1xuXHRcdH1cblx0XHR0aGlzLnNhdmUoKTtcblx0fSxcblx0c2F2ZSgpIHtcblx0XHRsZXQgbyA9IHtcblx0XHRcdG1hcDogYm9hcmQsXG5cdFx0XHRoczogdGhpcy5oc2MsXG5cdFx0XHRzYzogdGhpcy5zY28sXG5cdFx0XHRkYXJrOnRoaXMuZGFyayxcblx0XHRcdGFuaTp0aGlzLmFuaVxuXHRcdH07XG5cdFx0Ly9vPVwiXCJcblx0XHRzdG9yYWdlLnNldCh7XG5cdFx0XHRrZXk6IFwic2NvcmVcIixcblx0XHRcdHZhbHVlOiBKU09OLnN0cmluZ2lmeShvKSxcblx0XHRcdHN1Y2Nlc3M6KCk9PnsvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG8pKVxuXHRcdFx0fSxcblx0XHRcdGZhaWw6KCk9Pnt9LFxuXHRcdH0pO1xuXHR9LFxuXG5cdGV4aXQoYSkge1xuICBcdFx0aWYoYS5kaXJlY3Rpb249PSdyaWdodCd8fGE9PVwiZVwiKXtcblx0XHRcdGlmKHRoaXMubWVudUZsYWcpe1xuXHRcdFx0XHRmb2xtZS50byh7aWQ6XCJhYm91dFwiLHRvU3RhdGU6e3RyYW5zbGF0ZVg6XCIxOTJweFwifSxjb25maWc6e2R1cmF0aW9uOjAuMSxlYXNlOlwib3V0XCJ9fSk7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge3RoaXMubWVudUZsYWcgPWZhbHNlO30sIDEwMCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHRoaXMuJGFwcC5leGl0KCk7XG5cdFx0fVxuXHR9LFxuXG5cdG9wZW5NZW51KCkgey8v5omT5byAYWJvdXRcbiAgXHRcdHRoaXMubWVudUZsYWcgPXRydWU7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRmb2xtZS50byh7aWQ6XCJhYm91dFwiLHRvU3RhdGU6e3RyYW5zbGF0ZVg6XCIwcHhcIn0sY29uZmlnOntkdXJhdGlvbjowLjEsZWFzZTpcIm91dFwifX0pO1xuXHRcdH0sIDUwKTtcblx0fSxcblxuXHRjaGFuZ2VNb2RlKCl7XG5cdFx0dGhpcy5kYXJrPSF0aGlzLmRhcms7XG5cdFx0dGhpcy5zYXZlKClcblx0fSxcblx0Y2hhbmdlYW5pKCl7XG5cdFx0dGhpcy5hbmk9IXRoaXMuYW5pO1xuXHRcdHRoaXMuc2F2ZSgpXG5cdH0sb25CYWNrUHJlc3MoKXtcblx0XHR0aGlzLmV4aXQoJ2UnKVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuZnVuY3Rpb24gcm0wKHNtKSB7XG5cdGxldCBhPTA7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdFx0Zm9yICh2YXIgYiA9IDA7IDQgPiBiOyBiKyspIFxuXHRcdHtcblx0XHRcdGlmIChzbVtpXVtiXSA9PSAwKSB7XG5cdFx0XHRcdHRoYXQubWRbYV09XCJcIlxuXHRcdFx0XHR0aGF0LmlzZVthXT1cIiMwMDAwMDAwMFwiO1xuXHRcdFx0fSBlbHNlIHt0aGF0LmlzZVthXT1cIiNmZmZmZmYyMFwiO3RoYXQubWRbYV09c21baV1bYl19XG5cdFx0XHRhKytcblx0XHR9fVxuXHRyZXR1cm5cbn1cbmZ1bmN0aW9uIGNsZWFyKG0pey8v5riF56m65pWw57uEXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7bVtpXS5maWxsKDApfVxufVxuZnVuY3Rpb24gbmV3Z2FtZSgpIHtcblx0IChvdmVyID0gMCk7XG5cdGNsZWFyKGJvYXJkKVxuXHRuZXdibG9jaygpO1xuXHRuZXdibG9jaygpO1xuXHRybTAoYm9hcmQpO1xufVxuZnVuY3Rpb24gcmFuZF9udW0oKXsvL+eUn+aIkOmaj+acuuaVsO+8jOS4uuS6humAgumFjTjnmoTku6PnoIFcblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwKVxufVxuZnVuY3Rpb24gbmV3YmxvY2soKSB7Ly/nlJ/miJDmlrDmlrnlnZdcblx0Zm9yICh2YXIgYSA9IDMsIGIgPSByYW5kX251bSgpICUgNCwgYyA9IHJhbmRfbnVtKCkgJSA0LCBkID0gNTAgPCByYW5kX251bSgpICUgMTAwID8gNCA6IDI7IDAgPCBhOykge1xuXHRcdGlmICgwID09IGJvYXJkW2JdW2NdKSByZXR1cm4gYm9hcmRbYl1bY10gPSBkXG5cdFx0YiA9IHJhbmRfbnVtKCkgJSA0O1xuXHRcdGMgPSByYW5kX251bSgpICUgNDtcblx0XHRhLS1cblx0fVxuXHRmb3IgKGEgPSAwOyA0ID4gYTsgYSsrKVxuXHRcdGZvciAoYiA9IDA7IDQgPiBiOyBiKyspXG5cdFx0XHRpZiAoMCA9PSBib2FyZFthXVtiXSkgcmV0dXJuIGJvYXJkW2FdW2JdID0gMlxufVxuZnVuY3Rpb24gbW8oZGlyKSB7Ly/np7vliqjlh73mlbAyXG5cdGxldCB1cCA9IGNhbk1vdmVVcChib2FyZCksXG5cdFx0ZG93biA9IGNhbk1vdmVEb3duKGJvYXJkKSxcblx0XHRyaWdodCA9IGNhbk1vdmVSaWdodChib2FyZCksXG5cdFx0bGVmdCA9IGNhbk1vdmVMZWZ0KGJvYXJkKTtcblx0aWYgKHVwIHx8IGxlZnQgfHwgZG93biB8fCByaWdodCkge1xuXHRcdGlmKGV2YWwoZGlyKSl7XG5cdFx0XHRiYWNrdXAoKVxuXHRcdFx0ZXZhbChcIm1vdmVcIitkaXIrXCIoKVwiKTtcblx0XHRcdGNsZWFyKGFkZGVkKVxuXHRcdFx0aWYodGhhdC5hbmkpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtjbGVhcmFuaSgpfSwgMTIwKTtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7bmV3YmxvY2soKTtcblx0XHRcdFx0cm0wKGJvYXJkKTtcblx0XHRcdFx0fSwgMTEwKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRuZXdibG9jaygpO1xuXHRcdFx0XHRybTAoYm9hcmQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm5cblx0fSBcblx0b3ZlciA9IDE7XG5cdHJtMChib2FyZCk7cmV0dXJuXG59XG5mdW5jdGlvbiBiYWNrdXAoKXsvL+S9v+iDveWkn+aSpOWbnlxuXHRmb3IgKGxldCBpID0gMDsgaSA8NDsgaSsrKSB7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcblx0XHRcdGxtW2ldW2pdPWJvYXJkW2ldW2pdXG5cdFx0fVxuXHR9XG5cdGxzID0gdGhhdC5zY29cblx0bGhzID0gdGhhdC5oc2Ncblx0dGhhdC5jaD0xXG5cdHJldHVyblxufVxuZnVuY3Rpb24gZnJvbVRvKGlkMSxpZDIpey8v5Yqo55S75Ye95pWw77yM6K6paWQx55qE54mp5ZOB56e75Yqo5YiwaWQyXG5cdGlmKHRoYXQuYW5pKXtcblx0XHRpZDE9aWQxLnRvU3RyaW5nKClcblx0XHRpZDI9aWQyLnRvU3RyaW5nKClcblx0XHRsZXQgeDEseTEseDIseTI7XG5cdFx0dGhhdC4kZWxlbWVudChpZDEpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCh7XG5cdFx0XHRzdWNjZXNzOiAoZGF0YSk9Pntcblx0XHRcdFx0bGV0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0LCB3aWR0aCwgaGVpZ2h0IH0gPSBkYXRhO1xuXHRcdFx0XHR4MT1sZWZ0O3kxPXRvcFxuXHRcdH19KVxuXHRcdHRoYXQuJGVsZW1lbnQoaWQyKS5nZXRCb3VuZGluZ0NsaWVudFJlY3Qoe1xuXHRcdFx0c3VjY2VzczogKGRhdGEpPT57XG5cdFx0XHRcdGxldCB7IHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodCwgd2lkdGgsIGhlaWdodCB9ID0gZGF0YTtcblx0XHRcdFx0eDI9bGVmdDt5Mj10b3Bcblx0XHR9fSlcblx0XHR4Mi09eDE7eTItPXkxXG5cdFx0Zm9sbWUuZnJvbVRvKHtpZDppZDEsZnJvbVN0YXRlOnt0cmFuc2xhdGVZOlwiMHB4XCIsdHJhbnNsYXRlWDpcIjBweFwifSx0b1N0YXRlOnt0cmFuc2xhdGVZOnkyK1wicHhcIix0cmFuc2xhdGVYOngyK1wicHhcIn0sY29uZmlnOntkdXJhdGlvbjowLjF9fSk7XG5cdH1cblx0cmV0dXJuIDBcbn1cbmZ1bmN0aW9uIGNsZWFyYW5pKCl7Ly/muIXpmaTliqjnlLtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdFx0bGV0IGlkPWkudG9TdHJpbmcoKVxuXHRcdGZvbG1lLmNhbmNlbCh7aWQ6aWR9KVxuXHRcdGZvbG1lLnNldFRvKHtpZDppZCx0b1N0YXRlOnt0cmFuc2xhdGVZOlwiMHB4XCIsdHJhbnNsYXRlWDpcIjBweFwifX0pXG5cdH1cbn1cbmZ1bmN0aW9uIG1vdmVsZWZ0KCkge1xuXHRmb3IgKHZhciBhID0gMDsgNCA+IGE7IGErKylcblx0XHRmb3IgKHZhciBiID0gMTsgNCA+IGI7IGIrKylcblx0XHRcdGlmICgwICE9IGJvYXJkW2FdW2JdKVxuXHRcdFx0XHRmb3IgKHZhciBjID0gMDsgYyA8IGI7IGMrKykge1xuXHRcdFx0XHRcdGlmKDAgPT0gYm9hcmRbYV1bY10gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYywgYiwgYm9hcmQpKXtcblx0XHRcdFx0XHRcdGJvYXJkW2FdW2NdID0gYm9hcmRbYV1bYl0sIGJvYXJkW2FdW2JdID0gMDtcblx0XHRcdFx0XHRcdGZyb21UbyhhKjQrYixhKjQrYylcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgYm9hcmRbYV1bY10gPT0gYm9hcmRbYV1bYl0gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYywgYiwgYm9hcmQpICYmICgwICE9IGFkZGVkW2FdW2NdID8gKGJvYXJkW2FdW2MgKyAxXSA9IGJvYXJkW2FdW2JdLCBib2FyZFthXVtiXSA9IDAsZnJvbVRvKGEqNCtiLGEqNCtjKzEpKSA6IChib2FyZFthXVtjXSArPSBib2FyZFthXVtiXSx0aGF0LnNjbys9Ym9hcmRbYV1bYl0qMiwgYm9hcmRbYV1bYl0gPSAwLCBhZGRlZFthXVtjXSA9IDEsZnJvbVRvKGEqNCtiLGEqNCtjKSkpO31cblx0XG5cdFxuXHRyZXR1cm4gITBcbn1cblxuZnVuY3Rpb24gbW92ZXJpZ2h0KCkge1xuXHRmb3IgKHZhciBhID0gMDsgNCA+IGE7IGErKylcblx0XHRmb3IgKHZhciBiID0gMjsgMCA8PSBiOyBiLS0pXG5cdFx0XHRpZiAoMCAhPSBib2FyZFthXVtiXSlcblx0XHRcdFx0Zm9yICh2YXIgYyA9IDM7IGMgPiBiOyBjLS0pXG5cdFx0XHRcdFx0aWYoMCA9PSBib2FyZFthXVtjXSAmJiBub0Jsb2NrSG9yaXpvbnRhbChhLCBiLCBjLCBib2FyZCkpe2JvYXJkW2FdW2NdID0gYm9hcmRbYV1bYl0sIGJvYXJkW2FdW2JdID0gMDtmcm9tVG8oYSo0K2IsYSo0K2MpO2JyZWFrfVxuXHRcdFx0XHRcdGVsc2UgYm9hcmRbYV1bY10gPT0gYm9hcmRbYV1bYl0gJiYgbm9CbG9ja0hvcml6b250YWwoYSwgYiwgYywgYm9hcmQpICYmICgwICE9IGFkZGVkW2FdW2NdID8gKGJvYXJkW2FdW2MgLSAxXSA9IGJvYXJkW2FdW2JdLCBib2FyZFthXVtiXSA9IDAsZnJvbVRvKGEqNCtiLGEqNCtjLTEpKSA6IChib2FyZFthXVtjXSArPSBib2FyZFthXVtiXSx0aGF0LnNjbys9Ym9hcmRbYV1bYl0qMiwgYm9hcmRbYV1bYl0gPSAwLCBhZGRlZFthXVtjXSA9IDEsZnJvbVRvKGEqNCtiLGEqNCtjKSkpO1xuXHRcblx0XG5cdHJldHVybiAhMFxufVxuXG5mdW5jdGlvbiBtb3ZldXAoKSB7XG5cdGZvciAodmFyIGEgPSAwOyA0ID4gYTsgYSsrKVxuXHRcdGZvciAodmFyIGIgPSAxOyA0ID4gYjsgYisrKVxuXHRcdFx0aWYgKDAgIT0gYm9hcmRbYl1bYV0pXG5cdFx0XHRcdGZvciAodmFyIGMgPSAwOyBjIDwgYjsgYysrKXtcblx0XHRcdFx0XHRpZigwID09IGJvYXJkW2NdW2FdICYmIG5vQmxvY2tWZXJ0aWNhbChhLCBjLCBiLCBib2FyZCkpe2JvYXJkW2NdW2FdID0gYm9hcmRbYl1bYV0sIGJvYXJkW2JdW2FdID0gMDtmcm9tVG8oYio0K2EsYyo0K2EpO2JyZWFrfVxuXHRcdFx0XHRcdGVsc2UgYm9hcmRbY11bYV0gPT0gYm9hcmRbYl1bYV0gJiYgbm9CbG9ja1ZlcnRpY2FsKGEsIGMsIGIsIGJvYXJkKSAmJiAoMCAhPSBhZGRlZFtjXVthXSA/IChib2FyZFtjICsgMV1bYV0gPSBib2FyZFtiXVthXSwgYm9hcmRbYl1bYV0gPSAwLGZyb21UbyhiKjQrYSwoYysxKSo0K2EpKSA6IChib2FyZFtjXVthXSArPSBib2FyZFtiXVthXSx0aGF0LnNjbys9Ym9hcmRbY11bYV0sIGJvYXJkW2JdW2FdID0gMCwgYWRkZWRbY11bYV0gPSAxLGZyb21UbyhiKjQrYSxjKjQrYSkpKTt9XG59XG5mdW5jdGlvbiBtb3ZlZG93bigpIHtcblx0Zm9yICh2YXIgYSA9IDA7IDQgPiBhOyBhKyspXG5cdFx0Zm9yICh2YXIgYiA9IDI7IDAgPD0gYjsgYi0tKVxuXHRcdFx0aWYgKDAgIT0gYm9hcmRbYl1bYV0pXG5cdFx0XHRcdGZvciAodmFyIGMgPSAzOyBjID4gYjsgYy0tKXtpZigwID09IGJvYXJkW2NdW2FdICYmIG5vQmxvY2tWZXJ0aWNhbChhLCBiLCBjLCBib2FyZCkpe2JvYXJkW2NdW2FdID0gYm9hcmRbYl1bYV0sIGJvYXJkW2JdW2FdID0gMDtmcm9tVG8oYio0K2EsYyo0K2EpO2JyZWFrfWVsc2UgYm9hcmRbY11bYV0gPT0gYm9hcmRbYl1bYV0gJiYgbm9CbG9ja1ZlcnRpY2FsKGEsIGIsIGMsIGJvYXJkKSAmJiAoMCAhPSBhZGRlZFtjXVthXSA/IChib2FyZFtjIC0gMV1bYV0gPSBib2FyZFtiXVthXSwgYm9hcmRbYl1bYV0gPSAwLGZyb21UbyhiKjQrYSwoYy0xKSo0K2EpKSA6IChib2FyZFtjXVthXSArPSBib2FyZFtiXVthXSx0aGF0LnNjbys9Ym9hcmRbY11bYV0sIGJvYXJkW2JdW2FdID0gMCwgYWRkZWRbY11bYV0gPSAxLGZyb21UbyhiKjQrYSxjKjQrYSkpKTt9XG59XG5mdW5jdGlvbiBjYW5Nb3ZlTGVmdChhKSB7XG5cdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKVxuXHRcdGZvciAodmFyIGMgPSAwOyA0ID4gYzsgYysrKVxuXHRcdFx0aWYgKDAgIT0gYVtiXVtjXSAmJiAwICE9IGMgJiYgKDAgPT0gYVtiXVtjIC0gMV0gfHwgYVtiXVtjIC0gMV0gPT0gYVtiXVtjXSkpIHJldHVybiAhMDtcblx0cmV0dXJuICExXG59XG5cbmZ1bmN0aW9uIGNhbk1vdmVSaWdodChhKSB7XG5cdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKVxuXHRcdGZvciAodmFyIGMgPSAwOyA0ID4gYzsgYysrKVxuXHRcdFx0aWYgKDAgIT0gYVtiXVtjXSAmJiAzICE9IGMgJiYgKDAgPT0gYVtiXVtjICsgMV0gfHwgYVtiXVtjICsgMV0gPT0gYVtiXVtjXSkpIHJldHVybiAhMDtcblx0cmV0dXJuICExXG59XG5cbmZ1bmN0aW9uIGNhbk1vdmVVcChhKSB7XG5cdGZvciAodmFyIGIgPSAwOyA0ID4gYjsgYisrKVxuXHRcdGZvciAodmFyIGMgPSAwOyA0ID4gYzsgYysrKVxuXHRcdFx0aWYgKDAgIT0gYVtiXVtjXSAmJiAwICE9IGIgJiYgKDAgPT0gYVtiIC0gMV1bY10gfHwgYVtiIC0gMV1bY10gPT0gYVtiXVtjXSkpIHJldHVybiAhMDtcblx0cmV0dXJuICExXG59XG5cbmZ1bmN0aW9uIGNhbk1vdmVEb3duKGEpIHtcblx0Zm9yICh2YXIgYiA9IDA7IDQgPiBiOyBiKyspXG5cdFx0Zm9yICh2YXIgYyA9IDA7IDQgPiBjOyBjKyspXG5cdFx0XHRpZiAoMCAhPSBhW2JdW2NdICYmIDMgIT0gYiAmJiAoMCA9PSBhW2IgKyAxXVtjXSB8fCBhW2IgKyAxXVtjXSA9PSBhW2JdW2NdKSkgcmV0dXJuICEwO1xuXHRyZXR1cm4gITFcbn1cblxuZnVuY3Rpb24gbm9CbG9ja0hvcml6b250YWwoYSwgYiwgYywgZCkge1xuXHRmb3IgKGIgKz0gMTsgYiA8IGM7IGIrKylcblx0XHRpZiAoMCAhPSBkW2FdW2JdKSByZXR1cm4gITE7XG5cdHJldHVybiAhMFxufVxuXG5mdW5jdGlvbiBub0Jsb2NrVmVydGljYWwoYSwgYiwgYywgZCkge1xuXHRmb3IgKGIgKz0gMTsgYiA8IGM7IGIrKylcblx0XHRpZiAoMCAhPSBkW2JdW2FdKSByZXR1cm4gITE7XG5cdHJldHVybiAhMFxufVxuXG48L3NjcmlwdD4iXSwibmFtZXMiOlsiX193ZWJwYWNrX3JlcXVpcmVfXyIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImUiLCJ3aW5kb3ciLCJfc3lzdGVtIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIiRhcHBfcmVxdWlyZSQiLCJfc3lzdGVtMiIsIl9zeXN0ZW0zIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJzYyIsImxzIiwibGhzIiwiYm9hcmQiLCJBcnJheSIsImFkZGVkIiwib3ZlciIsImxtIiwidGhhdCIsImkiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJwdWJsaWMiLCJibG9ja3MiLCJtZCIsImhzYyIsInNjbyIsImJnYyIsImlzZSIsImNoIiwiZGFyayIsIm1lbnVGbGFnIiwiYW5pIiwib25Jbml0IiwidGVtcGMiLCJzcGxpdCIsImZvckVhY2giLCJhIiwiaW5kZXgiLCJzdG9yYWdlIiwiZ2V0Iiwia2V5Iiwic3VjY2VzcyIsImRhdGEiLCJvIiwiSlNPTiIsInBhcnNlIiwibWFwIiwicm0wIiwiaHMiLCJuZXdfZ2FtZSIsImNsZWFyIiwiY2hjYiIsImoiLCJzYXZlIiwicHJvbXB0Iiwic2hvd1RvYXN0IiwibWVzc2FnZSIsImR1cmF0aW9uIiwiYmFja3VwIiwibmV3Z2FtZSIsImNsZWFyYW5pIiwibW92ZSIsImV2ZSIsImRpcmVjdGlvbiIsImV4aXQiLCJtbyIsInNldCIsInZhbHVlIiwic3RyaW5naWZ5IiwiZmFpbCIsImZvbG1lIiwidG8iLCJpZCIsInRvU3RhdGUiLCJ0cmFuc2xhdGVYIiwiY29uZmlnIiwiZWFzZSIsInNldFRpbWVvdXQiLCIkYXBwIiwib3Blbk1lbnUiLCJjaGFuZ2VNb2RlIiwiY2hhbmdlYW5pIiwib25CYWNrUHJlc3MiLCJzbSIsImIiLCJtIiwiZmlsbCIsIm5ld2Jsb2NrIiwicmFuZF9udW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjIiwiZCIsImRpciIsInVwIiwiY2FuTW92ZVVwIiwiZG93biIsImNhbk1vdmVEb3duIiwicmlnaHQiLCJjYW5Nb3ZlUmlnaHQiLCJsZWZ0IiwiY2FuTW92ZUxlZnQiLCJldmFsIiwiZnJvbVRvIiwiaWQxIiwiaWQyIiwidG9TdHJpbmciLCJ4MSIsInkxIiwieDIiLCJ5MiIsIiRlbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm90dG9tIiwid2lkdGgiLCJoZWlnaHQiLCJmcm9tU3RhdGUiLCJ0cmFuc2xhdGVZIiwiY2FuY2VsIiwic2V0VG8iLCJtb3ZlbGVmdCIsIm5vQmxvY2tIb3Jpem9udGFsIiwibW92ZXJpZ2h0IiwibW92ZXVwIiwibm9CbG9ja1ZlcnRpY2FsIiwibW92ZWRvd24iXSwibWFwcGlu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