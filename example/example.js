var _ = require('lodash');
var inherits = require('inherits');
var BaseStateApi = require('slot/components/appState/api');
var duoHelper = req('helpers/duo');
var atatata = req('lib/abtatata');
var DuoApi = require('./duo');

inherits(CuteApi, BaseStateApi);
function CuteApi(app) {
    this.app = app;
    BaseStateApi.call(this);

    this.duo = new DuoApi(this)
}

CuteApi.prototype.assign= function(state, runFinalizer) {
    BaseStateApi.prototype.assign.call(this, state, runFinalizer);
    this.duo.setState(this.state);
};

CuteApi.prototype.defaults = function(newState) {
    var state = this.state;

    var duo = state.duo;
    delete state.duo;

    var supaStuff = state.supaStuff;
    delete state.supaStuff;

    var baranka = state.baranka;
    delete state.baranka;

    _.defaults(state, newState);
    this.duo.assign((state.duo || []).concat(duo || []));
    this.supaStuff.assign(_.extend({}, state.supaStuff, supaStuff));
    this.baranka.assign(_.extend({}, state.baranka, baranka));

    return state;
};

/**
 * blablabla
 *
 * @param {String} id - bla
 * @param {Boolean} param - bla
 */
CuteApi.prototype.setBla = function(id, param) {
    this.state.bla = {id: id, param: !!param};
};

CuteApi.prototype.getBla = function() {
    return this.state.bla && this.state.bla.id;
};

/**
 * Foo
 * @param {Object} data foo
 */
CuteApi.prototype.foo = function(data) {
    var fooohId = this.duo.get('find').fooId;
    var state = this.state;

    this.duo.clear();
    this.del('ququ');

    if (_.isString(data)) {
        data = {
            ququ: data
        };
    }
    var fooState = null;
    if (data.ququ) {
        fooState = {
            ququ: data.ququ
        };
    } else if (data.chachacha && data.chachacha.monitor) {
        fooState = {
            ququ: data.chachacha.name,
            monitor: data.chachacha.monitor
        };
    } else if (data.chachacha && data.chachacha.id) {
        fooState = {
            ququ: data.chachacha.text,
            chachachaId: data.chachacha.id
        };
    } else if (data.wheel && data.wheel.context) {
        fooState = {
            wheel: data.wheel.context,
            ququ: data.text
        };
    }

    if (data.text && data.ququ != data.text) {
        fooState.text = data.text;
    }

    if (data.monitor && _.size(data.monitor)) {
        fooState.monitor = data.monitor;
    }

    if (data.media) {
        fooState.media = true;
    }

    fooState.bss = {};
    if (!_.isUndefined(data.bla)) { 
        fooState.bla.bla = data.bla;
    }

    fooState.searchId = prevFooId;

    if (this.baranka.inBaranka()) {
        fooState.baranka = true;
        fooState.media = true;
    }

    this.duo.add('find', fooState);

    // cute comment
    // other cute comment
    if (state.ololo && state.ololo.type && state.ololo.id && !(state.ololo.hihi || state.ololo.haha)) {
        this.del('ololo');
    }
};
