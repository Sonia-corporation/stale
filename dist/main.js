var $bOypn$actionscore = require("@actions/core");
var $bOypn$lodash = require("lodash");
var $bOypn$ansistyles = require("ansi-styles");
var $bOypn$terminallink = require("terminal-link");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

class $339250d0e5c3ca0b$export$c6af1de458cd0882 {
    static whiteBright(message) {
        return this._format(message, `whiteBright`);
    }
    static yellowBright(message) {
        return this._format(message, `yellowBright`);
    }
    /**
   * @description
   * Used for the links
   * @param {Readonly<IMessage>} message The message to display in magenta
   * @returns {string} The message in magenta
   */ static magenta(message) {
        return this._format(message, `magenta`);
    }
    /**
   * @description
   * Used for the values to highlight
   * @param {Readonly<IMessage>} message The message to display in cyan
   * @returns {string} The message in cyan
   */ static cyan(message) {
        return this._format(message, `cyan`);
    }
    static yellow(message) {
        return this._format(message, `yellow`);
    }
    /**
   * @description
   * Used for standard text which is not important
   * @param {Readonly<IMessage>} message The message to display in white
   * @returns {string} The message in white
   */ static white(message) {
        return this._format(message, `white`);
    }
    /**
   * @description
   * Used for the successful messages
   * @param {Readonly<IMessage>} message The message to display in green
   * @returns {string} The message in green
   */ static green(message) {
        return this._format(message, `green`);
    }
    /**
   * @description
   * Used for the error messages
   * @param {Readonly<IMessage>} message The message to display in red
   * @returns {string} The message in red
   */ static red(message) {
        return this._format(message, `red`);
    }
    static blue(message) {
        return this._format(message, `blue`);
    }
    static bold(message) {
        return this._format(message, `bold`);
    }
    static _format(message, style) {
        return `${$parcel$interopDefault($bOypn$ansistyles)[style].open}${message}${$parcel$interopDefault($bOypn$ansistyles)[style].close}`;
    }
}




function $a184f2d5db98a48a$export$cdda5b1be25f9499(name, link) {
    return $parcel$interopDefault($bOypn$terminallink)(name, link);
}


function $a587e6ef7bfcb900$export$85a7e0e731c30c52(input) {
    return $a184f2d5db98a48a$export$cdda5b1be25f9499(input, `https://github.com/@sonia-corporation/stale#${input}`);
}



class $11e14372fbaa238c$export$b25e7459bf5ba06 {
    static debug(...message) {
        $parcel$interopDefault($bOypn$actionscore).debug($339250d0e5c3ca0b$export$c6af1de458cd0882.whiteBright(message.join(` `)));
        return this;
    }
    static notice(...message) {
        $parcel$interopDefault($bOypn$actionscore).notice($339250d0e5c3ca0b$export$c6af1de458cd0882.whiteBright(message.join(` `)));
        return this;
    }
    static warning(...message) {
        $parcel$interopDefault($bOypn$actionscore).warning($339250d0e5c3ca0b$export$c6af1de458cd0882.whiteBright(message.join(` `)));
        return this;
    }
    static error(...message) {
        $parcel$interopDefault($bOypn$actionscore).error($339250d0e5c3ca0b$export$c6af1de458cd0882.whiteBright(message.join(` `)));
        return this;
    }
    static async group(message, fn) {
        return $parcel$interopDefault($bOypn$actionscore).group($339250d0e5c3ca0b$export$c6af1de458cd0882.whiteBright(message), fn);
    }
    static startGroup(name) {
        $parcel$interopDefault($bOypn$actionscore).startGroup($339250d0e5c3ca0b$export$c6af1de458cd0882.whiteBright(name));
        return this;
    }
    static endGroup() {
        $parcel$interopDefault($bOypn$actionscore).endGroup();
        return this;
    }
    static input(input) {
        return $339250d0e5c3ca0b$export$c6af1de458cd0882.magenta($a587e6ef7bfcb900$export$85a7e0e731c30c52(input));
    }
}




class $743dc34edb58b3ed$export$7243f85ae6a5018a {
    static initialize() {
        $743dc34edb58b3ed$export$7243f85ae6a5018a.setInputs();
        return this;
    }
    static setInputs() {
        $743dc34edb58b3ed$export$7243f85ae6a5018a.inputs = {
            githubToken: $parcel$interopDefault($bOypn$actionscore).getInput(`github-token`, {
                required: true
            })
        };
        return $743dc34edb58b3ed$export$7243f85ae6a5018a.inputs;
    }
    static logInputs() {
        $11e14372fbaa238c$export$b25e7459bf5ba06.startGroup(`Inputs`);
        $parcel$interopDefault($bOypn$lodash).forEach(this.inputs, (value, key)=>{
            $11e14372fbaa238c$export$b25e7459bf5ba06.debug($339250d0e5c3ca0b$export$c6af1de458cd0882.white(`├──`), $11e14372fbaa238c$export$b25e7459bf5ba06.input($parcel$interopDefault($bOypn$lodash).kebabCase(key)), $339250d0e5c3ca0b$export$c6af1de458cd0882.cyan(value));
        });
        $11e14372fbaa238c$export$b25e7459bf5ba06.endGroup();
        return $743dc34edb58b3ed$export$7243f85ae6a5018a;
    }
}
$743dc34edb58b3ed$export$7243f85ae6a5018a.inputs = undefined;


class $8a3acc4147624da6$export$48c1d9548a86bcc5 {
    static initialize() {
        $743dc34edb58b3ed$export$7243f85ae6a5018a.initialize();
        return this;
    }
}


/**
 * @description
 * Start the main logic of this action
 */ function $222c4231a1dd86a5$var$initialize() {
    $8a3acc4147624da6$export$48c1d9548a86bcc5.initialize();
}
$222c4231a1dd86a5$var$initialize();


//# sourceMappingURL=main.js.map
