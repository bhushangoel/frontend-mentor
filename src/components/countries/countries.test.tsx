import { render, screen } from "@testing-library/react";
import Countries from "./countries";

describe("Countries", () => {
	it("should render Countries component", () => {
		render(<Countries />);
		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/Countries/i);
	});

    it("Countries component should have a search", () => {
		render(<Countries />);
		const inpt = screen.getByRole("textbox");
		expect(inpt).toBeInTheDocument();
	});

    it("Countries component should have a filter", () => {
		render(<Countries />);
		const inpt = screen.getByRole("combobox");
		expect(inpt).toBeInTheDocument();
	});

    it("Countries component should load countries", () => {
		render(<Countries />);
		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent(/0/i);
	});
});
