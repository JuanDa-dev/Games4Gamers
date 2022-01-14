import Phaser from "phaser";
import ball from './assets/ball.png'
import left from './assets/left_pallete.png'
import right from './assets/right_pallete.png'

export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Bootloader' });
    }
    preload() {
        this.load.on('complete', () => {
            this.scene.start('Scene_play');
        })
        this.load.rexImageURI('ball', ball);
        this.load.rexImageURI('left', left);
        this.textures.addBase64('right', right);
    }
}