(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Translator = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var CONSOLE_MESSAGES = {
    INVALID_PARAM_LANGUAGE: function INVALID_PARAM_LANGUAGE(param) {
      return "Invalid parameter for `language` provided. Expected a string, but got ".concat(_typeof(param), ".");
    },
    INVALID_PARAM_JSON: function INVALID_PARAM_JSON(param) {
      return "Invalid parameter for `json` provided. Expected an object, but got ".concat(_typeof(param), ".");
    },
    EMPTY_PARAM_LANGUAGE: function EMPTY_PARAM_LANGUAGE() {
      return "The parameter for `language` can't be an empty string.";
    },
    EMPTY_PARAM_JSON: function EMPTY_PARAM_JSON() {
      return "The parameter for `json` must have at least one key/value pair.";
    },
    INVALID_PARAM_KEY: function INVALID_PARAM_KEY(param) {
      return "Invalid parameter for `key` provided. Expected a string, but got ".concat(_typeof(param), ".");
    },
    NO_LANGUAGE_REGISTERED: function NO_LANGUAGE_REGISTERED(language) {
      return "No translation for language \"".concat(language, "\" has been added, yet. Make sure to register that language using the `.add()` method first.");
    },
    TRANSLATION_NOT_FOUND: function TRANSLATION_NOT_FOUND(key, language) {
      return "No translation found for key \"".concat(key, "\" in language \"").concat(language, "\". Is there a key/value in your translation file?");
    },
    INVALID_PARAMETER_SOURCES: function INVALID_PARAMETER_SOURCES(param) {
      return "Invalid parameter for `sources` provided. Expected either a string or an array, but got ".concat(_typeof(param), ".");
    },
    FETCH_ERROR: function FETCH_ERROR(response) {
      return "Could not fetch \"".concat(response.url, "\": ").concat(response.status, " (").concat(response.statusText, ")");
    },
    INVALID_ENVIRONMENT: function INVALID_ENVIRONMENT() {
      return "You are trying to execute the method `translatePageTo()`, which is only available in the browser. Your environment is most likely Node.js";
    },
    MODULE_NOT_FOUND: function MODULE_NOT_FOUND(message) {
      return message;
    },
    MISMATCHING_ATTRIBUTES: function MISMATCHING_ATTRIBUTES(keys, attributes, element) {
      return "The attributes \"data-i18n\" and \"data-i18n-attr\" must contain the same number of keys.\n\nValues in `data-i18n`:      (".concat(keys.length, ") `").concat(keys.join(' '), "`\nValues in `data-i18n-attr`: (").concat(attributes.length, ") `").concat(attributes.join(' '), "`\n\nThe HTML element is:\n").concat(element.outerHTML);
    },
    INVALID_OPTIONS: function INVALID_OPTIONS(param) {
      return "Invalid config passed to the `Translator` constructor. Expected an object, but got ".concat(_typeof(param), ". Using default config instead.");
    }
  };
  /**
   *
   * @param {Boolean} isEnabled
   * @return {Function}
   */

  function logger(isEnabled) {
    return function log(code) {
      if (isEnabled) {
        try {
          var message = CONSOLE_MESSAGES[code];

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          throw new TypeError(message ? message.apply(void 0, args) : 'Unhandled Error');
        } catch (ex) {
          var line = ex.stack.split(/\n/g)[1];

          var _line$split = line.split(/@/),
              _line$split2 = _slicedToArray(_line$split, 2),
              method = _line$split2[0],
              filepath = _line$split2[1];

          console.error("".concat(ex.message, "\n\nThis error happened in the method `").concat(method, "` from: `").concat(filepath, "`.\n\nIf you don't want to see these error messages, turn off debugging by passing `{ debug: false }` to the constructor.\n\nError code: ").concat(code, "\n\nCheck out the documentation for more details about the API:\nhttps://github.com/andreasremdt/simple-translator#usage\n        "));
        }
      }
    };
  }

  /**
   * simple-translator
   * A small JavaScript library to translate webpages into different languages.
   * https://github.com/andreasremdt/simple-translator
   *
   * Author: Andreas Remdt <me@andreasremdt.com> (https://andreasremdt.com)
   * License: MIT (https://mit-license.org/)
   */

  var Translator = /*#__PURE__*/function () {
    /**
     * Initialize the Translator by providing options.
     *
     * @param {Object} options
     */
    function Translator() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Translator);

      this.debug = logger(true);

      if (_typeof(options) != 'object' || Array.isArray(options)) {
        this.debug('INVALID_OPTIONS', options);
        options = {};
      }

      this.languages = new Map();
      this.config = Object.assign(Translator.defaultConfig, options);
      var _this$config = this.config,
          debug = _this$config.debug,
          registerGlobally = _this$config.registerGlobally,
          detectLanguage = _this$config.detectLanguage;
      this.debug = logger(debug);

      if (registerGlobally) {
        this._globalObject[registerGlobally] = this.translateForKey.bind(this);
      }

      if (detectLanguage && this._env == 'browser') {
        this._detectLanguage();
      }
    }
    /**
     * Return the global object, depending on the environment.
     * If the script is executed in a browser, return the window object,
     * otherwise, in Node.js, return the global object.
     *
     * @return {Object}
     */


    _createClass(Translator, [{
      key: "_globalObject",
      get: function get() {
        if (this._env == 'browser') {
          return window;
        }

        return global;
      }
      /**
       * Check and return the environment in which the script is executed.
       *
       * @return {String} The environment
       */

    }, {
      key: "_env",
      get: function get() {
        if (typeof window != 'undefined') {
          return 'browser';
        } else if (typeof module !== 'undefined' && module.exports) {
          return 'node';
        }

        return 'browser';
      }
      /**
       * Detect the users preferred language. If the language is stored in
       * localStorage due to a previous interaction, use it.
       * If no localStorage entry has been found, use the default browser language.
       */

    }, {
      key: "_detectLanguage",
      value: function _detectLanguage() {
        var inMemory = window.localStorage ? localStorage.getItem(this.config.persistKey) : undefined;

        if (inMemory) {
          this.config.defaultLanguage = inMemory;
        } else {
          var lang = navigator.languages ? navigator.languages[0] : navigator.language;
          this.config.defaultLanguage = lang.substr(0, 2);
        }
      }
      /**
       * Get a translated value from a JSON by providing a key. Additionally,
       * the target language can be specified as the second parameter.
       *
       * @param {String} key
       * @param {String} toLanguage
       * @return {String}
       */

    }, {
      key: "_getValueFromJSON",
      value: function _getValueFromJSON(key, toLanguage) {
        var json = this.languages.get(toLanguage);
        return key.split('.').reduce(function (obj, i) {
          return obj ? obj[i] : null;
        }, json);
      }
      /**
       * Replace a given DOM nodes' attribute values (by default innerHTML) with
       * the translated text.
       *
       * @param {HTMLElement} element
       * @param {String} toLanguage
       */

    }, {
      key: "_replace",
      value: function _replace(element, toLanguage) {
        var _element$getAttribute,
            _element$getAttribute2,
            _this = this;

        var keys = (_element$getAttribute = element.getAttribute('data-i18n')) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.split(/\s/g);
        var attributes = element === null || element === void 0 ? void 0 : (_element$getAttribute2 = element.getAttribute('data-i18n-attr')) === null || _element$getAttribute2 === void 0 ? void 0 : _element$getAttribute2.split(/\s/g);

        if (attributes && keys.length != attributes.length) {
          this.debug('MISMATCHING_ATTRIBUTES', keys, attributes, element);
        }

        keys.forEach(function (key, index) {
          var text = _this._getValueFromJSON(key, toLanguage);

          var attr = attributes ? attributes[index] : 'innerHTML';

          if (text) {
            if (attr == 'innerHTML') {
              element[attr] = text;
            } else {
              element.setAttribute(attr, text);
            }
          } else {
            _this.debug('TRANSLATION_NOT_FOUND', key, toLanguage);
          }
        });
      }
      /**
       * Translate all DOM nodes that match the given selector into the
       * specified target language.
       *
       * @param {String} toLanguage The target language
       */

    }, {
      key: "translatePageTo",
      value: function translatePageTo() {
        var _this2 = this;

        var toLanguage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.defaultLanguage;

        if (this._env == 'node') {
          this.debug('INVALID_ENVIRONMENT');
          return;
        }

        if (typeof toLanguage != 'string') {
          this.debug('INVALID_PARAM_LANGUAGE', toLanguage);
          return;
        }

        if (toLanguage.length == 0) {
          this.debug('EMPTY_PARAM_LANGUAGE');
          return;
        }

        if (!this.languages.has(toLanguage)) {
          this.debug('NO_LANGUAGE_REGISTERED', toLanguage);
          return;
        }

        var elements = typeof this.config.selector == 'string' ? Array.from(document.querySelectorAll(this.config.selector)) : this.config.selector;

        if (elements.length && elements.length > 0) {
          elements.forEach(function (element) {
            return _this2._replace(element, toLanguage);
          });
        } else if (elements.length == undefined) {
          this._replace(elements, toLanguage);
        }

        this._currentLanguage = toLanguage;
        document.documentElement.lang = toLanguage;

        if (this.config.persist && window.localStorage) {
          localStorage.setItem(this.config.persistKey, toLanguage);
        }
      }
      /**
       * Translate a given key into the specified language if it exists
       * in the translation file. If not or if the language hasn't been added yet,
       * the return value is `null`.
       *
       * @param {String} key The key from the language file to translate
       * @param {String} toLanguage The target language
       * @return {(String|null)}
       */

    }, {
      key: "translateForKey",
      value: function translateForKey(key) {
        var toLanguage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.config.defaultLanguage;

        if (typeof key != 'string') {
          this.debug('INVALID_PARAM_KEY', key);
          return null;
        }

        if (!this.languages.has(toLanguage)) {
          this.debug('NO_LANGUAGE_REGISTERED', toLanguage);
          return null;
        }

        var text = this._getValueFromJSON(key, toLanguage);

        if (!text) {
          this.debug('TRANSLATION_NOT_FOUND', key, toLanguage);
          return null;
        }

        return text;
      }
      /**
       * Add a translation resource to the Translator object. The language
       * can then be used to translate single keys or the entire page.
       *
       * @param {String} language The target language to add
       * @param {String} json The language resource file as JSON
       * @return {Object} Translator instance
       */

    }, {
      key: "add",
      value: function add(language, json) {
        if (typeof language != 'string') {
          this.debug('INVALID_PARAM_LANGUAGE', language);
          return this;
        }

        if (language.length == 0) {
          this.debug('EMPTY_PARAM_LANGUAGE');
          return this;
        }

        if (Array.isArray(json) || _typeof(json) != 'object') {
          this.debug('INVALID_PARAM_JSON', json);
          return this;
        }

        if (Object.keys(json).length == 0) {
          this.debug('EMPTY_PARAM_JSON');
          return this;
        }

        this.languages.set(language, json);
        return this;
      }
      /**
       * Remove a translation resource from the Translator object. The language
       * won't be available afterwards.
       *
       * @param {String} language The target language to remove
       * @return {Object} Translator instance
       */

    }, {
      key: "remove",
      value: function remove(language) {
        if (typeof language != 'string') {
          this.debug('INVALID_PARAM_LANGUAGE', language);
          return this;
        }

        if (language.length == 0) {
          this.debug('EMPTY_PARAM_LANGUAGE');
          return this;
        }

        this.languages["delete"](language);
        return this;
      }
      /**
       * Fetch a translation resource from the web server. It can either fetch
       * a single resource or an array of resources. After all resources are fetched,
       * return a Promise.
       * If the optional, second parameter is set to true, the fetched translations
       * will be added to the Translator object.
       *
       * @param {String|Array} sources The files to fetch
       * @param {Boolean} save Save the translation to the Translator object
       * @return {(Promise|null)}
       */

    }, {
      key: "fetch",
      value: function (_fetch) {
        function fetch(_x) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(function (sources) {
        var _this3 = this;

        var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (!Array.isArray(sources) && typeof sources != 'string') {
          this.debug('INVALID_PARAMETER_SOURCES', sources);
          return null;
        }

        if (!Array.isArray(sources)) {
          sources = [sources];
        }

        var urls = sources.map(function (source) {
          var filename = source.replace(/\.json$/, '').replace(/^\//, '');

          var path = _this3.config.filesLocation.replace(/\/$/, '');

          return "".concat(path, "/").concat(filename, ".json");
        });

        if (this._env == 'browser') {
          return Promise.all(urls.map(function (url) {
            return fetch(url);
          })).then(function (responses) {
            return Promise.all(responses.map(function (response) {
              if (response.ok) {
                return response.json();
              }

              _this3.debug('FETCH_ERROR', response);
            }));
          }).then(function (languageFiles) {
            // If a file could not be fetched, it will be `undefined` and filtered out.
            languageFiles = languageFiles.filter(function (file) {
              return file;
            });

            if (save) {
              languageFiles.forEach(function (file, index) {
                _this3.add(sources[index], file);
              });
            }

            return languageFiles.length > 1 ? languageFiles : languageFiles[0];
          });
        } else if (this._env == 'node') {
          return new Promise(function (resolve) {
            var languageFiles = [];
            urls.forEach(function (url, index) {
              try {
                var json = JSON.parse(require('fs').readFileSync(process.cwd() + url, 'utf-8'));

                if (save) {
                  _this3.add(sources[index], json);
                }

                languageFiles.push(json);
              } catch (err) {
                _this3.debug('MODULE_NOT_FOUND', err.message);
              }
            });
            resolve(languageFiles.length > 1 ? languageFiles : languageFiles[0]);
          });
        }
      }
      /**
       * Sets the default language of the translator instance.
       *
       * @param {String} language
       * @return {void}
       */
      )
    }, {
      key: "setDefaultLanguage",
      value: function setDefaultLanguage(language) {
        if (typeof language != 'string') {
          this.debug('INVALID_PARAM_LANGUAGE', language);
          return;
        }

        if (language.length == 0) {
          this.debug('EMPTY_PARAM_LANGUAGE');
          return;
        }

        if (!this.languages.has(language)) {
          this.debug('NO_LANGUAGE_REGISTERED', language);
          return null;
        }

        this.config.defaultLanguage = language;
      }
      /**
       * Return the currently selected language.
       *
       * @return {String}
       */

    }, {
      key: "currentLanguage",
      get: function get() {
        return this._currentLanguage || this.config.defaultLanguage;
      }
      /**
       * Returns the current default language;
       *
       * @return {String}
       */

    }, {
      key: "defaultLanguage",
      get: function get() {
        return this.config.defaultLanguage;
      }
      /**
       * Return the default config object whose keys can be overriden
       * by the user's config passed to the constructor.
       *
       * @return {Object}
       */

    }], [{
      key: "defaultConfig",
      get: function get() {
        return {
          defaultLanguage: 'en',
          detectLanguage: true,
          selector: '[data-i18n]',
          debug: false,
          registerGlobally: '__',
          persist: false,
          persistKey: 'preferred_language',
          filesLocation: '/i18n'
        };
      }
    }]);

    return Translator;
  }();

  return Translator;

}));
//# sourceMappingURL=translator.js.map
