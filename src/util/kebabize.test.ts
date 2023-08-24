import kebabize from "./kebabize";

describe("kebabize", () => {
  it("should convert camel case to kebab case", () => {
    expect(kebabize("camelCase")).toMatchSnapshot();
  });

  it("should convert pascal case to kebab case", () => {
    expect(kebabize("PascalCase")).toMatchSnapshot();
  });

  it("should not change kebab case", () => {
    expect(kebabize("kebab-case")).toMatchSnapshot();
  });
});
