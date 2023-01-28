import ArgumentType from '../../extension-support/argument-type';
import BlockType from '../../extension-support/block-type';
import Cast from '../../util/cast';
import log from '../../until/log';

class Scratch3myExtension {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'myExtension',
            name: 'My Extension',
            blocks: [
                {
                    opcode: 'writeText',
                    blockType: BlockType.COMMAND,
                    text: 'myText [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hellow"
                        }
                    }
                }
            ],
            menus: {}
        };
    }
    writeText (args){
        const text = Cast.toString(args.TEXT);
        log.myText(text);

    }
}

module.exports = Scratch3myExtension;