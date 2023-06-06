class Intro extends DefenderScene {
    constructor() {
        super('intro');
    }
    pre_load(){
        this.load.image('title', "Assets/Title.png");
        this.load.image('play', "Assets/Play.png");
        this.load.image('credits', "Assets/credits.png");

    }
    enlarge_on_mouse(b1){
        let me = this;
        b1.on('pointerover', () => {
            me.add.tween({
                targets: b1,
                duration: 70,
                scale: 2.2,
            });
        });
        b1.on('pointerout', () => {
            me.add.tween({
                targets: b1,
                duration: 70,
                scale: 2,
            });
        });
    }

    onEnter(){
        this.cameras.main.fadeIn(5000, 0, 0, 0);
        this.thisturr.setOrigin(0.5,0.5);
        this.thisturr.setPosition(this.game.config.width/2,this.game.config.height/2.5)
        let title_cont = this.add.container(this.game.config.width/2,this.game.config.height/4)
        
        //The rectangle prevents stars from showing below the entire title, Is this something we want?
        title_cont.add(this.add.rectangle(0,-10,830,180,0x000000).setOrigin(0.5,0.5));
        title_cont.add(this.add.image(0,0,'title').setScale(4).setOrigin(0.5,0.5));

        let t1 = this.add.tween({
            targets: title_cont,
            paused: false,
            duration: 7000,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "Sine.easeInOut",
            
        });
        
        // I would like the angle to start at 0 but I cant seem to figure out how to do that
        let r = this.add.tween({
            targets: title_cont,
            angle: {from: -3, to: 3},
            duration: 12000,
            yoyo:true,
            repeat: -1,
        })


        //Adding play button
        let play_button = this.add.container(this.game.config.width/2, this.game.config.height/5 * 3);
        let button = this.add.image(0,0, 'play').setScale(2).setInteractive();
        let button_background = this.add.rectangle(0,0,100,50,0x000000).setScale(2).setInteractive();
        this.enlarge_on_mouse(button);
        this.enlarge_on_mouse(button_background);
        play_button.add(button_background)
        play_button.add(button);

        //adding credits button
        let xv = 0;
        let yv = 130
        let cbutton = this.add.image(xv,yv, 'credits').setScale(2).setInteractive();
        let cbutton_background = this.add.rectangle(xv,yv,140,50,0x000000).setScale(2).setInteractive();
        this.enlarge_on_mouse(cbutton);
        this.enlarge_on_mouse(cbutton_background);
        play_button.add(cbutton_background)
        play_button.add(cbutton);


        //let credit = this.add.text(this.game.config.width/100,this.game.config.height/5 * 4)
        //.setText("Created by:\n Ethan Earle \n Lumina Kinsinger-Dang \n Wyatt Hawes")
        //.setStyle({ fontSize: `${1 * 40}px` })
        //.setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        

        let me2 = this;
        button.on('pointerdown', ()=>{
            //Go to beginning scene
            this.run_transition_animation(me2, title_cont, play_button, credit);
            me2.time.delayedCall(12000, ()=>{
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                console.log("Starting gameplay");

                this.scene.start('gameplay')
                
            });
        })

        cbutton.on('pointerdown', ()=>{
            //Go to beginning scene
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                this.scene.start('credits')
        })
        //Credits button
        
    }
    run_transition_animation(me2, title_cont, play_button, credit){
        me2.particle_system.gravityX = -700;
        me2.particle_system.speedX = -400;
        me2.particle_system.quantity = 6;
        //me2.particle_system.setFrequency(7)
        me2.particle_system.lifespan = 100000;
        me2.time.delayedCall(3000, ()=>{
            //console.log("Scene Transition");
            me2.time.delayedCall(0, ()=>{me2.particle_system.gravityX = -10});
            me2.time.delayedCall(1000, ()=>{
                me2.particle_system.quantity = 1;
                me2.particle_system.setFrequency(50);
                me2.particle_system.speedX = 0;
                me2.particle_system.lifespan = 100000;
            });
            //me2.particle_system.speedX = -50;
            me2.particle_system.quantity = 1;
            me2.particle_system.setFrequency(25);
        });
        let r = me2.add.tween({
            delay: 300,
            targets: credit,
            duration: 2000,
            ease: "Quad.easeIn",
            x: -800,
        });

        me2.add.tween({
            delay: 300,
            targets: [title_cont,play_button],
            duration: 1700,
            ease: "Quad.easeIn",
            x: -800
        })
    }

    update(){
        this.thisturr.rotation = (Phaser.Math.Angle.Between(
            this.thisturr.x, this.thisturr.y, game.input.mousePointer.x, game.input.mousePointer.y
            )) + Math.PI / 2
    }
}