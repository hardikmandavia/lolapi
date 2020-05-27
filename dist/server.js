/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a136c5a5892ebbf97c94";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?1000"))

/***/ }),

/***/ "./src/data/champion.json":
/*!********************************!*\
  !*** ./src/data/champion.json ***!
  \********************************/
/*! exports provided: type, format, version, data, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"champion\",\"format\":\"standAloneComplex\",\"version\":\"10.10.3208608\",\"data\":{\"Aatrox\":{\"version\":\"10.10.3208608\",\"id\":\"Aatrox\",\"key\":\"266\",\"name\":\"Aatrox\",\"title\":\"the Darkin Blade\",\"blurb\":\"Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Aatrox.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Blood Well\",\"stats\":{\"hp\":580,\"hpperlevel\":90,\"mp\":0,\"mpperlevel\":0,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.25,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":3,\"hpregenperlevel\":1,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.651}},\"Ahri\":{\"version\":\"10.10.3208608\",\"id\":\"Ahri\",\"key\":\"103\",\"name\":\"Ahri\",\"title\":\"the Nine-Tailed Fox\",\"blurb\":\"Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy. She revels in toying with her prey by manipulating their emotions before devouring their life essence. Despite her predatory nature...\",\"info\":{\"attack\":3,\"defense\":4,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Ahri.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":526,\"hpperlevel\":92,\"mp\":418,\"mpperlevel\":25,\"movespeed\":330,\"armor\":20.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.668}},\"Akali\":{\"version\":\"10.10.3208608\",\"id\":\"Akali\",\"key\":\"84\",\"name\":\"Akali\",\"title\":\"the Rogue Assassin\",\"blurb\":\"Abandoning the Kinkou Order and her title of the Fist of Shadow, Akali now strikes alone, ready to be the deadly weapon her people need. Though she holds onto all she learned from her master Shen, she has pledged to defend Ionia from its enemies, one...\",\"info\":{\"attack\":5,\"defense\":3,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"Akali.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"Energy\",\"stats\":{\"hp\":575,\"hpperlevel\":95,\"mp\":200,\"mpperlevel\":0,\"movespeed\":345,\"armor\":23,\"armorperlevel\":3.5,\"spellblock\":37,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.5,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62.4,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":3.2,\"attackspeed\":0.625}},\"Alistar\":{\"version\":\"10.10.3208608\",\"id\":\"Alistar\",\"key\":\"12\",\"name\":\"Alistar\",\"title\":\"the Minotaur\",\"blurb\":\"Always a mighty warrior with a fearsome reputation, Alistar seeks revenge for the death of his clan at the hands of the Noxian empire. Though he was enslaved and forced into the life of a gladiator, his unbreakable will was what kept him from truly...\",\"info\":{\"attack\":6,\"defense\":9,\"magic\":5,\"difficulty\":7},\"image\":{\"full\":\"Alistar.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":600,\"hpperlevel\":106,\"mp\":350,\"mpperlevel\":40,\"movespeed\":330,\"armor\":44,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":3.75,\"attackspeedperlevel\":2.125,\"attackspeed\":0.625}},\"Amumu\":{\"version\":\"10.10.3208608\",\"id\":\"Amumu\",\"key\":\"32\",\"name\":\"Amumu\",\"title\":\"the Sad Mummy\",\"blurb\":\"Legend claims that Amumu is a lonely and melancholy soul from ancient Shurima, roaming the world in search of a friend. Doomed by an ancient curse to remain alone forever, his touch is death, his affection ruin. Those who claim to have seen him describe...\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":8,\"difficulty\":3},\"image\":{\"full\":\"Amumu.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":613.12,\"hpperlevel\":84,\"mp\":287.2,\"mpperlevel\":40,\"movespeed\":335,\"armor\":33,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.85,\"mpregen\":7.382,\"mpregenperlevel\":0.525,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.38,\"attackdamageperlevel\":3.8,\"attackspeedperlevel\":2.18,\"attackspeed\":0.736}},\"Anivia\":{\"version\":\"10.10.3208608\",\"id\":\"Anivia\",\"key\":\"34\",\"name\":\"Anivia\",\"title\":\"the Cryophoenix\",\"blurb\":\"Anivia is a benevolent winged spirit who endures endless cycles of life, death, and rebirth to protect the Freljord. A demigod born of unforgiving ice and bitter winds, she wields those elemental powers to thwart any who dare disturb her homeland...\",\"info\":{\"attack\":1,\"defense\":4,\"magic\":10,\"difficulty\":10},\"image\":{\"full\":\"Anivia.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":480,\"hpperlevel\":82,\"mp\":495,\"mpperlevel\":25,\"movespeed\":325,\"armor\":21.22,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":600,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":51.376,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":1.68,\"attackspeed\":0.625}},\"Annie\":{\"version\":\"10.10.3208608\",\"id\":\"Annie\",\"key\":\"1\",\"name\":\"Annie\",\"title\":\"the Dark Child\",\"blurb\":\"Dangerous, yet disarmingly precocious, Annie is a child mage with immense pyromantic power. Even in the shadows of the mountains north of Noxus, she is a magical outlier. Her natural affinity for fire manifested early in life through unpredictable...\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":10,\"difficulty\":6},\"image\":{\"full\":\"Annie.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":524,\"hpperlevel\":88,\"mp\":418,\"mpperlevel\":25,\"movespeed\":335,\"armor\":19.22,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":625,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50.41,\"attackdamageperlevel\":2.625,\"attackspeedperlevel\":1.36,\"attackspeed\":0.579}},\"Aphelios\":{\"version\":\"10.10.3208608\",\"id\":\"Aphelios\",\"key\":\"523\",\"name\":\"Aphelios\",\"title\":\"the Weapon of the Faithful\",\"blurb\":\"Emerging from moonlight's shadow with weapons drawn, Aphelios kills the enemies of his faith in brooding silence—speaking only through the certainty of his aim, and the firing of each gun. Though fueled by a poison that renders him mute, he is guided by...\",\"info\":{\"attack\":6,\"defense\":2,\"magic\":1,\"difficulty\":10},\"image\":{\"full\":\"Aphelios.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":500,\"hpperlevel\":86,\"mp\":348,\"mpperlevel\":42,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3,\"spellblock\":26,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.25,\"hpregenperlevel\":0.55,\"mpregen\":6.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":2.2,\"attackspeedperlevel\":2.1,\"attackspeed\":0.64}},\"Ashe\":{\"version\":\"10.10.3208608\",\"id\":\"Ashe\",\"key\":\"22\",\"name\":\"Ashe\",\"title\":\"the Frost Archer\",\"blurb\":\"Iceborn warmother of the Avarosan tribe, Ashe commands the most populous horde in the north. Stoic, intelligent, and idealistic, yet uncomfortable with her role as leader, she taps into the ancestral magics of her lineage to wield a bow of True Ice...\",\"info\":{\"attack\":7,\"defense\":3,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"Ashe.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":539,\"hpperlevel\":85,\"mp\":280,\"mpperlevel\":32,\"movespeed\":325,\"armor\":26,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":600,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":2.96,\"attackspeedperlevel\":3.33,\"attackspeed\":0.658}},\"AurelionSol\":{\"version\":\"10.10.3208608\",\"id\":\"AurelionSol\",\"key\":\"136\",\"name\":\"Aurelion Sol\",\"title\":\"The Star Forger\",\"blurb\":\"Aurelion Sol once graced the vast emptiness of the cosmos with celestial wonders of his own devising. Now, he is forced to wield his awesome power at the behest of a space-faring empire that tricked him into servitude. Desiring a return to his...\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"AurelionSol.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":575,\"hpperlevel\":92,\"mp\":350,\"mpperlevel\":50,\"movespeed\":325,\"armor\":19,\"armorperlevel\":3.6,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Azir\":{\"version\":\"10.10.3208608\",\"id\":\"Azir\",\"key\":\"268\",\"name\":\"Azir\",\"title\":\"the Emperor of the Sands\",\"blurb\":\"Azir was a mortal emperor of Shurima in a far distant age, a proud man who stood at the cusp of immortality. His hubris saw him betrayed and murdered at the moment of his greatest triumph, but now, millennia later, he has been reborn as an Ascended...\",\"info\":{\"attack\":6,\"defense\":3,\"magic\":8,\"difficulty\":9},\"image\":{\"full\":\"Azir.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":552,\"hpperlevel\":92,\"mp\":480,\"mpperlevel\":21,\"movespeed\":335,\"armor\":19.04,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.75,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":2.8,\"attackspeedperlevel\":3,\"attackspeed\":0.625}},\"Bard\":{\"version\":\"10.10.3208608\",\"id\":\"Bard\",\"key\":\"432\",\"name\":\"Bard\",\"title\":\"the Wandering Caretaker\",\"blurb\":\"A traveler from beyond the stars, Bard is an agent of serendipity who fights to maintain a balance where life can endure the indifference of chaos. Many Runeterrans sing songs that ponder his extraordinary nature, yet they all agree that the cosmic...\",\"info\":{\"attack\":4,\"defense\":4,\"magic\":5,\"difficulty\":9},\"image\":{\"full\":\"Bard.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":575,\"hpperlevel\":89,\"mp\":350,\"mpperlevel\":50,\"movespeed\":330,\"armor\":34,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Blitzcrank\":{\"version\":\"10.10.3208608\",\"id\":\"Blitzcrank\",\"key\":\"53\",\"name\":\"Blitzcrank\",\"title\":\"the Great Steam Golem\",\"blurb\":\"Blitzcrank is an enormous, near-indestructible automaton from Zaun, originally built to dispose of hazardous waste. However, he found this primary purpose too restricting, and modified his own form to better serve the fragile people of the Sump...\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":5,\"difficulty\":4},\"image\":{\"full\":\"Blitzcrank.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":582.6,\"hpperlevel\":95,\"mp\":267.2,\"mpperlevel\":40,\"movespeed\":325,\"armor\":37,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61.54,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.13,\"attackspeed\":0.625}},\"Brand\":{\"version\":\"10.10.3208608\",\"id\":\"Brand\",\"key\":\"63\",\"name\":\"Brand\",\"title\":\"the Burning Vengeance\",\"blurb\":\"Once a tribesman of the icy Freljord named Kegan Rodhe, the creature known as Brand is a lesson in the temptation of greater power. Seeking one of the legendary World Runes, Kegan betrayed his companions and seized it for himself—and, in an instant, the...\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":9,\"difficulty\":4},\"image\":{\"full\":\"Brand.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":519.68,\"hpperlevel\":88,\"mp\":469,\"mpperlevel\":21,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":10.665,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Braum\":{\"version\":\"10.10.3208608\",\"id\":\"Braum\",\"key\":\"201\",\"name\":\"Braum\",\"title\":\"the Heart of the Freljord\",\"blurb\":\"Blessed with massive biceps and an even bigger heart, Braum is a beloved hero of the Freljord. Every mead hall north of Frostheld toasts his legendary strength, said to have felled a forest of oaks in a single night, and punched an entire mountain into...\",\"info\":{\"attack\":3,\"defense\":9,\"magic\":4,\"difficulty\":3},\"image\":{\"full\":\"Braum.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":98,\"mp\":310.6,\"mpperlevel\":45,\"movespeed\":335,\"armor\":47,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":1,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.376,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":3.5,\"attackspeed\":0.644}},\"Caitlyn\":{\"version\":\"10.10.3208608\",\"id\":\"Caitlyn\",\"key\":\"51\",\"name\":\"Caitlyn\",\"title\":\"the Sheriff of Piltover\",\"blurb\":\"Renowned as its finest peacekeeper, Caitlyn is also Piltover's best shot at ridding the city of its elusive criminal elements. She is often paired with Vi, acting as a cool counterpoint to her partner's more impetuous nature. Even though she carries a...\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":2,\"difficulty\":6},\"image\":{\"full\":\"Caitlyn.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":481,\"hpperlevel\":91,\"mp\":313.7,\"mpperlevel\":35,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":650,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":7.4,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":2.88,\"attackspeedperlevel\":4,\"attackspeed\":0.681}},\"Camille\":{\"version\":\"10.10.3208608\",\"id\":\"Camille\",\"key\":\"164\",\"name\":\"Camille\",\"title\":\"the Steel Shadow\",\"blurb\":\"Weaponized to operate outside the boundaries of the law, Camille is the Principal Intelligencer of Clan Ferros—an elegant and elite agent who ensures the Piltover machine and its Zaunite underbelly runs smoothly. Adaptable and precise, she views sloppy...\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Camille.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":575.6,\"hpperlevel\":85,\"mp\":338.8,\"mpperlevel\":32,\"movespeed\":340,\"armor\":35,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.8,\"mpregen\":8.15,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.644}},\"Cassiopeia\":{\"version\":\"10.10.3208608\",\"id\":\"Cassiopeia\",\"key\":\"69\",\"name\":\"Cassiopeia\",\"title\":\"the Serpent's Embrace\",\"blurb\":\"Cassiopeia is a deadly creature bent on manipulating others to her sinister will. Youngest and most beautiful daughter of the noble Du Couteau family of Noxus, she ventured deep into the crypts beneath Shurima in search of ancient power. There, she was...\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":9,\"difficulty\":10},\"image\":{\"full\":\"Cassiopeia.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":575,\"hpperlevel\":90,\"mp\":350,\"mpperlevel\":40,\"movespeed\":328,\"armor\":20,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.5,\"attackspeed\":0.647}},\"Chogath\":{\"version\":\"10.10.3208608\",\"id\":\"Chogath\",\"key\":\"31\",\"name\":\"Cho'Gath\",\"title\":\"the Terror of the Void\",\"blurb\":\"From the moment Cho'Gath first emerged into the harsh light of Runeterra's sun, the beast was driven by the most pure and insatiable hunger. A perfect expression of the Void's desire to consume all life, Cho'Gath's complex biology quickly converts...\",\"info\":{\"attack\":3,\"defense\":7,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Chogath.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":574.4,\"hpperlevel\":80,\"mp\":272.2,\"mpperlevel\":40,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.85,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":4.2,\"attackspeedperlevel\":1.44,\"attackspeed\":0.625}},\"Corki\":{\"version\":\"10.10.3208608\",\"id\":\"Corki\",\"key\":\"42\",\"name\":\"Corki\",\"title\":\"the Daring Bombardier\",\"blurb\":\"The yordle pilot Corki loves two things above all others: flying, and his glamorous mustache... though not necessarily in that order. After leaving Bandle City, he settled in Piltover and fell in love with the wondrous machines he found there. He...\",\"info\":{\"attack\":8,\"defense\":3,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Corki.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":518,\"hpperlevel\":87,\"mp\":350.16,\"mpperlevel\":34,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":7.424,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":2.3,\"attackspeed\":0.638}},\"Darius\":{\"version\":\"10.10.3208608\",\"id\":\"Darius\",\"key\":\"122\",\"name\":\"Darius\",\"title\":\"the Hand of Noxus\",\"blurb\":\"There is no greater symbol of Noxian might than Darius, the nation's most feared and battle-hardened commander. Rising from humble origins to become the Hand of Noxus, he cleaves through the empire's enemies—many of them Noxians themselves. Knowing that...\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":1,\"difficulty\":2},\"image\":{\"full\":\"Darius.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":582.24,\"hpperlevel\":100,\"mp\":263,\"mpperlevel\":37.5,\"movespeed\":340,\"armor\":39,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":10,\"hpregenperlevel\":0.95,\"mpregen\":6.6,\"mpregenperlevel\":0.35,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":5,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Diana\":{\"version\":\"10.10.3208608\",\"id\":\"Diana\",\"key\":\"131\",\"name\":\"Diana\",\"title\":\"Scorn of the Moon\",\"blurb\":\"Bearing her crescent moonblade, Diana fights as a warrior of the Lunari—a faith all but quashed in the lands around Mount Targon. Clad in shimmering armor the color of winter snow at night, she is a living embodiment of the silver moon's power. Imbued...\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":8,\"difficulty\":4},\"image\":{\"full\":\"Diana.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":570,\"hpperlevel\":95,\"mp\":375,\"mpperlevel\":25,\"movespeed\":345,\"armor\":31,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":7.5,\"hpregenperlevel\":0.85,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.25,\"attackspeed\":0.625}},\"Draven\":{\"version\":\"10.10.3208608\",\"id\":\"Draven\",\"key\":\"119\",\"name\":\"Draven\",\"title\":\"the Glorious Executioner\",\"blurb\":\"In Noxus, warriors known as Reckoners face one another in arenas where blood is spilled and strength tested—but none has ever been as celebrated as Draven. A former soldier, he found that the crowds uniquely appreciated his flair for the dramatic, and...\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Draven.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":574,\"hpperlevel\":88,\"mp\":360.56,\"mpperlevel\":39,\"movespeed\":330,\"armor\":29,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.7,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.61,\"attackspeedperlevel\":2.7,\"attackspeed\":0.679}},\"DrMundo\":{\"version\":\"10.10.3208608\",\"id\":\"DrMundo\",\"key\":\"36\",\"name\":\"Dr. Mundo\",\"title\":\"the Madman of Zaun\",\"blurb\":\"Utterly insane, unrepentantly homicidal, and horrifyingly purple, Dr. Mundo is what keeps many of Zaun's citizens indoors on particularly dark nights. This monosyllabic monstrosity seems to want nothing more than pain—both the giving of it, and the...\",\"info\":{\"attack\":5,\"defense\":7,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"DrMundo.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"None\",\"stats\":{\"hp\":582.52,\"hpperlevel\":89,\"mp\":0,\"mpperlevel\":0,\"movespeed\":345,\"armor\":36,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61.27,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.8,\"attackspeed\":0.721}},\"Ekko\":{\"version\":\"10.10.3208608\",\"id\":\"Ekko\",\"key\":\"245\",\"name\":\"Ekko\",\"title\":\"the Boy Who Shattered Time\",\"blurb\":\"A prodigy from the rough streets of Zaun, Ekko manipulates time to twist any situation to his advantage. Using his own invention, the Zero Drive, he explores the branching possibilities of reality to craft the perfect moment. Though he revels in this...\",\"info\":{\"attack\":5,\"defense\":3,\"magic\":7,\"difficulty\":8},\"image\":{\"full\":\"Ekko.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":280,\"mpperlevel\":50,\"movespeed\":340,\"armor\":32,\"armorperlevel\":3,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":7,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.3,\"attackspeed\":0.688}},\"Elise\":{\"version\":\"10.10.3208608\",\"id\":\"Elise\",\"key\":\"60\",\"name\":\"Elise\",\"title\":\"the Spider Queen\",\"blurb\":\"Elise is a deadly predator who dwells in a shuttered, lightless palace, deep within the oldest city of Noxus. Once mortal, she was the mistress of a powerful house, but the bite of a vile demigod transformed her into something beautiful, yet utterly...\",\"info\":{\"attack\":6,\"defense\":5,\"magic\":7,\"difficulty\":9},\"image\":{\"full\":\"Elise.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":534,\"hpperlevel\":93,\"mp\":324,\"mpperlevel\":50,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3.35,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.75,\"attackspeed\":0.625}},\"Evelynn\":{\"version\":\"10.10.3208608\",\"id\":\"Evelynn\",\"key\":\"28\",\"name\":\"Evelynn\",\"title\":\"Agony's Embrace\",\"blurb\":\"Within the dark seams of Runeterra, the demon Evelynn searches for her next victim. She lures in prey with the voluptuous façade of a human female, but once a person succumbs to her charms, Evelynn's true form is unleashed. She then subjects her victim...\",\"info\":{\"attack\":4,\"defense\":2,\"magic\":7,\"difficulty\":10},\"image\":{\"full\":\"Evelynn.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":572,\"hpperlevel\":84,\"mp\":315.6,\"mpperlevel\":42,\"movespeed\":335,\"armor\":37,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":8.108,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.1,\"attackspeed\":0.667}},\"Ezreal\":{\"version\":\"10.10.3208608\",\"id\":\"Ezreal\",\"key\":\"81\",\"name\":\"Ezreal\",\"title\":\"the Prodigal Explorer\",\"blurb\":\"A dashing adventurer, unknowingly gifted in the magical arts, Ezreal raids long-lost catacombs, tangles with ancient curses, and overcomes seemingly impossible odds with ease. His courage and bravado knowing no bounds, he prefers to improvise his way...\",\"info\":{\"attack\":7,\"defense\":2,\"magic\":6,\"difficulty\":7},\"image\":{\"full\":\"Ezreal.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":500,\"hpperlevel\":86,\"mp\":375,\"mpperlevel\":50,\"movespeed\":325,\"armor\":22,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":4,\"hpregenperlevel\":0.55,\"mpregen\":8.5,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Fiddlesticks\":{\"version\":\"10.10.3208608\",\"id\":\"Fiddlesticks\",\"key\":\"9\",\"name\":\"Fiddlesticks\",\"title\":\"the Ancient Fear\",\"blurb\":\"Something has awoken in Runeterra. Something ancient. Something terrible. The ageless horror known as Fiddlesticks stalks the edges of mortal society, drawn to areas thick with paranoia where it feeds upon terrorized victims. Wielding a jagged scythe...\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":9,\"difficulty\":9},\"image\":{\"full\":\"Fiddlesticks.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":580.4,\"hpperlevel\":92,\"mp\":500,\"mpperlevel\":28,\"movespeed\":335,\"armor\":34,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":480,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.36,\"attackdamageperlevel\":2.625,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}},\"Fiora\":{\"version\":\"10.10.3208608\",\"id\":\"Fiora\",\"key\":\"114\",\"name\":\"Fiora\",\"title\":\"the Grand Duelist\",\"blurb\":\"The most feared duelist in all Valoran, Fiora is as renowned for her brusque manner and cunning mind as she is for the speed of her bluesteel rapier. Born to House Laurent in the kingdom of Demacia, Fiora took control of the family from her father in...\",\"info\":{\"attack\":10,\"defense\":4,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"Fiora.png\",\"sprite\":\"champion0.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":550,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":40,\"movespeed\":345,\"armor\":33,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":3.2,\"attackspeed\":0.69}},\"Fizz\":{\"version\":\"10.10.3208608\",\"id\":\"Fizz\",\"key\":\"105\",\"name\":\"Fizz\",\"title\":\"the Tidal Trickster\",\"blurb\":\"Fizz is an amphibious yordle, who dwells among the reefs surrounding Bilgewater. He often retrieves and returns the tithes cast into the sea by superstitious captains, but even the saltiest of sailors know better than to cross him—for many are the tales...\",\"info\":{\"attack\":6,\"defense\":4,\"magic\":7,\"difficulty\":6},\"image\":{\"full\":\"Fizz.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":570,\"hpperlevel\":98,\"mp\":317.2,\"mpperlevel\":37,\"movespeed\":335,\"armor\":22.412,\"armorperlevel\":3.4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.1,\"attackspeed\":0.658}},\"Galio\":{\"version\":\"10.10.3208608\",\"id\":\"Galio\",\"key\":\"3\",\"name\":\"Galio\",\"title\":\"the Colossus\",\"blurb\":\"Outside the gleaming city of Demacia, the stone colossus Galio keeps vigilant watch. Built as a bulwark against enemy mages, he often stands motionless for decades until the presence of powerful magic stirs him to life. Once activated, Galio makes the...\",\"info\":{\"attack\":1,\"defense\":10,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"Galio.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":562,\"hpperlevel\":112,\"mp\":500,\"mpperlevel\":40,\"movespeed\":335,\"armor\":24,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":9.5,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.5,\"attackspeed\":0.625}},\"Gangplank\":{\"version\":\"10.10.3208608\",\"id\":\"Gangplank\",\"key\":\"41\",\"name\":\"Gangplank\",\"title\":\"the Saltwater Scourge\",\"blurb\":\"As unpredictable as he is brutal, the dethroned reaver king Gangplank is feared far and wide. Once, he ruled the port city of Bilgewater, and while his reign is over, there are those who believe this has only made him more dangerous. Gangplank would see...\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":4,\"difficulty\":9},\"image\":{\"full\":\"Gangplank.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":82,\"mp\":282,\"mpperlevel\":40,\"movespeed\":345,\"armor\":35,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":7.5,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.2,\"attackspeed\":0.658}},\"Garen\":{\"version\":\"10.10.3208608\",\"id\":\"Garen\",\"key\":\"86\",\"name\":\"Garen\",\"title\":\"The Might of Demacia\",\"blurb\":\"A proud and noble warrior, Garen fights as one of the Dauntless Vanguard. He is popular among his fellows, and respected well enough by his enemies—not least as a scion of the prestigious Crownguard family, entrusted with defending Demacia and its...\",\"info\":{\"attack\":7,\"defense\":7,\"magic\":1,\"difficulty\":5},\"image\":{\"full\":\"Garen.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"None\",\"stats\":{\"hp\":620,\"hpperlevel\":84,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":0.75,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":4.5,\"attackspeedperlevel\":3.65,\"attackspeed\":0.625}},\"Gnar\":{\"version\":\"10.10.3208608\",\"id\":\"Gnar\",\"key\":\"150\",\"name\":\"Gnar\",\"title\":\"the Missing Link\",\"blurb\":\"Gnar is a primeval yordle whose playful antics can erupt into a toddler's outrage in an instant, transforming him into a massive beast bent on destruction. Frozen in True Ice for millennia, the curious creature broke free and now hops about a changed...\",\"info\":{\"attack\":6,\"defense\":5,\"magic\":5,\"difficulty\":8},\"image\":{\"full\":\"Gnar.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Rage\",\"stats\":{\"hp\":510,\"hpperlevel\":65,\"mp\":100,\"mpperlevel\":0,\"movespeed\":335,\"armor\":32,\"armorperlevel\":2.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":175,\"hpregen\":4.5,\"hpregenperlevel\":1.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":3,\"attackspeedperlevel\":6,\"attackspeed\":0.625}},\"Gragas\":{\"version\":\"10.10.3208608\",\"id\":\"Gragas\",\"key\":\"79\",\"name\":\"Gragas\",\"title\":\"the Rabble Rouser\",\"blurb\":\"Equal parts jolly and imposing, Gragas is a massive, rowdy brewmaster on his own quest for the perfect pint of ale. Hailing from parts unknown, he now searches for rare ingredients among the unblemished wastes of the Freljord, trying each recipe as he...\",\"info\":{\"attack\":4,\"defense\":7,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"Gragas.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":600,\"hpperlevel\":95,\"mp\":400,\"mpperlevel\":47,\"movespeed\":330,\"armor\":35,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.05,\"attackspeed\":0.675}},\"Graves\":{\"version\":\"10.10.3208608\",\"id\":\"Graves\",\"key\":\"104\",\"name\":\"Graves\",\"title\":\"the Outlaw\",\"blurb\":\"Malcolm Graves is a renowned mercenary, gambler, and thief—a wanted man in every city and empire he has visited. Even though he has an explosive temper, he possesses a strict sense of criminal honor, often enforced at the business end of his...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":3},\"image\":{\"full\":\"Graves.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":555,\"hpperlevel\":92,\"mp\":325,\"mpperlevel\":40,\"movespeed\":340,\"armor\":33,\"armorperlevel\":3.4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":425,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":8,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.6,\"attackspeed\":0.475}},\"Hecarim\":{\"version\":\"10.10.3208608\",\"id\":\"Hecarim\",\"key\":\"120\",\"name\":\"Hecarim\",\"title\":\"the Shadow of War\",\"blurb\":\"Hecarim is a spectral fusion of man and beast, cursed to ride down the souls of the living for all eternity. When the Blessed Isles fell into shadow, this proud knight was obliterated by the destructive energies of the Ruination, along with all his...\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":4,\"difficulty\":6},\"image\":{\"full\":\"Hecarim.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":580,\"hpperlevel\":90,\"mp\":277.2,\"mpperlevel\":40,\"movespeed\":345,\"armor\":36,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7,\"hpregenperlevel\":0.75,\"mpregen\":6.5,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.67}},\"Heimerdinger\":{\"version\":\"10.10.3208608\",\"id\":\"Heimerdinger\",\"key\":\"74\",\"name\":\"Heimerdinger\",\"title\":\"the Revered Inventor\",\"blurb\":\"A brilliant yet eccentric yordle scientist, Professor Cecil B. Heimerdinger is one of the most innovative and esteemed inventors Piltover has ever known. Relentless in his work to the point of neurotic obsession, he thrives on answering the universe's...\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":8,\"difficulty\":8},\"image\":{\"full\":\"Heimerdinger.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":488,\"hpperlevel\":87,\"mp\":385,\"mpperlevel\":20,\"movespeed\":340,\"armor\":19.04,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.536,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Illaoi\":{\"version\":\"10.10.3208608\",\"id\":\"Illaoi\",\"key\":\"420\",\"name\":\"Illaoi\",\"title\":\"the Kraken Priestess\",\"blurb\":\"Illaoi's powerful physique is dwarfed only by her indomitable faith. As the prophet of the Great Kraken, she uses a huge, golden idol to rip her foes' spirits from their bodies and shatter their perception of reality. All who challenge the “Truth Bearer...\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Illaoi.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585.6,\"hpperlevel\":95,\"mp\":300,\"mpperlevel\":40,\"movespeed\":340,\"armor\":35,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9.5,\"hpregenperlevel\":0.8,\"mpregen\":7.5,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2.5,\"attackspeed\":0.571}},\"Irelia\":{\"version\":\"10.10.3208608\",\"id\":\"Irelia\",\"key\":\"39\",\"name\":\"Irelia\",\"title\":\"the Blade Dancer\",\"blurb\":\"The Noxian occupation of Ionia produced many heroes, none more unlikely than young Irelia of Navori. Trained in the ancient dances of her province, she adapted her art for war, using the graceful and carefully practised movements to levitate a host of...\",\"info\":{\"attack\":7,\"defense\":4,\"magic\":5,\"difficulty\":5},\"image\":{\"full\":\"Irelia.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":580,\"hpperlevel\":95,\"mp\":350,\"mpperlevel\":30,\"movespeed\":335,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":200,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.656}},\"Ivern\":{\"version\":\"10.10.3208608\",\"id\":\"Ivern\",\"key\":\"427\",\"name\":\"Ivern\",\"title\":\"the Green Father\",\"blurb\":\"Ivern Bramblefoot, known to many as the Green Father, is a peculiar half man, half tree who roams Runeterra's forests, cultivating life everywhere he goes. He knows the secrets of the natural world, and holds deep friendships with all things that grow...\",\"info\":{\"attack\":3,\"defense\":5,\"magic\":7,\"difficulty\":7},\"image\":{\"full\":\"Ivern.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585,\"hpperlevel\":95,\"mp\":450,\"mpperlevel\":60,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":475,\"hpregen\":7,\"hpregenperlevel\":0.85,\"mpregen\":6,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.4,\"attackspeed\":0.644}},\"Janna\":{\"version\":\"10.10.3208608\",\"id\":\"Janna\",\"key\":\"40\",\"name\":\"Janna\",\"title\":\"the Storm's Fury\",\"blurb\":\"Armed with the power of Runeterra's gales, Janna is a mysterious, elemental wind spirit who protects the dispossessed of Zaun. Some believe she was brought into existence by the pleas of Runeterra's sailors who prayed for fair winds as they navigated...\",\"info\":{\"attack\":3,\"defense\":5,\"magic\":7,\"difficulty\":7},\"image\":{\"full\":\"Janna.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":500,\"hpperlevel\":70,\"mp\":350,\"mpperlevel\":64,\"movespeed\":315,\"armor\":28,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":46,\"attackdamageperlevel\":1.5,\"attackspeedperlevel\":2.95,\"attackspeed\":0.625}},\"JarvanIV\":{\"version\":\"10.10.3208608\",\"id\":\"JarvanIV\",\"key\":\"59\",\"name\":\"Jarvan IV\",\"title\":\"the Exemplar of Demacia\",\"blurb\":\"Prince Jarvan, scion of the Lightshield dynasty, is heir apparent to the throne of Demacia. Raised to be a paragon of his nation's greatest virtues, he is forced to balance the heavy expectations placed upon him with his own desire to fight on the front...\",\"info\":{\"attack\":6,\"defense\":8,\"magic\":3,\"difficulty\":5},\"image\":{\"full\":\"JarvanIV.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":570,\"hpperlevel\":90,\"mp\":300,\"mpperlevel\":40,\"movespeed\":340,\"armor\":34,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":6.5,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.658}},\"Jax\":{\"version\":\"10.10.3208608\",\"id\":\"Jax\",\"key\":\"24\",\"name\":\"Jax\",\"title\":\"Grandmaster at Arms\",\"blurb\":\"Unmatched in both his skill with unique armaments and his biting sarcasm, Jax is the last known weapons master of Icathia. After his homeland was laid low by its own hubris in unleashing the Void, Jax and his kind vowed to protect what little remained...\",\"info\":{\"attack\":7,\"defense\":5,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Jax.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":592.8,\"hpperlevel\":85,\"mp\":338.8,\"mpperlevel\":32,\"movespeed\":350,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":7.576,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.375,\"attackspeedperlevel\":3.4,\"attackspeed\":0.638}},\"Jayce\":{\"version\":\"10.10.3208608\",\"id\":\"Jayce\",\"key\":\"126\",\"name\":\"Jayce\",\"title\":\"the Defender of Tomorrow\",\"blurb\":\"Jayce is a brilliant inventor who has pledged his life to the defense of Piltover and its unyielding pursuit of progress. With his transforming hextech hammer in hand, Jayce uses his strength, courage, and considerable intelligence to protect his...\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":3,\"difficulty\":7},\"image\":{\"full\":\"Jayce.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":560,\"hpperlevel\":90,\"mp\":375,\"mpperlevel\":45,\"movespeed\":335,\"armor\":27,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54,\"attackdamageperlevel\":4.25,\"attackspeedperlevel\":3,\"attackspeed\":0.658}},\"Jhin\":{\"version\":\"10.10.3208608\",\"id\":\"Jhin\",\"key\":\"202\",\"name\":\"Jhin\",\"title\":\"the Virtuoso\",\"blurb\":\"Jhin is a meticulous criminal psychopath who believes murder is art. Once an Ionian prisoner, but freed by shadowy elements within Ionia's ruling council, the serial killer now works as their cabal's assassin. Using his gun as his paintbrush, Jhin...\",\"info\":{\"attack\":10,\"defense\":2,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Jhin.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":556,\"hpperlevel\":91,\"mp\":300,\"mpperlevel\":50,\"movespeed\":330,\"armor\":24,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":4.7,\"attackspeedperlevel\":0,\"attackspeed\":0.625}},\"Jinx\":{\"version\":\"10.10.3208608\",\"id\":\"Jinx\",\"key\":\"222\",\"name\":\"Jinx\",\"title\":\"the Loose Cannon\",\"blurb\":\"A manic and impulsive criminal from Zaun, Jinx lives to wreak havoc without care for the consequences. With an arsenal of deadly weapons, she unleashes the loudest blasts and brightest explosions to leave a trail of mayhem and panic in her wake. Jinx...\",\"info\":{\"attack\":9,\"defense\":2,\"magic\":4,\"difficulty\":6},\"image\":{\"full\":\"Jinx.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":581,\"hpperlevel\":84,\"mp\":245,\"mpperlevel\":45,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.75,\"hpregenperlevel\":0.5,\"mpregen\":6.7,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":57,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Kaisa\":{\"version\":\"10.10.3208608\",\"id\":\"Kaisa\",\"key\":\"145\",\"name\":\"Kai'Sa\",\"title\":\"Daughter of the Void\",\"blurb\":\"Claimed by the Void when she was only a child, Kai'Sa managed to survive through sheer tenacity and strength of will. Her experiences have made her a deadly hunter and, to some, the harbinger of a future they would rather not live to see. Having entered...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Kaisa.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":571,\"hpperlevel\":86,\"mp\":344.88,\"mpperlevel\":38,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":8.2,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":1.7,\"attackspeedperlevel\":1.8,\"attackspeed\":0.644}},\"Kalista\":{\"version\":\"10.10.3208608\",\"id\":\"Kalista\",\"key\":\"429\",\"name\":\"Kalista\",\"title\":\"the Spear of Vengeance\",\"blurb\":\"A specter of wrath and retribution, Kalista is the undying spirit of vengeance, an armored nightmare summoned from the Shadow Isles to hunt deceivers and traitors. The betrayed may cry out in blood to be avenged, but Kalista only answers those willing...\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":4,\"difficulty\":7},\"image\":{\"full\":\"Kalista.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":534,\"hpperlevel\":100,\"mp\":250,\"mpperlevel\":45,\"movespeed\":325,\"armor\":21,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.75,\"hpregenperlevel\":0.55,\"mpregen\":6.3,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":4,\"attackspeedperlevel\":4,\"attackspeed\":0.694}},\"Karma\":{\"version\":\"10.10.3208608\",\"id\":\"Karma\",\"key\":\"43\",\"name\":\"Karma\",\"title\":\"the Enlightened One\",\"blurb\":\"No mortal exemplifies the spiritual traditions of Ionia more than Karma. She is the living embodiment of an ancient soul reincarnated countless times, carrying all her accumulated memories into each new life, and blessed with power that few can...\",\"info\":{\"attack\":1,\"defense\":7,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Karma.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":534,\"hpperlevel\":95,\"mp\":374,\"mpperlevel\":50,\"movespeed\":335,\"armor\":26,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.544,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.3,\"attackspeed\":0.625}},\"Karthus\":{\"version\":\"10.10.3208608\",\"id\":\"Karthus\",\"key\":\"30\",\"name\":\"Karthus\",\"title\":\"the Deathsinger\",\"blurb\":\"The harbinger of oblivion, Karthus is an undying spirit whose haunting songs are a prelude to the horror of his nightmarish appearance. The living fear the eternity of undeath, but Karthus sees only beauty and purity in its embrace, a perfect union of...\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":7},\"image\":{\"full\":\"Karthus.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":528,\"hpperlevel\":87,\"mp\":467,\"mpperlevel\":30.5,\"movespeed\":325,\"armor\":20.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":6.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":45.66,\"attackdamageperlevel\":3.25,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}},\"Kassadin\":{\"version\":\"10.10.3208608\",\"id\":\"Kassadin\",\"key\":\"38\",\"name\":\"Kassadin\",\"title\":\"the Void Walker\",\"blurb\":\"Cutting a burning swath through the darkest places of the world, Kassadin knows his days are numbered. A widely traveled Shuriman guide and adventurer, he had chosen to raise a family among the peaceful southern tribes—until the day his village was...\",\"info\":{\"attack\":3,\"defense\":5,\"magic\":8,\"difficulty\":8},\"image\":{\"full\":\"Kassadin.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":576,\"hpperlevel\":90,\"mp\":397.6,\"mpperlevel\":67,\"movespeed\":335,\"armor\":19,\"armorperlevel\":2.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":150,\"hpregen\":6,\"hpregenperlevel\":0.5,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58.852,\"attackdamageperlevel\":3.9,\"attackspeedperlevel\":3.7,\"attackspeed\":0.64}},\"Katarina\":{\"version\":\"10.10.3208608\",\"id\":\"Katarina\",\"key\":\"55\",\"name\":\"Katarina\",\"title\":\"the Sinister Blade\",\"blurb\":\"Decisive in judgment and lethal in combat, Katarina is a Noxian assassin of the highest caliber. Eldest daughter to the legendary General Du Couteau, she made her talents known with swift kills against unsuspecting enemies. Her fiery ambition has driven...\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":9,\"difficulty\":8},\"image\":{\"full\":\"Katarina.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"None\",\"stats\":{\"hp\":602,\"hpperlevel\":94,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":27.88,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.74,\"attackspeed\":0.658}},\"Kayle\":{\"version\":\"10.10.3208608\",\"id\":\"Kayle\",\"key\":\"10\",\"name\":\"Kayle\",\"title\":\"the Righteous\",\"blurb\":\"Born to a Targonian Aspect at the height of the Rune Wars, Kayle honored her mother's legacy by fighting for justice on wings of divine flame. She and her twin sister Morgana were the protectors of Demacia for many years—until Kayle became disillusioned...\",\"info\":{\"attack\":6,\"defense\":6,\"magic\":7,\"difficulty\":7},\"image\":{\"full\":\"Kayle.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":600,\"hpperlevel\":85,\"mp\":330,\"mpperlevel\":50,\"movespeed\":335,\"armor\":26,\"armorperlevel\":3,\"spellblock\":34,\"spellblockperlevel\":0.5,\"attackrange\":175,\"hpregen\":5,\"hpregenperlevel\":0.5,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":1.5,\"attackspeed\":0.625}},\"Kayn\":{\"version\":\"10.10.3208608\",\"id\":\"Kayn\",\"key\":\"141\",\"name\":\"Kayn\",\"title\":\"the Shadow Reaper\",\"blurb\":\"A peerless practitioner of lethal shadow magic, Shieda Kayn battles to achieve his true destiny—to one day lead the Order of Shadow into a new era of Ionian supremacy. He wields the sentient darkin weapon Rhaast, undeterred by its creeping corruption of...\",\"info\":{\"attack\":10,\"defense\":6,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Kayn.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":410,\"mpperlevel\":50,\"movespeed\":340,\"armor\":38,\"armorperlevel\":3.3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.75,\"mpregen\":11.5,\"mpregenperlevel\":0.95,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.7,\"attackspeed\":0.669}},\"Kennen\":{\"version\":\"10.10.3208608\",\"id\":\"Kennen\",\"key\":\"85\",\"name\":\"Kennen\",\"title\":\"the Heart of the Tempest\",\"blurb\":\"More than just the lightning-quick enforcer of Ionian balance, Kennen is the only yordle member of the Kinkou. Despite his small, furry stature, he is eager to take on any threat with a whirling storm of shuriken and boundless enthusiasm. Alongside his...\",\"info\":{\"attack\":6,\"defense\":4,\"magic\":7,\"difficulty\":4},\"image\":{\"full\":\"Kennen.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Marksman\"],\"partype\":\"Energy\",\"stats\":{\"hp\":541,\"hpperlevel\":84,\"mp\":200,\"mpperlevel\":0,\"movespeed\":335,\"armor\":29,\"armorperlevel\":3.75,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.65,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":48,\"attackdamageperlevel\":3.75,\"attackspeedperlevel\":3.4,\"attackspeed\":0.625}},\"Khazix\":{\"version\":\"10.10.3208608\",\"id\":\"Khazix\",\"key\":\"121\",\"name\":\"Kha'Zix\",\"title\":\"the Voidreaver\",\"blurb\":\"The Void grows, and the Void adapts—in none of its myriad spawn are these truths more apparent than Kha'Zix. Evolution drives the core of this mutating horror, born to survive and to slay the strong. Where it struggles to do so, it grows new, more...\",\"info\":{\"attack\":9,\"defense\":4,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Khazix.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":572.8,\"hpperlevel\":85,\"mp\":327.2,\"mpperlevel\":40,\"movespeed\":350,\"armor\":36,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.75,\"mpregen\":7.59,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.7,\"attackspeed\":0.668}},\"Kindred\":{\"version\":\"10.10.3208608\",\"id\":\"Kindred\",\"key\":\"203\",\"name\":\"Kindred\",\"title\":\"The Eternal Hunters\",\"blurb\":\"Separate, but never parted, Kindred represents the twin essences of death. Lamb's bow offers a swift release from the mortal realm for those who accept their fate. Wolf hunts down those who run from their end, delivering violent finality within his...\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"Kindred.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":35,\"movespeed\":325,\"armor\":29,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":7,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Kled\":{\"version\":\"10.10.3208608\",\"id\":\"Kled\",\"key\":\"240\",\"name\":\"Kled\",\"title\":\"the Cantankerous Cavalier\",\"blurb\":\"A warrior as fearless as he is ornery, the yordle Kled embodies the furious bravado of Noxus. He is an icon beloved by the empire's soldiers, distrusted by its officers, and loathed by the nobility. Many claim Kled has fought in every campaign the...\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":2,\"difficulty\":7},\"image\":{\"full\":\"Kled.png\",\"sprite\":\"champion1.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Courage\",\"stats\":{\"hp\":340,\"hpperlevel\":70,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":35,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"KogMaw\":{\"version\":\"10.10.3208608\",\"id\":\"KogMaw\",\"key\":\"96\",\"name\":\"Kog'Maw\",\"title\":\"the Mouth of the Abyss\",\"blurb\":\"Belched forth from a rotting Void incursion deep in the wastelands of Icathia, Kog'Maw is an inquisitive yet putrid creature with a caustic, gaping mouth. This particular Void-spawn needs to gnaw and drool on anything within reach to truly understand it...\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":5,\"difficulty\":6},\"image\":{\"full\":\"KogMaw.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":534,\"hpperlevel\":88,\"mp\":325,\"mpperlevel\":40,\"movespeed\":330,\"armor\":24,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.75,\"hpregenperlevel\":0.55,\"mpregen\":8.75,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.11,\"attackspeedperlevel\":2.65,\"attackspeed\":0.665}},\"Leblanc\":{\"version\":\"10.10.3208608\",\"id\":\"Leblanc\",\"key\":\"7\",\"name\":\"LeBlanc\",\"title\":\"the Deceiver\",\"blurb\":\"Mysterious even to other members of the Black Rose cabal, LeBlanc is but one of many names for a pale woman who has manipulated people and events since the earliest days of Noxus. Using her magic to mirror herself, the sorceress can appear to anyone...\",\"info\":{\"attack\":1,\"defense\":4,\"magic\":10,\"difficulty\":9},\"image\":{\"full\":\"Leblanc.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":528,\"hpperlevel\":92,\"mp\":334,\"mpperlevel\":50,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7.5,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.88,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.4,\"attackspeed\":0.625}},\"LeeSin\":{\"version\":\"10.10.3208608\",\"id\":\"LeeSin\",\"key\":\"64\",\"name\":\"Lee Sin\",\"title\":\"the Blind Monk\",\"blurb\":\"A master of Ionia's ancient martial arts, Lee Sin is a principled fighter who channels the essence of the dragon spirit to face any challenge. Though he lost his sight many years ago, the warrior-monk has devoted his life to protecting his homeland...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"LeeSin.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Energy\",\"stats\":{\"hp\":575,\"hpperlevel\":85,\"mp\":200,\"mpperlevel\":0,\"movespeed\":345,\"armor\":33,\"armorperlevel\":3.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":70,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":3,\"attackspeed\":0.651}},\"Leona\":{\"version\":\"10.10.3208608\",\"id\":\"Leona\",\"key\":\"89\",\"name\":\"Leona\",\"title\":\"the Radiant Dawn\",\"blurb\":\"Imbued with the fire of the sun, Leona is a holy warrior of the Solari who defends Mount Targon with her Zenith Blade and the Shield of Daybreak. Her skin shimmers with starfire while her eyes burn with the power of the celestial Aspect within her...\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Leona.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":576.16,\"hpperlevel\":87,\"mp\":302.2,\"mpperlevel\":40,\"movespeed\":335,\"armor\":47,\"armorperlevel\":3.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60.04,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.9,\"attackspeed\":0.625}},\"Lissandra\":{\"version\":\"10.10.3208608\",\"id\":\"Lissandra\",\"key\":\"127\",\"name\":\"Lissandra\",\"title\":\"the Ice Witch\",\"blurb\":\"Lissandra's magic twists the pure power of ice into something dark and terrible. With the force of her black ice, she does more than freeze—she impales and crushes those who oppose her. To the terrified denizens of the north, she is known only as ''The...\",\"info\":{\"attack\":2,\"defense\":5,\"magic\":8,\"difficulty\":6},\"image\":{\"full\":\"Lissandra.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":550,\"hpperlevel\":90,\"mp\":475,\"mpperlevel\":30,\"movespeed\":325,\"armor\":22,\"armorperlevel\":3.7,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":1.36,\"attackspeed\":0.656}},\"Lucian\":{\"version\":\"10.10.3208608\",\"id\":\"Lucian\",\"key\":\"236\",\"name\":\"Lucian\",\"title\":\"the Purifier\",\"blurb\":\"Lucian, a Sentinel of Light, is a grim hunter of undying spirits, pursuing them relentlessly and annihilating them with his twin relic pistols. After the wraith Thresh slew his wife, Lucian embarked on the path of vengeance—but even with her return to...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Lucian.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":571,\"hpperlevel\":86,\"mp\":348.88,\"mpperlevel\":38,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.75,\"hpregenperlevel\":0.65,\"mpregen\":8.176,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":2.75,\"attackspeedperlevel\":3.3,\"attackspeed\":0.638}},\"Lulu\":{\"version\":\"10.10.3208608\",\"id\":\"Lulu\",\"key\":\"117\",\"name\":\"Lulu\",\"title\":\"the Fae Sorceress\",\"blurb\":\"The yordle mage Lulu is known for conjuring dreamlike illusions and fanciful creatures as she roams Runeterra with her fairy companion Pix. Lulu shapes reality on a whim, warping the fabric of the world, and what she views as the constraints of this...\",\"info\":{\"attack\":4,\"defense\":5,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Lulu.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":525,\"hpperlevel\":74,\"mp\":350,\"mpperlevel\":55,\"movespeed\":330,\"armor\":29,\"armorperlevel\":3.7,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":11,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":47,\"attackdamageperlevel\":2.6,\"attackspeedperlevel\":2.25,\"attackspeed\":0.625}},\"Lux\":{\"version\":\"10.10.3208608\",\"id\":\"Lux\",\"key\":\"99\",\"name\":\"Lux\",\"title\":\"the Lady of Luminosity\",\"blurb\":\"Luxanna Crownguard hails from Demacia, an insular realm where magical abilities are viewed with fear and suspicion. Able to bend light to her will, she grew up dreading discovery and exile, and was forced to keep her power secret, in order to preserve...\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":9,\"difficulty\":5},\"image\":{\"full\":\"Lux.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":490,\"hpperlevel\":85,\"mp\":480,\"mpperlevel\":23.5,\"movespeed\":330,\"armor\":18.72,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.54,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1,\"attackspeed\":0.669}},\"Malphite\":{\"version\":\"10.10.3208608\",\"id\":\"Malphite\",\"key\":\"54\",\"name\":\"Malphite\",\"title\":\"Shard of the Monolith\",\"blurb\":\"A massive creature of living stone, Malphite struggles to impose blessed order on a chaotic world. Birthed as a servitor-shard to an otherworldly obelisk known as the Monolith, he used his tremendous elemental strength to maintain and protect his...\",\"info\":{\"attack\":5,\"defense\":9,\"magic\":7,\"difficulty\":2},\"image\":{\"full\":\"Malphite.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":574.2,\"hpperlevel\":90,\"mp\":282.2,\"mpperlevel\":40,\"movespeed\":335,\"armor\":37,\"armorperlevel\":3.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":7.324,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61.97,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3.4,\"attackspeed\":0.736}},\"Malzahar\":{\"version\":\"10.10.3208608\",\"id\":\"Malzahar\",\"key\":\"90\",\"name\":\"Malzahar\",\"title\":\"the Prophet of the Void\",\"blurb\":\"A zealous seer dedicated to the unification of all life, Malzahar truly believes the newly emergent Void to be the path to Runeterra's salvation. In the desert wastes of Shurima, he followed the voices that whispered in his mind, all the way to ancient...\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":9,\"difficulty\":6},\"image\":{\"full\":\"Malzahar.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":537,\"hpperlevel\":87,\"mp\":375,\"mpperlevel\":27.5,\"movespeed\":335,\"armor\":18,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.5,\"attackspeed\":0.625}},\"Maokai\":{\"version\":\"10.10.3208608\",\"id\":\"Maokai\",\"key\":\"57\",\"name\":\"Maokai\",\"title\":\"the Twisted Treant\",\"blurb\":\"Maokai is a rageful, towering treant who fights the unnatural horrors of the Shadow Isles. He was twisted into a force of vengeance after a magical cataclysm destroyed his home, surviving undeath only through the Waters of Life infused within his...\",\"info\":{\"attack\":3,\"defense\":8,\"magic\":6,\"difficulty\":3},\"image\":{\"full\":\"Maokai.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":565,\"hpperlevel\":95,\"mp\":375,\"mpperlevel\":43,\"movespeed\":335,\"armor\":39,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":5,\"hpregenperlevel\":0.75,\"mpregen\":7.2,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63.54,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.125,\"attackspeed\":0.8}},\"MasterYi\":{\"version\":\"10.10.3208608\",\"id\":\"MasterYi\",\"key\":\"11\",\"name\":\"Master Yi\",\"title\":\"the Wuju Bladesman\",\"blurb\":\"Master Yi has tempered his body and sharpened his mind, so that thought and action have become almost as one. Though he chooses to enter into violence only as a last resort, the grace and speed of his blade ensures resolution is always swift. As one of...\",\"info\":{\"attack\":10,\"defense\":4,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"MasterYi.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":598.56,\"hpperlevel\":92,\"mp\":250.56,\"mpperlevel\":42,\"movespeed\":355,\"armor\":33,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7.5,\"hpregenperlevel\":0.65,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.679}},\"MissFortune\":{\"version\":\"10.10.3208608\",\"id\":\"MissFortune\",\"key\":\"21\",\"name\":\"Miss Fortune\",\"title\":\"the Bounty Hunter\",\"blurb\":\"A Bilgewater captain famed for her looks but feared for her ruthlessness, Sarah Fortune paints a stark figure among the hardened criminals of the port city. As a child, she witnessed the reaver king Gangplank murder her family—an act she brutally...\",\"info\":{\"attack\":8,\"defense\":2,\"magic\":5,\"difficulty\":1},\"image\":{\"full\":\"MissFortune.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":541,\"hpperlevel\":91,\"mp\":325.84,\"mpperlevel\":35,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.65,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":2.25,\"attackspeed\":0.656}},\"MonkeyKing\":{\"version\":\"10.10.3208608\",\"id\":\"MonkeyKing\",\"key\":\"62\",\"name\":\"Wukong\",\"title\":\"the Monkey King\",\"blurb\":\"Wukong is a vastayan trickster who uses his strength, agility, and intelligence to confuse his opponents and gain the upper hand. After finding a lifelong friend in the warrior known as Master Yi, Wukong became the last student of the ancient martial...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"MonkeyKing.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":45,\"movespeed\":345,\"armor\":31,\"armorperlevel\":3.5,\"spellblock\":28,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":4,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3,\"attackspeed\":0.711}},\"Mordekaiser\":{\"version\":\"10.10.3208608\",\"id\":\"Mordekaiser\",\"key\":\"82\",\"name\":\"Mordekaiser\",\"title\":\"the Iron Revenant\",\"blurb\":\"Twice slain and thrice born, Mordekaiser is a brutal warlord from a foregone epoch who uses his necromantic sorcery to bind souls into an eternity of servitude. Few now remain who remember his earlier conquests, or know the true extent of his powers—but...\",\"info\":{\"attack\":4,\"defense\":6,\"magic\":7,\"difficulty\":4},\"image\":{\"full\":\"Mordekaiser.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\"],\"partype\":\"Shield\",\"stats\":{\"hp\":575,\"hpperlevel\":90,\"mp\":100,\"mpperlevel\":0,\"movespeed\":335,\"armor\":37,\"armorperlevel\":3,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":5,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":4,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Morgana\":{\"version\":\"10.10.3208608\",\"id\":\"Morgana\",\"key\":\"25\",\"name\":\"Morgana\",\"title\":\"the Fallen\",\"blurb\":\"Conflicted between her celestial and mortal natures, Morgana bound her wings to embrace humanity, and inflicts her pain and bitterness upon the dishonest and the corrupt. She rejects laws and traditions she believes are unjust, and fights for truth from...\",\"info\":{\"attack\":1,\"defense\":6,\"magic\":8,\"difficulty\":1},\"image\":{\"full\":\"Morgana.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":560,\"hpperlevel\":90,\"mp\":340,\"mpperlevel\":60,\"movespeed\":335,\"armor\":25,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":5.5,\"hpregenperlevel\":0.4,\"mpregen\":11,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":1.53,\"attackspeed\":0.625}},\"Nami\":{\"version\":\"10.10.3208608\",\"id\":\"Nami\",\"key\":\"267\",\"name\":\"Nami\",\"title\":\"the Tidecaller\",\"blurb\":\"A headstrong young vastaya of the seas, Nami was the first of the Marai tribe to leave the waves and venture onto dry land, when their ancient accord with the Targonians was broken. With no other option, she took it upon herself to complete the sacred...\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Nami.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":475,\"hpperlevel\":74,\"mp\":365,\"mpperlevel\":43,\"movespeed\":335,\"armor\":29,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":51.208,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.61,\"attackspeed\":0.644}},\"Nasus\":{\"version\":\"10.10.3208608\",\"id\":\"Nasus\",\"key\":\"75\",\"name\":\"Nasus\",\"title\":\"the Curator of the Sands\",\"blurb\":\"Nasus is an imposing, jackal-headed Ascended being from ancient Shurima, a heroic figure regarded as a demigod by the people of the desert. Fiercely intelligent, he was a guardian of knowledge and peerless strategist whose wisdom guided the ancient...\",\"info\":{\"attack\":7,\"defense\":5,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Nasus.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":561.2,\"hpperlevel\":90,\"mp\":325.6,\"mpperlevel\":42,\"movespeed\":350,\"armor\":34,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":7.44,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":67,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.48,\"attackspeed\":0.638}},\"Nautilus\":{\"version\":\"10.10.3208608\",\"id\":\"Nautilus\",\"key\":\"111\",\"name\":\"Nautilus\",\"title\":\"the Titan of the Depths\",\"blurb\":\"A lonely legend as old as the first piers sunk in Bilgewater, the armored goliath known as Nautilus roams the dark waters off the coast of the Blue Flame Isles. Driven by a forgotten betrayal, he strikes without warning, swinging his enormous anchor to...\",\"info\":{\"attack\":4,\"defense\":6,\"magic\":6,\"difficulty\":6},\"image\":{\"full\":\"Nautilus.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":576.48,\"hpperlevel\":86,\"mp\":400,\"mpperlevel\":47,\"movespeed\":325,\"armor\":39,\"armorperlevel\":3.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":8.626,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1,\"attackspeed\":0.706}},\"Neeko\":{\"version\":\"10.10.3208608\",\"id\":\"Neeko\",\"key\":\"518\",\"name\":\"Neeko\",\"title\":\"the Curious Chameleon\",\"blurb\":\"Hailing from a long lost tribe of vastaya, Neeko can blend into any crowd by borrowing the appearances of others, even absorbing something of their emotional state to tell friend from foe in an instant. No one is ever sure where—or who—Neeko might be...\",\"info\":{\"attack\":1,\"defense\":1,\"magic\":9,\"difficulty\":5},\"image\":{\"full\":\"Neeko.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":90,\"mp\":450,\"mpperlevel\":30,\"movespeed\":340,\"armor\":21,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":7.5,\"hpregenperlevel\":0.75,\"mpregen\":7,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":48,\"attackdamageperlevel\":2.5,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Nidalee\":{\"version\":\"10.10.3208608\",\"id\":\"Nidalee\",\"key\":\"76\",\"name\":\"Nidalee\",\"title\":\"the Bestial Huntress\",\"blurb\":\"Raised in the deepest jungle, Nidalee is a master tracker who can shapeshift into a ferocious cougar at will. Neither wholly woman nor beast, she viciously defends her territory from any and all trespassers, with carefully placed traps and deft spear...\",\"info\":{\"attack\":5,\"defense\":4,\"magic\":7,\"difficulty\":8},\"image\":{\"full\":\"Nidalee.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":545,\"hpperlevel\":85,\"mp\":295.6,\"mpperlevel\":45,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":6,\"hpregenperlevel\":0.6,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3.22,\"attackspeed\":0.638}},\"Nocturne\":{\"version\":\"10.10.3208608\",\"id\":\"Nocturne\",\"key\":\"56\",\"name\":\"Nocturne\",\"title\":\"the Eternal Nightmare\",\"blurb\":\"A demonic amalgamation drawn from the nightmares that haunt every sentient mind, the thing known as Nocturne has become a primordial force of pure evil. It is liquidly chaotic in aspect, a faceless shadow with cold eyes and armed with wicked-looking...\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":2,\"difficulty\":4},\"image\":{\"full\":\"Nocturne.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":275,\"mpperlevel\":35,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":0.75,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.75,\"mpregen\":7,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.7,\"attackspeed\":0.721}},\"Nunu\":{\"version\":\"10.10.3208608\",\"id\":\"Nunu\",\"key\":\"20\",\"name\":\"Nunu & Willump\",\"title\":\"the Boy and His Yeti\",\"blurb\":\"Once upon a time, there was a boy who wanted to prove he was a hero by slaying a fearsome monster—only to discover that the beast, a lonely and magical yeti, merely needed a friend. Bound together by ancient power and a shared love of snowballs, Nunu...\",\"info\":{\"attack\":4,\"defense\":6,\"magic\":7,\"difficulty\":4},\"image\":{\"full\":\"Nunu.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":570,\"hpperlevel\":82,\"mp\":280,\"mpperlevel\":42,\"movespeed\":345,\"armor\":32,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":5,\"hpregenperlevel\":0.8,\"mpregen\":7,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.25,\"attackspeed\":0.625}},\"Olaf\":{\"version\":\"10.10.3208608\",\"id\":\"Olaf\",\"key\":\"2\",\"name\":\"Olaf\",\"title\":\"the Berserker\",\"blurb\":\"An unstoppable force of destruction, the axe-wielding Olaf wants nothing but to die in glorious combat. Hailing from the brutal Freljordian peninsula of Lokfar, he once received a prophecy foretelling his peaceful passing—a coward's fate, and a great...\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":3,\"difficulty\":3},\"image\":{\"full\":\"Olaf.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":597.24,\"hpperlevel\":93,\"mp\":315.6,\"mpperlevel\":42,\"movespeed\":350,\"armor\":35,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.9,\"mpregen\":7.466,\"mpregenperlevel\":0.575,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.7,\"attackspeed\":0.694}},\"Orianna\":{\"version\":\"10.10.3208608\",\"id\":\"Orianna\",\"key\":\"61\",\"name\":\"Orianna\",\"title\":\"the Lady of Clockwork\",\"blurb\":\"Once a curious girl of flesh and blood, Orianna is now a technological marvel comprised entirely of clockwork. She became gravely ill after an accident in the lower districts of Zaun, and her failing body had to be replaced with exquisite artifice...\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":9,\"difficulty\":7},\"image\":{\"full\":\"Orianna.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":530,\"hpperlevel\":91,\"mp\":418,\"mpperlevel\":25,\"movespeed\":325,\"armor\":17.04,\"armorperlevel\":3,\"spellblock\":26,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":40.368,\"attackdamageperlevel\":2.6,\"attackspeedperlevel\":3.5,\"attackspeed\":0.658}},\"Ornn\":{\"version\":\"10.10.3208608\",\"id\":\"Ornn\",\"key\":\"516\",\"name\":\"Ornn\",\"title\":\"The Fire below the Mountain\",\"blurb\":\"Ornn is the Freljordian spirit of forging and craftsmanship. He works in the solitude of a massive smithy, hammered out from the lava caverns beneath the volcano Hearth-Home. There he stokes bubbling cauldrons of molten rock to purify ores and fashion...\",\"info\":{\"attack\":5,\"defense\":9,\"magic\":3,\"difficulty\":5},\"image\":{\"full\":\"Ornn.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":590,\"hpperlevel\":95,\"mp\":340.6,\"mpperlevel\":45,\"movespeed\":335,\"armor\":36,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":8.01,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Pantheon\":{\"version\":\"10.10.3208608\",\"id\":\"Pantheon\",\"key\":\"80\",\"name\":\"Pantheon\",\"title\":\"the Unbreakable Spear\",\"blurb\":\"Once an unwilling host to the Aspect of War, Atreus survived when the celestial power within him was slain, refusing to succumb to a blow that tore stars from the heavens. In time, he learned to embrace the power of his own mortality, and the stubborn...\",\"info\":{\"attack\":9,\"defense\":4,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Pantheon.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":580,\"hpperlevel\":95,\"mp\":317.12,\"mpperlevel\":31,\"movespeed\":355,\"armor\":40,\"armorperlevel\":3.75,\"spellblock\":28,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":10,\"hpregenperlevel\":0.65,\"mpregen\":7.356,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.95,\"attackspeed\":0.644}},\"Poppy\":{\"version\":\"10.10.3208608\",\"id\":\"Poppy\",\"key\":\"78\",\"name\":\"Poppy\",\"title\":\"Keeper of the Hammer\",\"blurb\":\"Runeterra has no shortage of valiant champions, but few are as tenacious as Poppy. Bearing the legendary hammer of Orlon, a weapon twice her size, this determined yordle has spent untold years searching in secret for the fabled “Hero of Demacia,” said...\",\"info\":{\"attack\":6,\"defense\":7,\"magic\":2,\"difficulty\":6},\"image\":{\"full\":\"Poppy.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":90,\"mp\":280,\"mpperlevel\":40,\"movespeed\":345,\"armor\":38,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":7,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Pyke\":{\"version\":\"10.10.3208608\",\"id\":\"Pyke\",\"key\":\"555\",\"name\":\"Pyke\",\"title\":\"the Bloodharbor Ripper\",\"blurb\":\"A renowned harpooner from the slaughter docks of Bilgewater, Pyke should have met his death in the belly of a gigantic jaull-fish… and yet, he returned. Now, stalking the dank alleys and backways of his former hometown, he uses his new supernatural...\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":7},\"image\":{\"full\":\"Pyke.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":600,\"hpperlevel\":90,\"mp\":415,\"mpperlevel\":50,\"movespeed\":330,\"armor\":45,\"armorperlevel\":5,\"spellblock\":32,\"spellblockperlevel\":1.5,\"attackrange\":150,\"hpregen\":7,\"hpregenperlevel\":0.5,\"mpregen\":8,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.667}},\"Qiyana\":{\"version\":\"10.10.3208608\",\"id\":\"Qiyana\",\"key\":\"246\",\"name\":\"Qiyana\",\"title\":\"Empress of the Elements\",\"blurb\":\"In the jungle city of Ixaocan, Qiyana plots her own ruthless path to the high seat of the Yun Tal. Last in line to succeed her parents, she faces those who stand in her way with brash confidence and unprecedented mastery over elemental magic. With the...\",\"info\":{\"attack\":0,\"defense\":2,\"magic\":4,\"difficulty\":8},\"image\":{\"full\":\"Qiyana.png\",\"sprite\":\"champion2.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":590,\"hpperlevel\":90,\"mp\":320,\"mpperlevel\":50,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8.5,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.1,\"attackspeed\":0.625}},\"Quinn\":{\"version\":\"10.10.3208608\",\"id\":\"Quinn\",\"key\":\"133\",\"name\":\"Quinn\",\"title\":\"Demacia's Wings\",\"blurb\":\"Quinn is an elite ranger-knight of Demacia, who undertakes dangerous missions deep in enemy territory. She and her legendary eagle, Valor, share an unbreakable bond, and their foes are often slain before they realize they are fighting not one, but two...\",\"info\":{\"attack\":9,\"defense\":4,\"magic\":2,\"difficulty\":5},\"image\":{\"full\":\"Quinn.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":532.8,\"hpperlevel\":85,\"mp\":268.8,\"mpperlevel\":35,\"movespeed\":335,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":2.4,\"attackspeedperlevel\":3.1,\"attackspeed\":0.668}},\"Rakan\":{\"version\":\"10.10.3208608\",\"id\":\"Rakan\",\"key\":\"497\",\"name\":\"Rakan\",\"title\":\"The Charmer\",\"blurb\":\"As mercurial as he is charming, Rakan is an infamous vastayan troublemaker and the greatest battle-dancer in Lhotlan tribal history. To the humans of the Ionian highlands, his name has long been synonymous with wild festivals, uncontrollable parties...\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Rakan.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":315,\"mpperlevel\":50,\"movespeed\":335,\"armor\":32,\"armorperlevel\":3.9,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":300,\"hpregen\":5,\"hpregenperlevel\":0.5,\"mpregen\":8.75,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":3,\"attackspeed\":0.635}},\"Rammus\":{\"version\":\"10.10.3208608\",\"id\":\"Rammus\",\"key\":\"33\",\"name\":\"Rammus\",\"title\":\"the Armordillo\",\"blurb\":\"Idolized by many, dismissed by some, mystifying to all, the curious being Rammus is an enigma. Protected by a spiked shell, he inspires increasingly disparate theories on his origin wherever he goes—from demigod, to sacred oracle, to a mere beast...\",\"info\":{\"attack\":4,\"defense\":10,\"magic\":5,\"difficulty\":5},\"image\":{\"full\":\"Rammus.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":564.48,\"hpperlevel\":95,\"mp\":310.44,\"mpperlevel\":33,\"movespeed\":335,\"armor\":36,\"armorperlevel\":4.3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.55,\"mpregen\":7.84,\"mpregenperlevel\":0.5,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55.88,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2.215,\"attackspeed\":0.656}},\"RekSai\":{\"version\":\"10.10.3208608\",\"id\":\"RekSai\",\"key\":\"421\",\"name\":\"Rek'Sai\",\"title\":\"the Void Burrower\",\"blurb\":\"An apex predator, Rek'Sai is a merciless Void-spawn that tunnels beneath the ground to ambush and devour unsuspecting prey. Her insatiable hunger has laid waste to entire regions of the once-great empire of Shurima—merchants, traders, even armed...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"RekSai.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\"],\"partype\":\"Rage\",\"stats\":{\"hp\":570,\"hpperlevel\":85,\"mp\":100,\"mpperlevel\":0,\"movespeed\":335,\"armor\":36,\"armorperlevel\":3.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7.5,\"hpregenperlevel\":0.65,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.667}},\"Renekton\":{\"version\":\"10.10.3208608\",\"id\":\"Renekton\",\"key\":\"58\",\"name\":\"Renekton\",\"title\":\"the Butcher of the Sands\",\"blurb\":\"Renekton is a terrifying, rage-fueled Ascended being from the scorched deserts of Shurima. Once, he was his empire's most esteemed warrior, leading the nation's armies to countless victories. However, after the empire's fall, Renekton was entombed...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":2,\"difficulty\":3},\"image\":{\"full\":\"Renekton.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Fury\",\"stats\":{\"hp\":575,\"hpperlevel\":87,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":35,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.75,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.75,\"attackspeedperlevel\":2.75,\"attackspeed\":0.665}},\"Rengar\":{\"version\":\"10.10.3208608\",\"id\":\"Rengar\",\"key\":\"107\",\"name\":\"Rengar\",\"title\":\"the Pridestalker\",\"blurb\":\"Rengar is a ferocious vastayan trophy hunter who lives for the thrill of tracking down and killing dangerous creatures. He scours the world for the most fearsome beasts he can find, especially seeking any trace of Kha'Zix, the void creature who...\",\"info\":{\"attack\":7,\"defense\":4,\"magic\":2,\"difficulty\":8},\"image\":{\"full\":\"Rengar.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Assassin\",\"Fighter\"],\"partype\":\"Ferocity\",\"stats\":{\"hp\":585,\"hpperlevel\":90,\"mp\":4,\"mpperlevel\":0,\"movespeed\":345,\"armor\":34,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3,\"attackspeed\":0.667}},\"Riven\":{\"version\":\"10.10.3208608\",\"id\":\"Riven\",\"key\":\"92\",\"name\":\"Riven\",\"title\":\"the Exile\",\"blurb\":\"Once a swordmaster in the warhosts of Noxus, Riven is an expatriate in a land she previously tried to conquer. She rose through the ranks on the strength of her conviction and brutal efficiency, and was rewarded with a legendary runic blade and a...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Riven.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"None\",\"stats\":{\"hp\":560,\"hpperlevel\":86,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":33,\"armorperlevel\":3.2,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Rumble\":{\"version\":\"10.10.3208608\",\"id\":\"Rumble\",\"key\":\"68\",\"name\":\"Rumble\",\"title\":\"the Mechanized Menace\",\"blurb\":\"Rumble is a young inventor with a temper. Using nothing more than his own two hands and a heap of scrap, the feisty yordle constructed a colossal mech suit outfitted with an arsenal of electrified harpoons and incendiary rockets. Though others may scoff...\",\"info\":{\"attack\":3,\"defense\":6,\"magic\":8,\"difficulty\":10},\"image\":{\"full\":\"Rumble.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Mage\"],\"partype\":\"Heat\",\"stats\":{\"hp\":589,\"hpperlevel\":85,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":31,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.6,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":1.85,\"attackspeed\":0.644}},\"Ryze\":{\"version\":\"10.10.3208608\",\"id\":\"Ryze\",\"key\":\"13\",\"name\":\"Ryze\",\"title\":\"the Rune Mage\",\"blurb\":\"Widely considered one of the most adept sorcerers on Runeterra, Ryze is an ancient, hard-bitten archmage with an impossibly heavy burden to bear. Armed with immense arcane power and a boundless constitution, he tirelessly hunts for World Runes—fragments...\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":7},\"image\":{\"full\":\"Ryze.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":575,\"hpperlevel\":98,\"mp\":300,\"mpperlevel\":50,\"movespeed\":340,\"armor\":22,\"armorperlevel\":3,\"spellblock\":34,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":8,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.112,\"attackspeed\":0.625}},\"Sejuani\":{\"version\":\"10.10.3208608\",\"id\":\"Sejuani\",\"key\":\"113\",\"name\":\"Sejuani\",\"title\":\"Fury of the North\",\"blurb\":\"Sejuani is the brutal, unforgiving Iceborn warmother of the Winter's Claw, one of the most feared tribes of the Freljord. Her people's survival is a constant, desperate battle against the elements, forcing them to raid Noxians, Demacians, and Avarosans...\",\"info\":{\"attack\":5,\"defense\":7,\"magic\":6,\"difficulty\":4},\"image\":{\"full\":\"Sejuani.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":560,\"hpperlevel\":100,\"mp\":400,\"mpperlevel\":40,\"movespeed\":340,\"armor\":34,\"armorperlevel\":4.25,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":8.5,\"hpregenperlevel\":1,\"mpregen\":7,\"mpregenperlevel\":0.7,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3.5,\"attackspeed\":0.688}},\"Senna\":{\"version\":\"10.10.3208608\",\"id\":\"Senna\",\"key\":\"235\",\"name\":\"Senna\",\"title\":\"the Redeemer\",\"blurb\":\"Cursed from childhood to be haunted by the supernatural Black Mist, Senna joined a sacred order known as the Sentinels of Light, and fiercely fought back—only to be killed, her soul imprisoned in a lantern by the cruel wraith Thresh. But refusing to...\",\"info\":{\"attack\":7,\"defense\":2,\"magic\":6,\"difficulty\":7},\"image\":{\"full\":\"Senna.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":520,\"hpperlevel\":75,\"mp\":350,\"mpperlevel\":45,\"movespeed\":330,\"armor\":28,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":600,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":0,\"attackspeedperlevel\":4,\"attackspeed\":0.625}},\"Sett\":{\"version\":\"10.10.3208608\",\"id\":\"Sett\",\"key\":\"875\",\"name\":\"Sett\",\"title\":\"the Boss\",\"blurb\":\"A leader of Ionia's growing criminal underworld, Sett rose to prominence in the wake of the war with Noxus. Though he began as a humble challenger in the fighting pits of Navori, he quickly gained notoriety for his savage strength, and his ability to...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":1,\"difficulty\":2},\"image\":{\"full\":\"Sett.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Grit\",\"stats\":{\"hp\":600,\"hpperlevel\":93,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":33,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":4,\"attackspeedperlevel\":1.75,\"attackspeed\":0.625}},\"Shaco\":{\"version\":\"10.10.3208608\",\"id\":\"Shaco\",\"key\":\"35\",\"name\":\"Shaco\",\"title\":\"the Demon Jester\",\"blurb\":\"Crafted long ago as a plaything for a lonely prince, the enchanted marionette Shaco now delights in murder and mayhem. Corrupted by dark magic and the loss of his beloved charge, the once-kind puppet finds pleasure only in the misery of the poor souls...\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":6,\"difficulty\":9},\"image\":{\"full\":\"Shaco.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":587,\"hpperlevel\":89,\"mp\":297.2,\"mpperlevel\":40,\"movespeed\":350,\"armor\":30,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.55,\"mpregen\":7.156,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3,\"attackspeed\":0.694}},\"Shen\":{\"version\":\"10.10.3208608\",\"id\":\"Shen\",\"key\":\"98\",\"name\":\"Shen\",\"title\":\"the Eye of Twilight\",\"blurb\":\"Among the secretive, Ionian warriors known as the Kinkou, Shen serves as their leader, the Eye of Twilight. He longs to remain free from the confusion of emotion, prejudice, and ego, and walks the unseen path of dispassionate judgment between the spirit...\",\"info\":{\"attack\":3,\"defense\":9,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Shen.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\"],\"partype\":\"Energy\",\"stats\":{\"hp\":540,\"hpperlevel\":85,\"mp\":400,\"mpperlevel\":0,\"movespeed\":340,\"armor\":34,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3,\"attackspeed\":0.751}},\"Shyvana\":{\"version\":\"10.10.3208608\",\"id\":\"Shyvana\",\"key\":\"102\",\"name\":\"Shyvana\",\"title\":\"the Half-Dragon\",\"blurb\":\"Shyvana is a creature with the magic of a rune shard burning within her heart. Though she often appears humanoid, she can take her true form as a fearsome dragon, incinerating her foes with fiery breath. Having saved the life of the crown prince Jarvan...\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Shyvana.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Fury\",\"stats\":{\"hp\":595,\"hpperlevel\":95,\"mp\":100,\"mpperlevel\":0,\"movespeed\":350,\"armor\":38,\"armorperlevel\":3.35,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.8,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":2.5,\"attackspeed\":0.658}},\"Singed\":{\"version\":\"10.10.3208608\",\"id\":\"Singed\",\"key\":\"27\",\"name\":\"Singed\",\"title\":\"the Mad Chemist\",\"blurb\":\"Singed is a Zaunite alchemist of unmatched intellect, who has devoted his life to pushing the boundaries of knowledge—with no price, even his own sanity, too high to pay. Is there a method to his madness? His concoctions rarely fail, but it appears to...\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":7,\"difficulty\":5},\"image\":{\"full\":\"Singed.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":580,\"hpperlevel\":85,\"mp\":330,\"mpperlevel\":45,\"movespeed\":345,\"armor\":34,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9.5,\"hpregenperlevel\":0.55,\"mpregen\":7.5,\"mpregenperlevel\":0.55,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.375,\"attackspeedperlevel\":1.9,\"attackspeed\":0.613}},\"Sion\":{\"version\":\"10.10.3208608\",\"id\":\"Sion\",\"key\":\"14\",\"name\":\"Sion\",\"title\":\"The Undead Juggernaut\",\"blurb\":\"A war hero from a bygone era, Sion was revered in Noxus for choking the life out of a Demacian king with his bare hands—but, denied oblivion, he was resurrected to serve his empire even in death. His indiscriminate slaughter claimed all who stood in his...\",\"info\":{\"attack\":5,\"defense\":9,\"magic\":3,\"difficulty\":5},\"image\":{\"full\":\"Sion.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":545,\"hpperlevel\":73,\"mp\":330,\"mpperlevel\":42,\"movespeed\":345,\"armor\":32,\"armorperlevel\":3,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":7.5,\"hpregenperlevel\":0.8,\"mpregen\":8,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":4,\"attackspeedperlevel\":1.3,\"attackspeed\":0.679}},\"Sivir\":{\"version\":\"10.10.3208608\",\"id\":\"Sivir\",\"key\":\"15\",\"name\":\"Sivir\",\"title\":\"the Battle Mistress\",\"blurb\":\"Sivir is a renowned fortune hunter and mercenary captain who plies her trade in the deserts of Shurima. Armed with her legendary jeweled crossblade, she has fought and won countless battles for those who can afford her exorbitant price. Known for her...\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":4},\"image\":{\"full\":\"Sivir.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":532,\"hpperlevel\":88,\"mp\":284,\"mpperlevel\":50,\"movespeed\":335,\"armor\":26,\"armorperlevel\":3.25,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":3.25,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.9,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.6,\"attackspeed\":0.625}},\"Skarner\":{\"version\":\"10.10.3208608\",\"id\":\"Skarner\",\"key\":\"72\",\"name\":\"Skarner\",\"title\":\"the Crystal Vanguard\",\"blurb\":\"Skarner is an immense crystalline scorpion from a hidden valley in Shurima. Part of the ancient Brackern race, Skarner and his kin are known for their great wisdom and deep connection to the land, as their souls are fused with powerful life crystals...\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":5,\"difficulty\":5},\"image\":{\"full\":\"Skarner.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":601.28,\"hpperlevel\":90,\"mp\":320,\"mpperlevel\":40,\"movespeed\":335,\"armor\":38,\"armorperlevel\":3.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":9,\"hpregenperlevel\":0.85,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":4.5,\"attackspeedperlevel\":2.1,\"attackspeed\":0.625}},\"Sona\":{\"version\":\"10.10.3208608\",\"id\":\"Sona\",\"key\":\"37\",\"name\":\"Sona\",\"title\":\"Maven of the Strings\",\"blurb\":\"Sona is Demacia's foremost virtuoso of the stringed etwahl, speaking only through her graceful chords and vibrant arias. This genteel manner has endeared her to the highborn, though others suspect her spellbinding melodies to actually emanate magic—a...\",\"info\":{\"attack\":5,\"defense\":2,\"magic\":8,\"difficulty\":4},\"image\":{\"full\":\"Sona.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":482.36,\"hpperlevel\":77,\"mp\":340.6,\"mpperlevel\":45,\"movespeed\":325,\"armor\":28,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":49,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.3,\"attackspeed\":0.644}},\"Soraka\":{\"version\":\"10.10.3208608\",\"id\":\"Soraka\",\"key\":\"16\",\"name\":\"Soraka\",\"title\":\"the Starchild\",\"blurb\":\"A wanderer from the celestial dimensions beyond Mount Targon, Soraka gave up her immortality to protect the mortal races from their own more violent instincts. She endeavors to spread the virtues of compassion and mercy to everyone she meets—even...\",\"info\":{\"attack\":2,\"defense\":5,\"magic\":7,\"difficulty\":3},\"image\":{\"full\":\"Soraka.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":535,\"hpperlevel\":74,\"mp\":425,\"mpperlevel\":40,\"movespeed\":325,\"armor\":32,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":2.5,\"hpregenperlevel\":0.5,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":50,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.14,\"attackspeed\":0.625}},\"Swain\":{\"version\":\"10.10.3208608\",\"id\":\"Swain\",\"key\":\"50\",\"name\":\"Swain\",\"title\":\"the Noxian Grand General\",\"blurb\":\"Jericho Swain is the visionary ruler of Noxus, an expansionist nation that reveres only strength. Though he was cast down and crippled in the Ionian wars, his left arm severed, he seized control of the empire with ruthless determination… and a new...\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":9,\"difficulty\":8},\"image\":{\"full\":\"Swain.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":525,\"hpperlevel\":85,\"mp\":468,\"mpperlevel\":28.5,\"movespeed\":335,\"armor\":22.72,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}},\"Sylas\":{\"version\":\"10.10.3208608\",\"id\":\"Sylas\",\"key\":\"517\",\"name\":\"Sylas\",\"title\":\"the Unshackled\",\"blurb\":\"Raised in one of Demacia's lesser quarters, Sylas of Dregbourne has come to symbolize the darker side of the Great City. As a boy, his ability to root out hidden sorcery caught the attention of the notorious mageseekers, who eventually imprisoned him...\",\"info\":{\"attack\":3,\"defense\":4,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Sylas.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":525,\"hpperlevel\":115,\"mp\":280,\"mpperlevel\":50,\"movespeed\":340,\"armor\":27,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.75,\"attackrange\":175,\"hpregen\":9,\"hpregenperlevel\":0.9,\"mpregen\":7,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.5,\"attackspeed\":0.645}},\"Syndra\":{\"version\":\"10.10.3208608\",\"id\":\"Syndra\",\"key\":\"134\",\"name\":\"Syndra\",\"title\":\"the Dark Sovereign\",\"blurb\":\"Syndra is a fearsome Ionian mage with incredible power at her command. As a child, she disturbed the village elders with her reckless and wild magic. She was sent away to be taught greater control, but eventually discovered her supposed mentor was...\",\"info\":{\"attack\":2,\"defense\":3,\"magic\":9,\"difficulty\":8},\"image\":{\"full\":\"Syndra.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":523,\"hpperlevel\":90,\"mp\":480,\"mpperlevel\":40,\"movespeed\":330,\"armor\":24.712,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.872,\"attackdamageperlevel\":2.9,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"TahmKench\":{\"version\":\"10.10.3208608\",\"id\":\"TahmKench\",\"key\":\"223\",\"name\":\"Tahm Kench\",\"title\":\"the River King\",\"blurb\":\"Known by many names throughout history, the demon Tahm Kench travels the waterways of Runeterra, feeding his insatiable appetite with the misery of others. Though he may appear singularly charming and proud, he swaggers through the physical realm like a...\",\"info\":{\"attack\":3,\"defense\":9,\"magic\":6,\"difficulty\":5},\"image\":{\"full\":\"TahmKench.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":600,\"hpperlevel\":100,\"mp\":325,\"mpperlevel\":40,\"movespeed\":335,\"armor\":47,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":6.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":1,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.658}},\"Taliyah\":{\"version\":\"10.10.3208608\",\"id\":\"Taliyah\",\"key\":\"163\",\"name\":\"Taliyah\",\"title\":\"the Stoneweaver\",\"blurb\":\"Taliyah is a nomadic mage from Shurima, torn between teenage wonder and adult responsibility. She has crossed nearly all of Valoran on a journey to learn the true nature of her growing powers, though more recently she has returned to protect her tribe...\",\"info\":{\"attack\":1,\"defense\":7,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Taliyah.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":532,\"hpperlevel\":90,\"mp\":425,\"mpperlevel\":30,\"movespeed\":335,\"armor\":20,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":7,\"hpregenperlevel\":0.7,\"mpregen\":9.335,\"mpregenperlevel\":0.85,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Talon\":{\"version\":\"10.10.3208608\",\"id\":\"Talon\",\"key\":\"91\",\"name\":\"Talon\",\"title\":\"the Blade's Shadow\",\"blurb\":\"Talon is the knife in the darkness, a merciless killer able to strike without warning and escape before any alarm is raised. He carved out a dangerous reputation on the brutal streets of Noxus, where he was forced to fight, kill, and steal to survive...\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":1,\"difficulty\":7},\"image\":{\"full\":\"Talon.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":588,\"hpperlevel\":95,\"mp\":377.2,\"mpperlevel\":37,\"movespeed\":335,\"armor\":30,\"armorperlevel\":3.5,\"spellblock\":39,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"mpregen\":7.6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2.9,\"attackspeed\":0.625}},\"Taric\":{\"version\":\"10.10.3208608\",\"id\":\"Taric\",\"key\":\"44\",\"name\":\"Taric\",\"title\":\"the Shield of Valoran\",\"blurb\":\"Taric is the Aspect of the Protector, wielding incredible power as Runeterra's guardian of life, love, and beauty. Shamed by a dereliction of duty and exiled from his homeland Demacia, Taric ascended Mount Targon to find redemption, only to discover a...\",\"info\":{\"attack\":4,\"defense\":8,\"magic\":5,\"difficulty\":3},\"image\":{\"full\":\"Taric.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":575,\"hpperlevel\":85,\"mp\":300,\"mpperlevel\":60,\"movespeed\":340,\"armor\":40,\"armorperlevel\":3.4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":150,\"hpregen\":6,\"hpregenperlevel\":0.5,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Teemo\":{\"version\":\"10.10.3208608\",\"id\":\"Teemo\",\"key\":\"17\",\"name\":\"Teemo\",\"title\":\"the Swift Scout\",\"blurb\":\"Undeterred by even the most dangerous and threatening of obstacles, Teemo scouts the world with boundless enthusiasm and a cheerful spirit. A yordle with an unwavering sense of morality, he takes pride in following the Bandle Scout's Code, sometimes...\",\"info\":{\"attack\":5,\"defense\":3,\"magic\":7,\"difficulty\":6},\"image\":{\"full\":\"Teemo.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":384,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":528,\"hpperlevel\":90,\"mp\":334,\"mpperlevel\":20,\"movespeed\":330,\"armor\":24.3,\"armorperlevel\":3.75,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":500,\"hpregen\":5.5,\"hpregenperlevel\":0.65,\"mpregen\":9.6,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.38,\"attackspeed\":0.69}},\"Thresh\":{\"version\":\"10.10.3208608\",\"id\":\"Thresh\",\"key\":\"412\",\"name\":\"Thresh\",\"title\":\"the Chain Warden\",\"blurb\":\"Sadistic and cunning, Thresh is an ambitious and restless spirit of the Shadow Isles. Once the custodian of countless arcane secrets, he was undone by a power greater than life or death, and now sustains himself by tormenting and breaking others with...\",\"info\":{\"attack\":5,\"defense\":6,\"magic\":6,\"difficulty\":7},\"image\":{\"full\":\"Thresh.png\",\"sprite\":\"champion3.png\",\"group\":\"champion\",\"x\":432,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Fighter\"],\"partype\":\"Mana\",\"stats\":{\"hp\":560.52,\"hpperlevel\":93,\"mp\":273.92,\"mpperlevel\":44,\"movespeed\":335,\"armor\":28,\"armorperlevel\":0,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":56,\"attackdamageperlevel\":2.2,\"attackspeedperlevel\":3.5,\"attackspeed\":0.625}},\"Tristana\":{\"version\":\"10.10.3208608\",\"id\":\"Tristana\",\"key\":\"18\",\"name\":\"Tristana\",\"title\":\"the Yordle Gunner\",\"blurb\":\"While many other yordles channel their energy into discovery, invention, or just plain mischief-making, Tristana was always inspired by the adventures of great warriors. She had heard much about Runeterra, its factions, and its wars, and believed her...\",\"info\":{\"attack\":9,\"defense\":3,\"magic\":5,\"difficulty\":4},\"image\":{\"full\":\"Tristana.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":0,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":559,\"hpperlevel\":88,\"mp\":250,\"mpperlevel\":32,\"movespeed\":325,\"armor\":26,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.75,\"hpregenperlevel\":0.65,\"mpregen\":7.2,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":1.5,\"attackspeed\":0.656}},\"Trundle\":{\"version\":\"10.10.3208608\",\"id\":\"Trundle\",\"key\":\"48\",\"name\":\"Trundle\",\"title\":\"the Troll King\",\"blurb\":\"Trundle is a hulking and devious troll with a particularly vicious streak, and there is nothing he cannot bludgeon into submission—not even the Freljord itself. Fiercely territorial, he chases down anyone foolish enough to enter his domain. Then, his...\",\"info\":{\"attack\":7,\"defense\":6,\"magic\":2,\"difficulty\":5},\"image\":{\"full\":\"Trundle.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":48,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":616.28,\"hpperlevel\":96,\"mp\":281.6,\"mpperlevel\":45,\"movespeed\":350,\"armor\":37,\"armorperlevel\":2.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":6,\"hpregenperlevel\":0.75,\"mpregen\":7.508,\"mpregenperlevel\":0.6,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.9,\"attackspeed\":0.67}},\"Tryndamere\":{\"version\":\"10.10.3208608\",\"id\":\"Tryndamere\",\"key\":\"23\",\"name\":\"Tryndamere\",\"title\":\"the Barbarian King\",\"blurb\":\"Fueled by unbridled fury and rage, Tryndamere once carved his way through the Freljord, openly challenging the greatest warriors of the north to prepare himself for even darker days ahead. The wrathful barbarian has long sought revenge for the...\",\"info\":{\"attack\":10,\"defense\":5,\"magic\":2,\"difficulty\":5},\"image\":{\"full\":\"Tryndamere.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":96,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Fury\",\"stats\":{\"hp\":625.64,\"hpperlevel\":98,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":33,\"armorperlevel\":3.1,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8.5,\"hpregenperlevel\":0.9,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":69,\"attackdamageperlevel\":3.7,\"attackspeedperlevel\":2.9,\"attackspeed\":0.67}},\"TwistedFate\":{\"version\":\"10.10.3208608\",\"id\":\"TwistedFate\",\"key\":\"4\",\"name\":\"Twisted Fate\",\"title\":\"the Card Master\",\"blurb\":\"Twisted Fate is an infamous cardsharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking...\",\"info\":{\"attack\":6,\"defense\":2,\"magic\":6,\"difficulty\":9},\"image\":{\"full\":\"TwistedFate.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":144,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":534,\"hpperlevel\":94,\"mp\":333,\"mpperlevel\":19,\"movespeed\":335,\"armor\":21,\"armorperlevel\":3.15,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":3.22,\"attackspeed\":0.651}},\"Twitch\":{\"version\":\"10.10.3208608\",\"id\":\"Twitch\",\"key\":\"29\",\"name\":\"Twitch\",\"title\":\"the Plague Rat\",\"blurb\":\"A Zaunite plague rat by birth, but a connoisseur of filth by passion, Twitch is not afraid to get his paws dirty. Aiming a chem-powered crossbow at the gilded heart of Piltover, he has vowed to show those in the city above just how filthy they really...\",\"info\":{\"attack\":9,\"defense\":2,\"magic\":3,\"difficulty\":6},\"image\":{\"full\":\"Twitch.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":192,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":582,\"hpperlevel\":84,\"mp\":287.2,\"mpperlevel\":40,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.75,\"hpregenperlevel\":0.6,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":59,\"attackdamageperlevel\":3.11,\"attackspeedperlevel\":3.38,\"attackspeed\":0.679}},\"Udyr\":{\"version\":\"10.10.3208608\",\"id\":\"Udyr\",\"key\":\"77\",\"name\":\"Udyr\",\"title\":\"the Spirit Walker\",\"blurb\":\"Udyr is more than a man; he is a vessel for the untamed power of four primal animal spirits. When tapping into the spirits' bestial natures, Udyr can harness their unique strengths: The tiger grants him speed and ferocity, the turtle resilience, the...\",\"info\":{\"attack\":8,\"defense\":7,\"magic\":4,\"difficulty\":7},\"image\":{\"full\":\"Udyr.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":240,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":594,\"hpperlevel\":99,\"mp\":271,\"mpperlevel\":30,\"movespeed\":350,\"armor\":34,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":6,\"hpregenperlevel\":0.75,\"mpregen\":7.5,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2.67,\"attackspeed\":0.658}},\"Urgot\":{\"version\":\"10.10.3208608\",\"id\":\"Urgot\",\"key\":\"6\",\"name\":\"Urgot\",\"title\":\"the Dreadnought\",\"blurb\":\"Once a powerful Noxian headsman, Urgot was betrayed by the empire for which he had killed so many. Bound in iron chains, he was forced to learn the true meaning of strength in the Dredge—a prison mine deep beneath Zaun. Emerging in a disaster that...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":8},\"image\":{\"full\":\"Urgot.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":288,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585,\"hpperlevel\":88,\"mp\":340,\"mpperlevel\":45,\"movespeed\":330,\"armor\":36,\"armorperlevel\":4.25,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":350,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"mpregen\":7.25,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":4,\"attackspeedperlevel\":3.75,\"attackspeed\":0.625}},\"Varus\":{\"version\":\"10.10.3208608\",\"id\":\"Varus\",\"key\":\"110\",\"name\":\"Varus\",\"title\":\"the Arrow of Retribution\",\"blurb\":\"One of the ancient darkin, Varus was a deadly killer who loved to torment his foes, driving them almost to insanity before delivering the killing arrow. He was imprisoned at the end of the Great Darkin War, but escaped centuries later in the remade...\",\"info\":{\"attack\":7,\"defense\":3,\"magic\":4,\"difficulty\":2},\"image\":{\"full\":\"Varus.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":336,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":500,\"hpperlevel\":89,\"mp\":360,\"mpperlevel\":33,\"movespeed\":330,\"armor\":27,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":575,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":61,\"attackdamageperlevel\":3.11,\"attackspeedperlevel\":3,\"attackspeed\":0.658}},\"Vayne\":{\"version\":\"10.10.3208608\",\"id\":\"Vayne\",\"key\":\"67\",\"name\":\"Vayne\",\"title\":\"the Night Hunter\",\"blurb\":\"Shauna Vayne is a deadly, remorseless Demacian monster hunter, who has dedicated her life to finding and destroying the demon that murdered her family. Armed with a wrist-mounted crossbow and a heart full of vengeance, she is only truly happy when...\",\"info\":{\"attack\":10,\"defense\":1,\"magic\":1,\"difficulty\":8},\"image\":{\"full\":\"Vayne.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":384,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Marksman\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":515,\"hpperlevel\":89,\"mp\":231.8,\"mpperlevel\":35,\"movespeed\":330,\"armor\":23,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":3.5,\"hpregenperlevel\":0.55,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":2.36,\"attackspeedperlevel\":3.3,\"attackspeed\":0.658}},\"Veigar\":{\"version\":\"10.10.3208608\",\"id\":\"Veigar\",\"key\":\"45\",\"name\":\"Veigar\",\"title\":\"the Tiny Master of Evil\",\"blurb\":\"An enthusiastic master of dark sorcery, Veigar has embraced powers that few mortals dare approach. As a free-spirited inhabitant of Bandle City, he longed to push beyond the limitations of yordle magic, and turned instead to arcane texts that had been...\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":7},\"image\":{\"full\":\"Veigar.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":432,\"y\":0,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":505,\"hpperlevel\":94,\"mp\":490,\"mpperlevel\":26,\"movespeed\":340,\"armor\":23,\"armorperlevel\":3.75,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":52,\"attackdamageperlevel\":2.7,\"attackspeedperlevel\":2.24,\"attackspeed\":0.625}},\"Velkoz\":{\"version\":\"10.10.3208608\",\"id\":\"Velkoz\",\"key\":\"161\",\"name\":\"Vel'Koz\",\"title\":\"the Eye of the Void\",\"blurb\":\"It is unclear if Vel'Koz was the first Void-spawn to emerge on Runeterra, but there has certainly never been another to match his level of cruel, calculating sentience. While his kin devour or defile everything around them, he seeks instead to...\",\"info\":{\"attack\":2,\"defense\":2,\"magic\":10,\"difficulty\":8},\"image\":{\"full\":\"Velkoz.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":0,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":520,\"hpperlevel\":88,\"mp\":469,\"mpperlevel\":21,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.9379,\"attackdamageperlevel\":3.1416,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"Vi\":{\"version\":\"10.10.3208608\",\"id\":\"Vi\",\"key\":\"254\",\"name\":\"Vi\",\"title\":\"the Piltover Enforcer\",\"blurb\":\"Once a criminal from the mean streets of Zaun, Vi is a hotheaded, impulsive, and fearsome woman with only a very loose respect for authority figures. Growing up all but alone, Vi developed finely honed survival instincts as well as a wickedly abrasive...\",\"info\":{\"attack\":8,\"defense\":5,\"magic\":3,\"difficulty\":4},\"image\":{\"full\":\"Vi.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":48,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":585,\"hpperlevel\":85,\"mp\":295,\"mpperlevel\":45,\"movespeed\":340,\"armor\":30,\"armorperlevel\":4,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":10,\"hpregenperlevel\":1,\"mpregen\":8,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.5,\"attackspeedperlevel\":2,\"attackspeed\":0.644}},\"Viktor\":{\"version\":\"10.10.3208608\",\"id\":\"Viktor\",\"key\":\"112\",\"name\":\"Viktor\",\"title\":\"the Machine Herald\",\"blurb\":\"The herald of a new age of technology, Viktor has devoted his life to the advancement of humankind. An idealist who seeks to lift the people of Zaun to a new level of understanding, he believes that only by embracing a glorious evolution of technology...\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":10,\"difficulty\":9},\"image\":{\"full\":\"Viktor.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":96,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":530,\"hpperlevel\":90,\"mp\":405,\"mpperlevel\":25,\"movespeed\":335,\"armor\":23,\"armorperlevel\":4,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":8,\"hpregenperlevel\":0.65,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.11,\"attackspeed\":0.658}},\"Vladimir\":{\"version\":\"10.10.3208608\",\"id\":\"Vladimir\",\"key\":\"8\",\"name\":\"Vladimir\",\"title\":\"the Crimson Reaper\",\"blurb\":\"A fiend with a thirst for mortal blood, Vladimir has influenced the affairs of Noxus since the empire's earliest days. In addition to unnaturally extending his life, his mastery of hemomancy allows him to control the minds and bodies of others as easily...\",\"info\":{\"attack\":2,\"defense\":6,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"Vladimir.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":144,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Crimson Rush\",\"stats\":{\"hp\":537,\"hpperlevel\":96,\"mp\":2,\"mpperlevel\":0,\"movespeed\":330,\"armor\":23,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":450,\"hpregen\":7,\"hpregenperlevel\":0.6,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2,\"attackspeed\":0.658}},\"Volibear\":{\"version\":\"10.10.3208608\",\"id\":\"Volibear\",\"key\":\"106\",\"name\":\"Volibear\",\"title\":\"the Thunder's Roar\",\"blurb\":\"The thunderous demigod known as the Thousand-Pierced Bear is the battle-spirit of the Freljord. Thousands of years of constant and bitter wars, fought in the coldest winters, have hardened Volibear into a truly indomitable force, hurling bolts of...\",\"info\":{\"attack\":7,\"defense\":7,\"magic\":4,\"difficulty\":3},\"image\":{\"full\":\"Volibear.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":192,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":584.48,\"hpperlevel\":86,\"mp\":270.4,\"mpperlevel\":30,\"movespeed\":345,\"armor\":35,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":8,\"hpregenperlevel\":0.65,\"mpregen\":8.092,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":68,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.67,\"attackspeed\":0.658}},\"Warwick\":{\"version\":\"10.10.3208608\",\"id\":\"Warwick\",\"key\":\"19\",\"name\":\"Warwick\",\"title\":\"the Uncaged Wrath of Zaun\",\"blurb\":\"Warwick is a monster who hunts the gray alleys of Zaun. Transformed by agonizing experiments, his body is fused with an intricate system of chambers and pumps, machinery filling his veins with alchemical rage. Bursting out of the shadows, he preys upon...\",\"info\":{\"attack\":9,\"defense\":5,\"magic\":3,\"difficulty\":3},\"image\":{\"full\":\"Warwick.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":240,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":550,\"hpperlevel\":85,\"mp\":280,\"mpperlevel\":35,\"movespeed\":335,\"armor\":33,\"armorperlevel\":3.2,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":4,\"hpregenperlevel\":0.75,\"mpregen\":7.466,\"mpregenperlevel\":0.575,\"crit\":0,\"critperlevel\":0,\"attackdamage\":65,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.3,\"attackspeed\":0.638}},\"Xayah\":{\"version\":\"10.10.3208608\",\"id\":\"Xayah\",\"key\":\"498\",\"name\":\"Xayah\",\"title\":\"the Rebel\",\"blurb\":\"Deadly and precise, Xayah is a vastayan revolutionary waging a personal war to save her people. She uses her speed, guile, and razor-sharp feather blades to cut down anyone who stands in her way. Xayah fights alongside her partner and lover, Rakan, to...\",\"info\":{\"attack\":10,\"defense\":6,\"magic\":1,\"difficulty\":5},\"image\":{\"full\":\"Xayah.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":288,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Marksman\"],\"partype\":\"Mana\",\"stats\":{\"hp\":561,\"hpperlevel\":86,\"mp\":340,\"mpperlevel\":40,\"movespeed\":325,\"armor\":25,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":3.25,\"hpregenperlevel\":0.75,\"mpregen\":8.25,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":2.9,\"attackspeedperlevel\":3.3,\"attackspeed\":0.625}},\"Xerath\":{\"version\":\"10.10.3208608\",\"id\":\"Xerath\",\"key\":\"101\",\"name\":\"Xerath\",\"title\":\"the Magus Ascendant\",\"blurb\":\"Xerath is an Ascended Magus of ancient Shurima, a being of arcane energy writhing in the broken shards of a magical sarcophagus. For millennia, he was trapped beneath the desert sands, but the rise of Shurima freed him from his ancient prison. Driven...\",\"info\":{\"attack\":1,\"defense\":3,\"magic\":10,\"difficulty\":8},\"image\":{\"full\":\"Xerath.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":336,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":526,\"hpperlevel\":92,\"mp\":459,\"mpperlevel\":22,\"movespeed\":340,\"armor\":21.88,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":525,\"hpregen\":5.5,\"hpregenperlevel\":0.55,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.7,\"attackdamageperlevel\":3,\"attackspeedperlevel\":1.36,\"attackspeed\":0.625}},\"XinZhao\":{\"version\":\"10.10.3208608\",\"id\":\"XinZhao\",\"key\":\"5\",\"name\":\"Xin Zhao\",\"title\":\"the Seneschal of Demacia\",\"blurb\":\"Xin Zhao is a resolute warrior loyal to the ruling Lightshield dynasty. Once condemned to the fighting pits of Noxus, he survived countless gladiatorial bouts, but after being freed by Demacian forces, he swore his life and allegiance to these brave...\",\"info\":{\"attack\":8,\"defense\":6,\"magic\":3,\"difficulty\":2},\"image\":{\"full\":\"XinZhao.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":384,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Mana\",\"stats\":{\"hp\":570,\"hpperlevel\":92,\"mp\":273.8,\"mpperlevel\":35,\"movespeed\":345,\"armor\":35,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.7,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"crit\":0,\"critperlevel\":0,\"attackdamage\":66,\"attackdamageperlevel\":3,\"attackspeedperlevel\":3.5,\"attackspeed\":0.645}},\"Yasuo\":{\"version\":\"10.10.3208608\",\"id\":\"Yasuo\",\"key\":\"157\",\"name\":\"Yasuo\",\"title\":\"the Unforgiven\",\"blurb\":\"An Ionian of deep resolve, Yasuo is an agile swordsman who wields the air itself against his enemies. As a proud young man, he was falsely accused of murdering his master—unable to prove his innocence, he was forced to slay his own brother in self...\",\"info\":{\"attack\":8,\"defense\":4,\"magic\":4,\"difficulty\":10},\"image\":{\"full\":\"Yasuo.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":432,\"y\":48,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Assassin\"],\"partype\":\"Flow\",\"stats\":{\"hp\":523,\"hpperlevel\":87,\"mp\":100,\"mpperlevel\":0,\"movespeed\":345,\"armor\":30,\"armorperlevel\":3.4,\"spellblock\":30,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":6.5,\"hpregenperlevel\":0.9,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.5,\"attackspeed\":0.697}},\"Yorick\":{\"version\":\"10.10.3208608\",\"id\":\"Yorick\",\"key\":\"83\",\"name\":\"Yorick\",\"title\":\"Shepherd of Souls\",\"blurb\":\"The last survivor of a long-forgotten religious order, Yorick is both blessed and cursed with power over the dead. Trapped on the Shadow Isles, his only companions are the rotting corpses and shrieking spirits that he gathers to him. Yorick's monstrous...\",\"info\":{\"attack\":6,\"defense\":6,\"magic\":4,\"difficulty\":6},\"image\":{\"full\":\"Yorick.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":0,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Fighter\",\"Tank\"],\"partype\":\"Mana\",\"stats\":{\"hp\":580,\"hpperlevel\":100,\"mp\":300,\"mpperlevel\":40,\"movespeed\":340,\"armor\":39,\"armorperlevel\":4,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.8,\"mpregen\":7.5,\"mpregenperlevel\":0.75,\"crit\":0,\"critperlevel\":0,\"attackdamage\":62,\"attackdamageperlevel\":5,\"attackspeedperlevel\":2,\"attackspeed\":0.625}},\"Yuumi\":{\"version\":\"10.10.3208608\",\"id\":\"Yuumi\",\"key\":\"350\",\"name\":\"Yuumi\",\"title\":\"the Magical Cat\",\"blurb\":\"A magical cat from Bandle City, Yuumi was once the familiar of a yordle enchantress, Norra. When her master mysteriously disappeared, Yuumi became the Keeper of Norra's sentient Book of Thresholds, traveling through portals in its pages to search for...\",\"info\":{\"attack\":5,\"defense\":1,\"magic\":8,\"difficulty\":2},\"image\":{\"full\":\"Yuumi.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":48,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":480,\"hpperlevel\":70,\"mp\":400,\"mpperlevel\":45,\"movespeed\":330,\"armor\":25,\"armorperlevel\":3,\"spellblock\":25,\"spellblockperlevel\":0.3,\"attackrange\":500,\"hpregen\":7,\"hpregenperlevel\":0.55,\"mpregen\":10,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":55,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":1,\"attackspeed\":0.625}},\"Zac\":{\"version\":\"10.10.3208608\",\"id\":\"Zac\",\"key\":\"154\",\"name\":\"Zac\",\"title\":\"the Secret Weapon\",\"blurb\":\"Zac is the product of a toxic spill that ran through a chemtech seam and pooled in an isolated cavern deep in Zaun's Sump. Despite such humble origins, Zac has grown from primordial ooze into a thinking being who dwells in the city's pipes, occasionally...\",\"info\":{\"attack\":3,\"defense\":7,\"magic\":7,\"difficulty\":8},\"image\":{\"full\":\"Zac.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":96,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Tank\",\"Fighter\"],\"partype\":\"None\",\"stats\":{\"hp\":615,\"hpperlevel\":95,\"mp\":0,\"mpperlevel\":0,\"movespeed\":340,\"armor\":33,\"armorperlevel\":3.5,\"spellblock\":32,\"spellblockperlevel\":1.25,\"attackrange\":175,\"hpregen\":8,\"hpregenperlevel\":0.5,\"mpregen\":0,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":60,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":1.6,\"attackspeed\":0.736}},\"Zed\":{\"version\":\"10.10.3208608\",\"id\":\"Zed\",\"key\":\"238\",\"name\":\"Zed\",\"title\":\"the Master of Shadows\",\"blurb\":\"Utterly ruthless and without mercy, Zed is the leader of the Order of Shadow, an organization he created with the intent of militarizing Ionia's magical and martial traditions to drive out Noxian invaders. During the war, desperation led him to unlock...\",\"info\":{\"attack\":9,\"defense\":2,\"magic\":1,\"difficulty\":7},\"image\":{\"full\":\"Zed.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":144,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Assassin\"],\"partype\":\"Energy\",\"stats\":{\"hp\":584,\"hpperlevel\":85,\"mp\":200,\"mpperlevel\":0,\"movespeed\":345,\"armor\":32,\"armorperlevel\":3.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25,\"attackrange\":125,\"hpregen\":7,\"hpregenperlevel\":0.65,\"mpregen\":50,\"mpregenperlevel\":0,\"crit\":0,\"critperlevel\":0,\"attackdamage\":63,\"attackdamageperlevel\":3.4,\"attackspeedperlevel\":3.3,\"attackspeed\":0.651}},\"Ziggs\":{\"version\":\"10.10.3208608\",\"id\":\"Ziggs\",\"key\":\"115\",\"name\":\"Ziggs\",\"title\":\"the Hexplosives Expert\",\"blurb\":\"With a love of big bombs and short fuses, the yordle Ziggs is an explosive force of nature. As an inventor's assistant in Piltover, he was bored by his predictable life and befriended a mad, blue-haired bomber named Jinx. After a wild night on the town...\",\"info\":{\"attack\":2,\"defense\":4,\"magic\":9,\"difficulty\":4},\"image\":{\"full\":\"Ziggs.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":192,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":536,\"hpperlevel\":92,\"mp\":480,\"mpperlevel\":23.5,\"movespeed\":325,\"armor\":21.544,\"armorperlevel\":3.3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":54.208,\"attackdamageperlevel\":3.1,\"attackspeedperlevel\":2,\"attackspeed\":0.656}},\"Zilean\":{\"version\":\"10.10.3208608\",\"id\":\"Zilean\",\"key\":\"26\",\"name\":\"Zilean\",\"title\":\"the Chronokeeper\",\"blurb\":\"Once a powerful Icathian mage, Zilean became obsessed with the passage of time after witnessing his homeland's destruction by the Void. Unable to spare even a minute to grieve the catastrophic loss, he called upon ancient temporal magic to divine all...\",\"info\":{\"attack\":2,\"defense\":5,\"magic\":8,\"difficulty\":6},\"image\":{\"full\":\"Zilean.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":240,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Support\",\"Mage\"],\"partype\":\"Mana\",\"stats\":{\"hp\":504,\"hpperlevel\":82,\"mp\":452,\"mpperlevel\":30,\"movespeed\":335,\"armor\":24,\"armorperlevel\":3.8,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":11.335,\"mpregenperlevel\":0.8,\"crit\":0,\"critperlevel\":0,\"attackdamage\":51.64,\"attackdamageperlevel\":3,\"attackspeedperlevel\":2.13,\"attackspeed\":0.625}},\"Zoe\":{\"version\":\"10.10.3208608\",\"id\":\"Zoe\",\"key\":\"142\",\"name\":\"Zoe\",\"title\":\"the Aspect of Twilight\",\"blurb\":\"As the embodiment of mischief, imagination, and change, Zoe acts as the cosmic messenger of Targon, heralding major events that reshape worlds. Her mere presence warps the arcane mathematics governing realities, sometimes causing cataclysms without...\",\"info\":{\"attack\":1,\"defense\":7,\"magic\":8,\"difficulty\":5},\"image\":{\"full\":\"Zoe.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":288,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":560,\"hpperlevel\":92,\"mp\":425,\"mpperlevel\":25,\"movespeed\":340,\"armor\":20.8,\"armorperlevel\":3.5,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":550,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"mpregen\":8,\"mpregenperlevel\":0.65,\"crit\":0,\"critperlevel\":0,\"attackdamage\":58,\"attackdamageperlevel\":3.3,\"attackspeedperlevel\":2.5,\"attackspeed\":0.625}},\"Zyra\":{\"version\":\"10.10.3208608\",\"id\":\"Zyra\",\"key\":\"143\",\"name\":\"Zyra\",\"title\":\"Rise of the Thorns\",\"blurb\":\"Born in an ancient, sorcerous catastrophe, Zyra is the wrath of nature given form—an alluring hybrid of plant and human, kindling new life with every step. She views the many mortals of Valoran as little more than prey for her seeded progeny, and thinks...\",\"info\":{\"attack\":4,\"defense\":3,\"magic\":8,\"difficulty\":7},\"image\":{\"full\":\"Zyra.png\",\"sprite\":\"champion4.png\",\"group\":\"champion\",\"x\":336,\"y\":96,\"w\":48,\"h\":48},\"tags\":[\"Mage\",\"Support\"],\"partype\":\"Mana\",\"stats\":{\"hp\":504,\"hpperlevel\":79,\"mp\":418,\"mpperlevel\":25,\"movespeed\":340,\"armor\":29,\"armorperlevel\":3,\"spellblock\":30,\"spellblockperlevel\":0.5,\"attackrange\":575,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"mpregen\":13,\"mpregenperlevel\":0.4,\"crit\":0,\"critperlevel\":0,\"attackdamage\":53.376,\"attackdamageperlevel\":3.2,\"attackspeedperlevel\":2.11,\"attackspeed\":0.625}}}}");

/***/ }),

