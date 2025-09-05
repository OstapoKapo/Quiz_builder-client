export function chunkArray<T>(items: T[], chunkSize: number): T[][]{
    const result: T[][] =[];
    for (let i = 0; i < items.length; i += chunkSize) {
        result.push(items.slice(i, i + chunkSize));
    }
    return result;
} 