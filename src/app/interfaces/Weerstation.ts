import { AlarmWaarde } from "./Alarm-waarde";
import { SchakelWaarde } from "./Schakel-waarde";
import { Meting } from "./Meting";
export interface Weerstation {
  id: number;
  organisatieId: number;
  naam: string;
  isPubliekZichtbaar: number;
  gsmNummer: string;
  uniekeCode: string;
  created_at: Date;
  updated_at: Date;
  alarmWaardes: AlarmWaarde[];
  schakelWaardes: SchakelWaarde[];
  metings: Meting[];
}