/***/ "./src/data/queues.json":
/*!******************************!*\
  !*** ./src/data/queues.json ***!
  \******************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"queueId\":0,\"map\":\"Custom games\",\"description\":null,\"notes\":null},{\"queueId\":2,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Blind Pick games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 430\"},{\"queueId\":4,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Ranked Solo games\",\"notes\":\"Deprecated in favor of queueId 420\"},{\"queueId\":6,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Ranked Premade games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":7,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs AI games\",\"notes\":\"Deprecated in favor of queueId 32 and 33\"},{\"queueId\":8,\"map\":\"Twisted Treeline\",\"description\":\"3v3 Normal games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 460\"},{\"queueId\":9,\"map\":\"Twisted Treeline\",\"description\":\"3v3 Ranked Flex games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 470\"},{\"queueId\":14,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Draft Pick games\",\"notes\":\"Deprecated in favor of queueId 400\"},{\"queueId\":16,\"map\":\"Crystal Scar\",\"description\":\"5v5 Dominion Blind Pick games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":17,\"map\":\"Crystal Scar\",\"description\":\"5v5 Dominion Draft Pick games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":25,\"map\":\"Crystal Scar\",\"description\":\"Dominion Co-op vs AI games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":31,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs AI Intro Bot games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 830\"},{\"queueId\":32,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs AI Beginner Bot games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 840\"},{\"queueId\":33,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs AI Intermediate Bot games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 850\"},{\"queueId\":41,\"map\":\"Twisted Treeline\",\"description\":\"3v3 Ranked Team games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":42,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Ranked Team games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":52,\"map\":\"Twisted Treeline\",\"description\":\"Co-op vs AI games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 800\"},{\"queueId\":61,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Team Builder games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":65,\"map\":\"Howling Abyss\",\"description\":\"5v5 ARAM games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 450\"},{\"queueId\":67,\"map\":\"Howling Abyss\",\"description\":\"ARAM Co-op vs AI games\",\"notes\":\"Game mode deprecated\"},{\"queueId\":70,\"map\":\"Summoner's Rift\",\"description\":\"One for All games\",\"notes\":\"Deprecated in patch 8.6 in favor of queueId 1020\"},{\"queueId\":72,\"map\":\"Howling Abyss\",\"description\":\"1v1 Snowdown Showdown games\",\"notes\":null},{\"queueId\":73,\"map\":\"Howling Abyss\",\"description\":\"2v2 Snowdown Showdown games\",\"notes\":null},{\"queueId\":75,\"map\":\"Summoner's Rift\",\"description\":\"6v6 Hexakill games\",\"notes\":null},{\"queueId\":76,\"map\":\"Summoner's Rift\",\"description\":\"Ultra Rapid Fire games\",\"notes\":null},{\"queueId\":78,\"map\":\"Howling Abyss\",\"description\":\"One For All: Mirror Mode games\",\"notes\":null},{\"queueId\":83,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs AI Ultra Rapid Fire games\",\"notes\":null},{\"queueId\":91,\"map\":\"Summoner's Rift\",\"description\":\"Doom Bots Rank 1 games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 950\"},{\"queueId\":92,\"map\":\"Summoner's Rift\",\"description\":\"Doom Bots Rank 2 games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 950\"},{\"queueId\":93,\"map\":\"Summoner's Rift\",\"description\":\"Doom Bots Rank 5 games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 950\"},{\"queueId\":96,\"map\":\"Crystal Scar\",\"description\":\"Ascension games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 910\"},{\"queueId\":98,\"map\":\"Twisted Treeline\",\"description\":\"6v6 Hexakill games\",\"notes\":null},{\"queueId\":100,\"map\":\"Butcher's Bridge\",\"description\":\"5v5 ARAM games\",\"notes\":null},{\"queueId\":300,\"map\":\"Howling Abyss\",\"description\":\"Legend of the Poro King games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 920\"},{\"queueId\":310,\"map\":\"Summoner's Rift\",\"description\":\"Nemesis games\",\"notes\":null},{\"queueId\":313,\"map\":\"Summoner's Rift\",\"description\":\"Black Market Brawlers games\",\"notes\":null},{\"queueId\":315,\"map\":\"Summoner's Rift\",\"description\":\"Nexus Siege games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 940\"},{\"queueId\":317,\"map\":\"Crystal Scar\",\"description\":\"Definitely Not Dominion games\",\"notes\":null},{\"queueId\":318,\"map\":\"Summoner's Rift\",\"description\":\"ARURF games\",\"notes\":\"Deprecated in patch 7.19 in favor of queueId 900\"},{\"queueId\":325,\"map\":\"Summoner's Rift\",\"description\":\"All Random games\",\"notes\":null},{\"queueId\":400,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Draft Pick games\",\"notes\":null},{\"queueId\":410,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Ranked Dynamic games\",\"notes\":\"Game mode deprecated in patch 6.22\"},{\"queueId\":420,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Ranked Solo games\",\"notes\":null},{\"queueId\":430,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Blind Pick games\",\"notes\":null},{\"queueId\":440,\"map\":\"Summoner's Rift\",\"description\":\"5v5 Ranked Flex games\",\"notes\":null},{\"queueId\":450,\"map\":\"Howling Abyss\",\"description\":\"5v5 ARAM games\",\"notes\":null},{\"queueId\":460,\"map\":\"Twisted Treeline\",\"description\":\"3v3 Blind Pick games\",\"notes\":\"Deprecated in patch 9.23\"},{\"queueId\":470,\"map\":\"Twisted Treeline\",\"description\":\"3v3 Ranked Flex games\",\"notes\":\"Deprecated in patch 9.23\"},{\"queueId\":600,\"map\":\"Summoner's Rift\",\"description\":\"Blood Hunt Assassin games\",\"notes\":null},{\"queueId\":610,\"map\":\"Cosmic Ruins\",\"description\":\"Dark Star: Singularity games\",\"notes\":null},{\"queueId\":700,\"map\":\"Summoner's Rift\",\"description\":\"Clash games\",\"notes\":null},{\"queueId\":800,\"map\":\"Twisted Treeline\",\"description\":\"Co-op vs. AI Intermediate Bot games\",\"notes\":\"Deprecated in patch 9.23\"},{\"queueId\":810,\"map\":\"Twisted Treeline\",\"description\":\"Co-op vs. AI Intro Bot games\",\"notes\":\"Deprecated in patch 9.23\"},{\"queueId\":820,\"map\":\"Twisted Treeline\",\"description\":\"Co-op vs. AI Beginner Bot games\",\"notes\":null},{\"queueId\":830,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs. AI Intro Bot games\",\"notes\":null},{\"queueId\":840,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs. AI Beginner Bot games\",\"notes\":null},{\"queueId\":850,\"map\":\"Summoner's Rift\",\"description\":\"Co-op vs. AI Intermediate Bot games\",\"notes\":null},{\"queueId\":900,\"map\":\"Summoner's Rift\",\"description\":\"URF games\",\"notes\":null},{\"queueId\":910,\"map\":\"Crystal Scar\",\"description\":\"Ascension games\",\"notes\":null},{\"queueId\":920,\"map\":\"Howling Abyss\",\"description\":\"Legend of the Poro King games\",\"notes\":null},{\"queueId\":940,\"map\":\"Summoner's Rift\",\"description\":\"Nexus Siege games\",\"notes\":null},{\"queueId\":950,\"map\":\"Summoner's Rift\",\"description\":\"Doom Bots Voting games\",\"notes\":null},{\"queueId\":960,\"map\":\"Summoner's Rift\",\"description\":\"Doom Bots Standard games\",\"notes\":null},{\"queueId\":980,\"map\":\"Valoran City Park\",\"description\":\"Star Guardian Invasion: Normal games\",\"notes\":null},{\"queueId\":990,\"map\":\"Valoran City Park\",\"description\":\"Star Guardian Invasion: Onslaught games\",\"notes\":null},{\"queueId\":1000,\"map\":\"Overcharge\",\"description\":\"PROJECT: Hunters games\",\"notes\":null},{\"queueId\":1010,\"map\":\"Summoner's Rift\",\"description\":\"Snow ARURF games\",\"notes\":null},{\"queueId\":1020,\"map\":\"Summoner's Rift\",\"description\":\"One for All games\",\"notes\":null},{\"queueId\":1030,\"map\":\"Crash Site\",\"description\":\"Odyssey Extraction: Intro games\",\"notes\":null},{\"queueId\":1040,\"map\":\"Crash Site\",\"description\":\"Odyssey Extraction: Cadet games\",\"notes\":null},{\"queueId\":1050,\"map\":\"Crash Site\",\"description\":\"Odyssey Extraction: Crewmember games\",\"notes\":null},{\"queueId\":1060,\"map\":\"Crash Site\",\"description\":\"Odyssey Extraction: Captain games\",\"notes\":null},{\"queueId\":1070,\"map\":\"Crash Site\",\"description\":\"Odyssey Extraction: Onslaught games\",\"notes\":null},{\"queueId\":1090,\"map\":\"Convergence\",\"description\":\"Teamfight Tactics games\",\"notes\":null},{\"queueId\":1100,\"map\":\"Convergence\",\"description\":\"Ranked Teamfight Tactics games\",\"notes\":null},{\"queueId\":1110,\"map\":\"Convergence\",\"description\":\"Teamfight Tactics Tutorial games\",\"notes\":null},{\"queueId\":1200,\"map\":\"Nexus Blitz\",\"description\":\"Nexus Blitz games\",\"notes\":\"Deprecated in patch 9.2\"},{\"queueId\":2000,\"map\":\"Summoner's Rift\",\"description\":\"Tutorial 1\",\"notes\":null},{\"queueId\":2010,\"map\":\"Summoner's Rift\",\"description\":\"Tutorial 2\",\"notes\":null},{\"queueId\":2020,\"map\":\"Summoner's Rift\",\"description\":\"Tutorial 3\",\"notes\":null}]");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = __webpack_require__(/*! apollo-server */ "apollo-server");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const resolvers = __webpack_require__(/*! ./resolvers */ "./src/resolvers/index.ts");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: Object.values(resolvers),
            emitSchemaFile: true
        });
        const server = new apollo_server_1.ApolloServer({ schema });
        server.listen()
            .then(({ url }) => console.log(`Server ready at ${url} `));
        if (true) {
            module.hot.accept();
            module.hot.dispose(() => console.log('Module disposed. '));
        }
    });
}
bootstrap();


