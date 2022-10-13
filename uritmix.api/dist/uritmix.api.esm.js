import globalAxios from 'axios';

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var BASE_PATH = /*#__PURE__*/"http://localhost".replace(/\/+$/, "");
/**
 *
 * @export
 * @class BaseAPI
 */

var BaseAPI = function BaseAPI(configuration, basePath, axios) {
  if (basePath === void 0) {
    basePath = BASE_PATH;
  }

  if (axios === void 0) {
    axios = globalAxios;
  }

  this.basePath = basePath;
  this.axios = axios;

  if (configuration) {
    this.configuration = configuration;
    this.basePath = configuration.basePath || this.basePath;
  }
};
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */

var RequiredError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(RequiredError, _Error);

  function RequiredError(field, msg) {
    var _this;

    _this = _Error.call(this, msg) || this;
    _this.field = field;
    _this.name = "RequiredError";
    return _this;
  }

  return RequiredError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 *
 * @export
 */

var DUMMY_BASE_URL = 'https://example.com';
/**
 *
 * @throws {RequiredError}
 * @export
 */

var assertParamExists = function assertParamExists(functionName, paramName, paramValue) {
  if (paramValue === null || paramValue === undefined) {
    throw new RequiredError(paramName, "Required parameter " + paramName + " was null or undefined when calling " + functionName + ".");
  }
};
/**
 *
 * @export
 */

