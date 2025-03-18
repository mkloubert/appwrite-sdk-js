import dayjs, { Dayjs, } from "dayjs";
import dayjs_timezone from "dayjs/plugin/timezone";
import dayjs_utc from "dayjs/plugin/utc";

dayjs.extend(dayjs_timezone);
dayjs.extend(dayjs_utc);

export { dayjs, Dayjs, };