/***/ }),

/***/ "./src/resolvers/MatchReferenceResolver.ts":
/*!*************************************************!*\
  !*** ./src/resolvers/MatchReferenceResolver.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const MatchReference_1 = __webpack_require__(/*! ../schemas/MatchReference */ "./src/schemas/MatchReference.ts");
const champions = __webpack_require__(/*! ../data/champion.json */ "./src/data/champion.json");
const queues = __webpack_require__(/*! ../data/queues.json */ "./src/data/queues.json");
const Matches_1 = __webpack_require__(/*! ../riotApi/Matches */ "./src/riotApi/Matches.ts");
let default_1 = (() => {
    let default_1 = class default_1 {
        gameDetails(matchReference) {
            const { gameId, region } = matchReference;
            return Matches_1.getMatchById(region, gameId)
                .then((data) => data)
                .catch(e => console.log(e.message));
        }
        championDetails(matchReference) {
            const { data } = champions;
            const championValues = Object.values(data);
            const champion = championValues.find(c => c.key === matchReference.champion.toString());
            return champion;
        }
        queueDetails(matchReference) {
            const queue = queues.find(q => q.queueId === matchReference.queue);
            return queue;
        }
    };
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MatchReference_1.default]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "gameDetails", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MatchReference_1.default]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "championDetails", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MatchReference_1.default]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "queueDetails", null);
    default_1 = __decorate([
        type_graphql_1.Resolver(of => MatchReference_1.default)
    ], default_1);
    return default_1;
})();
exports.default = default_1;


