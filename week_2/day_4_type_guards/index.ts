function firstCharacter(input: string | string[]): string {
    if (typeof input === "string") {
      return input.charAt(0);
    } else {
      return input.length > 0 ? input[0] : "";
    }
  }

  console.log(firstCharacter("Hello"));
    console.log(firstCharacter(["Hello", "World"]));
  