(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function() {
var _slice = Array.prototype.slice;
var Bacon = {
  toString: function () {
    return "Bacon";
  }
};

Bacon.version = '0.7.84';

var Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;
var nop = function () {};
var latter = function (_, x) {
  return x;
};
var former = function (x, _) {
  return x;
};
var cloneArray = function (xs) {
  return xs.slice(0);
};
var assert = function (message, condition) {
  if (!condition) {
    throw new Exception(message);
  }
};
var assertObservableIsProperty = function (x) {
  if ((x != null ? x._isObservable : void 0) && !(x != null ? x._isProperty : void 0)) {
    throw new Exception("Observable is not a Property : " + x);
  }
};
var assertEventStream = function (event) {
  if (!(event != null ? event._isEventStream : void 0)) {
    throw new Exception("not an EventStream : " + event);
  }
};

var assertObservable = function (event) {
  if (!(event != null ? event._isObservable : void 0)) {
    throw new Exception("not an Observable : " + event);
  }
};
var assertFunction = function (f) {
  return assert("not a function : " + f, _.isFunction(f));
};
var isArray = function (xs) {
  return xs instanceof Array;
};
var isObservable = function (x) {
  return x && x._isObservable;
};
var assertArray = function (xs) {
  if (!isArray(xs)) {
    throw new Exception("not an array : " + xs);
  }
};
var assertNoArguments = function (args) {
  return assert("no arguments supported", args.length === 0);
};
var assertString = function (x) {
  if (typeof x === "string") {
    throw new Exception("not a string : " + x);
  }
};

var extend = function (target) {
  var length = arguments.length;
  for (var i = 1; 1 < length ? i < length : i > length; 1 < length ? i++ : i--) {
    for (var prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
};

var inherit = function (child, parent) {
  var hasProp = ({}).hasOwnProperty;
  var ctor = function () {};
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  for (var key in parent) {
    if (hasProp.call(parent, key)) {
      child[key] = parent[key];
    }
  }
  return child;
};

var _ = {
  indexOf: (function () {
    if (Array.prototype.indexOf) {
      return function (xs, x) {
        return xs.indexOf(x);
      };
    } else {
      return function (xs, x) {
        for (var i = 0, y; i < xs.length; i++) {
          y = xs[i];
          if (x === y) {
            return i;
          }
        }
        return -1;
      };
    }
  })(),
  indexWhere: function (xs, f) {
    for (var i = 0, y; i < xs.length; i++) {
      y = xs[i];
      if (f(y)) {
        return i;
      }
    }
    return -1;
  },
  head: function (xs) {
    return xs[0];
  },
  always: function (x) {
    return function () {
      return x;
    };
  },
  negate: function (f) {
    return function (x) {
      return !f(x);
    };
  },
  empty: function (xs) {
    return xs.length === 0;
  },
  tail: function (xs) {
    return xs.slice(1, xs.length);
  },
  filter: function (f, xs) {
    var filtered = [];
    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      if (f(x)) {
        filtered.push(x);
      }
    }
    return filtered;
  },
  map: function (f, xs) {
    return (function () {
      var result = [];
      for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        result.push(f(x));
      }
      return result;
    })();
  },
  each: function (xs, f) {
    for (var key in xs) {
      if (Object.prototype.hasOwnProperty.call(xs, key)) {
        var value = xs[key];
        f(key, value);
      }
    }
  },
  toArray: function (xs) {
    return isArray(xs) ? xs : [xs];
  },
  contains: function (xs, x) {
    return _.indexOf(xs, x) !== -1;
  },
  id: function (x) {
    return x;
  },
  last: function (xs) {
    return xs[xs.length - 1];
  },
  all: function (xs) {
    var f = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];

    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      if (!f(x)) {
        return false;
      }
    }
    return true;
  },
  any: function (xs) {
    var f = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];

    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      if (f(x)) {
        return true;
      }
    }
    return false;
  },
  without: function (x, xs) {
    return _.filter(function (y) {
      return y !== x;
    }, xs);
  },
  remove: function (x, xs) {
    var i = _.indexOf(xs, x);
    if (i >= 0) {
      return xs.splice(i, 1);
    }
  },
  fold: function (xs, seed, f) {
    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      seed = f(seed, x);
    }
    return seed;
  },
  flatMap: function (f, xs) {
    return _.fold(xs, [], function (ys, x) {
      return ys.concat(f(x));
    });
  },
  cached: function (f) {
    var value = None;
    return function () {
      if (typeof value !== "undefined" && value !== null ? value._isNone : undefined) {
        value = f();
        f = undefined;
      }
      return value;
    };
  },
  bind: function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
  isFunction: function (f) {
    return typeof f === "function";
  },
  toString: function (obj) {
    var internals, key, value;
    var hasProp = ({}).hasOwnProperty;
    try {
      recursionDepth++;
      if (obj == null) {
        return "undefined";
      } else if (_.isFunction(obj)) {
        return "function";
      } else if (isArray(obj)) {
        if (recursionDepth > 5) {
          return "[..]";
        }
        return "[" + _.map(_.toString, obj).toString() + "]";
      } else if ((obj != null ? obj.toString : void 0) != null && obj.toString !== Object.prototype.toString) {
        return obj.toString();
      } else if (typeof obj === "object") {
        if (recursionDepth > 5) {
          return "{..}";
        }
        internals = (function () {
          var results = [];
          for (key in obj) {
            if (!hasProp.call(obj, key)) continue;
            value = (function () {
              var error;
              try {
                return obj[key];
              } catch (error) {
                return error;
              }
            })();
            results.push(_.toString(key) + ":" + _.toString(value));
          }
          return results;
        })();
        return "{" + internals + "}";
      } else {
        return obj;
      }
    } finally {
      recursionDepth--;
    }
  }
};

var recursionDepth = 0;

Bacon._ = _;

var UpdateBarrier = Bacon.UpdateBarrier = (function () {
  var rootEvent;
  var waiterObs = [];
  var waiters = {};
  var afters = [];
  var aftersIndex = 0;
  var flushed = {};

  var afterTransaction = function (f) {
    if (rootEvent) {
      return afters.push(f);
    } else {
      return f();
    }
  };

  var whenDoneWith = function (obs, f) {
    if (rootEvent) {
      var obsWaiters = waiters[obs.id];
      if (!(typeof obsWaiters !== "undefined" && obsWaiters !== null)) {
        obsWaiters = waiters[obs.id] = [f];
        return waiterObs.push(obs);
      } else {
        return obsWaiters.push(f);
      }
    } else {
      return f();
    }
  };

  var flush = function () {
    while (waiterObs.length > 0) {
      flushWaiters(0, true);
    }
    flushed = {};
  };

  var flushWaiters = function (index, deps) {
    var obs = waiterObs[index];
    var obsId = obs.id;
    var obsWaiters = waiters[obsId];
    waiterObs.splice(index, 1);
    delete waiters[obsId];
    if (deps && waiterObs.length > 0) {
      flushDepsOf(obs);
    }
    for (var i = 0, f; i < obsWaiters.length; i++) {
      f = obsWaiters[i];
      f();
    }
  };

  var flushDepsOf = function (obs) {
    if (flushed[obs.id]) return;
    var deps = obs.internalDeps();
    for (var i = 0, dep; i < deps.length; i++) {
      dep = deps[i];
      flushDepsOf(dep);
      if (waiters[dep.id]) {
        var index = _.indexOf(waiterObs, dep);
        flushWaiters(index, false);
      }
    }
    flushed[obs.id] = true;
  };

  var inTransaction = function (event, context, f, args) {
    if (rootEvent) {
      return f.apply(context, args);
    } else {
      rootEvent = event;
      try {
        var result = f.apply(context, args);

        flush();
      } finally {
        rootEvent = undefined;
        while (aftersIndex < afters.length) {
          var after = afters[aftersIndex];
          aftersIndex++;
          after();
        }
        aftersIndex = 0;
        afters = [];
      }
      return result;
    }
  };

  var currentEventId = function () {
    return rootEvent ? rootEvent.id : undefined;
  };

  var wrappedSubscribe = function (obs, sink) {
    var unsubd = false;
    var shouldUnsub = false;
    var doUnsub = function () {
      shouldUnsub = true;
      return shouldUnsub;
    };
    var unsub = function () {
      unsubd = true;
      return doUnsub();
    };
    doUnsub = obs.dispatcher.subscribe(function (event) {
      return afterTransaction(function () {
        if (!unsubd) {
          var reply = sink(event);
          if (reply === Bacon.noMore) {
            return unsub();
          }
        }
      });
    });
    if (shouldUnsub) {
      doUnsub();
    }
    return unsub;
  };

  var hasWaiters = function () {
    return waiterObs.length > 0;
  };

  return { whenDoneWith: whenDoneWith, hasWaiters: hasWaiters, inTransaction: inTransaction, currentEventId: currentEventId, wrappedSubscribe: wrappedSubscribe, afterTransaction: afterTransaction };
})();

function Source(obs, sync) {
  var lazy = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  this.obs = obs;
  this.sync = sync;
  this.lazy = lazy;
  this.queue = [];
}

extend(Source.prototype, {
  _isSource: true,

  subscribe: function (sink) {
    return this.obs.dispatcher.subscribe(sink);
  },
  toString: function () {
    return this.obs.toString();
  },
  markEnded: function () {
    this.ended = true;
    return true;
  },
  consume: function () {
    if (this.lazy) {
      return { value: _.always(this.queue[0]) };
    } else {
      return this.queue[0];
    }
  },
  push: function (x) {
    this.queue = [x];
    return [x];
  },
  mayHave: function () {
    return true;
  },
  hasAtLeast: function () {
    return this.queue.length;
  },
  flatten: true
});

function ConsumingSource() {
  Source.apply(this, arguments);
}

inherit(ConsumingSource, Source);
extend(ConsumingSource.prototype, {
  consume: function () {
    return this.queue.shift();
  },
  push: function (x) {
    return this.queue.push(x);
  },
  mayHave: function (c) {
    return !this.ended || this.queue.length >= c;
  },
  hasAtLeast: function (c) {
    return this.queue.length >= c;
  },
  flatten: false
});

function BufferingSource(obs) {
  Source.call(this, obs, true);
}

inherit(BufferingSource, Source);
extend(BufferingSource.prototype, {
  consume: function () {
    var values = this.queue;
    this.queue = [];
    return {
      value: function () {
        return values;
      }
    };
  },
  push: function (x) {
    return this.queue.push(x.value());
  },
  hasAtLeast: function () {
    return true;
  }
});

Source.isTrigger = function (s) {
  if (s != null ? s._isSource : void 0) {
    return s.sync;
  } else {
    return s != null ? s._isEventStream : void 0;
  }
};

Source.fromObservable = function (s) {
  if (s != null ? s._isSource : void 0) {
    return s;
  } else if (s != null ? s._isProperty : void 0) {
    return new Source(s, false);
  } else {
    return new ConsumingSource(s, true);
  }
};

function Desc(context, method, args) {
  this.context = context;
  this.method = method;
  this.args = args;
}

extend(Desc.prototype, {
  _isDesc: true,
  deps: function () {
    if (!this.cached) {
      this.cached = findDeps([this.context].concat(this.args));
    }
    return this.cached;
  },
  toString: function () {
    return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
  }
});

var describe = function (context, method) {
  var ref = context || method;
  if (ref && ref._isDesc) {
    return context || method;
  } else {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return new Desc(context, method, args);
  }
};

var withDesc = function (desc, obs) {
  obs.desc = desc;
  return obs;
};

var findDeps = function (x) {
  if (isArray(x)) {
    return _.flatMap(findDeps, x);
  } else if (isObservable(x)) {
    return [x];
  } else if (typeof x !== "undefined" && x !== null ? x._isSource : undefined) {
    return [x.obs];
  } else {
    return [];
  }
};

Bacon.Desc = Desc;
Bacon.Desc.empty = new Bacon.Desc("", "", []);

var withMethodCallSupport = function (wrapped) {
  return function (f) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (typeof f === "object" && args.length) {
      var context = f;
      var methodName = args[0];
      f = function () {
        return context[methodName].apply(context, arguments);
      };
      args = args.slice(1);
    }
    return wrapped.apply(undefined, [f].concat(args));
  };
};

var makeFunctionArgs = function (args) {
  args = Array.prototype.slice.call(args);
  return makeFunction_.apply(undefined, args);
};

var partiallyApplied = function (f, applied) {
  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return f.apply(undefined, applied.concat(args));
  };
};

var toSimpleExtractor = function (args) {
  return function (key) {
    return function (value) {
      if (!(typeof value !== "undefined" && value !== null)) {
        return;
      } else {
        var fieldValue = value[key];
        if (_.isFunction(fieldValue)) {
          return fieldValue.apply(value, args);
        } else {
          return fieldValue;
        }
      }
    };
  };
};

var toFieldExtractor = function (f, args) {
  var parts = f.slice(1).split(".");
  var partFuncs = _.map(toSimpleExtractor(args), parts);
  return function (value) {
    for (var i = 0, f; i < partFuncs.length; i++) {
      f = partFuncs[i];
      value = f(value);
    }
    return value;
  };
};

var isFieldKey = function (f) {
  return typeof f === "string" && f.length > 1 && f.charAt(0) === ".";
};

var makeFunction_ = withMethodCallSupport(function (f) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  if (_.isFunction(f)) {
    if (args.length) {
      return partiallyApplied(f, args);
    } else {
      return f;
    }
  } else if (isFieldKey(f)) {
    return toFieldExtractor(f, args);
  } else {
    return _.always(f);
  }
});

var makeFunction = function (f, args) {
  return makeFunction_.apply(undefined, [f].concat(args));
};

var convertArgsToFunction = function (obs, f, args, method) {
  if (typeof f !== "undefined" && f !== null ? f._isProperty : undefined) {
    var sampled = f.sampledBy(obs, function (p, s) {
      return [p, s];
    });
    return method.call(sampled, function (_ref) {
      var p = _ref[0];
      var s = _ref[1];
      return p;
    }).map(function (_ref2) {
      var p = _ref2[0];
      var s = _ref2[1];
      return s;
    });
  } else {
    f = makeFunction(f, args);
    return method.call(obs, f);
  }
};

var toCombinator = function (f) {
  if (_.isFunction(f)) {
    return f;
  } else if (isFieldKey(f)) {
    var key = toFieldKey(f);
    return function (left, right) {
      return left[key](right);
    };
  } else {
    throw new Exception("not a function or a field key: " + f);
  }
};

var toFieldKey = function (f) {
  return f.slice(1);
};

function Some(value) {
  this.value = value;
}

extend(Some.prototype, {
  _isSome: true,
  getOrElse: function () {
    return this.value;
  },
  get: function () {
    return this.value;
  },
  filter: function (f) {
    if (f(this.value)) {
      return new Some(this.value);
    } else {
      return None;
    }
  },
  map: function (f) {
    return new Some(f(this.value));
  },
  forEach: function (f) {
    return f(this.value);
  },
  isDefined: true,
  toArray: function () {
    return [this.value];
  },
  inspect: function () {
    return "Some(" + this.value + ")";
  },
  toString: function () {
    return this.inspect();
  }
});

var None = {
  _isNone: true,
  getOrElse: function (value) {
    return value;
  },
  filter: function () {
    return None;
  },
  map: function () {
    return None;
  },
  forEach: function () {},
  isDefined: false,
  toArray: function () {
    return [];
  },
  inspect: function () {
    return "None";
  },
  toString: function () {
    return this.inspect();
  }
};

var toOption = function (v) {
  if ((typeof v !== "undefined" && v !== null ? v._isSome : undefined) || (typeof v !== "undefined" && v !== null ? v._isNone : undefined)) {
    return v;
  } else {
    return new Some(v);
  }
};

Bacon.noMore = "<no-more>";
Bacon.more = "<more>";

var eventIdCounter = 0;

function Event() {
  this.id = ++eventIdCounter;
}

Event.prototype._isEvent = true;
Event.prototype.isEvent = function () {
  return true;
};
Event.prototype.isEnd = function () {
  return false;
};
Event.prototype.isInitial = function () {
  return false;
};
Event.prototype.isNext = function () {
  return false;
};
Event.prototype.isError = function () {
  return false;
};
Event.prototype.hasValue = function () {
  return false;
};
Event.prototype.filter = function () {
  return true;
};
Event.prototype.inspect = function () {
  return this.toString();
};
Event.prototype.log = function () {
  return this.toString();
};

function Next(valueF, eager) {
  if (!(this instanceof Next)) {
    return new Next(valueF, eager);
  }

  Event.call(this);

  if (!eager && _.isFunction(valueF) || (valueF != null ? valueF._isNext : void 0)) {
    this.valueF = valueF;
    this.valueInternal = void 0;
  } else {
    this.valueF = void 0;
    this.valueInternal = valueF;
  }
}

inherit(Next, Event);

Next.prototype.isNext = function () {
  return true;
};
Next.prototype.hasValue = function () {
  return true;
};
Next.prototype.value = function () {
  var ref;
  if ((ref = this.valueF) != null ? ref._isNext : void 0) {
    this.valueInternal = this.valueF.value();
    this.valueF = void 0;
  } else if (this.valueF) {
    this.valueInternal = this.valueF();
    this.valueF = void 0;
  }
  return this.valueInternal;
};

Next.prototype.fmap = function (f) {
  var event, value;
  if (this.valueInternal) {
    value = this.valueInternal;
    return this.apply(function () {
      return f(value);
    });
  } else {
    event = this;
    return this.apply(function () {
      return f(event.value());
    });
  }
};

Next.prototype.apply = function (value) {
  return new Next(value);
};
Next.prototype.filter = function (f) {
  return f(this.value());
};
Next.prototype.toString = function () {
  return _.toString(this.value());
};
Next.prototype.log = function () {
  return this.value();
};
Next.prototype._isNext = true;

function Initial(valueF, eager) {
  if (!(this instanceof Initial)) {
    return new Initial(valueF, eager);
  }
  Next.call(this, valueF, eager);
}

inherit(Initial, Next);
Initial.prototype._isInitial = true;
Initial.prototype.isInitial = function () {
  return true;
};
Initial.prototype.isNext = function () {
  return false;
};
Initial.prototype.apply = function (value) {
  return new Initial(value);
};
Initial.prototype.toNext = function () {
  return new Next(this);
};

function End() {
  if (!(this instanceof End)) {
    return new End();
  }
  Event.call(this);
}

inherit(End, Event);
End.prototype.isEnd = function () {
  return true;
};
End.prototype.fmap = function () {
  return this;
};
End.prototype.apply = function () {
  return this;
};
End.prototype.toString = function () {
  return "<end>";
};

function Error(error) {
  if (!(this instanceof Error)) {
    return new Error(error);
  }
  this.error = error;
  Event.call(this);
}

inherit(Error, Event);
Error.prototype.isError = function () {
  return true;
};
Error.prototype.fmap = function () {
  return this;
};
Error.prototype.apply = function () {
  return this;
};
Error.prototype.toString = function () {
  return "<error> " + _.toString(this.error);
};

Bacon.Event = Event;
Bacon.Initial = Initial;
Bacon.Next = Next;
Bacon.End = End;
Bacon.Error = Error;

var initialEvent = function (value) {
  return new Initial(value, true);
};
var nextEvent = function (value) {
  return new Next(value, true);
};
var endEvent = function () {
  return new End();
};
var toEvent = function (x) {
  if (x && x._isEvent) {
    return x;
  } else {
    return nextEvent(x);
  }
};

var idCounter = 0;
var registerObs = function () {};

function Observable(desc) {
  this.desc = desc;
  this.id = ++idCounter;
  this.initialDesc = this.desc;
}

extend(Observable.prototype, {
  _isObservable: true,

  subscribe: function (sink) {
    return UpdateBarrier.wrappedSubscribe(this, sink);
  },

  subscribeInternal: function (sink) {
    return this.dispatcher.subscribe(sink);
  },

  onValue: function () {
    var f = makeFunctionArgs(arguments);
    return this.subscribe(function (event) {
      if (event.hasValue()) {
        return f(event.value());
      }
    });
  },

  onValues: function (f) {
    return this.onValue(function (args) {
      return f.apply(undefined, args);
    });
  },

  onError: function () {
    var f = makeFunctionArgs(arguments);
    return this.subscribe(function (event) {
      if (event.isError()) {
        return f(event.error);
      }
    });
  },

  onEnd: function () {
    var f = makeFunctionArgs(arguments);
    return this.subscribe(function (event) {
      if (event.isEnd()) {
        return f();
      }
    });
  },

  name: function (name) {
    this._name = name;
    return this;
  },

  withDescription: function () {
    this.desc = describe.apply(undefined, arguments);
    return this;
  },

  toString: function () {
    if (this._name) {
      return this._name;
    } else {
      return this.desc.toString();
    }
  },

  internalDeps: function () {
    return this.initialDesc.deps();
  }
});

Observable.prototype.assign = Observable.prototype.onValue;
Observable.prototype.forEach = Observable.prototype.onValue;
Observable.prototype.inspect = Observable.prototype.toString;

Bacon.Observable = Observable;

function CompositeUnsubscribe() {
  var ss = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  this.unsubscribe = _.bind(this.unsubscribe, this);
  this.unsubscribed = false;
  this.subscriptions = [];
  this.starting = [];
  for (var i = 0, s; i < ss.length; i++) {
    s = ss[i];
    this.add(s);
  }
}

extend(CompositeUnsubscribe.prototype, {
  add: function (subscription) {
    var _this2 = this;

    if (this.unsubscribed) {
      return;
    }
    var ended = false;
    var unsub = nop;
    this.starting.push(subscription);
    var unsubMe = function () {
      if (_this2.unsubscribed) {
        return;
      }
      ended = true;
      _this2.remove(unsub);
      return _.remove(subscription, _this2.starting);
    };
    unsub = subscription(this.unsubscribe, unsubMe);
    if (!(this.unsubscribed || ended)) {
      this.subscriptions.push(unsub);
    } else {
      unsub();
    }
    _.remove(subscription, this.starting);
    return unsub;
  },

  remove: function (unsub) {
    if (this.unsubscribed) {
      return;
    }
    if (_.remove(unsub, this.subscriptions) !== undefined) {
      return unsub();
    }
  },

  unsubscribe: function () {
    if (this.unsubscribed) {
      return;
    }
    this.unsubscribed = true;
    var iterable = this.subscriptions;
    for (var i = 0; i < iterable.length; i++) {
      iterable[i]();
    }
    this.subscriptions = [];
    this.starting = [];
    return [];
  },

  count: function () {
    if (this.unsubscribed) {
      return 0;
    }
    return this.subscriptions.length + this.starting.length;
  },

  empty: function () {
    return this.count() === 0;
  }
});

Bacon.CompositeUnsubscribe = CompositeUnsubscribe;

function Dispatcher(_subscribe, _handleEvent) {
  this._subscribe = _subscribe;
  this._handleEvent = _handleEvent;
  this.subscribe = _.bind(this.subscribe, this);
  this.handleEvent = _.bind(this.handleEvent, this);
  this.pushing = false;
  this.ended = false;
  this.prevError = undefined;
  this.unsubSrc = undefined;
  this.subscriptions = [];
  this.queue = [];
}

Dispatcher.prototype.hasSubscribers = function () {
  return this.subscriptions.length > 0;
};

Dispatcher.prototype.removeSub = function (subscription) {
  this.subscriptions = _.without(subscription, this.subscriptions);
  return this.subscriptions;
};

Dispatcher.prototype.push = function (event) {
  if (event.isEnd()) {
    this.ended = true;
  }
  return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
};

Dispatcher.prototype.pushToSubscriptions = function (event) {
  try {
    var tmp = this.subscriptions;
    var len = tmp.length;
    for (var i = 0; i < len; i++) {
      var sub = tmp[i];
      var reply = sub.sink(event);
      if (reply === Bacon.noMore || event.isEnd()) {
        this.removeSub(sub);
      }
    }
    return true;
  } catch (error) {
    this.pushing = false;
    this.queue = [];
    throw error;
  }
};

Dispatcher.prototype.pushIt = function (event) {
  if (!this.pushing) {
    if (event === this.prevError) {
      return;
    }
    if (event.isError()) {
      this.prevError = event;
    }
    this.pushing = true;
    this.pushToSubscriptions(event);
    this.pushing = false;
    while (this.queue.length) {
      event = this.queue.shift();
      this.push(event);
    }
    if (this.hasSubscribers()) {
      return Bacon.more;
    } else {
      this.unsubscribeFromSource();
      return Bacon.noMore;
    }
  } else {
    this.queue.push(event);
    return Bacon.more;
  }
};

Dispatcher.prototype.handleEvent = function (event) {
  if (this._handleEvent) {
    return this._handleEvent(event);
  } else {
    return this.push(event);
  }
};

Dispatcher.prototype.unsubscribeFromSource = function () {
  if (this.unsubSrc) {
    this.unsubSrc();
  }
  this.unsubSrc = undefined;
};

Dispatcher.prototype.subscribe = function (sink) {
  var subscription;
  if (this.ended) {
    sink(endEvent());
    return nop;
  } else {
    assertFunction(sink);
    subscription = {
      sink: sink
    };
    this.subscriptions.push(subscription);
    if (this.subscriptions.length === 1) {
      this.unsubSrc = this._subscribe(this.handleEvent);
      assertFunction(this.unsubSrc);
    }
    return (function (_this) {
      return function () {
        _this.removeSub(subscription);
        if (!_this.hasSubscribers()) {
          return _this.unsubscribeFromSource();
        }
      };
    })(this);
  }
};

Bacon.Dispatcher = Dispatcher;

function EventStream(desc, subscribe, handler) {
  if (!(this instanceof EventStream)) {
    return new EventStream(desc, subscribe, handler);
  }
  if (_.isFunction(desc)) {
    handler = subscribe;
    subscribe = desc;
    desc = Desc.empty;
  }
  Observable.call(this, desc);
  assertFunction(subscribe);
  this.dispatcher = new Dispatcher(subscribe, handler);
  registerObs(this);
}

inherit(EventStream, Observable);
extend(EventStream.prototype, {
  _isEventStream: true,

  toProperty: function (initValue_) {
    var initValue = arguments.length === 0 ? None : toOption(function () {
      return initValue_;
    });
    var disp = this.dispatcher;
    var desc = new Bacon.Desc(this, "toProperty", [initValue_]);
    return new Property(desc, function (sink) {
      var initSent = false;
      var subbed = false;
      var unsub = nop;
      var reply = Bacon.more;
      var sendInit = function () {
        if (!initSent) {
          return initValue.forEach(function (value) {
            initSent = true;
            reply = sink(new Initial(value));
            if (reply === Bacon.noMore) {
              unsub();
              unsub = nop;
              return nop;
            }
          });
        }
      };

      unsub = disp.subscribe(function (event) {
        if (event.hasValue()) {
          if (event.isInitial() && !subbed) {
            initValue = new Some(function () {
              return event.value();
            });
            return Bacon.more;
          } else {
            if (!event.isInitial()) {
              sendInit();
            }
            initSent = true;
            initValue = new Some(event);
            return sink(event);
          }
        } else {
          if (event.isEnd()) {
            reply = sendInit();
          }
          if (reply !== Bacon.noMore) {
            return sink(event);
          }
        }
      });
      subbed = true;
      sendInit();
      return unsub;
    });
  },

  toEventStream: function () {
    return this;
  },

  withHandler: function (handler) {
    return new EventStream(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
  }
});

Bacon.EventStream = EventStream;

Bacon.never = function () {
  return new EventStream(describe(Bacon, "never"), function (sink) {
    sink(endEvent());
    return nop;
  });
};

Bacon.when = function () {
  if (arguments.length === 0) {
    return Bacon.never();
  }
  var len = arguments.length;
  var usage = "when: expecting arguments in the form (Observable+,function)+";

  assert(usage, len % 2 === 0);
  var sources = [];
  var pats = [];
  var i = 0;
  var patterns = [];
  while (i < len) {
    patterns[i] = arguments[i];
    patterns[i + 1] = arguments[i + 1];
    var patSources = _.toArray(arguments[i]);
    var f = constantToFunction(arguments[i + 1]);
    var pat = { f: f, ixs: [] };
    var triggerFound = false;
    for (var j = 0, s; j < patSources.length; j++) {
      s = patSources[j];
      var index = _.indexOf(sources, s);
      if (!triggerFound) {
        triggerFound = Source.isTrigger(s);
      }
      if (index < 0) {
        sources.push(s);
        index = sources.length - 1;
      }
      for (var k = 0, ix; k < pat.ixs.length; k++) {
        ix = pat.ixs[k];
        if (ix.index === index) {
          ix.count++;
        }
      }
      pat.ixs.push({ index: index, count: 1 });
    }

    assert("At least one EventStream required", triggerFound || !patSources.length);

    if (patSources.length > 0) {
      pats.push(pat);
    }
    i = i + 2;
  }

  if (!sources.length) {
    return Bacon.never();
  }

  sources = _.map(Source.fromObservable, sources);
  var needsBarrier = _.any(sources, function (s) {
    return s.flatten;
  }) && containsDuplicateDeps(_.map(function (s) {
    return s.obs;
  }, sources));

  var desc = new Bacon.Desc(Bacon, "when", patterns);
  var resultStream = new EventStream(desc, function (sink) {
    var triggers = [];
    var ends = false;
    var match = function (p) {
      for (var i1 = 0, i; i1 < p.ixs.length; i1++) {
        i = p.ixs[i1];
        if (!sources[i.index].hasAtLeast(i.count)) {
          return false;
        }
      }
      return true;
    };
    var cannotSync = function (source) {
      return !source.sync || source.ended;
    };
    var cannotMatch = function (p) {
      for (var i1 = 0, i; i1 < p.ixs.length; i1++) {
        i = p.ixs[i1];
        if (!sources[i.index].mayHave(i.count)) {
          return true;
        }
      }
    };
    var nonFlattened = function (trigger) {
      return !trigger.source.flatten;
    };
    var part = function (source) {
      return function (unsubAll) {
        var flushLater = function () {
          return UpdateBarrier.whenDoneWith(resultStream, flush);
        };
        var flushWhileTriggers = function () {
          if (triggers.length > 0) {
            var reply = Bacon.more;
            var trigger = triggers.pop();
            for (var i1 = 0, p; i1 < pats.length; i1++) {
              p = pats[i1];
              if (match(p)) {
                var events = (function () {
                  var result = [];
                  for (var i2 = 0, i; i2 < p.ixs.length; i2++) {
                    i = p.ixs[i2];
                    result.push(sources[i.index].consume());
                  }
                  return result;
                })();
                reply = sink(trigger.e.apply(function () {
                  var _p;

                  var values = (function () {
                    var result = [];
                    for (var i2 = 0, event; i2 < events.length; i2++) {
                      event = events[i2];
                      result.push(event.value());
                    }
                    return result;
                  })();

                  return (_p = p).f.apply(_p, values);
                }));
                if (triggers.length) {
                  triggers = _.filter(nonFlattened, triggers);
                }
                if (reply === Bacon.noMore) {
                  return reply;
                } else {
                  return flushWhileTriggers();
                }
              }
            }
          } else {
            return Bacon.more;
          }
        };
        var flush = function () {
          var reply = flushWhileTriggers();
          if (ends) {
            if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
              reply = Bacon.noMore;
              sink(endEvent());
            }
          }
          if (reply === Bacon.noMore) {
            unsubAll();
          }

          return reply;
        };
        return source.subscribe(function (e) {
          if (e.isEnd()) {
            ends = true;
            source.markEnded();
            flushLater();
          } else if (e.isError()) {
            var reply = sink(e);
          } else {
            source.push(e);
            if (source.sync) {
              triggers.push({ source: source, e: e });
              if (needsBarrier || UpdateBarrier.hasWaiters()) {
                flushLater();
              } else {
                flush();
              }
            }
          }
          if (reply === Bacon.noMore) {
            unsubAll();
          }
          return reply || Bacon.more;
        });
      };
    };

    return new Bacon.CompositeUnsubscribe((function () {
      var result = [];
      for (var i1 = 0, s; i1 < sources.length; i1++) {
        s = sources[i1];
        result.push(part(s));
      }
      return result;
    })()).unsubscribe;
  });
  return resultStream;
};

var containsDuplicateDeps = function (observables) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var checkObservable = function (obs) {
    if (_.contains(state, obs)) {
      return true;
    } else {
      var deps = obs.internalDeps();
      if (deps.length) {
        state.push(obs);
        return _.any(deps, checkObservable);
      } else {
        state.push(obs);
        return false;
      }
    }
  };

  return _.any(observables, checkObservable);
};

var constantToFunction = function (f) {
  if (_.isFunction(f)) {
    return f;
  } else {
    return _.always(f);
  }
};

Bacon.groupSimultaneous = function () {
  for (var _len5 = arguments.length, streams = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    streams[_key5] = arguments[_key5];
  }

  if (streams.length === 1 && isArray(streams[0])) {
    streams = streams[0];
  }
  var sources = (function () {
    var result = [];
    for (var i = 0, s; i < streams.length; i++) {
      s = streams[i];
      result.push(new BufferingSource(s));
    }
    return result;
  })();
  return withDesc(new Bacon.Desc(Bacon, "groupSimultaneous", streams), Bacon.when(sources, function () {
    for (var _len6 = arguments.length, xs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      xs[_key6] = arguments[_key6];
    }

    return xs;
  }));
};

function PropertyDispatcher(property, subscribe, handleEvent) {
  Dispatcher.call(this, subscribe, handleEvent);
  this.property = property;
  this.subscribe = _.bind(this.subscribe, this);
  this.current = None;
  this.currentValueRootId = undefined;
  this.propertyEnded = false;
}

inherit(PropertyDispatcher, Dispatcher);
extend(PropertyDispatcher.prototype, {
  push: function (event) {
    if (event.isEnd()) {
      this.propertyEnded = true;
    }
    if (event.hasValue()) {
      this.current = new Some(event);
      this.currentValueRootId = UpdateBarrier.currentEventId();
    }
    return Dispatcher.prototype.push.call(this, event);
  },

  maybeSubSource: function (sink, reply) {
    if (reply === Bacon.noMore) {
      return nop;
    } else if (this.propertyEnded) {
      sink(endEvent());
      return nop;
    } else {
      return Dispatcher.prototype.subscribe.call(this, sink);
    }
  },

  subscribe: function (sink) {
    var _this3 = this;

    var initSent = false;

    var reply = Bacon.more;

    if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
      var dispatchingId = UpdateBarrier.currentEventId();
      var valId = this.currentValueRootId;
      if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
        UpdateBarrier.whenDoneWith(this.property, function () {
          if (_this3.currentValueRootId === valId) {
            return sink(initialEvent(_this3.current.get().value()));
          }
        });

        return this.maybeSubSource(sink, reply);
      } else {
        UpdateBarrier.inTransaction(undefined, this, function () {
          reply = sink(initialEvent(this.current.get().value()));
          return reply;
        }, []);
        return this.maybeSubSource(sink, reply);
      }
    } else {
      return this.maybeSubSource(sink, reply);
    }
  }
});

function Property(desc, subscribe, handler) {
  Observable.call(this, desc);
  assertFunction(subscribe);
  this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
  registerObs(this);
}

inherit(Property, Observable);
extend(Property.prototype, {
  _isProperty: true,

  changes: function () {
    var _this4 = this;

    return new EventStream(new Bacon.Desc(this, "changes", []), function (sink) {
      return _this4.dispatcher.subscribe(function (event) {
        if (!event.isInitial()) {
          return sink(event);
        }
      });
    });
  },

  withHandler: function (handler) {
    return new Property(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
  },

  toProperty: function () {
    assertNoArguments(arguments);
    return this;
  },

  toEventStream: function () {
    var _this5 = this;

    return new EventStream(new Bacon.Desc(this, "toEventStream", []), function (sink) {
      return _this5.dispatcher.subscribe(function (event) {
        if (event.isInitial()) {
          event = event.toNext();
        }
        return sink(event);
      });
    });
  }
});

Bacon.Property = Property;

Bacon.constant = function (value) {
  return new Property(new Bacon.Desc(Bacon, "constant", [value]), function (sink) {
    sink(initialEvent(value));
    sink(endEvent());
    return nop;
  });
};

Bacon.fromBinder = function (binder) {
  var eventTransformer = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];

  var desc = new Bacon.Desc(Bacon, "fromBinder", [binder, eventTransformer]);
  return new EventStream(desc, function (sink) {
    var unbound = false;
    var shouldUnbind = false;
    var unbind = function () {
      if (!unbound) {
        if (typeof unbinder !== "undefined" && unbinder !== null) {
          unbinder();
          return unbound = true;
        } else {
          return shouldUnbind = true;
        }
      }
    };
    var unbinder = binder(function () {
      var ref;

      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      var value = eventTransformer.apply(this, args);
      if (!(isArray(value) && ((ref = _.last(value)) != null ? ref._isEvent : undefined))) {
        value = [value];
      }
      var reply = Bacon.more;
      for (var i = 0, event; i < value.length; i++) {
        event = value[i];
        reply = sink(event = toEvent(event));
        if (reply === Bacon.noMore || event.isEnd()) {
          unbind();
          return reply;
        }
      }
      return reply;
    });
    if (shouldUnbind) {
      unbind();
    }
    return unbind;
  });
};

Bacon.Observable.prototype.map = function (p) {
  for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    args[_key8 - 1] = arguments[_key8];
  }

  return convertArgsToFunction(this, p, args, function (f) {
    return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function (event) {
      return this.push(event.fmap(f));
    }));
  });
};

var argumentsToObservables = function (args) {
  if (isArray(args[0])) {
    return args[0];
  } else {
    return Array.prototype.slice.call(args);
  }
};

var argumentsToObservablesAndFunction = function (args) {
  if (_.isFunction(args[0])) {
    return [argumentsToObservables(Array.prototype.slice.call(args, 1)), args[0]];
  } else {
    return [argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)), _.last(args)];
  }
};

Bacon.combineAsArray = function () {
  var streams = argumentsToObservables(arguments);
  for (var index = 0, stream; index < streams.length; index++) {
    stream = streams[index];
    if (!isObservable(stream)) {
      streams[index] = Bacon.constant(stream);
    }
  }
  if (streams.length) {
    var sources = (function () {
      var result = [];
      for (var i = 0, s; i < streams.length; i++) {
        s = streams[i];
        result.push(new Source(s, true));
      }
      return result;
    })();
    return withDesc(new Bacon.Desc(Bacon, "combineAsArray", streams), Bacon.when(sources, function () {
      for (var _len9 = arguments.length, xs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        xs[_key9] = arguments[_key9];
      }

      return xs;
    }).toProperty());
  } else {
    return Bacon.constant([]);
  }
};

Bacon.onValues = function () {
  for (var _len10 = arguments.length, streams = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    streams[_key10] = arguments[_key10];
  }

  return Bacon.combineAsArray(streams.slice(0, streams.length - 1)).onValues(streams[streams.length - 1]);
};

Bacon.combineWith = function () {
  var _argumentsToObservablesAndFunction = argumentsToObservablesAndFunction(arguments);

  var streams = _argumentsToObservablesAndFunction[0];
  var f = _argumentsToObservablesAndFunction[1];

  var desc = new Bacon.Desc(Bacon, "combineWith", [f].concat(streams));
  return withDesc(desc, Bacon.combineAsArray(streams).map(function (values) {
    return f.apply(undefined, values);
  }));
};

Bacon.Observable.prototype.combine = function (other, f) {
  var combinator = toCombinator(f);
  var desc = new Bacon.Desc(this, "combine", [other, f]);
  return withDesc(desc, Bacon.combineAsArray(this, other).map(function (values) {
    return combinator(values[0], values[1]);
  }));
};

Bacon.Observable.prototype.withStateMachine = function (initState, f) {
  var state = initState;
  var desc = new Bacon.Desc(this, "withStateMachine", [initState, f]);
  return withDesc(desc, this.withHandler(function (event) {
    var fromF = f(state, event);
    var newState = fromF[0];
    var outputs = fromF[1];

    state = newState;
    var reply = Bacon.more;
    for (var i = 0, output; i < outputs.length; i++) {
      output = outputs[i];
      reply = this.push(output);
      if (reply === Bacon.noMore) {
        return reply;
      }
    }
    return reply;
  }));
};

var equals = function (a, b) {
  return a === b;
};

var isNone = function (object) {
  return typeof object !== "undefined" && object !== null ? object._isNone : false;
};

Bacon.Observable.prototype.skipDuplicates = function () {
  var isEqual = arguments.length <= 0 || arguments[0] === undefined ? equals : arguments[0];

  var desc = new Bacon.Desc(this, "skipDuplicates", []);
  return withDesc(desc, this.withStateMachine(None, function (prev, event) {
    if (!event.hasValue()) {
      return [prev, [event]];
    } else if (event.isInitial() || isNone(prev) || !isEqual(prev.get(), event.value())) {
      return [new Some(event.value()), [event]];
    } else {
      return [prev, []];
    }
  }));
};

Bacon.Observable.prototype.awaiting = function (other) {
  var desc = new Bacon.Desc(this, "awaiting", [other]);
  return withDesc(desc, Bacon.groupSimultaneous(this, other).map(function (values) {
    return values[1].length === 0;
  }).toProperty(false).skipDuplicates());
};

Bacon.Observable.prototype.not = function () {
  return withDesc(new Bacon.Desc(this, "not", []), this.map(function (x) {
    return !x;
  }));
};

Bacon.Property.prototype.and = function (other) {
  return withDesc(new Bacon.Desc(this, "and", [other]), this.combine(other, function (x, y) {
    return x && y;
  }));
};

Bacon.Property.prototype.or = function (other) {
  return withDesc(new Bacon.Desc(this, "or", [other]), this.combine(other, function (x, y) {
    return x || y;
  }));
};

Bacon.scheduler = {
  setTimeout: function (f, d) {
    return setTimeout(f, d);
  },
  setInterval: function (f, i) {
    return setInterval(f, i);
  },
  clearInterval: function (id) {
    return clearInterval(id);
  },
  clearTimeout: function (id) {
    return clearTimeout(id);
  },
  now: function () {
    return new Date().getTime();
  }
};

Bacon.EventStream.prototype.bufferWithTime = function (delay) {
  return withDesc(new Bacon.Desc(this, "bufferWithTime", [delay]), this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
};

Bacon.EventStream.prototype.bufferWithCount = function (count) {
  return withDesc(new Bacon.Desc(this, "bufferWithCount", [count]), this.bufferWithTimeOrCount(undefined, count));
};

Bacon.EventStream.prototype.bufferWithTimeOrCount = function (delay, count) {
  var flushOrSchedule = function (buffer) {
    if (buffer.values.length === count) {
      return buffer.flush();
    } else if (delay !== undefined) {
      return buffer.schedule();
    }
  };
  var desc = new Bacon.Desc(this, "bufferWithTimeOrCount", [delay, count]);
  return withDesc(desc, this.buffer(delay, flushOrSchedule, flushOrSchedule));
};

Bacon.EventStream.prototype.buffer = function (delay) {
  var onInput = arguments.length <= 1 || arguments[1] === undefined ? nop : arguments[1];
  var onFlush = arguments.length <= 2 || arguments[2] === undefined ? nop : arguments[2];

  var buffer = {
    scheduled: null,
    end: undefined,
    values: [],
    flush: function () {
      if (this.scheduled) {
        Bacon.scheduler.clearTimeout(this.scheduled);
        this.scheduled = null;
      }
      if (this.values.length > 0) {
        var valuesToPush = this.values;
        this.values = [];
        var reply = this.push(nextEvent(valuesToPush));
        if (this.end != null) {
          return this.push(this.end);
        } else if (reply !== Bacon.noMore) {
          return onFlush(this);
        }
      } else {
        if (this.end != null) {
          return this.push(this.end);
        }
      }
    },
    schedule: function () {
      var _this6 = this;

      if (!this.scheduled) {
        return this.scheduled = delay(function () {
          return _this6.flush();
        });
      }
    }
  };
  var reply = Bacon.more;
  if (!_.isFunction(delay)) {
    var delayMs = delay;
    delay = function (f) {
      return Bacon.scheduler.setTimeout(f, delayMs);
    };
  }
  return withDesc(new Bacon.Desc(this, "buffer", []), this.withHandler(function (event) {
    var _this7 = this;

    buffer.push = function (event) {
      return _this7.push(event);
    };
    if (event.isError()) {
      reply = this.push(event);
    } else if (event.isEnd()) {
      buffer.end = event;
      if (!buffer.scheduled) {
        buffer.flush();
      }
    } else {
      buffer.values.push(event.value());

      onInput(buffer);
    }
    return reply;
  }));
};

Bacon.Observable.prototype.filter = function (f) {
  assertObservableIsProperty(f);

  for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
    args[_key11 - 1] = arguments[_key11];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "filter", [f]), this.withHandler(function (event) {
      if (event.filter(f)) {
        return this.push(event);
      } else {
        return Bacon.more;
      }
    }));
  });
};

Bacon.once = function (value) {
  return new EventStream(new Desc(Bacon, "once", [value]), function (sink) {
    sink(toEvent(value));
    sink(endEvent());
    return nop;
  });
};

Bacon.EventStream.prototype.concat = function (right) {
  var left = this;
  return new EventStream(new Bacon.Desc(left, "concat", [right]), function (sink) {
    var unsubRight = nop;
    var unsubLeft = left.dispatcher.subscribe(function (e) {
      if (e.isEnd()) {
        unsubRight = right.dispatcher.subscribe(sink);
        return unsubRight;
      } else {
        return sink(e);
      }
    });
    return function () {
      return (unsubLeft(), unsubRight());
    };
  });
};

Bacon.Observable.prototype.flatMap = function () {
  return flatMap_(this, makeSpawner(arguments));
};

Bacon.Observable.prototype.flatMapFirst = function () {
  return flatMap_(this, makeSpawner(arguments), true);
};

var makeSpawner = function (args) {
  if (args.length === 1 && isObservable(args[0])) {
    return _.always(args[0]);
  } else {
    return makeFunctionArgs(args);
  }
};

var makeObservable = function (x) {
  if (isObservable(x)) {
    return x;
  } else {
    return Bacon.once(x);
  }
};

var flatMap_ = function (root, f, firstOnly, limit) {
  var rootDep = [root];
  var childDeps = [];
  var desc = new Bacon.Desc(root, "flatMap" + (firstOnly ? "First" : ""), [f]);
  var result = new EventStream(desc, function (sink) {
    var composite = new CompositeUnsubscribe();
    var queue = [];
    var spawn = function (event) {
      var child = makeObservable(f(event.value()));
      childDeps.push(child);
      return composite.add(function (unsubAll, unsubMe) {
        return child.dispatcher.subscribe(function (event) {
          if (event.isEnd()) {
            _.remove(child, childDeps);
            checkQueue();
            checkEnd(unsubMe);
            return Bacon.noMore;
          } else {
            if (typeof event !== "undefined" && event !== null ? event._isInitial : undefined) {
              event = event.toNext();
            }
            var reply = sink(event);
            if (reply === Bacon.noMore) {
              unsubAll();
            }
            return reply;
          }
        });
      });
    };
    var checkQueue = function () {
      var event = queue.shift();
      if (event) {
        return spawn(event);
      }
    };
    var checkEnd = function (unsub) {
      unsub();
      if (composite.empty()) {
        return sink(endEvent());
      }
    };
    composite.add(function (__, unsubRoot) {
      return root.dispatcher.subscribe(function (event) {
        if (event.isEnd()) {
          return checkEnd(unsubRoot);
        } else if (event.isError()) {
          return sink(event);
        } else if (firstOnly && composite.count() > 1) {
          return Bacon.more;
        } else {
          if (composite.unsubscribed) {
            return Bacon.noMore;
          }
          if (limit && composite.count() > limit) {
            return queue.push(event);
          } else {
            return spawn(event);
          }
        }
      });
    });
    return composite.unsubscribe;
  });
  result.internalDeps = function () {
    if (childDeps.length) {
      return rootDep.concat(childDeps);
    } else {
      return rootDep;
    }
  };
  return result;
};

Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function (limit) {
  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
    args[_key12 - 1] = arguments[_key12];
  }

  var desc = new Bacon.Desc(this, "flatMapWithConcurrencyLimit", [limit].concat(args));
  return withDesc(desc, flatMap_(this, makeSpawner(args), false, limit));
};

Bacon.Observable.prototype.flatMapConcat = function () {
  var desc = new Bacon.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0));
  return withDesc(desc, this.flatMapWithConcurrencyLimit.apply(this, [1].concat(_slice.call(arguments))));
};

Bacon.later = function (delay, value) {
  return withDesc(new Bacon.Desc(Bacon, "later", [delay, value]), Bacon.fromBinder(function (sink) {
    var sender = function () {
      return sink([value, endEvent()]);
    };
    var id = Bacon.scheduler.setTimeout(sender, delay);
    return function () {
      return Bacon.scheduler.clearTimeout(id);
    };
  }));
};

Bacon.Observable.prototype.bufferingThrottle = function (minimumInterval) {
  var desc = new Bacon.Desc(this, "bufferingThrottle", [minimumInterval]);
  return withDesc(desc, this.flatMapConcat(function (x) {
    return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
  }));
};

Bacon.Property.prototype.bufferingThrottle = function () {
  return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
};

function Bus() {
  if (!(this instanceof Bus)) {
    return new Bus();
  }

  this.unsubAll = _.bind(this.unsubAll, this);
  this.subscribeAll = _.bind(this.subscribeAll, this);
  this.guardedSink = _.bind(this.guardedSink, this);

  this.sink = undefined;
  this.subscriptions = [];
  this.ended = false;
  EventStream.call(this, new Bacon.Desc(Bacon, "Bus", []), this.subscribeAll);
}

inherit(Bus, EventStream);
extend(Bus.prototype, {
  unsubAll: function () {
    var iterable = this.subscriptions;
    for (var i = 0, sub; i < iterable.length; i++) {
      sub = iterable[i];
      if (typeof sub.unsub === "function") {
        sub.unsub();
      }
    }
  },

  subscribeAll: function (newSink) {
    if (this.ended) {
      newSink(endEvent());
    } else {
      this.sink = newSink;
      var iterable = cloneArray(this.subscriptions);
      for (var i = 0, subscription; i < iterable.length; i++) {
        subscription = iterable[i];
        this.subscribeInput(subscription);
      }
    }
    return this.unsubAll;
  },

  guardedSink: function (input) {
    var _this8 = this;

    return function (event) {
      if (event.isEnd()) {
        _this8.unsubscribeInput(input);
        return Bacon.noMore;
      } else {
        return _this8.sink(event);
      }
    };
  },

  subscribeInput: function (subscription) {
    subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
    return subscription.unsub;
  },

  unsubscribeInput: function (input) {
    var iterable = this.subscriptions;
    for (var i = 0, sub; i < iterable.length; i++) {
      sub = iterable[i];
      if (sub.input === input) {
        if (typeof sub.unsub === "function") {
          sub.unsub();
        }
        this.subscriptions.splice(i, 1);
        return;
      }
    }
  },

  plug: function (input) {
    var _this9 = this;

    assertObservable(input);
    if (this.ended) {
      return;
    }
    var sub = { input: input };
    this.subscriptions.push(sub);
    if (typeof this.sink !== "undefined") {
      this.subscribeInput(sub);
    }
    return function () {
      return _this9.unsubscribeInput(input);
    };
  },

  end: function () {
    this.ended = true;
    this.unsubAll();
    if (typeof this.sink === "function") {
      return this.sink(endEvent());
    }
  },

  push: function (value) {
    if (!this.ended && typeof this.sink === "function") {
      return this.sink(nextEvent(value));
    }
  },

  error: function (error) {
    if (typeof this.sink === "function") {
      return this.sink(new Error(error));
    }
  }
});

Bacon.Bus = Bus;

var liftCallback = function (desc, wrapped) {
  return withMethodCallSupport(function (f) {
    var stream = partiallyApplied(wrapped, [function (values, callback) {
      return f.apply(undefined, values.concat([callback]));
    }]);

    for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
      args[_key13 - 1] = arguments[_key13];
    }

    return withDesc(new Bacon.Desc(Bacon, desc, [f].concat(args)), Bacon.combineAsArray(args).flatMap(stream));
  });
};

Bacon.fromCallback = liftCallback("fromCallback", function (f) {
  for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
    args[_key14 - 1] = arguments[_key14];
  }

  return Bacon.fromBinder(function (handler) {
    makeFunction(f, args)(handler);
    return nop;
  }, function (value) {
    return [value, endEvent()];
  });
});

Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function (f) {
  for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
    args[_key15 - 1] = arguments[_key15];
  }

  return Bacon.fromBinder(function (handler) {
    makeFunction(f, args)(handler);
    return nop;
  }, function (error, value) {
    if (error) {
      return [new Error(error), endEvent()];
    }
    return [value, endEvent()];
  });
});

Bacon.combineTemplate = function (template) {
  function current(ctxStack) {
    return ctxStack[ctxStack.length - 1];
  }
  function setValue(ctxStack, key, value) {
    current(ctxStack)[key] = value;
    return value;
  }
  function applyStreamValue(key, index) {
    return function (ctxStack, values) {
      return setValue(ctxStack, key, values[index]);
    };
  }
  function constantValue(key, value) {
    return function (ctxStack) {
      return setValue(ctxStack, key, value);
    };
  }

  function mkContext(template) {
    return isArray(template) ? [] : {};
  }

  function pushContext(key, value) {
    return function (ctxStack) {
      var newContext = mkContext(value);
      setValue(ctxStack, key, newContext);
      return ctxStack.push(newContext);
    };
  }

  function compile(key, value) {
    if (isObservable(value)) {
      streams.push(value);
      return funcs.push(applyStreamValue(key, streams.length - 1));
    } else if (value && (value.constructor == Object || value.constructor == Array)) {
      var popContext = function (ctxStack) {
        return ctxStack.pop();
      };
      funcs.push(pushContext(key, value));
      compileTemplate(value);
      return funcs.push(popContext);
    } else {
      return funcs.push(constantValue(key, value));
    }
  }

  function combinator(values) {
    var rootContext = mkContext(template);
    var ctxStack = [rootContext];
    for (var i = 0, f; i < funcs.length; i++) {
      f = funcs[i];
      f(ctxStack, values);
    }
    return rootContext;
  }

  function compileTemplate(template) {
    return _.each(template, compile);
  }

  var funcs = [];
  var streams = [];

  compileTemplate(template);

  return withDesc(new Bacon.Desc(Bacon, "combineTemplate", [template]), Bacon.combineAsArray(streams).map(combinator));
};

var addPropertyInitValueToStream = function (property, stream) {
  var justInitValue = new EventStream(describe(property, "justInitValue"), function (sink) {
    var value = undefined;
    var unsub = property.dispatcher.subscribe(function (event) {
      if (!event.isEnd()) {
        value = event;
      }
      return Bacon.noMore;
    });
    UpdateBarrier.whenDoneWith(justInitValue, function () {
      if (typeof value !== "undefined" && value !== null) {
        sink(value);
      }
      return sink(endEvent());
    });
    return unsub;
  });
  return justInitValue.concat(stream).toProperty();
};

Bacon.Observable.prototype.mapEnd = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "mapEnd", [f]), this.withHandler(function (event) {
    if (event.isEnd()) {
      this.push(nextEvent(f(event)));
      this.push(endEvent());
      return Bacon.noMore;
    } else {
      return this.push(event);
    }
  }));
};

Bacon.Observable.prototype.skipErrors = function () {
  return withDesc(new Bacon.Desc(this, "skipErrors", []), this.withHandler(function (event) {
    if (event.isError()) {
      return Bacon.more;
    } else {
      return this.push(event);
    }
  }));
};

Bacon.EventStream.prototype.takeUntil = function (stopper) {
  var endMarker = {};
  return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function (event) {
    if (!event.hasValue()) {
      return this.push(event);
    } else {
      var _event$value = event.value();

      var data = _event$value[0];
      var stopper = _event$value[1];

      if (stopper.length) {
        return this.push(endEvent());
      } else {
        var reply = Bacon.more;
        for (var i = 0, value; i < data.length; i++) {
          value = data[i];
          if (value === endMarker) {
            reply = this.push(endEvent());
          } else {
            reply = this.push(nextEvent(value));
          }
        }
        return reply;
      }
    }
  }));
};

Bacon.Property.prototype.takeUntil = function (stopper) {
  var changes = this.changes().takeUntil(stopper);
  return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), addPropertyInitValueToStream(this, changes));
};

Bacon.Observable.prototype.flatMapLatest = function () {
  var f = makeSpawner(arguments);
  var stream = this.toEventStream();
  return withDesc(new Bacon.Desc(this, "flatMapLatest", [f]), stream.flatMap(function (value) {
    return makeObservable(f(value)).takeUntil(stream);
  }));
};

Bacon.Property.prototype.delayChanges = function (desc, f) {
  return withDesc(desc, addPropertyInitValueToStream(this, f(this.changes())));
};

Bacon.EventStream.prototype.delay = function (delay) {
  return withDesc(new Bacon.Desc(this, "delay", [delay]), this.flatMap(function (value) {
    return Bacon.later(delay, value);
  }));
};

Bacon.Property.prototype.delay = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "delay", [delay]), function (changes) {
    return changes.delay(delay);
  });
};

Bacon.EventStream.prototype.debounce = function (delay) {
  return withDesc(new Bacon.Desc(this, "debounce", [delay]), this.flatMapLatest(function (value) {
    return Bacon.later(delay, value);
  }));
};

Bacon.Property.prototype.debounce = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "debounce", [delay]), function (changes) {
    return changes.debounce(delay);
  });
};

Bacon.EventStream.prototype.debounceImmediate = function (delay) {
  return withDesc(new Bacon.Desc(this, "debounceImmediate", [delay]), this.flatMapFirst(function (value) {
    return Bacon.once(value).concat(Bacon.later(delay).filter(false));
  }));
};

Bacon.Observable.prototype.decode = function (cases) {
  return withDesc(new Bacon.Desc(this, "decode", [cases]), this.combine(Bacon.combineTemplate(cases), function (key, values) {
    return values[key];
  }));
};

Bacon.Observable.prototype.scan = function (seed, f) {
  var _this10 = this;

  var resultProperty;
  f = toCombinator(f);
  var acc = toOption(seed);
  var initHandled = false;
  var subscribe = function (sink) {
    var initSent = false;
    var unsub = nop;
    var reply = Bacon.more;
    var sendInit = function () {
      if (!initSent) {
        return acc.forEach(function (value) {
          initSent = initHandled = true;
          reply = sink(new Initial(function () {
            return value;
          }));
          if (reply === Bacon.noMore) {
            unsub();
            unsub = nop;
            return unsub;
          }
        });
      }
    };
    unsub = _this10.dispatcher.subscribe(function (event) {
      if (event.hasValue()) {
        if (initHandled && event.isInitial()) {
          return Bacon.more;
        } else {
            if (!event.isInitial()) {
              sendInit();
            }
            initSent = initHandled = true;
            var prev = acc.getOrElse(undefined);
            var next = f(prev, event.value());

            acc = new Some(next);
            return sink(event.apply(function () {
              return next;
            }));
          }
      } else {
        if (event.isEnd()) {
          reply = sendInit();
        }
        if (reply !== Bacon.noMore) {
          return sink(event);
        }
      }
    });
    UpdateBarrier.whenDoneWith(resultProperty, sendInit);
    return unsub;
  };
  resultProperty = new Property(new Bacon.Desc(this, "scan", [seed, f]), subscribe);
  return resultProperty;
};

Bacon.Observable.prototype.diff = function (start, f) {
  f = toCombinator(f);
  return withDesc(new Bacon.Desc(this, "diff", [start, f]), this.scan([start], function (prevTuple, next) {
    return [next, f(prevTuple[0], next)];
  }).filter(function (tuple) {
    return tuple.length === 2;
  }).map(function (tuple) {
    return tuple[1];
  }));
};

Bacon.Observable.prototype.doAction = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "doAction", [f]), this.withHandler(function (event) {
    if (event.hasValue()) {
      f(event.value());
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.doEnd = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "doEnd", [f]), this.withHandler(function (event) {
    if (event.isEnd()) {
      f();
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.doError = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "doError", [f]), this.withHandler(function (event) {
    if (event.isError()) {
      f(event.error);
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.doLog = function () {
  for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
    args[_key16] = arguments[_key16];
  }

  return withDesc(new Bacon.Desc(this, "doLog", args), this.withHandler(function (event) {
    if (typeof console !== "undefined" && console !== null && typeof console.log === "function") {
      console.log.apply(console, args.concat([event.log()]));
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.endOnError = function (f) {
  if (!(typeof f !== "undefined" && f !== null)) {
    f = true;
  }

  for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
    args[_key17 - 1] = arguments[_key17];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "endOnError", []), this.withHandler(function (event) {
      if (event.isError() && f(event.error)) {
        this.push(event);
        return this.push(endEvent());
      } else {
        return this.push(event);
      }
    }));
  });
};

Observable.prototype.errors = function () {
  return withDesc(new Bacon.Desc(this, "errors", []), this.filter(function () {
    return false;
  }));
};

Bacon.Observable.prototype.take = function (count) {
  if (count <= 0) {
    return Bacon.never();
  }
  return withDesc(new Bacon.Desc(this, "take", [count]), this.withHandler(function (event) {
    if (!event.hasValue()) {
      return this.push(event);
    } else {
      count--;
      if (count > 0) {
        return this.push(event);
      } else {
        if (count === 0) {
          this.push(event);
        }
        this.push(endEvent());
        return Bacon.noMore;
      }
    }
  }));
};

Bacon.Observable.prototype.first = function () {
  return withDesc(new Bacon.Desc(this, "first", []), this.take(1));
};

Bacon.Observable.prototype.mapError = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "mapError", [f]), this.withHandler(function (event) {
    if (event.isError()) {
      return this.push(nextEvent(f(event.error)));
    } else {
      return this.push(event);
    }
  }));
};

Bacon.Observable.prototype.flatMapError = function (fn) {
  var desc = new Bacon.Desc(this, "flatMapError", [fn]);
  return withDesc(desc, this.mapError(function (err) {
    return new Error(err);
  }).flatMap(function (x) {
    if (x instanceof Error) {
      return fn(x.error);
    } else {
      return Bacon.once(x);
    }
  }));
};

Bacon.EventStream.prototype.sampledBy = function (sampler, combinator) {
  return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), this.toProperty().sampledBy(sampler, combinator));
};

Bacon.Property.prototype.sampledBy = function (sampler, combinator) {
  var lazy = false;
  if (typeof combinator !== "undefined" && combinator !== null) {
    combinator = toCombinator(combinator);
  } else {
    lazy = true;
    combinator = function (f) {
      return f.value();
    };
  }
  var thisSource = new Source(this, false, lazy);
  var samplerSource = new Source(sampler, true, lazy);
  var stream = Bacon.when([thisSource, samplerSource], combinator);
  var result = sampler._isProperty ? stream.toProperty() : stream;
  return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), result);
};

Bacon.Property.prototype.sample = function (interval) {
  return withDesc(new Bacon.Desc(this, "sample", [interval]), this.sampledBy(Bacon.interval(interval, {})));
};

Bacon.Observable.prototype.map = function (p) {
  if (p && p._isProperty) {
    return p.sampledBy(this, former);
  } else {
    for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
      args[_key18 - 1] = arguments[_key18];
    }

    return convertArgsToFunction(this, p, args, function (f) {
      return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function (event) {
        return this.push(event.fmap(f));
      }));
    });
  }
};

Bacon.Observable.prototype.fold = function (seed, f) {
  return withDesc(new Bacon.Desc(this, "fold", [seed, f]), this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
};

Observable.prototype.reduce = Observable.prototype.fold;

var eventMethods = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]];

var findHandlerMethods = function (target) {
  var pair;
  for (var i = 0; i < eventMethods.length; i++) {
    pair = eventMethods[i];
    var methodPair = [target[pair[0]], target[pair[1]]];
    if (methodPair[0] && methodPair[1]) {
      return methodPair;
    }
  }
  for (var j = 0; j < eventMethods.length; j++) {
    pair = eventMethods[j];
    var addListener = target[pair[0]];
    if (addListener) {
      return [addListener, function () {}];
    }
  }
  throw new Error("No suitable event methods in " + target);
};

Bacon.fromEventTarget = function (target, eventName, eventTransformer) {
  var _findHandlerMethods = findHandlerMethods(target);

  var sub = _findHandlerMethods[0];
  var unsub = _findHandlerMethods[1];

  var desc = new Bacon.Desc(Bacon, "fromEvent", [target, eventName]);
  return withDesc(desc, Bacon.fromBinder(function (handler) {
    sub.call(target, eventName, handler);
    return function () {
      return unsub.call(target, eventName, handler);
    };
  }, eventTransformer));
};

Bacon.fromEvent = Bacon.fromEventTarget;

Bacon.fromPoll = function (delay, poll) {
  var desc = new Bacon.Desc(Bacon, "fromPoll", [delay, poll]);
  return withDesc(desc, Bacon.fromBinder(function (handler) {
    var id = Bacon.scheduler.setInterval(handler, delay);
    return function () {
      return Bacon.scheduler.clearInterval(id);
    };
  }, poll));
};

function valueAndEnd(value) {
  return [value, endEvent()];
}

Bacon.fromPromise = function (promise, abort) {
  var eventTransformer = arguments.length <= 2 || arguments[2] === undefined ? valueAndEnd : arguments[2];

  return withDesc(new Bacon.Desc(Bacon, "fromPromise", [promise]), Bacon.fromBinder(function (handler) {
    var bound = promise.then(handler, function (e) {
      return handler(new Error(e));
    });
    if (bound && typeof bound.done === "function") {
      bound.done();
    }

    if (abort) {
      return function () {
        if (typeof promise.abort === "function") {
          return promise.abort();
        }
      };
    } else {
      return function () {};
    }
  }, eventTransformer));
};

Bacon.Observable.prototype.groupBy = function (keyF) {
  var limitF = arguments.length <= 1 || arguments[1] === undefined ? Bacon._.id : arguments[1];

  var streams = {};
  var src = this;
  return src.filter(function (x) {
    return !streams[keyF(x)];
  }).map(function (x) {
    var key = keyF(x);
    var similar = src.filter(function (x) {
      return keyF(x) === key;
    });
    var data = Bacon.once(x).concat(similar);
    var limited = limitF(data, x).withHandler(function (event) {
      this.push(event);
      if (event.isEnd()) {
        return delete streams[key];
      }
    });
    streams[key] = limited;
    return limited;
  });
};

Bacon.fromArray = function (values) {
  assertArray(values);
  if (!values.length) {
    return withDesc(new Bacon.Desc(Bacon, "fromArray", values), Bacon.never());
  } else {
    var i = 0;
    return new EventStream(new Bacon.Desc(Bacon, "fromArray", [values]), function (sink) {
      var unsubd = false;
      var reply = Bacon.more;
      var pushing = false;
      var pushNeeded = false;
      var push = function () {
        pushNeeded = true;
        if (pushing) {
          return;
        }
        pushing = true;
        while (pushNeeded) {
          pushNeeded = false;
          if (reply !== Bacon.noMore && !unsubd) {
            var value = values[i++];
            reply = sink(toEvent(value));
            if (reply !== Bacon.noMore) {
              if (i === values.length) {
                sink(endEvent());
              } else {
                UpdateBarrier.afterTransaction(push);
              }
            }
          }
        }
        pushing = false;
        return pushing;
      };

      push();
      return function () {
        unsubd = true;
        return unsubd;
      };
    });
  }
};

Bacon.EventStream.prototype.holdWhen = function (valve) {
  var onHold = false;
  var bufferedValues = [];
  var src = this;
  var srcIsEnded = false;
  return new EventStream(new Bacon.Desc(this, "holdWhen", [valve]), function (sink) {
    var composite = new CompositeUnsubscribe();
    var subscribed = false;
    var endIfBothEnded = function (unsub) {
      if (typeof unsub === "function") {
        unsub();
      }
      if (composite.empty() && subscribed) {
        return sink(endEvent());
      }
    };
    composite.add(function (unsubAll, unsubMe) {
      return valve.subscribeInternal(function (event) {
        if (event.hasValue()) {
          onHold = event.value();
          if (!onHold) {
            var toSend = bufferedValues;
            bufferedValues = [];
            return (function () {
              var result = [];
              for (var i = 0, value; i < toSend.length; i++) {
                value = toSend[i];
                result.push(sink(nextEvent(value)));
              }
              if (srcIsEnded) {
                result.push(sink(endEvent()));
                unsubMe();
              }
              return result;
            })();
          }
        } else if (event.isEnd()) {
          return endIfBothEnded(unsubMe);
        } else {
          return sink(event);
        }
      });
    });
    composite.add(function (unsubAll, unsubMe) {
      return src.subscribeInternal(function (event) {
        if (onHold && event.hasValue()) {
          return bufferedValues.push(event.value());
        } else if (event.isEnd() && bufferedValues.length) {
          srcIsEnded = true;
          return endIfBothEnded(unsubMe);
        } else {
          return sink(event);
        }
      });
    });
    subscribed = true;
    endIfBothEnded();
    return composite.unsubscribe;
  });
};

Bacon.interval = function (delay) {
  var value = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return withDesc(new Bacon.Desc(Bacon, "interval", [delay, value]), Bacon.fromPoll(delay, function () {
    return nextEvent(value);
  }));
};

Bacon.$ = {};
Bacon.$.asEventStream = function (eventName, selector, eventTransformer) {
  var _this11 = this;

  if (_.isFunction(selector)) {
    eventTransformer = selector;
    selector = undefined;
  }

  return withDesc(new Bacon.Desc(this.selector || this, "asEventStream", [eventName]), Bacon.fromBinder(function (handler) {
    _this11.on(eventName, selector, handler);
    return function () {
      return _this11.off(eventName, selector, handler);
    };
  }, eventTransformer));
};

if (typeof jQuery !== "undefined" && jQuery) {
  jQuery.fn.asEventStream = Bacon.$.asEventStream;
}

if (typeof Zepto !== "undefined" && Zepto) {
  Zepto.fn.asEventStream = Bacon.$.asEventStream;
}

Bacon.Observable.prototype.last = function () {
  var lastEvent;

  return withDesc(new Bacon.Desc(this, "last", []), this.withHandler(function (event) {
    if (event.isEnd()) {
      if (lastEvent) {
        this.push(lastEvent);
      }
      this.push(endEvent());
      return Bacon.noMore;
    } else {
      lastEvent = event;
    }
  }));
};

Bacon.Observable.prototype.log = function () {
  for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
    args[_key19] = arguments[_key19];
  }

  this.subscribe(function (event) {
    if (typeof console !== "undefined" && typeof console.log === "function") {
      console.log.apply(console, args.concat([event.log()]));
    }
  });
  return this;
};

Bacon.EventStream.prototype.merge = function (right) {
  assertEventStream(right);
  var left = this;
  return withDesc(new Bacon.Desc(left, "merge", [right]), Bacon.mergeAll(this, right));
};

Bacon.mergeAll = function () {
  var streams = argumentsToObservables(arguments);
  if (streams.length) {
    return new EventStream(new Bacon.Desc(Bacon, "mergeAll", streams), function (sink) {
      var ends = 0;
      var smartSink = function (obs) {
        return function (unsubBoth) {
          return obs.dispatcher.subscribe(function (event) {
            if (event.isEnd()) {
              ends++;
              if (ends === streams.length) {
                return sink(endEvent());
              } else {
                return Bacon.more;
              }
            } else {
              var reply = sink(event);
              if (reply === Bacon.noMore) {
                unsubBoth();
              }
              return reply;
            }
          });
        };
      };
      var sinks = _.map(smartSink, streams);
      return new Bacon.CompositeUnsubscribe(sinks).unsubscribe;
    });
  } else {
    return Bacon.never();
  }
};

Bacon.repeatedly = function (delay, values) {
  var index = 0;
  return withDesc(new Bacon.Desc(Bacon, "repeatedly", [delay, values]), Bacon.fromPoll(delay, function () {
    return values[index++ % values.length];
  }));
};

Bacon.repeat = function (generator) {
  var index = 0;
  return Bacon.fromBinder(function (sink) {
    var flag = false;
    var reply = Bacon.more;
    var unsub = function () {};
    function handleEvent(event) {
      if (event.isEnd()) {
        if (!flag) {
          return flag = true;
        } else {
          return subscribeNext();
        }
      } else {
        return reply = sink(event);
      }
    };
    function subscribeNext() {
      var next;
      flag = true;
      while (flag && reply !== Bacon.noMore) {
        next = generator(index++);
        flag = false;
        if (next) {
          unsub = next.subscribeInternal(handleEvent);
        } else {
          sink(endEvent());
        }
      }
      return flag = true;
    };
    subscribeNext();
    return function () {
      return unsub();
    };
  });
};

Bacon.retry = function (options) {
  if (!_.isFunction(options.source)) {
    throw new Exception("'source' option has to be a function");
  }
  var source = options.source;
  var retries = options.retries || 0;
  var maxRetries = options.maxRetries || retries;
  var delay = options.delay || function () {
    return 0;
  };
  var isRetryable = options.isRetryable || function () {
    return true;
  };
  var finished = false;
  var error = null;

  return withDesc(new Bacon.Desc(Bacon, "retry", [options]), Bacon.repeat(function () {
    function valueStream() {
      return source().endOnError().withHandler(function (event) {
        if (event.isError()) {
          error = event;
          if (!(isRetryable(error.error) && retries > 0)) {
            finished = true;
            return this.push(event);
          }
        } else {
          if (event.hasValue()) {
            error = null;
            finished = true;
          }
          return this.push(event);
        }
      });
    }

    if (finished) {
      return null;
    } else if (error) {
      var context = {
        error: error.error,
        retriesDone: maxRetries - retries
      };
      var pause = Bacon.later(delay(context)).filter(false);
      retries = retries - 1;
      return pause.concat(Bacon.once().flatMap(valueStream));
    } else {
      return valueStream();
    }
  }));
};

Bacon.sequentially = function (delay, values) {
  var index = 0;
  return withDesc(new Bacon.Desc(Bacon, "sequentially", [delay, values]), Bacon.fromPoll(delay, function () {
    var value = values[index++];
    if (index < values.length) {
      return value;
    } else if (index === values.length) {
      return [value, endEvent()];
    } else {
      return endEvent();
    }
  }));
};

Bacon.Observable.prototype.skip = function (count) {
  return withDesc(new Bacon.Desc(this, "skip", [count]), this.withHandler(function (event) {
    if (!event.hasValue()) {
      return this.push(event);
    } else if (count > 0) {
      count--;
      return Bacon.more;
    } else {
      return this.push(event);
    }
  }));
};

Bacon.EventStream.prototype.skipUntil = function (starter) {
  var started = starter.take(1).map(true).toProperty(false);
  return withDesc(new Bacon.Desc(this, "skipUntil", [starter]), this.filter(started));
};

Bacon.EventStream.prototype.skipWhile = function (f) {
  assertObservableIsProperty(f);
  var ok = false;

  for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
    args[_key20 - 1] = arguments[_key20];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "skipWhile", [f]), this.withHandler(function (event) {
      if (ok || !event.hasValue() || !f(event.value())) {
        if (event.hasValue()) {
          ok = true;
        }
        return this.push(event);
      } else {
        return Bacon.more;
      }
    }));
  });
};

Bacon.Observable.prototype.slidingWindow = function (n) {
  var minValues = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return withDesc(new Bacon.Desc(this, "slidingWindow", [n, minValues]), this.scan([], function (window, value) {
    return window.concat([value]).slice(-n);
  }).filter(function (values) {
    return values.length >= minValues;
  }));
};

var spies = [];
var registerObs = function (obs) {
  if (spies.length) {
    if (!registerObs.running) {
      try {
        registerObs.running = true;
        spies.forEach(function (spy) {
          spy(obs);
        });
      } finally {
        delete registerObs.running;
      }
    }
  }
};

Bacon.spy = function (spy) {
  return spies.push(spy);
};

Bacon.Property.prototype.startWith = function (seed) {
  return withDesc(new Bacon.Desc(this, "startWith", [seed]), this.scan(seed, function (prev, next) {
    return next;
  }));
};

Bacon.EventStream.prototype.startWith = function (seed) {
  return withDesc(new Bacon.Desc(this, "startWith", [seed]), Bacon.once(seed).concat(this));
};

Bacon.Observable.prototype.takeWhile = function (f) {
  assertObservableIsProperty(f);

  for (var _len21 = arguments.length, args = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
    args[_key21 - 1] = arguments[_key21];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "takeWhile", [f]), this.withHandler(function (event) {
      if (event.filter(f)) {
        return this.push(event);
      } else {
        this.push(endEvent());
        return Bacon.noMore;
      }
    }));
  });
};

Bacon.EventStream.prototype.throttle = function (delay) {
  return withDesc(new Bacon.Desc(this, "throttle", [delay]), this.bufferWithTime(delay).map(function (values) {
    return values[values.length - 1];
  }));
};

Bacon.Property.prototype.throttle = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "throttle", [delay]), function (changes) {
    return changes.throttle(delay);
  });
};

Observable.prototype.firstToPromise = function (PromiseCtr) {
  var _this12 = this;

  if (typeof PromiseCtr !== "function") {
    if (typeof Promise === "function") {
      PromiseCtr = Promise;
    } else {
      throw new Exception("There isn't default Promise, use shim or parameter");
    }
  }

  return new PromiseCtr(function (resolve, reject) {
    return _this12.subscribe(function (event) {
      if (event.hasValue()) {
        resolve(event.value());
      }
      if (event.isError()) {
        reject(event.error);
      }

      return Bacon.noMore;
    });
  });
};

Observable.prototype.toPromise = function (PromiseCtr) {
  return this.last().firstToPromise(PromiseCtr);
};

Bacon["try"] = function (f) {
  return function (value) {
    try {
      return Bacon.once(f(value));
    } catch (e) {
      return new Bacon.Error(e);
    }
  };
};

Bacon.update = function (initial) {
  function lateBindFirst(f) {
    return function () {
      for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
      }

      return function (i) {
        return f.apply(undefined, [i].concat(args));
      };
    };
  }

  for (var _len22 = arguments.length, patterns = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
    patterns[_key22 - 1] = arguments[_key22];
  }

  var i = patterns.length - 1;
  while (i > 0) {
    if (!(patterns[i] instanceof Function)) {
      patterns[i] = _.always(patterns[i]);
    }
    patterns[i] = lateBindFirst(patterns[i]);
    i = i - 2;
  }
  return withDesc(new Bacon.Desc(Bacon, "update", [initial].concat(patterns)), Bacon.when.apply(Bacon, patterns).scan(initial, function (x, f) {
    return f(x);
  }));
};

Bacon.zipAsArray = function () {
  for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
    args[_key24] = arguments[_key24];
  }

  var streams = argumentsToObservables(args);
  return withDesc(new Bacon.Desc(Bacon, "zipAsArray", streams), Bacon.zipWith(streams, function () {
    for (var _len25 = arguments.length, xs = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
      xs[_key25] = arguments[_key25];
    }

    return xs;
  }));
};

Bacon.zipWith = function () {
  for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
    args[_key26] = arguments[_key26];
  }

  var observablesAndFunction = argumentsToObservablesAndFunction(args);
  var streams = observablesAndFunction[0];
  var f = observablesAndFunction[1];

  streams = _.map(function (s) {
    return s.toEventStream();
  }, streams);
  return withDesc(new Bacon.Desc(Bacon, "zipWith", [f].concat(streams)), Bacon.when(streams, f));
};

Bacon.Observable.prototype.zip = function (other, f) {
  return withDesc(new Bacon.Desc(this, "zip", [other]), Bacon.zipWith([this, other], f || Array));
};

if (typeof define !== "undefined" && define !== null && define.amd != null) {
  define([], function () {
    return Bacon;
  });
  if (typeof this !== "undefined" && this !== null) {
    this.Bacon = Bacon;
  }
} else if (typeof module !== "undefined" && module !== null && module.exports != null) {
  module.exports = Bacon;
  Bacon.Bacon = Bacon;
} else {
    this.Bacon = Bacon;
  }
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],3:[function(require,module,exports){
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}

},{}],4:[function(require,module,exports){
/**
 * Recognize (:<name>regexp) format named captures.
 * and replace exec method of returned RegExp object.
 *
 * This function does not used with normal captures.
 */
function named (regexp) {
	var names = [];
	var ret = new RegExp(regexp.source.replace(/\(:<(\w+)>/g, function (_, name) {
			names.push(name);
			return '(';
		}),
		(regexp.global     ? 'g' : '') +
		(regexp.ignoreCase ? 'i' : '') +
		(regexp.multiline  ? 'm' : '')
	);

	var captures = function (matched) {
		if (!matched) return matched;
		var captures = {};
		for (var i = 0, len = names.length; i < len; i++) {
			var name = names[i];
			if (!captures[name]) captures[name] = [];
			captures[name].push(matched[i + 1]);
		}
		matched.captures = captures;
		matched.capture = function (name) {
			return captures[name][ captures[name].length - 1 ];
		};
		return matched;
	};

	// override RegExp#exec
	ret.exec = function (string) {
		return captures(RegExp.prototype.exec.call(this, string));
	};

	// like String#replace
	ret.replace = function (string, replace) {
		if (typeof replace == 'function') {
			return string.replace(this, function () {
				return replace(captures(Array.prototype.slice.call(arguments)));
			});
		} else {
			return string.replace(this, replace);
		}
	};

	return ret;
}

this.named = named;


},{}],5:[function(require,module,exports){
// a node.js module fork of
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// see: http://blog.stevenlevithan.com/archives/parseuri
// see: http://stevenlevithan.com/demo/parseuri/js/

//forked into a node.js module by franz enzenhofer 
 

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

module.exports = parseUri
},{}],6:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EVENTS = undefined;
exports.HistoryAPI = HistoryAPI;

var _microevent = require('microevent');

var _microevent2 = _interopRequireDefault(_microevent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENTS = exports.EVENTS = {
	STATE_PUSHED: 'pushstate',
	STATE_POPPED: 'popstate'
};

function HistoryAPI() {
	var eventBus = new _microevent2.default();

	window.addEventListener('popstate', function (evt) {
		evt.location = getLocationInfo();
		eventBus.trigger(EVENTS.STATE_POPPED, evt);
	});

	this.pushState = function pushState() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
		var title = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
		var url = arguments[2];

		window.history.pushState(state, title, url);

		eventBus.trigger(EVENTS.STATE_PUSHED, {
			state: state,
			title: title,
			url: url,
			location: getLocationInfo()
		});

		return this;
	};

	this.back = function back() {
		window.history.back();
		return this;
	};

	this.forward = function forward() {
		window.history.forward();
		return this;
	};

	this.go = function go(num) {
		window.history.go(num);
		return this;
	};

	this.on = function on(eventId, fn) {
		return eventBus.bind(eventId, fn);
	};

	this.onPushState = function onPushState(fn) {
		return eventBus.bind(EVENTS.STATE_PUSHED, fn);
	};

	this.onPopState = function onPopState(fn) {
		return eventBus.bind(EVENTS.STATE_POPPED, fn);
	};

	this.off = function off(eventId, fn) {
		eventBus.unbind(eventId, fn);
		return this;
	};
}

function getLocationInfo() {
	return {
		href: window.location.href,
		pathname: window.location.pathname,
		search: window.location.search,
		hash: window.location.hash
	};
}

},{"microevent":3}],8:[function(require,module,exports){
'use strict';

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

require('whatwg-fetch');

var _microevent = require('microevent');

var _microevent2 = _interopRequireDefault(_microevent);

var _history = require('./history');

var _router = require('./router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Global Application Context
 */
window.APP = {
    history: new _history.HistoryAPI(),
    eventBus: new _microevent2.default(),

    EVENTS: {
        URL_CHANGE_REQUESTED_FROM_ROUTER: 'url_change_requested_from_router',
        URL_CHANGE_REQUESTED_FROM_COMPONENT: 'url_change_requested_from_component'
    }
};

localStorage.removeItem('fromBonuses');

(0, _domready2.default)(function () {
    var router = new _router.Router({
        eventBus: APP.eventBus,

        events: {
            error: errorToState
        },

        routes: {
            '/exchange/(:<appId>[0-9]+)/?': showExchange,

            '/?': showBonuses,

            '/sign-in/?': {
                transitions: {
                    // событие-функция должно возвращать URL, а не регулярку state'а.
                    // Роутер сам найдет соотв. состояние.
                    'bonuses-referrer-authorized': function bonusesReferrerAuthorized(_ref) {
                        var query = _ref.query;
                        var token = _ref.token;
                        return '/' + query + '#token=' + token;
                    },
                    'regullar-user-authorized': '/success'
                },

                coming: showSignIn
            },

            '/success/?': showSuccess,

            '/404/?': showNotFound,

            '/maintenance/?': showMaintenance
        }
    });

    plugInRouter.call(APP, router); // подключает роутер к контексту
    router.start();
});

/**
 * @param {Object} error
 * @param {String} error.code
 * @return {String}
 */
function errorToState(_ref2) {
    var code = _ref2.code;

    return {
        404: '/404/'
    }[// ... other errrors
    code] || '/maintenance/';
}

// ---------------------- рендереры экранов -------------------- //
function showBonuses() {
    embedScreen(['<h1>Bonuses</h1>', '<div id="sign-in" class="Link" data-href="/sign-in">Sign In</div>', '<br>', '<div class="Link" data-href="/exchange/100/">exchange</div>'].join('\n'));

    document.querySelector('#sign-in').addEventListener('click', function () {
        localStorage.setItem('fromBonuses', true);
    });
}

function showSignIn(payload) {
    var _this = this;

    var query = window.location.search;

    embedScreen(['<h1>Sign In</h1>', '<button id="sign-in">Sign In</button>'].join('\n'));

    document.querySelector('#sign-in').addEventListener('click', function () {
        var isFromBonuses = localStorage.getItem('fromBonuses');

        if (isFromBonuses) {
            // Здесь может быть промежуточная eventBus.
            _this.handle('bonuses-referrer-authorized', { token: '42', query: query });
        } else {
            _this.handle('regullar-user-authorized');
        }
    });
}

function showExchange(payload) {
    return fetch('/azaviruha.github.io/demo/fsm-router/templates/exchange.mst', {
        method: 'GET',
        headers: {
            'Accept': 'html',
            'Content-Type': 'text/html'
        }
    }).then(function (resp) {
        return resp.text();
    }).then(function (text) {
        return text.replace('{APP_ID}', payload.appId);
    }).then(embedScreen);
}

function showSuccess() {
    embedScreen(['<h1>Congratulation!</h1>', '<div class="Link" data-href="/">Check Bonuses</div>'].join('\n'));
}

function showNotFound() {
    embedScreen(['<h1>Page not found</h1>', '<div class="Link" data-href="/sign-in">Try to sign in</div>'].join('\n'));
}

function showMaintenance() {
    embedScreen(['<h1>Server error</h1>', '<div class="Link" data-href="/sign-in">Try to sign in</div>'].join('\n'));
}

// ---------------------- "веб-компоненты" -------------------- //

function embedScreen(html) {
    document.querySelector('#app').innerHTML = html;
    runLinks(APP.eventBus);
}

function runLinks(eventBus) {
    var links = document.querySelectorAll('.Link');

    var _loop = function _loop(i) {
        var elem = links[i];

        elem.addEventListener('click', function () {
            // Компоненты системы не обращаются к роутеру напрямую,
            // а через промежуточную шину.
            // Это позволить держать все связи роутера с системой в одном месте,
            // что, по идее, должно повысить управляемость кодом.
            eventBus.trigger(APP.EVENTS.URL_CHANGE_REQUESTED_FROM_COMPONENT, { url: elem.getAttribute('data-href') });
        });
    };

    for (var i = 0; i < links.length; i++) {
        _loop(i);
    }
}

// -------------------- Сontext->Router Glue ------------------- //

// Эта функция - часть "библиотечного" решения,
// так что её не нужно будет реализовывать каждый раз
function plugInRouter(router) {
    var _this2 = this;

    /**
     * Обработка случаев, когда изменение location.href происходит
     * не по инициативе роутера:
     *   - кнопки "Назад"/"Вперед"
     *   - какие-то компоненты, напрямую взаимодействующи с историей.
     */
    this.eventBus.bind(APP.EVENTS.URL_CHANGE_REQUESTED_FROM_COMPONENT, function (_ref3) {
        var url = _ref3.url;

        _this2.history.pushState(null, null, url);
    });

    this.history.onPopState(function () {
        router.route(window.location.href);
    });
    this.history.onPushState(function () {
        router.route(window.location.href);
    });

    /**
     * Обработка случаев, когда изменение location.href происходит
     * по инициативе роутера:
     *   - обработка событий (не `navigation`), вызванных через `router.handle()`
     */
    this.eventBus.bind(APP.EVENTS.URL_CHANGE_REQUESTED_FROM_ROUTER, function (_ref4) {
        var url = _ref4.url;

        _this2.history.pushState(null, null, url);
    });
}

},{"./history":7,"./router":9,"domready":2,"microevent":3,"whatwg-fetch":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENTS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.Router = Router;

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _namedRegexp = require('named-regexp');

var _parseUri = require('parseUri');

var _parseUri2 = _interopRequireDefault(_parseUri);

var _kristi = require('kristi');

var Kristi = _interopRequireWildcard(_kristi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Роутер.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * По своей сути - генератор конфига для Kristi.Automaton,
                                                                                                                                                                                                                   * плюс запускатор `coming`-ов.
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * Роутер, на текущий момент умеет:
                                                                                                                                                                                                                   *   - сопоставлять URL, который нужно отроутить, с описанием роута в виде RegExp
                                                                                                                                                                                                                   *   - сопоставлять части URL с именованными группами в RegExp, и передавать
                                                                                                                                                                                                                   *     в обработчик, в виде объекта { groupName : dataFromUrl }
                                                                                                                                                                                                                   *   - сохранять поступащие в роуетр события навигации в очередь и обрабатывать
                                                                                                                                                                                                                   *     их последовательно
                                                                                                                                                                                                                   *   - парсить URL, по которому требуется осуществить переход, и передавать
                                                                                                                                                                                                                   *     в обработчик информацию о query-параметрах, в удобной форме (объект).
                                                                                                                                                                                                                   */

var EVENTS = exports.EVENTS = {
    NAVIGATION: 'navigation'
};

var INITIALIZATION = '--initialization--';

function Router(config) {
    var events = config.events;
    var routes = config.routes;

    var enhancedRoutes = Object.assign(routes, _defineProperty({}, INITIALIZATION, {}));

    var completeEvents = Object.assign({}, events, _defineProperty({}, EVENTS.NAVIGATION, function (_ref) {
        var url = _ref.url;
        return url;
    }));

    var fsmSchema = Object.keys(enhancedRoutes).map(function (key) {
        return [key, enhancedRoutes[key]];
    }).reduce(function (acc, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2);

        var key = _ref3[0];
        var state = _ref3[1];

        return Object.assign(acc, _defineProperty({}, key, stateEvents(state, completeEvents)));
    }, {});

    function stateEvents(_ref4) {
        var _ref4$transitions = _ref4.transitions;
        var transitions = _ref4$transitions === undefined ? {} : _ref4$transitions;
        var events = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return Object.assign({}, transitions, events);
    }

    // ============== Initialization ============== //

    var fsm = new _kristi.Automaton(fsmSchema, {

        /**
         * Функция `nextState`, используемая в Automaton по-умолчанию,
         * не умеет парсить регулярные выражения с именованными группами.
         * Перегружаем её функцией, которая умеет это.
         */
        nextState: function nextState(schema, stateId, eventId) {
            var payload = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            // 1. Получение целевого URL
            var url = Kristi.stateEventValue(schema, stateId, eventId, payload);

            // 2. Получение целевого stateId
            var pathname = (0, _parseUri2.default)(url).path;

            var _matchRoute = matchRoute(pathname, Object.keys(routes));

            var route = _matchRoute.route;
            var data = _matchRoute.data;


            if (!route) {
                var error = new Error('Route ' + route + ' is not found');

                error.code = 404;
                return nextState(schema, stateId, 'error', error);
            }

            return {
                nextStateId: route,
                nextStateData: Object.assign({}, payload, data, { url: url })
            };
        }
    });

    var transitions = fsm.streamThrough(BaconDriver).transitions.filter(function (_ref5) {
        var to = _ref5.to;
        return to !== INITIALIZATION;
    });

    /**
     * Routing
     */
    var navigations = transitions.filter(function (_ref6) {
        var event = _ref6.event;
        return event === EVENTS.NAVIGATION;
    }).map(function (envelope) {
        var to = envelope.to;
        var payload = envelope.payload;

        var location = (0, _parseUri2.default)(payload.url);

        var _matchRoute2 = matchRoute(location.path, Object.keys(routes));

        var data = _matchRoute2.data;


        return Object.assign({}, envelope, { payload: data, location: location });
    });

    var otherTransitions = transitions.filter(function (_ref7) {
        var event = _ref7.event;
        return event !== EVENTS.NAVIGATION;
    });

    /**
     * Для любого перехода в новое состояние
     * нужно выполнить `switchRote`,
     * но запрос на обновление history нужент только для
     * не-navigation событий, т.к. navigation-событие -
     * это и так реакция на уже обновившуюся history.
     */

    navigations.merge(otherTransitions).onValue(switchRoute.bind(this));

    otherTransitions.onValue(function (_ref8) {
        var from = _ref8.from;
        var to = _ref8.to;
        var event = _ref8.event;
        var payload = _ref8.payload;

        config.eventBus.trigger('url_change_requested_from_router', payload);
    });

    /**
     * Logs
     */
    transitions.map(function (x) {
        return x;
    }) // форкаем новый стрим
    .onValue(function (_ref9) {
        var from = _ref9.from;
        var to = _ref9.to;
        var event = _ref9.event;
        var payload = _ref9.payload;

        console.log('"' + from + '" ==> "' + to + '" by "' + event + '"');
        console.log('----------------------------------------');
    });

    fsm.startWith(INITIALIZATION);

    // ================ Public API ================ //

    /**
     * При запуске Роутера, автоматически матчим текущий locatio.href
     * на соответствующий роут из конфигурации.
     */
    this.start = function () {
        fsm.handle(EVENTS.NAVIGATION, { url: window.location.href });
        return this;
    };

    this.handle = function (eventId, payload) {
        fsm.handle(eventId, payload);
        return this;
    };

    this.route = function (url) {
        var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return this.handle(EVENTS.NAVIGATION, Object.assign({}, payload, { url: url }));
    };

    // ================== Tools =================== //

    /**
     * Обеспечивает вызов `coming` роута, с набором аргументов,
     * согласно контракта.
     * Эта процедура вызывается для любого переключения роута,
     * не только для navigation-переходов.
     *
     * @param {string} from - transition start state
     * @param {string} to - transition target state
     * @param {string} event - name of event, which triggered transition
     * @param {Object} payload - data object, from `this.handle(event, data)`
     * @param {Object} location - detailed description of URL, matched to target state
     */
    function switchRoute(_ref10) {
        var from = _ref10.from;
        var to = _ref10.to;
        var event = _ref10.event;
        var payload = _ref10.payload;

        var routeConfig = routes[to];
        var handler = routeConfig.coming || routeConfig;

        if (typeof handler !== 'function') {
            throw new Error('Route "coming" is not a function');
        }

        Promise.resolve(handler.call(this, payload));
    }
}

function matchRoute(pathname) {
    var routes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var NAMED_RE_START = '(:<';

    // TODO: добавить первый проход - сравнение строк

    if (~pathname.indexOf(NAMED_RE_START)) {
        var _ret = function () {
            var regExpStr = '^' + pathname + '$';
            var regExp = new RegExp(regExpStr);
            var route = routes.find(function (elem) {
                return regExp.test(elem);
            });

            if (route) return {
                    v: { route: route, data: {} }
                };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
        for (var i = 0; i < routes.length; i++) {
            var _route = routes[i];
            var _regExpStr = '^' + _route + '$';
            var _regExp = (0, _namedRegexp.named)(new RegExp(_regExpStr));
            var result = _regExp.exec(pathname) || [];
            var captures = result.captures;
            var isMatched = captures && Object.keys(captures).length === result.length - 1;

            if (isMatched) return { route: _route, data: flatCaptures(captures) };
        }
    }

    return {};
}

/**
 * Библиотека named-regexp позволяет использовать имя группы
 * несколько раз в одном и том же рег. выражении:
 *
 * var re = named(/(:<foo>[a-z]+) (:<foo>[a-z]+) (:<bar>[a-z]+)/ig);
 * var matched = re.exec('aaa bbb ccc');
 * console.log(matched.captures); //=> { foo: [ 'aaa', 'bbb' ], bar: [ 'ccc' ] }
 *
 * В отличие от named-regexp, в Router такая
 * возможность отсутствует, т.к. позволяет создавать мало-вразумительные URI.
 *
 * Вместо этого, результирующий объект имеет вид:
 * { foo: 'aaa', bar: 'ccc' }
 *
 * @param {Object} captures
 * @returns {Object}
 */
function flatCaptures(captures) {
    return Object.keys(captures).reduce(function (acc, key) {
        return Object.assign(acc, _defineProperty({}, key, captures[key][0]));
    }, {});
};

// ----------------------------------- //

function BaconDriver(emitToStream) {
    return _baconjs2.default.fromBinder(emitToStream);
}

},{"baconjs":1,"kristi":10,"named-regexp":4,"parseUri":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ERRORS = exports.EVENTS = undefined;
exports.Automaton = Automaton;
exports.nextState = nextState;
exports.stateEventValue = stateEventValue;
exports.error = error;

var _microevent = require('microevent');

var _microevent2 = _interopRequireDefault(_microevent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EVENTS = exports.EVENTS = {
    STARTED: 'started',
    TRANSITION: 'transition',
    PROCESSING: 'processing',
    ERROR: 'error'
};

var ERRORS = exports.ERRORS = {
    ENOTRUNNED: {
        code: 'ENOTRUNNED',
        message: 'Automaton is not runned'
    },

    EALREADYRUNNED: {
        code: 'EALREADYRUNNED',
        message: 'Automaton already runned'
    },

    ENOTRANSITION: {
        code: 'ENOTRANSITION',
        message: function message(eventId, stateId) {
            return 'Transition for event "' + eventId + '" is not defined in state "' + stateId + '"';
        }
    },

    ESTATENOTEXISTS: {
        code: 'ESTATENOTEXISTS',
        message: function message(stateId) {
            return 'Target state "' + stateId + '" does not exist';
        }
    }
};

function Automaton(schema) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


    var self = this;
    var eventBus = new _microevent2.default();
    var isRunned = false;
    var stateId = void 0,
        state = void 0;

    function transitState(newStateId, eventId, payload) {
        var newState = newStateId && schema[newStateId];
        var envelope = void 0;

        if (!newState) throw error(ERRORS.ESTATENOTEXISTS);

        envelope = { from: stateId, to: newStateId, event: eventId, payload: payload };
        state = newState;
        stateId = newStateId;

        emit(EVENTS.TRANSITION, envelope);
    }

    function emit() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        eventBus.trigger.apply(eventBus, args);
    }

    /**
     * @param {string} newStateId - id of start fsm state.
     * @returns {Automaton}
     */
    this.startWith = function startWith(newStateId, payload) {
        if (isRunned) throw error(ERRORS.EALREADYRUNNED);

        isRunned = true;
        transitState(newStateId, EVENTS.STARTED, payload);
        return this;
    };

    /**
     * @param {string} eventId - id of event to process in current state.
     * @returns {Automaton}
     */
    this.handle = function handle(eventId, payload) {
        if (!isRunned) throw error(ERRORS.ENOTRUNNED);

        var nextState = config.nextState || nextState;

        var _nextState = nextState(schema, stateId, eventId, payload);

        var nextStateId = _nextState.nextStateId;
        var nextStateData = _nextState.nextStateData;


        if (!nextStateId) throw error(ERRORS.ENOTRANSITION, eventId, stateId);

        emit(EVENTS.PROCESSING, {
            from: stateId,
            to: nextStateId,
            event: eventId,
            paylaod: nextStateData
        });

        transitState(nextStateId, eventId, nextStateData);
        return this;
    };

    /**
     * @param {Object} streamDriver - library-specific stream constructor
     * @returns {Object}
     */
    this.streamThrough = function streamThrough(Streamable) {
        var transitions = new Streamable(function (emitToStream) {
            eventBus.bind(EVENTS.TRANSITION, emitToStream);
        });

        var processing = new Streamable(function (emitToStream) {
            eventBus.bind(EVENTS.PROCESSING, emitToStream);
        });

        return { transitions: transitions, processing: processing };
    };

    /**
     * @param {string} eventId - id of event to subscribe
     * @param {Function} fn - event handler
     * @returns {Automaton}
     */
    this.on = function (eventId, fn) {
        eventBus.bind(eventId, fn);
        return this;
    };

    /**
     * @param {string} eventId - id of event to unsubscribe
     * @param {Function} fn - event handler
     * @returns {Automaton}
     */
    this.off = function (eventId, fn) {
        eventBus.unbind(eventId, fn);
        return this;
    };

    /**
     * @returns {string}
     */
    this.currentState = function () {
        return stateId;
    };
}

/**
 * @param {Object} schema - transition schema of fsm instance
 * @param {string} stateId - id of current state
 * @param {string} eventId - id of event to process in current state
 * @returns {Object}
 */
function nextState(schema, stateId, eventId, data) {
    var eventValue = stateEventValue(schema, stateId, eventId, data);
    var matchStateId = config.eventValueToStateId || eventValueToStateId;
    var nextStateId = matchStateId(schema, eventValue);

    return { nextStateId: nextStateId, nextStateData: data };
}

function eventValueToStateId(schema, eventValue) {
    return eventValue ? schema[eventValue] ? eventValue : matchRegExpStateId(eventValue, schema) : null;

    // ---------------------------- //

    function matchRegExpStateId(stateId, schema) {
        var res = Object.keys(schema).find(function (regExpStr) {
            var re = new RegExp('^' + regExpStr + '$');
            var res = re.test(stateId);
            return res;
        });
    };
}

function stateEventValue(schema, stateId, eventId, data) {
    var currentState = schema[stateId];
    var val = currentState[eventId];

    return typeof val === 'function' ? val(data) : val;
}

function error(_ref) {
    var code = _ref.code;
    var message = _ref.message;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    var msg = typeof message === 'function' ? message.apply(null, args) : message;

    var err = new Error(msg);

    err.code = code;
    return err;
}
},{"microevent":11}],11:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFjb25qcy9kaXN0L0JhY29uLmpzIiwibm9kZV9tb2R1bGVzL2RvbXJlYWR5L3JlYWR5LmpzIiwibm9kZV9tb2R1bGVzL21pY3JvZXZlbnQvbWljcm9ldmVudC5qcyIsIm5vZGVfbW9kdWxlcy9uYW1lZC1yZWdleHAvbGliL25hbWVkLXJlZ2V4cC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJzZVVyaS9wYXJzZXVyaS5qcyIsIm5vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJzcmMvanMvaGlzdG9yeS5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9yb3V0ZXIuanMiLCIuLi9LcmlzdGkvYnVpbGQvS3Jpc3RpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyMEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1FDMWFnQixVLEdBQUEsVTs7QUFQaEI7Ozs7OztBQUVPLElBQU0sMEJBQVM7QUFDckIsZUFBYyxXQURPO0FBRXJCLGVBQWM7QUFGTyxDQUFmOztBQUtBLFNBQVMsVUFBVCxHQUFzQjtBQUN6QixLQUFJLFdBQVcsMEJBQWY7O0FBRUgsUUFBTyxnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxVQUFVLEdBQVYsRUFBZTtBQUNsRCxNQUFJLFFBQUosR0FBZSxpQkFBZjtBQUNBLFdBQVMsT0FBVCxDQUFpQixPQUFPLFlBQXhCLEVBQXNDLEdBQXRDO0FBQ0EsRUFIRDs7QUFLQSxNQUFLLFNBQUwsR0FBaUIsU0FBUyxTQUFULEdBQWdEO0FBQUEsTUFBN0IsS0FBNkIseURBQXZCLElBQXVCO0FBQUEsTUFBakIsS0FBaUIseURBQVgsSUFBVztBQUFBLE1BQUwsR0FBSzs7QUFDaEUsU0FBTyxPQUFQLENBQWUsU0FBZixDQUF5QixLQUF6QixFQUFnQyxLQUFoQyxFQUF1QyxHQUF2Qzs7QUFFQSxXQUFTLE9BQVQsQ0FBaUIsT0FBTyxZQUF4QixFQUFzQztBQUNyQyxlQURxQztBQUVyQyxlQUZxQztBQUdyQyxXQUhxQztBQUlyQyxhQUFVO0FBSjJCLEdBQXRDOztBQU9BLFNBQU8sSUFBUDtBQUNBLEVBWEQ7O0FBYUEsTUFBSyxJQUFMLEdBQVksU0FBUyxJQUFULEdBQWdCO0FBQzNCLFNBQU8sT0FBUCxDQUFlLElBQWY7QUFDQSxTQUFPLElBQVA7QUFDQSxFQUhEOztBQUtBLE1BQUssT0FBTCxHQUFlLFNBQVMsT0FBVCxHQUFtQjtBQUNqQyxTQUFPLE9BQVAsQ0FBZSxPQUFmO0FBQ0EsU0FBTyxJQUFQO0FBQ0EsRUFIRDs7QUFLQSxNQUFLLEVBQUwsR0FBVSxTQUFTLEVBQVQsQ0FBWSxHQUFaLEVBQWlCO0FBQzFCLFNBQU8sT0FBUCxDQUFlLEVBQWYsQ0FBa0IsR0FBbEI7QUFDQSxTQUFPLElBQVA7QUFDQSxFQUhEOztBQUtBLE1BQUssRUFBTCxHQUFVLFNBQVMsRUFBVCxDQUFZLE9BQVosRUFBcUIsRUFBckIsRUFBeUI7QUFDbEMsU0FBTyxTQUFTLElBQVQsQ0FBYyxPQUFkLEVBQXVCLEVBQXZCLENBQVA7QUFDQSxFQUZEOztBQUlBLE1BQUssV0FBTCxHQUFtQixTQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUI7QUFDM0MsU0FBTyxTQUFTLElBQVQsQ0FBYyxPQUFPLFlBQXJCLEVBQW1DLEVBQW5DLENBQVA7QUFDQSxFQUZEOztBQUlBLE1BQUssVUFBTCxHQUFrQixTQUFTLFVBQVQsQ0FBb0IsRUFBcEIsRUFBd0I7QUFDekMsU0FBTyxTQUFTLElBQVQsQ0FBYyxPQUFPLFlBQXJCLEVBQW1DLEVBQW5DLENBQVA7QUFDQSxFQUZEOztBQUlBLE1BQUssR0FBTCxHQUFXLFNBQVMsR0FBVCxDQUFhLE9BQWIsRUFBc0IsRUFBdEIsRUFBMEI7QUFDcEMsV0FBUyxNQUFULENBQWdCLE9BQWhCLEVBQXlCLEVBQXpCO0FBQ0EsU0FBTyxJQUFQO0FBQ0EsRUFIRDtBQUlBOztBQUVELFNBQVMsZUFBVCxHQUEyQjtBQUMxQixRQUFPO0FBQ04sUUFBVyxPQUFPLFFBQVAsQ0FBZ0IsSUFEckI7QUFFTixZQUFXLE9BQU8sUUFBUCxDQUFnQixRQUZyQjtBQUdOLFVBQVcsT0FBTyxRQUFQLENBQWdCLE1BSHJCO0FBSU4sUUFBVyxPQUFPLFFBQVAsQ0FBZ0I7QUFKckIsRUFBUDtBQU1BOzs7OztBQ3BFRDs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7QUFLQSxPQUFPLEdBQVAsR0FBYTtBQUNULGFBQVcseUJBREY7QUFFVCxjQUFXLDBCQUZGOztBQUlULFlBQVE7QUFDSiwwQ0FBc0Msa0NBRGxDO0FBRUosNkNBQXNDO0FBRmxDO0FBSkMsQ0FBYjs7QUFXQSxhQUFhLFVBQWIsQ0FBd0IsYUFBeEI7O0FBRUEsd0JBQVMsWUFBWTtBQUNqQixRQUFJLFNBQVMsbUJBQVc7QUFDcEIsa0JBQVcsSUFBSSxRQURLOztBQUdwQixnQkFBUTtBQUNKLG1CQUFRO0FBREosU0FIWTs7QUFPcEIsZ0JBQVE7QUFDSiw0Q0FBZ0MsWUFENUI7O0FBR0osa0JBQU0sV0FIRjs7QUFLSiwwQkFBYztBQUNWLDZCQUFhOzs7QUFHVCxtREFBZ0M7QUFBQSw0QkFBRyxLQUFILFFBQUcsS0FBSDtBQUFBLDRCQUFVLEtBQVYsUUFBVSxLQUFWO0FBQUEscUNBQTBCLEtBQTFCLGVBQXlDLEtBQXpDO0FBQUEscUJBSHZCO0FBSVQsZ0RBQTZCO0FBSnBCLGlCQURIOztBQVFWLHdCQUFRO0FBUkUsYUFMVjs7QUFnQkosMEJBQWMsV0FoQlY7O0FBa0JKLHNCQUFVLFlBbEJOOztBQW9CSiw4QkFBa0I7QUFwQmQ7QUFQWSxLQUFYLENBQWI7O0FBK0JBLGlCQUFhLElBQWIsQ0FBa0IsR0FBbEIsRUFBdUIsTUFBdkIsRTtBQUNBLFdBQU8sS0FBUDtBQUNILENBbENEOzs7Ozs7O0FBMENBLFNBQVMsWUFBVCxRQUFpQztBQUFBLFFBQVIsSUFBUSxTQUFSLElBQVE7O0FBQzdCLFdBQU87QUFDSCxhQUFLO0FBREYsTTtBQUdMLFFBSEssS0FHSSxlQUhYO0FBSUg7OztBQUtELFNBQVMsV0FBVCxHQUF1QjtBQUNuQixnQkFBWSxDQUNSLGtCQURRLEVBRVIsbUVBRlEsRUFHUixNQUhRLEVBSVIsNkRBSlEsRUFLVixJQUxVLENBS0wsSUFMSyxDQUFaOztBQU9BLGFBQ0ssYUFETCxDQUNtQixVQURuQixFQUVLLGdCQUZMLENBRXNCLE9BRnRCLEVBRStCLFlBQU07QUFDN0IscUJBQWEsT0FBYixDQUFxQixhQUFyQixFQUFvQyxJQUFwQztBQUNILEtBSkw7QUFLSDs7QUFFRCxTQUFTLFVBQVQsQ0FBb0IsT0FBcEIsRUFBNkI7QUFBQTs7QUFDekIsUUFBSSxRQUFRLE9BQU8sUUFBUCxDQUFnQixNQUE1Qjs7QUFFQSxnQkFBWSxDQUNSLGtCQURRLEVBRVIsdUNBRlEsRUFHVixJQUhVLENBR0wsSUFISyxDQUFaOztBQUtBLGFBQ0ssYUFETCxDQUNtQixVQURuQixFQUVLLGdCQUZMLENBRXNCLE9BRnRCLEVBRStCLFlBQU07QUFDN0IsWUFBSSxnQkFBZ0IsYUFBYSxPQUFiLENBQXFCLGFBQXJCLENBQXBCOztBQUVBLFlBQUksYUFBSixFQUFtQjs7QUFFZixrQkFBSyxNQUFMLENBQVksNkJBQVosRUFBMkMsRUFBRSxPQUFPLElBQVQsRUFBZSxZQUFmLEVBQTNDO0FBQ0gsU0FIRCxNQUdPO0FBQ0gsa0JBQUssTUFBTCxDQUFZLDBCQUFaO0FBQ0g7QUFDSixLQVhMO0FBWUg7O0FBRUQsU0FBUyxZQUFULENBQXNCLE9BQXRCLEVBQStCO0FBQzNCLFdBQU8sTUFBTSx5QkFBTixFQUFpQztBQUNwQyxnQkFBUSxLQUQ0QjtBQUVwQyxpQkFBUztBQUNMLHNCQUFVLE1BREw7QUFFTCw0QkFBZ0I7QUFGWDtBQUYyQixLQUFqQyxFQU9OLElBUE0sQ0FPRDtBQUFBLGVBQVEsS0FBSyxJQUFMLEVBQVI7QUFBQSxLQVBDLEVBUU4sSUFSTSxDQVFEO0FBQUEsZUFBUSxLQUFLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLFFBQVEsS0FBakMsQ0FBUjtBQUFBLEtBUkMsRUFTTixJQVRNLENBU0QsV0FUQyxDQUFQO0FBVUg7O0FBRUQsU0FBUyxXQUFULEdBQXVCO0FBQ25CLGdCQUFZLENBQ1IsMEJBRFEsRUFFUixxREFGUSxFQUdWLElBSFUsQ0FHTCxJQUhLLENBQVo7QUFJSDs7QUFFRCxTQUFTLFlBQVQsR0FBd0I7QUFDcEIsZ0JBQVksQ0FDUix5QkFEUSxFQUVSLDZEQUZRLEVBR1YsSUFIVSxDQUdMLElBSEssQ0FBWjtBQUlIOztBQUdELFNBQVMsZUFBVCxHQUEyQjtBQUN2QixnQkFBWSxDQUNSLHVCQURRLEVBRVIsNkRBRlEsRUFHVixJQUhVLENBR0wsSUFISyxDQUFaO0FBSUg7Ozs7QUFLRCxTQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkI7QUFDdkIsYUFBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLFNBQS9CLEdBQTJDLElBQTNDO0FBQ0EsYUFBUyxJQUFJLFFBQWI7QUFDSDs7QUFHRCxTQUFTLFFBQVQsQ0FBa0IsUUFBbEIsRUFBNEI7QUFDeEIsUUFBSSxRQUFRLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBWjs7QUFEd0IsK0JBR2YsQ0FIZTtBQUlwQixZQUFJLE9BQU8sTUFBTSxDQUFOLENBQVg7O0FBRUEsYUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFNOzs7OztBQUtqQyxxQkFBUyxPQUFULENBQ0ksSUFBSSxNQUFKLENBQVcsbUNBRGYsRUFFSSxFQUFFLEtBQUssS0FBSyxZQUFMLENBQWtCLFdBQWxCLENBQVAsRUFGSjtBQUlILFNBVEQ7QUFOb0I7O0FBR3hCLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQUEsY0FBOUIsQ0FBOEI7QUFhdEM7QUFDSjs7Ozs7O0FBT0QsU0FBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQUE7Ozs7Ozs7O0FBTzFCLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBSSxNQUFKLENBQVcsbUNBQTlCLEVBQW1FLGlCQUFhO0FBQUEsWUFBVixHQUFVLFNBQVYsR0FBVTs7QUFDNUUsZUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixJQUF2QixFQUE2QixJQUE3QixFQUFtQyxHQUFuQztBQUNILEtBRkQ7O0FBSUEsU0FBSyxPQUFMLENBQWEsVUFBYixDQUF3QixZQUFPO0FBQUUsZUFBTyxLQUFQLENBQWEsT0FBTyxRQUFQLENBQWdCLElBQTdCO0FBQXFDLEtBQXRFO0FBQ0EsU0FBSyxPQUFMLENBQWEsV0FBYixDQUF5QixZQUFNO0FBQUUsZUFBTyxLQUFQLENBQWEsT0FBTyxRQUFQLENBQWdCLElBQTdCO0FBQXFDLEtBQXRFOzs7Ozs7O0FBT0EsU0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFJLE1BQUosQ0FBVyxnQ0FBOUIsRUFBZ0UsaUJBQWE7QUFBQSxZQUFWLEdBQVUsU0FBVixHQUFVOztBQUN6RSxlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLElBQXZCLEVBQTZCLElBQTdCLEVBQW1DLEdBQW5DO0FBQ0gsS0FGRDtBQUdIOzs7Ozs7Ozs7Ozs7OztRQzdLZSxNLEdBQUEsTTs7QUFiaEI7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOztJQUNZLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTCxJQUFNLDBCQUFTO0FBQ2xCLGdCQUFZO0FBRE0sQ0FBZjs7QUFJUCxJQUFNLGlCQUFpQixvQkFBdkI7O0FBRU8sU0FBUyxNQUFULENBQWlCLE1BQWpCLEVBQXlCO0FBQUEsUUFDdEIsTUFEc0IsR0FDSCxNQURHLENBQ3RCLE1BRHNCO0FBQUEsUUFDZCxNQURjLEdBQ0gsTUFERyxDQUNkLE1BRGM7O0FBRTVCLFFBQUksaUJBQXFCLE9BQU8sTUFBUCxDQUFjLE1BQWQsc0JBQXlCLGNBQXpCLEVBQTBDLEVBQTFDLEVBQXpCOztBQUVBLFFBQUksaUJBQWlCLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsTUFBbEIsc0JBQ2hCLE9BQU8sVUFEUyxFQUNLO0FBQUEsWUFBRyxHQUFILFFBQUcsR0FBSDtBQUFBLGVBQWEsR0FBYjtBQUFBLEtBREwsRUFBckI7O0FBSUEsUUFBSSxZQUFZLE9BQ1gsSUFEVyxDQUNOLGNBRE0sRUFFWCxHQUZXLENBRVAsVUFBQyxHQUFEO0FBQUEsZUFBUyxDQUFDLEdBQUQsRUFBTSxlQUFlLEdBQWYsQ0FBTixDQUFUO0FBQUEsS0FGTyxFQUdYLE1BSFcsQ0FHSixVQUFDLEdBQUQsU0FBdUI7QUFBQTs7QUFBQSxZQUFoQixHQUFnQjtBQUFBLFlBQVgsS0FBVzs7QUFDM0IsZUFBTyxPQUFPLE1BQVAsQ0FBYyxHQUFkLHNCQUFzQixHQUF0QixFQUE2QixZQUFZLEtBQVosRUFBbUIsY0FBbkIsQ0FBN0IsRUFBUDtBQUNILEtBTFcsRUFLVCxFQUxTLENBQWhCOztBQU9BLGFBQVMsV0FBVCxRQUFvRDtBQUFBLHNDQUE3QixXQUE2QjtBQUFBLFlBQTdCLFdBQTZCLHFDQUFqQixFQUFpQjtBQUFBLFlBQVgsTUFBVyx5REFBSixFQUFJOztBQUNoRCxlQUFPLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsV0FBbEIsRUFBK0IsTUFBL0IsQ0FBUDtBQUNIOzs7O0FBS0QsUUFBSSxNQUFNLHNCQUFjLFNBQWQsRUFBeUI7Ozs7Ozs7QUFPL0IsbUJBQVcsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLE9BQTNCLEVBQW9DLE9BQXBDLEVBQXlEO0FBQUEsZ0JBQVosT0FBWSx5REFBSixFQUFJOzs7QUFFaEUsZ0JBQUksTUFBTSxPQUFPLGVBQVAsQ0FBdUIsTUFBdkIsRUFBK0IsT0FBL0IsRUFBd0MsT0FBeEMsRUFBaUQsT0FBakQsQ0FBVjs7O0FBR0EsZ0JBQUksV0FBVyx3QkFBUyxHQUFULEVBQWMsSUFBN0I7O0FBTGdFLDhCQU0xQyxXQUFXLFFBQVgsRUFBcUIsT0FBTyxJQUFQLENBQVksTUFBWixDQUFyQixDQU4wQzs7QUFBQSxnQkFNMUQsS0FOMEQsZUFNMUQsS0FOMEQ7QUFBQSxnQkFNbkQsSUFObUQsZUFNbkQsSUFObUQ7OztBQVFoRSxnQkFBSSxDQUFDLEtBQUwsRUFBWTtBQUNSLG9CQUFJLFFBQVEsSUFBSSxLQUFKLFlBQW1CLEtBQW5CLG1CQUFaOztBQUVBLHNCQUFNLElBQU4sR0FBYSxHQUFiO0FBQ0EsdUJBQU8sVUFBVSxNQUFWLEVBQWtCLE9BQWxCLEVBQTJCLE9BQTNCLEVBQW9DLEtBQXBDLENBQVA7QUFDSDs7QUFFRCxtQkFBTztBQUNILDZCQUFnQixLQURiO0FBRUgsK0JBQWdCLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsT0FBbEIsRUFBMkIsSUFBM0IsRUFBaUMsRUFBRSxRQUFGLEVBQWpDO0FBRmIsYUFBUDtBQUlIO0FBMUI4QixLQUF6QixDQUFWOztBQThCQSxRQUFJLGNBQWMsSUFDYixhQURhLENBQ0MsV0FERCxFQUViLFdBRmEsQ0FHYixNQUhhLENBR047QUFBQSxZQUFHLEVBQUgsU0FBRyxFQUFIO0FBQUEsZUFBWSxPQUFPLGNBQW5CO0FBQUEsS0FITSxDQUFsQjs7Ozs7QUFTQSxRQUFJLGNBQWMsWUFDYixNQURhLENBQ047QUFBQSxZQUFHLEtBQUgsU0FBRyxLQUFIO0FBQUEsZUFBZSxVQUFVLE9BQU8sVUFBaEM7QUFBQSxLQURNLEVBRWIsR0FGYSxDQUVULFVBQUMsUUFBRCxFQUFjO0FBQUEsWUFDVCxFQURTLEdBQ08sUUFEUCxDQUNULEVBRFM7QUFBQSxZQUNMLE9BREssR0FDTyxRQURQLENBQ0wsT0FESzs7QUFFZixZQUFJLFdBQWtCLHdCQUFTLFFBQVEsR0FBakIsQ0FBdEI7O0FBRmUsMkJBR08sV0FBVyxTQUFTLElBQXBCLEVBQTBCLE9BQU8sSUFBUCxDQUFZLE1BQVosQ0FBMUIsQ0FIUDs7QUFBQSxZQUdULElBSFMsZ0JBR1QsSUFIUzs7O0FBS2YsZUFBTyxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLFFBQWxCLEVBQTRCLEVBQUUsU0FBUyxJQUFYLEVBQWlCLGtCQUFqQixFQUE1QixDQUFQO0FBQ0gsS0FSYSxDQUFsQjs7QUFVQSxRQUFJLG1CQUFtQixZQUNsQixNQURrQixDQUNYO0FBQUEsWUFBRyxLQUFILFNBQUcsS0FBSDtBQUFBLGVBQWUsVUFBVSxPQUFPLFVBQWhDO0FBQUEsS0FEVyxDQUF2Qjs7Ozs7Ozs7OztBQVlBLGdCQUNLLEtBREwsQ0FDVyxnQkFEWCxFQUVLLE9BRkwsQ0FFYSxZQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FGYjs7QUFLQSxxQkFDSyxPQURMLENBQ2EsaUJBQWtDO0FBQUEsWUFBL0IsSUFBK0IsU0FBL0IsSUFBK0I7QUFBQSxZQUF6QixFQUF5QixTQUF6QixFQUF5QjtBQUFBLFlBQXJCLEtBQXFCLFNBQXJCLEtBQXFCO0FBQUEsWUFBZCxPQUFjLFNBQWQsT0FBYzs7QUFDdkMsZUFBTyxRQUFQLENBQWdCLE9BQWhCLENBQXdCLGtDQUF4QixFQUE0RCxPQUE1RDtBQUNILEtBSEw7Ozs7O0FBU0EsZ0JBQ0ssR0FETCxDQUNTLFVBQUMsQ0FBRDtBQUFBLGVBQU8sQ0FBUDtBQUFBLEtBRFQsQztBQUFBLEtBRUssT0FGTCxDQUVhLGlCQUFrQztBQUFBLFlBQS9CLElBQStCLFNBQS9CLElBQStCO0FBQUEsWUFBekIsRUFBeUIsU0FBekIsRUFBeUI7QUFBQSxZQUFyQixLQUFxQixTQUFyQixLQUFxQjtBQUFBLFlBQWQsT0FBYyxTQUFkLE9BQWM7O0FBQ3ZDLGdCQUFRLEdBQVIsT0FBZ0IsSUFBaEIsZUFBOEIsRUFBOUIsY0FBeUMsS0FBekM7QUFDQSxnQkFBUSxHQUFSLENBQVksMENBQVo7QUFDSCxLQUxMOztBQU9BLFFBQUksU0FBSixDQUFjLGNBQWQ7Ozs7Ozs7O0FBU0EsU0FBSyxLQUFMLEdBQWEsWUFBVztBQUNwQixZQUFJLE1BQUosQ0FBVyxPQUFPLFVBQWxCLEVBQThCLEVBQUUsS0FBSyxPQUFPLFFBQVAsQ0FBZ0IsSUFBdkIsRUFBOUI7QUFDQSxlQUFPLElBQVA7QUFDSCxLQUhEOztBQUtBLFNBQUssTUFBTCxHQUFjLFVBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjtBQUNyQyxZQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLE9BQXBCO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsS0FIRDs7QUFLQSxTQUFLLEtBQUwsR0FBYSxVQUFTLEdBQVQsRUFBMEI7QUFBQSxZQUFaLE9BQVkseURBQUosRUFBSTs7QUFDbkMsZUFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFPLFVBQW5CLEVBQStCLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBa0IsT0FBbEIsRUFBMkIsRUFBRSxRQUFGLEVBQTNCLENBQS9CLENBQVA7QUFDSCxLQUZEOzs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLGFBQVMsV0FBVCxTQUFtRDtBQUFBLFlBQTVCLElBQTRCLFVBQTVCLElBQTRCO0FBQUEsWUFBdEIsRUFBc0IsVUFBdEIsRUFBc0I7QUFBQSxZQUFsQixLQUFrQixVQUFsQixLQUFrQjtBQUFBLFlBQVgsT0FBVyxVQUFYLE9BQVc7O0FBQy9DLFlBQUksY0FBYyxPQUFPLEVBQVAsQ0FBbEI7QUFDQSxZQUFJLFVBQWMsWUFBWSxNQUFaLElBQXNCLFdBQXhDOztBQUVBLFlBQUksT0FBTyxPQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQy9CLGtCQUFNLElBQUksS0FBSixDQUFVLGtDQUFWLENBQU47QUFDSDs7QUFFRCxnQkFBUSxPQUFSLENBQWdCLFFBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsT0FBbkIsQ0FBaEI7QUFDSDtBQUNKOztBQUdELFNBQVMsVUFBVCxDQUFvQixRQUFwQixFQUEyQztBQUFBLFFBQWIsTUFBYSx5REFBSixFQUFJOztBQUN2QyxRQUFNLGlCQUFpQixLQUF2Qjs7OztBQUlBLFFBQUksQ0FBQyxTQUFTLE9BQVQsQ0FBaUIsY0FBakIsQ0FBTCxFQUF1QztBQUFBO0FBQ25DLGdCQUFJLFlBQVksTUFBTSxRQUFOLEdBQWlCLEdBQWpDO0FBQ0EsZ0JBQUksU0FBWSxJQUFJLE1BQUosQ0FBVyxTQUFYLENBQWhCO0FBQ0EsZ0JBQUksUUFBWSxPQUFPLElBQVAsQ0FBWSxVQUFDLElBQUQ7QUFBQSx1QkFBVSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQVY7QUFBQSxhQUFaLENBQWhCOztBQUVBLGdCQUFJLEtBQUosRUFBVztBQUFBLHVCQUFPLEVBQUUsWUFBRixFQUFTLE1BQU0sRUFBZjtBQUFQO0FBTHdCOztBQUFBO0FBTXRDLEtBTkQsTUFNTztBQUNILGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLGdCQUFJLFNBQVksT0FBTyxDQUFQLENBQWhCO0FBQ0EsZ0JBQUksYUFBWSxNQUFNLE1BQU4sR0FBYyxHQUE5QjtBQUNBLGdCQUFJLFVBQVksd0JBQU0sSUFBSSxNQUFKLENBQVcsVUFBWCxDQUFOLENBQWhCO0FBQ0EsZ0JBQUksU0FBWSxRQUFPLElBQVAsQ0FBWSxRQUFaLEtBQXlCLEVBQXpDO0FBQ0EsZ0JBQUksV0FBWSxPQUFPLFFBQXZCO0FBQ0EsZ0JBQUksWUFBWSxZQUFhLE9BQU8sSUFBUCxDQUFZLFFBQVosRUFBc0IsTUFBdEIsS0FBa0MsT0FBTyxNQUFQLEdBQWdCLENBQS9FOztBQUVBLGdCQUFJLFNBQUosRUFBZSxPQUFPLEVBQUUsYUFBRixFQUFTLE1BQU0sYUFBYSxRQUFiLENBQWYsRUFBUDtBQUNsQjtBQUNKOztBQUVELFdBQU8sRUFBUDtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JELFNBQVMsWUFBVCxDQUFzQixRQUF0QixFQUFnQztBQUM1QixXQUFPLE9BQ0YsSUFERSxDQUNHLFFBREgsRUFFRixNQUZFLENBRUssVUFBQyxHQUFELEVBQU0sR0FBTjtBQUFBLGVBQWMsT0FBTyxNQUFQLENBQWMsR0FBZCxzQkFBc0IsR0FBdEIsRUFBNEIsU0FBUyxHQUFULEVBQWMsQ0FBZCxDQUE1QixFQUFkO0FBQUEsS0FGTCxFQUVvRSxFQUZwRSxDQUFQO0FBR0g7Ozs7QUFLRCxTQUFTLFdBQVQsQ0FBcUIsWUFBckIsRUFBbUM7QUFDL0IsV0FBTyxrQkFBTSxVQUFOLENBQWlCLFlBQWpCLENBQVA7QUFDSDs7O0FDL09EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xudmFyIF9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBCYWNvbiA9IHtcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJCYWNvblwiO1xuICB9XG59O1xuXG5CYWNvbi52ZXJzaW9uID0gJzAuNy44NCc7XG5cbnZhciBFeGNlcHRpb24gPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwgPyBnbG9iYWwgOiB0aGlzKS5FcnJvcjtcbnZhciBub3AgPSBmdW5jdGlvbiAoKSB7fTtcbnZhciBsYXR0ZXIgPSBmdW5jdGlvbiAoXywgeCkge1xuICByZXR1cm4geDtcbn07XG52YXIgZm9ybWVyID0gZnVuY3Rpb24gKHgsIF8pIHtcbiAgcmV0dXJuIHg7XG59O1xudmFyIGNsb25lQXJyYXkgPSBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIHhzLnNsaWNlKDApO1xufTtcbnZhciBhc3NlcnQgPSBmdW5jdGlvbiAobWVzc2FnZSwgY29uZGl0aW9uKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihtZXNzYWdlKTtcbiAgfVxufTtcbnZhciBhc3NlcnRPYnNlcnZhYmxlSXNQcm9wZXJ0eSA9IGZ1bmN0aW9uICh4KSB7XG4gIGlmICgoeCAhPSBudWxsID8geC5faXNPYnNlcnZhYmxlIDogdm9pZCAwKSAmJiAhKHggIT0gbnVsbCA/IHguX2lzUHJvcGVydHkgOiB2b2lkIDApKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk9ic2VydmFibGUgaXMgbm90IGEgUHJvcGVydHkgOiBcIiArIHgpO1xuICB9XG59O1xudmFyIGFzc2VydEV2ZW50U3RyZWFtID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghKGV2ZW50ICE9IG51bGwgPyBldmVudC5faXNFdmVudFN0cmVhbSA6IHZvaWQgMCkpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIEV2ZW50U3RyZWFtIDogXCIgKyBldmVudCk7XG4gIH1cbn07XG5cbnZhciBhc3NlcnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghKGV2ZW50ICE9IG51bGwgPyBldmVudC5faXNPYnNlcnZhYmxlIDogdm9pZCAwKSkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gT2JzZXJ2YWJsZSA6IFwiICsgZXZlbnQpO1xuICB9XG59O1xudmFyIGFzc2VydEZ1bmN0aW9uID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGFzc2VydChcIm5vdCBhIGZ1bmN0aW9uIDogXCIgKyBmLCBfLmlzRnVuY3Rpb24oZikpO1xufTtcbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiB4cyBpbnN0YW5jZW9mIEFycmF5O1xufTtcbnZhciBpc09ic2VydmFibGUgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4geCAmJiB4Ll9pc09ic2VydmFibGU7XG59O1xudmFyIGFzc2VydEFycmF5ID0gZnVuY3Rpb24gKHhzKSB7XG4gIGlmICghaXNBcnJheSh4cykpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIGFycmF5IDogXCIgKyB4cyk7XG4gIH1cbn07XG52YXIgYXNzZXJ0Tm9Bcmd1bWVudHMgPSBmdW5jdGlvbiAoYXJncykge1xuICByZXR1cm4gYXNzZXJ0KFwibm8gYXJndW1lbnRzIHN1cHBvcnRlZFwiLCBhcmdzLmxlbmd0aCA9PT0gMCk7XG59O1xudmFyIGFzc2VydFN0cmluZyA9IGZ1bmN0aW9uICh4KSB7XG4gIGlmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYSBzdHJpbmcgOiBcIiArIHgpO1xuICB9XG59O1xuXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDE7IDEgPCBsZW5ndGggPyBpIDwgbGVuZ3RoIDogaSA+IGxlbmd0aDsgMSA8IGxlbmd0aCA/IGkrKyA6IGktLSkge1xuICAgIGZvciAodmFyIHByb3AgaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICB0YXJnZXRbcHJvcF0gPSBhcmd1bWVudHNbaV1bcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgaW5oZXJpdCA9IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50KSB7XG4gIHZhciBoYXNQcm9wID0gKHt9KS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGN0b3IgPSBmdW5jdGlvbiAoKSB7fTtcbiAgY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpO1xuICBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7XG4gICAgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIHtcbiAgICAgIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNoaWxkO1xufTtcblxudmFyIF8gPSB7XG4gIGluZGV4T2Y6IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHhzLCB4KSB7XG4gICAgICAgIHJldHVybiB4cy5pbmRleE9mKHgpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4cywgeCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgeTsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgeSA9IHhzW2ldO1xuICAgICAgICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfTtcbiAgICB9XG4gIH0pKCksXG4gIGluZGV4V2hlcmU6IGZ1bmN0aW9uICh4cywgZikge1xuICAgIGZvciAodmFyIGkgPSAwLCB5OyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHkgPSB4c1tpXTtcbiAgICAgIGlmIChmKHkpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH0sXG4gIGhlYWQ6IGZ1bmN0aW9uICh4cykge1xuICAgIHJldHVybiB4c1swXTtcbiAgfSxcbiAgYWx3YXlzOiBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9LFxuICBuZWdhdGU6IGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gIWYoeCk7XG4gICAgfTtcbiAgfSxcbiAgZW1wdHk6IGZ1bmN0aW9uICh4cykge1xuICAgIHJldHVybiB4cy5sZW5ndGggPT09IDA7XG4gIH0sXG4gIHRhaWw6IGZ1bmN0aW9uICh4cykge1xuICAgIHJldHVybiB4cy5zbGljZSgxLCB4cy5sZW5ndGgpO1xuICB9LFxuICBmaWx0ZXI6IGZ1bmN0aW9uIChmLCB4cykge1xuICAgIHZhciBmaWx0ZXJlZCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCB4OyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHggPSB4c1tpXTtcbiAgICAgIGlmIChmKHgpKSB7XG4gICAgICAgIGZpbHRlcmVkLnB1c2goeCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgfSxcbiAgbWFwOiBmdW5jdGlvbiAoZiwgeHMpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCB4OyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgeCA9IHhzW2ldO1xuICAgICAgICByZXN1bHQucHVzaChmKHgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkoKTtcbiAgfSxcbiAgZWFjaDogZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHhzKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHhzLCBrZXkpKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHhzW2tleV07XG4gICAgICAgIGYoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0b0FycmF5OiBmdW5jdGlvbiAoeHMpIHtcbiAgICByZXR1cm4gaXNBcnJheSh4cykgPyB4cyA6IFt4c107XG4gIH0sXG4gIGNvbnRhaW5zOiBmdW5jdGlvbiAoeHMsIHgpIHtcbiAgICByZXR1cm4gXy5pbmRleE9mKHhzLCB4KSAhPT0gLTE7XG4gIH0sXG4gIGlkOiBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4O1xuICB9LFxuICBsYXN0OiBmdW5jdGlvbiAoeHMpIHtcbiAgICByZXR1cm4geHNbeHMubGVuZ3RoIC0gMV07XG4gIH0sXG4gIGFsbDogZnVuY3Rpb24gKHhzKSB7XG4gICAgdmFyIGYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBfLmlkIDogYXJndW1lbnRzWzFdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIHg7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgeCA9IHhzW2ldO1xuICAgICAgaWYgKCFmKHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGFueTogZnVuY3Rpb24gKHhzKSB7XG4gICAgdmFyIGYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBfLmlkIDogYXJndW1lbnRzWzFdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIHg7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgeCA9IHhzW2ldO1xuICAgICAgaWYgKGYoeCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgd2l0aG91dDogZnVuY3Rpb24gKHgsIHhzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGZ1bmN0aW9uICh5KSB7XG4gICAgICByZXR1cm4geSAhPT0geDtcbiAgICB9LCB4cyk7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24gKHgsIHhzKSB7XG4gICAgdmFyIGkgPSBfLmluZGV4T2YoeHMsIHgpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHJldHVybiB4cy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9LFxuICBmb2xkOiBmdW5jdGlvbiAoeHMsIHNlZWQsIGYpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgeDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB4ID0geHNbaV07XG4gICAgICBzZWVkID0gZihzZWVkLCB4KTtcbiAgICB9XG4gICAgcmV0dXJuIHNlZWQ7XG4gIH0sXG4gIGZsYXRNYXA6IGZ1bmN0aW9uIChmLCB4cykge1xuICAgIHJldHVybiBfLmZvbGQoeHMsIFtdLCBmdW5jdGlvbiAoeXMsIHgpIHtcbiAgICAgIHJldHVybiB5cy5jb25jYXQoZih4KSk7XG4gICAgfSk7XG4gIH0sXG4gIGNhY2hlZDogZnVuY3Rpb24gKGYpIHtcbiAgICB2YXIgdmFsdWUgPSBOb25lO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlICE9PSBudWxsID8gdmFsdWUuX2lzTm9uZSA6IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IGYoKTtcbiAgICAgICAgZiA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9LFxuICBiaW5kOiBmdW5jdGlvbiAoZm4sIG1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuICBpc0Z1bmN0aW9uOiBmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiB0eXBlb2YgZiA9PT0gXCJmdW5jdGlvblwiO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBpbnRlcm5hbHMsIGtleSwgdmFsdWU7XG4gICAgdmFyIGhhc1Byb3AgPSAoe30pLmhhc093blByb3BlcnR5O1xuICAgIHRyeSB7XG4gICAgICByZWN1cnNpb25EZXB0aCsrO1xuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgICByZXR1cm4gXCJmdW5jdGlvblwiO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgIHJldHVybiBcIlsuLl1cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJbXCIgKyBfLm1hcChfLnRvU3RyaW5nLCBvYmopLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgICAgIH0gZWxzZSBpZiAoKG9iaiAhPSBudWxsID8gb2JqLnRvU3RyaW5nIDogdm9pZCAwKSAhPSBudWxsICYmIG9iai50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykge1xuICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgIHJldHVybiBcInsuLn1cIjtcbiAgICAgICAgfVxuICAgICAgICBpbnRlcm5hbHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChvYmosIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFsdWUgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChfLnRvU3RyaW5nKGtleSkgKyBcIjpcIiArIF8udG9TdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBcIntcIiArIGludGVybmFscyArIFwifVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgcmVjdXJzaW9uRGVwdGgtLTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciByZWN1cnNpb25EZXB0aCA9IDA7XG5cbkJhY29uLl8gPSBfO1xuXG52YXIgVXBkYXRlQmFycmllciA9IEJhY29uLlVwZGF0ZUJhcnJpZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcm9vdEV2ZW50O1xuICB2YXIgd2FpdGVyT2JzID0gW107XG4gIHZhciB3YWl0ZXJzID0ge307XG4gIHZhciBhZnRlcnMgPSBbXTtcbiAgdmFyIGFmdGVyc0luZGV4ID0gMDtcbiAgdmFyIGZsdXNoZWQgPSB7fTtcblxuICB2YXIgYWZ0ZXJUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uIChmKSB7XG4gICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgcmV0dXJuIGFmdGVycy5wdXNoKGYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZigpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgd2hlbkRvbmVXaXRoID0gZnVuY3Rpb24gKG9icywgZikge1xuICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgIHZhciBvYnNXYWl0ZXJzID0gd2FpdGVyc1tvYnMuaWRdO1xuICAgICAgaWYgKCEodHlwZW9mIG9ic1dhaXRlcnMgIT09IFwidW5kZWZpbmVkXCIgJiYgb2JzV2FpdGVycyAhPT0gbnVsbCkpIHtcbiAgICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzLmlkXSA9IFtmXTtcbiAgICAgICAgcmV0dXJuIHdhaXRlck9icy5wdXNoKG9icyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JzV2FpdGVycy5wdXNoKGYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZigpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgd2hpbGUgKHdhaXRlck9icy5sZW5ndGggPiAwKSB7XG4gICAgICBmbHVzaFdhaXRlcnMoMCwgdHJ1ZSk7XG4gICAgfVxuICAgIGZsdXNoZWQgPSB7fTtcbiAgfTtcblxuICB2YXIgZmx1c2hXYWl0ZXJzID0gZnVuY3Rpb24gKGluZGV4LCBkZXBzKSB7XG4gICAgdmFyIG9icyA9IHdhaXRlck9ic1tpbmRleF07XG4gICAgdmFyIG9ic0lkID0gb2JzLmlkO1xuICAgIHZhciBvYnNXYWl0ZXJzID0gd2FpdGVyc1tvYnNJZF07XG4gICAgd2FpdGVyT2JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgZGVsZXRlIHdhaXRlcnNbb2JzSWRdO1xuICAgIGlmIChkZXBzICYmIHdhaXRlck9icy5sZW5ndGggPiAwKSB7XG4gICAgICBmbHVzaERlcHNPZihvYnMpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgZjsgaSA8IG9ic1dhaXRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGYgPSBvYnNXYWl0ZXJzW2ldO1xuICAgICAgZigpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZmx1c2hEZXBzT2YgPSBmdW5jdGlvbiAob2JzKSB7XG4gICAgaWYgKGZsdXNoZWRbb2JzLmlkXSkgcmV0dXJuO1xuICAgIHZhciBkZXBzID0gb2JzLmludGVybmFsRGVwcygpO1xuICAgIGZvciAodmFyIGkgPSAwLCBkZXA7IGkgPCBkZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXAgPSBkZXBzW2ldO1xuICAgICAgZmx1c2hEZXBzT2YoZGVwKTtcbiAgICAgIGlmICh3YWl0ZXJzW2RlcC5pZF0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHdhaXRlck9icywgZGVwKTtcbiAgICAgICAgZmx1c2hXYWl0ZXJzKGluZGV4LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZsdXNoZWRbb2JzLmlkXSA9IHRydWU7XG4gIH07XG5cbiAgdmFyIGluVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoZXZlbnQsIGNvbnRleHQsIGYsIGFyZ3MpIHtcbiAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICByZXR1cm4gZi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdEV2ZW50ID0gZXZlbnQ7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZi5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgICBmbHVzaCgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgcm9vdEV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB3aGlsZSAoYWZ0ZXJzSW5kZXggPCBhZnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGFmdGVyID0gYWZ0ZXJzW2FmdGVyc0luZGV4XTtcbiAgICAgICAgICBhZnRlcnNJbmRleCsrO1xuICAgICAgICAgIGFmdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYWZ0ZXJzSW5kZXggPSAwO1xuICAgICAgICBhZnRlcnMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIHZhciBjdXJyZW50RXZlbnRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcm9vdEV2ZW50ID8gcm9vdEV2ZW50LmlkIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIHZhciB3cmFwcGVkU3Vic2NyaWJlID0gZnVuY3Rpb24gKG9icywgc2luaykge1xuICAgIHZhciB1bnN1YmQgPSBmYWxzZTtcbiAgICB2YXIgc2hvdWxkVW5zdWIgPSBmYWxzZTtcbiAgICB2YXIgZG9VbnN1YiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNob3VsZFVuc3ViID0gdHJ1ZTtcbiAgICAgIHJldHVybiBzaG91bGRVbnN1YjtcbiAgICB9O1xuICAgIHZhciB1bnN1YiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHVuc3ViZCA9IHRydWU7XG4gICAgICByZXR1cm4gZG9VbnN1YigpO1xuICAgIH07XG4gICAgZG9VbnN1YiA9IG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBhZnRlclRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF1bnN1YmQpIHtcbiAgICAgICAgICB2YXIgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuc3ViKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoc2hvdWxkVW5zdWIpIHtcbiAgICAgIGRvVW5zdWIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuc3ViO1xuICB9O1xuXG4gIHZhciBoYXNXYWl0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3YWl0ZXJPYnMubGVuZ3RoID4gMDtcbiAgfTtcblxuICByZXR1cm4geyB3aGVuRG9uZVdpdGg6IHdoZW5Eb25lV2l0aCwgaGFzV2FpdGVyczogaGFzV2FpdGVycywgaW5UcmFuc2FjdGlvbjogaW5UcmFuc2FjdGlvbiwgY3VycmVudEV2ZW50SWQ6IGN1cnJlbnRFdmVudElkLCB3cmFwcGVkU3Vic2NyaWJlOiB3cmFwcGVkU3Vic2NyaWJlLCBhZnRlclRyYW5zYWN0aW9uOiBhZnRlclRyYW5zYWN0aW9uIH07XG59KSgpO1xuXG5mdW5jdGlvbiBTb3VyY2Uob2JzLCBzeW5jKSB7XG4gIHZhciBsYXp5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbMl07XG5cbiAgdGhpcy5vYnMgPSBvYnM7XG4gIHRoaXMuc3luYyA9IHN5bmM7XG4gIHRoaXMubGF6eSA9IGxhenk7XG4gIHRoaXMucXVldWUgPSBbXTtcbn1cblxuZXh0ZW5kKFNvdXJjZS5wcm90b3R5cGUsIHtcbiAgX2lzU291cmNlOiB0cnVlLFxuXG4gIHN1YnNjcmliZTogZnVuY3Rpb24gKHNpbmspIHtcbiAgICByZXR1cm4gdGhpcy5vYnMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub2JzLnRvU3RyaW5nKCk7XG4gIH0sXG4gIG1hcmtFbmRlZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBjb25zdW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IF8uYWx3YXlzKHRoaXMucXVldWVbMF0pIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlWzBdO1xuICAgIH1cbiAgfSxcbiAgcHVzaDogZnVuY3Rpb24gKHgpIHtcbiAgICB0aGlzLnF1ZXVlID0gW3hdO1xuICAgIHJldHVybiBbeF07XG4gIH0sXG4gIG1heUhhdmU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgaGFzQXRMZWFzdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgfSxcbiAgZmxhdHRlbjogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIENvbnN1bWluZ1NvdXJjZSgpIHtcbiAgU291cmNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmluaGVyaXQoQ29uc3VtaW5nU291cmNlLCBTb3VyY2UpO1xuZXh0ZW5kKENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUsIHtcbiAgY29uc3VtZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gIH0sXG4gIHB1c2g6IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUucHVzaCh4KTtcbiAgfSxcbiAgbWF5SGF2ZTogZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gIXRoaXMuZW5kZWQgfHwgdGhpcy5xdWV1ZS5sZW5ndGggPj0gYztcbiAgfSxcbiAgaGFzQXRMZWFzdDogZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGggPj0gYztcbiAgfSxcbiAgZmxhdHRlbjogZmFsc2Vcbn0pO1xuXG5mdW5jdGlvbiBCdWZmZXJpbmdTb3VyY2Uob2JzKSB7XG4gIFNvdXJjZS5jYWxsKHRoaXMsIG9icywgdHJ1ZSk7XG59XG5cbmluaGVyaXQoQnVmZmVyaW5nU291cmNlLCBTb3VyY2UpO1xuZXh0ZW5kKEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUsIHtcbiAgY29uc3VtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLnF1ZXVlO1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBwdXNoOiBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLnB1c2goeC52YWx1ZSgpKTtcbiAgfSxcbiAgaGFzQXRMZWFzdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59KTtcblxuU291cmNlLmlzVHJpZ2dlciA9IGZ1bmN0aW9uIChzKSB7XG4gIGlmIChzICE9IG51bGwgPyBzLl9pc1NvdXJjZSA6IHZvaWQgMCkge1xuICAgIHJldHVybiBzLnN5bmM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHMgIT0gbnVsbCA/IHMuX2lzRXZlbnRTdHJlYW0gOiB2b2lkIDA7XG4gIH1cbn07XG5cblNvdXJjZS5mcm9tT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChzKSB7XG4gIGlmIChzICE9IG51bGwgPyBzLl9pc1NvdXJjZSA6IHZvaWQgMCkge1xuICAgIHJldHVybiBzO1xuICB9IGVsc2UgaWYgKHMgIT0gbnVsbCA/IHMuX2lzUHJvcGVydHkgOiB2b2lkIDApIHtcbiAgICByZXR1cm4gbmV3IFNvdXJjZShzLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBDb25zdW1pbmdTb3VyY2UocywgdHJ1ZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIERlc2MoY29udGV4dCwgbWV0aG9kLCBhcmdzKSB7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLmFyZ3MgPSBhcmdzO1xufVxuXG5leHRlbmQoRGVzYy5wcm90b3R5cGUsIHtcbiAgX2lzRGVzYzogdHJ1ZSxcbiAgZGVwczogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5jYWNoZWQpIHtcbiAgICAgIHRoaXMuY2FjaGVkID0gZmluZERlcHMoW3RoaXMuY29udGV4dF0uY29uY2F0KHRoaXMuYXJncykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWNoZWQ7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF8udG9TdHJpbmcodGhpcy5jb250ZXh0KSArIFwiLlwiICsgXy50b1N0cmluZyh0aGlzLm1ldGhvZCkgKyBcIihcIiArIF8ubWFwKF8udG9TdHJpbmcsIHRoaXMuYXJncykgKyBcIilcIjtcbiAgfVxufSk7XG5cbnZhciBkZXNjcmliZSA9IGZ1bmN0aW9uIChjb250ZXh0LCBtZXRob2QpIHtcbiAgdmFyIHJlZiA9IGNvbnRleHQgfHwgbWV0aG9kO1xuICBpZiAocmVmICYmIHJlZi5faXNEZXNjKSB7XG4gICAgcmV0dXJuIGNvbnRleHQgfHwgbWV0aG9kO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEZXNjKGNvbnRleHQsIG1ldGhvZCwgYXJncyk7XG4gIH1cbn07XG5cbnZhciB3aXRoRGVzYyA9IGZ1bmN0aW9uIChkZXNjLCBvYnMpIHtcbiAgb2JzLmRlc2MgPSBkZXNjO1xuICByZXR1cm4gb2JzO1xufTtcblxudmFyIGZpbmREZXBzID0gZnVuY3Rpb24gKHgpIHtcbiAgaWYgKGlzQXJyYXkoeCkpIHtcbiAgICByZXR1cm4gXy5mbGF0TWFwKGZpbmREZXBzLCB4KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGUoeCkpIHtcbiAgICByZXR1cm4gW3hdO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB4ICE9PSBcInVuZGVmaW5lZFwiICYmIHggIT09IG51bGwgPyB4Ll9pc1NvdXJjZSA6IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbeC5vYnNdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuQmFjb24uRGVzYyA9IERlc2M7XG5CYWNvbi5EZXNjLmVtcHR5ID0gbmV3IEJhY29uLkRlc2MoXCJcIiwgXCJcIiwgW10pO1xuXG52YXIgd2l0aE1ldGhvZENhbGxTdXBwb3J0ID0gZnVuY3Rpb24gKHdyYXBwZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGYgPT09IFwib2JqZWN0XCIgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gZjtcbiAgICAgIHZhciBtZXRob2ROYW1lID0gYXJnc1swXTtcbiAgICAgIGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0W21ldGhvZE5hbWVdLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiB3cmFwcGVkLmFwcGx5KHVuZGVmaW5lZCwgW2ZdLmNvbmNhdChhcmdzKSk7XG4gIH07XG59O1xuXG52YXIgbWFrZUZ1bmN0aW9uQXJncyA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgcmV0dXJuIG1ha2VGdW5jdGlvbl8uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbn07XG5cbnZhciBwYXJ0aWFsbHlBcHBsaWVkID0gZnVuY3Rpb24gKGYsIGFwcGxpZWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgIH1cblxuICAgIHJldHVybiBmLmFwcGx5KHVuZGVmaW5lZCwgYXBwbGllZC5jb25jYXQoYXJncykpO1xuICB9O1xufTtcblxudmFyIHRvU2ltcGxlRXh0cmFjdG9yID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoISh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlID0gdmFsdWVba2V5XTtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWVsZFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH07XG59O1xuXG52YXIgdG9GaWVsZEV4dHJhY3RvciA9IGZ1bmN0aW9uIChmLCBhcmdzKSB7XG4gIHZhciBwYXJ0cyA9IGYuc2xpY2UoMSkuc3BsaXQoXCIuXCIpO1xuICB2YXIgcGFydEZ1bmNzID0gXy5tYXAodG9TaW1wbGVFeHRyYWN0b3IoYXJncyksIHBhcnRzKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBmOyBpIDwgcGFydEZ1bmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmID0gcGFydEZ1bmNzW2ldO1xuICAgICAgdmFsdWUgPSBmKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufTtcblxudmFyIGlzRmllbGRLZXkgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gdHlwZW9mIGYgPT09IFwic3RyaW5nXCIgJiYgZi5sZW5ndGggPiAxICYmIGYuY2hhckF0KDApID09PSBcIi5cIjtcbn07XG5cbnZhciBtYWtlRnVuY3Rpb25fID0gd2l0aE1ldGhvZENhbGxTdXBwb3J0KGZ1bmN0aW9uIChmKSB7XG4gIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICBhcmdzW19rZXk0IC0gMV0gPSBhcmd1bWVudHNbX2tleTRdO1xuICB9XG5cbiAgaWYgKF8uaXNGdW5jdGlvbihmKSkge1xuICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHBhcnRpYWxseUFwcGxpZWQoZiwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ZpZWxkS2V5KGYpKSB7XG4gICAgcmV0dXJuIHRvRmllbGRFeHRyYWN0b3IoZiwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF8uYWx3YXlzKGYpO1xuICB9XG59KTtcblxudmFyIG1ha2VGdW5jdGlvbiA9IGZ1bmN0aW9uIChmLCBhcmdzKSB7XG4gIHJldHVybiBtYWtlRnVuY3Rpb25fLmFwcGx5KHVuZGVmaW5lZCwgW2ZdLmNvbmNhdChhcmdzKSk7XG59O1xuXG52YXIgY29udmVydEFyZ3NUb0Z1bmN0aW9uID0gZnVuY3Rpb24gKG9icywgZiwgYXJncywgbWV0aG9kKSB7XG4gIGlmICh0eXBlb2YgZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBmICE9PSBudWxsID8gZi5faXNQcm9wZXJ0eSA6IHVuZGVmaW5lZCkge1xuICAgIHZhciBzYW1wbGVkID0gZi5zYW1wbGVkQnkob2JzLCBmdW5jdGlvbiAocCwgcykge1xuICAgICAgcmV0dXJuIFtwLCBzXTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWV0aG9kLmNhbGwoc2FtcGxlZCwgZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgIHZhciBwID0gX3JlZlswXTtcbiAgICAgIHZhciBzID0gX3JlZlsxXTtcbiAgICAgIHJldHVybiBwO1xuICAgIH0pLm1hcChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBwID0gX3JlZjJbMF07XG4gICAgICB2YXIgcyA9IF9yZWYyWzFdO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZiA9IG1ha2VGdW5jdGlvbihmLCBhcmdzKTtcbiAgICByZXR1cm4gbWV0aG9kLmNhbGwob2JzLCBmKTtcbiAgfVxufTtcblxudmFyIHRvQ29tYmluYXRvciA9IGZ1bmN0aW9uIChmKSB7XG4gIGlmIChfLmlzRnVuY3Rpb24oZikpIHtcbiAgICByZXR1cm4gZjtcbiAgfSBlbHNlIGlmIChpc0ZpZWxkS2V5KGYpKSB7XG4gICAgdmFyIGtleSA9IHRvRmllbGRLZXkoZik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuICAgICAgcmV0dXJuIGxlZnRba2V5XShyaWdodCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGEgZnVuY3Rpb24gb3IgYSBmaWVsZCBrZXk6IFwiICsgZik7XG4gIH1cbn07XG5cbnZhciB0b0ZpZWxkS2V5ID0gZnVuY3Rpb24gKGYpIHtcbiAgcmV0dXJuIGYuc2xpY2UoMSk7XG59O1xuXG5mdW5jdGlvbiBTb21lKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbn1cblxuZXh0ZW5kKFNvbWUucHJvdG90eXBlLCB7XG4gIF9pc1NvbWU6IHRydWUsXG4gIGdldE9yRWxzZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfSxcbiAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgIGlmIChmKHRoaXMudmFsdWUpKSB7XG4gICAgICByZXR1cm4gbmV3IFNvbWUodGhpcy52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOb25lO1xuICAgIH1cbiAgfSxcbiAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiBuZXcgU29tZShmKHRoaXMudmFsdWUpKTtcbiAgfSxcbiAgZm9yRWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcbiAgfSxcbiAgaXNEZWZpbmVkOiB0cnVlLFxuICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFt0aGlzLnZhbHVlXTtcbiAgfSxcbiAgaW5zcGVjdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIlNvbWUoXCIgKyB0aGlzLnZhbHVlICsgXCIpXCI7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpO1xuICB9XG59KTtcblxudmFyIE5vbmUgPSB7XG4gIF9pc05vbmU6IHRydWUsXG4gIGdldE9yRWxzZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBmaWx0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTm9uZTtcbiAgfSxcbiAgbWFwOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE5vbmU7XG4gIH0sXG4gIGZvckVhY2g6IGZ1bmN0aW9uICgpIHt9LFxuICBpc0RlZmluZWQ6IGZhbHNlLFxuICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBpbnNwZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFwiTm9uZVwiO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmluc3BlY3QoKTtcbiAgfVxufTtcblxudmFyIHRvT3B0aW9uID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCh0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2ICE9PSBudWxsID8gdi5faXNTb21lIDogdW5kZWZpbmVkKSB8fCAodHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCIgJiYgdiAhPT0gbnVsbCA/IHYuX2lzTm9uZSA6IHVuZGVmaW5lZCkpIHtcbiAgICByZXR1cm4gdjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFNvbWUodik7XG4gIH1cbn07XG5cbkJhY29uLm5vTW9yZSA9IFwiPG5vLW1vcmU+XCI7XG5CYWNvbi5tb3JlID0gXCI8bW9yZT5cIjtcblxudmFyIGV2ZW50SWRDb3VudGVyID0gMDtcblxuZnVuY3Rpb24gRXZlbnQoKSB7XG4gIHRoaXMuaWQgPSArK2V2ZW50SWRDb3VudGVyO1xufVxuXG5FdmVudC5wcm90b3R5cGUuX2lzRXZlbnQgPSB0cnVlO1xuRXZlbnQucHJvdG90eXBlLmlzRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbkV2ZW50LnByb3RvdHlwZS5pc0VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcbkV2ZW50LnByb3RvdHlwZS5pc0luaXRpYWwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5FdmVudC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuRXZlbnQucHJvdG90eXBlLmlzRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5FdmVudC5wcm90b3R5cGUuaGFzVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5FdmVudC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5FdmVudC5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbn07XG5FdmVudC5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcblxuZnVuY3Rpb24gTmV4dCh2YWx1ZUYsIGVhZ2VyKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBOZXh0KSkge1xuICAgIHJldHVybiBuZXcgTmV4dCh2YWx1ZUYsIGVhZ2VyKTtcbiAgfVxuXG4gIEV2ZW50LmNhbGwodGhpcyk7XG5cbiAgaWYgKCFlYWdlciAmJiBfLmlzRnVuY3Rpb24odmFsdWVGKSB8fCAodmFsdWVGICE9IG51bGwgPyB2YWx1ZUYuX2lzTmV4dCA6IHZvaWQgMCkpIHtcbiAgICB0aGlzLnZhbHVlRiA9IHZhbHVlRjtcbiAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB2b2lkIDA7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgdGhpcy52YWx1ZUludGVybmFsID0gdmFsdWVGO1xuICB9XG59XG5cbmluaGVyaXQoTmV4dCwgRXZlbnQpO1xuXG5OZXh0LnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbk5leHQucHJvdG90eXBlLmhhc1ZhbHVlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5OZXh0LnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKChyZWYgPSB0aGlzLnZhbHVlRikgIT0gbnVsbCA/IHJlZi5faXNOZXh0IDogdm9pZCAwKSB7XG4gICAgdGhpcy52YWx1ZUludGVybmFsID0gdGhpcy52YWx1ZUYudmFsdWUoKTtcbiAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgfSBlbHNlIGlmICh0aGlzLnZhbHVlRikge1xuICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHRoaXMudmFsdWVGKCk7XG4gICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gIH1cbiAgcmV0dXJuIHRoaXMudmFsdWVJbnRlcm5hbDtcbn07XG5cbk5leHQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbiAoZikge1xuICB2YXIgZXZlbnQsIHZhbHVlO1xuICBpZiAodGhpcy52YWx1ZUludGVybmFsKSB7XG4gICAgdmFsdWUgPSB0aGlzLnZhbHVlSW50ZXJuYWw7XG4gICAgcmV0dXJuIHRoaXMuYXBwbHkoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGYodmFsdWUpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50ID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5hcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZihldmVudC52YWx1ZSgpKTtcbiAgICB9KTtcbiAgfVxufTtcblxuTmV4dC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBOZXh0KHZhbHVlKTtcbn07XG5OZXh0LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gZih0aGlzLnZhbHVlKCkpO1xufTtcbk5leHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gXy50b1N0cmluZyh0aGlzLnZhbHVlKCkpO1xufTtcbk5leHQucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudmFsdWUoKTtcbn07XG5OZXh0LnByb3RvdHlwZS5faXNOZXh0ID0gdHJ1ZTtcblxuZnVuY3Rpb24gSW5pdGlhbCh2YWx1ZUYsIGVhZ2VyKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBJbml0aWFsKSkge1xuICAgIHJldHVybiBuZXcgSW5pdGlhbCh2YWx1ZUYsIGVhZ2VyKTtcbiAgfVxuICBOZXh0LmNhbGwodGhpcywgdmFsdWVGLCBlYWdlcik7XG59XG5cbmluaGVyaXQoSW5pdGlhbCwgTmV4dCk7XG5Jbml0aWFsLnByb3RvdHlwZS5faXNJbml0aWFsID0gdHJ1ZTtcbkluaXRpYWwucHJvdG90eXBlLmlzSW5pdGlhbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuSW5pdGlhbC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuSW5pdGlhbC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlKTtcbn07XG5Jbml0aWFsLnByb3RvdHlwZS50b05leHQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgTmV4dCh0aGlzKTtcbn07XG5cbmZ1bmN0aW9uIEVuZCgpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEVuZCkpIHtcbiAgICByZXR1cm4gbmV3IEVuZCgpO1xuICB9XG4gIEV2ZW50LmNhbGwodGhpcyk7XG59XG5cbmluaGVyaXQoRW5kLCBFdmVudCk7XG5FbmQucHJvdG90eXBlLmlzRW5kID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5FbmQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbkVuZC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbkVuZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBcIjxlbmQ+XCI7XG59O1xuXG5mdW5jdGlvbiBFcnJvcihlcnJvcikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbiAgdGhpcy5lcnJvciA9IGVycm9yO1xuICBFdmVudC5jYWxsKHRoaXMpO1xufVxuXG5pbmhlcml0KEVycm9yLCBFdmVudCk7XG5FcnJvci5wcm90b3R5cGUuaXNFcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuRXJyb3IucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbkVycm9yLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gXCI8ZXJyb3I+IFwiICsgXy50b1N0cmluZyh0aGlzLmVycm9yKTtcbn07XG5cbkJhY29uLkV2ZW50ID0gRXZlbnQ7XG5CYWNvbi5Jbml0aWFsID0gSW5pdGlhbDtcbkJhY29uLk5leHQgPSBOZXh0O1xuQmFjb24uRW5kID0gRW5kO1xuQmFjb24uRXJyb3IgPSBFcnJvcjtcblxudmFyIGluaXRpYWxFdmVudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gbmV3IEluaXRpYWwodmFsdWUsIHRydWUpO1xufTtcbnZhciBuZXh0RXZlbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBOZXh0KHZhbHVlLCB0cnVlKTtcbn07XG52YXIgZW5kRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBuZXcgRW5kKCk7XG59O1xudmFyIHRvRXZlbnQgPSBmdW5jdGlvbiAoeCkge1xuICBpZiAoeCAmJiB4Ll9pc0V2ZW50KSB7XG4gICAgcmV0dXJuIHg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5leHRFdmVudCh4KTtcbiAgfVxufTtcblxudmFyIGlkQ291bnRlciA9IDA7XG52YXIgcmVnaXN0ZXJPYnMgPSBmdW5jdGlvbiAoKSB7fTtcblxuZnVuY3Rpb24gT2JzZXJ2YWJsZShkZXNjKSB7XG4gIHRoaXMuZGVzYyA9IGRlc2M7XG4gIHRoaXMuaWQgPSArK2lkQ291bnRlcjtcbiAgdGhpcy5pbml0aWFsRGVzYyA9IHRoaXMuZGVzYztcbn1cblxuZXh0ZW5kKE9ic2VydmFibGUucHJvdG90eXBlLCB7XG4gIF9pc09ic2VydmFibGU6IHRydWUsXG5cbiAgc3Vic2NyaWJlOiBmdW5jdGlvbiAoc2luaykge1xuICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLndyYXBwZWRTdWJzY3JpYmUodGhpcywgc2luayk7XG4gIH0sXG5cbiAgc3Vic2NyaWJlSW50ZXJuYWw6IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gIH0sXG5cbiAgb25WYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybiBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIG9uVmFsdWVzOiBmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiB0aGlzLm9uVmFsdWUoZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgIHJldHVybiBmLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSk7XG4gIH0sXG5cbiAgb25FcnJvcjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgcmV0dXJuIGYoZXZlbnQuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIG9uRW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBuYW1lOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHdpdGhEZXNjcmlwdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGVzYyA9IGRlc2NyaWJlLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZGVzYy50b1N0cmluZygpO1xuICAgIH1cbiAgfSxcblxuICBpbnRlcm5hbERlcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsRGVzYy5kZXBzKCk7XG4gIH1cbn0pO1xuXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5hc3NpZ24gPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlO1xuT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9yRWFjaCA9IE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWU7XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5pbnNwZWN0ID0gT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmc7XG5cbkJhY29uLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuXG5mdW5jdGlvbiBDb21wb3NpdGVVbnN1YnNjcmliZSgpIHtcbiAgdmFyIHNzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gW10gOiBhcmd1bWVudHNbMF07XG5cbiAgdGhpcy51bnN1YnNjcmliZSA9IF8uYmluZCh0aGlzLnVuc3Vic2NyaWJlLCB0aGlzKTtcbiAgdGhpcy51bnN1YnNjcmliZWQgPSBmYWxzZTtcbiAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIHM7IGkgPCBzcy5sZW5ndGg7IGkrKykge1xuICAgIHMgPSBzc1tpXTtcbiAgICB0aGlzLmFkZChzKTtcbiAgfVxufVxuXG5leHRlbmQoQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLCB7XG4gIGFkZDogZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbmRlZCA9IGZhbHNlO1xuICAgIHZhciB1bnN1YiA9IG5vcDtcbiAgICB0aGlzLnN0YXJ0aW5nLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICB2YXIgdW5zdWJNZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdGhpczIudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVuZGVkID0gdHJ1ZTtcbiAgICAgIF90aGlzMi5yZW1vdmUodW5zdWIpO1xuICAgICAgcmV0dXJuIF8ucmVtb3ZlKHN1YnNjcmlwdGlvbiwgX3RoaXMyLnN0YXJ0aW5nKTtcbiAgICB9O1xuICAgIHVuc3ViID0gc3Vic2NyaXB0aW9uKHRoaXMudW5zdWJzY3JpYmUsIHVuc3ViTWUpO1xuICAgIGlmICghKHRoaXMudW5zdWJzY3JpYmVkIHx8IGVuZGVkKSkge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godW5zdWIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bnN1YigpO1xuICAgIH1cbiAgICBfLnJlbW92ZShzdWJzY3JpcHRpb24sIHRoaXMuc3RhcnRpbmcpO1xuICAgIHJldHVybiB1bnN1YjtcbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uICh1bnN1Yikge1xuICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoXy5yZW1vdmUodW5zdWIsIHRoaXMuc3Vic2NyaXB0aW9ucykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuc3ViKCk7XG4gICAgfVxuICB9LFxuXG4gIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICB2YXIgaXRlcmFibGUgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmFibGVbaV0oKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgdGhpcy5zdGFydGluZyA9IFtdO1xuICAgIHJldHVybiBbXTtcbiAgfSxcblxuICBjb3VudDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoICsgdGhpcy5zdGFydGluZy5sZW5ndGg7XG4gIH0sXG5cbiAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudCgpID09PSAwO1xuICB9XG59KTtcblxuQmFjb24uQ29tcG9zaXRlVW5zdWJzY3JpYmUgPSBDb21wb3NpdGVVbnN1YnNjcmliZTtcblxuZnVuY3Rpb24gRGlzcGF0Y2hlcihfc3Vic2NyaWJlLCBfaGFuZGxlRXZlbnQpIHtcbiAgdGhpcy5fc3Vic2NyaWJlID0gX3N1YnNjcmliZTtcbiAgdGhpcy5faGFuZGxlRXZlbnQgPSBfaGFuZGxlRXZlbnQ7XG4gIHRoaXMuc3Vic2NyaWJlID0gXy5iaW5kKHRoaXMuc3Vic2NyaWJlLCB0aGlzKTtcbiAgdGhpcy5oYW5kbGVFdmVudCA9IF8uYmluZCh0aGlzLmhhbmRsZUV2ZW50LCB0aGlzKTtcbiAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgdGhpcy5wcmV2RXJyb3IgPSB1bmRlZmluZWQ7XG4gIHRoaXMudW5zdWJTcmMgPSB1bmRlZmluZWQ7XG4gIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICB0aGlzLnF1ZXVlID0gW107XG59XG5cbkRpc3BhdGNoZXIucHJvdG90eXBlLmhhc1N1YnNjcmliZXJzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCA+IDA7XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7XG4gIHRoaXMuc3Vic2NyaXB0aW9ucyA9IF8ud2l0aG91dChzdWJzY3JpcHRpb24sIHRoaXMuc3Vic2NyaXB0aW9ucyk7XG4gIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnM7XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbihldmVudCwgdGhpcywgdGhpcy5wdXNoSXQsIFtldmVudF0pO1xufTtcblxuRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaFRvU3Vic2NyaXB0aW9ucyA9IGZ1bmN0aW9uIChldmVudCkge1xuICB0cnkge1xuICAgIHZhciB0bXAgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgdmFyIGxlbiA9IHRtcC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIHN1YiA9IHRtcFtpXTtcbiAgICAgIHZhciByZXBseSA9IHN1Yi5zaW5rKGV2ZW50KTtcbiAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlIHx8IGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVTdWIoc3ViKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoSXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLnB1c2hpbmcpIHtcbiAgICBpZiAoZXZlbnQgPT09IHRoaXMucHJldkVycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgIHRoaXMucHJldkVycm9yID0gZXZlbnQ7XG4gICAgfVxuICAgIHRoaXMucHVzaGluZyA9IHRydWU7XG4gICAgdGhpcy5wdXNoVG9TdWJzY3JpcHRpb25zKGV2ZW50KTtcbiAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICB3aGlsZSAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGV2ZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaGFzU3Vic2NyaWJlcnMoKSkge1xuICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tU291cmNlKCk7XG4gICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goZXZlbnQpO1xuICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICB9XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAodGhpcy5faGFuZGxlRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRXZlbnQoZXZlbnQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICB9XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS51bnN1YnNjcmliZUZyb21Tb3VyY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnVuc3ViU3JjKSB7XG4gICAgdGhpcy51bnN1YlNyYygpO1xuICB9XG4gIHRoaXMudW5zdWJTcmMgPSB1bmRlZmluZWQ7XG59O1xuXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICB2YXIgc3Vic2NyaXB0aW9uO1xuICBpZiAodGhpcy5lbmRlZCkge1xuICAgIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgcmV0dXJuIG5vcDtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnRGdW5jdGlvbihzaW5rKTtcbiAgICBzdWJzY3JpcHRpb24gPSB7XG4gICAgICBzaW5rOiBzaW5rXG4gICAgfTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLnVuc3ViU3JjID0gdGhpcy5fc3Vic2NyaWJlKHRoaXMuaGFuZGxlRXZlbnQpO1xuICAgICAgYXNzZXJ0RnVuY3Rpb24odGhpcy51bnN1YlNyYyk7XG4gICAgfVxuICAgIHJldHVybiAoZnVuY3Rpb24gKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5yZW1vdmVTdWIoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKCFfdGhpcy5oYXNTdWJzY3JpYmVycygpKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnVuc3Vic2NyaWJlRnJvbVNvdXJjZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKHRoaXMpO1xuICB9XG59O1xuXG5CYWNvbi5EaXNwYXRjaGVyID0gRGlzcGF0Y2hlcjtcblxuZnVuY3Rpb24gRXZlbnRTdHJlYW0oZGVzYywgc3Vic2NyaWJlLCBoYW5kbGVyKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFdmVudFN0cmVhbSkpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcik7XG4gIH1cbiAgaWYgKF8uaXNGdW5jdGlvbihkZXNjKSkge1xuICAgIGhhbmRsZXIgPSBzdWJzY3JpYmU7XG4gICAgc3Vic2NyaWJlID0gZGVzYztcbiAgICBkZXNjID0gRGVzYy5lbXB0eTtcbiAgfVxuICBPYnNlcnZhYmxlLmNhbGwodGhpcywgZGVzYyk7XG4gIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKHN1YnNjcmliZSwgaGFuZGxlcik7XG4gIHJlZ2lzdGVyT2JzKHRoaXMpO1xufVxuXG5pbmhlcml0KEV2ZW50U3RyZWFtLCBPYnNlcnZhYmxlKTtcbmV4dGVuZChFdmVudFN0cmVhbS5wcm90b3R5cGUsIHtcbiAgX2lzRXZlbnRTdHJlYW06IHRydWUsXG5cbiAgdG9Qcm9wZXJ0eTogZnVuY3Rpb24gKGluaXRWYWx1ZV8pIHtcbiAgICB2YXIgaW5pdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCA/IE5vbmUgOiB0b09wdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaW5pdFZhbHVlXztcbiAgICB9KTtcbiAgICB2YXIgZGlzcCA9IHRoaXMuZGlzcGF0Y2hlcjtcbiAgICB2YXIgZGVzYyA9IG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwidG9Qcm9wZXJ0eVwiLCBbaW5pdFZhbHVlX10pO1xuICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzYywgZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgIHZhciBpbml0U2VudCA9IGZhbHNlO1xuICAgICAgdmFyIHN1YmJlZCA9IGZhbHNlO1xuICAgICAgdmFyIHVuc3ViID0gbm9wO1xuICAgICAgdmFyIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgIHZhciBzZW5kSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpbml0U2VudCkge1xuICAgICAgICAgIHJldHVybiBpbml0VmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcGx5ID0gc2luayhuZXcgSW5pdGlhbCh2YWx1ZSkpO1xuICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgIHJldHVybiBub3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHVuc3ViID0gZGlzcC5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzSW5pdGlhbCgpICYmICFzdWJiZWQpIHtcbiAgICAgICAgICAgIGluaXRWYWx1ZSA9IG5ldyBTb21lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnZhbHVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICBpbml0VmFsdWUgPSBuZXcgU29tZShldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICByZXBseSA9IHNlbmRJbml0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN1YmJlZCA9IHRydWU7XG4gICAgICBzZW5kSW5pdCgpO1xuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH0pO1xuICB9LFxuXG4gIHRvRXZlbnRTdHJlYW06IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB3aXRoSGFuZGxlcjogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwid2l0aEhhbmRsZXJcIiwgW2hhbmRsZXJdKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gIH1cbn0pO1xuXG5CYWNvbi5FdmVudFN0cmVhbSA9IEV2ZW50U3RyZWFtO1xuXG5CYWNvbi5uZXZlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJuZXZlclwiKSwgZnVuY3Rpb24gKHNpbmspIHtcbiAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgIHJldHVybiBub3A7XG4gIH0pO1xufTtcblxuQmFjb24ud2hlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgfVxuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIHVzYWdlID0gXCJ3aGVuOiBleHBlY3RpbmcgYXJndW1lbnRzIGluIHRoZSBmb3JtIChPYnNlcnZhYmxlKyxmdW5jdGlvbikrXCI7XG5cbiAgYXNzZXJ0KHVzYWdlLCBsZW4gJSAyID09PSAwKTtcbiAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgdmFyIHBhdHMgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcGF0dGVybnMgPSBbXTtcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBwYXR0ZXJuc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICBwYXR0ZXJuc1tpICsgMV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgIHZhciBwYXRTb3VyY2VzID0gXy50b0FycmF5KGFyZ3VtZW50c1tpXSk7XG4gICAgdmFyIGYgPSBjb25zdGFudFRvRnVuY3Rpb24oYXJndW1lbnRzW2kgKyAxXSk7XG4gICAgdmFyIHBhdCA9IHsgZjogZiwgaXhzOiBbXSB9O1xuICAgIHZhciB0cmlnZ2VyRm91bmQgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBqID0gMCwgczsgaiA8IHBhdFNvdXJjZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIHMgPSBwYXRTb3VyY2VzW2pdO1xuICAgICAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHNvdXJjZXMsIHMpO1xuICAgICAgaWYgKCF0cmlnZ2VyRm91bmQpIHtcbiAgICAgICAgdHJpZ2dlckZvdW5kID0gU291cmNlLmlzVHJpZ2dlcihzKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgc291cmNlcy5wdXNoKHMpO1xuICAgICAgICBpbmRleCA9IHNvdXJjZXMubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwLCBpeDsgayA8IHBhdC5peHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgaXggPSBwYXQuaXhzW2tdO1xuICAgICAgICBpZiAoaXguaW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgaXguY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGF0Lml4cy5wdXNoKHsgaW5kZXg6IGluZGV4LCBjb3VudDogMSB9KTtcbiAgICB9XG5cbiAgICBhc3NlcnQoXCJBdCBsZWFzdCBvbmUgRXZlbnRTdHJlYW0gcmVxdWlyZWRcIiwgdHJpZ2dlckZvdW5kIHx8ICFwYXRTb3VyY2VzLmxlbmd0aCk7XG5cbiAgICBpZiAocGF0U291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICBwYXRzLnB1c2gocGF0KTtcbiAgICB9XG4gICAgaSA9IGkgKyAyO1xuICB9XG5cbiAgaWYgKCFzb3VyY2VzLmxlbmd0aCkge1xuICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICB9XG5cbiAgc291cmNlcyA9IF8ubWFwKFNvdXJjZS5mcm9tT2JzZXJ2YWJsZSwgc291cmNlcyk7XG4gIHZhciBuZWVkc0JhcnJpZXIgPSBfLmFueShzb3VyY2VzLCBmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLmZsYXR0ZW47XG4gIH0pICYmIGNvbnRhaW5zRHVwbGljYXRlRGVwcyhfLm1hcChmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLm9icztcbiAgfSwgc291cmNlcykpO1xuXG4gIHZhciBkZXNjID0gbmV3IEJhY29uLkRlc2MoQmFjb24sIFwid2hlblwiLCBwYXR0ZXJucyk7XG4gIHZhciByZXN1bHRTdHJlYW0gPSBuZXcgRXZlbnRTdHJlYW0oZGVzYywgZnVuY3Rpb24gKHNpbmspIHtcbiAgICB2YXIgdHJpZ2dlcnMgPSBbXTtcbiAgICB2YXIgZW5kcyA9IGZhbHNlO1xuICAgIHZhciBtYXRjaCA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICBmb3IgKHZhciBpMSA9IDAsIGk7IGkxIDwgcC5peHMubGVuZ3RoOyBpMSsrKSB7XG4gICAgICAgIGkgPSBwLml4c1tpMV07XG4gICAgICAgIGlmICghc291cmNlc1tpLmluZGV4XS5oYXNBdExlYXN0KGkuY291bnQpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHZhciBjYW5ub3RTeW5jID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICFzb3VyY2Uuc3luYyB8fCBzb3VyY2UuZW5kZWQ7XG4gICAgfTtcbiAgICB2YXIgY2Fubm90TWF0Y2ggPSBmdW5jdGlvbiAocCkge1xuICAgICAgZm9yICh2YXIgaTEgPSAwLCBpOyBpMSA8IHAuaXhzLmxlbmd0aDsgaTErKykge1xuICAgICAgICBpID0gcC5peHNbaTFdO1xuICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0ubWF5SGF2ZShpLmNvdW50KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbm9uRmxhdHRlbmVkID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiAhdHJpZ2dlci5zb3VyY2UuZmxhdHRlbjtcbiAgICB9O1xuICAgIHZhciBwYXJ0ID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh1bnN1YkFsbCkge1xuICAgICAgICB2YXIgZmx1c2hMYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0U3RyZWFtLCBmbHVzaCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBmbHVzaFdoaWxlVHJpZ2dlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9IHRyaWdnZXJzLnBvcCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaTEgPSAwLCBwOyBpMSA8IHBhdHMubGVuZ3RoOyBpMSsrKSB7XG4gICAgICAgICAgICAgIHAgPSBwYXRzW2kxXTtcbiAgICAgICAgICAgICAgaWYgKG1hdGNoKHApKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpMiA9IDAsIGk7IGkyIDwgcC5peHMubGVuZ3RoOyBpMisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBwLml4c1tpMl07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNvdXJjZXNbaS5pbmRleF0uY29uc3VtZSgpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICByZXBseSA9IHNpbmsodHJpZ2dlci5lLmFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcDtcblxuICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaTIgPSAwLCBldmVudDsgaTIgPCBldmVudHMubGVuZ3RoOyBpMisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbaTJdO1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKF9wID0gcCkuZi5hcHBseShfcCwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgdHJpZ2dlcnMgPSBfLmZpbHRlcihub25GbGF0dGVuZWQsIHRyaWdnZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsdXNoV2hpbGVUcmlnZ2VycygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcmVwbHkgPSBmbHVzaFdoaWxlVHJpZ2dlcnMoKTtcbiAgICAgICAgICBpZiAoZW5kcykge1xuICAgICAgICAgICAgaWYgKF8uYWxsKHNvdXJjZXMsIGNhbm5vdFN5bmMpIHx8IF8uYWxsKHBhdHMsIGNhbm5vdE1hdGNoKSkge1xuICAgICAgICAgICAgICByZXBseSA9IEJhY29uLm5vTW9yZTtcbiAgICAgICAgICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChlLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIGVuZHMgPSB0cnVlO1xuICAgICAgICAgICAgc291cmNlLm1hcmtFbmRlZCgpO1xuICAgICAgICAgICAgZmx1c2hMYXRlcigpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgIHZhciByZXBseSA9IHNpbmsoZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZS5wdXNoKGUpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5zeW5jKSB7XG4gICAgICAgICAgICAgIHRyaWdnZXJzLnB1c2goeyBzb3VyY2U6IHNvdXJjZSwgZTogZSB9KTtcbiAgICAgICAgICAgICAgaWYgKG5lZWRzQmFycmllciB8fCBVcGRhdGVCYXJyaWVyLmhhc1dhaXRlcnMoKSkge1xuICAgICAgICAgICAgICAgIGZsdXNoTGF0ZXIoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVwbHkgfHwgQmFjb24ubW9yZTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlKChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKHZhciBpMSA9IDAsIHM7IGkxIDwgc291cmNlcy5sZW5ndGg7IGkxKyspIHtcbiAgICAgICAgcyA9IHNvdXJjZXNbaTFdO1xuICAgICAgICByZXN1bHQucHVzaChwYXJ0KHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkoKSkudW5zdWJzY3JpYmU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0U3RyZWFtO1xufTtcblxudmFyIGNvbnRhaW5zRHVwbGljYXRlRGVwcyA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlcykge1xuICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1sxXTtcblxuICB2YXIgY2hlY2tPYnNlcnZhYmxlID0gZnVuY3Rpb24gKG9icykge1xuICAgIGlmIChfLmNvbnRhaW5zKHN0YXRlLCBvYnMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRlcHMgPSBvYnMuaW50ZXJuYWxEZXBzKCk7XG4gICAgICBpZiAoZGVwcy5sZW5ndGgpIHtcbiAgICAgICAgc3RhdGUucHVzaChvYnMpO1xuICAgICAgICByZXR1cm4gXy5hbnkoZGVwcywgY2hlY2tPYnNlcnZhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnB1c2gob2JzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gXy5hbnkob2JzZXJ2YWJsZXMsIGNoZWNrT2JzZXJ2YWJsZSk7XG59O1xuXG52YXIgY29uc3RhbnRUb0Z1bmN0aW9uID0gZnVuY3Rpb24gKGYpIHtcbiAgaWYgKF8uaXNGdW5jdGlvbihmKSkge1xuICAgIHJldHVybiBmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfLmFsd2F5cyhmKTtcbiAgfVxufTtcblxuQmFjb24uZ3JvdXBTaW11bHRhbmVvdXMgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgc3RyZWFtcyA9IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgc3RyZWFtc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICB9XG5cbiAgaWYgKHN0cmVhbXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgfVxuICB2YXIgc291cmNlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBzOyBpIDwgc3RyZWFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgcyA9IHN0cmVhbXNbaV07XG4gICAgICByZXN1bHQucHVzaChuZXcgQnVmZmVyaW5nU291cmNlKHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSkoKTtcbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImdyb3VwU2ltdWx0YW5lb3VzXCIsIHN0cmVhbXMpLCBCYWNvbi53aGVuKHNvdXJjZXMsIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIHhzID0gQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICAgIHhzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gICAgfVxuXG4gICAgcmV0dXJuIHhzO1xuICB9KSk7XG59O1xuXG5mdW5jdGlvbiBQcm9wZXJ0eURpc3BhdGNoZXIocHJvcGVydHksIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpIHtcbiAgRGlzcGF0Y2hlci5jYWxsKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpO1xuICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG4gIHRoaXMuc3Vic2NyaWJlID0gXy5iaW5kKHRoaXMuc3Vic2NyaWJlLCB0aGlzKTtcbiAgdGhpcy5jdXJyZW50ID0gTm9uZTtcbiAgdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPSB1bmRlZmluZWQ7XG4gIHRoaXMucHJvcGVydHlFbmRlZCA9IGZhbHNlO1xufVxuXG5pbmhlcml0KFByb3BlcnR5RGlzcGF0Y2hlciwgRGlzcGF0Y2hlcik7XG5leHRlbmQoUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZSwge1xuICBwdXNoOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgdGhpcy5wcm9wZXJ0eUVuZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IG5ldyBTb21lKGV2ZW50KTtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gVXBkYXRlQmFycmllci5jdXJyZW50RXZlbnRJZCgpO1xuICAgIH1cbiAgICByZXR1cm4gRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgfSxcblxuICBtYXliZVN1YlNvdXJjZTogZnVuY3Rpb24gKHNpbmssIHJlcGx5KSB7XG4gICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BlcnR5RW5kZWQpIHtcbiAgICAgIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gRGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlLmNhbGwodGhpcywgc2luayk7XG4gICAgfVxuICB9LFxuXG4gIHN1YnNjcmliZTogZnVuY3Rpb24gKHNpbmspIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciBpbml0U2VudCA9IGZhbHNlO1xuXG4gICAgdmFyIHJlcGx5ID0gQmFjb24ubW9yZTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnQuaXNEZWZpbmVkICYmICh0aGlzLmhhc1N1YnNjcmliZXJzKCkgfHwgdGhpcy5wcm9wZXJ0eUVuZGVkKSkge1xuICAgICAgdmFyIGRpc3BhdGNoaW5nSWQgPSBVcGRhdGVCYXJyaWVyLmN1cnJlbnRFdmVudElkKCk7XG4gICAgICB2YXIgdmFsSWQgPSB0aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZDtcbiAgICAgIGlmICghdGhpcy5wcm9wZXJ0eUVuZGVkICYmIHZhbElkICYmIGRpc3BhdGNoaW5nSWQgJiYgZGlzcGF0Y2hpbmdJZCAhPT0gdmFsSWQpIHtcbiAgICAgICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgodGhpcy5wcm9wZXJ0eSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChfdGhpczMuY3VycmVudFZhbHVlUm9vdElkID09PSB2YWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbmsoaW5pdGlhbEV2ZW50KF90aGlzMy5jdXJyZW50LmdldCgpLnZhbHVlKCkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbih1bmRlZmluZWQsIHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXBseSA9IHNpbmsoaW5pdGlhbEV2ZW50KHRoaXMuY3VycmVudC5nZXQoKS52YWx1ZSgpKSk7XG4gICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubWF5YmVTdWJTb3VyY2Uoc2luaywgcmVwbHkpO1xuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIFByb3BlcnR5KGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICBPYnNlcnZhYmxlLmNhbGwodGhpcywgZGVzYyk7XG4gIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBQcm9wZXJ0eURpc3BhdGNoZXIodGhpcywgc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgcmVnaXN0ZXJPYnModGhpcyk7XG59XG5cbmluaGVyaXQoUHJvcGVydHksIE9ic2VydmFibGUpO1xuZXh0ZW5kKFByb3BlcnR5LnByb3RvdHlwZSwge1xuICBfaXNQcm9wZXJ0eTogdHJ1ZSxcblxuICBjaGFuZ2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiY2hhbmdlc1wiLCBbXSksIGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICByZXR1cm4gX3RoaXM0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICB3aXRoSGFuZGxlcjogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5KG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwid2l0aEhhbmRsZXJcIiwgW2hhbmRsZXJdKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gIH0sXG5cbiAgdG9Qcm9wZXJ0eTogZnVuY3Rpb24gKCkge1xuICAgIGFzc2VydE5vQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgdG9FdmVudFN0cmVhbTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyh0aGlzLCBcInRvRXZlbnRTdHJlYW1cIiwgW10pLCBmdW5jdGlvbiAoc2luaykge1xuICAgICAgcmV0dXJuIF90aGlzNS5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufSk7XG5cbkJhY29uLlByb3BlcnR5ID0gUHJvcGVydHk7XG5cbkJhY29uLmNvbnN0YW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBuZXcgUHJvcGVydHkobmV3IEJhY29uLkRlc2MoQmFjb24sIFwiY29uc3RhbnRcIiwgW3ZhbHVlXSksIGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgc2luayhpbml0aWFsRXZlbnQodmFsdWUpKTtcbiAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgIHJldHVybiBub3A7XG4gIH0pO1xufTtcblxuQmFjb24uZnJvbUJpbmRlciA9IGZ1bmN0aW9uIChiaW5kZXIpIHtcbiAgdmFyIGV2ZW50VHJhbnNmb3JtZXIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBfLmlkIDogYXJndW1lbnRzWzFdO1xuXG4gIHZhciBkZXNjID0gbmV3IEJhY29uLkRlc2MoQmFjb24sIFwiZnJvbUJpbmRlclwiLCBbYmluZGVyLCBldmVudFRyYW5zZm9ybWVyXSk7XG4gIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzYywgZnVuY3Rpb24gKHNpbmspIHtcbiAgICB2YXIgdW5ib3VuZCA9IGZhbHNlO1xuICAgIHZhciBzaG91bGRVbmJpbmQgPSBmYWxzZTtcbiAgICB2YXIgdW5iaW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF1bmJvdW5kKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdW5iaW5kZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdW5iaW5kZXIgIT09IG51bGwpIHtcbiAgICAgICAgICB1bmJpbmRlcigpO1xuICAgICAgICAgIHJldHVybiB1bmJvdW5kID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gc2hvdWxkVW5iaW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVuYmluZGVyID0gYmluZGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWY7XG5cbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW43KSwgX2tleTcgPSAwOyBfa2V5NyA8IF9sZW43OyBfa2V5NysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTddID0gYXJndW1lbnRzW19rZXk3XTtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlID0gZXZlbnRUcmFuc2Zvcm1lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIGlmICghKGlzQXJyYXkodmFsdWUpICYmICgocmVmID0gXy5sYXN0KHZhbHVlKSkgIT0gbnVsbCA/IHJlZi5faXNFdmVudCA6IHVuZGVmaW5lZCkpKSB7XG4gICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgIH1cbiAgICAgIHZhciByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICBmb3IgKHZhciBpID0gMCwgZXZlbnQ7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBldmVudCA9IHZhbHVlW2ldO1xuICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQgPSB0b0V2ZW50KGV2ZW50KSk7XG4gICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlIHx8IGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICB1bmJpbmQoKTtcbiAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBseTtcbiAgICB9KTtcbiAgICBpZiAoc2hvdWxkVW5iaW5kKSB7XG4gICAgICB1bmJpbmQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuYmluZDtcbiAgfSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAocCkge1xuICBmb3IgKHZhciBfbGVuOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuOCA+IDEgPyBfbGVuOCAtIDEgOiAwKSwgX2tleTggPSAxOyBfa2V5OCA8IF9sZW44OyBfa2V5OCsrKSB7XG4gICAgYXJnc1tfa2V5OCAtIDFdID0gYXJndW1lbnRzW19rZXk4XTtcbiAgfVxuXG4gIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgcCwgYXJncywgZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJtYXBcIiwgW2ZdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQuZm1hcChmKSk7XG4gICAgfSkpO1xuICB9KTtcbn07XG5cbnZhciBhcmd1bWVudHNUb09ic2VydmFibGVzID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgaWYgKGlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICByZXR1cm4gYXJnc1swXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gIH1cbn07XG5cbnZhciBhcmd1bWVudHNUb09ic2VydmFibGVzQW5kRnVuY3Rpb24gPSBmdW5jdGlvbiAoYXJncykge1xuICBpZiAoXy5pc0Z1bmN0aW9uKGFyZ3NbMF0pKSB7XG4gICAgcmV0dXJuIFthcmd1bWVudHNUb09ic2VydmFibGVzKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDEpKSwgYXJnc1swXV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFthcmd1bWVudHNUb09ic2VydmFibGVzKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDAsIGFyZ3MubGVuZ3RoIC0gMSkpLCBfLmxhc3QoYXJncyldO1xuICB9XG59O1xuXG5CYWNvbi5jb21iaW5lQXNBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0cmVhbXMgPSBhcmd1bWVudHNUb09ic2VydmFibGVzKGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIGluZGV4ID0gMCwgc3RyZWFtOyBpbmRleCA8IHN0cmVhbXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgc3RyZWFtID0gc3RyZWFtc1tpbmRleF07XG4gICAgaWYgKCFpc09ic2VydmFibGUoc3RyZWFtKSkge1xuICAgICAgc3RyZWFtc1tpbmRleF0gPSBCYWNvbi5jb25zdGFudChzdHJlYW0pO1xuICAgIH1cbiAgfVxuICBpZiAoc3RyZWFtcy5sZW5ndGgpIHtcbiAgICB2YXIgc291cmNlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgczsgaSA8IHN0cmVhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcyA9IHN0cmVhbXNbaV07XG4gICAgICAgIHJlc3VsdC5wdXNoKG5ldyBTb3VyY2UocywgdHJ1ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KSgpO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJjb21iaW5lQXNBcnJheVwiLCBzdHJlYW1zKSwgQmFjb24ud2hlbihzb3VyY2VzLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuOSA9IGFyZ3VtZW50cy5sZW5ndGgsIHhzID0gQXJyYXkoX2xlbjkpLCBfa2V5OSA9IDA7IF9rZXk5IDwgX2xlbjk7IF9rZXk5KyspIHtcbiAgICAgICAgeHNbX2tleTldID0gYXJndW1lbnRzW19rZXk5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHhzO1xuICAgIH0pLnRvUHJvcGVydHkoKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEJhY29uLmNvbnN0YW50KFtdKTtcbiAgfVxufTtcblxuQmFjb24ub25WYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4xMCA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0cmVhbXMgPSBBcnJheShfbGVuMTApLCBfa2V5MTAgPSAwOyBfa2V5MTAgPCBfbGVuMTA7IF9rZXkxMCsrKSB7XG4gICAgc3RyZWFtc1tfa2V5MTBdID0gYXJndW1lbnRzW19rZXkxMF07XG4gIH1cblxuICByZXR1cm4gQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcy5zbGljZSgwLCBzdHJlYW1zLmxlbmd0aCAtIDEpKS5vblZhbHVlcyhzdHJlYW1zW3N0cmVhbXMubGVuZ3RoIC0gMV0pO1xufTtcblxuQmFjb24uY29tYmluZVdpdGggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfYXJndW1lbnRzVG9PYnNlcnZhYmxlc0FuZEZ1bmN0aW9uID0gYXJndW1lbnRzVG9PYnNlcnZhYmxlc0FuZEZ1bmN0aW9uKGFyZ3VtZW50cyk7XG5cbiAgdmFyIHN0cmVhbXMgPSBfYXJndW1lbnRzVG9PYnNlcnZhYmxlc0FuZEZ1bmN0aW9uWzBdO1xuICB2YXIgZiA9IF9hcmd1bWVudHNUb09ic2VydmFibGVzQW5kRnVuY3Rpb25bMV07XG5cbiAgdmFyIGRlc2MgPSBuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJjb21iaW5lV2l0aFwiLCBbZl0uY29uY2F0KHN0cmVhbXMpKTtcbiAgcmV0dXJuIHdpdGhEZXNjKGRlc2MsIEJhY29uLmNvbWJpbmVBc0FycmF5KHN0cmVhbXMpLm1hcChmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgcmV0dXJuIGYuYXBwbHkodW5kZWZpbmVkLCB2YWx1ZXMpO1xuICB9KSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24gKG90aGVyLCBmKSB7XG4gIHZhciBjb21iaW5hdG9yID0gdG9Db21iaW5hdG9yKGYpO1xuICB2YXIgZGVzYyA9IG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiY29tYmluZVwiLCBbb3RoZXIsIGZdKTtcbiAgcmV0dXJuIHdpdGhEZXNjKGRlc2MsIEJhY29uLmNvbWJpbmVBc0FycmF5KHRoaXMsIG90aGVyKS5tYXAoZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIHJldHVybiBjb21iaW5hdG9yKHZhbHVlc1swXSwgdmFsdWVzWzFdKTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aFN0YXRlTWFjaGluZSA9IGZ1bmN0aW9uIChpbml0U3RhdGUsIGYpIHtcbiAgdmFyIHN0YXRlID0gaW5pdFN0YXRlO1xuICB2YXIgZGVzYyA9IG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwid2l0aFN0YXRlTWFjaGluZVwiLCBbaW5pdFN0YXRlLCBmXSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBmcm9tRiA9IGYoc3RhdGUsIGV2ZW50KTtcbiAgICB2YXIgbmV3U3RhdGUgPSBmcm9tRlswXTtcbiAgICB2YXIgb3V0cHV0cyA9IGZyb21GWzFdO1xuXG4gICAgc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB2YXIgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgIGZvciAodmFyIGkgPSAwLCBvdXRwdXQ7IGkgPCBvdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvdXRwdXQgPSBvdXRwdXRzW2ldO1xuICAgICAgcmVwbHkgPSB0aGlzLnB1c2gob3V0cHV0KTtcbiAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcGx5O1xuICB9KSk7XG59O1xuXG52YXIgZXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59O1xuXG52YXIgaXNOb25lID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvYmplY3QgIT09IG51bGwgPyBvYmplY3QuX2lzTm9uZSA6IGZhbHNlO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcER1cGxpY2F0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpc0VxdWFsID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gZXF1YWxzIDogYXJndW1lbnRzWzBdO1xuXG4gIHZhciBkZXNjID0gbmV3IEJhY29uLkRlc2ModGhpcywgXCJza2lwRHVwbGljYXRlc1wiLCBbXSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCB0aGlzLndpdGhTdGF0ZU1hY2hpbmUoTm9uZSwgZnVuY3Rpb24gKHByZXYsIGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gW3ByZXYsIFtldmVudF1dO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNJbml0aWFsKCkgfHwgaXNOb25lKHByZXYpIHx8ICFpc0VxdWFsKHByZXYuZ2V0KCksIGV2ZW50LnZhbHVlKCkpKSB7XG4gICAgICByZXR1cm4gW25ldyBTb21lKGV2ZW50LnZhbHVlKCkpLCBbZXZlbnRdXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtwcmV2LCBbXV07XG4gICAgfVxuICB9KSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5hd2FpdGluZyA9IGZ1bmN0aW9uIChvdGhlcikge1xuICB2YXIgZGVzYyA9IG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiYXdhaXRpbmdcIiwgW290aGVyXSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyh0aGlzLCBvdGhlcikubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWVzWzFdLmxlbmd0aCA9PT0gMDtcbiAgfSkudG9Qcm9wZXJ0eShmYWxzZSkuc2tpcER1cGxpY2F0ZXMoKSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcIm5vdFwiLCBbXSksIHRoaXMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuICF4O1xuICB9KSk7XG59O1xuXG5CYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImFuZFwiLCBbb3RoZXJdKSwgdGhpcy5jb21iaW5lKG90aGVyLCBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiB4ICYmIHk7XG4gIH0pKTtcbn07XG5cbkJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uIChvdGhlcikge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJvclwiLCBbb3RoZXJdKSwgdGhpcy5jb21iaW5lKG90aGVyLCBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiB4IHx8IHk7XG4gIH0pKTtcbn07XG5cbkJhY29uLnNjaGVkdWxlciA9IHtcbiAgc2V0VGltZW91dDogZnVuY3Rpb24gKGYsIGQpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmLCBkKTtcbiAgfSxcbiAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uIChmLCBpKSB7XG4gICAgcmV0dXJuIHNldEludGVydmFsKGYsIGkpO1xuICB9LFxuICBjbGVhckludGVydmFsOiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpZCk7XG4gIH0sXG4gIGNsZWFyVGltZW91dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG4gIH0sXG4gIG5vdzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImJ1ZmZlcldpdGhUaW1lXCIsIFtkZWxheV0pLCB0aGlzLmJ1ZmZlcldpdGhUaW1lT3JDb3VudChkZWxheSwgTnVtYmVyLk1BWF9WQUxVRSkpO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhDb3VudCA9IGZ1bmN0aW9uIChjb3VudCkge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJidWZmZXJXaXRoQ291bnRcIiwgW2NvdW50XSksIHRoaXMuYnVmZmVyV2l0aFRpbWVPckNvdW50KHVuZGVmaW5lZCwgY291bnQpKTtcbn07XG5cbkJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXJXaXRoVGltZU9yQ291bnQgPSBmdW5jdGlvbiAoZGVsYXksIGNvdW50KSB7XG4gIHZhciBmbHVzaE9yU2NoZWR1bGUgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlci52YWx1ZXMubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgcmV0dXJuIGJ1ZmZlci5mbHVzaCgpO1xuICAgIH0gZWxzZSBpZiAoZGVsYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGJ1ZmZlci5zY2hlZHVsZSgpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGRlc2MgPSBuZXcgQmFjb24uRGVzYyh0aGlzLCBcImJ1ZmZlcldpdGhUaW1lT3JDb3VudFwiLCBbZGVsYXksIGNvdW50XSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCB0aGlzLmJ1ZmZlcihkZWxheSwgZmx1c2hPclNjaGVkdWxlLCBmbHVzaE9yU2NoZWR1bGUpKTtcbn07XG5cbkJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXIgPSBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgdmFyIG9uSW5wdXQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBub3AgOiBhcmd1bWVudHNbMV07XG4gIHZhciBvbkZsdXNoID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gbm9wIDogYXJndW1lbnRzWzJdO1xuXG4gIHZhciBidWZmZXIgPSB7XG4gICAgc2NoZWR1bGVkOiBudWxsLFxuICAgIGVuZDogdW5kZWZpbmVkLFxuICAgIHZhbHVlczogW10sXG4gICAgZmx1c2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnNjaGVkdWxlZCkge1xuICAgICAgICBCYWNvbi5zY2hlZHVsZXIuY2xlYXJUaW1lb3V0KHRoaXMuc2NoZWR1bGVkKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHZhbHVlc1RvUHVzaCA9IHRoaXMudmFsdWVzO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICB2YXIgcmVwbHkgPSB0aGlzLnB1c2gobmV4dEV2ZW50KHZhbHVlc1RvUHVzaCkpO1xuICAgICAgICBpZiAodGhpcy5lbmQgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2godGhpcy5lbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICByZXR1cm4gb25GbHVzaCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHRoaXMuZW5kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2NoZWR1bGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICBpZiAoIXRoaXMuc2NoZWR1bGVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlZCA9IGRlbGF5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM2LmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgaWYgKCFfLmlzRnVuY3Rpb24oZGVsYXkpKSB7XG4gICAgdmFyIGRlbGF5TXMgPSBkZWxheTtcbiAgICBkZWxheSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gQmFjb24uc2NoZWR1bGVyLnNldFRpbWVvdXQoZiwgZGVsYXlNcyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJidWZmZXJcIiwgW10pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgYnVmZmVyLnB1c2ggPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBfdGhpczcucHVzaChldmVudCk7XG4gICAgfTtcbiAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICByZXBseSA9IHRoaXMucHVzaChldmVudCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICBidWZmZXIuZW5kID0gZXZlbnQ7XG4gICAgICBpZiAoIWJ1ZmZlci5zY2hlZHVsZWQpIHtcbiAgICAgICAgYnVmZmVyLmZsdXNoKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlci52YWx1ZXMucHVzaChldmVudC52YWx1ZSgpKTtcblxuICAgICAgb25JbnB1dChidWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVwbHk7XG4gIH0pKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmKSB7XG4gIGFzc2VydE9ic2VydmFibGVJc1Byb3BlcnR5KGYpO1xuXG4gIGZvciAodmFyIF9sZW4xMSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTEgPiAxID8gX2xlbjExIC0gMSA6IDApLCBfa2V5MTEgPSAxOyBfa2V5MTEgPCBfbGVuMTE7IF9rZXkxMSsrKSB7XG4gICAgYXJnc1tfa2V5MTEgLSAxXSA9IGFyZ3VtZW50c1tfa2V5MTFdO1xuICB9XG5cbiAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImZpbHRlclwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmZpbHRlcihmKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSk7XG59O1xuXG5CYWNvbi5vbmNlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBuZXcgRXZlbnRTdHJlYW0obmV3IERlc2MoQmFjb24sIFwib25jZVwiLCBbdmFsdWVdKSwgZnVuY3Rpb24gKHNpbmspIHtcbiAgICBzaW5rKHRvRXZlbnQodmFsdWUpKTtcbiAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgIHJldHVybiBub3A7XG4gIH0pO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uIChyaWdodCkge1xuICB2YXIgbGVmdCA9IHRoaXM7XG4gIHJldHVybiBuZXcgRXZlbnRTdHJlYW0obmV3IEJhY29uLkRlc2MobGVmdCwgXCJjb25jYXRcIiwgW3JpZ2h0XSksIGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgdmFyIHVuc3ViUmlnaHQgPSBub3A7XG4gICAgdmFyIHVuc3ViTGVmdCA9IGxlZnQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLmlzRW5kKCkpIHtcbiAgICAgICAgdW5zdWJSaWdodCA9IHJpZ2h0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICByZXR1cm4gdW5zdWJSaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzaW5rKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKHVuc3ViTGVmdCgpLCB1bnN1YlJpZ2h0KCkpO1xuICAgIH07XG4gIH0pO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZsYXRNYXBfKHRoaXMsIG1ha2VTcGF3bmVyKGFyZ3VtZW50cykpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJndW1lbnRzKSwgdHJ1ZSk7XG59O1xuXG52YXIgbWFrZVNwYXduZXIgPSBmdW5jdGlvbiAoYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgaXNPYnNlcnZhYmxlKGFyZ3NbMF0pKSB7XG4gICAgcmV0dXJuIF8uYWx3YXlzKGFyZ3NbMF0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYWtlRnVuY3Rpb25BcmdzKGFyZ3MpO1xuICB9XG59O1xuXG52YXIgbWFrZU9ic2VydmFibGUgPSBmdW5jdGlvbiAoeCkge1xuICBpZiAoaXNPYnNlcnZhYmxlKHgpKSB7XG4gICAgcmV0dXJuIHg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEJhY29uLm9uY2UoeCk7XG4gIH1cbn07XG5cbnZhciBmbGF0TWFwXyA9IGZ1bmN0aW9uIChyb290LCBmLCBmaXJzdE9ubHksIGxpbWl0KSB7XG4gIHZhciByb290RGVwID0gW3Jvb3RdO1xuICB2YXIgY2hpbGREZXBzID0gW107XG4gIHZhciBkZXNjID0gbmV3IEJhY29uLkRlc2Mocm9vdCwgXCJmbGF0TWFwXCIgKyAoZmlyc3RPbmx5ID8gXCJGaXJzdFwiIDogXCJcIiksIFtmXSk7XG4gIHZhciByZXN1bHQgPSBuZXcgRXZlbnRTdHJlYW0oZGVzYywgZnVuY3Rpb24gKHNpbmspIHtcbiAgICB2YXIgY29tcG9zaXRlID0gbmV3IENvbXBvc2l0ZVVuc3Vic2NyaWJlKCk7XG4gICAgdmFyIHF1ZXVlID0gW107XG4gICAgdmFyIHNwYXduID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgY2hpbGQgPSBtYWtlT2JzZXJ2YWJsZShmKGV2ZW50LnZhbHVlKCkpKTtcbiAgICAgIGNoaWxkRGVwcy5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiBjb21wb3NpdGUuYWRkKGZ1bmN0aW9uICh1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICByZXR1cm4gY2hpbGQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIF8ucmVtb3ZlKGNoaWxkLCBjaGlsZERlcHMpO1xuICAgICAgICAgICAgY2hlY2tRdWV1ZSgpO1xuICAgICAgICAgICAgY2hlY2tFbmQodW5zdWJNZSk7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50ICE9PSBudWxsID8gZXZlbnQuX2lzSW5pdGlhbCA6IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBldmVudCA9IGV2ZW50LnRvTmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBjaGVja1F1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGV2ZW50ID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICByZXR1cm4gc3Bhd24oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNoZWNrRW5kID0gZnVuY3Rpb24gKHVuc3ViKSB7XG4gICAgICB1bnN1YigpO1xuICAgICAgaWYgKGNvbXBvc2l0ZS5lbXB0eSgpKSB7XG4gICAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbiAoX18sIHVuc3ViUm9vdCkge1xuICAgICAgcmV0dXJuIHJvb3QuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrRW5kKHVuc3ViUm9vdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGZpcnN0T25seSAmJiBjb21wb3NpdGUuY291bnQoKSA+IDEpIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29tcG9zaXRlLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxpbWl0ICYmIGNvbXBvc2l0ZS5jb3VudCgpID4gbGltaXQpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNwYXduKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBjb21wb3NpdGUudW5zdWJzY3JpYmU7XG4gIH0pO1xuICByZXN1bHQuaW50ZXJuYWxEZXBzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjaGlsZERlcHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcm9vdERlcC5jb25jYXQoY2hpbGREZXBzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJvb3REZXA7XG4gICAgfVxuICB9O1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0ID0gZnVuY3Rpb24gKGxpbWl0KSB7XG4gIGZvciAodmFyIF9sZW4xMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTIgPiAxID8gX2xlbjEyIC0gMSA6IDApLCBfa2V5MTIgPSAxOyBfa2V5MTIgPCBfbGVuMTI7IF9rZXkxMisrKSB7XG4gICAgYXJnc1tfa2V5MTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5MTJdO1xuICB9XG5cbiAgdmFyIGRlc2MgPSBuZXcgQmFjb24uRGVzYyh0aGlzLCBcImZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdFwiLCBbbGltaXRdLmNvbmNhdChhcmdzKSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCBmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmdzKSwgZmFsc2UsIGxpbWl0KSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwQ29uY2F0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZGVzYyA9IG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZmxhdE1hcENvbmNhdFwiLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgcmV0dXJuIHdpdGhEZXNjKGRlc2MsIHRoaXMuZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0LmFwcGx5KHRoaXMsIFsxXS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpKTtcbn07XG5cbkJhY29uLmxhdGVyID0gZnVuY3Rpb24gKGRlbGF5LCB2YWx1ZSkge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MoQmFjb24sIFwibGF0ZXJcIiwgW2RlbGF5LCB2YWx1ZV0pLCBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgdmFyIHNlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzaW5rKFt2YWx1ZSwgZW5kRXZlbnQoKV0pO1xuICAgIH07XG4gICAgdmFyIGlkID0gQmFjb24uc2NoZWR1bGVyLnNldFRpbWVvdXQoc2VuZGVyLCBkZWxheSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBCYWNvbi5zY2hlZHVsZXIuY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuICB9KSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJpbmdUaHJvdHRsZSA9IGZ1bmN0aW9uIChtaW5pbXVtSW50ZXJ2YWwpIHtcbiAgdmFyIGRlc2MgPSBuZXcgQmFjb24uRGVzYyh0aGlzLCBcImJ1ZmZlcmluZ1Rocm90dGxlXCIsIFttaW5pbXVtSW50ZXJ2YWxdKTtcbiAgcmV0dXJuIHdpdGhEZXNjKGRlc2MsIHRoaXMuZmxhdE1hcENvbmNhdChmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBCYWNvbi5vbmNlKHgpLmNvbmNhdChCYWNvbi5sYXRlcihtaW5pbXVtSW50ZXJ2YWwpLmZpbHRlcihmYWxzZSkpO1xuICB9KSk7XG59O1xuXG5CYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJpbmdUaHJvdHRsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLnRvUHJvcGVydHkoKTtcbn07XG5cbmZ1bmN0aW9uIEJ1cygpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1cykpIHtcbiAgICByZXR1cm4gbmV3IEJ1cygpO1xuICB9XG5cbiAgdGhpcy51bnN1YkFsbCA9IF8uYmluZCh0aGlzLnVuc3ViQWxsLCB0aGlzKTtcbiAgdGhpcy5zdWJzY3JpYmVBbGwgPSBfLmJpbmQodGhpcy5zdWJzY3JpYmVBbGwsIHRoaXMpO1xuICB0aGlzLmd1YXJkZWRTaW5rID0gXy5iaW5kKHRoaXMuZ3VhcmRlZFNpbmssIHRoaXMpO1xuXG4gIHRoaXMuc2luayA9IHVuZGVmaW5lZDtcbiAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgRXZlbnRTdHJlYW0uY2FsbCh0aGlzLCBuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJCdXNcIiwgW10pLCB0aGlzLnN1YnNjcmliZUFsbCk7XG59XG5cbmluaGVyaXQoQnVzLCBFdmVudFN0cmVhbSk7XG5leHRlbmQoQnVzLnByb3RvdHlwZSwge1xuICB1bnN1YkFsbDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpdGVyYWJsZSA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICBmb3IgKHZhciBpID0gMCwgc3ViOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1YiA9IGl0ZXJhYmxlW2ldO1xuICAgICAgaWYgKHR5cGVvZiBzdWIudW5zdWIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBzdWIudW5zdWIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc3Vic2NyaWJlQWxsOiBmdW5jdGlvbiAobmV3U2luaykge1xuICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICBuZXdTaW5rKGVuZEV2ZW50KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpbmsgPSBuZXdTaW5rO1xuICAgICAgdmFyIGl0ZXJhYmxlID0gY2xvbmVBcnJheSh0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHN1YnNjcmlwdGlvbjsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnVuc3ViQWxsO1xuICB9LFxuXG4gIGd1YXJkZWRTaW5rOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIF90aGlzOC51bnN1YnNjcmliZUlucHV0KGlucHV0KTtcbiAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBfdGhpczguc2luayhldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBzdWJzY3JpYmVJbnB1dDogZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xuICAgIHN1YnNjcmlwdGlvbi51bnN1YiA9IHN1YnNjcmlwdGlvbi5pbnB1dC5kaXNwYXRjaGVyLnN1YnNjcmliZSh0aGlzLmd1YXJkZWRTaW5rKHN1YnNjcmlwdGlvbi5pbnB1dCkpO1xuICAgIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWI7XG4gIH0sXG5cbiAgdW5zdWJzY3JpYmVJbnB1dDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgIGZvciAodmFyIGkgPSAwLCBzdWI7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuICAgICAgc3ViID0gaXRlcmFibGVbaV07XG4gICAgICBpZiAoc3ViLmlucHV0ID09PSBpbnB1dCkge1xuICAgICAgICBpZiAodHlwZW9mIHN1Yi51bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgc3ViLnVuc3ViKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpLCAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBwbHVnOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICAgIGFzc2VydE9ic2VydmFibGUoaW5wdXQpO1xuICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBzdWIgPSB7IGlucHV0OiBpbnB1dCB9O1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1Yik7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNpbmsgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlSW5wdXQoc3ViKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpczkudW5zdWJzY3JpYmVJbnB1dChpbnB1dCk7XG4gICAgfTtcbiAgfSxcblxuICBlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLnVuc3ViQWxsKCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIHRoaXMuc2luayhlbmRFdmVudCgpKTtcbiAgICB9XG4gIH0sXG5cbiAgcHVzaDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmVuZGVkICYmIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIHRoaXMuc2luayhuZXh0RXZlbnQodmFsdWUpKTtcbiAgICB9XG4gIH0sXG5cbiAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zaW5rID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNpbmsobmV3IEVycm9yKGVycm9yKSk7XG4gICAgfVxuICB9XG59KTtcblxuQmFjb24uQnVzID0gQnVzO1xuXG52YXIgbGlmdENhbGxiYWNrID0gZnVuY3Rpb24gKGRlc2MsIHdyYXBwZWQpIHtcbiAgcmV0dXJuIHdpdGhNZXRob2RDYWxsU3VwcG9ydChmdW5jdGlvbiAoZikge1xuICAgIHZhciBzdHJlYW0gPSBwYXJ0aWFsbHlBcHBsaWVkKHdyYXBwZWQsIFtmdW5jdGlvbiAodmFsdWVzLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGYuYXBwbHkodW5kZWZpbmVkLCB2YWx1ZXMuY29uY2F0KFtjYWxsYmFja10pKTtcbiAgICB9XSk7XG5cbiAgICBmb3IgKHZhciBfbGVuMTMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjEzID4gMSA/IF9sZW4xMyAtIDEgOiAwKSwgX2tleTEzID0gMTsgX2tleTEzIDwgX2xlbjEzOyBfa2V5MTMrKykge1xuICAgICAgYXJnc1tfa2V5MTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5MTNdO1xuICAgIH1cblxuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgZGVzYywgW2ZdLmNvbmNhdChhcmdzKSksIEJhY29uLmNvbWJpbmVBc0FycmF5KGFyZ3MpLmZsYXRNYXAoc3RyZWFtKSk7XG4gIH0pO1xufTtcblxuQmFjb24uZnJvbUNhbGxiYWNrID0gbGlmdENhbGxiYWNrKFwiZnJvbUNhbGxiYWNrXCIsIGZ1bmN0aW9uIChmKSB7XG4gIGZvciAodmFyIF9sZW4xNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTQgPiAxID8gX2xlbjE0IC0gMSA6IDApLCBfa2V5MTQgPSAxOyBfa2V5MTQgPCBfbGVuMTQ7IF9rZXkxNCsrKSB7XG4gICAgYXJnc1tfa2V5MTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5MTRdO1xuICB9XG5cbiAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICBtYWtlRnVuY3Rpb24oZiwgYXJncykoaGFuZGxlcik7XG4gICAgcmV0dXJuIG5vcDtcbiAgfSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gIH0pO1xufSk7XG5cbkJhY29uLmZyb21Ob2RlQ2FsbGJhY2sgPSBsaWZ0Q2FsbGJhY2soXCJmcm9tTm9kZUNhbGxiYWNrXCIsIGZ1bmN0aW9uIChmKSB7XG4gIGZvciAodmFyIF9sZW4xNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTUgPiAxID8gX2xlbjE1IC0gMSA6IDApLCBfa2V5MTUgPSAxOyBfa2V5MTUgPCBfbGVuMTU7IF9rZXkxNSsrKSB7XG4gICAgYXJnc1tfa2V5MTUgLSAxXSA9IGFyZ3VtZW50c1tfa2V5MTVdO1xuICB9XG5cbiAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICBtYWtlRnVuY3Rpb24oZiwgYXJncykoaGFuZGxlcik7XG4gICAgcmV0dXJuIG5vcDtcbiAgfSwgZnVuY3Rpb24gKGVycm9yLCB2YWx1ZSkge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIFtuZXcgRXJyb3IoZXJyb3IpLCBlbmRFdmVudCgpXTtcbiAgICB9XG4gICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gIH0pO1xufSk7XG5cbkJhY29uLmNvbWJpbmVUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICBmdW5jdGlvbiBjdXJyZW50KGN0eFN0YWNrKSB7XG4gICAgcmV0dXJuIGN0eFN0YWNrW2N0eFN0YWNrLmxlbmd0aCAtIDFdO1xuICB9XG4gIGZ1bmN0aW9uIHNldFZhbHVlKGN0eFN0YWNrLCBrZXksIHZhbHVlKSB7XG4gICAgY3VycmVudChjdHhTdGFjaylba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBmdW5jdGlvbiBhcHBseVN0cmVhbVZhbHVlKGtleSwgaW5kZXgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGN0eFN0YWNrLCB2YWx1ZXMpIHtcbiAgICAgIHJldHVybiBzZXRWYWx1ZShjdHhTdGFjaywga2V5LCB2YWx1ZXNbaW5kZXhdKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGNvbnN0YW50VmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoY3R4U3RhY2spIHtcbiAgICAgIHJldHVybiBzZXRWYWx1ZShjdHhTdGFjaywga2V5LCB2YWx1ZSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1rQ29udGV4dCh0ZW1wbGF0ZSkge1xuICAgIHJldHVybiBpc0FycmF5KHRlbXBsYXRlKSA/IFtdIDoge307XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoQ29udGV4dChrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjdHhTdGFjaykge1xuICAgICAgdmFyIG5ld0NvbnRleHQgPSBta0NvbnRleHQodmFsdWUpO1xuICAgICAgc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgbmV3Q29udGV4dCk7XG4gICAgICByZXR1cm4gY3R4U3RhY2sucHVzaChuZXdDb250ZXh0KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGlsZShrZXksIHZhbHVlKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHN0cmVhbXMucHVzaCh2YWx1ZSk7XG4gICAgICByZXR1cm4gZnVuY3MucHVzaChhcHBseVN0cmVhbVZhbHVlKGtleSwgc3RyZWFtcy5sZW5ndGggLSAxKSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiAodmFsdWUuY29uc3RydWN0b3IgPT0gT2JqZWN0IHx8IHZhbHVlLmNvbnN0cnVjdG9yID09IEFycmF5KSkge1xuICAgICAgdmFyIHBvcENvbnRleHQgPSBmdW5jdGlvbiAoY3R4U3RhY2spIHtcbiAgICAgICAgcmV0dXJuIGN0eFN0YWNrLnBvcCgpO1xuICAgICAgfTtcbiAgICAgIGZ1bmNzLnB1c2gocHVzaENvbnRleHQoa2V5LCB2YWx1ZSkpO1xuICAgICAgY29tcGlsZVRlbXBsYXRlKHZhbHVlKTtcbiAgICAgIHJldHVybiBmdW5jcy5wdXNoKHBvcENvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3MucHVzaChjb25zdGFudFZhbHVlKGtleSwgdmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb21iaW5hdG9yKHZhbHVlcykge1xuICAgIHZhciByb290Q29udGV4dCA9IG1rQ29udGV4dCh0ZW1wbGF0ZSk7XG4gICAgdmFyIGN0eFN0YWNrID0gW3Jvb3RDb250ZXh0XTtcbiAgICBmb3IgKHZhciBpID0gMCwgZjsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmID0gZnVuY3NbaV07XG4gICAgICBmKGN0eFN0YWNrLCB2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcm9vdENvbnRleHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjb21waWxlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICByZXR1cm4gXy5lYWNoKHRlbXBsYXRlLCBjb21waWxlKTtcbiAgfVxuXG4gIHZhciBmdW5jcyA9IFtdO1xuICB2YXIgc3RyZWFtcyA9IFtdO1xuXG4gIGNvbXBpbGVUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG5cbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImNvbWJpbmVUZW1wbGF0ZVwiLCBbdGVtcGxhdGVdKSwgQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykubWFwKGNvbWJpbmF0b3IpKTtcbn07XG5cbnZhciBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtID0gZnVuY3Rpb24gKHByb3BlcnR5LCBzdHJlYW0pIHtcbiAgdmFyIGp1c3RJbml0VmFsdWUgPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUocHJvcGVydHksIFwianVzdEluaXRWYWx1ZVwiKSwgZnVuY3Rpb24gKHNpbmspIHtcbiAgICB2YXIgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVuc3ViID0gcHJvcGVydHkuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgdmFsdWUgPSBldmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgfSk7XG4gICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgoanVzdEluaXRWYWx1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBzaW5rKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgIH0pO1xuICAgIHJldHVybiB1bnN1YjtcbiAgfSk7XG4gIHJldHVybiBqdXN0SW5pdFZhbHVlLmNvbmNhdChzdHJlYW0pLnRvUHJvcGVydHkoKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLm1hcEVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcIm1hcEVuZFwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICB0aGlzLnB1c2gobmV4dEV2ZW50KGYoZXZlbnQpKSk7XG4gICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICB9XG4gIH0pKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnNraXBFcnJvcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNraXBFcnJvcnNcIiwgW10pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICB9XG4gIH0pKTtcbn07XG5cbkJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS50YWtlVW50aWwgPSBmdW5jdGlvbiAoc3RvcHBlcikge1xuICB2YXIgZW5kTWFya2VyID0ge307XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInRha2VVbnRpbFwiLCBbc3RvcHBlcl0pLCBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyh0aGlzLm1hcEVuZChlbmRNYXJrZXIpLCBzdG9wcGVyLnNraXBFcnJvcnMoKSkud2l0aEhhbmRsZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9ldmVudCR2YWx1ZSA9IGV2ZW50LnZhbHVlKCk7XG5cbiAgICAgIHZhciBkYXRhID0gX2V2ZW50JHZhbHVlWzBdO1xuICAgICAgdmFyIHN0b3BwZXIgPSBfZXZlbnQkdmFsdWVbMV07XG5cbiAgICAgIGlmIChzdG9wcGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGVuZEV2ZW50KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhbHVlID0gZGF0YVtpXTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IGVuZE1hcmtlcikge1xuICAgICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG5leHRFdmVudCh2YWx1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICB9XG4gICAgfVxuICB9KSk7XG59O1xuXG5CYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24gKHN0b3BwZXIpIHtcbiAgdmFyIGNoYW5nZXMgPSB0aGlzLmNoYW5nZXMoKS50YWtlVW50aWwoc3RvcHBlcik7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInRha2VVbnRpbFwiLCBbc3RvcHBlcl0pLCBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtKHRoaXMsIGNoYW5nZXMpKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBMYXRlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmID0gbWFrZVNwYXduZXIoYXJndW1lbnRzKTtcbiAgdmFyIHN0cmVhbSA9IHRoaXMudG9FdmVudFN0cmVhbSgpO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJmbGF0TWFwTGF0ZXN0XCIsIFtmXSksIHN0cmVhbS5mbGF0TWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBtYWtlT2JzZXJ2YWJsZShmKHZhbHVlKSkudGFrZVVudGlsKHN0cmVhbSk7XG4gIH0pKTtcbn07XG5cbkJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5kZWxheUNoYW5nZXMgPSBmdW5jdGlvbiAoZGVzYywgZikge1xuICByZXR1cm4gd2l0aERlc2MoZGVzYywgYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSh0aGlzLCBmKHRoaXMuY2hhbmdlcygpKSkpO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImRlbGF5XCIsIFtkZWxheV0pLCB0aGlzLmZsYXRNYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5LCB2YWx1ZSk7XG4gIH0pKTtcbn07XG5cbkJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIChkZWxheSkge1xuICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMobmV3IEJhY29uLkRlc2ModGhpcywgXCJkZWxheVwiLCBbZGVsYXldKSwgZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICByZXR1cm4gY2hhbmdlcy5kZWxheShkZWxheSk7XG4gIH0pO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImRlYm91bmNlXCIsIFtkZWxheV0pLCB0aGlzLmZsYXRNYXBMYXRlc3QoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5LCB2YWx1ZSk7XG4gIH0pKTtcbn07XG5cbkJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uIChkZWxheSkge1xuICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMobmV3IEJhY29uLkRlc2ModGhpcywgXCJkZWJvdW5jZVwiLCBbZGVsYXldKSwgZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICByZXR1cm4gY2hhbmdlcy5kZWJvdW5jZShkZWxheSk7XG4gIH0pO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlSW1tZWRpYXRlID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImRlYm91bmNlSW1tZWRpYXRlXCIsIFtkZWxheV0pLCB0aGlzLmZsYXRNYXBGaXJzdChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gQmFjb24ub25jZSh2YWx1ZSkuY29uY2F0KEJhY29uLmxhdGVyKGRlbGF5KS5maWx0ZXIoZmFsc2UpKTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGNhc2VzKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImRlY29kZVwiLCBbY2FzZXNdKSwgdGhpcy5jb21iaW5lKEJhY29uLmNvbWJpbmVUZW1wbGF0ZShjYXNlcyksIGZ1bmN0aW9uIChrZXksIHZhbHVlcykge1xuICAgIHJldHVybiB2YWx1ZXNba2V5XTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChzZWVkLCBmKSB7XG4gIHZhciBfdGhpczEwID0gdGhpcztcblxuICB2YXIgcmVzdWx0UHJvcGVydHk7XG4gIGYgPSB0b0NvbWJpbmF0b3IoZik7XG4gIHZhciBhY2MgPSB0b09wdGlvbihzZWVkKTtcbiAgdmFyIGluaXRIYW5kbGVkID0gZmFsc2U7XG4gIHZhciBzdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICAgIHZhciBpbml0U2VudCA9IGZhbHNlO1xuICAgIHZhciB1bnN1YiA9IG5vcDtcbiAgICB2YXIgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgIHZhciBzZW5kSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghaW5pdFNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGFjYy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGluaXRTZW50ID0gaW5pdEhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgIHJlcGx5ID0gc2luayhuZXcgSW5pdGlhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICB1bnN1YigpO1xuICAgICAgICAgICAgdW5zdWIgPSBub3A7XG4gICAgICAgICAgICByZXR1cm4gdW5zdWI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHVuc3ViID0gX3RoaXMxMC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIGlmIChpbml0SGFuZGxlZCAmJiBldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5pdFNlbnQgPSBpbml0SGFuZGxlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcHJldiA9IGFjYy5nZXRPckVsc2UodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gZihwcmV2LCBldmVudC52YWx1ZSgpKTtcblxuICAgICAgICAgICAgYWNjID0gbmV3IFNvbWUobmV4dCk7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudC5hcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgcmVwbHkgPSBzZW5kSW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0UHJvcGVydHksIHNlbmRJbml0KTtcbiAgICByZXR1cm4gdW5zdWI7XG4gIH07XG4gIHJlc3VsdFByb3BlcnR5ID0gbmV3IFByb3BlcnR5KG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwic2NhblwiLCBbc2VlZCwgZl0pLCBzdWJzY3JpYmUpO1xuICByZXR1cm4gcmVzdWx0UHJvcGVydHk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24gKHN0YXJ0LCBmKSB7XG4gIGYgPSB0b0NvbWJpbmF0b3IoZik7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImRpZmZcIiwgW3N0YXJ0LCBmXSksIHRoaXMuc2Nhbihbc3RhcnRdLCBmdW5jdGlvbiAocHJldlR1cGxlLCBuZXh0KSB7XG4gICAgcmV0dXJuIFtuZXh0LCBmKHByZXZUdXBsZVswXSwgbmV4dCldO1xuICB9KS5maWx0ZXIoZnVuY3Rpb24gKHR1cGxlKSB7XG4gICAgcmV0dXJuIHR1cGxlLmxlbmd0aCA9PT0gMjtcbiAgfSkubWFwKGZ1bmN0aW9uICh0dXBsZSkge1xuICAgIHJldHVybiB0dXBsZVsxXTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG9BY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJkb0FjdGlvblwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICBmKGV2ZW50LnZhbHVlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG9FbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJkb0VuZFwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICBmKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICB9KSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5kb0Vycm9yID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZG9FcnJvclwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgIGYoZXZlbnQuZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG9Mb2cgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4xNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTYpLCBfa2V5MTYgPSAwOyBfa2V5MTYgPCBfbGVuMTY7IF9rZXkxNisrKSB7XG4gICAgYXJnc1tfa2V5MTZdID0gYXJndW1lbnRzW19rZXkxNl07XG4gIH1cblxuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJkb0xvZ1wiLCBhcmdzKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncy5jb25jYXQoW2V2ZW50LmxvZygpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZW5kT25FcnJvciA9IGZ1bmN0aW9uIChmKSB7XG4gIGlmICghKHR5cGVvZiBmICE9PSBcInVuZGVmaW5lZFwiICYmIGYgIT09IG51bGwpKSB7XG4gICAgZiA9IHRydWU7XG4gIH1cblxuICBmb3IgKHZhciBfbGVuMTcgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjE3ID4gMSA/IF9sZW4xNyAtIDEgOiAwKSwgX2tleTE3ID0gMTsgX2tleTE3IDwgX2xlbjE3OyBfa2V5MTcrKykge1xuICAgIGFyZ3NbX2tleTE3IC0gMV0gPSBhcmd1bWVudHNbX2tleTE3XTtcbiAgfVxuXG4gIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJlbmRPbkVycm9yXCIsIFtdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkgJiYgZihldmVudC5lcnJvcikpIHtcbiAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSk7XG59O1xuXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5lcnJvcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImVycm9yc1wiLCBbXSksIHRoaXMuZmlsdGVyKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnRha2UgPSBmdW5jdGlvbiAoY291bnQpIHtcbiAgaWYgKGNvdW50IDw9IDApIHtcbiAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgfVxuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJ0YWtlXCIsIFtjb3VudF0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50LS07XG4gICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICB9XG4gICAgfVxuICB9KSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZmlyc3RcIiwgW10pLCB0aGlzLnRha2UoMSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJtYXBFcnJvclwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2gobmV4dEV2ZW50KGYoZXZlbnQuZXJyb3IpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgIH1cbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEVycm9yID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBkZXNjID0gbmV3IEJhY29uLkRlc2ModGhpcywgXCJmbGF0TWFwRXJyb3JcIiwgW2ZuXSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCB0aGlzLm1hcEVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGVycik7XG4gIH0pLmZsYXRNYXAoZnVuY3Rpb24gKHgpIHtcbiAgICBpZiAoeCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gZm4oeC5lcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpO1xuICAgIH1cbiAgfSkpO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uIChzYW1wbGVyLCBjb21iaW5hdG9yKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNhbXBsZWRCeVwiLCBbc2FtcGxlciwgY29tYmluYXRvcl0pLCB0aGlzLnRvUHJvcGVydHkoKS5zYW1wbGVkQnkoc2FtcGxlciwgY29tYmluYXRvcikpO1xufTtcblxuQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uIChzYW1wbGVyLCBjb21iaW5hdG9yKSB7XG4gIHZhciBsYXp5ID0gZmFsc2U7XG4gIGlmICh0eXBlb2YgY29tYmluYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb21iaW5hdG9yICE9PSBudWxsKSB7XG4gICAgY29tYmluYXRvciA9IHRvQ29tYmluYXRvcihjb21iaW5hdG9yKTtcbiAgfSBlbHNlIHtcbiAgICBsYXp5ID0gdHJ1ZTtcbiAgICBjb21iaW5hdG9yID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmLnZhbHVlKCk7XG4gICAgfTtcbiAgfVxuICB2YXIgdGhpc1NvdXJjZSA9IG5ldyBTb3VyY2UodGhpcywgZmFsc2UsIGxhenkpO1xuICB2YXIgc2FtcGxlclNvdXJjZSA9IG5ldyBTb3VyY2Uoc2FtcGxlciwgdHJ1ZSwgbGF6eSk7XG4gIHZhciBzdHJlYW0gPSBCYWNvbi53aGVuKFt0aGlzU291cmNlLCBzYW1wbGVyU291cmNlXSwgY29tYmluYXRvcik7XG4gIHZhciByZXN1bHQgPSBzYW1wbGVyLl9pc1Byb3BlcnR5ID8gc3RyZWFtLnRvUHJvcGVydHkoKSA6IHN0cmVhbTtcbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwic2FtcGxlZEJ5XCIsIFtzYW1wbGVyLCBjb21iaW5hdG9yXSksIHJlc3VsdCk7XG59O1xuXG5CYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuc2FtcGxlID0gZnVuY3Rpb24gKGludGVydmFsKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNhbXBsZVwiLCBbaW50ZXJ2YWxdKSwgdGhpcy5zYW1wbGVkQnkoQmFjb24uaW50ZXJ2YWwoaW50ZXJ2YWwsIHt9KSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKHApIHtcbiAgaWYgKHAgJiYgcC5faXNQcm9wZXJ0eSkge1xuICAgIHJldHVybiBwLnNhbXBsZWRCeSh0aGlzLCBmb3JtZXIpO1xuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIF9sZW4xOCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMTggPiAxID8gX2xlbjE4IC0gMSA6IDApLCBfa2V5MTggPSAxOyBfa2V5MTggPCBfbGVuMTg7IF9rZXkxOCsrKSB7XG4gICAgICBhcmdzW19rZXkxOCAtIDFdID0gYXJndW1lbnRzW19rZXkxOF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBwLCBhcmdzLCBmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwibWFwXCIsIFtmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQuZm1hcChmKSk7XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZvbGQgPSBmdW5jdGlvbiAoc2VlZCwgZikge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJmb2xkXCIsIFtzZWVkLCBmXSksIHRoaXMuc2NhbihzZWVkLCBmKS5zYW1wbGVkQnkodGhpcy5maWx0ZXIoZmFsc2UpLm1hcEVuZCgpLnRvUHJvcGVydHkoKSkpO1xufTtcblxuT2JzZXJ2YWJsZS5wcm90b3R5cGUucmVkdWNlID0gT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9sZDtcblxudmFyIGV2ZW50TWV0aG9kcyA9IFtbXCJhZGRFdmVudExpc3RlbmVyXCIsIFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiXSwgW1wiYWRkTGlzdGVuZXJcIiwgXCJyZW1vdmVMaXN0ZW5lclwiXSwgW1wib25cIiwgXCJvZmZcIl0sIFtcImJpbmRcIiwgXCJ1bmJpbmRcIl1dO1xuXG52YXIgZmluZEhhbmRsZXJNZXRob2RzID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICB2YXIgcGFpcjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudE1ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICBwYWlyID0gZXZlbnRNZXRob2RzW2ldO1xuICAgIHZhciBtZXRob2RQYWlyID0gW3RhcmdldFtwYWlyWzBdXSwgdGFyZ2V0W3BhaXJbMV1dXTtcbiAgICBpZiAobWV0aG9kUGFpclswXSAmJiBtZXRob2RQYWlyWzFdKSB7XG4gICAgICByZXR1cm4gbWV0aG9kUGFpcjtcbiAgICB9XG4gIH1cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBldmVudE1ldGhvZHMubGVuZ3RoOyBqKyspIHtcbiAgICBwYWlyID0gZXZlbnRNZXRob2RzW2pdO1xuICAgIHZhciBhZGRMaXN0ZW5lciA9IHRhcmdldFtwYWlyWzBdXTtcbiAgICBpZiAoYWRkTGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBbYWRkTGlzdGVuZXIsIGZ1bmN0aW9uICgpIHt9XTtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VpdGFibGUgZXZlbnQgbWV0aG9kcyBpbiBcIiArIHRhcmdldCk7XG59O1xuXG5CYWNvbi5mcm9tRXZlbnRUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50VHJhbnNmb3JtZXIpIHtcbiAgdmFyIF9maW5kSGFuZGxlck1ldGhvZHMgPSBmaW5kSGFuZGxlck1ldGhvZHModGFyZ2V0KTtcblxuICB2YXIgc3ViID0gX2ZpbmRIYW5kbGVyTWV0aG9kc1swXTtcbiAgdmFyIHVuc3ViID0gX2ZpbmRIYW5kbGVyTWV0aG9kc1sxXTtcblxuICB2YXIgZGVzYyA9IG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImZyb21FdmVudFwiLCBbdGFyZ2V0LCBldmVudE5hbWVdKTtcbiAgcmV0dXJuIHdpdGhEZXNjKGRlc2MsIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICBzdWIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB1bnN1Yi5jYWxsKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBldmVudFRyYW5zZm9ybWVyKSk7XG59O1xuXG5CYWNvbi5mcm9tRXZlbnQgPSBCYWNvbi5mcm9tRXZlbnRUYXJnZXQ7XG5cbkJhY29uLmZyb21Qb2xsID0gZnVuY3Rpb24gKGRlbGF5LCBwb2xsKSB7XG4gIHZhciBkZXNjID0gbmV3IEJhY29uLkRlc2MoQmFjb24sIFwiZnJvbVBvbGxcIiwgW2RlbGF5LCBwb2xsXSk7XG4gIHJldHVybiB3aXRoRGVzYyhkZXNjLCBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgdmFyIGlkID0gQmFjb24uc2NoZWR1bGVyLnNldEludGVydmFsKGhhbmRsZXIsIGRlbGF5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5jbGVhckludGVydmFsKGlkKTtcbiAgICB9O1xuICB9LCBwb2xsKSk7XG59O1xuXG5mdW5jdGlvbiB2YWx1ZUFuZEVuZCh2YWx1ZSkge1xuICByZXR1cm4gW3ZhbHVlLCBlbmRFdmVudCgpXTtcbn1cblxuQmFjb24uZnJvbVByb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSwgYWJvcnQpIHtcbiAgdmFyIGV2ZW50VHJhbnNmb3JtZXIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB2YWx1ZUFuZEVuZCA6IGFyZ3VtZW50c1syXTtcblxuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MoQmFjb24sIFwiZnJvbVByb21pc2VcIiwgW3Byb21pc2VdKSwgQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgIHZhciBib3VuZCA9IHByb21pc2UudGhlbihoYW5kbGVyLCBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGhhbmRsZXIobmV3IEVycm9yKGUpKTtcbiAgICB9KTtcbiAgICBpZiAoYm91bmQgJiYgdHlwZW9mIGJvdW5kLmRvbmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgYm91bmQuZG9uZSgpO1xuICAgIH1cblxuICAgIGlmIChhYm9ydCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9taXNlLmFib3J0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gcHJvbWlzZS5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gICAgfVxuICB9LCBldmVudFRyYW5zZm9ybWVyKSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ncm91cEJ5ID0gZnVuY3Rpb24gKGtleUYpIHtcbiAgdmFyIGxpbWl0RiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IEJhY29uLl8uaWQgOiBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHN0cmVhbXMgPSB7fTtcbiAgdmFyIHNyYyA9IHRoaXM7XG4gIHJldHVybiBzcmMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuICFzdHJlYW1zW2tleUYoeCldO1xuICB9KS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICB2YXIga2V5ID0ga2V5Rih4KTtcbiAgICB2YXIgc2ltaWxhciA9IHNyYy5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBrZXlGKHgpID09PSBrZXk7XG4gICAgfSk7XG4gICAgdmFyIGRhdGEgPSBCYWNvbi5vbmNlKHgpLmNvbmNhdChzaW1pbGFyKTtcbiAgICB2YXIgbGltaXRlZCA9IGxpbWl0RihkYXRhLCB4KS53aXRoSGFuZGxlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICByZXR1cm4gZGVsZXRlIHN0cmVhbXNba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzdHJlYW1zW2tleV0gPSBsaW1pdGVkO1xuICAgIHJldHVybiBsaW1pdGVkO1xuICB9KTtcbn07XG5cbkJhY29uLmZyb21BcnJheSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgYXNzZXJ0QXJyYXkodmFsdWVzKTtcbiAgaWYgKCF2YWx1ZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImZyb21BcnJheVwiLCB2YWx1ZXMpLCBCYWNvbi5uZXZlcigpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJmcm9tQXJyYXlcIiwgW3ZhbHVlc10pLCBmdW5jdGlvbiAoc2luaykge1xuICAgICAgdmFyIHVuc3ViZCA9IGZhbHNlO1xuICAgICAgdmFyIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgIHZhciBwdXNoaW5nID0gZmFsc2U7XG4gICAgICB2YXIgcHVzaE5lZWRlZCA9IGZhbHNlO1xuICAgICAgdmFyIHB1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHB1c2hOZWVkZWQgPSB0cnVlO1xuICAgICAgICBpZiAocHVzaGluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwdXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgd2hpbGUgKHB1c2hOZWVkZWQpIHtcbiAgICAgICAgICBwdXNoTmVlZGVkID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUgJiYgIXVuc3ViZCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW2krK107XG4gICAgICAgICAgICByZXBseSA9IHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgaWYgKGkgPT09IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFVwZGF0ZUJhcnJpZXIuYWZ0ZXJUcmFuc2FjdGlvbihwdXNoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBwdXNoaW5nO1xuICAgICAgfTtcblxuICAgICAgcHVzaCgpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdW5zdWJkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHVuc3ViZDtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn07XG5cbkJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkV2hlbiA9IGZ1bmN0aW9uICh2YWx2ZSkge1xuICB2YXIgb25Ib2xkID0gZmFsc2U7XG4gIHZhciBidWZmZXJlZFZhbHVlcyA9IFtdO1xuICB2YXIgc3JjID0gdGhpcztcbiAgdmFyIHNyY0lzRW5kZWQgPSBmYWxzZTtcbiAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyh0aGlzLCBcImhvbGRXaGVuXCIsIFt2YWx2ZV0pLCBmdW5jdGlvbiAoc2luaykge1xuICAgIHZhciBjb21wb3NpdGUgPSBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoKTtcbiAgICB2YXIgc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgIHZhciBlbmRJZkJvdGhFbmRlZCA9IGZ1bmN0aW9uICh1bnN1Yikge1xuICAgICAgaWYgKHR5cGVvZiB1bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHVuc3ViKCk7XG4gICAgICB9XG4gICAgICBpZiAoY29tcG9zaXRlLmVtcHR5KCkgJiYgc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm4gc2luayhlbmRFdmVudCgpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbXBvc2l0ZS5hZGQoZnVuY3Rpb24gKHVuc3ViQWxsLCB1bnN1Yk1lKSB7XG4gICAgICByZXR1cm4gdmFsdmUuc3Vic2NyaWJlSW50ZXJuYWwoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgb25Ib2xkID0gZXZlbnQudmFsdWUoKTtcbiAgICAgICAgICBpZiAoIW9uSG9sZCkge1xuICAgICAgICAgICAgdmFyIHRvU2VuZCA9IGJ1ZmZlcmVkVmFsdWVzO1xuICAgICAgICAgICAgYnVmZmVyZWRWYWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZTsgaSA8IHRvU2VuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdG9TZW5kW2ldO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHNpbmsobmV4dEV2ZW50KHZhbHVlKSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzcmNJc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc2luayhlbmRFdmVudCgpKSk7XG4gICAgICAgICAgICAgICAgdW5zdWJNZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGVuZElmQm90aEVuZGVkKHVuc3ViTWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbiAodW5zdWJBbGwsIHVuc3ViTWUpIHtcbiAgICAgIHJldHVybiBzcmMuc3Vic2NyaWJlSW50ZXJuYWwoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChvbkhvbGQgJiYgZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiBidWZmZXJlZFZhbHVlcy5wdXNoKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzRW5kKCkgJiYgYnVmZmVyZWRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgc3JjSXNFbmRlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIGVuZElmQm90aEVuZGVkKHVuc3ViTWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgZW5kSWZCb3RoRW5kZWQoKTtcbiAgICByZXR1cm4gY29tcG9zaXRlLnVuc3Vic2NyaWJlO1xuICB9KTtcbn07XG5cbkJhY29uLmludGVydmFsID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHZhciB2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJpbnRlcnZhbFwiLCBbZGVsYXksIHZhbHVlXSksIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5leHRFdmVudCh2YWx1ZSk7XG4gIH0pKTtcbn07XG5cbkJhY29uLiQgPSB7fTtcbkJhY29uLiQuYXNFdmVudFN0cmVhbSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIHNlbGVjdG9yLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gIHZhciBfdGhpczExID0gdGhpcztcblxuICBpZiAoXy5pc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgIGV2ZW50VHJhbnNmb3JtZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLnNlbGVjdG9yIHx8IHRoaXMsIFwiYXNFdmVudFN0cmVhbVwiLCBbZXZlbnROYW1lXSksIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICBfdGhpczExLm9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMxMS5vZmYoZXZlbnROYW1lLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgfTtcbiAgfSwgZXZlbnRUcmFuc2Zvcm1lcikpO1xufTtcblxuaWYgKHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5KSB7XG4gIGpRdWVyeS5mbi5hc0V2ZW50U3RyZWFtID0gQmFjb24uJC5hc0V2ZW50U3RyZWFtO1xufVxuXG5pZiAodHlwZW9mIFplcHRvICE9PSBcInVuZGVmaW5lZFwiICYmIFplcHRvKSB7XG4gIFplcHRvLmZuLmFzRXZlbnRTdHJlYW0gPSBCYWNvbi4kLmFzRXZlbnRTdHJlYW07XG59XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsYXN0RXZlbnQ7XG5cbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwibGFzdFwiLCBbXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgdGhpcy5wdXNoKGxhc3RFdmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0RXZlbnQgPSBldmVudDtcbiAgICB9XG4gIH0pKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbjE5ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4xOSksIF9rZXkxOSA9IDA7IF9rZXkxOSA8IF9sZW4xOTsgX2tleTE5KyspIHtcbiAgICBhcmdzW19rZXkxOV0gPSBhcmd1bWVudHNbX2tleTE5XTtcbiAgfVxuXG4gIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncy5jb25jYXQoW2V2ZW50LmxvZygpXSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKHJpZ2h0KSB7XG4gIGFzc2VydEV2ZW50U3RyZWFtKHJpZ2h0KTtcbiAgdmFyIGxlZnQgPSB0aGlzO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MobGVmdCwgXCJtZXJnZVwiLCBbcmlnaHRdKSwgQmFjb24ubWVyZ2VBbGwodGhpcywgcmlnaHQpKTtcbn07XG5cbkJhY29uLm1lcmdlQWxsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc3RyZWFtcyA9IGFyZ3VtZW50c1RvT2JzZXJ2YWJsZXMoYXJndW1lbnRzKTtcbiAgaWYgKHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJtZXJnZUFsbFwiLCBzdHJlYW1zKSwgZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgIHZhciBlbmRzID0gMDtcbiAgICAgIHZhciBzbWFydFNpbmsgPSBmdW5jdGlvbiAob2JzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodW5zdWJCb3RoKSB7XG4gICAgICAgICAgcmV0dXJuIG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgIGVuZHMrKztcbiAgICAgICAgICAgICAgaWYgKGVuZHMgPT09IHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHVuc3ViQm90aCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB2YXIgc2lua3MgPSBfLm1hcChzbWFydFNpbmssIHN0cmVhbXMpO1xuICAgICAgcmV0dXJuIG5ldyBCYWNvbi5Db21wb3NpdGVVbnN1YnNjcmliZShzaW5rcykudW5zdWJzY3JpYmU7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gIH1cbn07XG5cbkJhY29uLnJlcGVhdGVkbHkgPSBmdW5jdGlvbiAoZGVsYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAwO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MoQmFjb24sIFwicmVwZWF0ZWRseVwiLCBbZGVsYXksIHZhbHVlc10pLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB2YWx1ZXNbaW5kZXgrKyAlIHZhbHVlcy5sZW5ndGhdO1xuICB9KSk7XG59O1xuXG5CYWNvbi5yZXBlYXQgPSBmdW5jdGlvbiAoZ2VuZXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IDA7XG4gIHJldHVybiBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgICB2YXIgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgIHZhciB1bnN1YiA9IGZ1bmN0aW9uICgpIHt9O1xuICAgIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICByZXR1cm4gZmxhZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHN1YnNjcmliZU5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmVOZXh0KCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgIHdoaWxlIChmbGFnICYmIHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgbmV4dCA9IGdlbmVyYXRvcihpbmRleCsrKTtcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIHVuc3ViID0gbmV4dC5zdWJzY3JpYmVJbnRlcm5hbChoYW5kbGVFdmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZsYWcgPSB0cnVlO1xuICAgIH07XG4gICAgc3Vic2NyaWJlTmV4dCgpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICB9O1xuICB9KTtcbn07XG5cbkJhY29uLnJldHJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKCFfLmlzRnVuY3Rpb24ob3B0aW9ucy5zb3VyY2UpKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIidzb3VyY2UnIG9wdGlvbiBoYXMgdG8gYmUgYSBmdW5jdGlvblwiKTtcbiAgfVxuICB2YXIgc291cmNlID0gb3B0aW9ucy5zb3VyY2U7XG4gIHZhciByZXRyaWVzID0gb3B0aW9ucy5yZXRyaWVzIHx8IDA7XG4gIHZhciBtYXhSZXRyaWVzID0gb3B0aW9ucy5tYXhSZXRyaWVzIHx8IHJldHJpZXM7XG4gIHZhciBkZWxheSA9IG9wdGlvbnMuZGVsYXkgfHwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAwO1xuICB9O1xuICB2YXIgaXNSZXRyeWFibGUgPSBvcHRpb25zLmlzUmV0cnlhYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgdmFyIGZpbmlzaGVkID0gZmFsc2U7XG4gIHZhciBlcnJvciA9IG51bGw7XG5cbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcInJldHJ5XCIsIFtvcHRpb25zXSksIEJhY29uLnJlcGVhdChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdmFsdWVTdHJlYW0oKSB7XG4gICAgICByZXR1cm4gc291cmNlKCkuZW5kT25FcnJvcigpLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgZXJyb3IgPSBldmVudDtcbiAgICAgICAgICBpZiAoIShpc1JldHJ5YWJsZShlcnJvci5lcnJvcikgJiYgcmV0cmllcyA+IDApKSB7XG4gICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgIGVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaW5pc2hlZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChlcnJvcikge1xuICAgICAgdmFyIGNvbnRleHQgPSB7XG4gICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcbiAgICAgICAgcmV0cmllc0RvbmU6IG1heFJldHJpZXMgLSByZXRyaWVzXG4gICAgICB9O1xuICAgICAgdmFyIHBhdXNlID0gQmFjb24ubGF0ZXIoZGVsYXkoY29udGV4dCkpLmZpbHRlcihmYWxzZSk7XG4gICAgICByZXRyaWVzID0gcmV0cmllcyAtIDE7XG4gICAgICByZXR1cm4gcGF1c2UuY29uY2F0KEJhY29uLm9uY2UoKS5mbGF0TWFwKHZhbHVlU3RyZWFtKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZVN0cmVhbSgpO1xuICAgIH1cbiAgfSkpO1xufTtcblxuQmFjb24uc2VxdWVudGlhbGx5ID0gZnVuY3Rpb24gKGRlbGF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gMDtcbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcInNlcXVlbnRpYWxseVwiLCBbZGVsYXksIHZhbHVlc10pLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tpbmRleCsrXTtcbiAgICBpZiAoaW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbmRFdmVudCgpO1xuICAgIH1cbiAgfSkpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChjb3VudCkge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJza2lwXCIsIFtjb3VudF0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgfSBlbHNlIGlmIChjb3VudCA+IDApIHtcbiAgICAgIGNvdW50LS07XG4gICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgfVxuICB9KSk7XG59O1xuXG5CYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFVudGlsID0gZnVuY3Rpb24gKHN0YXJ0ZXIpIHtcbiAgdmFyIHN0YXJ0ZWQgPSBzdGFydGVyLnRha2UoMSkubWFwKHRydWUpLnRvUHJvcGVydHkoZmFsc2UpO1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJza2lwVW50aWxcIiwgW3N0YXJ0ZXJdKSwgdGhpcy5maWx0ZXIoc3RhcnRlZCkpO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBXaGlsZSA9IGZ1bmN0aW9uIChmKSB7XG4gIGFzc2VydE9ic2VydmFibGVJc1Byb3BlcnR5KGYpO1xuICB2YXIgb2sgPSBmYWxzZTtcblxuICBmb3IgKHZhciBfbGVuMjAgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIwID4gMSA/IF9sZW4yMCAtIDEgOiAwKSwgX2tleTIwID0gMTsgX2tleTIwIDwgX2xlbjIwOyBfa2V5MjArKykge1xuICAgIGFyZ3NbX2tleTIwIC0gMV0gPSBhcmd1bWVudHNbX2tleTIwXTtcbiAgfVxuXG4gIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJza2lwV2hpbGVcIiwgW2ZdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChvayB8fCAhZXZlbnQuaGFzVmFsdWUoKSB8fCAhZihldmVudC52YWx1ZSgpKSkge1xuICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5zbGlkaW5nV2luZG93ID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIG1pblZhbHVlcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IDAgOiBhcmd1bWVudHNbMV07XG5cbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwic2xpZGluZ1dpbmRvd1wiLCBbbiwgbWluVmFsdWVzXSksIHRoaXMuc2NhbihbXSwgZnVuY3Rpb24gKHdpbmRvdywgdmFsdWUpIHtcbiAgICByZXR1cm4gd2luZG93LmNvbmNhdChbdmFsdWVdKS5zbGljZSgtbik7XG4gIH0pLmZpbHRlcihmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPj0gbWluVmFsdWVzO1xuICB9KSk7XG59O1xuXG52YXIgc3BpZXMgPSBbXTtcbnZhciByZWdpc3Rlck9icyA9IGZ1bmN0aW9uIChvYnMpIHtcbiAgaWYgKHNwaWVzLmxlbmd0aCkge1xuICAgIGlmICghcmVnaXN0ZXJPYnMucnVubmluZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVnaXN0ZXJPYnMucnVubmluZyA9IHRydWU7XG4gICAgICAgIHNwaWVzLmZvckVhY2goZnVuY3Rpb24gKHNweSkge1xuICAgICAgICAgIHNweShvYnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlbGV0ZSByZWdpc3Rlck9icy5ydW5uaW5nO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuQmFjb24uc3B5ID0gZnVuY3Rpb24gKHNweSkge1xuICByZXR1cm4gc3BpZXMucHVzaChzcHkpO1xufTtcblxuQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uIChzZWVkKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInN0YXJ0V2l0aFwiLCBbc2VlZF0pLCB0aGlzLnNjYW4oc2VlZCwgZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICByZXR1cm4gbmV4dDtcbiAgfSkpO1xufTtcblxuQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uIChzZWVkKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInN0YXJ0V2l0aFwiLCBbc2VlZF0pLCBCYWNvbi5vbmNlKHNlZWQpLmNvbmNhdCh0aGlzKSk7XG59O1xuXG5CYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlV2hpbGUgPSBmdW5jdGlvbiAoZikge1xuICBhc3NlcnRPYnNlcnZhYmxlSXNQcm9wZXJ0eShmKTtcblxuICBmb3IgKHZhciBfbGVuMjEgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIxID4gMSA/IF9sZW4yMSAtIDEgOiAwKSwgX2tleTIxID0gMTsgX2tleTIxIDwgX2xlbjIxOyBfa2V5MjErKykge1xuICAgIGFyZ3NbX2tleTIxIC0gMV0gPSBhcmd1bWVudHNbX2tleTIxXTtcbiAgfVxuXG4gIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJ0YWtlV2hpbGVcIiwgW2ZdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5maWx0ZXIoZikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICB9XG4gICAgfSkpO1xuICB9KTtcbn07XG5cbkJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uIChkZWxheSkge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJ0aHJvdHRsZVwiLCBbZGVsYXldKSwgdGhpcy5idWZmZXJXaXRoVGltZShkZWxheSkubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbiAgfSkpO1xufTtcblxuQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInRocm90dGxlXCIsIFtkZWxheV0pLCBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgIHJldHVybiBjaGFuZ2VzLnRocm90dGxlKGRlbGF5KTtcbiAgfSk7XG59O1xuXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5maXJzdFRvUHJvbWlzZSA9IGZ1bmN0aW9uIChQcm9taXNlQ3RyKSB7XG4gIHZhciBfdGhpczEyID0gdGhpcztcblxuICBpZiAodHlwZW9mIFByb21pc2VDdHIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBQcm9taXNlQ3RyID0gUHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRoZXJlIGlzbid0IGRlZmF1bHQgUHJvbWlzZSwgdXNlIHNoaW0gb3IgcGFyYW1ldGVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZUN0cihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmV0dXJuIF90aGlzMTIuc3Vic2NyaWJlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgcmVzb2x2ZShldmVudC52YWx1ZSgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgcmVqZWN0KGV2ZW50LmVycm9yKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5PYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAoUHJvbWlzZUN0cikge1xuICByZXR1cm4gdGhpcy5sYXN0KCkuZmlyc3RUb1Byb21pc2UoUHJvbWlzZUN0cik7XG59O1xuXG5CYWNvbltcInRyeVwiXSA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEJhY29uLm9uY2UoZih2YWx1ZSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBuZXcgQmFjb24uRXJyb3IoZSk7XG4gICAgfVxuICB9O1xufTtcblxuQmFjb24udXBkYXRlID0gZnVuY3Rpb24gKGluaXRpYWwpIHtcbiAgZnVuY3Rpb24gbGF0ZUJpbmRGaXJzdChmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMjMpLCBfa2V5MjMgPSAwOyBfa2V5MjMgPCBfbGVuMjM7IF9rZXkyMysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIzXSA9IGFyZ3VtZW50c1tfa2V5MjNdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkodW5kZWZpbmVkLCBbaV0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIGZvciAodmFyIF9sZW4yMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhdHRlcm5zID0gQXJyYXkoX2xlbjIyID4gMSA/IF9sZW4yMiAtIDEgOiAwKSwgX2tleTIyID0gMTsgX2tleTIyIDwgX2xlbjIyOyBfa2V5MjIrKykge1xuICAgIHBhdHRlcm5zW19rZXkyMiAtIDFdID0gYXJndW1lbnRzW19rZXkyMl07XG4gIH1cblxuICB2YXIgaSA9IHBhdHRlcm5zLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpID4gMCkge1xuICAgIGlmICghKHBhdHRlcm5zW2ldIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICBwYXR0ZXJuc1tpXSA9IF8uYWx3YXlzKHBhdHRlcm5zW2ldKTtcbiAgICB9XG4gICAgcGF0dGVybnNbaV0gPSBsYXRlQmluZEZpcnN0KHBhdHRlcm5zW2ldKTtcbiAgICBpID0gaSAtIDI7XG4gIH1cbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcInVwZGF0ZVwiLCBbaW5pdGlhbF0uY29uY2F0KHBhdHRlcm5zKSksIEJhY29uLndoZW4uYXBwbHkoQmFjb24sIHBhdHRlcm5zKS5zY2FuKGluaXRpYWwsIGZ1bmN0aW9uICh4LCBmKSB7XG4gICAgcmV0dXJuIGYoeCk7XG4gIH0pKTtcbn07XG5cbkJhY29uLnppcEFzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4yNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMjQpLCBfa2V5MjQgPSAwOyBfa2V5MjQgPCBfbGVuMjQ7IF9rZXkyNCsrKSB7XG4gICAgYXJnc1tfa2V5MjRdID0gYXJndW1lbnRzW19rZXkyNF07XG4gIH1cblxuICB2YXIgc3RyZWFtcyA9IGFyZ3VtZW50c1RvT2JzZXJ2YWJsZXMoYXJncyk7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJ6aXBBc0FycmF5XCIsIHN0cmVhbXMpLCBCYWNvbi56aXBXaXRoKHN0cmVhbXMsIGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBfbGVuMjUgPSBhcmd1bWVudHMubGVuZ3RoLCB4cyA9IEFycmF5KF9sZW4yNSksIF9rZXkyNSA9IDA7IF9rZXkyNSA8IF9sZW4yNTsgX2tleTI1KyspIHtcbiAgICAgIHhzW19rZXkyNV0gPSBhcmd1bWVudHNbX2tleTI1XTtcbiAgICB9XG5cbiAgICByZXR1cm4geHM7XG4gIH0pKTtcbn07XG5cbkJhY29uLnppcFdpdGggPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4yNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMjYpLCBfa2V5MjYgPSAwOyBfa2V5MjYgPCBfbGVuMjY7IF9rZXkyNisrKSB7XG4gICAgYXJnc1tfa2V5MjZdID0gYXJndW1lbnRzW19rZXkyNl07XG4gIH1cblxuICB2YXIgb2JzZXJ2YWJsZXNBbmRGdW5jdGlvbiA9IGFyZ3VtZW50c1RvT2JzZXJ2YWJsZXNBbmRGdW5jdGlvbihhcmdzKTtcbiAgdmFyIHN0cmVhbXMgPSBvYnNlcnZhYmxlc0FuZEZ1bmN0aW9uWzBdO1xuICB2YXIgZiA9IG9ic2VydmFibGVzQW5kRnVuY3Rpb25bMV07XG5cbiAgc3RyZWFtcyA9IF8ubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHMudG9FdmVudFN0cmVhbSgpO1xuICB9LCBzdHJlYW1zKTtcbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcInppcFdpdGhcIiwgW2ZdLmNvbmNhdChzdHJlYW1zKSksIEJhY29uLndoZW4oc3RyZWFtcywgZikpO1xufTtcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuemlwID0gZnVuY3Rpb24gKG90aGVyLCBmKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInppcFwiLCBbb3RoZXJdKSwgQmFjb24uemlwV2l0aChbdGhpcywgb3RoZXJdLCBmIHx8IEFycmF5KSk7XG59O1xuXG5pZiAodHlwZW9mIGRlZmluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmUgIT09IG51bGwgJiYgZGVmaW5lLmFtZCAhPSBudWxsKSB7XG4gIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBCYWNvbjtcbiAgfSk7XG4gIGlmICh0eXBlb2YgdGhpcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzICE9PSBudWxsKSB7XG4gICAgdGhpcy5CYWNvbiA9IEJhY29uO1xuICB9XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlICE9PSBudWxsICYmIG1vZHVsZS5leHBvcnRzICE9IG51bGwpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBCYWNvbjtcbiAgQmFjb24uQmFjb24gPSBCYWNvbjtcbn0gZWxzZSB7XG4gICAgdGhpcy5CYWNvbiA9IEJhY29uO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTQgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxuXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaGFjayA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGxvYWRlZCA9IChoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Xml8XmMvKS50ZXN0KGRvYy5yZWFkeVN0YXRlKVxuXG5cbiAgaWYgKCFsb2FkZWQpXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKVxuICAgIGxvYWRlZCA9IDFcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICBsb2FkZWQgPyBzZXRUaW1lb3V0KGZuLCAwKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIiwiLyoqXG4gKiBNaWNyb0V2ZW50IC0gdG8gbWFrZSBhbnkganMgb2JqZWN0IGFuIGV2ZW50IGVtaXR0ZXIgKHNlcnZlciBvciBicm93c2VyKVxuICogXG4gKiAtIHB1cmUgamF2YXNjcmlwdCAtIHNlcnZlciBjb21wYXRpYmxlLCBicm93c2VyIGNvbXBhdGlibGVcbiAqIC0gZG9udCByZWx5IG9uIHRoZSBicm93c2VyIGRvbXNcbiAqIC0gc3VwZXIgc2ltcGxlIC0geW91IGdldCBpdCBpbW1lZGlhdGx5LCBubyBtaXN0ZXJ5LCBubyBtYWdpYyBpbnZvbHZlZFxuICpcbiAqIC0gY3JlYXRlIGEgTWljcm9FdmVudERlYnVnIHdpdGggZ29vZGllcyB0byBkZWJ1Z1xuICogICAtIG1ha2UgaXQgc2FmZXIgdG8gdXNlXG4qL1xuXG52YXIgTWljcm9FdmVudFx0PSBmdW5jdGlvbigpe31cbk1pY3JvRXZlbnQucHJvdG90eXBlXHQ9IHtcblx0YmluZFx0OiBmdW5jdGlvbihldmVudCwgZmN0KXtcblx0XHR0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XSA9IHRoaXMuX2V2ZW50c1tldmVudF1cdHx8IFtdO1xuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChmY3QpO1xuXHR9LFxuXHR1bmJpbmRcdDogZnVuY3Rpb24oZXZlbnQsIGZjdCl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0dGhpcy5fZXZlbnRzW2V2ZW50XS5zcGxpY2UodGhpcy5fZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZjdCksIDEpO1xuXHR9LFxuXHR0cmlnZ2VyXHQ6IGZ1bmN0aW9uKGV2ZW50IC8qICwgYXJncy4uLiAqLyl7XG5cdFx0dGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuXHRcdGlmKCBldmVudCBpbiB0aGlzLl9ldmVudHMgPT09IGZhbHNlICApXHRyZXR1cm47XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoOyBpKyspe1xuXHRcdFx0dGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKVxuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBtaXhpbiB3aWxsIGRlbGVnYXRlIGFsbCBNaWNyb0V2ZW50LmpzIGZ1bmN0aW9uIGluIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAqXG4gKiAtIHJlcXVpcmUoJ01pY3JvRXZlbnQnKS5taXhpbihGb29iYXIpIHdpbGwgbWFrZSBGb29iYXIgYWJsZSB0byB1c2UgTWljcm9FdmVudFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgc3VwcG9ydCBNaWNyb0V2ZW50XG4qL1xuTWljcm9FdmVudC5taXhpblx0PSBmdW5jdGlvbihkZXN0T2JqZWN0KXtcblx0dmFyIHByb3BzXHQ9IFsnYmluZCcsICd1bmJpbmQnLCAndHJpZ2dlciddO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICsrKXtcblx0XHRkZXN0T2JqZWN0LnByb3RvdHlwZVtwcm9wc1tpXV1cdD0gTWljcm9FdmVudC5wcm90b3R5cGVbcHJvcHNbaV1dO1xuXHR9XG59XG5cbi8vIGV4cG9ydCBpbiBjb21tb24ganNcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmICgnZXhwb3J0cycgaW4gbW9kdWxlKSl7XG5cdG1vZHVsZS5leHBvcnRzXHQ9IE1pY3JvRXZlbnRcbn1cbiIsIi8qKlxuICogUmVjb2duaXplICg6PG5hbWU+cmVnZXhwKSBmb3JtYXQgbmFtZWQgY2FwdHVyZXMuXG4gKiBhbmQgcmVwbGFjZSBleGVjIG1ldGhvZCBvZiByZXR1cm5lZCBSZWdFeHAgb2JqZWN0LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgdXNlZCB3aXRoIG5vcm1hbCBjYXB0dXJlcy5cbiAqL1xuZnVuY3Rpb24gbmFtZWQgKHJlZ2V4cCkge1xuXHR2YXIgbmFtZXMgPSBbXTtcblx0dmFyIHJldCA9IG5ldyBSZWdFeHAocmVnZXhwLnNvdXJjZS5yZXBsYWNlKC9cXCg6PChcXHcrKT4vZywgZnVuY3Rpb24gKF8sIG5hbWUpIHtcblx0XHRcdG5hbWVzLnB1c2gobmFtZSk7XG5cdFx0XHRyZXR1cm4gJygnO1xuXHRcdH0pLFxuXHRcdChyZWdleHAuZ2xvYmFsICAgICA/ICdnJyA6ICcnKSArXG5cdFx0KHJlZ2V4cC5pZ25vcmVDYXNlID8gJ2knIDogJycpICtcblx0XHQocmVnZXhwLm11bHRpbGluZSAgPyAnbScgOiAnJylcblx0KTtcblxuXHR2YXIgY2FwdHVyZXMgPSBmdW5jdGlvbiAobWF0Y2hlZCkge1xuXHRcdGlmICghbWF0Y2hlZCkgcmV0dXJuIG1hdGNoZWQ7XG5cdFx0dmFyIGNhcHR1cmVzID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IG5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgbmFtZSA9IG5hbWVzW2ldO1xuXHRcdFx0aWYgKCFjYXB0dXJlc1tuYW1lXSkgY2FwdHVyZXNbbmFtZV0gPSBbXTtcblx0XHRcdGNhcHR1cmVzW25hbWVdLnB1c2gobWF0Y2hlZFtpICsgMV0pO1xuXHRcdH1cblx0XHRtYXRjaGVkLmNhcHR1cmVzID0gY2FwdHVyZXM7XG5cdFx0bWF0Y2hlZC5jYXB0dXJlID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRcdHJldHVybiBjYXB0dXJlc1tuYW1lXVsgY2FwdHVyZXNbbmFtZV0ubGVuZ3RoIC0gMSBdO1xuXHRcdH07XG5cdFx0cmV0dXJuIG1hdGNoZWQ7XG5cdH07XG5cblx0Ly8gb3ZlcnJpZGUgUmVnRXhwI2V4ZWNcblx0cmV0LmV4ZWMgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIGNhcHR1cmVzKFJlZ0V4cC5wcm90b3R5cGUuZXhlYy5jYWxsKHRoaXMsIHN0cmluZykpO1xuXHR9O1xuXG5cdC8vIGxpa2UgU3RyaW5nI3JlcGxhY2Vcblx0cmV0LnJlcGxhY2UgPSBmdW5jdGlvbiAoc3RyaW5nLCByZXBsYWNlKSB7XG5cdFx0aWYgKHR5cGVvZiByZXBsYWNlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXBsYWNlKGNhcHR1cmVzKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UodGhpcywgcmVwbGFjZSk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiByZXQ7XG59XG5cbnRoaXMubmFtZWQgPSBuYW1lZDtcblxuIiwiLy8gYSBub2RlLmpzIG1vZHVsZSBmb3JrIG9mXG4vLyBwYXJzZVVyaSAxLjIuMlxuLy8gKGMpIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuLy8gTUlUIExpY2Vuc2Vcbi8vIHNlZTogaHR0cDovL2Jsb2cuc3RldmVubGV2aXRoYW4uY29tL2FyY2hpdmVzL3BhcnNldXJpXG4vLyBzZWU6IGh0dHA6Ly9zdGV2ZW5sZXZpdGhhbi5jb20vZGVtby9wYXJzZXVyaS9qcy9cblxuLy9mb3JrZWQgaW50byBhIG5vZGUuanMgbW9kdWxlIGJ5IGZyYW56IGVuemVuaG9mZXIgXG4gXG5cbmZ1bmN0aW9uIHBhcnNlVXJpIChzdHIpIHtcblx0dmFyXHRvICAgPSBwYXJzZVVyaS5vcHRpb25zLFxuXHRcdG0gICA9IG8ucGFyc2VyW28uc3RyaWN0TW9kZSA/IFwic3RyaWN0XCIgOiBcImxvb3NlXCJdLmV4ZWMoc3RyKSxcblx0XHR1cmkgPSB7fSxcblx0XHRpICAgPSAxNDtcblxuXHR3aGlsZSAoaS0tKSB1cmlbby5rZXlbaV1dID0gbVtpXSB8fCBcIlwiO1xuXG5cdHVyaVtvLnEubmFtZV0gPSB7fTtcblx0dXJpW28ua2V5WzEyXV0ucmVwbGFjZShvLnEucGFyc2VyLCBmdW5jdGlvbiAoJDAsICQxLCAkMikge1xuXHRcdGlmICgkMSkgdXJpW28ucS5uYW1lXVskMV0gPSAkMjtcblx0fSk7XG5cblx0cmV0dXJuIHVyaTtcbn07XG5cbnBhcnNlVXJpLm9wdGlvbnMgPSB7XG5cdHN0cmljdE1vZGU6IGZhbHNlLFxuXHRrZXk6IFtcInNvdXJjZVwiLFwicHJvdG9jb2xcIixcImF1dGhvcml0eVwiLFwidXNlckluZm9cIixcInVzZXJcIixcInBhc3N3b3JkXCIsXCJob3N0XCIsXCJwb3J0XCIsXCJyZWxhdGl2ZVwiLFwicGF0aFwiLFwiZGlyZWN0b3J5XCIsXCJmaWxlXCIsXCJxdWVyeVwiLFwiYW5jaG9yXCJdLFxuXHRxOiAgIHtcblx0XHRuYW1lOiAgIFwicXVlcnlLZXlcIixcblx0XHRwYXJzZXI6IC8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZ1xuXHR9LFxuXHRwYXJzZXI6IHtcblx0XHRzdHJpY3Q6IC9eKD86KFteOlxcLz8jXSspOik/KD86XFwvXFwvKCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKT8oKCgoPzpbXj8jXFwvXSpcXC8pKikoW14/I10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS8sXG5cdFx0bG9vc2U6ICAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS9cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVVyaSIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcblxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBsaXN0ID0gdGhpcy5tYXBbbmFtZV1cbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgIGxpc3QgPSBbXVxuICAgICAgdGhpcy5tYXBbbmFtZV0gPSBsaXN0XG4gICAgfVxuICAgIGxpc3QucHVzaCh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgICByZXR1cm4gdmFsdWVzID8gdmFsdWVzWzBdIDogbnVsbFxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSB8fCBbXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IFtub3JtYWxpemVWYWx1ZSh2YWx1ZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1hcCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLm1hcFtuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpXG4gICAgICB9LCB0aGlzKVxuICAgIH0sIHRoaXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAvLyBPbmx5IHN1cHBvcnQgQXJyYXlCdWZmZXJzIGZvciBQT1NUIG1ldGhvZC5cbiAgICAgICAgLy8gUmVjZWl2aW5nIEFycmF5QnVmZmVycyBoYXBwZW5zIHZpYSBCbG9icywgaW5zdGVhZC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIHJldHVybiByZWplY3RlZCA/IHJlamVjdGVkIDogUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuICAgIGlmIChSZXF1ZXN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGlucHV0KSkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IGlucHV0XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMpXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhlYWRlcnMoeGhyKSB7XG4gICAgdmFyIGhlYWQgPSBuZXcgSGVhZGVycygpXG4gICAgdmFyIHBhaXJzID0gKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJykudHJpbSgpLnNwbGl0KCdcXG4nKVxuICAgIHBhaXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICB2YXIgc3BsaXQgPSBoZWFkZXIudHJpbSgpLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBzcGxpdC5zaGlmdCgpLnRyaW0oKVxuICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignOicpLnRyaW0oKVxuICAgICAgaGVhZC5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICB9KVxuICAgIHJldHVybiBoZWFkXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgIH1cblxuICAgIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xuICAgIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXNcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gb3B0aW9ucy5zdGF0dXNUZXh0XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycyA/IG9wdGlvbnMuaGVhZGVycyA6IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKVxuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH1cblxuICBSZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIHZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XVxuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH1cblxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzXG4gIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3RcbiAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlXG5cbiAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcXVlc3RcbiAgICAgIGlmIChSZXF1ZXN0LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGlucHV0KSAmJiAhaW5pdCkge1xuICAgICAgICByZXF1ZXN0ID0gaW5wdXRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdClcbiAgICAgIH1cblxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIGZ1bmN0aW9uIHJlc3BvbnNlVVJMKCkge1xuICAgICAgICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIpIHtcbiAgICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVVJMXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdm9pZCBzZWN1cml0eSB3YXJuaW5ncyBvbiBnZXRSZXNwb25zZUhlYWRlciB3aGVuIG5vdCBhbGxvd2VkIGJ5IENPUlNcbiAgICAgICAgaWYgKC9eWC1SZXF1ZXN0LVVSTDovbS50ZXN0KHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkpIHtcbiAgICAgICAgICByZXR1cm4geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzKHhociksXG4gICAgICAgICAgdXJsOiByZXNwb25zZVVSTCgpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxuXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG4gICAgICB9KVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxuICAgIH0pXG4gIH1cbiAgc2VsZi5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKTtcbiIsImltcG9ydCBNaWNyb0V2ZW50IGZyb20gJ21pY3JvZXZlbnQnO1xuXG5leHBvcnQgY29uc3QgRVZFTlRTID0ge1xuXHRTVEFURV9QVVNIRUQ6ICdwdXNoc3RhdGUnLFxuXHRTVEFURV9QT1BQRUQ6ICdwb3BzdGF0ZSdcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBIaXN0b3J5QVBJKCkge1xuICAgIGxldCBldmVudEJ1cyA9IG5ldyBNaWNyb0V2ZW50KCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdGV2dC5sb2NhdGlvbiA9IGdldExvY2F0aW9uSW5mbygpO1xuXHRcdGV2ZW50QnVzLnRyaWdnZXIoRVZFTlRTLlNUQVRFX1BPUFBFRCwgZXZ0KTtcblx0fSk7XG5cblx0dGhpcy5wdXNoU3RhdGUgPSBmdW5jdGlvbiBwdXNoU3RhdGUoc3RhdGU9bnVsbCwgdGl0bGU9bnVsbCwgdXJsKSB7XG5cdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTtcblxuXHRcdGV2ZW50QnVzLnRyaWdnZXIoRVZFTlRTLlNUQVRFX1BVU0hFRCwge1xuXHRcdFx0c3RhdGUsXG5cdFx0XHR0aXRsZSxcblx0XHRcdHVybCxcblx0XHRcdGxvY2F0aW9uOiBnZXRMb2NhdGlvbkluZm8oKVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0dGhpcy5iYWNrID0gZnVuY3Rpb24gYmFjaygpIHtcblx0XHR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0dGhpcy5mb3J3YXJkID0gZnVuY3Rpb24gZm9yd2FyZCgpIHtcblx0XHR3aW5kb3cuaGlzdG9yeS5mb3J3YXJkKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0dGhpcy5nbyA9IGZ1bmN0aW9uIGdvKG51bSkge1xuXHRcdHdpbmRvdy5oaXN0b3J5LmdvKG51bSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0dGhpcy5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50SWQsIGZuKSB7XG5cdFx0cmV0dXJuIGV2ZW50QnVzLmJpbmQoZXZlbnRJZCwgZm4pO1xuXHR9O1xuXG5cdHRoaXMub25QdXNoU3RhdGUgPSBmdW5jdGlvbiBvblB1c2hTdGF0ZShmbikge1xuXHRcdHJldHVybiBldmVudEJ1cy5iaW5kKEVWRU5UUy5TVEFURV9QVVNIRUQsIGZuKTtcblx0fTtcblxuXHR0aGlzLm9uUG9wU3RhdGUgPSBmdW5jdGlvbiBvblBvcFN0YXRlKGZuKSB7XG5cdFx0cmV0dXJuIGV2ZW50QnVzLmJpbmQoRVZFTlRTLlNUQVRFX1BPUFBFRCwgZm4pO1xuXHR9O1xuXG5cdHRoaXMub2ZmID0gZnVuY3Rpb24gb2ZmKGV2ZW50SWQsIGZuKSB7XG5cdFx0ZXZlbnRCdXMudW5iaW5kKGV2ZW50SWQsIGZuKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0TG9jYXRpb25JbmZvKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhyZWYgICAgIDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG5cdFx0cGF0aG5hbWUgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG5cdFx0c2VhcmNoICAgOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLFxuXHRcdGhhc2ggICAgIDogd2luZG93LmxvY2F0aW9uLmhhc2hcblx0fTtcbn1cbiIsImltcG9ydCBkb21yZWFkeSBmcm9tICdkb21yZWFkeSc7XG5pbXBvcnQgJ3doYXR3Zy1mZXRjaCc7XG5pbXBvcnQgTWljcm9FdmVudCBmcm9tICdtaWNyb2V2ZW50JztcblxuaW1wb3J0IHsgSGlzdG9yeUFQSSB9IGZyb20gJy4vaGlzdG9yeSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEVWRU5UUyB9IGZyb20gJy4vcm91dGVyJztcblxuLyoqXG4gKiBHbG9iYWwgQXBwbGljYXRpb24gQ29udGV4dFxuICovXG53aW5kb3cuQVBQID0ge1xuICAgIGhpc3RvcnkgIDogbmV3IEhpc3RvcnlBUEkoKSxcbiAgICBldmVudEJ1cyA6IG5ldyBNaWNyb0V2ZW50KCksXG5cbiAgICBFVkVOVFM6IHtcbiAgICAgICAgVVJMX0NIQU5HRV9SRVFVRVNURURfRlJPTV9ST1VURVIgICAgOiAndXJsX2NoYW5nZV9yZXF1ZXN0ZWRfZnJvbV9yb3V0ZXInLFxuICAgICAgICBVUkxfQ0hBTkdFX1JFUVVFU1RFRF9GUk9NX0NPTVBPTkVOVCA6ICd1cmxfY2hhbmdlX3JlcXVlc3RlZF9mcm9tX2NvbXBvbmVudCdcbiAgICB9XG59O1xuXG5cbmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdmcm9tQm9udXNlcycpO1xuXG5kb21yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHJvdXRlciA9IG5ldyBSb3V0ZXIoe1xuICAgICAgICBldmVudEJ1cyA6IEFQUC5ldmVudEJ1cyxcblxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgIGVycm9yIDogZXJyb3JUb1N0YXRlXG4gICAgICAgIH0sXG5cbiAgICAgICAgcm91dGVzOiB7XG4gICAgICAgICAgICAnL2V4Y2hhbmdlLyg6PGFwcElkPlswLTldKykvPyc6IHNob3dFeGNoYW5nZSxcblxuICAgICAgICAgICAgJy8/Jzogc2hvd0JvbnVzZXMsXG5cbiAgICAgICAgICAgICcvc2lnbi1pbi8/Jzoge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIC8vINGB0L7QsdGL0YLQuNC1LdGE0YPQvdC60YbQuNGPINC00L7Qu9C20L3QviDQstC+0LfQstGA0LDRidCw0YLRjCBVUkwsINCwINC90LUg0YDQtdCz0YPQu9GP0YDQutGDIHN0YXRlJ9CwLlxuICAgICAgICAgICAgICAgICAgICAvLyDQoNC+0YPRgtC10YAg0YHQsNC8INC90LDQudC00LXRgiDRgdC+0L7RgtCyLiDRgdC+0YHRgtC+0Y/QvdC40LUuXG4gICAgICAgICAgICAgICAgICAgICdib251c2VzLXJlZmVycmVyLWF1dGhvcml6ZWQnIDogKHsgcXVlcnksIHRva2VuIH0pID0+IGAvJHtxdWVyeX0jdG9rZW49JHt0b2tlbn1gLFxuICAgICAgICAgICAgICAgICAgICAncmVndWxsYXItdXNlci1hdXRob3JpemVkJyA6ICcvc3VjY2VzcydcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgY29taW5nOiBzaG93U2lnbkluXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAnL3N1Y2Nlc3MvPyc6IHNob3dTdWNjZXNzLFxuXG4gICAgICAgICAgICAnLzQwNC8/Jzogc2hvd05vdEZvdW5kLFxuXG4gICAgICAgICAgICAnL21haW50ZW5hbmNlLz8nOiBzaG93TWFpbnRlbmFuY2VcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGx1Z0luUm91dGVyLmNhbGwoQVBQLCByb3V0ZXIpOyAvLyDQv9C+0LTQutC70Y7Rh9Cw0LXRgiDRgNC+0YPRgtC10YAg0Log0LrQvtC90YLQtdC60YHRgtGDXG4gICAgcm91dGVyLnN0YXJ0KCk7XG59KTtcblxuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBlcnJvclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yLmNvZGVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZXJyb3JUb1N0YXRlICh7IGNvZGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIDQwNDogJy80MDQvJyxcbiAgICAgICAgLy8gLi4uIG90aGVyIGVycnJvcnNcbiAgICB9W2NvZGVdIHx8ICcvbWFpbnRlbmFuY2UvJztcbn1cblxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g0YDQtdC90LTQtdGA0LXRgNGLINGN0LrRgNCw0L3QvtCyIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5mdW5jdGlvbiBzaG93Qm9udXNlcygpIHtcbiAgICBlbWJlZFNjcmVlbihbXG4gICAgICAgICc8aDE+Qm9udXNlczwvaDE+JyxcbiAgICAgICAgJzxkaXYgaWQ9XCJzaWduLWluXCIgY2xhc3M9XCJMaW5rXCIgZGF0YS1ocmVmPVwiL3NpZ24taW5cIj5TaWduIEluPC9kaXY+JyxcbiAgICAgICAgJzxicj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cIkxpbmtcIiBkYXRhLWhyZWY9XCIvZXhjaGFuZ2UvMTAwL1wiPmV4Y2hhbmdlPC9kaXY+J1xuICAgIF0uam9pbignXFxuJykpO1xuXG4gICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyNzaWduLWluJylcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zyb21Cb251c2VzJywgdHJ1ZSk7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93U2lnbkluKHBheWxvYWQpIHtcbiAgICBsZXQgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuXG4gICAgZW1iZWRTY3JlZW4oW1xuICAgICAgICAnPGgxPlNpZ24gSW48L2gxPicsXG4gICAgICAgICc8YnV0dG9uIGlkPVwic2lnbi1pblwiPlNpZ24gSW48L2J1dHRvbj4nXG4gICAgXS5qb2luKCdcXG4nKSk7XG5cbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcignI3NpZ24taW4nKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNGcm9tQm9udXNlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmcm9tQm9udXNlcycpO1xuXG4gICAgICAgICAgICBpZiAoaXNGcm9tQm9udXNlcykge1xuICAgICAgICAgICAgICAgIC8vINCX0LTQtdGB0Ywg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9GA0L7QvNC10LbRg9GC0L7Rh9C90LDRjyBldmVudEJ1cy5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZSgnYm9udXNlcy1yZWZlcnJlci1hdXRob3JpemVkJywgeyB0b2tlbjogJzQyJywgcXVlcnkgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlKCdyZWd1bGxhci11c2VyLWF1dGhvcml6ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNob3dFeGNoYW5nZShwYXlsb2FkKSB7XG4gICAgcmV0dXJuIGZldGNoKCcvdGVtcGxhdGVzL2V4Y2hhbmdlLm1zdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0FjY2VwdCc6ICdodG1sJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJ1xuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihyZXNwID0+IHJlc3AudGV4dCgpKVxuICAgIC50aGVuKHRleHQgPT4gdGV4dC5yZXBsYWNlKCd7QVBQX0lEfScsIHBheWxvYWQuYXBwSWQpKVxuICAgIC50aGVuKGVtYmVkU2NyZWVuKTtcbn1cblxuZnVuY3Rpb24gc2hvd1N1Y2Nlc3MoKSB7XG4gICAgZW1iZWRTY3JlZW4oW1xuICAgICAgICAnPGgxPkNvbmdyYXR1bGF0aW9uITwvaDE+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJMaW5rXCIgZGF0YS1ocmVmPVwiL1wiPkNoZWNrIEJvbnVzZXM8L2Rpdj4nXG4gICAgXS5qb2luKCdcXG4nKSk7XG59XG5cbmZ1bmN0aW9uIHNob3dOb3RGb3VuZCgpIHtcbiAgICBlbWJlZFNjcmVlbihbXG4gICAgICAgICc8aDE+UGFnZSBub3QgZm91bmQ8L2gxPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiTGlua1wiIGRhdGEtaHJlZj1cIi9zaWduLWluXCI+VHJ5IHRvIHNpZ24gaW48L2Rpdj4nXG4gICAgXS5qb2luKCdcXG4nKSk7XG59XG5cblxuZnVuY3Rpb24gc2hvd01haW50ZW5hbmNlKCkge1xuICAgIGVtYmVkU2NyZWVuKFtcbiAgICAgICAgJzxoMT5TZXJ2ZXIgZXJyb3I8L2gxPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiTGlua1wiIGRhdGEtaHJlZj1cIi9zaWduLWluXCI+VHJ5IHRvIHNpZ24gaW48L2Rpdj4nXG4gICAgXS5qb2luKCdcXG4nKSk7XG59XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcItCy0LXQsS3QutC+0LzQv9C+0L3QtdC90YLRi1wiIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIGVtYmVkU2NyZWVuKGh0bWwpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykuaW5uZXJIVE1MID0gaHRtbDtcbiAgICBydW5MaW5rcyhBUFAuZXZlbnRCdXMpO1xufVxuXG5cbmZ1bmN0aW9uIHJ1bkxpbmtzKGV2ZW50QnVzKSB7XG4gICAgbGV0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkxpbmsnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGVsZW0gPSBsaW5rc1tpXTtcblxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8g0JrQvtC80L/QvtC90LXQvdGC0Ysg0YHQuNGB0YLQtdC80Ysg0L3QtSDQvtCx0YDQsNGJ0LDRjtGC0YHRjyDQuiDRgNC+0YPRgtC10YDRgyDQvdCw0L/RgNGP0LzRg9GOLFxuICAgICAgICAgICAgLy8g0LAg0YfQtdGA0LXQtyDQv9GA0L7QvNC10LbRg9GC0L7Rh9C90YPRjiDRiNC40L3Rgy5cbiAgICAgICAgICAgIC8vINCt0YLQviDQv9C+0LfQstC+0LvQuNGC0Ywg0LTQtdGA0LbQsNGC0Ywg0LLRgdC1INGB0LLRj9C30Lgg0YDQvtGD0YLQtdGA0LAg0YEg0YHQuNGB0YLQtdC80L7QuSDQsiDQvtC00L3QvtC8INC80LXRgdGC0LUsXG4gICAgICAgICAgICAvLyDRh9GC0L4sINC/0L4g0LjQtNC10LUsINC00L7Qu9C20L3QviDQv9C+0LLRi9GB0LjRgtGMINGD0L/RgNCw0LLQu9GP0LXQvNC+0YHRgtGMINC60L7QtNC+0LwuXG4gICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKFxuICAgICAgICAgICAgICAgIEFQUC5FVkVOVFMuVVJMX0NIQU5HRV9SRVFVRVNURURfRlJPTV9DT01QT05FTlQsXG4gICAgICAgICAgICAgICAgeyB1cmw6IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWhyZWYnKSB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0g0KFvbnRleHQtPlJvdXRlciBHbHVlIC0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8g0K3RgtCwINGE0YPQvdC60YbQuNGPIC0g0YfQsNGB0YLRjCBcItCx0LjQsdC70LjQvtGC0LXRh9C90L7Qs9C+XCIg0YDQtdGI0LXQvdC40Y8sXG4vLyDRgtCw0Log0YfRgtC+INC10ZEg0L3QtSDQvdGD0LbQvdC+INCx0YPQtNC10YIg0YDQtdCw0LvQuNC30L7QstGL0LLQsNGC0Ywg0LrQsNC20LTRi9C5INGA0LDQt1xuZnVuY3Rpb24gcGx1Z0luUm91dGVyKHJvdXRlcikge1xuICAgIC8qKlxuICAgICAqINCe0LHRgNCw0LHQvtGC0LrQsCDRgdC70YPRh9Cw0LXQsiwg0LrQvtCz0LTQsCDQuNC30LzQtdC90LXQvdC40LUgbG9jYXRpb24uaHJlZiDQv9GA0L7QuNGB0YXQvtC00LjRglxuICAgICAqINC90LUg0L/QviDQuNC90LjRhtC40LDRgtC40LLQtSDRgNC+0YPRgtC10YDQsDpcbiAgICAgKiAgIC0g0LrQvdC+0L/QutC4IFwi0J3QsNC30LDQtFwiL1wi0JLQv9C10YDQtdC0XCJcbiAgICAgKiAgIC0g0LrQsNC60LjQtS3RgtC+INC60L7QvNC/0L7QvdC10L3RgtGLLCDQvdCw0L/RgNGP0LzRg9GOINCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0Y7RidC4INGBINC40YHRgtC+0YDQuNC10LkuXG4gICAgICovXG4gICAgdGhpcy5ldmVudEJ1cy5iaW5kKEFQUC5FVkVOVFMuVVJMX0NIQU5HRV9SRVFVRVNURURfRlJPTV9DT01QT05FTlQsICh7IHVybCB9KSA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdXJsKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaGlzdG9yeS5vblBvcFN0YXRlKCgpICA9PiB7IHJvdXRlci5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaHJlZik7IH0pO1xuICAgIHRoaXMuaGlzdG9yeS5vblB1c2hTdGF0ZSgoKSA9PiB7IHJvdXRlci5yb3V0ZSh3aW5kb3cubG9jYXRpb24uaHJlZik7IH0pO1xuXG4gICAgLyoqXG4gICAgICog0J7QsdGA0LDQsdC+0YLQutCwINGB0LvRg9GH0LDQtdCyLCDQutC+0LPQtNCwINC40LfQvNC10L3QtdC90LjQtSBsb2NhdGlvbi5ocmVmINC/0YDQvtC40YHRhdC+0LTQuNGCXG4gICAgICog0L/QviDQuNC90LjRhtC40LDRgtC40LLQtSDRgNC+0YPRgtC10YDQsDpcbiAgICAgKiAgIC0g0L7QsdGA0LDQsdC+0YLQutCwINGB0L7QsdGL0YLQuNC5ICjQvdC1IGBuYXZpZ2F0aW9uYCksINCy0YvQt9Cy0LDQvdC90YvRhSDRh9C10YDQtdC3IGByb3V0ZXIuaGFuZGxlKClgXG4gICAgICovXG4gICAgdGhpcy5ldmVudEJ1cy5iaW5kKEFQUC5FVkVOVFMuVVJMX0NIQU5HRV9SRVFVRVNURURfRlJPTV9ST1VURVIsICh7IHVybCB9KSA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdXJsKTtcbiAgICB9KTtcbn1cbiIsIi8qKlxuICog0KDQvtGD0YLQtdGALlxuICpcbiAqINCf0L4g0YHQstC+0LXQuSDRgdGD0YLQuCAtINCz0LXQvdC10YDQsNGC0L7RgCDQutC+0L3RhNC40LPQsCDQtNC70Y8gS3Jpc3RpLkF1dG9tYXRvbixcbiAqINC/0LvRjtGBINC30LDQv9GD0YHQutCw0YLQvtGAIGBjb21pbmdgLdC+0LIuXG4gKlxuICog0KDQvtGD0YLQtdGALCDQvdCwINGC0LXQutGD0YnQuNC5INC80L7QvNC10L3RgiDRg9C80LXQtdGCOlxuICogICAtINGB0L7Qv9C+0YHRgtCw0LLQu9GP0YLRjCBVUkwsINC60L7RgtC+0YDRi9C5INC90YPQttC90L4g0L7RgtGA0L7Rg9GC0LjRgtGMLCDRgSDQvtC/0LjRgdCw0L3QuNC10Lwg0YDQvtGD0YLQsCDQsiDQstC40LTQtSBSZWdFeHBcbiAqICAgLSDRgdC+0L/QvtGB0YLQsNCy0LvRj9GC0Ywg0YfQsNGB0YLQuCBVUkwg0YEg0LjQvNC10L3QvtCy0LDQvdC90YvQvNC4INCz0YDRg9C/0L/QsNC80Lgg0LIgUmVnRXhwLCDQuCDQv9C10YDQtdC00LDQstCw0YLRjFxuICogICAgINCyINC+0LHRgNCw0LHQvtGC0YfQuNC6LCDQsiDQstC40LTQtSDQvtCx0YrQtdC60YLQsCB7IGdyb3VwTmFtZSA6IGRhdGFGcm9tVXJsIH1cbiAqICAgLSDRgdC+0YXRgNCw0L3Rj9GC0Ywg0L/QvtGB0YLRg9C/0LDRidC40LUg0LIg0YDQvtGD0LXRgtGAINGB0L7QsdGL0YLQuNGPINC90LDQstC40LPQsNGG0LjQuCDQsiDQvtGH0LXRgNC10LTRjCDQuCDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0YxcbiAqICAgICDQuNGFINC/0L7RgdC70LXQtNC+0LLQsNGC0LXQu9GM0L3QvlxuICogICAtINC/0LDRgNGB0LjRgtGMIFVSTCwg0L/QviDQutC+0YLQvtGA0L7QvNGDINGC0YDQtdCx0YPQtdGC0YHRjyDQvtGB0YPRidC10YHRgtCy0LjRgtGMINC/0LXRgNC10YXQvtC0LCDQuCDQv9C10YDQtdC00LDQstCw0YLRjFxuICogICAgINCyINC+0LHRgNCw0LHQvtGC0YfQuNC6INC40L3RhNC+0YDQvNCw0YbQuNGOINC+IHF1ZXJ5LdC/0LDRgNCw0LzQtdGC0YDQsNGFLCDQsiDRg9C00L7QsdC90L7QuSDRhNC+0YDQvNC1ICjQvtCx0YrQtdC60YIpLlxuICovXG5cbmltcG9ydCBCYWNvbiBmcm9tICdiYWNvbmpzJztcbmltcG9ydCB7IG5hbWVkIH0gZnJvbSAnbmFtZWQtcmVnZXhwJztcbmltcG9ydCBwYXJzZVVyaSBmcm9tICdwYXJzZVVyaSc7XG5cbmltcG9ydCB7IEF1dG9tYXRvbiwgRVZFTlRTIGFzIEtSSVNUSV9FVkVOVFMgfSBmcm9tICdrcmlzdGknO1xuaW1wb3J0ICogYXMgS3Jpc3RpIGZyb20gJ2tyaXN0aSc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVFMgPSB7XG4gICAgTkFWSUdBVElPTjogJ25hdmlnYXRpb24nXG59O1xuXG5jb25zdCBJTklUSUFMSVpBVElPTiA9ICctLWluaXRpYWxpemF0aW9uLS0nO1xuXG5leHBvcnQgZnVuY3Rpb24gUm91dGVyIChjb25maWcpIHtcbiAgICBsZXQgeyBldmVudHMsIHJvdXRlcyB9ID0gY29uZmlnO1xuICAgIGxldCBlbmhhbmNlZFJvdXRlcyAgICAgPSBPYmplY3QuYXNzaWduKHJvdXRlcywgeyBbSU5JVElBTElaQVRJT05dOiB7fSB9KTtcblxuICAgIGxldCBjb21wbGV0ZUV2ZW50cyA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50cywge1xuICAgICAgICBbRVZFTlRTLk5BVklHQVRJT05dIDogKHsgdXJsIH0pID0+IHVybFxuICAgIH0pO1xuXG4gICAgbGV0IGZzbVNjaGVtYSA9IE9iamVjdFxuICAgICAgICAua2V5cyhlbmhhbmNlZFJvdXRlcylcbiAgICAgICAgLm1hcCgoa2V5KSA9PiBba2V5LCBlbmhhbmNlZFJvdXRlc1trZXldXSlcbiAgICAgICAgLnJlZHVjZSgoYWNjLCBba2V5LCBzdGF0ZV0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFjYywgeyBba2V5XSA6IHN0YXRlRXZlbnRzKHN0YXRlLCBjb21wbGV0ZUV2ZW50cykgfSk7XG4gICAgICAgIH0sIHt9KTtcblxuICAgIGZ1bmN0aW9uIHN0YXRlRXZlbnRzKHsgdHJhbnNpdGlvbnM9e30gfSwgZXZlbnRzPXt9KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0cmFuc2l0aW9ucywgZXZlbnRzKTtcbiAgICB9XG5cblxuICAgIC8vID09PT09PT09PT09PT09IEluaXRpYWxpemF0aW9uID09PT09PT09PT09PT09IC8vXG5cbiAgICBsZXQgZnNtID0gbmV3IEF1dG9tYXRvbihmc21TY2hlbWEsIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0KTRg9C90LrRhtC40Y8gYG5leHRTdGF0ZWAsINC40YHQv9C+0LvRjNC30YPQtdC80LDRjyDQsiBBdXRvbWF0b24g0L/Qvi3Rg9C80L7Qu9GH0LDQvdC40Y4sXG4gICAgICAgICAqINC90LUg0YPQvNC10LXRgiDQv9Cw0YDRgdC40YLRjCDRgNC10LPRg9C70Y/RgNC90YvQtSDQstGL0YDQsNC20LXQvdC40Y8g0YEg0LjQvNC10L3QvtCy0LDQvdC90YvQvNC4INCz0YDRg9C/0L/QsNC80LguXG4gICAgICAgICAqINCf0LXRgNC10LPRgNGD0LbQsNC10Lwg0LXRkSDRhNGD0L3QutGG0LjQtdC5LCDQutC+0YLQvtGA0LDRjyDRg9C80LXQtdGCINGN0YLQvi5cbiAgICAgICAgICovXG4gICAgICAgIG5leHRTdGF0ZTogZnVuY3Rpb24gbmV4dFN0YXRlKHNjaGVtYSwgc3RhdGVJZCwgZXZlbnRJZCwgcGF5bG9hZD17fSkge1xuICAgICAgICAgICAgLy8gMS4g0J/QvtC70YPRh9C10L3QuNC1INGG0LXQu9C10LLQvtCz0L4gVVJMXG4gICAgICAgICAgICBsZXQgdXJsID0gS3Jpc3RpLnN0YXRlRXZlbnRWYWx1ZShzY2hlbWEsIHN0YXRlSWQsIGV2ZW50SWQsIHBheWxvYWQpO1xuXG4gICAgICAgICAgICAvLyAyLiDQn9C+0LvRg9GH0LXQvdC40LUg0YbQtdC70LXQstC+0LPQviBzdGF0ZUlkXG4gICAgICAgICAgICBsZXQgcGF0aG5hbWUgPSBwYXJzZVVyaSh1cmwpLnBhdGg7XG4gICAgICAgICAgICBsZXQgeyByb3V0ZSwgZGF0YSB9ID0gbWF0Y2hSb3V0ZShwYXRobmFtZSwgT2JqZWN0LmtleXMocm91dGVzKSk7XG5cbiAgICAgICAgICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoYFJvdXRlICR7cm91dGV9IGlzIG5vdCBmb3VuZGApO1xuXG4gICAgICAgICAgICAgICAgZXJyb3IuY29kZSA9IDQwNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dFN0YXRlKHNjaGVtYSwgc3RhdGVJZCwgJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5leHRTdGF0ZUlkICAgOiByb3V0ZSxcbiAgICAgICAgICAgICAgICBuZXh0U3RhdGVEYXRhIDogT2JqZWN0LmFzc2lnbih7fSwgcGF5bG9hZCwgZGF0YSwgeyB1cmwgfSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgbGV0IHRyYW5zaXRpb25zID0gZnNtXG4gICAgICAgIC5zdHJlYW1UaHJvdWdoKEJhY29uRHJpdmVyKVxuICAgICAgICAudHJhbnNpdGlvbnNcbiAgICAgICAgLmZpbHRlcigoeyB0byB9KSA9PiB0byAhPT0gSU5JVElBTElaQVRJT04pO1xuXG5cbiAgICAvKipcbiAgICAgKiBSb3V0aW5nXG4gICAgICovXG4gICAgbGV0IG5hdmlnYXRpb25zID0gdHJhbnNpdGlvbnNcbiAgICAgICAgLmZpbHRlcigoeyBldmVudCB9KSA9PiBldmVudCA9PT0gRVZFTlRTLk5BVklHQVRJT04pXG4gICAgICAgIC5tYXAoKGVudmVsb3BlKSA9PiB7XG4gICAgICAgICAgICBsZXQgeyB0bywgcGF5bG9hZCB9ID0gZW52ZWxvcGU7XG4gICAgICAgICAgICBsZXQgbG9jYXRpb24gICAgICAgID0gcGFyc2VVcmkocGF5bG9hZC51cmwpO1xuICAgICAgICAgICAgbGV0IHsgZGF0YSB9ICAgICAgICA9IG1hdGNoUm91dGUobG9jYXRpb24ucGF0aCwgT2JqZWN0LmtleXMocm91dGVzKSk7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBlbnZlbG9wZSwgeyBwYXlsb2FkOiBkYXRhLCBsb2NhdGlvbiB9KTtcbiAgICAgICAgfSk7XG5cbiAgICBsZXQgb3RoZXJUcmFuc2l0aW9ucyA9IHRyYW5zaXRpb25zXG4gICAgICAgIC5maWx0ZXIoKHsgZXZlbnQgfSkgPT4gZXZlbnQgIT09IEVWRU5UUy5OQVZJR0FUSU9OKTtcblxuXG4gICAgLyoqXG4gICAgICog0JTQu9GPINC70Y7QsdC+0LPQviDQv9C10YDQtdGF0L7QtNCwINCyINC90L7QstC+0LUg0YHQvtGB0YLQvtGP0L3QuNC1XG4gICAgICog0L3Rg9C20L3QviDQstGL0L/QvtC70L3QuNGC0YwgYHN3aXRjaFJvdGVgLFxuICAgICAqINC90L4g0LfQsNC/0YDQvtGBINC90LAg0L7QsdC90L7QstC70LXQvdC40LUgaGlzdG9yeSDQvdGD0LbQtdC90YIg0YLQvtC70YzQutC+INC00LvRj1xuICAgICAqINC90LUtbmF2aWdhdGlvbiDRgdC+0LHRi9GC0LjQuSwg0YIu0LouIG5hdmlnYXRpb24t0YHQvtCx0YvRgtC40LUgLVxuICAgICAqINGN0YLQviDQuCDRgtCw0Log0YDQtdCw0LrRhtC40Y8g0L3QsCDRg9C20LUg0L7QsdC90L7QstC40LLRiNGD0Y7RgdGPIGhpc3RvcnkuXG4gICAgICovXG5cbiAgICBuYXZpZ2F0aW9uc1xuICAgICAgICAubWVyZ2Uob3RoZXJUcmFuc2l0aW9ucylcbiAgICAgICAgLm9uVmFsdWUoc3dpdGNoUm91dGUuYmluZCh0aGlzKSk7XG5cblxuICAgIG90aGVyVHJhbnNpdGlvbnNcbiAgICAgICAgLm9uVmFsdWUoKHsgZnJvbSwgdG8sIGV2ZW50LCBwYXlsb2FkIH0pID0+IHtcbiAgICAgICAgICAgIGNvbmZpZy5ldmVudEJ1cy50cmlnZ2VyKCd1cmxfY2hhbmdlX3JlcXVlc3RlZF9mcm9tX3JvdXRlcicsIHBheWxvYWQpO1xuICAgICAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgICogTG9nc1xuICAgICAqL1xuICAgIHRyYW5zaXRpb25zXG4gICAgICAgIC5tYXAoKHgpID0+IHgpIC8vINGE0L7RgNC60LDQtdC8INC90L7QstGL0Lkg0YHRgtGA0LjQvFxuICAgICAgICAub25WYWx1ZSgoeyBmcm9tLCB0bywgZXZlbnQsIHBheWxvYWQgfSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFwiJHtmcm9tfVwiID09PiBcIiR7dG99XCIgYnkgXCIke2V2ZW50fVwiYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuICAgICAgICB9KTtcblxuICAgIGZzbS5zdGFydFdpdGgoSU5JVElBTElaQVRJT04pO1xuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09IFB1YmxpYyBBUEkgPT09PT09PT09PT09PT09PSAvL1xuXG4gICAgLyoqXG4gICAgICog0J/RgNC4INC30LDQv9GD0YHQutC1INCg0L7Rg9GC0LXRgNCwLCDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQvNCw0YLRh9C40Lwg0YLQtdC60YPRidC40LkgbG9jYXRpby5ocmVmXG4gICAgICog0L3QsCDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC40Lkg0YDQvtGD0YIg0LjQtyDQutC+0L3RhNC40LPRg9GA0LDRhtC40LguXG4gICAgICovXG4gICAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmc20uaGFuZGxlKEVWRU5UUy5OQVZJR0FUSU9OLCB7IHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICB0aGlzLmhhbmRsZSA9IGZ1bmN0aW9uKGV2ZW50SWQsIHBheWxvYWQpIHtcbiAgICAgICAgZnNtLmhhbmRsZShldmVudElkLCBwYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHRoaXMucm91dGUgPSBmdW5jdGlvbih1cmwsIHBheWxvYWQ9e30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlKEVWRU5UUy5OQVZJR0FUSU9OLCBPYmplY3QuYXNzaWduKHt9LCBwYXlsb2FkLCB7IHVybCB9KSk7XG4gICAgfTtcblxuICAgIC8vID09PT09PT09PT09PT09PT09PSBUb29scyA9PT09PT09PT09PT09PT09PT09IC8vXG5cbiAgICAvKipcbiAgICAgKiDQntCx0LXRgdC/0LXRh9C40LLQsNC10YIg0LLRi9C30L7QsiBgY29taW5nYCDRgNC+0YPRgtCwLCDRgSDQvdCw0LHQvtGA0L7QvCDQsNGA0LPRg9C80LXQvdGC0L7QsixcbiAgICAgKiDRgdC+0LPQu9Cw0YHQvdC+INC60L7QvdGC0YDQsNC60YLQsC5cbiAgICAgKiDQrdGC0LAg0L/RgNC+0YbQtdC00YPRgNCwINCy0YvQt9GL0LLQsNC10YLRgdGPINC00LvRjyDQu9GO0LHQvtCz0L4g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPINGA0L7Rg9GC0LAsXG4gICAgICog0L3QtSDRgtC+0LvRjNC60L4g0LTQu9GPIG5hdmlnYXRpb24t0L/QtdGA0LXRhdC+0LTQvtCyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSB0cmFuc2l0aW9uIHN0YXJ0IHN0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvIC0gdHJhbnNpdGlvbiB0YXJnZXQgc3RhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBuYW1lIG9mIGV2ZW50LCB3aGljaCB0cmlnZ2VyZWQgdHJhbnNpdGlvblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gZGF0YSBvYmplY3QsIGZyb20gYHRoaXMuaGFuZGxlKGV2ZW50LCBkYXRhKWBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbG9jYXRpb24gLSBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiBVUkwsIG1hdGNoZWQgdG8gdGFyZ2V0IHN0YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gc3dpdGNoUm91dGUoeyBmcm9tLCB0bywgZXZlbnQsIHBheWxvYWQgfSkge1xuICAgICAgICBsZXQgcm91dGVDb25maWcgPSByb3V0ZXNbdG9dO1xuICAgICAgICBsZXQgaGFuZGxlciAgICAgPSByb3V0ZUNvbmZpZy5jb21pbmcgfHwgcm91dGVDb25maWc7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JvdXRlIFwiY29taW5nXCIgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShoYW5kbGVyLmNhbGwodGhpcywgcGF5bG9hZCkpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBtYXRjaFJvdXRlKHBhdGhuYW1lLCByb3V0ZXMgPSBbXSkge1xuICAgIGNvbnN0IE5BTUVEX1JFX1NUQVJUID0gJyg6PCc7XG5cbiAgICAvLyBUT0RPOiDQtNC+0LHQsNCy0LjRgtGMINC/0LXRgNCy0YvQuSDQv9GA0L7RhdC+0LQgLSDRgdGA0LDQstC90LXQvdC40LUg0YHRgtGA0L7QulxuXG4gICAgaWYgKH5wYXRobmFtZS5pbmRleE9mKE5BTUVEX1JFX1NUQVJUKSkge1xuICAgICAgICBsZXQgcmVnRXhwU3RyID0gJ14nICsgcGF0aG5hbWUgKyAnJCc7XG4gICAgICAgIGxldCByZWdFeHAgICAgPSBuZXcgUmVnRXhwKHJlZ0V4cFN0cik7XG4gICAgICAgIGxldCByb3V0ZSAgICAgPSByb3V0ZXMuZmluZCgoZWxlbSkgPT4gcmVnRXhwLnRlc3QoZWxlbSkpO1xuXG4gICAgICAgIGlmIChyb3V0ZSkgcmV0dXJuIHsgcm91dGUsIGRhdGE6IHt9IH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByb3V0ZSAgICAgPSByb3V0ZXNbaV07XG4gICAgICAgICAgICBsZXQgcmVnRXhwU3RyID0gJ14nICsgcm91dGUgKyAnJCc7XG4gICAgICAgICAgICBsZXQgcmVnRXhwICAgID0gbmFtZWQobmV3IFJlZ0V4cChyZWdFeHBTdHIpKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgICAgPSByZWdFeHAuZXhlYyhwYXRobmFtZSkgfHwgW107XG4gICAgICAgICAgICBsZXQgY2FwdHVyZXMgID0gcmVzdWx0LmNhcHR1cmVzO1xuICAgICAgICAgICAgbGV0IGlzTWF0Y2hlZCA9IGNhcHR1cmVzICYmIChPYmplY3Qua2V5cyhjYXB0dXJlcykubGVuZ3RoID09PSAocmVzdWx0Lmxlbmd0aCAtIDEpKTtcblxuICAgICAgICAgICAgaWYgKGlzTWF0Y2hlZCkgcmV0dXJuIHsgcm91dGUsIGRhdGE6IGZsYXRDYXB0dXJlcyhjYXB0dXJlcykgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7fTtcbn1cblxuXG4vKipcbiAqINCR0LjQsdC70LjQvtGC0LXQutCwIG5hbWVkLXJlZ2V4cCDQv9C+0LfQstC+0LvRj9C10YIg0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINC40LzRjyDQs9GA0YPQv9C/0YtcbiAqINC90LXRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0LIg0L7QtNC90L7QvCDQuCDRgtC+0Lwg0LbQtSDRgNC10LMuINCy0YvRgNCw0LbQtdC90LjQuDpcbiAqXG4gKiB2YXIgcmUgPSBuYW1lZCgvKDo8Zm9vPlthLXpdKykgKDo8Zm9vPlthLXpdKykgKDo8YmFyPlthLXpdKykvaWcpO1xuICogdmFyIG1hdGNoZWQgPSByZS5leGVjKCdhYWEgYmJiIGNjYycpO1xuICogY29uc29sZS5sb2cobWF0Y2hlZC5jYXB0dXJlcyk7IC8vPT4geyBmb286IFsgJ2FhYScsICdiYmInIF0sIGJhcjogWyAnY2NjJyBdIH1cbiAqXG4gKiDQkiDQvtGC0LvQuNGH0LjQtSDQvtGCIG5hbWVkLXJlZ2V4cCwg0LIgUm91dGVyINGC0LDQutCw0Y9cbiAqINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0L7RgtGB0YPRgtGB0YLQstGD0LXRgiwg0YIu0LouINC/0L7Qt9Cy0L7Qu9GP0LXRgiDRgdC+0LfQtNCw0LLQsNGC0Ywg0LzQsNC70L4t0LLRgNCw0LfRg9C80LjRgtC10LvRjNC90YvQtSBVUkkuXG4gKlxuICog0JLQvNC10YHRgtC+INGN0YLQvtCz0L4sINGA0LXQt9GD0LvRjNGC0LjRgNGD0Y7RidC40Lkg0L7QsdGK0LXQutGCINC40LzQtdC10YIg0LLQuNC0OlxuICogeyBmb286ICdhYWEnLCBiYXI6ICdjY2MnIH1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY2FwdHVyZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGZsYXRDYXB0dXJlcyhjYXB0dXJlcykge1xuICAgIHJldHVybiBPYmplY3RcbiAgICAgICAgLmtleXMoY2FwdHVyZXMpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywga2V5KSA9PiBPYmplY3QuYXNzaWduKGFjYywgeyBba2V5XTogY2FwdHVyZXNba2V5XVswXSB9KSwge30pO1xufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBCYWNvbkRyaXZlcihlbWl0VG9TdHJlYW0pIHtcbiAgICByZXR1cm4gQmFjb24uZnJvbUJpbmRlcihlbWl0VG9TdHJlYW0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkVSUk9SUyA9IGV4cG9ydHMuRVZFTlRTID0gdW5kZWZpbmVkO1xuZXhwb3J0cy5BdXRvbWF0b24gPSBBdXRvbWF0b247XG5leHBvcnRzLm5leHRTdGF0ZSA9IG5leHRTdGF0ZTtcbmV4cG9ydHMuc3RhdGVFdmVudFZhbHVlID0gc3RhdGVFdmVudFZhbHVlO1xuZXhwb3J0cy5lcnJvciA9IGVycm9yO1xuXG52YXIgX21pY3JvZXZlbnQgPSByZXF1aXJlKCdtaWNyb2V2ZW50Jyk7XG5cbnZhciBfbWljcm9ldmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9taWNyb2V2ZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEVWRU5UUyA9IGV4cG9ydHMuRVZFTlRTID0ge1xuICAgIFNUQVJURUQ6ICdzdGFydGVkJyxcbiAgICBUUkFOU0lUSU9OOiAndHJhbnNpdGlvbicsXG4gICAgUFJPQ0VTU0lORzogJ3Byb2Nlc3NpbmcnLFxuICAgIEVSUk9SOiAnZXJyb3InXG59O1xuXG52YXIgRVJST1JTID0gZXhwb3J0cy5FUlJPUlMgPSB7XG4gICAgRU5PVFJVTk5FRDoge1xuICAgICAgICBjb2RlOiAnRU5PVFJVTk5FRCcsXG4gICAgICAgIG1lc3NhZ2U6ICdBdXRvbWF0b24gaXMgbm90IHJ1bm5lZCdcbiAgICB9LFxuXG4gICAgRUFMUkVBRFlSVU5ORUQ6IHtcbiAgICAgICAgY29kZTogJ0VBTFJFQURZUlVOTkVEJyxcbiAgICAgICAgbWVzc2FnZTogJ0F1dG9tYXRvbiBhbHJlYWR5IHJ1bm5lZCdcbiAgICB9LFxuXG4gICAgRU5PVFJBTlNJVElPTjoge1xuICAgICAgICBjb2RlOiAnRU5PVFJBTlNJVElPTicsXG4gICAgICAgIG1lc3NhZ2U6IGZ1bmN0aW9uIG1lc3NhZ2UoZXZlbnRJZCwgc3RhdGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuICdUcmFuc2l0aW9uIGZvciBldmVudCBcIicgKyBldmVudElkICsgJ1wiIGlzIG5vdCBkZWZpbmVkIGluIHN0YXRlIFwiJyArIHN0YXRlSWQgKyAnXCInO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIEVTVEFURU5PVEVYSVNUUzoge1xuICAgICAgICBjb2RlOiAnRVNUQVRFTk9URVhJU1RTJyxcbiAgICAgICAgbWVzc2FnZTogZnVuY3Rpb24gbWVzc2FnZShzdGF0ZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1RhcmdldCBzdGF0ZSBcIicgKyBzdGF0ZUlkICsgJ1wiIGRvZXMgbm90IGV4aXN0JztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIEF1dG9tYXRvbihzY2hlbWEpIHtcbiAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZXZlbnRCdXMgPSBuZXcgX21pY3JvZXZlbnQyLmRlZmF1bHQoKTtcbiAgICB2YXIgaXNSdW5uZWQgPSBmYWxzZTtcbiAgICB2YXIgc3RhdGVJZCA9IHZvaWQgMCxcbiAgICAgICAgc3RhdGUgPSB2b2lkIDA7XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0U3RhdGUobmV3U3RhdGVJZCwgZXZlbnRJZCwgcGF5bG9hZCkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBuZXdTdGF0ZUlkICYmIHNjaGVtYVtuZXdTdGF0ZUlkXTtcbiAgICAgICAgdmFyIGVudmVsb3BlID0gdm9pZCAwO1xuXG4gICAgICAgIGlmICghbmV3U3RhdGUpIHRocm93IGVycm9yKEVSUk9SUy5FU1RBVEVOT1RFWElTVFMpO1xuXG4gICAgICAgIGVudmVsb3BlID0geyBmcm9tOiBzdGF0ZUlkLCB0bzogbmV3U3RhdGVJZCwgZXZlbnQ6IGV2ZW50SWQsIHBheWxvYWQ6IHBheWxvYWQgfTtcbiAgICAgICAgc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgc3RhdGVJZCA9IG5ld1N0YXRlSWQ7XG5cbiAgICAgICAgZW1pdChFVkVOVFMuVFJBTlNJVElPTiwgZW52ZWxvcGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXQoKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnRCdXMudHJpZ2dlci5hcHBseShldmVudEJ1cywgYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1N0YXRlSWQgLSBpZCBvZiBzdGFydCBmc20gc3RhdGUuXG4gICAgICogQHJldHVybnMge0F1dG9tYXRvbn1cbiAgICAgKi9cbiAgICB0aGlzLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uIHN0YXJ0V2l0aChuZXdTdGF0ZUlkLCBwYXlsb2FkKSB7XG4gICAgICAgIGlmIChpc1J1bm5lZCkgdGhyb3cgZXJyb3IoRVJST1JTLkVBTFJFQURZUlVOTkVEKTtcblxuICAgICAgICBpc1J1bm5lZCA9IHRydWU7XG4gICAgICAgIHRyYW5zaXRTdGF0ZShuZXdTdGF0ZUlkLCBFVkVOVFMuU1RBUlRFRCwgcGF5bG9hZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRJZCAtIGlkIG9mIGV2ZW50IHRvIHByb2Nlc3MgaW4gY3VycmVudCBzdGF0ZS5cbiAgICAgKiBAcmV0dXJucyB7QXV0b21hdG9ufVxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlID0gZnVuY3Rpb24gaGFuZGxlKGV2ZW50SWQsIHBheWxvYWQpIHtcbiAgICAgICAgaWYgKCFpc1J1bm5lZCkgdGhyb3cgZXJyb3IoRVJST1JTLkVOT1RSVU5ORUQpO1xuXG4gICAgICAgIHZhciBuZXh0U3RhdGUgPSBjb25maWcubmV4dFN0YXRlIHx8IG5leHRTdGF0ZTtcblxuICAgICAgICB2YXIgX25leHRTdGF0ZSA9IG5leHRTdGF0ZShzY2hlbWEsIHN0YXRlSWQsIGV2ZW50SWQsIHBheWxvYWQpO1xuXG4gICAgICAgIHZhciBuZXh0U3RhdGVJZCA9IF9uZXh0U3RhdGUubmV4dFN0YXRlSWQ7XG4gICAgICAgIHZhciBuZXh0U3RhdGVEYXRhID0gX25leHRTdGF0ZS5uZXh0U3RhdGVEYXRhO1xuXG5cbiAgICAgICAgaWYgKCFuZXh0U3RhdGVJZCkgdGhyb3cgZXJyb3IoRVJST1JTLkVOT1RSQU5TSVRJT04sIGV2ZW50SWQsIHN0YXRlSWQpO1xuXG4gICAgICAgIGVtaXQoRVZFTlRTLlBST0NFU1NJTkcsIHtcbiAgICAgICAgICAgIGZyb206IHN0YXRlSWQsXG4gICAgICAgICAgICB0bzogbmV4dFN0YXRlSWQsXG4gICAgICAgICAgICBldmVudDogZXZlbnRJZCxcbiAgICAgICAgICAgIHBheWxhb2Q6IG5leHRTdGF0ZURhdGFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdHJhbnNpdFN0YXRlKG5leHRTdGF0ZUlkLCBldmVudElkLCBuZXh0U3RhdGVEYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzdHJlYW1Ecml2ZXIgLSBsaWJyYXJ5LXNwZWNpZmljIHN0cmVhbSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5zdHJlYW1UaHJvdWdoID0gZnVuY3Rpb24gc3RyZWFtVGhyb3VnaChTdHJlYW1hYmxlKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IG5ldyBTdHJlYW1hYmxlKGZ1bmN0aW9uIChlbWl0VG9TdHJlYW0pIHtcbiAgICAgICAgICAgIGV2ZW50QnVzLmJpbmQoRVZFTlRTLlRSQU5TSVRJT04sIGVtaXRUb1N0cmVhbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBwcm9jZXNzaW5nID0gbmV3IFN0cmVhbWFibGUoZnVuY3Rpb24gKGVtaXRUb1N0cmVhbSkge1xuICAgICAgICAgICAgZXZlbnRCdXMuYmluZChFVkVOVFMuUFJPQ0VTU0lORywgZW1pdFRvU3RyZWFtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgdHJhbnNpdGlvbnM6IHRyYW5zaXRpb25zLCBwcm9jZXNzaW5nOiBwcm9jZXNzaW5nIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudElkIC0gaWQgb2YgZXZlbnQgdG8gc3Vic2NyaWJlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBldmVudCBoYW5kbGVyXG4gICAgICogQHJldHVybnMge0F1dG9tYXRvbn1cbiAgICAgKi9cbiAgICB0aGlzLm9uID0gZnVuY3Rpb24gKGV2ZW50SWQsIGZuKSB7XG4gICAgICAgIGV2ZW50QnVzLmJpbmQoZXZlbnRJZCwgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50SWQgLSBpZCBvZiBldmVudCB0byB1bnN1YnNjcmliZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gZXZlbnQgaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtBdXRvbWF0b259XG4gICAgICovXG4gICAgdGhpcy5vZmYgPSBmdW5jdGlvbiAoZXZlbnRJZCwgZm4pIHtcbiAgICAgICAgZXZlbnRCdXMudW5iaW5kKGV2ZW50SWQsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZUlkO1xuICAgIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IHNjaGVtYSAtIHRyYW5zaXRpb24gc2NoZW1hIG9mIGZzbSBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlSWQgLSBpZCBvZiBjdXJyZW50IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRJZCAtIGlkIG9mIGV2ZW50IHRvIHByb2Nlc3MgaW4gY3VycmVudCBzdGF0ZVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbmV4dFN0YXRlKHNjaGVtYSwgc3RhdGVJZCwgZXZlbnRJZCwgZGF0YSkge1xuICAgIHZhciBldmVudFZhbHVlID0gc3RhdGVFdmVudFZhbHVlKHNjaGVtYSwgc3RhdGVJZCwgZXZlbnRJZCwgZGF0YSk7XG4gICAgdmFyIG1hdGNoU3RhdGVJZCA9IGNvbmZpZy5ldmVudFZhbHVlVG9TdGF0ZUlkIHx8IGV2ZW50VmFsdWVUb1N0YXRlSWQ7XG4gICAgdmFyIG5leHRTdGF0ZUlkID0gbWF0Y2hTdGF0ZUlkKHNjaGVtYSwgZXZlbnRWYWx1ZSk7XG5cbiAgICByZXR1cm4geyBuZXh0U3RhdGVJZDogbmV4dFN0YXRlSWQsIG5leHRTdGF0ZURhdGE6IGRhdGEgfTtcbn1cblxuZnVuY3Rpb24gZXZlbnRWYWx1ZVRvU3RhdGVJZChzY2hlbWEsIGV2ZW50VmFsdWUpIHtcbiAgICByZXR1cm4gZXZlbnRWYWx1ZSA/IHNjaGVtYVtldmVudFZhbHVlXSA/IGV2ZW50VmFsdWUgOiBtYXRjaFJlZ0V4cFN0YXRlSWQoZXZlbnRWYWx1ZSwgc2NoZW1hKSA6IG51bGw7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgICBmdW5jdGlvbiBtYXRjaFJlZ0V4cFN0YXRlSWQoc3RhdGVJZCwgc2NoZW1hKSB7XG4gICAgICAgIHZhciByZXMgPSBPYmplY3Qua2V5cyhzY2hlbWEpLmZpbmQoZnVuY3Rpb24gKHJlZ0V4cFN0cikge1xuICAgICAgICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnXicgKyByZWdFeHBTdHIgKyAnJCcpO1xuICAgICAgICAgICAgdmFyIHJlcyA9IHJlLnRlc3Qoc3RhdGVJZCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzdGF0ZUV2ZW50VmFsdWUoc2NoZW1hLCBzdGF0ZUlkLCBldmVudElkLCBkYXRhKSB7XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHNjaGVtYVtzdGF0ZUlkXTtcbiAgICB2YXIgdmFsID0gY3VycmVudFN0YXRlW2V2ZW50SWRdO1xuXG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgPyB2YWwoZGF0YSkgOiB2YWw7XG59XG5cbmZ1bmN0aW9uIGVycm9yKF9yZWYpIHtcbiAgICB2YXIgY29kZSA9IF9yZWYuY29kZTtcbiAgICB2YXIgbWVzc2FnZSA9IF9yZWYubWVzc2FnZTtcblxuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICB2YXIgbXNnID0gdHlwZW9mIG1lc3NhZ2UgPT09ICdmdW5jdGlvbicgPyBtZXNzYWdlLmFwcGx5KG51bGwsIGFyZ3MpIDogbWVzc2FnZTtcblxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcblxuICAgIGVyci5jb2RlID0gY29kZTtcbiAgICByZXR1cm4gZXJyO1xufSJdfQ==