/***/ }),

/***/ "./src/resolvers/ParticipantResolver.ts":
/*!**********************************************!*\
  !*** ./src/resolvers/ParticipantResolver.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const Participant_1 = __webpack_require__(/*! ../schemas/Participant */ "./src/schemas/Participant.ts");
let default_1 = (() => {
    let default_1 = class {
    };
    default_1 = __decorate([
        type_graphql_1.Resolver(of => Participant_1.default)
    ], default_1);
    return default_1;
})();
exports.default = default_1;


/***/ }),

/***/ "./src/resolvers/SummonerResolver.ts":
/*!*******************************************!*\
  !*** ./src/resolvers/SummonerResolver.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const Summoner_1 = __webpack_require__(/*! ../schemas/Summoner */ "./src/schemas/Summoner.ts");
const League_1 = __webpack_require__(/*! ../riotApi/League */ "./src/riotApi/League.ts");
const Matches_1 = __webpack_require__(/*! ../riotApi/Matches */ "./src/riotApi/Matches.ts");
const Summoner_2 = __webpack_require__(/*! ../riotApi/Summoner */ "./src/riotApi/Summoner.ts");
let default_1 = (() => {
    let default_1 = class default_1 {
        fetchSummoner(region, name) {
            return __awaiter(this, void 0, void 0, function* () {
                return Summoner_2.getSummonerByName(region, name)
                    .then((data) => (Object.assign(Object.assign({}, data), { region })))
                    .catch(e => console.log(e.message));
            });
        }
        ranked(summoner) {
            return League_1.getLeaguesBySummoner(summoner.region, summoner.id)
                .then((data) => data)
                .catch(e => console.log(e.message));
        }
        matchList(summoner) {
            return Matches_1.getMatchListByAccount(summoner.region, summoner.accountId)
                .then((data) => {
                const matches = data.matches.map(m => {
                    m.region = summoner.region;
                    return m;
                });
                return Object.assign(Object.assign({}, data), { matches });
            })
                .catch(e => console.log(e.message));
        }
    };
    __decorate([
        type_graphql_1.Query(returns => Summoner_1.default),
        __param(0, type_graphql_1.Arg("region")),
        __param(1, type_graphql_1.Arg("name")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], default_1.prototype, "fetchSummoner", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Summoner_1.default]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "ranked", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Summoner_1.default]),
        __metadata("design:returntype", void 0)
    ], default_1.prototype, "matchList", null);
    default_1 = __decorate([
        type_graphql_1.Resolver(of => Summoner_1.default)
    ], default_1);
    return default_1;
})();
exports.default = default_1;


