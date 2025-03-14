function formatValue(value: string | number): string {
    if (typeof value === "string") {
      return value.toUpperCase();
    } else {
      return value.toFixed(2);
    }
};

type Result = string[] | number[];

function returnResult (value: Result) {
    if (Array.isArray(value)) {
        if (typeof value[0] === "string") {
            let totalLength = 0;
            (value as string[]).forEach((str: string) => {
                totalLength += str.length;
                console.log(str.length);
            });
            return(`Total Length: ${totalLength}`);
        } else if (typeof value[0] === "number") {
            let totalCount = 0;
            (value as number[]).forEach((num: number) => {
                totalCount += num;
            });
            return(`Total Count: ${totalCount}`);
        }
    } else {
        return "Dololo";
    }
};

console.log(returnResult(["Hello", "World"]));
console.log(returnResult([1, 2, 3, 4, 5]));