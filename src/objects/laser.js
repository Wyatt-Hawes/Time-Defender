class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'repairbeam');
        this.current_scene = scene;
    }
    fire(scene,turret,targetDeg,targetx,targety){
        this.targetx = targetx;
        this.targety = targety;
        this.setAngle(targetDeg);
        this.body.reset(turret.x,turret.y);
        this.setActive(true);
        this.setVisible(true);
        scene.physics.moveTo(this,targetx,targety,1600);
    }
    preUpdate(time, delta){
        super.preUpdate(time,delta);
        if(this.y <= 0 || this.y >= this.current_scene.game.config.height * 1.2 || this.x <= -50 || this.x >= this.current_scene.game.config.width * 1.2){
            this.setActive(false);
            this.setVisible(false);
        }
    }


}  

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Laser,
            frameQuantity: 4,
            active: false,
            visible: false,
            key: 'laser'
        })
    }

    fireLaser(scene,targetx,targety,targetDeg,turret){
        let laser = this.getFirstDead(false);
        if(laser){
            laser.fire(scene,turret, targetDeg, targetx, targety);
            scene.play_sound("laser");
        }
    }
}