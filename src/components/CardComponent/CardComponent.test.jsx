import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import userEvent from "@testing-library/user-event";
import { CardComponent } from "./CardComponent";

test("displays article title", () => {
  const title = "My article title";
  render(<CardComponent article={{ title }} />);

  expect(screen.getByRole("heading")).toHaveTextContent(title);
});

test("on card click it callbacks to detail route", async () => {
  const onCardClick = jest.fn();
  render(
    <CardComponent onCardClick={onCardClick} article={{ id: "article-id" }} />
  );

  await userEvent.click(screen.getByTestId("card-body"));

  expect(onCardClick).toBeCalledTimes(1);
  expect(onCardClick).toBeCalledWith("/detail/article-id");
});
