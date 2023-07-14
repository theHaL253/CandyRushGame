import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { Grid } from './Grid';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    private touchStartPos: Vec3 = new Vec3(0,0,0);

    @property({
        type: Grid
    })
    public grid: Grid;


    registerSwipeEvents() {
        this.node.on(Node.EventType.TOUCH_START, (eventTouch) => {
            this.touchStartPos = eventTouch.getLocation();
        });

        this.node.on(Node.EventType.TOUCH_END, (eventTouch) => {
            if (!this.touchStartPos) return;

            const touchEndPos = eventTouch.getLocation();
            const deltaX = touchEndPos.x - this.touchStartPos.x;
            const deltaY = touchEndPos.y - this.touchStartPos.y;

            const thresholdmin = 10; // Minimum distance for a valid swipe
            const thresholdmax = 100; // Maximum distance for a valid swipe
            const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

            if (isHorizontalSwipe) {
                if (deltaX > thresholdmin) {
                    console.log('Swipe right');
                    // Handle swipe right event
                } else if (deltaX < -thresholdmin) {
                    console.log('Swipe left');
                    // Handle swipe left event
                }
            } else {
                if (deltaY > thresholdmin) {
                    console.log('Swipe up');
                    // Handle swipe up event
                } else if (deltaY < -thresholdmin) {
                    console.log('Swipe down');
                    // Handle swipe down event
                }
            }

            this.touchStartPos = null;
        });
    }
}


