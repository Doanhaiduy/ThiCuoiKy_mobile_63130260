import { TimeStatus } from '@/types/Auth';
import { format } from 'date-fns';

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const checkHasErr = (data: object) => {
    return Object.values({ ...data }).some(
        (value, index) => value !== undefined && Object.keys(data)[index] !== 'root'
    );
};

export const Regex = {
    fullName: new RegExp(
        /^[a-zA-ZÃ€ÃÃ‚ÃƒÃˆÃ‰ÃŠÃŒÃÃ’Ã“Ã”Ã•Ã™ÃšÄ‚ÄÄ¨Å¨Æ Ã Ã¡Ã¢Ã£Ã¨Ã©ÃªÃ¬Ã­Ã²Ã³Ã´ÃµÃ¹ÃºÄƒÄ‘Ä©Å©Æ¡Æ¯Ä‚áº áº¢áº¤áº¦áº¨áºªáº¬áº®áº°áº²áº´áº¶áº¸áººáº¼á»€á»€á»‚áº¾Æ°Äƒáº¡áº£áº¥áº§áº©áº«áº­áº¯áº±áº³áºµáº·áº¹áº»áº½á»á»á»ƒáº¿á»„á»†á»ˆá»Šá»Œá»Žá»á»’á»”á»–á»˜á»šá»œá»žá» á»¢á»¤á»¦á»¨á»ªá»…á»‡á»‰á»‹á»á»á»‘á»“á»•á»—á»™á»›á»á»Ÿá»¡á»£á»¥á»§á»©á»«á»¬á»®á»°á»²á»´Ãá»¶á»¸á»­á»¯á»±á»³á»µá»·á»¹\s\W|_]+$/
    ),
    password: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d\W_]*)$/),
    email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    phone: new RegExp(/^(0[0-9]{9,10})$/),
};

export const obfuscateEmail = (email: string): string => {
    return email.replace(/(.{1,2})(.*)(@.{2,})/g, (match, user, characters, domain) => {
        return `${user}${characters.replace(/./g, '*')}${domain}`;
    });
};

export const generateWeekDates = () => {
    const weekDates = [];
    const today = new Date();
    const currentDay = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateNumber = date.getDate();

        weekDates.push({ dayName, dateNumber });
    }

    return weekDates;
};

export const checkTimeStatus = (startAt: Date, endAt: Date): TimeStatus => {
    const formatStarAt = format(startAt, 'yyyy-MM-dd HH:mm');
    const formatEndAt = format(endAt, 'yyyy-MM-dd HH:mm');
    const now = new Date();
    const formatNow = format(now, 'yyyy-MM-dd HH:mm');
    if (formatNow > formatEndAt) return TimeStatus.Passed;
    if (formatNow < formatStarAt) return TimeStatus.Upcoming;
    return TimeStatus.Ongoing;
};
