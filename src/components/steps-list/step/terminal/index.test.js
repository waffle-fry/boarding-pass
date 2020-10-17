import React from "react";
import TerminalStep from "./index";
import { unmountComponentAtNode } from "react-dom";
import {
  render,
  waitFor,
  waitForDomChange,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import child_process from "child_process";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("child_process");

test("it renders the commands in the terminal view", () => {
  const step = {
    type: "terminal",
    title: "Run commands",
    text: "Run the following commands:",
    terminal: {
      commands: [
        {
          title: "Docker",
          command: "docker pull busybox",
        },
        {
          title: "Docker",
          command: "docker pull helloworld",
        },
      ],
    },
    action_button: {
      enabled: true,
      title: "Install All",
    },
  };

  render(<TerminalStep {...step} number="1" />, container);

  const terminal = document.querySelector(".terminal");
  const commands = terminal.querySelector(".commands");

  expect(commands.children.length).toBe(2);
  expect(commands.children[0].textContent).toBe("Docker: docker pull busybox");
  expect(commands.children[1].textContent).toBe(
    "Docker: docker pull helloworld"
  );
});

test("it renders a spinner when running a command", async () => {
  const step = {
    type: "terminal",
    title: "Run commands",
    text: "Run the following commands:",
    terminal: {
      commands: [
        {
          title: "Docker",
          command: "docker pull busybox",
        },
        {
          title: "Docker",
          command: "docker pull helloworld",
        },
      ],
    },
    action_button: {
      enabled: true,
      title: "Install All",
    },
  };

  const { getByText } = render(
    <TerminalStep {...step} number="1" />,
    container
  );

  child_process.exec.mockImplementation((command, callback) =>
    callback(null, { stdout: "ok" })
  );

  const actionButton = getByText("Install All");

  act(() => {
    actionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const commands = document.querySelector(".commands");
  const firstCommand = commands.children[0];

  await waitFor(() =>
    expect(firstCommand.querySelector(".running_spinner")).toBeInTheDocument()
  );
});

test("it updates the command after it is successfully executed", async () => {
  const step = {
    type: "terminal",
    title: "Run commands",
    text: "Run the following commands:",
    terminal: {
      commands: [
        {
          title: "Docker",
          command: "docker pull busybox",
        },
        {
          title: "Docker",
          command: "docker pull helloworld",
        },
      ],
    },
    action_button: {
      enabled: true,
      title: "Install All",
    },
  };

  const { getByText } = render(
    <TerminalStep {...step} number="1" />,
    container
  );

  child_process.exec.mockImplementation((command, callback) => {
    callback(null, { stdout: "ok" });
  });

  const actionButton = getByText("Install All");

  await act(async () => {
    actionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const commands = document.querySelector(".commands");
  const firstCommand = commands.children[0];

  await waitFor(() => expect(firstCommand.className).toBe("command_success"));
});

test("it updates the command after it is unsuccessfully executed - error", async () => {
  const step = {
    type: "terminal",
    title: "Run commands",
    text: "Run the following commands:",
    terminal: {
      commands: [
        {
          title: "Docker",
          command: "docker pull busybox",
        },
        {
          title: "Docker",
          command: "docker pull helloworld",
        },
      ],
    },
    action_button: {
      enabled: true,
      title: "Install All",
    },
  };

  const { getByText } = render(
    <TerminalStep {...step} number="1" />,
    container
  );

  child_process.exec.mockImplementation((command, callback) => {
    callback({ error: "ok" });
  });

  const actionButton = getByText("Install All");

  await act(async () => {
    actionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const commands = document.querySelector(".commands");
  const firstCommand = commands.children[0];

  await waitFor(() => expect(firstCommand.className).toBe("command_error"));
});

test("it updates the command after it is unsuccessfully executed - stderr", async () => {
  const step = {
    type: "terminal",
    title: "Run commands",
    text: "Run the following commands:",
    terminal: {
      commands: [
        {
          title: "Docker",
          command: "docker pull busybox",
        },
        {
          title: "Docker",
          command: "docker pull helloworld",
        },
      ],
    },
    action_button: {
      enabled: true,
      title: "Install All",
    },
  };

  const { getByText } = render(
    <TerminalStep {...step} number="1" />,
    container
  );

  child_process.exec.mockImplementation((command, callback) => {
    callback(null, null, { stderr: "ok" });
  });

  const actionButton = getByText("Install All");

  await act(async () => {
    actionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const commands = document.querySelector(".commands");
  const firstCommand = commands.children[0];

  await waitFor(() => expect(firstCommand.className).toBe("command_error"));
});
