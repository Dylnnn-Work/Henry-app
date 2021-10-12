/* export function formatDate(date: string): string {
    const dateTemp = date.replaceAll('/', '-');
    const d = new Date(dateTemp.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
} */

export function formatDate(date: any): any {
    const d = new Date(date),
        year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1);

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function ShowDate(date: any): any {
    const d = new Date(date),
        year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1);

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}
