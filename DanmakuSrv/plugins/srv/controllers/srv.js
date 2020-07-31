/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var strapi_ = strapi;
//# sourceMappingURL=strapi.js.map

var strapi$1 = strapi_;
var request = require('request');
var post_data = function (url, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request({
                    url: url,
                    method: 'POST',
                    json: true,
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: data
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) ;
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var DouyinStat = /** @class */ (function () {
    function DouyinStat() {
        this.init = false;
        this.douyin_pk_conf = null;
        this.douyin_pages_loaded = {};
        this.stat_pk = {};
    }
    DouyinStat.prototype.boot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strapi_.log.info('douyin stat boot');
                        return [4 /*yield*/, strapi$1
                                .query('plugin-conf')
                                .find({ name: 'douyin-pk' })];
                    case 1:
                        entry = (_a.sent())[0];
                        if (!entry) return [3 /*break*/, 3];
                        strapi$1.log.info('dm service index', entry.name);
                        this.init_ws_poll(entry['rpc_server_url']);
                        this.douyin_pk_conf = entry;
                        this.stat_pk = {};
                        // strapi.log.info("dm-plugin today", this.today_date);
                        // strapi.log.info("strapi.services", strapi.services);
                        return [4 /*yield*/, this.calc_pk()];
                    case 2:
                        // strapi.log.info("dm-plugin today", this.today_date);
                        // strapi.log.info("strapi.services", strapi.services);
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DouyinStat.prototype.init_ws_poll = function (rpc_url) {
        return __awaiter(this, void 0, void 0, function () {
            var socket;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!rpc_url) return [3 /*break*/, 2];
                        // i
                        if (rpc_url.charAt(rpc_url.length - 1) === '/')
                            rpc_url = rpc_url.substr(0, rpc_url.length - 1);
                        strapi$1.log.info('conf server url:', rpc_url);
                        // setInterval(async () => {
                        // heart polling
                        // get active conf
                        return [4 /*yield*/, request(rpc_url + '/srv/dm-plugin/get', function (err, res, body) { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            strapi$1.log.debug('[ping]', rpc_url + '/srv/dm-plugin/get');
                                            if (!this.douyin_pk_conf) return [3 /*break*/, 3];
                                            data = JSON.parse(body);
                                            return [4 /*yield*/, this.update_conf(data)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, this.compare_stat_upload(data, rpc_url)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })
                            // }, 3000)
                        ]; // request
                    case 1:
                        // setInterval(async () => {
                        // heart polling
                        // get active conf
                        _a.sent(); // request
                        socket = require('socket.io-client')(rpc_url + '/dm');
                        socket.on('connect', function () {
                            strapi$1.log.info('init ws conf', rpc_url);
                        });
                        socket.on('DM_EVENT_GET_LAST_DM', function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var dm_arr;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(Number(data['amount']) > 0)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.find_lottery_user(data['amount'], 0, [])];
                                    case 1:
                                        dm_arr = _a.sent();
                                        strapi_.log.info('douyinStatSrv dm_arr', dm_arr.length);
                                        // rpc_url
                                        return [4 /*yield*/, post_data(rpc_url + '/srv/dm-plugin/last-dm/', { dm_arr: dm_arr })];
                                    case 2:
                                        // rpc_url
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        socket.on('test', function () {
                            strapi_.log.info('test ws');
                        });
                        socket.on('DM_EVENT_NEW_CONF', function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        // receive new conf 
                                        strapi_.log.info('DM_EVENT_NEW_CONF');
                                        return [4 /*yield*/, this.update_conf(data)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.compare_stat_upload(data, rpc_url)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        socket.on('disconnect', function () { });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DouyinStat.prototype.find_lottery_user = function (amount, start, $dm_arr) {
        return __awaiter(this, void 0, void 0, function () {
            var find_dm, find_from, dm_pages, _i, dm_pages_1, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        find_dm = function (page, dm_arr) {
                            var data = page.data;
                            if (data && data['dm_arr'] && data['dm_arr'].length) {
                                strapi_.log.info('find_lottery_user concat:', data['dm_arr'].length);
                                // return dm_arr.concat(data['dm_arr'])
                                for (var i = 0; i < data['dm_arr'].length; i++) {
                                    var dm = data['dm_arr'][i];
                                    dm_arr.push(dm);
                                }
                            }
                        };
                        find_from = this.douyin_pk_conf['stat_from'];
                        return [4 /*yield*/, strapi$1
                                .query('dm-page')
                                .find({
                                created_at_gt: find_from,
                                _start: start,
                                _sort: 'created_at:desc'
                            })];
                    case 1:
                        dm_pages = _a.sent();
                        for (_i = 0, dm_pages_1 = dm_pages; _i < dm_pages_1.length; _i++) {
                            page = dm_pages_1[_i];
                            if ($dm_arr.length < amount)
                                find_dm(page, $dm_arr);
                            else
                                break;
                        }
                        strapi_.log.info('find_lottery_user need:', amount, 'find', $dm_arr.length);
                        if (!(dm_pages.length === 100 && $dm_arr.length < amount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.find_lottery_user(amount, start + 100, $dm_arr)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, $dm_arr];
                }
            });
        });
    };
    DouyinStat.prototype.update_conf = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        strapi$1.log.info('update active conf');
                        if (!(data &&
                            this.douyin_pk_conf['conf_updated_at'] !==
                                data['option_conf']['conf_updated_at'])) return [3 /*break*/, 2];
                        if (data['option_conf']) {
                            this.douyin_pk_conf['data']['option_arr'] =
                                data['option_conf']['option_arr'];
                        }
                        this.douyin_pk_conf['stat_from'] = data['option_conf']['stat_from'];
                        this.douyin_pk_conf['conf_updated_at'] =
                            data['option_conf']['conf_updated_at'];
                        return [4 /*yield*/, strapi$1
                                .query('plugin-conf')
                                .update({ id: this.douyin_pk_conf['id'] }, this.douyin_pk_conf)];
                    case 1:
                        _a.sent();
                        strapi$1.log.info('update active cond', this.douyin_pk_conf['data']);
                        this.boot();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DouyinStat.prototype.compare_stat_upload = function (data, url) {
        return __awaiter(this, void 0, void 0, function () {
            var option_arr, remote_option_arr, is_new_stat, _i, remote_option_arr_1, remote_option, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        option_arr = this.douyin_pk_conf['data']['option_arr'];
                        remote_option_arr = data['option_conf']['option_arr'];
                        if (!option_arr) return [3 /*break*/, 2];
                        is_new_stat = false;
                        // strapi.log.info('remote:', remote_option_arr)
                        for (_i = 0, remote_option_arr_1 = remote_option_arr; _i < remote_option_arr_1.length; _i++) {
                            remote_option = remote_option_arr_1[_i];
                            query = remote_option['query'];
                            if (this.stat_pk[query] !== remote_option['count']) {
                                is_new_stat = true;
                                remote_option['count'] = this.stat_pk[query];
                            }
                        }
                        if (!is_new_stat) return [3 /*break*/, 2];
                        strapi$1.log.info('new stat', this.stat_pk);
                        return [4 /*yield*/, post_data(url + '/srv/dm-plugin/stat', {
                                option_conf: { option_arr: remote_option_arr }
                            })
                            // await request(
                            //     {
                            //         url: url + '/srv/dm-plugin/stat',
                            //         method: 'POST',
                            //         json: true,
                            //         headers: {
                            //             'content-type': 'application/json'
                            //         },
                            //         body: { option_conf: { option_arr: remote_option_arr } }
                            //     },
                            //     function (error: any, response: any, body: any) {
                            //         if (!error && response.statusCode == 200) {
                            //         }
                            //     }
                            // )
                        ];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DouyinStat.prototype.calc_pk = function (start) {
        if (start === void 0) { start = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var entry, find_from, dm_pages, _i, _a, option, _b, dm_pages_2, page;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, strapi$1
                            .query('plugin-conf')
                            .find({ name: 'douyin-pk' })];
                    case 1:
                        entry = (_c.sent())[0];
                        if (!entry) return [3 /*break*/, 3];
                        find_from = entry['stat_from'];
                        return [4 /*yield*/, strapi$1
                                .query('dm-page')
                                .find({ created_at_gt: find_from, _start: start })];
                    case 2:
                        dm_pages = _c.sent();
                        if (dm_pages.length) {
                            strapi$1.log.info('active conf option_arr');
                            for (_i = 0, _a = this.douyin_pk_conf['data']['option_arr']; _i < _a.length; _i++) {
                                option = _a[_i];
                                strapi$1.log.info('--option', option);
                            }
                            for (_b = 0, dm_pages_2 = dm_pages; _b < dm_pages_2.length; _b++) {
                                page = dm_pages_2[_b];
                                this.calc_page(page);
                            }
                            // this.stat_pk = stat_pk;
                            strapi$1.log.info(':::stat_from', find_from, 'start', start);
                            strapi$1.log.info(':::dm-pages count:', dm_pages.length);
                            strapi$1.log.info(':::stat_', this.stat_pk);
                            // strapi.log.info(":::stat_", this.stat_pk);
                            if (dm_pages.length === 100) {
                                this.calc_pk(start + 100);
                            }
                        }
                        else {
                            strapi$1.log.info('stat_pk', 'no dm-page from', find_from);
                        }
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DouyinStat.prototype.calc_page = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var find_query, data, _i, _a, dm, text;
            return __generator(this, function (_b) {
                find_query = function (text, pk_conf, stat_pk) {
                    for (var _i = 0, _a = pk_conf['data']['option_arr']; _i < _a.length; _i++) {
                        var option = _a[_i];
                        var query = option.query;
                        if (!stat_pk[query])
                            stat_pk[query] = 0;
                        if (query && text.includes(query)) {
                            stat_pk[query]++;
                            // strapi.log.info("calc_pk", query, stat_pk[query]);
                        }
                    }
                };
                data = page.data;
                if (data && data['dm_arr']) {
                    for (_i = 0, _a = data['dm_arr']; _i < _a.length; _i++) {
                        dm = _a[_i];
                        text = dm.text;
                        find_query(text, this.douyin_pk_conf, this.stat_pk);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return DouyinStat;
}());

var strapi$2 = strapi_;
var douyinStatSrv = new DouyinStat();
setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
    var dm_arr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, douyinStatSrv.boot()];
            case 1:
                _a.sent();
                return [4 /*yield*/, douyinStatSrv.find_lottery_user(100, 0, [])];
            case 2:
                dm_arr = _a.sent();
                strapi_.log.info('douyinStatSrv dm_arr', dm_arr.length);
                return [2 /*return*/];
        }
    });
}); }, 2000);
var PLUG_POST_dm_page = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var dmk_list, new_dm_arr, _i, dmk_list_1, dmk, a, username, text, entry, new_page, created_at;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dmk_list = ctx.request.body.dmk_list;
                strapi$2.log.info('PLUG_POST_dm_page', dmk_list.length);
                new_dm_arr = [];
                if (dmk_list && dmk_list.length > 0) {
                    strapi$2.log.info('receive from airtest<==dmk_list:', dmk_list.length);
                    for (_i = 0, dmk_list_1 = dmk_list; _i < dmk_list_1.length; _i++) {
                        dmk = dmk_list_1[_i];
                        a = dmk.split('：');
                        if (a.length > 1) {
                            username = a.shift();
                            text = a.join('：');
                            strapi$2.log.info("::" + username + ": ", text);
                            new_dm_arr.push({ username: username, text: text });
                        }
                    }
                }
                if (!new_dm_arr.length) return [3 /*break*/, 2];
                new_page = {
                    data: { dm_arr: new_dm_arr }
                };
                return [4 /*yield*/, strapi$2.query('dm-page').create(new_page)];
            case 1:
                entry = _a.sent();
                created_at = entry['created_at'];
                strapi$2.log.info('new dm-page created_at', created_at);
                douyinStatSrv.calc_page(new_page);
                strapi$2.log.info('stat_pk', douyinStatSrv.stat_pk);
                _a.label = 2;
            case 2:
                // Send 200 `ok`
                ctx.send({
                    message: 'ok',
                    create_count: new_dm_arr.length
                });
                return [2 /*return*/];
        }
    });
}); };
var PLUG_GET_dm_page = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        strapi$2.log.info('dm stat start');
        // Send 200 `ok`
        ctx.send({
            message: 'ok',
            stat: douyinStatSrv.stat_pk,
            conf: douyinStatSrv.douyin_pk_conf['data']
        });
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=dm-page.js.map

//┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
//╎                plugin routes
//╎
//╎
//└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
var POST_plugins = {
    boot: PLUG_POST_dm_page,
    'dm-page': PLUG_POST_dm_page
};
var GET_plugins = {
    // /srv/dm-page/get
    'dm-page': PLUG_GET_dm_page
};
//┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
//╎                 strapi handler
//╎
//╎
//└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
module.exports = {
    index: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var plugin_name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    plugin_name = ctx.params.plugin_name;
                    return [4 /*yield*/, handle(GET_plugins, plugin_name, ctx)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); },
    index_post: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var plugin_name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    plugin_name = ctx.params.plugin_name;
                    return [4 /*yield*/, handle(POST_plugins, plugin_name, ctx)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
};
//┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
//╎                  handler
//╎
//╎
//└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
var handle = function (plugin_routes, plugin_name, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var func;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                func = plugin_routes[plugin_name];
                if (!func) return [3 /*break*/, 2];
                return [4 /*yield*/, func(ctx)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                ctx.send({
                    msg: 'no plugin',
                    plugin_name: plugin_name
                });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=srv.js.map
//# sourceMappingURL=srv.js.map