/***/ }),

/***/ "./src/resolvers/index.ts":
/*!********************************!*\
  !*** ./src/resolvers/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MatchReferenceResolver_1 = __webpack_require__(/*! ./MatchReferenceResolver */ "./src/resolvers/MatchReferenceResolver.ts");
Object.defineProperty(exports, "MatchReferenceResolver", { enumerable: true, get: function () { return MatchReferenceResolver_1.default; } });
var ParticipantResolver_1 = __webpack_require__(/*! ./ParticipantResolver */ "./src/resolvers/ParticipantResolver.ts");
Object.defineProperty(exports, "ParticipantResolver", { enumerable: true, get: function () { return ParticipantResolver_1.default; } });
var SummonerResolver_1 = __webpack_require__(/*! ./SummonerResolver */ "./src/resolvers/SummonerResolver.ts");
Object.defineProperty(exports, "SummonerResolver", { enumerable: true, get: function () { return SummonerResolver_1.default; } });


/***/ }),

/***/ "./src/riotApi/League.ts":
/*!*******************************!*\
  !*** ./src/riotApi/League.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaguesBySummoner = void 0;
const RiotAPIBase_1 = __webpack_require__(/*! ./RiotAPIBase */ "./src/riotApi/RiotAPIBase.ts");
const endpoint = `league/v4`;
exports.getLeaguesBySummoner = (region, id) => {
    const method = 'entries/by-summoner';
    const url = `${RiotAPIBase_1.getAPI_URL(region, endpoint, method)}/${id}`;
    return RiotAPIBase_1.riotFetchResponse(`${url}`);
};


