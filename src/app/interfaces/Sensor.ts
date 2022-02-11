import { AlarmWaarde } from "./Alarm-waarde";
import { SchakelWaarde } from "./Schakel-waarde";
export interface Sensor {
  id: number;
  naam: string;
  omschrijving: string;
  code: string;
  alarmWaarde: AlarmWaarde[];
  schakelWaarde: SchakelWaarde[];
}
