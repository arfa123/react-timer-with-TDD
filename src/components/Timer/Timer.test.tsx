import { shallow } from "enzyme";
import Timer from "./Timer";

describe('mounted Timer', () => {
	let container: any;

	beforeEach(() => (container = shallow(<Timer />)));

	it("should render a <div />", () => {
		expect(container.find("div").length).toBeGreaterThanOrEqual(1);
	});

	it("should render instances of the TimerButton component", () => {
		expect(container.find("TimerButton").length).toEqual(3);
	})

	it('invokes startTimer when the start button is clicked', () => {
		const spy = jest.spyOn(container.instance(), 'startTimer');
		const ins: any = container.instance();
		ins.forceUpdate();
		expect(spy).toHaveBeenCalledTimes(0);
		const comp = container.findWhere((n: any) => n.name() === "TimerButton" && n.prop("buttonValue") === "Start");
		comp.props().buttonAction();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('invokes stopTimer when the stop button is clicked', () => {
		const spy = jest.spyOn(container.instance(), 'stopTimer');
		const ins: any = container.instance();
		ins.forceUpdate();
		expect(spy).toHaveBeenCalledTimes(0);
		const comp = container.findWhere((n: any) => n.name() === "TimerButton" && n.prop("buttonValue") === "Stop");
		comp.props().buttonAction();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('invokes resetTimer when the reset button is clicked', () => {
		const spy = jest.spyOn(container.instance(), 'resetTimer');
		const ins: any = container.instance();
		ins.forceUpdate();
		expect(spy).toHaveBeenCalledTimes(0);
		const comp = container.findWhere((n: any) => n.name() === "TimerButton" && n.prop("buttonValue") === "Reset");
		comp.props().buttonAction();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should change isOn state true when the start button is clicked', () => {
		const comp = container.findWhere((n: any) => n.name() === "TimerButton" && n.prop("buttonValue") === "Start");
		comp.props().buttonAction();
		expect(container.instance().state.isOn).toEqual(true);
	});

	it('should change isOn state false when the stop button is clicked', () => {
		const comp = container.findWhere((n: any) => n.name() === "TimerButton" && n.prop("buttonValue") === "Stop");
		comp.props().buttonAction();
		expect(container.instance().state.isOn).toEqual(false);
	});

	it('should change isOn state false when the reset button is clicked', () => {
		const comp = container.findWhere((n: any) => n.name() === "TimerButton" && n.prop("buttonValue") === "Stop");
		comp.props().buttonAction();
		expect(container.instance().state.isOn).toEqual(false);
		expect(container.instance().state.minutes).toEqual(25);
		expect(container.instance().state.seconds).toEqual(0);
	});
});