/***/ }),

/***/ "./src/riotApi/Matches.ts":
/*!********************************!*\
  !*** ./src/riotApi/Matches.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchById = exports.getMatchListByAccount = void 0;
const RiotAPIBase_1 = __webpack_require__(/*! ./RiotAPIBase */ "./src/riotApi/RiotAPIBase.ts");
const endpoint = 'match/v4';
exports.getMatchListByAccount = (region, accountId) => {
    const method = 'matchlists/by-account';
    const url = `${RiotAPIBase_1.getAPI_URL(region, endpoint, method)}/${accountId}?endIndex=10`;
    return RiotAPIBase_1.riotFetchResponse(`${url}`);
};
exports.getMatchById = (region, matchId) => {
    const method = 'matches';
    const url = `${RiotAPIBase_1.getAPI_URL(region, endpoint, method)}/${matchId}`;
    return RiotAPIBase_1.riotFetchResponse(`${url}`);
};


/***/ }),

/***/ "./src/riotApi/RiotAPIBase.ts":
/*!************************************!*\
  !*** ./src/riotApi/RiotAPIBase.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.riotFetchResponse = exports.riotFetch = exports.getAPI_URL = exports.PATCH_VER = exports.API_VER = void 0;
const axios_1 = __webpack_require__(/*! axios */ "axios");
const API_KEY = 'RGAPI-1824781e-2bc6-412b-824d-71a4322b70ed';
exports.API_VER = 'v4';
exports.PATCH_VER = '10.10.1';
const CDN_ROOT = 'https://ddragon.leagueoflegends.com/cdn/';
exports.getAPI_URL = (region, endpoint, method) => {
    return `https://${region}.api.riotgames.com/lol/${endpoint}/${method}`;
};
const HEADERS = {
    Origin: "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": API_KEY,
    "Accept-Language": "en,en-US;q=0.9,en-GB;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
};
exports.riotFetch = (url) => {
    return axios_1.default.get(url, {
        headers: HEADERS
    });
};
exports.riotFetchResponse = (url) => {
    return exports.riotFetch(url).then(res => res.data);
};
const RiotAPIBase = {
    API_VER: exports.API_VER,
    HEADERS,
    getAPI_URL: exports.getAPI_URL,
    riotFetch: exports.riotFetch
};
exports.default = RiotAPIBase;


/***/ }),

/***/ "./src/riotApi/Summoner.ts":
/*!*********************************!*\
  !*** ./src/riotApi/Summoner.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummonerByName = void 0;
const RiotAPIBase_1 = __webpack_require__(/*! ./RiotAPIBase */ "./src/riotApi/RiotAPIBase.ts");
const endpoint = `summoner/v4`;
exports.getSummonerByName = (region, name) => {
    const method = 'summoners/by-name';
    const url = `${RiotAPIBase_1.getAPI_URL(region, endpoint, method)}/${name}`;
    return RiotAPIBase_1.riotFetchResponse(`${url}`);
};


/***/ }),

/***/ "./src/schemas/Champion.ts":
/*!*********************************!*\
  !*** ./src/schemas/Champion.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let Champion = (() => {
    let Champion = class Champion {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Champion.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Champion.prototype, "key", void 0);
    Champion = __decorate([
        type_graphql_1.ObjectType()
    ], Champion);
    return Champion;
})();
exports.default = Champion;


/***/ }),

/***/ "./src/schemas/LeagueEntry.ts":
/*!************************************!*\
  !*** ./src/schemas/LeagueEntry.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let LeagueEntry = (() => {
    let LeagueEntry = class LeagueEntry {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "leagueId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "summonerId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "summonerName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "queueType", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "tier", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LeagueEntry.prototype, "rank", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], LeagueEntry.prototype, "leaguePoints", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], LeagueEntry.prototype, "wins", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], LeagueEntry.prototype, "losses", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "hotStreak", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "veteran", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "freshBlood", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], LeagueEntry.prototype, "inactive", void 0);
    LeagueEntry = __decorate([
        type_graphql_1.ObjectType()
    ], LeagueEntry);
    return LeagueEntry;
})();
exports.default = LeagueEntry;


/***/ }),

/***/ "./src/schemas/Match.ts":
/*!******************************!*\
  !*** ./src/schemas/Match.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const Participant_1 = __webpack_require__(/*! ./Participant */ "./src/schemas/Participant.ts");
const ParticipantIdentity_1 = __webpack_require__(/*! ./ParticipantIdentity */ "./src/schemas/ParticipantIdentity.ts");
const TeamStats_1 = __webpack_require__(/*! ./TeamStats */ "./src/schemas/TeamStats.ts");
let Match = (() => {
    let Match = class Match {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Match.prototype, "gameId", void 0);
    __decorate([
        type_graphql_1.Field(type => [Participant_1.default]),
        __metadata("design:type", Array)
    ], Match.prototype, "participants", void 0);
    __decorate([
        type_graphql_1.Field(type => [ParticipantIdentity_1.default]),
        __metadata("design:type", Array)
    ], Match.prototype, "participantIdentities", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Match.prototype, "queueId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Match.prototype, "gameType", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Match.prototype, "gameDuration", void 0);
    __decorate([
        type_graphql_1.Field(type => [TeamStats_1.default]),
        __metadata("design:type", Array)
    ], Match.prototype, "teams", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Match.prototype, "platformId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Match.prototype, "gameCreation", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Match.prototype, "seasonId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Match.prototype, "gameVersion", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Match.prototype, "mapId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Match.prototype, "gameMode", void 0);
    Match = __decorate([
        type_graphql_1.ObjectType()
    ], Match);
    return Match;
})();
exports.default = Match;


/***/ }),

/***/ "./src/schemas/MatchList.ts":
/*!**********************************!*\
  !*** ./src/schemas/MatchList.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const MatchReference_1 = __webpack_require__(/*! ./MatchReference */ "./src/schemas/MatchReference.ts");
let MatchList = (() => {
    let MatchList = class MatchList {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchList.prototype, "startIndex", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchList.prototype, "totalGames", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchList.prototype, "endIndex", void 0);
    __decorate([
        type_graphql_1.Field(type => [MatchReference_1.default]),
        __metadata("design:type", Array)
    ], MatchList.prototype, "matches", void 0);
    MatchList = __decorate([
        type_graphql_1.ObjectType()
    ], MatchList);
    return MatchList;
})();
exports.default = MatchList;


/***/ }),

/***/ "./src/schemas/MatchReference.ts":
/*!***************************************!*\
  !*** ./src/schemas/MatchReference.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const Champion_1 = __webpack_require__(/*! ./Champion */ "./src/schemas/Champion.ts");
const Match_1 = __webpack_require__(/*! ./Match */ "./src/schemas/Match.ts");
const Queue_1 = __webpack_require__(/*! ./Queue */ "./src/schemas/Queue.ts");
let MatchReference = (() => {
    let MatchReference = class MatchReference {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchReference.prototype, "gameId", void 0);
    __decorate([
        type_graphql_1.Field(type => Match_1.default),
        __metadata("design:type", Match_1.default)
    ], MatchReference.prototype, "gameDetails", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], MatchReference.prototype, "role", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchReference.prototype, "season", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], MatchReference.prototype, "platformId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchReference.prototype, "champion", void 0);
    __decorate([
        type_graphql_1.Field(type => Champion_1.default, { nullable: true }),
        __metadata("design:type", Champion_1.default)
    ], MatchReference.prototype, "championDetails", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchReference.prototype, "queue", void 0);
    __decorate([
        type_graphql_1.Field(type => Queue_1.default, { nullable: true }),
        __metadata("design:type", Queue_1.default)
    ], MatchReference.prototype, "queueDetails", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], MatchReference.prototype, "lane", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], MatchReference.prototype, "timestamp", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], MatchReference.prototype, "region", void 0);
    MatchReference = __decorate([
        type_graphql_1.ObjectType()
    ], MatchReference);
    return MatchReference;
})();
exports.default = MatchReference;


/***/ }),

/***/ "./src/schemas/Participant.ts":
/*!************************************!*\
  !*** ./src/schemas/Participant.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const ParticipantStats_1 = __webpack_require__(/*! ./ParticipantStats */ "./src/schemas/ParticipantStats.ts");
let Participant = (() => {
    let Participant = class Participant {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Participant.prototype, "participantId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Participant.prototype, "championId", void 0);
    __decorate([
        type_graphql_1.Field(type => ParticipantStats_1.default),
        __metadata("design:type", ParticipantStats_1.default)
    ], Participant.prototype, "stats", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Participant.prototype, "teamId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Participant.prototype, "spell1Id", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Participant.prototype, "spell2Id", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Participant.prototype, "highestAchievedSeasonTier", void 0);
    Participant = __decorate([
        type_graphql_1.ObjectType()
    ], Participant);
    return Participant;
})();
exports.default = Participant;


/***/ }),

/***/ "./src/schemas/ParticipantIdentity.ts":
/*!********************************************!*\
  !*** ./src/schemas/ParticipantIdentity.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const Player_1 = __webpack_require__(/*! ./Player */ "./src/schemas/Player.ts");
