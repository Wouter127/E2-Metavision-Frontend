import { NumberValueAccessor } from "@angular/forms";

export interface Meting {
    id: number;
    weerstationId: number;
    time: Date;
    rh: number;
    t1: number;
    t2: number;
    t3: number;
    rf: number;
    irl: number;
    vil: number;
    lux: number;
    lw1: number;
    lw2: number;
    bav: number;
    bap: number;
    wd: number;
    ws: number;
    vla: number;
    glo: number;
    sw1: boolean;
    sw1t: number;
    sw1l: number;
}
