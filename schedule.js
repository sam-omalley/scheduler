


class Schedule {
    constructor(numLanes) {
        this.numLanes = numLanes;
        this.laneSpacing = height / (numLanes + 1);
        this.zeroLineX = this.laneSpacing * 2;
        this.zeroLineWidth = 2;
		this.radar_enabled = true;

        var options = {
            isStatic: true
        }
        var options2 = {
            isStatic: true,
			friction: 0
        }
        this.zeroLine = Bodies.rectangle(this.zeroLineX, height/2 - 10, this.zeroLineWidth, height+100, options);
		this.top = Bodies.rectangle(width/2, -25, width, 50, options2); 
		this.bottom = Bodies.rectangle(width/2, height+25, width, 50, options2); 
		World.add(world, this.top);
		World.add(world, this.bottom);

        this.boxes = [];

        this.next_times = [];
        for (var i = 0; i < this.numLanes; i++) {
            this.next_times.push(millis() + random(0, 1000));
        }
    }

    add_box(lane) {
        let b = new Box(width + 100, (lane + 1) * this.laneSpacing, random(20, 50), 10, lane);
        // Matter.Body.applyForce(b.body, b.body.position, {x: -0.02, y: 0});
        this.boxes.push(b);
    }
	
	enable_radar() {
		this.radar_enabled = true;
		World.remove(world, this.zeroLine);
	}
	
	disable_radar() {
		this.radar_enabled = false;
		World.add(world, this.zeroLine);
	}

    add_bullet(x, y) {
        let b = new Box(x, y, 50, 50, int(random(0, 100)));
        Matter.Body.applyForce(b.body, b.body.position, {x: -1, y: 0});
        Matter.Body.setMass(b.body, 10);
        this.boxes.push(b);
    }

    update() {
        for (var i = 0; i < this.numLanes; i++) {
            if (millis() >= this.next_times[i]) {
                this.add_box(i);
                this.next_times[i] = millis() + random(1000, 2000);
            }
        }
    }

    show() {
        strokeWeight(1);
        stroke(60, 64, 67);
		
		// Draw horizontal grid
		var counter = 0;
        for (var i = 0; i < height; i += this.laneSpacing) {
            line(0, i, width, i);

            fill(154, 160, 166);
            textAlign(RIGHT, CENTER);
            textSize(16);
            if (counter > 0) {
                text("Rx" + counter, this.laneSpacing, i);
            }
            counter += 1
        }
        
		// Draw vertical grid
		counter = -20;
        for (var i = 0; i < width; i += this.laneSpacing) {
            line(i, 0, i, height);

            fill(154, 160, 166);
            textAlign(CENTER, TOP);
            textSize(16);
            if (i > 0) {
                text(counter, i, height-20);
            }
            counter += 10
        }
		
		// Draw speed indicator
		
		fill(154, 160, 166);
		textAlign(RIGHT, CENTER);
		textSize(16);
		text("x10 Speed", width - 20, 20);

        // Draw zero line
        noStroke(255);
			rectMode(CENTER);
		if (this.radar_enabled) {
			fill(80, 185, 135);
			var dashLength = 10;
			for (var i = 0; i < height - this.laneSpacing; i+= dashLength * 2) {
				rect(this.zeroLine.position.x, i, this.zeroLineWidth, dashLength);
			}
		} else {
			fill(230, 72, 57);
			rect(this.zeroLine.position.x, this.zeroLine.position.y, this.zeroLineWidth, height);
		}
		
		// Draw boxes
        for (let b of this.boxes) {
            if (b.body.position.x < this.zeroLine.position.x) {
                noFill();
            } else {
                if (b.lane % 2 == 0) {
                    fill(80, 185, 135);
                } else {
                    fill(53, 160, 212);
                }
            }
            b.show();
        }
    }
}