let ParticipantIdentity = (() => {
    let ParticipantIdentity = class ParticipantIdentity {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantIdentity.prototype, "participantId", void 0);
    __decorate([
        type_graphql_1.Field(type => Player_1.default),
        __metadata("design:type", Player_1.default)
    ], ParticipantIdentity.prototype, "player", void 0);
    ParticipantIdentity = __decorate([
        type_graphql_1.ObjectType()
    ], ParticipantIdentity);
    return ParticipantIdentity;
})();
exports.default = ParticipantIdentity;


/***/ }),

/***/ "./src/schemas/ParticipantStats.ts":
/*!*****************************************!*\
  !*** ./src/schemas/ParticipantStats.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ParticipantStats = (() => {
    let ParticipantStats = class ParticipantStats {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ParticipantStats.prototype, "win", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "kills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "deaths", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "assists", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item0", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item1", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item2", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item3", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item4", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item5", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "item6", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "goldEarned", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "totalDamageTaken", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ParticipantStats.prototype, "firstTowerKill", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "wardsPlaced", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "totalMinionsKilled", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ParticipantStats.prototype, "firstTowerAssist", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "participantId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ParticipantStats.prototype, "firstBloodAssist", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "damageDealtToTurrets", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], ParticipantStats.prototype, "firstBloodKill", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "sightWardsBoughtInGame", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perk0", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perk1", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perk2", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perk3", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perk4", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perk5", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perkPrimaryStyle", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], ParticipantStats.prototype, "perkSubStyle", void 0);
    ParticipantStats = __decorate([
        type_graphql_1.ObjectType()
    ], ParticipantStats);
    return ParticipantStats;
})();
exports.default = ParticipantStats;


/***/ }),

/***/ "./src/schemas/Player.ts":
/*!*******************************!*\
  !*** ./src/schemas/Player.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let Player = (() => {
    let Player = class Player {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Player.prototype, "profileIcon", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "accountId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "matchHistoryUri", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "currentAccountId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "currentPlatformId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "summonerName", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "summonerId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Player.prototype, "platformId", void 0);
    Player = __decorate([
        type_graphql_1.ObjectType()
    ], Player);
    return Player;
})();
exports.default = Player;


/***/ }),

/***/ "./src/schemas/Queue.ts":
/*!******************************!*\
  !*** ./src/schemas/Queue.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let Queue = (() => {
    let Queue = class Queue {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Queue.prototype, "queueId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Queue.prototype, "map", void 0);
    __decorate([
        type_graphql_1.Field(type => String, { nullable: true }),
        __metadata("design:type", Object)
    ], Queue.prototype, "description", void 0);
    Queue = __decorate([
        type_graphql_1.ObjectType()
    ], Queue);
    return Queue;
})();
exports.default = Queue;


/***/ }),

/***/ "./src/schemas/Summoner.ts":
/*!*********************************!*\
  !*** ./src/schemas/Summoner.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const LeagueEntry_1 = __webpack_require__(/*! ./LeagueEntry */ "./src/schemas/LeagueEntry.ts");
const MatchList_1 = __webpack_require__(/*! ./MatchList */ "./src/schemas/MatchList.ts");
let Summoner = (() => {
    let Summoner = class Summoner {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "accountId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "puuid", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Summoner.prototype, "profileIconId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Summoner.prototype, "revisionDate", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], Summoner.prototype, "summonerLevel", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], Summoner.prototype, "region", void 0);
    __decorate([
        type_graphql_1.Field(type => [LeagueEntry_1.default]),
        __metadata("design:type", Array)
    ], Summoner.prototype, "ranked", void 0);
    __decorate([
        type_graphql_1.Field(type => MatchList_1.default),
        __metadata("design:type", MatchList_1.default)
    ], Summoner.prototype, "matchList", void 0);
    Summoner = __decorate([
        type_graphql_1.ObjectType()
    ], Summoner);
    return Summoner;
})();
exports.default = Summoner;


/***/ }),

/***/ "./src/schemas/TeamStats.ts":
/*!**********************************!*\
  !*** ./src/schemas/TeamStats.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let TeamStats = (() => {
    let TeamStats = class TeamStats {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "towerKills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "riftHeraldKills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], TeamStats.prototype, "firstBlood", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "inhibitorKills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], TeamStats.prototype, "firstBaron", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], TeamStats.prototype, "firstDragon", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "dominionVictoryScore", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "dragonKills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "baronKills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], TeamStats.prototype, "firstInhibitor", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], TeamStats.prototype, "firstTower", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "vilemawKills", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], TeamStats.prototype, "firstRiftHerald", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Number)
    ], TeamStats.prototype, "teamId", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], TeamStats.prototype, "win", void 0);
    TeamStats = __decorate([
        type_graphql_1.ObjectType()
    ], TeamStats);
    return TeamStats;
})();
exports.default = TeamStats;


/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?1000 ./src/main.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack/hot/poll?1000 */"./node_modules/webpack/hot/poll.js?1000");
module.exports = __webpack_require__(/*! /Users/hardikvinodraimandavia/dev/hmandavia/loltrainer/lolapi/src/main.ts */"./src/main.ts");


