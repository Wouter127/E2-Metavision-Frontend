import { AlarmWaarde } from "./Alarm-waarde";
import { SchakelWaarde } from "./Schakel-waarde";
export interface Sensor {
  id: number;
  naam: string;
  code: string;
  omschrijving: string;
  alarmWaarde: AlarmWaarde[];
  schakelWaarde: SchakelWaarde[];
}
