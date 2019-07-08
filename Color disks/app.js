var config = {
    type: Phaser.AUTO,
    width: 540,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var test = 0;
var rotspeed1 = -1;
var rotspeed2 = 0.5;
var gameover = 0;
function preload () {
    this.load.image('spike_wheel', 'assets/Disk.png');
    this.load.image('spike', 'assets/spike.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('background', 'assets/background.png');
}

function create () {

    background = this.add.image(0, 480, 'background');
    spikes = this.physics.add.group();
    spike1 = this.physics.add.sprite(270, 480, 'spike');
    spike1.body.setAllowGravity(false);
    spike2 = this.physics.add.sprite(270, 480, 'spike');
    spike2.body.setAllowGravity(false);
    spike_wheel = this.physics.add.staticImage(270, 480, 'spike_wheel');
    ball1 = this.physics.add.sprite(270, 220, 'ball');
    ball2 = this.physics.add.sprite(270, 740, 'ball');
    ball2.body.setGravityY(-600);
    ball2.setCollideWorldBounds(true);
    this.physics.add.collider(ball1, spike_wheel);
    this.physics.add.collider(ball2, spike_wheel);
    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(30, 30, '0', { fontSize: '60px', fill: '#000' });
    nextext = this.add.text(30, 90, '', { fontSize: '40px', fill: '#000' });
    this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
}

function update () {
    spike1.body.rotation += rotspeed1;
    spike2.body.rotation += rotspeed2;
    angle = Math.round(spike2.angle);
    angle2 = Math.round(spike1.angle);
    height = ball1.y;
    height2 = ball2.y;
    if (cursors.up.isDown && ball1.body.touching.down && gameover == 0){
        ball1.setVelocityY(-160);
    }

    if (this.key.isDown) {
        location.reload();
    }
    if (cursors.down.isDown && ball2.body.touching.up && gameover == 0){
        ball2.setVelocityY(160);
    }
    if (angle == 90 && height < 244 || angle == -90 && height < 244) {
        test += 0.5;
        scoreText.setText(Math.ceil(test));
    }
    if (angle == 90 && height2 > 716 || angle == -90 && height2 > 716) {
        test += 0.5;
        scoreText.setText(Math.ceil(test));
   }
    if (angle2 == 90 && height < 244 || angle2 == -90 && height < 244) {
        test += 1;
        console.log(test);
        scoreText.setText(test);
    }
    if (angle2 == 90 && height2 > 716 || angle2 == -90 && height2 > 716) {
        test += 1;
        console.log(test);
        scoreText.setText(test);
    }
    //end_game
    if (angle == 90 && height > 244 || angle == -90 && height > 244) {
        endgame(ball1);
    }
    if (angle == 90 && height2 < 716 || angle == -90 && height2 < 716) {
        endgame(ball2);
    }
    if (angle2 == 90 && height > 244 || angle2 == -90 && height > 244) {
        endgame(ball1);
    }
    if (angle2 == 90 && height2 < 716 || angle2 == -90 && height2 < 716) {
        endgame(ball2);
    }
}
function endgame(sprite)
{
    scoreText.setText("score = " + test);
    nextext.setText("HIT R TO RESTART");
    gameover = 1; 
}
