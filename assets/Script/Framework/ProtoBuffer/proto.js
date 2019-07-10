/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";
var $protobuf
if(CC_EDITOR){
    $protobuf = require("protobufjs/minimal");
}else{
    $protobuf = protobuf;
}



// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.awesomepackage = (function() {

    /**
     * Namespace awesomepackage.
     * @exports awesomepackage
     * @namespace
     */
    var awesomepackage = {};

    awesomepackage.AwesomeMessage = (function() {

        /**
         * Properties of an AwesomeMessage.
         * @memberof awesomepackage
         * @interface IAwesomeMessage
         * @property {string|null} [awesomeField] AwesomeMessage awesomeField
         */

        /**
         * Constructs a new AwesomeMessage.
         * @memberof awesomepackage
         * @classdesc Represents an AwesomeMessage.
         * @implements IAwesomeMessage
         * @constructor
         * @param {awesomepackage.IAwesomeMessage=} [properties] Properties to set
         */
        function AwesomeMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AwesomeMessage awesomeField.
         * @member {string} awesomeField
         * @memberof awesomepackage.AwesomeMessage
         * @instance
         */
        AwesomeMessage.prototype.awesomeField = "";

        /**
         * Creates a new AwesomeMessage instance using the specified properties.
         * @function create
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {awesomepackage.IAwesomeMessage=} [properties] Properties to set
         * @returns {awesomepackage.AwesomeMessage} AwesomeMessage instance
         */
        AwesomeMessage.create = function create(properties) {
            return new AwesomeMessage(properties);
        };

        /**
         * Encodes the specified AwesomeMessage message. Does not implicitly {@link awesomepackage.AwesomeMessage.verify|verify} messages.
         * @function encode
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {awesomepackage.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.awesomeField != null && message.hasOwnProperty("awesomeField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.awesomeField);
            return writer;
        };

        /**
         * Encodes the specified AwesomeMessage message, length delimited. Does not implicitly {@link awesomepackage.AwesomeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {awesomepackage.IAwesomeMessage} message AwesomeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AwesomeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {awesomepackage.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.awesomepackage.AwesomeMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.awesomeField = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AwesomeMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {awesomepackage.AwesomeMessage} AwesomeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AwesomeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AwesomeMessage message.
         * @function verify
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AwesomeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.awesomeField != null && message.hasOwnProperty("awesomeField"))
                if (!$util.isString(message.awesomeField))
                    return "awesomeField: string expected";
            return null;
        };

        /**
         * Creates an AwesomeMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {awesomepackage.AwesomeMessage} AwesomeMessage
         */
        AwesomeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.awesomepackage.AwesomeMessage)
                return object;
            var message = new $root.awesomepackage.AwesomeMessage();
            if (object.awesomeField != null)
                message.awesomeField = String(object.awesomeField);
            return message;
        };

        /**
         * Creates a plain object from an AwesomeMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof awesomepackage.AwesomeMessage
         * @static
         * @param {awesomepackage.AwesomeMessage} message AwesomeMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AwesomeMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.awesomeField = "";
            if (message.awesomeField != null && message.hasOwnProperty("awesomeField"))
                object.awesomeField = message.awesomeField;
            return object;
        };

        /**
         * Converts this AwesomeMessage to JSON.
         * @function toJSON
         * @memberof awesomepackage.AwesomeMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AwesomeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AwesomeMessage;
    })();

    awesomepackage.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof awesomepackage
         * @interface IMessage
         * @property {string} text Message text
         */

        /**
         * Constructs a new Message.
         * @memberof awesomepackage
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {awesomepackage.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message text.
         * @member {string} text
         * @memberof awesomepackage.Message
         * @instance
         */
        Message.prototype.text = "";

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof awesomepackage.Message
         * @static
         * @param {awesomepackage.IMessage=} [properties] Properties to set
         * @returns {awesomepackage.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link awesomepackage.Message.verify|verify} messages.
         * @function encode
         * @memberof awesomepackage.Message
         * @static
         * @param {awesomepackage.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link awesomepackage.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof awesomepackage.Message
         * @static
         * @param {awesomepackage.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof awesomepackage.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {awesomepackage.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.awesomepackage.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.text = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("text"))
                throw $util.ProtocolError("missing required 'text'", { instance: message });
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof awesomepackage.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {awesomepackage.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof awesomepackage.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.text))
                return "text: string expected";
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof awesomepackage.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {awesomepackage.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.awesomepackage.Message)
                return object;
            var message = new $root.awesomepackage.Message();
            if (object.text != null)
                message.text = String(object.text);
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof awesomepackage.Message
         * @static
         * @param {awesomepackage.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.text = "";
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof awesomepackage.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Message;
    })();

    awesomepackage.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof awesomepackage
         * @interface IPlayer
         * @property {number|null} [id] Player id
         * @property {string|null} [name] Player name
         * @property {number|Long|null} [enterTime] Player enterTime
         */

        /**
         * Constructs a new Player.
         * @memberof awesomepackage
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {awesomepackage.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player id.
         * @member {number} id
         * @memberof awesomepackage.Player
         * @instance
         */
        Player.prototype.id = 0;

        /**
         * Player name.
         * @member {string} name
         * @memberof awesomepackage.Player
         * @instance
         */
        Player.prototype.name = "";

        /**
         * Player enterTime.
         * @member {number|Long} enterTime
         * @memberof awesomepackage.Player
         * @instance
         */
        Player.prototype.enterTime = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof awesomepackage.Player
         * @static
         * @param {awesomepackage.IPlayer=} [properties] Properties to set
         * @returns {awesomepackage.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link awesomepackage.Player.verify|verify} messages.
         * @function encode
         * @memberof awesomepackage.Player
         * @static
         * @param {awesomepackage.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.enterTime != null && message.hasOwnProperty("enterTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.enterTime);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link awesomepackage.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof awesomepackage.Player
         * @static
         * @param {awesomepackage.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof awesomepackage.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {awesomepackage.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.awesomepackage.Player();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.enterTime = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof awesomepackage.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {awesomepackage.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof awesomepackage.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.enterTime != null && message.hasOwnProperty("enterTime"))
                if (!$util.isInteger(message.enterTime) && !(message.enterTime && $util.isInteger(message.enterTime.low) && $util.isInteger(message.enterTime.high)))
                    return "enterTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof awesomepackage.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {awesomepackage.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.awesomepackage.Player)
                return object;
            var message = new $root.awesomepackage.Player();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.enterTime != null)
                if ($util.Long)
                    (message.enterTime = $util.Long.fromValue(object.enterTime)).unsigned = true;
                else if (typeof object.enterTime === "string")
                    message.enterTime = parseInt(object.enterTime, 10);
                else if (typeof object.enterTime === "number")
                    message.enterTime = object.enterTime;
                else if (typeof object.enterTime === "object")
                    message.enterTime = new $util.LongBits(object.enterTime.low >>> 0, object.enterTime.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof awesomepackage.Player
         * @static
         * @param {awesomepackage.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.enterTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.enterTime = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.enterTime != null && message.hasOwnProperty("enterTime"))
                if (typeof message.enterTime === "number")
                    object.enterTime = options.longs === String ? String(message.enterTime) : message.enterTime;
                else
                    object.enterTime = options.longs === String ? $util.Long.prototype.toString.call(message.enterTime) : options.longs === Number ? new $util.LongBits(message.enterTime.low >>> 0, message.enterTime.high >>> 0).toNumber(true) : message.enterTime;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof awesomepackage.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Player;
    })();

    return awesomepackage;
})();

module.exports = $root;