var setApiKeyToObject = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(object, keyParamName, configuration) {
    var localVarApiKeyValue;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(configuration && configuration.apiKey)) {
              _context.next = 12;
              break;
            }

            if (!(typeof configuration.apiKey === 'function')) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return configuration.apiKey(keyParamName);

          case 4:
            _context.t0 = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return configuration.apiKey;

          case 9:
            _context.t0 = _context.sent;

          case 10:
            localVarApiKeyValue = _context.t0;
            object[keyParamName] = localVarApiKeyValue;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function setApiKeyToObject(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @export
 */

var setSearchParams = function setSearchParams(url) {
  var searchParams = new URLSearchParams(url.search);

  for (var _len = arguments.length, objects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objects[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _objects = objects; _i < _objects.length; _i++) {
    var object = _objects[_i];

    for (var key in object) {
      if (Array.isArray(object[key])) {
        searchParams["delete"](key);

        for (var _iterator = _createForOfIteratorHelperLoose(object[key]), _step; !(_step = _iterator()).done;) {
          var item = _step.value;
          searchParams.append(key, item);
        }
      } else {
        searchParams.set(key, object[key]);
      }
    }
  }

  url.search = searchParams.toString();
};
/**
 *
 * @export
 */

var serializeDataIfNeeded = function serializeDataIfNeeded(value, requestOptions, configuration) {
  var nonString = typeof value !== 'string';
  var needsSerialization = nonString && configuration && configuration.isJsonMime ? configuration.isJsonMime(requestOptions.headers['Content-Type']) : nonString;
  return needsSerialization ? JSON.stringify(value !== undefined ? value : {}) : value || "";
};
/**
 *
 * @export
 */

var toPathString = function toPathString(url) {
  return url.pathname + url.search + url.hash;
};
/**
 *
 * @export
 */

var createRequestFunction = function createRequestFunction(axiosArgs, globalAxios, BASE_PATH, configuration) {
  return function (axios, basePath) {
    if (axios === void 0) {
      axios = globalAxios;
    }

    if (basePath === void 0) {
      basePath = BASE_PATH;
    }

    var axiosRequestArgs = _extends({}, axiosArgs.options, {
      url: ((configuration == null ? void 0 : configuration.basePath) || basePath) + axiosArgs.url
    });

    return axios.request(axiosRequestArgs);
  };
};

/**
 *
 * @export
 * @enum {string}
 */

var AbonnementValidityView = {
  OneDay: 'OneDay',
  OneMonth: 'OneMonth',
  ThreeMonths: 'ThreeMonths',
  HalfYear: 'HalfYear',
  Year: 'Year'
};
/**
 *
 * @export
 * @enum {string}
 */

var AuthRoleView = {
  Manager: 'Manager',
  Admin: 'Admin',
  Server: 'Server'
};
/**
 *
 * @export
 * @enum {string}
 */

var AuthStatusView = {
  NotActivated: 'NotActivated',
  Activated: 'Activated',
  Blocked: 'Blocked'
};
/**
 *
 * @export
 * @enum {string}
 */

var DiscountView = {
  D0: 'D0',
  D5: 'D5',
  D10: 'D10',
  D15: 'D15',
  D20: 'D20',
  D25: 'D25',
  D30: 'D30',
  D40: 'D40',
  D50: 'D50',
  D60: 'D60',
  D70: 'D70',
  D80: 'D80',
  D90: 'D90'
};
/**
 *
 * @export
 * @enum {string}
 */

var PersonTypeView = {
  All: 'All',
  Trainer: 'Trainer',
  Account: 'Account'
};
/**
 * AbonnementApi - axios parameter creator
 * @export
 */

var AbonnementApiAxiosParamCreator = function AbonnementApiAxiosParamCreator(configuration) {
  return {
    /**
     *
     * @summary Обновляет данные абонимента
     * @param {number} abonnementId
     * @param {EditAbonnement} [editAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementAbonnementIdPut: function () {
      var _apiV1AbonnementAbonnementIdPut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(abonnementId, editAbonnement, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'abonnementId' is not null or undefined
                assertParamExists('apiV1AbonnementAbonnementIdPut', 'abonnementId', abonnementId);
                localVarPath = "/api/v1/abonnement/{abonnementId}".replace("{" + "abonnementId" + "}", encodeURIComponent(String(abonnementId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'PUT'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(editAbonnement, localVarRequestOptions, configuration);
                return _context.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function apiV1AbonnementAbonnementIdPut(_x, _x2, _x3) {
        return _apiV1AbonnementAbonnementIdPut.apply(this, arguments);
      }

      return apiV1AbonnementAbonnementIdPut;
    }(),

    /**
     *
     * @summary Возвращает список абониментов
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementGet: function () {
      var _apiV1AbonnementGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(pageSize, pageNumber, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'pageSize' is not null or undefined
                assertParamExists('apiV1AbonnementGet', 'pageSize', pageSize); // verify required parameter 'pageNumber' is not null or undefined

                assertParamExists('apiV1AbonnementGet', 'pageNumber', pageNumber);
                localVarPath = "/api/v1/abonnement"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context2.next = 11;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 11:
                if (pageSize !== undefined) {
                  localVarQueryParameter['pageSize'] = pageSize;
                }

                if (pageNumber !== undefined) {
                  localVarQueryParameter['pageNumber'] = pageNumber;
                }

                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context2.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function apiV1AbonnementGet(_x4, _x5, _x6) {
        return _apiV1AbonnementGet.apply(this, arguments);
      }

      return apiV1AbonnementGet;
    }(),

    /**
     *
     * @summary Создает новый абонимент
     * @param {CreateAbonnement} [createAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementPost: function () {
      var _apiV1AbonnementPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(createAbonnement, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/abonnement"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context3.next = 9;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 9:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(createAbonnement, localVarRequestOptions, configuration);
                return _context3.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function apiV1AbonnementPost(_x7, _x8) {
        return _apiV1AbonnementPost.apply(this, arguments);
      }

      return apiV1AbonnementPost;
    }(),

    /**
     *
     * @summary Возвращает список купленных абониментов пользователя
     * @param {number} personId
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementSoldPersonIdGet: function () {
      var _apiV1AbonnementSoldPersonIdGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(personId, pageSize, pageNumber, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'personId' is not null or undefined
                assertParamExists('apiV1AbonnementSoldPersonIdGet', 'personId', personId); // verify required parameter 'pageSize' is not null or undefined

                assertParamExists('apiV1AbonnementSoldPersonIdGet', 'pageSize', pageSize); // verify required parameter 'pageNumber' is not null or undefined

                assertParamExists('apiV1AbonnementSoldPersonIdGet', 'pageNumber', pageNumber);
                localVarPath = "/api/v1/abonnement/sold/{personId}".replace("{" + "personId" + "}", encodeURIComponent(String(personId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context4.next = 12;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 12:
                if (pageSize !== undefined) {
                  localVarQueryParameter['pageSize'] = pageSize;
                }

                if (pageNumber !== undefined) {
                  localVarQueryParameter['pageNumber'] = pageNumber;
                }

                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context4.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function apiV1AbonnementSoldPersonIdGet(_x9, _x10, _x11, _x12) {
        return _apiV1AbonnementSoldPersonIdGet.apply(this, arguments);
      }

      return apiV1AbonnementSoldPersonIdGet;
    }(),

    /**
     *
     * @summary Продажа абонимента
     * @param {SaleAbonnement} [saleAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementSoldPost: function () {
      var _apiV1AbonnementSoldPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(saleAbonnement, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/abonnement/sold"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context5.next = 9;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 9:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(saleAbonnement, localVarRequestOptions, configuration);
                return _context5.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function apiV1AbonnementSoldPost(_x13, _x14) {
        return _apiV1AbonnementSoldPost.apply(this, arguments);
      }

      return apiV1AbonnementSoldPost;
    }()
  };
};
/**
 * AbonnementApi - functional programming interface
 * @export
 */

var AbonnementApiFp = function AbonnementApiFp(configuration) {
  var localVarAxiosParamCreator = AbonnementApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Обновляет данные абонимента
     * @param {number} abonnementId
     * @param {EditAbonnement} [editAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementAbonnementIdPut: function apiV1AbonnementAbonnementIdPut(abonnementId, editAbonnement, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return localVarAxiosParamCreator.apiV1AbonnementAbonnementIdPut(abonnementId, editAbonnement, options);

              case 2:
                localVarAxiosArgs = _context6.sent;
                return _context6.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },

    /**
     *
     * @summary Возвращает список абониментов
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementGet: function apiV1AbonnementGet(pageSize, pageNumber, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return localVarAxiosParamCreator.apiV1AbonnementGet(pageSize, pageNumber, options);

              case 2:
                localVarAxiosArgs = _context7.sent;
                return _context7.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },

    /**
     *
     * @summary Создает новый абонимент
     * @param {CreateAbonnement} [createAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementPost: function apiV1AbonnementPost(createAbonnement, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return localVarAxiosParamCreator.apiV1AbonnementPost(createAbonnement, options);

              case 2:
                localVarAxiosArgs = _context8.sent;
                return _context8.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },

    /**
     *
     * @summary Возвращает список купленных абониментов пользователя
     * @param {number} personId
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementSoldPersonIdGet: function apiV1AbonnementSoldPersonIdGet(personId, pageSize, pageNumber, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return localVarAxiosParamCreator.apiV1AbonnementSoldPersonIdGet(personId, pageSize, pageNumber, options);

              case 2:
                localVarAxiosArgs = _context9.sent;
                return _context9.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },

    /**
     *
     * @summary Продажа абонимента
     * @param {SaleAbonnement} [saleAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementSoldPost: function apiV1AbonnementSoldPost(saleAbonnement, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return localVarAxiosParamCreator.apiV1AbonnementSoldPost(saleAbonnement, options);

              case 2:
                localVarAxiosArgs = _context10.sent;
                return _context10.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    }
  };
};
/**
 * AbonnementApi - factory interface
 * @export
 */

var AbonnementApiFactory = function AbonnementApiFactory(configuration, basePath, axios) {
  var localVarFp = AbonnementApiFp(configuration);
  return {
    /**
     *
     * @summary Обновляет данные абонимента
     * @param {number} abonnementId
     * @param {EditAbonnement} [editAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementAbonnementIdPut: function apiV1AbonnementAbonnementIdPut(abonnementId, editAbonnement, options) {
      return localVarFp.apiV1AbonnementAbonnementIdPut(abonnementId, editAbonnement, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Возвращает список абониментов
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementGet: function apiV1AbonnementGet(pageSize, pageNumber, options) {
      return localVarFp.apiV1AbonnementGet(pageSize, pageNumber, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Создает новый абонимент
     * @param {CreateAbonnement} [createAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementPost: function apiV1AbonnementPost(createAbonnement, options) {
      return localVarFp.apiV1AbonnementPost(createAbonnement, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Возвращает список купленных абониментов пользователя
     * @param {number} personId
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementSoldPersonIdGet: function apiV1AbonnementSoldPersonIdGet(personId, pageSize, pageNumber, options) {
      return localVarFp.apiV1AbonnementSoldPersonIdGet(personId, pageSize, pageNumber, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Продажа абонимента
     * @param {SaleAbonnement} [saleAbonnement]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AbonnementSoldPost: function apiV1AbonnementSoldPost(saleAbonnement, options) {
      return localVarFp.apiV1AbonnementSoldPost(saleAbonnement, options).then(function (request) {
        return request(axios, basePath);
      });
    }
  };
};
/**
 * AbonnementApi - object-oriented interface
 * @export
 * @class AbonnementApi
 * @extends {BaseAPI}
 */

var AbonnementApi = /*#__PURE__*/function (_BaseAPI) {
  _inheritsLoose(AbonnementApi, _BaseAPI);

  function AbonnementApi() {
    return _BaseAPI.apply(this, arguments) || this;
  }

  var _proto = AbonnementApi.prototype;

  /**
   *
   * @summary Обновляет данные абонимента
   * @param {number} abonnementId
   * @param {EditAbonnement} [editAbonnement]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AbonnementApi
   */
  _proto.apiV1AbonnementAbonnementIdPut = function apiV1AbonnementAbonnementIdPut(abonnementId, editAbonnement, options) {
    var _this = this;

    return AbonnementApiFp(this.configuration).apiV1AbonnementAbonnementIdPut(abonnementId, editAbonnement, options).then(function (request) {
      return request(_this.axios, _this.basePath);
    });
  }
  /**
   *
   * @summary Возвращает список абониментов
   * @param {number} pageSize
   * @param {number} pageNumber
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AbonnementApi
   */
  ;

  _proto.apiV1AbonnementGet = function apiV1AbonnementGet(pageSize, pageNumber, options) {
    var _this2 = this;

    return AbonnementApiFp(this.configuration).apiV1AbonnementGet(pageSize, pageNumber, options).then(function (request) {
      return request(_this2.axios, _this2.basePath);
    });
  }
  /**
   *
   * @summary Создает новый абонимент
   * @param {CreateAbonnement} [createAbonnement]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AbonnementApi
   */
  ;

  _proto.apiV1AbonnementPost = function apiV1AbonnementPost(createAbonnement, options) {
    var _this3 = this;

    return AbonnementApiFp(this.configuration).apiV1AbonnementPost(createAbonnement, options).then(function (request) {
      return request(_this3.axios, _this3.basePath);
    });
  }
  /**
   *
   * @summary Возвращает список купленных абониментов пользователя
   * @param {number} personId
   * @param {number} pageSize
   * @param {number} pageNumber
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AbonnementApi
   */
  ;

  _proto.apiV1AbonnementSoldPersonIdGet = function apiV1AbonnementSoldPersonIdGet(personId, pageSize, pageNumber, options) {
    var _this4 = this;

    return AbonnementApiFp(this.configuration).apiV1AbonnementSoldPersonIdGet(personId, pageSize, pageNumber, options).then(function (request) {
      return request(_this4.axios, _this4.basePath);
    });
  }
  /**
   *
   * @summary Продажа абонимента
   * @param {SaleAbonnement} [saleAbonnement]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AbonnementApi
   */
  ;

  _proto.apiV1AbonnementSoldPost = function apiV1AbonnementSoldPost(saleAbonnement, options) {
    var _this5 = this;

    return AbonnementApiFp(this.configuration).apiV1AbonnementSoldPost(saleAbonnement, options).then(function (request) {
      return request(_this5.axios, _this5.basePath);
    });
  };

  return AbonnementApi;
}(BaseAPI);
/**
 * AuthApi - axios parameter creator
 * @export
 */

var AuthApiAxiosParamCreator = function AuthApiAxiosParamCreator(configuration) {
  return {
    /**
     *
     * @summary Активация созданного пользователя
     * @param {ActivateAuth} [activateAuth]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthActivatePost: function () {
      var _apiV1AuthActivatePost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(activateAuth, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/auth/activate"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(activateAuth, localVarRequestOptions, configuration);
                return _context11.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function apiV1AuthActivatePost(_x15, _x16) {
        return _apiV1AuthActivatePost.apply(this, arguments);
      }

      return apiV1AuthActivatePost;
    }(),

    /**
     *
     * @summary Авторизация пользователя
     * @param {LoginUser} [loginUser]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthLoginPost: function () {
      var _apiV1AuthLoginPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(loginUser, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/auth/login"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(loginUser, localVarRequestOptions, configuration);
                return _context12.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function apiV1AuthLoginPost(_x17, _x18) {
        return _apiV1AuthLoginPost.apply(this, arguments);
      }

      return apiV1AuthLoginPost;
    }(),

    /**
     *
     * @summary Разлогин пользователя
     * @param {Logout} [logout]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthLogoutPost: function () {
      var _apiV1AuthLogoutPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(logout, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/auth/logout"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(logout, localVarRequestOptions, configuration);
                return _context13.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function apiV1AuthLogoutPost(_x19, _x20) {
        return _apiV1AuthLogoutPost.apply(this, arguments);
      }

      return apiV1AuthLogoutPost;
    }(),

    /**
     *
     * @summary Смена пароля на основе токена отправленного на почту
     * @param {PasswordReset} [passwordReset]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPasswordResetPost: function () {
      var _apiV1AuthPasswordResetPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(passwordReset, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/auth/password-reset"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(passwordReset, localVarRequestOptions, configuration);
                return _context14.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function apiV1AuthPasswordResetPost(_x21, _x22) {
        return _apiV1AuthPasswordResetPost.apply(this, arguments);
      }

      return apiV1AuthPasswordResetPost;
    }(),

    /**
     *
     * @summary Запрос на смену пароля
     * @param {PasswordResetQuery} [passwordResetQuery]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPasswordResetQueryPost: function () {
      var _apiV1AuthPasswordResetQueryPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(passwordResetQuery, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/auth/password-reset-query"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(passwordResetQuery, localVarRequestOptions, configuration);
                return _context15.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function apiV1AuthPasswordResetQueryPost(_x23, _x24) {
        return _apiV1AuthPasswordResetQueryPost.apply(this, arguments);
      }

      return apiV1AuthPasswordResetQueryPost;
    }(),

    /**
     *
     * @summary Создание аккаунта для пользователя
     * @param {number} personId
     * @param {CreateAuth} [createAuth]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPersonIdPost: function () {
      var _apiV1AuthPersonIdPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(personId, createAuth, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'personId' is not null or undefined
                assertParamExists('apiV1AuthPersonIdPost', 'personId', personId);
                localVarPath = "/api/v1/auth/{personId}".replace("{" + "personId" + "}", encodeURIComponent(String(personId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context16.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(createAuth, localVarRequestOptions, configuration);
                return _context16.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 16:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function apiV1AuthPersonIdPost(_x25, _x26, _x27) {
        return _apiV1AuthPersonIdPost.apply(this, arguments);
      }

      return apiV1AuthPersonIdPost;
    }(),

    /**
     *
     * @summary Получение нового token с помощью refresh token
     * @param {Refresh} [refresh]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthRefreshPost: function () {
      var _apiV1AuthRefreshPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(refresh, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/auth/refresh"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {};
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(refresh, localVarRequestOptions, configuration);
                return _context17.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function apiV1AuthRefreshPost(_x28, _x29) {
        return _apiV1AuthRefreshPost.apply(this, arguments);
      }

      return apiV1AuthRefreshPost;
    }()
  };
};
/**
 * AuthApi - functional programming interface
 * @export
 */

var AuthApiFp = function AuthApiFp(configuration) {
  var localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Активация созданного пользователя
     * @param {ActivateAuth} [activateAuth]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthActivatePost: function apiV1AuthActivatePost(activateAuth, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return localVarAxiosParamCreator.apiV1AuthActivatePost(activateAuth, options);

              case 2:
                localVarAxiosArgs = _context18.sent;
                return _context18.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }))();
    },

    /**
     *
     * @summary Авторизация пользователя
     * @param {LoginUser} [loginUser]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthLoginPost: function apiV1AuthLoginPost(loginUser, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return localVarAxiosParamCreator.apiV1AuthLoginPost(loginUser, options);

              case 2:
                localVarAxiosArgs = _context19.sent;
                return _context19.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }))();
    },

    /**
     *
     * @summary Разлогин пользователя
     * @param {Logout} [logout]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthLogoutPost: function apiV1AuthLogoutPost(logout, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                _context20.next = 2;
                return localVarAxiosParamCreator.apiV1AuthLogoutPost(logout, options);

              case 2:
                localVarAxiosArgs = _context20.sent;
                return _context20.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }))();
    },

    /**
     *
     * @summary Смена пароля на основе токена отправленного на почту
     * @param {PasswordReset} [passwordReset]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPasswordResetPost: function apiV1AuthPasswordResetPost(passwordReset, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                _context21.next = 2;
                return localVarAxiosParamCreator.apiV1AuthPasswordResetPost(passwordReset, options);

              case 2:
                localVarAxiosArgs = _context21.sent;
                return _context21.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }))();
    },

    /**
     *
     * @summary Запрос на смену пароля
     * @param {PasswordResetQuery} [passwordResetQuery]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPasswordResetQueryPost: function apiV1AuthPasswordResetQueryPost(passwordResetQuery, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return localVarAxiosParamCreator.apiV1AuthPasswordResetQueryPost(passwordResetQuery, options);

              case 2:
                localVarAxiosArgs = _context22.sent;
                return _context22.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }))();
    },

    /**
     *
     * @summary Создание аккаунта для пользователя
     * @param {number} personId
     * @param {CreateAuth} [createAuth]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPersonIdPost: function apiV1AuthPersonIdPost(personId, createAuth, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.next = 2;
                return localVarAxiosParamCreator.apiV1AuthPersonIdPost(personId, createAuth, options);

              case 2:
                localVarAxiosArgs = _context23.sent;
                return _context23.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23);
      }))();
    },

    /**
     *
     * @summary Получение нового token с помощью refresh token
     * @param {Refresh} [refresh]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthRefreshPost: function apiV1AuthRefreshPost(refresh, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _context24.next = 2;
                return localVarAxiosParamCreator.apiV1AuthRefreshPost(refresh, options);

              case 2:
                localVarAxiosArgs = _context24.sent;
                return _context24.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      }))();
    }
  };
};
/**
 * AuthApi - factory interface
 * @export
 */

var AuthApiFactory = function AuthApiFactory(configuration, basePath, axios) {
  var localVarFp = AuthApiFp(configuration);
  return {
    /**
     *
     * @summary Активация созданного пользователя
     * @param {ActivateAuth} [activateAuth]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthActivatePost: function apiV1AuthActivatePost(activateAuth, options) {
      return localVarFp.apiV1AuthActivatePost(activateAuth, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Авторизация пользователя
     * @param {LoginUser} [loginUser]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthLoginPost: function apiV1AuthLoginPost(loginUser, options) {
      return localVarFp.apiV1AuthLoginPost(loginUser, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Разлогин пользователя
     * @param {Logout} [logout]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthLogoutPost: function apiV1AuthLogoutPost(logout, options) {
      return localVarFp.apiV1AuthLogoutPost(logout, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Смена пароля на основе токена отправленного на почту
     * @param {PasswordReset} [passwordReset]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPasswordResetPost: function apiV1AuthPasswordResetPost(passwordReset, options) {
      return localVarFp.apiV1AuthPasswordResetPost(passwordReset, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Запрос на смену пароля
     * @param {PasswordResetQuery} [passwordResetQuery]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPasswordResetQueryPost: function apiV1AuthPasswordResetQueryPost(passwordResetQuery, options) {
      return localVarFp.apiV1AuthPasswordResetQueryPost(passwordResetQuery, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Создание аккаунта для пользователя
     * @param {number} personId
     * @param {CreateAuth} [createAuth]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthPersonIdPost: function apiV1AuthPersonIdPost(personId, createAuth, options) {
      return localVarFp.apiV1AuthPersonIdPost(personId, createAuth, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Получение нового token с помощью refresh token
     * @param {Refresh} [refresh]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1AuthRefreshPost: function apiV1AuthRefreshPost(refresh, options) {
      return localVarFp.apiV1AuthRefreshPost(refresh, options).then(function (request) {
        return request(axios, basePath);
      });
    }
  };
};
/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */

var AuthApi = /*#__PURE__*/function (_BaseAPI2) {
  _inheritsLoose(AuthApi, _BaseAPI2);

  function AuthApi() {
    return _BaseAPI2.apply(this, arguments) || this;
  }

  var _proto2 = AuthApi.prototype;

  /**
   *
   * @summary Активация созданного пользователя
   * @param {ActivateAuth} [activateAuth]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  _proto2.apiV1AuthActivatePost = function apiV1AuthActivatePost(activateAuth, options) {
    var _this6 = this;

    return AuthApiFp(this.configuration).apiV1AuthActivatePost(activateAuth, options).then(function (request) {
      return request(_this6.axios, _this6.basePath);
    });
  }
  /**
   *
   * @summary Авторизация пользователя
   * @param {LoginUser} [loginUser]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  ;

  _proto2.apiV1AuthLoginPost = function apiV1AuthLoginPost(loginUser, options) {
    var _this7 = this;

    return AuthApiFp(this.configuration).apiV1AuthLoginPost(loginUser, options).then(function (request) {
      return request(_this7.axios, _this7.basePath);
    });
  }
  /**
   *
   * @summary Разлогин пользователя
   * @param {Logout} [logout]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  ;

  _proto2.apiV1AuthLogoutPost = function apiV1AuthLogoutPost(logout, options) {
    var _this8 = this;

    return AuthApiFp(this.configuration).apiV1AuthLogoutPost(logout, options).then(function (request) {
      return request(_this8.axios, _this8.basePath);
    });
  }
  /**
   *
   * @summary Смена пароля на основе токена отправленного на почту
   * @param {PasswordReset} [passwordReset]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  ;

  _proto2.apiV1AuthPasswordResetPost = function apiV1AuthPasswordResetPost(passwordReset, options) {
    var _this9 = this;

    return AuthApiFp(this.configuration).apiV1AuthPasswordResetPost(passwordReset, options).then(function (request) {
      return request(_this9.axios, _this9.basePath);
    });
  }
  /**
   *
   * @summary Запрос на смену пароля
   * @param {PasswordResetQuery} [passwordResetQuery]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  ;

  _proto2.apiV1AuthPasswordResetQueryPost = function apiV1AuthPasswordResetQueryPost(passwordResetQuery, options) {
    var _this10 = this;

    return AuthApiFp(this.configuration).apiV1AuthPasswordResetQueryPost(passwordResetQuery, options).then(function (request) {
      return request(_this10.axios, _this10.basePath);
    });
  }
  /**
   *
   * @summary Создание аккаунта для пользователя
   * @param {number} personId
   * @param {CreateAuth} [createAuth]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  ;

  _proto2.apiV1AuthPersonIdPost = function apiV1AuthPersonIdPost(personId, createAuth, options) {
    var _this11 = this;

    return AuthApiFp(this.configuration).apiV1AuthPersonIdPost(personId, createAuth, options).then(function (request) {
      return request(_this11.axios, _this11.basePath);
    });
  }
  /**
   *
   * @summary Получение нового token с помощью refresh token
   * @param {Refresh} [refresh]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuthApi
   */
  ;

  _proto2.apiV1AuthRefreshPost = function apiV1AuthRefreshPost(refresh, options) {
    var _this12 = this;

    return AuthApiFp(this.configuration).apiV1AuthRefreshPost(refresh, options).then(function (request) {
      return request(_this12.axios, _this12.basePath);
    });
  };

  return AuthApi;
}(BaseAPI);
/**
 * LessonApi - axios parameter creator
 * @export
 */

var LessonApiAxiosParamCreator = function LessonApiAxiosParamCreator(configuration) {
  return {
    /**
     *
     * @summary Возвращает список занятий
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonGet: function () {
      var _apiV1LessonGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(pageSize, pageNumber, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'pageSize' is not null or undefined
                assertParamExists('apiV1LessonGet', 'pageSize', pageSize); // verify required parameter 'pageNumber' is not null or undefined

                assertParamExists('apiV1LessonGet', 'pageNumber', pageNumber);
                localVarPath = "/api/v1/lesson"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context25.next = 11;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 11:
                if (pageSize !== undefined) {
                  localVarQueryParameter['pageSize'] = pageSize;
                }

                if (pageNumber !== undefined) {
                  localVarQueryParameter['pageNumber'] = pageNumber;
                }

                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context25.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 17:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25);
      }));

      function apiV1LessonGet(_x30, _x31, _x32) {
        return _apiV1LessonGet.apply(this, arguments);
      }

      return apiV1LessonGet;
    }(),

    /**
     *
     * @summary Возвращает занятие по id
     * @param {number} lessonId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonLessonIdGet: function () {
      var _apiV1LessonLessonIdGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(lessonId, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'lessonId' is not null or undefined
                assertParamExists('apiV1LessonLessonIdGet', 'lessonId', lessonId);
                localVarPath = "/api/v1/lesson/{lessonId}".replace("{" + "lessonId" + "}", encodeURIComponent(String(lessonId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context26.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context26.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 14:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      }));

      function apiV1LessonLessonIdGet(_x33, _x34) {
        return _apiV1LessonLessonIdGet.apply(this, arguments);
      }

      return apiV1LessonLessonIdGet;
    }(),

    /**
     *
     * @summary Обновляет данные занятия
     * @param {number} lessonId
     * @param {EditLesson} [editLesson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonLessonIdPut: function () {
      var _apiV1LessonLessonIdPut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(lessonId, editLesson, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'lessonId' is not null or undefined
                assertParamExists('apiV1LessonLessonIdPut', 'lessonId', lessonId);
                localVarPath = "/api/v1/lesson/{lessonId}".replace("{" + "lessonId" + "}", encodeURIComponent(String(lessonId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'PUT'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context27.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(editLesson, localVarRequestOptions, configuration);
                return _context27.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 16:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27);
      }));

      function apiV1LessonLessonIdPut(_x35, _x36, _x37) {
        return _apiV1LessonLessonIdPut.apply(this, arguments);
      }

      return apiV1LessonLessonIdPut;
    }(),

    /**
     *
     * @summary Создает новое занятие
     * @param {CreateLesson} [createLesson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonPost: function () {
      var _apiV1LessonPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(createLesson, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/lesson"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context28.next = 9;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 9:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(createLesson, localVarRequestOptions, configuration);
                return _context28.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 15:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      function apiV1LessonPost(_x38, _x39) {
        return _apiV1LessonPost.apply(this, arguments);
      }

      return apiV1LessonPost;
    }()
  };
};
/**
 * LessonApi - functional programming interface
 * @export
 */

var LessonApiFp = function LessonApiFp(configuration) {
  var localVarAxiosParamCreator = LessonApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Возвращает список занятий
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonGet: function apiV1LessonGet(pageSize, pageNumber, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                _context29.next = 2;
                return localVarAxiosParamCreator.apiV1LessonGet(pageSize, pageNumber, options);

              case 2:
                localVarAxiosArgs = _context29.sent;
                return _context29.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29);
      }))();
    },

    /**
     *
     * @summary Возвращает занятие по id
     * @param {number} lessonId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonLessonIdGet: function apiV1LessonLessonIdGet(lessonId, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                _context30.next = 2;
                return localVarAxiosParamCreator.apiV1LessonLessonIdGet(lessonId, options);

              case 2:
                localVarAxiosArgs = _context30.sent;
                return _context30.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      }))();
    },

    /**
     *
     * @summary Обновляет данные занятия
     * @param {number} lessonId
     * @param {EditLesson} [editLesson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonLessonIdPut: function apiV1LessonLessonIdPut(lessonId, editLesson, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee31$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                _context31.next = 2;
                return localVarAxiosParamCreator.apiV1LessonLessonIdPut(lessonId, editLesson, options);

              case 2:
                localVarAxiosArgs = _context31.sent;
                return _context31.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context31.stop();
            }
          }
        }, _callee31);
      }))();
    },

    /**
     *
     * @summary Создает новое занятие
     * @param {CreateLesson} [createLesson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonPost: function apiV1LessonPost(createLesson, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                _context32.next = 2;
                return localVarAxiosParamCreator.apiV1LessonPost(createLesson, options);

              case 2:
                localVarAxiosArgs = _context32.sent;
                return _context32.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }))();
    }
  };
};
/**
 * LessonApi - factory interface
 * @export
 */

var LessonApiFactory = function LessonApiFactory(configuration, basePath, axios) {
  var localVarFp = LessonApiFp(configuration);
  return {
    /**
     *
     * @summary Возвращает список занятий
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonGet: function apiV1LessonGet(pageSize, pageNumber, options) {
      return localVarFp.apiV1LessonGet(pageSize, pageNumber, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Возвращает занятие по id
     * @param {number} lessonId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonLessonIdGet: function apiV1LessonLessonIdGet(lessonId, options) {
      return localVarFp.apiV1LessonLessonIdGet(lessonId, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Обновляет данные занятия
     * @param {number} lessonId
     * @param {EditLesson} [editLesson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonLessonIdPut: function apiV1LessonLessonIdPut(lessonId, editLesson, options) {
      return localVarFp.apiV1LessonLessonIdPut(lessonId, editLesson, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Создает новое занятие
     * @param {CreateLesson} [createLesson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1LessonPost: function apiV1LessonPost(createLesson, options) {
      return localVarFp.apiV1LessonPost(createLesson, options).then(function (request) {
        return request(axios, basePath);
      });
    }
  };
};
/**
 * LessonApi - object-oriented interface
 * @export
 * @class LessonApi
 * @extends {BaseAPI}
 */

var LessonApi = /*#__PURE__*/function (_BaseAPI3) {
  _inheritsLoose(LessonApi, _BaseAPI3);

  function LessonApi() {
    return _BaseAPI3.apply(this, arguments) || this;
  }

  var _proto3 = LessonApi.prototype;

  /**
   *
   * @summary Возвращает список занятий
   * @param {number} pageSize
   * @param {number} pageNumber
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LessonApi
   */
  _proto3.apiV1LessonGet = function apiV1LessonGet(pageSize, pageNumber, options) {
    var _this13 = this;

    return LessonApiFp(this.configuration).apiV1LessonGet(pageSize, pageNumber, options).then(function (request) {
      return request(_this13.axios, _this13.basePath);
    });
  }
  /**
   *
   * @summary Возвращает занятие по id
   * @param {number} lessonId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LessonApi
   */
  ;

  _proto3.apiV1LessonLessonIdGet = function apiV1LessonLessonIdGet(lessonId, options) {
    var _this14 = this;

    return LessonApiFp(this.configuration).apiV1LessonLessonIdGet(lessonId, options).then(function (request) {
      return request(_this14.axios, _this14.basePath);
    });
  }
  /**
   *
   * @summary Обновляет данные занятия
   * @param {number} lessonId
   * @param {EditLesson} [editLesson]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LessonApi
   */
  ;

  _proto3.apiV1LessonLessonIdPut = function apiV1LessonLessonIdPut(lessonId, editLesson, options) {
    var _this15 = this;

    return LessonApiFp(this.configuration).apiV1LessonLessonIdPut(lessonId, editLesson, options).then(function (request) {
      return request(_this15.axios, _this15.basePath);
    });
  }
  /**
   *
   * @summary Создает новое занятие
   * @param {CreateLesson} [createLesson]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof LessonApi
   */
  ;

  _proto3.apiV1LessonPost = function apiV1LessonPost(createLesson, options) {
    var _this16 = this;

    return LessonApiFp(this.configuration).apiV1LessonPost(createLesson, options).then(function (request) {
      return request(_this16.axios, _this16.basePath);
    });
  };

  return LessonApi;
}(BaseAPI);
/**
 * PersonApi - axios parameter creator
 * @export
 */

var PersonApiAxiosParamCreator = function PersonApiAxiosParamCreator(configuration) {
  return {
    /**
     *
     * @summary Возвращает список пользователей
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {PersonTypeView} [type]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonGet: function () {
      var _apiV1PersonGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(pageSize, pageNumber, type, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee33$(_context33) {
          while (1) {
            switch (_context33.prev = _context33.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'pageSize' is not null or undefined
                assertParamExists('apiV1PersonGet', 'pageSize', pageSize); // verify required parameter 'pageNumber' is not null or undefined

                assertParamExists('apiV1PersonGet', 'pageNumber', pageNumber);
                localVarPath = "/api/v1/person"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context33.next = 11;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 11:
                if (type !== undefined) {
                  localVarQueryParameter['type'] = type;
                }

                if (pageSize !== undefined) {
                  localVarQueryParameter['pageSize'] = pageSize;
                }

                if (pageNumber !== undefined) {
                  localVarQueryParameter['pageNumber'] = pageNumber;
                }

                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context33.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 18:
              case "end":
                return _context33.stop();
            }
          }
        }, _callee33);
      }));

      function apiV1PersonGet(_x40, _x41, _x42, _x43) {
        return _apiV1PersonGet.apply(this, arguments);
      }

      return apiV1PersonGet;
    }(),

    /**
     *
     * @summary Возвращает пользователя по id
     * @param {number} personId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPersonIdGet: function () {
      var _apiV1PersonPersonIdGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(personId, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'personId' is not null or undefined
                assertParamExists('apiV1PersonPersonIdGet', 'personId', personId);
                localVarPath = "/api/v1/person/{personId}".replace("{" + "personId" + "}", encodeURIComponent(String(personId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context34.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context34.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 14:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34);
      }));

      function apiV1PersonPersonIdGet(_x44, _x45) {
        return _apiV1PersonPersonIdGet.apply(this, arguments);
      }

      return apiV1PersonPersonIdGet;
    }(),

    /**
     *
     * @summary Обновляет данные пользователя
     * @param {number} personId
     * @param {EditPerson} [editPerson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPersonIdPut: function () {
      var _apiV1PersonPersonIdPut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(personId, editPerson, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee35$(_context35) {
          while (1) {
            switch (_context35.prev = _context35.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'personId' is not null or undefined
                assertParamExists('apiV1PersonPersonIdPut', 'personId', personId);
                localVarPath = "/api/v1/person/{personId}".replace("{" + "personId" + "}", encodeURIComponent(String(personId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'PUT'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context35.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(editPerson, localVarRequestOptions, configuration);
                return _context35.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 16:
              case "end":
                return _context35.stop();
            }
          }
        }, _callee35);
      }));

      function apiV1PersonPersonIdPut(_x46, _x47, _x48) {
        return _apiV1PersonPersonIdPut.apply(this, arguments);
      }

      return apiV1PersonPersonIdPut;
    }(),

    /**
     *
     * @summary Создает нового пользователя
     * @param {CreatePerson} [createPerson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPost: function () {
      var _apiV1PersonPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(createPerson, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/person"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context36.next = 9;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 9:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(createPerson, localVarRequestOptions, configuration);
                return _context36.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 15:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36);
      }));

      function apiV1PersonPost(_x49, _x50) {
        return _apiV1PersonPost.apply(this, arguments);
      }

      return apiV1PersonPost;
    }(),

    /**
     *
     * @summary Возвращает текущего авторизованного пользователя
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonSelfGet: function () {
      var _apiV1PersonSelfGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee37$(_context37) {
          while (1) {
            switch (_context37.prev = _context37.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/person/self"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context37.next = 9;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 9:
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context37.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 13:
              case "end":
                return _context37.stop();
            }
          }
        }, _callee37);
      }));

      function apiV1PersonSelfGet(_x51) {
        return _apiV1PersonSelfGet.apply(this, arguments);
      }

      return apiV1PersonSelfGet;
    }()
  };
};
/**
 * PersonApi - functional programming interface
 * @export
 */

var PersonApiFp = function PersonApiFp(configuration) {
  var localVarAxiosParamCreator = PersonApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Возвращает список пользователей
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {PersonTypeView} [type]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonGet: function apiV1PersonGet(pageSize, pageNumber, type, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                _context38.next = 2;
                return localVarAxiosParamCreator.apiV1PersonGet(pageSize, pageNumber, type, options);

              case 2:
                localVarAxiosArgs = _context38.sent;
                return _context38.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38);
      }))();
    },

    /**
     *
     * @summary Возвращает пользователя по id
     * @param {number} personId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPersonIdGet: function apiV1PersonPersonIdGet(personId, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee39$(_context39) {
          while (1) {
            switch (_context39.prev = _context39.next) {
              case 0:
                _context39.next = 2;
                return localVarAxiosParamCreator.apiV1PersonPersonIdGet(personId, options);

              case 2:
                localVarAxiosArgs = _context39.sent;
                return _context39.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context39.stop();
            }
          }
        }, _callee39);
      }))();
    },

    /**
     *
     * @summary Обновляет данные пользователя
     * @param {number} personId
     * @param {EditPerson} [editPerson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPersonIdPut: function apiV1PersonPersonIdPut(personId, editPerson, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee40$(_context40) {
          while (1) {
            switch (_context40.prev = _context40.next) {
              case 0:
                _context40.next = 2;
                return localVarAxiosParamCreator.apiV1PersonPersonIdPut(personId, editPerson, options);

              case 2:
                localVarAxiosArgs = _context40.sent;
                return _context40.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context40.stop();
            }
          }
        }, _callee40);
      }))();
    },

    /**
     *
     * @summary Создает нового пользователя
     * @param {CreatePerson} [createPerson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPost: function apiV1PersonPost(createPerson, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee41$(_context41) {
          while (1) {
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return localVarAxiosParamCreator.apiV1PersonPost(createPerson, options);

              case 2:
                localVarAxiosArgs = _context41.sent;
                return _context41.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context41.stop();
            }
          }
        }, _callee41);
      }))();
    },

    /**
     *
     * @summary Возвращает текущего авторизованного пользователя
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonSelfGet: function apiV1PersonSelfGet(options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee42$(_context42) {
          while (1) {
            switch (_context42.prev = _context42.next) {
              case 0:
                _context42.next = 2;
                return localVarAxiosParamCreator.apiV1PersonSelfGet(options);

              case 2:
                localVarAxiosArgs = _context42.sent;
                return _context42.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context42.stop();
            }
          }
        }, _callee42);
      }))();
    }
  };
};
/**
 * PersonApi - factory interface
 * @export
 */

var PersonApiFactory = function PersonApiFactory(configuration, basePath, axios) {
  var localVarFp = PersonApiFp(configuration);
  return {
    /**
     *
     * @summary Возвращает список пользователей
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {PersonTypeView} [type]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonGet: function apiV1PersonGet(pageSize, pageNumber, type, options) {
      return localVarFp.apiV1PersonGet(pageSize, pageNumber, type, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Возвращает пользователя по id
     * @param {number} personId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPersonIdGet: function apiV1PersonPersonIdGet(personId, options) {
      return localVarFp.apiV1PersonPersonIdGet(personId, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Обновляет данные пользователя
     * @param {number} personId
     * @param {EditPerson} [editPerson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPersonIdPut: function apiV1PersonPersonIdPut(personId, editPerson, options) {
      return localVarFp.apiV1PersonPersonIdPut(personId, editPerson, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Создает нового пользователя
     * @param {CreatePerson} [createPerson]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonPost: function apiV1PersonPost(createPerson, options) {
      return localVarFp.apiV1PersonPost(createPerson, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Возвращает текущего авторизованного пользователя
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1PersonSelfGet: function apiV1PersonSelfGet(options) {
      return localVarFp.apiV1PersonSelfGet(options).then(function (request) {
        return request(axios, basePath);
      });
    }
  };
};
/**
 * PersonApi - object-oriented interface
 * @export
 * @class PersonApi
 * @extends {BaseAPI}
 */

var PersonApi = /*#__PURE__*/function (_BaseAPI4) {
  _inheritsLoose(PersonApi, _BaseAPI4);

  function PersonApi() {
    return _BaseAPI4.apply(this, arguments) || this;
  }

  var _proto4 = PersonApi.prototype;

  /**
   *
   * @summary Возвращает список пользователей
   * @param {number} pageSize
   * @param {number} pageNumber
   * @param {PersonTypeView} [type]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PersonApi
   */
  _proto4.apiV1PersonGet = function apiV1PersonGet(pageSize, pageNumber, type, options) {
    var _this17 = this;

    return PersonApiFp(this.configuration).apiV1PersonGet(pageSize, pageNumber, type, options).then(function (request) {
      return request(_this17.axios, _this17.basePath);
    });
  }
  /**
   *
   * @summary Возвращает пользователя по id
   * @param {number} personId
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PersonApi
   */
  ;

  _proto4.apiV1PersonPersonIdGet = function apiV1PersonPersonIdGet(personId, options) {
    var _this18 = this;

    return PersonApiFp(this.configuration).apiV1PersonPersonIdGet(personId, options).then(function (request) {
      return request(_this18.axios, _this18.basePath);
    });
  }
  /**
   *
   * @summary Обновляет данные пользователя
   * @param {number} personId
   * @param {EditPerson} [editPerson]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PersonApi
   */
  ;

  _proto4.apiV1PersonPersonIdPut = function apiV1PersonPersonIdPut(personId, editPerson, options) {
    var _this19 = this;

    return PersonApiFp(this.configuration).apiV1PersonPersonIdPut(personId, editPerson, options).then(function (request) {
      return request(_this19.axios, _this19.basePath);
    });
  }
  /**
   *
   * @summary Создает нового пользователя
   * @param {CreatePerson} [createPerson]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PersonApi
   */
  ;

  _proto4.apiV1PersonPost = function apiV1PersonPost(createPerson, options) {
    var _this20 = this;

    return PersonApiFp(this.configuration).apiV1PersonPost(createPerson, options).then(function (request) {
      return request(_this20.axios, _this20.basePath);
    });
  }
  /**
   *
   * @summary Возвращает текущего авторизованного пользователя
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PersonApi
   */
  ;

  _proto4.apiV1PersonSelfGet = function apiV1PersonSelfGet(options) {
    var _this21 = this;

    return PersonApiFp(this.configuration).apiV1PersonSelfGet(options).then(function (request) {
      return request(_this21.axios, _this21.basePath);
    });
  };

  return PersonApi;
}(BaseAPI);
/**
 * RoomApi - axios parameter creator
 * @export
 */

var RoomApiAxiosParamCreator = function RoomApiAxiosParamCreator(configuration) {
  return {
    /**
     *
     * @summary Возвращает список помещений
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomGet: function () {
      var _apiV1RoomGet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(pageSize, pageNumber, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee43$(_context43) {
          while (1) {
            switch (_context43.prev = _context43.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'pageSize' is not null or undefined
                assertParamExists('apiV1RoomGet', 'pageSize', pageSize); // verify required parameter 'pageNumber' is not null or undefined

                assertParamExists('apiV1RoomGet', 'pageNumber', pageNumber);
                localVarPath = "/api/v1/room"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'GET'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context43.next = 11;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 11:
                if (pageSize !== undefined) {
                  localVarQueryParameter['pageSize'] = pageSize;
                }

                if (pageNumber !== undefined) {
                  localVarQueryParameter['pageNumber'] = pageNumber;
                }

                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                return _context43.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 17:
              case "end":
                return _context43.stop();
            }
          }
        }, _callee43);
      }));

      function apiV1RoomGet(_x52, _x53, _x54) {
        return _apiV1RoomGet.apply(this, arguments);
      }

      return apiV1RoomGet;
    }(),

    /**
     *
     * @summary Создает новое помещение
     * @param {CreateRoom} [createRoom]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomPost: function () {
      var _apiV1RoomPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(createRoom, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee44$(_context44) {
          while (1) {
            switch (_context44.prev = _context44.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                localVarPath = "/api/v1/room"; // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'POST'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context44.next = 9;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 9:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(createRoom, localVarRequestOptions, configuration);
                return _context44.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 15:
              case "end":
                return _context44.stop();
            }
          }
        }, _callee44);
      }));

      function apiV1RoomPost(_x55, _x56) {
        return _apiV1RoomPost.apply(this, arguments);
      }

      return apiV1RoomPost;
    }(),

    /**
     *
     * @summary Обновляет данные помещения
     * @param {number} roomId
     * @param {EditRoom} [editRoom]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomRoomIdPut: function () {
      var _apiV1RoomRoomIdPut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(roomId, editRoom, options) {
        var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
        return _regeneratorRuntime().wrap(function _callee45$(_context45) {
          while (1) {
            switch (_context45.prev = _context45.next) {
              case 0:
                if (options === void 0) {
                  options = {};
                }

                // verify required parameter 'roomId' is not null or undefined
                assertParamExists('apiV1RoomRoomIdPut', 'roomId', roomId);
                localVarPath = "/api/v1/room/{roomId}".replace("{" + "roomId" + "}", encodeURIComponent(String(roomId))); // use dummy base URL string because the URL constructor only accepts absolute URLs.

                localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);

                if (configuration) {
                  baseOptions = configuration.baseOptions;
                }

                localVarRequestOptions = _extends({
                  method: 'PUT'
                }, baseOptions, options);
                localVarHeaderParameter = {};
                localVarQueryParameter = {}; // authentication Bearer required

                _context45.next = 10;
                return setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration);

              case 10:
                localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';
                setSearchParams(localVarUrlObj, localVarQueryParameter);
                headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                localVarRequestOptions.headers = _extends({}, localVarHeaderParameter, headersFromBaseOptions, options.headers);
                localVarRequestOptions.data = serializeDataIfNeeded(editRoom, localVarRequestOptions, configuration);
                return _context45.abrupt("return", {
                  url: toPathString(localVarUrlObj),
                  options: localVarRequestOptions
                });

              case 16:
              case "end":
                return _context45.stop();
            }
          }
        }, _callee45);
      }));

      function apiV1RoomRoomIdPut(_x57, _x58, _x59) {
        return _apiV1RoomRoomIdPut.apply(this, arguments);
      }

      return apiV1RoomRoomIdPut;
    }()
  };
};
/**
 * RoomApi - functional programming interface
 * @export
 */

var RoomApiFp = function RoomApiFp(configuration) {
  var localVarAxiosParamCreator = RoomApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Возвращает список помещений
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomGet: function apiV1RoomGet(pageSize, pageNumber, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee46$(_context46) {
          while (1) {
            switch (_context46.prev = _context46.next) {
              case 0:
                _context46.next = 2;
                return localVarAxiosParamCreator.apiV1RoomGet(pageSize, pageNumber, options);

              case 2:
                localVarAxiosArgs = _context46.sent;
                return _context46.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context46.stop();
            }
          }
        }, _callee46);
      }))();
    },

    /**
     *
     * @summary Создает новое помещение
     * @param {CreateRoom} [createRoom]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomPost: function apiV1RoomPost(createRoom, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee47$(_context47) {
          while (1) {
            switch (_context47.prev = _context47.next) {
              case 0:
                _context47.next = 2;
                return localVarAxiosParamCreator.apiV1RoomPost(createRoom, options);

              case 2:
                localVarAxiosArgs = _context47.sent;
                return _context47.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context47.stop();
            }
          }
        }, _callee47);
      }))();
    },

    /**
     *
     * @summary Обновляет данные помещения
     * @param {number} roomId
     * @param {EditRoom} [editRoom]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomRoomIdPut: function apiV1RoomRoomIdPut(roomId, editRoom, options) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48() {
        var localVarAxiosArgs;
        return _regeneratorRuntime().wrap(function _callee48$(_context48) {
          while (1) {
            switch (_context48.prev = _context48.next) {
              case 0:
                _context48.next = 2;
                return localVarAxiosParamCreator.apiV1RoomRoomIdPut(roomId, editRoom, options);

              case 2:
                localVarAxiosArgs = _context48.sent;
                return _context48.abrupt("return", createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration));

              case 4:
              case "end":
                return _context48.stop();
            }
          }
        }, _callee48);
      }))();
    }
  };
};
/**
 * RoomApi - factory interface
 * @export
 */

var RoomApiFactory = function RoomApiFactory(configuration, basePath, axios) {
  var localVarFp = RoomApiFp(configuration);
  return {
    /**
     *
     * @summary Возвращает список помещений
     * @param {number} pageSize
     * @param {number} pageNumber
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomGet: function apiV1RoomGet(pageSize, pageNumber, options) {
      return localVarFp.apiV1RoomGet(pageSize, pageNumber, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Создает новое помещение
     * @param {CreateRoom} [createRoom]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomPost: function apiV1RoomPost(createRoom, options) {
      return localVarFp.apiV1RoomPost(createRoom, options).then(function (request) {
        return request(axios, basePath);
      });
    },

    /**
     *
     * @summary Обновляет данные помещения
     * @param {number} roomId
     * @param {EditRoom} [editRoom]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiV1RoomRoomIdPut: function apiV1RoomRoomIdPut(roomId, editRoom, options) {
      return localVarFp.apiV1RoomRoomIdPut(roomId, editRoom, options).then(function (request) {
        return request(axios, basePath);
      });
    }
  };
};
/**
 * RoomApi - object-oriented interface
 * @export
 * @class RoomApi
 * @extends {BaseAPI}
 */

var RoomApi = /*#__PURE__*/function (_BaseAPI5) {
  _inheritsLoose(RoomApi, _BaseAPI5);

  function RoomApi() {
    return _BaseAPI5.apply(this, arguments) || this;
  }

  var _proto5 = RoomApi.prototype;

  /**
   *
   * @summary Возвращает список помещений
   * @param {number} pageSize
   * @param {number} pageNumber
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomApi
   */
  _proto5.apiV1RoomGet = function apiV1RoomGet(pageSize, pageNumber, options) {
    var _this22 = this;

    return RoomApiFp(this.configuration).apiV1RoomGet(pageSize, pageNumber, options).then(function (request) {
      return request(_this22.axios, _this22.basePath);
    });
  }
  /**
   *
   * @summary Создает новое помещение
   * @param {CreateRoom} [createRoom]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomApi
   */
  ;

  _proto5.apiV1RoomPost = function apiV1RoomPost(createRoom, options) {
    var _this23 = this;

    return RoomApiFp(this.configuration).apiV1RoomPost(createRoom, options).then(function (request) {
      return request(_this23.axios, _this23.basePath);
    });
  }
  /**
   *
   * @summary Обновляет данные помещения
   * @param {number} roomId
   * @param {EditRoom} [editRoom]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomApi
   */
  ;

  _proto5.apiV1RoomRoomIdPut = function apiV1RoomRoomIdPut(roomId, editRoom, options) {
    var _this24 = this;

    return RoomApiFp(this.configuration).apiV1RoomRoomIdPut(roomId, editRoom, options).then(function (request) {
      return request(_this24.axios, _this24.basePath);
    });
  };

  return RoomApi;
}(BaseAPI);

/* tslint:disable */

/* eslint-disable */

/**
 * Uritmix.Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var Configuration = /*#__PURE__*/function () {
  function Configuration(param) {
    if (param === void 0) {
      param = {};
    }

    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */


  var _proto = Configuration.prototype;

  _proto.isJsonMime = function isJsonMime(mime) {
    var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  };

  return Configuration;
}();

/* tslint:disable */

var index = {
  __proto__: null,
  AbonnementValidityView: AbonnementValidityView,
  AuthRoleView: AuthRoleView,
  AuthStatusView: AuthStatusView,
  DiscountView: DiscountView,
  PersonTypeView: PersonTypeView,
  AbonnementApiAxiosParamCreator: AbonnementApiAxiosParamCreator,
  AbonnementApiFp: AbonnementApiFp,
  AbonnementApiFactory: AbonnementApiFactory,
  AbonnementApi: AbonnementApi,
  AuthApiAxiosParamCreator: AuthApiAxiosParamCreator,
  AuthApiFp: AuthApiFp,
  AuthApiFactory: AuthApiFactory,
  AuthApi: AuthApi,
  LessonApiAxiosParamCreator: LessonApiAxiosParamCreator,
  LessonApiFp: LessonApiFp,
  LessonApiFactory: LessonApiFactory,
  LessonApi: LessonApi,
  PersonApiAxiosParamCreator: PersonApiAxiosParamCreator,
  PersonApiFp: PersonApiFp,
  PersonApiFactory: PersonApiFactory,
  PersonApi: PersonApi,
  RoomApiAxiosParamCreator: RoomApiAxiosParamCreator,
  RoomApiFp: RoomApiFp,
  RoomApiFactory: RoomApiFactory,
  RoomApi: RoomApi,
  Configuration: Configuration
};

var API_URL = process.env.REACT_API_URL || 'http://localhost:3000';
var Api;

(function (Api) {
  Api.authApi = /*#__PURE__*/new AuthApi( /*#__PURE__*/new Configuration({
    basePath: API_URL
  }));
  Api.personApi = /*#__PURE__*/new PersonApi( /*#__PURE__*/new Configuration({
    basePath: API_URL
  }));
  Api.roomApi = /*#__PURE__*/new RoomApi( /*#__PURE__*/new Configuration({
    basePath: API_URL
  }));
  Api.lessonApi = /*#__PURE__*/new LessonApi( /*#__PURE__*/new Configuration({
    basePath: API_URL
  }));
  Api.abonnementApi = /*#__PURE__*/new AbonnementApi( /*#__PURE__*/new Configuration({
    basePath: API_URL
  }));
})(Api || (Api = {}));

export { Api, index as dto };
//# sourceMappingURL=uritmix.api.esm.js.map
