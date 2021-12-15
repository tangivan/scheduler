import applicationReducer from "./application";

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => applicationReducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});