/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "type-graphql":
/*!*******************************!*\
  !*** external "type-graphql" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("type-graphql");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9sb2cuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvcG9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb2x2ZXJzL01hdGNoUmVmZXJlbmNlUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jlc29sdmVycy9QYXJ0aWNpcGFudFJlc29sdmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9yZXNvbHZlcnMvU3VtbW9uZXJSZXNvbHZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzb2x2ZXJzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yaW90QXBpL0xlYWd1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmlvdEFwaS9NYXRjaGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9yaW90QXBpL1Jpb3RBUElCYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9yaW90QXBpL1N1bW1vbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL0NoYW1waW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL0xlYWd1ZUVudHJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL01hdGNoLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL01hdGNoTGlzdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hcy9NYXRjaFJlZmVyZW5jZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hcy9QYXJ0aWNpcGFudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NoZW1hcy9QYXJ0aWNpcGFudElkZW50aXR5LnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL1BhcnRpY2lwYW50U3RhdHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjaGVtYXMvUGxheWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL1F1ZXVlLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL1N1bW1vbmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2hlbWFzL1RlYW1TdGF0cy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWZsZWN0LW1ldGFkYXRhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHlwZS1ncmFwaHFsXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLDZCQUE2QjtRQUM3Qiw2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QUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFD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O1FBREMsb0JBQUssRUFBRTs7c0RBQ2dCO0lBR3hCO1FBREMsb0JBQUssRUFBRTs7aURBQ1k7SUFHcEI7UUFEQyxvQkFBSyxFQUFFOztxREFDZTtJQU12QjtRQURDLG9CQUFLLEVBQUU7O2lEQUNZO0lBR3BCO1FBREMsb0JBQUssRUFBRTs7a0RBQ2E7SUFHckI7UUFEQyxvQkFBSyxFQUFFOzsyREFDcUI7SUFHN0I7UUFEQyxvQkFBSyxFQUFFOztrREFDWTtJQUdwQjtRQURDLG9CQUFLLEVBQUU7O2lEQUNXO0lBR25CO1FBREMsb0JBQUssRUFBRTs7cURBQ2dCO0lBR3hCO1FBREMsb0JBQUssRUFBRTs7aURBQ1k7SUFHcEI7UUFEQyxvQkFBSyxFQUFFOzttREFDYTtJQUdyQjtRQURDLG9CQUFLLEVBQUU7O3NEQUNpQjtJQUd6QjtRQURDLG9CQUFLLEVBQUU7OzZDQUNPO0lBR2Y7UUFEQyxvQkFBSyxFQUFFOzswQ0FDSTtJQS9DTyxTQUFTO1FBRDdCLHlCQUFVLEVBQUU7T0FDUSxTQUFTLENBZ0Q3QjtJQUFELGdCQUFDO0tBQUE7a0JBaERvQixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSDlCLDBDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiKTtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmsuaWQsIGNodW5rLm1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xuIFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcbiBcdH1cblxuIFx0Ly9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJhMTM2YzVhNTg5MmViYmY5N2M5NFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG4gXHRcdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0c3dpdGNoIChob3RTdGF0dXMpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuIFx0XHRcdFx0XHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG4gXHRcdFx0XHRcdFx0KGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9XG4gXHRcdFx0XHRcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdH1cbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaCwgaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gXHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpIHtcbiBcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHQhbW9kdWxlIHx8XG4gXHRcdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcbiBcdFx0XHRcdClcbiBcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuIFx0XHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcbiBcdFx0XHRcdCFpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRwYXJlbnRzOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5wYXJlbnRzLnNsaWNlKCksXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGlmIChob3RVcGRhdGVOZXdIYXNoICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVuZGVmaW5lZDtcbiBcdFx0fVxuIFx0XHRob3RVcGRhdGUgPSB1bmRlZmluZWQ7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IGl0ZW0ucGFyZW50cztcbiBcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSBtb2R1bGVJZDtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdHJldHVybiBob3RBcHBseUludGVybmFsKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcbiBcdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRyZXR1cm4gbGlzdDtcbiBcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG4gXHRcdGlmIChob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoIWhvdFVwZGF0ZSkgaG90VXBkYXRlID0ge307XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZSk7XG4gXHRcdFx0aG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuIFx0XHRcdHJldHVybiB0cnVlO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0aWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBtb2R1bGVJZCkpXG4gXHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXBkYXRlZE1vZHVsZXMsIHJlbmV3ZWRNb2R1bGVzKSB7XG5cdHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XG5cdH0pO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdGlmICh1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0bG9nKFxuXHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIlxuXHRcdCk7XG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFyZW5ld2VkTW9kdWxlcyB8fCByZW5ld2VkTW9kdWxlcy5sZW5ndGggPT09IDApIHtcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gTm90aGluZyBob3QgdXBkYXRlZC5cIik7XG5cdH0gZWxzZSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZWQgbW9kdWxlczpcIik7XG5cdFx0cmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuXHRcdFx0aWYgKHR5cGVvZiBtb2R1bGVJZCA9PT0gXCJzdHJpbmdcIiAmJiBtb2R1bGVJZC5pbmRleE9mKFwiIVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gbW9kdWxlSWQuc3BsaXQoXCIhXCIpO1xuXHRcdFx0XHRsb2cuZ3JvdXBDb2xsYXBzZWQoXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBwYXJ0cy5wb3AoKSk7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdFx0bG9nLmdyb3VwRW5kKFwiaW5mb1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgbnVtYmVySWRzID0gcmVuZXdlZE1vZHVsZXMuZXZlcnkoZnVuY3Rpb24obW9kdWxlSWQpIHtcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XG5cdFx0fSk7XG5cdFx0aWYgKG51bWJlcklkcylcblx0XHRcdGxvZyhcblx0XHRcdFx0XCJpbmZvXCIsXG5cdFx0XHRcdFwiW0hNUl0gQ29uc2lkZXIgdXNpbmcgdGhlIE5hbWVkTW9kdWxlc1BsdWdpbiBmb3IgbW9kdWxlIG5hbWVzLlwiXG5cdFx0XHQpO1xuXHR9XG59O1xuIiwidmFyIGxvZ0xldmVsID0gXCJpbmZvXCI7XG5cbmZ1bmN0aW9uIGR1bW15KCkge31cblxuZnVuY3Rpb24gc2hvdWxkTG9nKGxldmVsKSB7XG5cdHZhciBzaG91bGRMb2cgPVxuXHRcdChsb2dMZXZlbCA9PT0gXCJpbmZvXCIgJiYgbGV2ZWwgPT09IFwiaW5mb1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcIndhcm5pbmdcIikgfHxcblx0XHQoW1wiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJlcnJvclwiXS5pbmRleE9mKGxvZ0xldmVsKSA+PSAwICYmIGxldmVsID09PSBcImVycm9yXCIpO1xuXHRyZXR1cm4gc2hvdWxkTG9nO1xufVxuXG5mdW5jdGlvbiBsb2dHcm91cChsb2dGbikge1xuXHRyZXR1cm4gZnVuY3Rpb24obGV2ZWwsIG1zZykge1xuXHRcdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0XHRsb2dGbihtc2cpO1xuXHRcdH1cblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnMgKi9cbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XG52YXIgZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGR1bW15O1xudmFyIGdyb3VwRW5kID0gY29uc29sZS5ncm91cEVuZCB8fCBkdW1teTtcbi8qIGVzbGludC1lbmFibGUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zICovXG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24obGV2ZWwpIHtcblx0bG9nTGV2ZWwgPSBsZXZlbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZvcm1hdEVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG5cdHZhciBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG5cdHZhciBzdGFjayA9IGVyci5zdGFjaztcblx0aWYgKCFzdGFjaykge1xuXHRcdHJldHVybiBtZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHN0YWNrLmluZGV4T2YobWVzc2FnZSkgPCAwKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UgKyBcIlxcblwiICsgc3RhY2s7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHN0YWNrO1xuXHR9XG59O1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8qZ2xvYmFscyBfX3Jlc291cmNlUXVlcnkgKi9cbmlmIChtb2R1bGUuaG90KSB7XG5cdHZhciBob3RQb2xsSW50ZXJ2YWwgPSArX19yZXNvdXJjZVF1ZXJ5LnN1YnN0cigxKSB8fCAxMCAqIDYwICogMTAwMDtcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcblxuXHR2YXIgY2hlY2tGb3JVcGRhdGUgPSBmdW5jdGlvbiBjaGVja0ZvclVwZGF0ZShmcm9tVXBkYXRlKSB7XG5cdFx0aWYgKG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiaWRsZVwiKSB7XG5cdFx0XHRtb2R1bGUuaG90XG5cdFx0XHRcdC5jaGVjayh0cnVlKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbih1cGRhdGVkTW9kdWxlcykge1xuXHRcdFx0XHRcdGlmICghdXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0XHRcdGlmIChmcm9tVXBkYXRlKSBsb2coXCJpbmZvXCIsIFwiW0hNUl0gVXBkYXRlIGFwcGxpZWQuXCIpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXF1aXJlKFwiLi9sb2ctYXBwbHktcmVzdWx0XCIpKHVwZGF0ZWRNb2R1bGVzLCB1cGRhdGVkTW9kdWxlcyk7XG5cdFx0XHRcdFx0Y2hlY2tGb3JVcGRhdGUodHJ1ZSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdFx0XHR2YXIgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcblx0XHRcdFx0XHRpZiAoW1wiYWJvcnRcIiwgXCJmYWlsXCJdLmluZGV4T2Yoc3RhdHVzKSA+PSAwKSB7XG5cdFx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gQ2Fubm90IGFwcGx5IHVwZGF0ZS5cIik7XG5cdFx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gWW91IG5lZWQgdG8gcmVzdGFydCB0aGUgYXBwbGljYXRpb24hXCIpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVXBkYXRlIGZhaWxlZDogXCIgKyBsb2cuZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cdHNldEludGVydmFsKGNoZWNrRm9yVXBkYXRlLCBob3RQb2xsSW50ZXJ2YWwpO1xufSBlbHNlIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC5cIik7XG59XG4iLCJpbXBvcnQgeyBBcG9sbG9TZXJ2ZXIsIElSZXNvbHZlcnMgfSBmcm9tICdhcG9sbG8tc2VydmVyJztcbmltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCB7IGJ1aWxkU2NoZW1hIH0gZnJvbSBcInR5cGUtZ3JhcGhxbFwiO1xuXG5pbXBvcnQgKiBhcyByZXNvbHZlcnMgZnJvbSAnLi9yZXNvbHZlcnMnO1xuXG5hc3luYyBmdW5jdGlvbiBib290c3RyYXAoKSB7XG4gIGNvbnN0IHNjaGVtYSA9IGF3YWl0IGJ1aWxkU2NoZW1hKHtcbiAgICByZXNvbHZlcnM6IE9iamVjdC52YWx1ZXMocmVzb2x2ZXJzKSxcbiAgICBlbWl0U2NoZW1hRmlsZTogdHJ1ZVxuICB9KTtcblxuICBjb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHtzY2hlbWF9KTtcblxuICBzZXJ2ZXIubGlzdGVuKClcbiAgICAudGhlbigoeyB1cmwgfSkgPT4gY29uc29sZS5sb2coYFNlcnZlciByZWFkeSBhdCAke3VybH0gYCkpO1xuXG4gIGlmKG1vZHVsZS5ob3QpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiBjb25zb2xlLmxvZygnTW9kdWxlIGRpc3Bvc2VkLiAnKSk7XG4gIH1cbn1cblxuYm9vdHN0cmFwKCk7XG4iLCJpbXBvcnQgeyBGaWVsZFJlc29sdmVyLCBSZXNvbHZlciwgUm9vdCB9IGZyb20gXCJ0eXBlLWdyYXBocWxcIjtcblxuaW1wb3J0IENoYW1waW9uIGZyb20gXCIuLi9zY2hlbWFzL0NoYW1waW9uXCI7XG5pbXBvcnQgTWF0Y2ggZnJvbSBcIi4uL3NjaGVtYXMvTWF0Y2hcIjtcbmltcG9ydCBNYXRjaFJlZmVyZW5jZSBmcm9tIFwiLi4vc2NoZW1hcy9NYXRjaFJlZmVyZW5jZVwiO1xuaW1wb3J0IFF1ZXVlIGZyb20gXCIuLi9zY2hlbWFzL1F1ZXVlXCI7XG5cbmltcG9ydCAqIGFzIGNoYW1waW9ucyBmcm9tIFwiLi4vZGF0YS9jaGFtcGlvbi5qc29uXCI7XG5pbXBvcnQgKiBhcyBxdWV1ZXMgZnJvbSBcIi4uL2RhdGEvcXVldWVzLmpzb25cIjtcblxuaW1wb3J0IHsgZ2V0TWF0Y2hCeUlkIH0gZnJvbSBcIi4uL3Jpb3RBcGkvTWF0Y2hlc1wiO1xuXG5AUmVzb2x2ZXIob2YgPT4gTWF0Y2hSZWZlcmVuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIEBGaWVsZFJlc29sdmVyKClcbiAgZ2FtZURldGFpbHMoQFJvb3QoKSBtYXRjaFJlZmVyZW5jZTogTWF0Y2hSZWZlcmVuY2UpIHtcbiAgICBjb25zdCB7IGdhbWVJZCwgcmVnaW9uIH0gPSBtYXRjaFJlZmVyZW5jZTtcbiAgICByZXR1cm4gZ2V0TWF0Y2hCeUlkKHJlZ2lvbiwgZ2FtZUlkKVxuICAgICAgLnRoZW4oKGRhdGE6IE1hdGNoKSA9PiBkYXRhKVxuICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSk7XG4gIH1cblxuICBARmllbGRSZXNvbHZlcigpXG4gIGNoYW1waW9uRGV0YWlscyhAUm9vdCgpIG1hdGNoUmVmZXJlbmNlOiBNYXRjaFJlZmVyZW5jZSkge1xuICAgIGNvbnN0IHsgZGF0YSB9ID0gY2hhbXBpb25zO1xuICAgIGNvbnN0IGNoYW1waW9uVmFsdWVzID0gT2JqZWN0LnZhbHVlcyhkYXRhKTtcblxuICAgIGNvbnN0IGNoYW1waW9uOiBDaGFtcGlvbiB8IHVuZGVmaW5lZCA9IGNoYW1waW9uVmFsdWVzLmZpbmQoXG4gICAgICBjID0+IGMua2V5ID09PSBtYXRjaFJlZmVyZW5jZS5jaGFtcGlvbi50b1N0cmluZygpXG4gICAgKTtcblxuICAgIHJldHVybiBjaGFtcGlvbjtcbiAgfVxuXG4gIEBGaWVsZFJlc29sdmVyKClcbiAgcXVldWVEZXRhaWxzKEBSb290KCkgbWF0Y2hSZWZlcmVuY2U6IE1hdGNoUmVmZXJlbmNlKSB7XG4gICAgY29uc3QgcXVldWU6IFF1ZXVlIHwgdW5kZWZpbmVkID0gcXVldWVzLmZpbmQoXG4gICAgICBxID0+IHEucXVldWVJZCA9PT0gbWF0Y2hSZWZlcmVuY2UucXVldWVcbiAgICApO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBGaWVsZFJlc29sdmVyLCBSZXNvbHZlciwgUm9vdCB9IGZyb20gXCJ0eXBlLWdyYXBocWxcIjtcblxuaW1wb3J0IFBhcnRpY2lwYW50IGZyb20gXCIuLi9zY2hlbWFzL1BhcnRpY2lwYW50XCI7XG5cbkBSZXNvbHZlcihvZiA9PiBQYXJ0aWNpcGFudClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgLy8gQEZpZWxkUmVzb2x2ZXIoKVxuICAvLyBwYXJ0aWNpcGFudFRpbWVsaW5lKEBSb290KCkgcGFydGljaXBhbnQ6IGFueSkge1xuICAvLyAgIHJldHVybiBwYXJ0aWNpcGFudC5wYXJ0aWNpcGFudFRpbWVsaW5lO1xuICAvLyB9XG59IiwiaW1wb3J0IHsgQXJnLCBGaWVsZFJlc29sdmVyLCBRdWVyeSwgUmVzb2x2ZXIsIFJvb3QgfSBmcm9tIFwidHlwZS1ncmFwaHFsXCI7XG5cbmltcG9ydCBMZWFndWVFbnRyeSBmcm9tIFwiLi4vc2NoZW1hcy9MZWFndWVFbnRyeVwiO1xuaW1wb3J0IE1hdGNoTGlzdCBmcm9tIFwiLi4vc2NoZW1hcy9NYXRjaExpc3RcIjtcbmltcG9ydCBTdW1tb25lciBmcm9tIFwiLi4vc2NoZW1hcy9TdW1tb25lclwiO1xuXG5pbXBvcnQgeyBnZXRMZWFndWVzQnlTdW1tb25lciB9IGZyb20gXCIuLi9yaW90QXBpL0xlYWd1ZVwiO1xuaW1wb3J0IHsgZ2V0TWF0Y2hMaXN0QnlBY2NvdW50IH0gZnJvbSBcIi4uL3Jpb3RBcGkvTWF0Y2hlc1wiO1xuaW1wb3J0IHsgZ2V0U3VtbW9uZXJCeU5hbWUgfSBmcm9tIFwiLi4vcmlvdEFwaS9TdW1tb25lclwiO1xuXG5AUmVzb2x2ZXIob2YgPT4gU3VtbW9uZXIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIEBRdWVyeShyZXR1cm5zID0+IFN1bW1vbmVyKVxuICBhc3luYyBmZXRjaFN1bW1vbmVyKFxuICAgIEBBcmcoXCJyZWdpb25cIikgcmVnaW9uOiBzdHJpbmcsXG4gICAgQEFyZyhcIm5hbWVcIikgbmFtZTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiBnZXRTdW1tb25lckJ5TmFtZShyZWdpb24sIG5hbWUpXG4gICAgICAudGhlbigoZGF0YTogU3VtbW9uZXIpID0+ICh7IC4uLmRhdGEsIHJlZ2lvbiB9KSlcbiAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICB9XG5cbiAgQEZpZWxkUmVzb2x2ZXIoKVxuICByYW5rZWQoQFJvb3QoKSBzdW1tb25lcjogU3VtbW9uZXIpIHtcbiAgICByZXR1cm4gZ2V0TGVhZ3Vlc0J5U3VtbW9uZXIoc3VtbW9uZXIucmVnaW9uLCBzdW1tb25lci5pZClcbiAgICAgIC50aGVuKChkYXRhOiBMZWFndWVFbnRyeVtdKSA9PiBkYXRhKVxuICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSk7XG4gIH1cblxuICBARmllbGRSZXNvbHZlcigpXG4gIG1hdGNoTGlzdChAUm9vdCgpIHN1bW1vbmVyOiBTdW1tb25lcikge1xuICAgIHJldHVybiBnZXRNYXRjaExpc3RCeUFjY291bnQoc3VtbW9uZXIucmVnaW9uLCBzdW1tb25lci5hY2NvdW50SWQpXG4gICAgICAudGhlbigoZGF0YTogTWF0Y2hMaXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhLm1hdGNoZXMubWFwKG0gPT4ge1xuICAgICAgICAgIG0ucmVnaW9uID0gc3VtbW9uZXIucmVnaW9uO1xuICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgLi4uZGF0YSwgbWF0Y2hlcyB9O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIE1hdGNoUmVmZXJlbmNlUmVzb2x2ZXIgfSBmcm9tICcuL01hdGNoUmVmZXJlbmNlUmVzb2x2ZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXJ0aWNpcGFudFJlc29sdmVyIH0gZnJvbSAnLi9QYXJ0aWNpcGFudFJlc29sdmVyJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3VtbW9uZXJSZXNvbHZlciB9IGZyb20gJy4vU3VtbW9uZXJSZXNvbHZlcic7XG4iLCJpbXBvcnQgeyBnZXRBUElfVVJMLCByaW90RmV0Y2hSZXNwb25zZSB9IGZyb20gXCIuL1Jpb3RBUElCYXNlXCI7XG5cbmNvbnN0IGVuZHBvaW50ID0gYGxlYWd1ZS92NGA7XG5cbmV4cG9ydCBjb25zdCBnZXRMZWFndWVzQnlTdW1tb25lciA9IChyZWdpb246IHN0cmluZywgaWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBtZXRob2QgPSAnZW50cmllcy9ieS1zdW1tb25lcic7XG4gIGNvbnN0IHVybCA9IGAke2dldEFQSV9VUkwocmVnaW9uLCBlbmRwb2ludCwgbWV0aG9kKX0vJHtpZH1gO1xuICByZXR1cm4gcmlvdEZldGNoUmVzcG9uc2UoYCR7dXJsfWApO1xufTtcbiIsImltcG9ydCB7IGdldEFQSV9VUkwsIHJpb3RGZXRjaFJlc3BvbnNlIH0gZnJvbSAnLi9SaW90QVBJQmFzZSc7XG5cbmNvbnN0IGVuZHBvaW50ID0gJ21hdGNoL3Y0JztcblxuZXhwb3J0IGNvbnN0IGdldE1hdGNoTGlzdEJ5QWNjb3VudCA9IChyZWdpb246IHN0cmluZywgYWNjb3VudElkOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgbWV0aG9kID0gJ21hdGNobGlzdHMvYnktYWNjb3VudCc7XG4gIGNvbnN0IHVybCA9IGAke2dldEFQSV9VUkwocmVnaW9uLCBlbmRwb2ludCwgbWV0aG9kKX0vJHthY2NvdW50SWR9P2VuZEluZGV4PTEwYDtcbiAgcmV0dXJuIHJpb3RGZXRjaFJlc3BvbnNlKGAke3VybH1gKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldE1hdGNoQnlJZCA9IChyZWdpb246IHN0cmluZywgbWF0Y2hJZDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IG1ldGhvZCA9ICdtYXRjaGVzJztcbiAgY29uc3QgdXJsID0gYCR7Z2V0QVBJX1VSTChyZWdpb24sIGVuZHBvaW50LCBtZXRob2QpfS8ke21hdGNoSWR9YDtcbiAgcmV0dXJuIHJpb3RGZXRjaFJlc3BvbnNlKGAke3VybH1gKTtcbn1cbiIsImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgQVBJX0tFWSA9ICdSR0FQSS0xODI0NzgxZS0yYmM2LTQxMmItODI0ZC03MWE0MzIyYjcwZWQnO1xuXG5leHBvcnQgY29uc3QgQVBJX1ZFUiA9ICd2NCc7XG5leHBvcnQgY29uc3QgUEFUQ0hfVkVSID0gJzEwLjEwLjEnO1xuXG5jb25zdCBDRE5fUk9PVCA9ICdodHRwczovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vJztcblxuZXhwb3J0IGNvbnN0IGdldEFQSV9VUkwgPSAoXG4gIHJlZ2lvbjogc3RyaW5nLFxuICBlbmRwb2ludDogc3RyaW5nLFxuICBtZXRob2Q6IHN0cmluZ1xuKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGBodHRwczovLyR7cmVnaW9ufS5hcGkucmlvdGdhbWVzLmNvbS9sb2wvJHtlbmRwb2ludH0vJHttZXRob2R9YDtcbn07XG5cbmNvbnN0IEhFQURFUlMgPSB7XG4gIE9yaWdpbjogXCJodHRwczovL2RldmVsb3Blci5yaW90Z2FtZXMuY29tXCIsXG4gIFwiQWNjZXB0LUNoYXJzZXRcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgXCJYLVJpb3QtVG9rZW5cIjogQVBJX0tFWSxcbiAgXCJBY2NlcHQtTGFuZ3VhZ2VcIjogXCJlbixlbi1VUztxPTAuOSxlbi1HQjtxPTAuOFwiLFxuICBcIlVzZXItQWdlbnRcIjpcbiAgICBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82OS4wLjM0OTcuMTAwIFNhZmFyaS81MzcuMzZcIlxufTtcblxuZXhwb3J0IGNvbnN0IHJpb3RGZXRjaCA9ICh1cmw6IHN0cmluZykgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCwge1xuICAgIGhlYWRlcnM6IEhFQURFUlNcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmlvdEZldGNoUmVzcG9uc2UgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHJpb3RGZXRjaCh1cmwpLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbn1cblxuY29uc3QgUmlvdEFQSUJhc2UgPSB7XG4gIEFQSV9WRVIsXG4gIEhFQURFUlMsXG4gIGdldEFQSV9VUkwsXG4gIHJpb3RGZXRjaFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmlvdEFQSUJhc2U7XG4iLCJpbXBvcnQgeyBnZXRBUElfVVJMLCByaW90RmV0Y2hSZXNwb25zZSB9ICBmcm9tICcuL1Jpb3RBUElCYXNlJztcblxuY29uc3QgZW5kcG9pbnQgPSBgc3VtbW9uZXIvdjRgO1xuXG5leHBvcnQgY29uc3QgZ2V0U3VtbW9uZXJCeU5hbWUgPSAocmVnaW9uOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xuICBjb25zdCBtZXRob2QgPSAnc3VtbW9uZXJzL2J5LW5hbWUnO1xuICBjb25zdCB1cmwgPSBgJHtnZXRBUElfVVJMKHJlZ2lvbiwgZW5kcG9pbnQsIG1ldGhvZCl9LyR7bmFtZX1gO1xuICByZXR1cm4gcmlvdEZldGNoUmVzcG9uc2UoYCR7dXJsfWApO1xufTtcbiIsImltcG9ydCB7IEZpZWxkLCBPYmplY3RUeXBlIH0gZnJvbSAndHlwZS1ncmFwaHFsJztcblxuQE9iamVjdFR5cGUoKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbXBpb24ge1xuICBARmllbGQoKVxuICBpZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIGtleTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHsgRmllbGQsIE9iamVjdFR5cGUgfSBmcm9tICd0eXBlLWdyYXBocWwnO1xuXG5AT2JqZWN0VHlwZSgpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZWFndWVFbnRyeSB7XG4gIEBGaWVsZCgpXG4gIGxlYWd1ZUlkOiBzdHJpbmc7XG5cbiAgQEZpZWxkKClcbiAgc3VtbW9uZXJJZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIHN1bW1vbmVyTmFtZTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIHF1ZXVlVHlwZTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIHRpZXI6IHN0cmluZztcblxuICBARmllbGQoKVxuICByYW5rOiBzdHJpbmc7XG5cbiAgQEZpZWxkKClcbiAgbGVhZ3VlUG9pbnRzOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgd2luczogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGxvc3NlczogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGhvdFN0cmVhazogYm9vbGVhbjtcblxuICBARmllbGQoKVxuICB2ZXRlcmFuOiBib29sZWFuO1xuXG4gIEBGaWVsZCgpXG4gIGZyZXNoQmxvb2Q6IGJvb2xlYW47XG5cbiAgQEZpZWxkKClcbiAgaW5hY3RpdmU6IGJvb2xlYW47XG59XG4iLCJpbXBvcnQgeyBGaWVsZCwgT2JqZWN0VHlwZSB9IGZyb20gXCJ0eXBlLWdyYXBocWxcIjtcblxuaW1wb3J0IFBhcnRpY2lwYW50IGZyb20gXCIuL1BhcnRpY2lwYW50XCI7XG5pbXBvcnQgUGFydGljaXBhbnRJZGVudGl0eSBmcm9tIFwiLi9QYXJ0aWNpcGFudElkZW50aXR5XCI7XG5pbXBvcnQgVGVhbVN0YXRzIGZyb20gXCIuL1RlYW1TdGF0c1wiO1xuXG5AT2JqZWN0VHlwZSgpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRjaCB7XG4gIEBGaWVsZCgpXG4gIGdhbWVJZDogbnVtYmVyO1xuXG4gIEBGaWVsZCh0eXBlID0+IFtQYXJ0aWNpcGFudF0pXG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcblxuICBARmllbGQodHlwZSA9PiBbUGFydGljaXBhbnRJZGVudGl0eV0pXG4gIHBhcnRpY2lwYW50SWRlbnRpdGllczogUGFydGljaXBhbnRJZGVudGl0eVtdO1xuXG4gIEBGaWVsZCgpXG4gIHF1ZXVlSWQ6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBnYW1lVHlwZTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIGdhbWVEdXJhdGlvbjogbnVtYmVyO1xuXG4gIEBGaWVsZCh0eXBlID0+IFtUZWFtU3RhdHNdKVxuICB0ZWFtczogVGVhbVN0YXRzW107XG5cbiAgQEZpZWxkKClcbiAgcGxhdGZvcm1JZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIGdhbWVDcmVhdGlvbjogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIHNlYXNvbklkOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgZ2FtZVZlcnNpb246IHN0cmluZztcblxuICBARmllbGQoKVxuICBtYXBJZDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGdhbWVNb2RlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBGaWVsZCwgT2JqZWN0VHlwZSB9IGZyb20gJ3R5cGUtZ3JhcGhxbCc7XG5cbmltcG9ydCBNYXRjaFJlZmVyZW5jZSBmcm9tICcuL01hdGNoUmVmZXJlbmNlJztcblxuQE9iamVjdFR5cGUoKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0Y2hMaXN0IHtcbiAgQEZpZWxkKClcbiAgc3RhcnRJbmRleDpcdG51bWJlcjtcblxuICBARmllbGQoKVxuICB0b3RhbEdhbWVzOlx0bnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGVuZEluZGV4Olx0bnVtYmVyO1xuXG4gIEBGaWVsZCh0eXBlID0+IFtNYXRjaFJlZmVyZW5jZV0pXG4gIG1hdGNoZXM6IE1hdGNoUmVmZXJlbmNlW107XG59XG4iLCJpbXBvcnQgeyBGaWVsZCwgT2JqZWN0VHlwZSB9IGZyb20gXCJ0eXBlLWdyYXBocWxcIjtcblxuaW1wb3J0IENoYW1waW9uIGZyb20gXCIuL0NoYW1waW9uXCI7XG5pbXBvcnQgTWF0Y2ggZnJvbSBcIi4vTWF0Y2hcIjtcbmltcG9ydCBRdWV1ZSBmcm9tIFwiLi9RdWV1ZVwiO1xuXG5AT2JqZWN0VHlwZSgpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRjaFJlZmVyZW5jZSB7XG4gIEBGaWVsZCgpXG4gIGdhbWVJZDogbnVtYmVyO1xuXG4gIEBGaWVsZCh0eXBlID0+IE1hdGNoKVxuICBnYW1lRGV0YWlsczogTWF0Y2g7XG5cbiAgQEZpZWxkKClcbiAgcm9sZTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIHNlYXNvbjogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIHBsYXRmb3JtSWQ6IHN0cmluZztcblxuICBARmllbGQoKVxuICBjaGFtcGlvbjogbnVtYmVyO1xuXG4gIEBGaWVsZCh0eXBlID0+IENoYW1waW9uLCB7IG51bGxhYmxlOiB0cnVlIH0pXG4gIGNoYW1waW9uRGV0YWlsczogQ2hhbXBpb247XG5cbiAgQEZpZWxkKClcbiAgcXVldWU6IG51bWJlcjtcblxuICBARmllbGQodHlwZSA9PiBRdWV1ZSwgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBxdWV1ZURldGFpbHM6IFF1ZXVlO1xuXG4gIEBGaWVsZCgpXG4gIGxhbmU6IHN0cmluZztcblxuICBARmllbGQoKVxuICB0aW1lc3RhbXA6IG51bWJlcjtcblxuICBARmllbGQoKVxuICByZWdpb246IHN0cmluZztcbn1cbiIsImltcG9ydCB7IEZpZWxkLCBPYmplY3RUeXBlIH0gZnJvbSBcInR5cGUtZ3JhcGhxbFwiO1xuXG5pbXBvcnQgUGFydGljaXBhbnRTdGF0cyBmcm9tIFwiLi9QYXJ0aWNpcGFudFN0YXRzXCI7XG5pbXBvcnQgUGFydGljaXBhbnRUaW1lbGluZSBmcm9tIFwiLi9QYXJ0aWNpcGFudFRpbWVsaW5lXCI7XG5cbkBPYmplY3RUeXBlKClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2lwYW50IHtcbiAgQEZpZWxkKClcbiAgcGFydGljaXBhbnRJZDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGNoYW1waW9uSWQ6IG51bWJlcjtcblxuICAvLyBARmllbGQoKVxuICAvLyBydW5lczpcdFJ1bmVbXVxuXG4gIEBGaWVsZCh0eXBlID0+IFBhcnRpY2lwYW50U3RhdHMpXG4gIHN0YXRzOlx0UGFydGljaXBhbnRTdGF0cztcblxuICAvLyBARmllbGQodHlwZSA9PiBQYXJ0aWNpcGFudFRpbWVsaW5lKVxuICAvLyB0aW1lbGluZTogUGFydGljaXBhbnRUaW1lbGluZTtcblxuICBARmllbGQoKVxuICB0ZWFtSWQ6IG51bWJlcjsgLy8gMTAwIGZvciBibHVlIHNpZGUuIDIwMCBmb3IgcmVkIHNpZGUuXG5cbiAgQEZpZWxkKClcbiAgc3BlbGwxSWQ6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBzcGVsbDJJZDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGhpZ2hlc3RBY2hpZXZlZFNlYXNvblRpZXI6IHN0cmluZztcblxuICAvLyBARmllbGQoKVxuICAvLyBtYXN0ZXJpZXM6XHRNYXN0ZXJ5W107XG59XG4iLCJpbXBvcnQgeyBGaWVsZCwgT2JqZWN0VHlwZSB9IGZyb20gXCJ0eXBlLWdyYXBocWxcIjtcblxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIjtcblxuQE9iamVjdFR5cGUoKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljaXBhbnRJZGVudGl0eSB7XG4gIEBGaWVsZCgpXG4gIHBhcnRpY2lwYW50SWQ6IG51bWJlcjtcblxuICBARmllbGQodHlwZSA9PiBQbGF5ZXIpXG4gIHBsYXllcjogUGxheWVyO1xufVxuIiwiaW1wb3J0IHsgRmllbGQsIE9iamVjdFR5cGUgfSBmcm9tIFwidHlwZS1ncmFwaHFsXCI7XG5cbkBPYmplY3RUeXBlKClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2lwYW50U3RhdHMge1xuICBARmllbGQoKVxuICB3aW46IGJvb2xlYW47XG5cbiAgQEZpZWxkKClcbiAga2lsbHM6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBkZWF0aHM6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBhc3Npc3RzOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgaXRlbTA6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBpdGVtMTogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGl0ZW0yOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgaXRlbTM6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBpdGVtNDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGl0ZW01OiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgaXRlbTY6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBnb2xkRWFybmVkOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgdG90YWxEYW1hZ2VUYWtlbjogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGZpcnN0VG93ZXJLaWxsOiBib29sZWFuO1xuXG4gIEBGaWVsZCgpXG4gIHdhcmRzUGxhY2VkOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgdG90YWxNaW5pb25zS2lsbGVkOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgZmlyc3RUb3dlckFzc2lzdDogYm9vbGVhbjtcblxuICBARmllbGQoKVxuICBwYXJ0aWNpcGFudElkOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgZmlyc3RCbG9vZEFzc2lzdDogYm9vbGVhbjtcbiAgXG4gIEBGaWVsZCgpXG4gIGRhbWFnZURlYWx0VG9UdXJyZXRzOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgZmlyc3RCbG9vZEtpbGw6IGJvb2xlYW47XG5cbiAgQEZpZWxkKClcbiAgc2lnaHRXYXJkc0JvdWdodEluR2FtZTogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIHBlcmswOiBudW1iZXI7IC8vIFByaW1hcnkgcGF0aCBrZXlzdG9uZSBydW5lLlxuXG4gIEBGaWVsZCgpXG4gIHBlcmsxOiBudW1iZXI7IC8vIFByaW1hcnkgcGF0aCBydW5lLlxuXG4gIEBGaWVsZCgpXG4gIHBlcmsyOiBudW1iZXI7IC8vIFByaW1hcnkgcGF0aCBydW5lLlxuXG4gIEBGaWVsZCgpXG4gIHBlcmszOiBudW1iZXI7IC8vIFByaW1hcnkgcGF0aCBydW5lLlxuXG4gIEBGaWVsZCgpXG4gIHBlcms0OiBudW1iZXI7IC8vIFNlY29uZGFyeSBwYXRoIHJ1bmUuXG5cbiAgQEZpZWxkKClcbiAgcGVyazU6IG51bWJlcjsgLy8gU2Vjb25kYXJ5IHBhdGggcnVuZS5cblxuICBARmllbGQoKVxuICBwZXJrUHJpbWFyeVN0eWxlOiBudW1iZXI7IC8vIFByaW1hcnkgcnVuZSBwYXRoXG5cbiAgQEZpZWxkKClcbiAgcGVya1N1YlN0eWxlOiBudW1iZXI7IC8vIFNlY29uZGFyeSBydW5lIHBhdGhcbn1cbiIsImltcG9ydCB7IEZpZWxkLCBPYmplY3RUeXBlIH0gZnJvbSBcInR5cGUtZ3JhcGhxbFwiO1xuXG5AT2JqZWN0VHlwZSgpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBARmllbGQoKVxuICBwcm9maWxlSWNvbjogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGFjY291bnRJZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIG1hdGNoSGlzdG9yeVVyaTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIGN1cnJlbnRBY2NvdW50SWQ6IHN0cmluZztcblxuICBARmllbGQoKVxuICBjdXJyZW50UGxhdGZvcm1JZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIHN1bW1vbmVyTmFtZTogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIHN1bW1vbmVySWQ6IHN0cmluZztcblxuICBARmllbGQoKVxuICBwbGF0Zm9ybUlkOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBGaWVsZCwgT2JqZWN0VHlwZSB9IGZyb20gJ3R5cGUtZ3JhcGhxbCc7XG5cbkBPYmplY3RUeXBlKClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXVlIHtcbiAgQEZpZWxkKClcbiAgcXVldWVJZDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIG1hcDogc3RyaW5nO1xuXG4gIEBGaWVsZCh0eXBlID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxuICBkZXNjcmlwdGlvbjogc3RyaW5nIHwgbnVsbDtcbn1cbiIsImltcG9ydCB7IEZpZWxkLCBPYmplY3RUeXBlIH0gZnJvbSAndHlwZS1ncmFwaHFsJztcblxuaW1wb3J0IExlYWd1ZUVudHJ5IGZyb20gJy4vTGVhZ3VlRW50cnknO1xuaW1wb3J0IE1hdGNoTGlzdCBmcm9tICcuL01hdGNoTGlzdCc7XG5cbkBPYmplY3RUeXBlKClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1bW1vbmVyIHtcbiAgQEZpZWxkKClcbiAgaWQ6IHN0cmluZztcblxuICBARmllbGQoKVxuICBhY2NvdW50SWQ6IHN0cmluZztcblxuICBARmllbGQoKVxuICBwdXVpZDogc3RyaW5nO1xuXG4gIEBGaWVsZCgpXG4gIG5hbWU6IHN0cmluZztcblxuICBARmllbGQoKVxuICBwcm9maWxlSWNvbklkOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgcmV2aXNpb25EYXRlOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgc3VtbW9uZXJMZXZlbDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIHJlZ2lvbjogc3RyaW5nO1xuXG4gIEBGaWVsZCh0eXBlID0+IFtMZWFndWVFbnRyeV0pXG4gIHJhbmtlZDogTGVhZ3VlRW50cnlbXTtcblxuICBARmllbGQodHlwZSA9PiBNYXRjaExpc3QpXG4gIG1hdGNoTGlzdDogTWF0Y2hMaXN0O1xufVxuIiwiaW1wb3J0IHsgRmllbGQsIE9iamVjdFR5cGUgfSBmcm9tIFwidHlwZS1ncmFwaHFsXCI7XG5cbkBPYmplY3RUeXBlKClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYW1TdGF0cyB7XG4gIEBGaWVsZCgpXG4gIHRvd2VyS2lsbHM6IG51bWJlcjtcblxuICBARmllbGQoKVxuICByaWZ0SGVyYWxkS2lsbHM6IG51bWJlcjtcblxuICBARmllbGQoKVxuICBmaXJzdEJsb29kOiBib29sZWFuO1xuXG4gIEBGaWVsZCgpXG4gIGluaGliaXRvcktpbGxzOiBudW1iZXI7XG5cbiAgLy8gQEZpZWxkKHR5cGUgPT4gW1RlYW1CYW5zXSlcbiAgLy8gYmFuczpcdFRlYW1CYW5zW107XG5cbiAgQEZpZWxkKClcbiAgZmlyc3RCYXJvbjogYm9vbGVhbjtcblxuICBARmllbGQoKVxuICBmaXJzdERyYWdvbjogYm9vbGVhbjtcblxuICBARmllbGQoKVxuICBkb21pbmlvblZpY3RvcnlTY29yZTogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGRyYWdvbktpbGxzOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgYmFyb25LaWxsczogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIGZpcnN0SW5oaWJpdG9yOiBib29sZWFuO1xuXG4gIEBGaWVsZCgpXG4gIGZpcnN0VG93ZXI6IGJvb2xlYW47XG5cbiAgQEZpZWxkKClcbiAgdmlsZW1hd0tpbGxzOiBudW1iZXI7XG5cbiAgQEZpZWxkKClcbiAgZmlyc3RSaWZ0SGVyYWxkOiBib29sZWFuO1xuXG4gIEBGaWVsZCgpXG4gIHRlYW1JZDogbnVtYmVyO1xuXG4gIEBGaWVsZCgpXG4gIHdpbjogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGUtZ3JhcGhxbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9