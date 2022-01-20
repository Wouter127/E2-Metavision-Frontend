import { AlarmWaarde } from "./Alarm-waarde";
import { SchakelWaarde } from "./Schakel-waarde";
export interface SwithLogic {
  id: number;
  type: string;
  alarmWaarde: AlarmWaarde[];
  schakelWaarde: SchakelWaarde[];
}
