import Phaser from "phaser";
import Tables from "../gameObjects/tables";

export default class Scene_play extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene_play' })
    }
    create() {
        this.center_width = this.sys.game.config.width / 2;
        this.center_height = this.sys.game.config.height / 2

        //Graphics
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 1);
        //this.circle = new Phaser.Geom.Circle(80, 80, 20);
        //this.graphics.fillCircleShape(this.circle);

        //Separator
        for (let i = 0; i < 15; i++) {
            this.graphics.fillRect(this.center_width - 10, 51 * i + 12, 20, 30);
        }

        //Tables
        this.left = new Tables(this, 30, this.center_height, 'left');
        this.right = new Tables(this, this.center_width * 2 - 30, this.center_height, 'right');

        //Ball
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(this.center_width, this.center_height, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocity(-300);

        //Physics
        this.physics.add.collider(this.ball, this.left, this.choque, null, this);
        this.physics.add.collider(this.ball, this.right, this.choque, null, this);

        //Controls
        this.cursor = this.input.keyboard.createCursorKeys();

        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update() {
        if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
            this.ball.setPosition(this.center_width, this.center_height);
        }
        //Table controls
        //Table right
        if (this.cursor.down.isDown) {
            this.right.body.setVelocityY(300);
        } else if (this.cursor.up.isDown) {
            this.right.body.setVelocityY(-300);
        } else {
            this.right.body.setVelocityY(0);
        }
        //Table left
        if (this.cursor_S.isDown) {
            this.left.body.setVelocityY(300);
        } else if (this.cursor_W.isDown) {
            this.left.body.setVelocityY(-300);
        } else {
            this.left.body.setVelocityY(0);
        }
    }

    choque() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }
}