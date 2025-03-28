class Stack<T> {
    private items: T[] = [];
  
    push(item: T): void {
      this.items.push(item);
    };
}

const numberLotto = new Stack<number>();
numberLotto.push(1);

const thirtySeconds = new Stack<string>();
thirtySeconds.push('Day 1');

console.log(numberLotto);
console.log(thirtySeconds);